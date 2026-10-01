import Phaser from "phaser";
import type { Planet } from "./Planet";
import { type PlayerSettings, DEFAULT_PLAYER_SETTINGS, createPlayerHatTexture } from "./playerHelpers";

const DEBUG_VECTOR_LENGTH = 40;
const DEBUG_LINE_COLOR = 0xffff00;
const DEBUG_NORMAL_COLOR = 0x00aaff;

export class Player {
    private readonly scene: Phaser.Scene;
    private readonly planet: Planet;
    private readonly settings: PlayerSettings;

    public sprite!: Phaser.Physics.Matter.Sprite;

    private hat!: Phaser.GameObjects.Sprite;

    private isGrounded = false;
    private facingRight = true;

    private readonly debugGraphics: Phaser.GameObjects.Graphics;

    /**
     * The normal of the block surface the player is currently
     * standing on.
     *
     * (0, -1) = top surface
     * (1,  0) = right surface
     * (0,  1) = bottom surface
     * (-1, 0) = left surface
     */
    private groundNormal = new Phaser.Math.Vector2(0, -1);

    // Used to prevent an immediate second jump.
    private jumpCooldown = 0;

    // Maximum movement speed along the block surface.
    private readonly maxSurfaceSpeed = 5;

    constructor(scene: Phaser.Scene, planet: Planet, customSettings?: Partial<PlayerSettings>) {
        this.scene = scene;
        this.planet = planet;

        this.settings = {
            ...DEFAULT_PLAYER_SETTINGS,
            ...customSettings,
        };

        this.debugGraphics = this.scene.add.graphics();
    }

    public spawn(): void {
        // Matter's global gravity must be disabled.
        // Planet gravity is applied manually in update().
        this.scene.matter.world.setGravity(0);

        if (!this.scene.textures.exists("player_hat")) {
            createPlayerHatTexture(this.scene, "player_hat", 0xff0000);
        }

        const spawnY = this.planet.center.y - (this.planet.config.radius + 4) * this.planet.config.blockSize;

        this.sprite = this.scene.matter.add.sprite(this.planet.center.x, spawnY, "player_tile", undefined, {
            friction: this.settings.friction,
            frictionStatic: this.settings.frictionStatic,
            frictionAir: 0.05,
            restitution: this.settings.restitution,
            density: this.settings.density,
        });

        this.sprite.setDisplaySize(this.settings.width, this.settings.height);
        this.sprite.setBody({
            type: "rectangle",
            width: this.settings.width,
            height: this.settings.height,
        });

        // Matter body itself should not rotate.
        // We rotate the visual sprite instead.
        this.sprite.setFixedRotation();

        this.hat = this.scene.add.sprite(this.sprite.x, this.sprite.y, "player_hat");
        this.hat.setOrigin(0.5, 1);

        // We still listen for collisions, but we DON'T simply
        // set grounded=true for every collision anymore.
        // Instead we use the collision to update grounded state
        // and then determine the actual block underneath.
        this.scene.matter.world.on("collisionstart", this.handleCollisionStart);

        this.scene.matter.world.on("collisionend", this.handleCollisionEnd);
    }

    private drawDebugVectors(gravity: Phaser.Math.Vector2): void {
        if (!this.scene.matter.world.drawDebug) {
            return;
        }

        // Samma vektor som skickas till updateRotation().
        const orientationUp = this.isGrounded ? this.groundNormal : gravity.clone().negate();

        this.debugGraphics.clear();
        this.debugGraphics.lineStyle(2, DEBUG_LINE_COLOR, 0.9);
        this.debugGraphics.lineBetween(
            this.sprite.x,
            this.sprite.y,
            this.sprite.x + gravity.x * DEBUG_VECTOR_LENGTH,
            this.sprite.y + gravity.y * DEBUG_VECTOR_LENGTH,
        );

        this.debugGraphics.lineStyle(2, DEBUG_NORMAL_COLOR, 0.9);
        this.debugGraphics.lineBetween(
            this.sprite.x,
            this.sprite.y,
            this.sprite.x + orientationUp.x * DEBUG_VECTOR_LENGTH,
            this.sprite.y + orientationUp.y * DEBUG_VECTOR_LENGTH,
        );
    }

