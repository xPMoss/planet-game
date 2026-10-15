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

export type PlayerDirection = "right" | "left" | "up" | "down" | "up-right" | "up-left" | "down-right" | "down-left";

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
    private direction: PlayerDirection = "right";
    private currentDirections?: Directions; // Grav

    // Stabil vinkel för gravitation och rotation
    private currentSnapAngle: number = 0;

    // Återanvänd Vector2-objekt för att undvika Garbage Collection
    private gravityVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

    private numpadKeys?: Record<string, Phaser.Input.Keyboard.Key>;
    private shiftKey!: Phaser.Input.Keyboard.Key;

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

        // VIKTIGT: Gör fysikkroppen KVADRATISK (bredd x bredd) så att rotationen inte trycker in hörn i marken
        const bodySize = Math.min(this.settings.width, this.settings.height);
        const body = this.scene.matter.bodies.rectangle(startX, startY, bodySize, bodySize, {
            friction: 0, // Ingen friktion mot väggar
            frictionStatic: 1,
            frictionAir: 0.1,
            restitution: 0,
            slop: 0, // Förhindrar att spelaren sjunker in i väggar/golv
            chamfer: { radius: 2 },
        });

        // Visuellt behåller vi samma storlek
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

            this.shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
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

    public getDirection(): PlayerDirection {
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
            direction?: PlayerDirection | null;
        },
    ): void {
        if (!this.sprite.body || !this.sprite.body.velocity || !this.sprite.body.position) return;

        const time = this.scene.time.now;

        const directions = this.calculateDirections();
        if (!directions || directions.distanceToPlanetCenter === 0) return;
        this.currentDirections = directions; // Spara för debug-ritning

        if (!this.isClimbing) {
            this.applyGravity(directions);
        }

        // Kontrollera markkontakt med 3-stråls raycasting
        this.isGrounded = this.checkGroundedWithRay(directions);

        const isUp = Boolean(this.numpadKeys?.up?.isDown) || Boolean(cursors?.up?.isDown) || Boolean(mobileState?.up);
        const isDown = Boolean(this.numpadKeys?.down?.isDown) || Boolean(cursors?.down?.isDown) || Boolean(mobileState?.down);
        const isLeft = Boolean(this.numpadKeys?.left?.isDown) || Boolean(cursors?.left?.isDown) || Boolean(mobileState?.left);
        const isRight = Boolean(this.numpadKeys?.right?.isDown) || Boolean(cursors?.right?.isDown) || Boolean(mobileState?.right);

        const isHoldingShift = Boolean(this.shiftKey?.isDown);
        // Uppdatera riktningen
        if (joystickState?.direction) {
            this.direction = joystickState.direction;
        } else if (isUp && isRight) {
            this.direction = "up-right";
        } else if (isUp && isLeft) {
            this.direction = "up-left";
        } else if (isDown && isRight) {
            this.direction = "down-right";
        } else if (isDown && isLeft) {
            this.direction = "down-left";
        } else if (isUp) {
            this.direction = "up";
        } else if (isDown) {
            this.direction = "down";
        } else if (isLeft) {
            this.direction = "left";
        } else if (isRight) {
            this.direction = "right";
        }

        // Förflyttning blockeras helt om Ctrl hålls in
        const shouldMoveLeft = !isHoldingShift && (isLeft || Boolean(joystickState?.left));
        const shouldMoveRight = !isHoldingShift && (isRight || Boolean(joystickState?.right));

        if (!this.isClimbing) {
            if (shouldMoveLeft || shouldMoveRight) {
                const dirSign = shouldMoveRight ? 1 : -1;
                const blockAhead = this.hasBlockInFront(directions, shouldMoveRight);

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
            } else {
                // Bromsa in spelaren snabbt när inga förflyttningsknappar trycks ned
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

        // Säker kolla av JustDown
        const isSpaceJustDown = Boolean(cursors?.space) && Phaser.Input.Keyboard.JustDown(cursors.space);
        const isMobileJump = Boolean(mobileState?.jump);
        const canJump = time - this.lastJumpTime > this.jumpCooldown;

        const isJumpPressed = (isSpaceJustDown || isMobileJump) && canJump;

        if (isJumpPressed && this.isGrounded && !this.isClimbing) {
            const isMovingRight = this.direction.includes("right");

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

        // Applicera en starkare, konstant gravitationskraft direkt mot marken för klistrad känsla
        const stickyForce = this.gravityStrength * 2;
        this.gravityVector.set(-directions.upX * stickyForce, -directions.upY * stickyForce);
        this.sprite.applyForce(this.gravityVector);

        this.sprite.setRotation(this.currentSnapAngle);
    }

    private calculateDirections(): Directions | undefined {
        if (!this.sprite.body) return;

        const playerPos = this.sprite.body.position;
        const planetCenter = this.planet.center;

        const dx = planetCenter.x - playerPos.x;
        const dy = planetCenter.y - playerPos.y;
        const distanceToPlanetCenter = Math.sqrt(dx * dx + dy * dy);

        if (distanceToPlanetCenter === 0) return;

        const dirX = dx / distanceToPlanetCenter;
        const dirY = dy / distanceToPlanetCenter;

        const blockSize = this.planet.config.blockSize;

        // 1. Bestäm huvudriktningen (0, 90, 180, 270 deg) utifrån var på planeten spelaren står
        const margin = 12;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        let targetAngle = this.currentSnapAngle;

        if (absX > absY + margin) {
            targetAngle = dx > 0 ? -Math.PI / 2 : Math.PI / 2;
        } else if (absY > absX + margin) {
            targetAngle = dy > 0 ? 0 : Math.PI;
        }

        this.currentSnapAngle = targetAngle;

        // Beräkna "UPP"-vektorn baserat på planetens huvudvinkel
        const upX = Math.sin(this.currentSnapAngle);
        const upY = -Math.cos(this.currentSnapAngle);

        // 2. Hitta närmaste markblock under/bredvid spelaren
        const body = this.sprite.body as MatterJS.BodyType;
        const currentGridX = Math.floor(playerPos.x / blockSize);
        const currentGridY = Math.floor(playerPos.y / blockSize);

        // Vi söker efter ett block direkt under spelarens fötter
        const checkGridX = currentGridX - Math.round(upX);
        const checkGridY = currentGridY - Math.round(upY);
        const blockKey = checkGridX + "," + checkGridY;

        const hasSurface = this.planet.blocks.has(blockKey);

        if (hasSurface) {
            // Lås spelarens position mot ytan på det närmaste blocket för att förhindra fall
            const surfaceTargetX = checkGridX * blockSize + blockSize / 2 + upX * (blockSize / 2 + this.settings.height / 2);
            const surfaceTargetY = checkGridY * blockSize + blockSize / 2 + upY * (blockSize / 2 + this.settings.height / 2);

            // "Klistra" spelaren till ytan genom att trycka nedåt och nollställa vertikal hastighet
            const currentUpVel = body.velocity.x * upX + body.velocity.y * upY;
            if (currentUpVel > 0) {
                this.scene.matter.body.setVelocity(body, {
                    x: body.velocity.x - upX * currentUpVel,
                    y: body.velocity.y - upY * currentUpVel,
                });
            }
        }

        // 3. Tillämpa vinkeln på fysikkroppen
        this.scene.matter.body.setAngle(body, this.currentSnapAngle);

        const tangentX = -upY;
        const tangentY = upX;

        const currentVelocity = this.sprite.body.velocity;

        return { tangentX, tangentY, currentVelocity, dirX, dirY, dx, dy, upX, upY, distanceToPlanetCenter };
    }

    private canClimb(directions: Directions, isMovingRight: boolean): boolean {
        const blockSize = this.planet.config.blockSize;
        const dirSign = isMovingRight ? 1 : -1;

        const wallX = Math.floor((this.sprite.x + directions.tangentX * blockSize * dirSign) / blockSize);
        const wallY = Math.floor((this.sprite.y + directions.tangentY * blockSize * dirSign) / blockSize);

        const headX = Math.floor((this.sprite.x + directions.upX * blockSize) / blockSize);
        const headY = Math.floor((this.sprite.y + directions.upY * blockSize) / blockSize);

        const targetX = Math.floor((this.sprite.x + directions.upX * blockSize + directions.tangentX * blockSize * dirSign) / blockSize);
        const targetY = Math.floor((this.sprite.y + directions.upY * blockSize + directions.tangentY * blockSize * dirSign) / blockSize);

        const hasWall = this.planet.blocks.has(wallX + "," + wallY);
        const hasCeiling = this.planet.blocks.has(headX + "," + headY);
        const isTargetBlocked = this.planet.blocks.has(targetX + "," + targetY);

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
        this.hat.setFlipX(this.direction.includes("left"));
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

        if (this.direction.includes("right")) pupilOffsetX = 4;
        if (this.direction.includes("left")) pupilOffsetX = -4;
        if (this.direction.includes("up")) pupilOffsetY = -4;
        if (this.direction.includes("down")) pupilOffsetY = 4;

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

        if (isDebugActive && this.sprite && this.currentDirections) {
            const playerX = this.sprite.x;
            const playerY = this.sprite.y;

            // Välj längd på gravitationspilen (i pixlar)
            const vectorLength = 32;

            // Gravitationen drar i riktningen (-upX, -upY)
            const gravityDirX = -this.currentDirections.upX;
            const gravityDirY = -this.currentDirections.upY;

            const endX = playerX + gravityDirX * vectorLength;
            const endY = playerY + gravityDirY * vectorLength;

            // 1. Rita gravitationsvektorn (Röd linje)
            this.debugGraphics.lineStyle(2, 0xff0000, 1);
            this.debugGraphics.lineBetween(playerX, playerY, endX, endY);

            // 2. Rita en liten cirkel vid pilens spets
            this.debugGraphics.fillStyle(0xff0000, 1);
            this.debugGraphics.fillCircle(endX, endY, 3);

            // 3. (Valfritt) Rita tangenten / gå-riktningen i Blått
            const tangentEndX = playerX + this.currentDirections.tangentX * vectorLength;
            const tangentEndY = playerY + this.currentDirections.tangentY * vectorLength;
            this.debugGraphics.lineStyle(1, 0x0000ff, 0.7);
            this.debugGraphics.lineBetween(playerX, playerY, tangentEndX, tangentEndY);

            // Debug-text
            const direction = this.getDirection();
            this.debugText.setPosition(playerX - 10, playerY - 28);
            this.debugText.setText("Dir: " + direction);
            this.debugText.setVisible(true);
        } else {
            this.debugText.setVisible(false);
        }
    }
}
