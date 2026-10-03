import Phaser from "phaser";
import { Planet } from "planet";
import { type PlayerSettings, DEFAULT_PLAYER_SETTINGS, createPlayerHatTexture, createPlayerTexture } from "./playerHelpers";
import type { MobileInputState } from "ui";

type Directions = {
    tangentX: number;
    tangentY: number;
    currentVelocity: Phaser.Math.Vector2 | MatterJS.Vector;
    dirX: number;
    dirY: number;
    dx: number;
    dy: number;
    upX: number;
    upY: number;
    distanceToPlanetCenter: number;
};

export class Player {
    private debugGraphics!: Phaser.GameObjects.Graphics;
    private debugText!: Phaser.GameObjects.Text;

    private scene: Phaser.Scene;
    private planet: Planet;
    public sprite: Phaser.Physics.Matter.Sprite;
    private readonly settings: PlayerSettings;

    private gravityStrength: number = 0.001;
    private maxVelocity: number = 2;
    private moveSpeed: number = 2;
    private isGrounded: boolean = false;
    private isClimbing: boolean = false;

    // Cooldown för klättring
    private lastJumpTime: number = 0;
    private jumpCooldown: number = 250;

    private hat!: Phaser.GameObjects.Sprite;
    private eyesGraphics!: Phaser.GameObjects.Graphics;
    private direction: "right" | "left" | "up" | "down" = "right";

    // Återanvänd Vector2-objekt för att undvika Garbage Collection
    private gravityVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

    private numpadKeys?: Record<string, Phaser.Input.Keyboard.Key>;