    public update(
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: {
            left: boolean;
            right: boolean;
            up: boolean;
        },
    ): void {
        if (!this.sprite || !this.sprite.body) {
            return;
        }

        // Find the block surface underneath the player.
        const surfaceNormal = this.findGroundSurfaceNormal();
        if (surfaceNormal) {
            this.groundNormal = surfaceNormal;
            this.isGrounded = true;
        }

        // Gravity always points towards the planet center.
        const gravity = this.getGravityDirection();
        this.applyPointGravity(gravity);
        this.drawDebugVectors(gravity);

        // Movement follows the actual surface normal when grounded.
        // When airborne we use planet gravity as fallback.
        this.handleMovement(cursors, mobileState);

        // Jump away from the surface.
        this.handleJump(cursors, mobileState);

        // Rotate according to the block surface.
        if (this.isGrounded) {
            this.updateRotation();
        } else {
            // While airborne the planet gravity determines the player's orientation.
            this.updateRotation();
        }

        // Update hat.
        this.updateHatPosition();

        // Jump cooldown.
        if (this.jumpCooldown > 0) {
            this.jumpCooldown -= this.scene.game.loop.delta;

            if (this.jumpCooldown < 0) {
                this.jumpCooldown = 0;
            }
        }

        if (this.jumpCooldown > 0) {
            this.jumpCooldown -= this.scene.game.loop.delta;

            if (this.jumpCooldown < 0) {
                this.jumpCooldown = 0;
            }
        }
    }

    private getUpVector(): Phaser.Math.Vector2 {
        const dx = this.sprite.x - this.planet.center.x;
        const dy = this.sprite.y - this.planet.center.y;

        return new Phaser.Math.Vector2(dx, dy).normalize();
    }

    // Calculates a normalized vector from the player towards the center of the planet.
    private getGravityDirection(): Phaser.Math.Vector2 {
        const dx = this.planet.center.x - this.sprite.x;
        const dy = this.planet.center.y - this.sprite.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= 0.0001) {
            return new Phaser.Math.Vector2(0, 1);
        }

        return new Phaser.Math.Vector2(dx / distance, dy / distance);
    }

    // Applies custom gravity towards the center
    // of the planet.
    // Phaser 4 expects a Vector2 here.
    private applyPointGravity(gravity: Phaser.Math.Vector2): void {
        const force = gravity.clone().scale(this.planet.config.gravityStrength);

        this.sprite.applyForce(force);
    }

    // Finds the block the player's feet are actually closest to.
    // This is based on Planet.blocks: Map<string, BlockData> with keys like: "10,15"
    private findGroundSurfaceNormal(): Phaser.Math.Vector2 | null {
        const blockSize = this.planet.config.blockSize;

        // The player's feet are approximately half the player height in the current "down" direction.
        // We use the current ground normal as the initial guess.
        const down = this.groundNormal.clone().negate();
        const feetDistance = this.settings.height / 2 + 2;

        const feetX = this.sprite.x + down.x * feetDistance;
        const feetY = this.sprite.y + down.y * feetDistance;

        const centerGridX = Math.floor(feetX / blockSize);
        const centerGridY = Math.floor(feetY / blockSize);

        let bestBlock: {
            x: number;
            y: number;
        } | null = null;

        let bestDistance = Number.POSITIVE_INFINITY;

        // Search nearby blocks. We only need a 3x3 area around the feet.

        for (let x = centerGridX - 1; x <= centerGridX + 1; x++) {
            for (let y = centerGridY - 1; y <= centerGridY + 1; y++) {
                const block = this.planet.blocks.get(`${x},${y}`);

                if (!block) {
                    continue;
                }

                const blockCenterX = x * blockSize + blockSize / 2;
                const blockCenterY = y * blockSize + blockSize / 2;

                const dx = feetX - blockCenterX;
                const dy = feetY - blockCenterY;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < bestDistance) {
                    bestDistance = distance;

                    bestBlock = {
                        x,
                        y,
                    };
                }
            }
        }

        if (!bestBlock) {
            return null;
        }

        // Determine which side of the block the player is closest to.
        const blockLeft = bestBlock.x * blockSize;
        const blockRight = blockLeft + blockSize;
        const blockTop = bestBlock.y * blockSize;
        const blockBottom = blockTop + blockSize;
        const distanceToLeft = Math.abs(this.sprite.x - blockLeft);
        const distanceToRight = Math.abs(this.sprite.x - blockRight);
        const distanceToTop = Math.abs(this.sprite.y - blockTop);
        const distanceToBottom = Math.abs(this.sprite.y - blockBottom);

        const minimum = Math.min(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom);

        // Normal points OUT of the block.
        if (minimum === distanceToTop) {
            return new Phaser.Math.Vector2(0, -1);
        }

        if (minimum === distanceToBottom) {
            return new Phaser.Math.Vector2(0, 1);
        }

        if (minimum === distanceToLeft) {
            return new Phaser.Math.Vector2(-1, 0);
        }

        return new Phaser.Math.Vector2(1, 0);
    }

    private handleMovement(
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: {
            left: boolean;
            right: boolean;
            up: boolean;
        },
    ): void {
        const isLeft = cursors.left.isDown || Boolean(mobileState?.left);
        const isRight = cursors.right.isDown || Boolean(mobileState?.right);

        const dx = this.planet.center.x - this.sprite.x;
        const dy = this.planet.center.y - this.sprite.y;
        const angleToCenter = Math.atan2(dy, dx);

        const tangentX = -Math.sin(angleToCenter);
        const tangentY = Math.cos(angleToCenter);

        // Vänster / Höger
        if (isLeft) {
            const force = new Phaser.Math.Vector2(tangentX * this.settings.moveForce, tangentY * this.settings.moveForce);
            this.sprite.applyForce(force);
            this.facingRight = false;
        }

        if (isRight) {
            const force = new Phaser.Math.Vector2(-tangentX * this.settings.moveForce, -tangentY * this.settings.moveForce);
            this.sprite.applyForce(force);
            this.facingRight = true;
        }
    }

    private handleJump(
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: {
            left: boolean;
            right: boolean;
            up: boolean;
        },
    ): void {
        if (this.jumpCooldown > 0) {
            return;
        }

        const keyboardJump = Phaser.Input.Keyboard.JustDown(cursors.up);
        const mobileJump = Boolean(mobileState?.up);

        if (!keyboardJump && !mobileJump) {
            return;
        }

        if (!this.isGrounded) {
            return;
        }

        const dx = this.planet.center.x - this.sprite.x;
        const dy = this.planet.center.y - this.sprite.y;
        const angleToCenter = Math.atan2(dy, dx);

        const upX = -Math.cos(angleToCenter);
        const upY = -Math.sin(angleToCenter);

        const targetHeightPixels = this.settings.maxJumpBlocks * this.planet.config.blockSize;
        const requiredVelocity = Math.sqrt(2 * this.planet.config.gravityStrength * targetHeightPixels);

        this.sprite.setVelocity(upX * requiredVelocity, upY * requiredVelocity - 2);

        this.isGrounded = false;
        this.jumpCooldown = 120;
    }

    private updateRotation(): void {
        const dx = this.planet.center.x - this.sprite.x;
        const dy = this.planet.center.y - this.sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            const forceX = (dx / distance) * this.planet.config.gravityStrength;
            const forceY = (dy / distance) * this.planet.config.gravityStrength;

            const force = new Phaser.Math.Vector2(forceX, forceY);
            this.sprite.applyForce(force);

            // Beräkna kontinuerlig vinkel mot centrum
            const rawAngle = Math.atan2(dy, dx) - Math.PI / 2;

            // Snappa till närmaste 90-graderssteg (PI / 2 radianer)
            const snapAngle = Math.round(rawAngle / (Math.PI / 2)) * (Math.PI / 2);

            this.sprite.setRotation(snapAngle);
        }
    }

    private updateHatPosition(): void {
        if (!this.hat || !this.sprite) {
            return;
        }

        // Player's local up direction.
        const upAngle = this.sprite.rotation - Math.PI / 2;
        const upX = Math.cos(upAngle);
        const upY = Math.sin(upAngle);
        const headOffset = this.settings.height / 2;

        this.hat.setPosition(
            this.sprite.x + upX * headOffset,

            this.sprite.y + upY * headOffset,
        );

        this.hat.setRotation(this.sprite.rotation);
        this.hat.setFlipX(!this.facingRight);
    }

    // Matter collision start.
    // We don't blindly consider every collision to be ground.
    // We first make sure the player is close to a real block
    // surface.
    private handleCollisionStart = (event: Phaser.Physics.Matter.Events.CollisionStartEvent): void => {
        if (!this.sprite?.body) {
            return;
        }

        for (const pair of event.pairs) {
            if (pair.bodyA === this.sprite.body || pair.bodyB === this.sprite.body) {
                const normal = this.findGroundSurfaceNormal();

                if (normal) {
                    this.groundNormal = normal;
                    this.isGrounded = true;
                }

                return;
            }
        }
    };

    // Matter collision end.
    // The next update will determine if another block is
    // still underneath the player.
    private handleCollisionEnd = (event: Phaser.Physics.Matter.Events.CollisionEndEvent): void => {
        if (!this.sprite?.body) {
            return;
        }

        for (const pair of event.pairs) {
            if (pair.bodyA === this.sprite.body || pair.bodyB === this.sprite.body) {
                // Don't immediately set grounded=false if another
                // block is still touching the player.
                // update() will resolve it on the next frame.
                return;
            }
        }
    };

    public destroy(): void {
        this.scene.matter.world.off("collisionstart", this.handleCollisionStart);
        this.scene.matter.world.off("collisionend", this.handleCollisionEnd);

        if (this.hat) {
            this.hat.destroy();
        }

        if (this.sprite) {
            this.sprite.destroy();
        }
    }
}