    constructor(scene: Phaser.Scene, planet: Planet) {
        this.scene = scene;
        this.planet = planet;
        this.settings = { ...DEFAULT_PLAYER_SETTINGS };

        // Stäng av den globala gravitationen i Matter-världen
        this.scene.matter.world.setGravity(0, 0);

        // Skapa spriten på planetens skapade yta
        const startX = planet.center.x;
        const startY = planet.center.y - (planet.config.radius * planet.config.blockSize + 20);

        // Skapa spelarens textur om den inte redan genererats
        if (!this.scene.textures.exists("player_tile")) {
            createPlayerTexture(this.scene, "player_tile", 0x00ff00);
        }

        this.sprite = this.scene.matter.add.sprite(startX, startY, "player_tile");

        const body = this.scene.matter.bodies.rectangle(startX, startY, this.settings.width, this.settings.height, {
            friction: 0, // Ingen friktion mot väggar
            frictionStatic: 1,
            frictionAir: 0.1,
            restitution: 0,
            slop: 0, // Förhindrar att spelaren sjunker in i väggar/golv
            chamfer: { radius: 6 },
        });
        this.sprite.setDisplaySize(this.settings.width, this.settings.height);

        if (this.sprite.body) {
            const body = this.sprite.body as MatterJS.BodyType;
            (body as unknown as { isContinuous: boolean }).isContinuous = true;
        }

        this.sprite.setExistingBody(body);
        this.sprite.setFixedRotation();

        if (scene.input.keyboard) {
            this.numpadKeys = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT,
                down: Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,
                left: Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR,
                right: Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX,
            }) as Record<string, Phaser.Input.Keyboard.Key>;
        }

        this.createDebug();
    }

    public spawn(): void {
        if (!this.scene.textures.exists("player_tile")) {
            createPlayerTexture(this.scene, "player_tile", 0x00ff00);
        }

        if (!this.scene.textures.exists("player_hat")) {
            createPlayerHatTexture(this.scene, "player_hat", 0xff0000);
            this.hat = this.scene.add.sprite(this.sprite.x, this.sprite.y, "player_hat");
            this.hat.setScale(0.25);
            this.hat.setOrigin(0.5, 1);
        }

        this.eyesGraphics = this.scene.add.graphics();
    }

    public getDirection(): "right" | "left" | "up" | "down" {
        return this.direction;
    }

    public update(
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: MobileInputState,
        keyboard?: Phaser.Input.Keyboard.KeyboardPlugin,
        joystickState?: {
            up: boolean;
            down: boolean;
            left: boolean;
            right: boolean;
            direction?: "left" | "right" | "up" | "down" | null;
        },
    ): void {
        if (!this.sprite.body || !this.sprite.body.velocity || !this.sprite.body.position) return;

        const time = this.scene.time.now;

        const directions = this.calculateDirections()!;
        if (directions.distanceToPlanetCenter === 0) return;

        if (!this.isClimbing) {
            this.applyGravity(directions);
        }

        // Kontrollera markkontakt med 3-stråls raycasting
        this.isGrounded = this.checkGroundedWithRay(directions);

        if (joystickState?.direction) {
            this.direction = joystickState.direction;
        }

        const isUp =
            Boolean(this.numpadKeys?.up?.isDown) || Boolean(cursors?.up?.isDown) || Boolean(mobileState?.up) || Boolean(joystickState?.up);
        const isDown =
            Boolean(this.numpadKeys?.down?.isDown) ||
            Boolean(cursors?.down?.isDown) ||
            Boolean(mobileState?.down) ||
            Boolean(joystickState?.down);
        const isLeft =
            Boolean(this.numpadKeys?.left?.isDown) ||
            Boolean(cursors?.left?.isDown) ||
            Boolean(mobileState?.left) ||
            Boolean(joystickState?.left);
        const isRight =
            Boolean(this.numpadKeys?.right?.isDown) ||
            Boolean(cursors?.right?.isDown) ||
            Boolean(mobileState?.right) ||
            Boolean(joystickState?.right);

        if (!this.isClimbing) {
            if (isLeft || isRight) {
                const dirSign = isRight ? 1 : -1;
                const blockAhead = this.hasBlockInFront(directions, isRight);

                let moveX = directions.tangentX * dirSign;
                let moveY = directions.tangentY * dirSign;

                if (blockAhead) {
                    const length = Math.SQRT2;
                    moveX = (moveX + directions.upX) / length;
                    moveY = (moveY + directions.upY) / length;
                }

                this.sprite.setVelocity(
                    moveX * this.moveSpeed + directions.currentVelocity.x * 0.1,
                    moveY * this.moveSpeed + directions.currentVelocity.y * 0.1,
                );

                this.direction = isRight ? "right" : "left";
            } else {
                // Bromsa in spelaren snabbt när inga styrknappar trycks ned
                const body = this.sprite.body as MatterJS.BodyType;

                const currentTangentSpeed = body.velocity.x * directions.tangentX + body.velocity.y * directions.tangentY;
                const upSpeed = body.velocity.x * directions.upX + body.velocity.y * directions.upY;

                const newTangentSpeed = currentTangentSpeed * 0.8;

                this.scene.matter.body.setVelocity(body, {
                    x: directions.tangentX * newTangentSpeed + directions.upX * upSpeed,
                    y: directions.tangentY * newTangentSpeed + directions.upY * upSpeed,
                });
            }
        }

        if (isDown) {
            this.direction = "down";
        } else if (isUp) {
            this.direction = "up";
        }

        // Säker kolla av JustDown
        const isSpaceJustDown = Boolean(cursors?.space) && Phaser.Input.Keyboard.JustDown(cursors.space);
        const isMobileJump = Boolean(mobileState?.jump);
        const canJump = time - this.lastJumpTime > this.jumpCooldown;

        const isJumpPressed = (isSpaceJustDown || isMobileJump) && canJump;
        // Player.ts (Inuti update-metoden under klättringslogiken)
        // Player.ts (i update-metoden)

        if (isJumpPressed && this.isGrounded && !this.isClimbing) {
            const isMovingRight = this.direction === "right";

            if (this.canClimb(directions, isMovingRight)) {
                this.isClimbing = true;
                const dirSign = isMovingRight ? 1 : -1;
                const stepSize = this.planet.config.blockSize;

                const body = this.sprite.body as MatterJS.BodyType;

                const targetX = this.sprite.x + directions.upX * stepSize + directions.tangentX * stepSize * dirSign;
                const targetY = this.sprite.y + directions.upY * stepSize + directions.tangentY * stepSize * dirSign;

                this.sprite.setSensor(true);

                this.scene.tweens.add({
                    targets: this.sprite,
                    x: targetX,
                    y: targetY,
                    duration: 180,
                    ease: "Linear",
                    onUpdate: () => {
                        this.scene.matter.body.setPosition(body, {
                            x: this.sprite.x,
                            y: this.sprite.y,
                        });
                    },
                    onComplete: () => {
                        this.scene.matter.body.setPosition(body, {
                            x: targetX,
                            y: targetY,
                        });
                        this.scene.matter.body.setVelocity(body, { x: 0, y: 0 });

                        this.sprite.setSensor(false);
                        this.isClimbing = false;
                        this.lastJumpTime = time;
                    },
                });
            }
        }
        const body = this.sprite.body as MatterJS.BodyType;
        const velX = body.velocity.x;
        const velY = body.velocity.y;

        const tangentSpeed = velX * directions.tangentX + velY * directions.tangentY;

        if (Math.abs(tangentSpeed) > this.maxVelocity && !this.isClimbing) {
            const clampedTangent = Math.sign(tangentSpeed) * this.maxVelocity;
            const diff = clampedTangent - tangentSpeed;

            this.scene.matter.body.setVelocity(body, {
                x: velX + directions.tangentX * diff,
                y: velY + directions.tangentY * diff,
            });
        }

        this.updateHatPosition();
        this.drawEyes();
        this.updateDebugGraphics();
    }

    private checkGroundedWithRay(directions: Directions): boolean {
        if (!this.sprite.body) return false;

        const startX = this.sprite.x;
        const startY = this.sprite.y;

        const rayLength = this.settings.height / 2 + 3;
        const halfWidth = this.settings.width / 2 - 1;

        const allBodies = this.scene.matter.world.getAllBodies();
        const bodiesToTest = allBodies.filter((body) => body !== this.sprite.body);

        const offsets = [-halfWidth, 0, halfWidth];

        for (const offset of offsets) {
            const originX = startX + directions.tangentX * offset;
            const originY = startY + directions.tangentY * offset;

            const endX = originX - directions.upX * rayLength;
            const endY = originY - directions.upY * rayLength;

            const collisions = this.scene.matter.query.ray(bodiesToTest, { x: originX, y: originY }, { x: endX, y: endY });

            if (collisions.length > 0) {
                return true;
            }
        }

        return false;
    }

    private applyGravity(directions: Directions): void {
        if (!this.sprite.body) return;

        this.gravityVector.set(-directions.upX * this.gravityStrength, -directions.upY * this.gravityStrength);
        this.sprite.applyForce(this.gravityVector);

        const rawAngle = Math.atan2(directions.dy, directions.dx) - Math.PI / 2;
        const snapAngle = Math.round(rawAngle / (Math.PI / 2)) * (Math.PI / 2);
        this.sprite.setRotation(snapAngle);
    }

    private calculateDirections(): Directions | undefined {
        if (!this.sprite.body) return;

        const playerPos = this.sprite.body.position;
        const planetCenter = this.planet.center;

        const dx = planetCenter.x - playerPos.x;
        const dy = planetCenter.y - playerPos.y;
        const distanceToPlanetCenter = Math.sqrt(dx * dx + dy * dy);

        const dirX = dx / distanceToPlanetCenter;
        const dirY = dy / distanceToPlanetCenter;

        const rawAngle = Math.atan2(dy, dx) - Math.PI / 2;
        const snapAngle = Math.round(rawAngle / (Math.PI / 2)) * (Math.PI / 2);

        const upX = Math.cos(snapAngle - Math.PI / 2);
        const upY = Math.sin(snapAngle - Math.PI / 2);

        const tangentX = -upY;
        const tangentY = upX;

        const currentVelocity = this.sprite.body.velocity;

        return { tangentX, tangentY, currentVelocity, dirX, dirY, dx, dy, upX, upY, distanceToPlanetCenter };
    }

    // Player.ts

    private canClimb(directions: Directions, isMovingRight: boolean): boolean {
        const blockSize = this.planet.config.blockSize;
        const dirSign = isMovingRight ? 1 : -1;

        // 1. Positionen direkt framför spelaren (väggen)
        const wallX = Math.floor((this.sprite.x + directions.tangentX * blockSize * dirSign) / blockSize);
        const wallY = Math.floor((this.sprite.y + directions.tangentY * blockSize * dirSign) / blockSize);

        // 2. Positionen direkt ovanför spelaren (taket)
        const headX = Math.floor((this.sprite.x + directions.upX * blockSize) / blockSize);
        const headY = Math.floor((this.sprite.y + directions.upY * blockSize) / blockSize);

        // 3. Målpositionen snett uppåt/framåt
        const targetX = Math.floor((this.sprite.x + directions.upX * blockSize + directions.tangentX * blockSize * dirSign) / blockSize);
        const targetY = Math.floor((this.sprite.y + directions.upY * blockSize + directions.tangentY * blockSize * dirSign) / blockSize);

        const hasWall = this.planet.blocks.has(wallX + "," + wallY);
        const hasCeiling = this.planet.blocks.has(headX + "," + headY);
        const isTargetBlocked = this.planet.blocks.has(targetX + "," + targetY);

        // Klättring är endast tillåten om det finns en vägg framför, MEN inget tak och inget block på målplatsen
        return hasWall && !hasCeiling && !isTargetBlocked;
    }

    private hasBlockInFront(directions: Directions, isRight: boolean): boolean {
        const blockSize = this.planet.config.blockSize;
        const dirSign = isRight ? 1 : -1;

        const frontX = this.sprite.x + directions.tangentX * blockSize * dirSign;
        const frontY = this.sprite.y + directions.tangentY * blockSize * dirSign;

        const gridX = Math.floor(frontX / blockSize);
        const gridY = Math.floor(frontY / blockSize);

        return this.planet.blocks.has(gridX + "," + gridY);
    }

    private updateHatPosition(): void {
        if (!this.hat || !this.sprite) return;

        const currentRotation = this.sprite.rotation;
        const upAngle = currentRotation - Math.PI / 2;

        const upX = Math.cos(upAngle);
        const upY = Math.sin(upAngle);

        const headOffset = this.settings.height / 2;

        this.hat.setPosition(this.sprite.x + upX * headOffset, this.sprite.y + upY * headOffset);
        this.hat.setRotation(currentRotation);
        this.hat.setFlipX(this.direction === "left");
    }

    private drawEyes(): void {
        if (!this.eyesGraphics || !this.sprite) return;

        this.eyesGraphics.clear();
        this.eyesGraphics.setPosition(this.sprite.x, this.sprite.y);
        this.eyesGraphics.setRotation(this.sprite.rotation);

        const eyeScale = 0.25;
        this.eyesGraphics.setScale(eyeScale);

        let pupilOffsetX = 0;
        let pupilOffsetY = 0;

        if (this.direction === "right") pupilOffsetX = 4;
        if (this.direction === "left") pupilOffsetX = -4;
        if (this.direction === "up") pupilOffsetY = -4;
        if (this.direction === "down") pupilOffsetY = 4;

        this.eyesGraphics.fillStyle(0xffffff, 1);
        this.eyesGraphics.fillRect(-16, -16, 12, 16);
        this.eyesGraphics.fillRect(4, -16, 12, 16);

        this.eyesGraphics.fillStyle(0x000000, 1);
        this.eyesGraphics.fillRect(-12 + pupilOffsetX, -12 + pupilOffsetY, 8, 8);
        this.eyesGraphics.fillRect(8 + pupilOffsetX, -12 + pupilOffsetY, 8, 8);
    }

    private createDebug() {
        this.debugGraphics = this.scene.add.graphics();
        this.debugText = this.scene.add.text(0, 0, "", {
            fontFamily: "monospace",
            fontSize: "16px",
            align: "center",
            color: "#ffffff",
            backgroundColor: "#00000088",
        });
        this.debugText.setDepth(100);
        this.debugText.setScale(0.5);
    }

    private updateDebugGraphics(): void {
        this.debugGraphics.clear();

        const isDebugActive = this.scene.matter.world.drawDebug;

        if (isDebugActive && this?.sprite) {
            const playerX = this.sprite.x;
            const playerY = this.sprite.y;
            const direction = this.getDirection();

            this.debugText.setPosition(playerX - 10, playerY - 24);
            this.debugText.setText(direction);
            this.debugText.setVisible(false);
        } else {
            this.debugText.setVisible(false);
        }
    }
}
