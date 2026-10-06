import Phaser from "phaser";
import { Planet } from "planet";
import { type PlayerSettings, DEFAULT_PLAYER_SETTINGS, createPlayerHatTexture, createPlayerTexture } from "player";
import { CATEGORY_PLAYER, CATEGORY_TERRAIN } from "planet";
import type { MobileInputState } from "ui";
import { BlockType } from "types";
import { useGameStore } from "store";

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

    private isGrounded: boolean = false;
    private isClimbing: boolean = false;

    // Cooldown för klättring
    private lastJumpTime: number = 0;

    private bodySprite!: Phaser.GameObjects.Sprite; // Separat visningsgrafik för kroppen
    private hat!: Phaser.GameObjects.Sprite;
    private eyesGraphics!: Phaser.GameObjects.Graphics;
    private armorGraphics!: Phaser.GameObjects.Graphics; // Grafik för utrustning (hjälm, kläder, skor)
    private direction: PlayerDirection = "right";

    private weaponGraphics!: Phaser.GameObjects.Graphics;

    // Stabil vinkel för gravitation och rotation
    private currentSnapAngle: number = 0;
    private currentDirections?: Directions;
    private activeBlockPos?: { x: number; y: number };

    // Återanvänd Vector2-objekt för att undvika Garbage Collection
    private gravityVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

    private numpadKeys?: Record<string, Phaser.Input.Keyboard.Key>;
    private shiftKey!: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, planet: Planet, customSettings?: Partial<PlayerSettings>) {
        this.scene = scene;
        this.planet = planet;
        this.settings = { ...DEFAULT_PLAYER_SETTINGS, ...customSettings };

        if (scene.input.keyboard) {
            this.numpadKeys = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT,
                down: Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,
                left: Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR,
                right: Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX,
            }) as Record<string, Phaser.Input.Keyboard.Key>;

            this.shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        }

        // Hitta en säker spawn-position fri från träd och hinder
        const spawnPos = this.findSpawnPosition();
        const startX = spawnPos.x;
        const startY = spawnPos.y;

        // Kvadratisk fysikkropp (12x12) så att rotation vid hörn inte trycker in spelaren i marken
        const bodySize = Math.min(this.settings.width, this.settings.height);
        const body = this.scene.matter.bodies.rectangle(startX, startY, bodySize, bodySize, {
            friction: this.settings.friction,
            frictionStatic: this.settings.frictionStatic,
            frictionAir: this.settings.frictionAir,
            restitution: this.settings.restitution,
            slop: 0,
            chamfer: { radius: 2 },
        });

        this.sprite = this.scene.matter.add.sprite(startX, startY, "player_tile");
        this.sprite.setDisplaySize(this.settings.width, this.settings.height);

        if (this.sprite.body) {
            const body = this.sprite.body as MatterJS.BodyType;
            (body as unknown as { isContinuous: boolean }).isContinuous = true;
        }

        this.sprite.setData("isPlayer", true);

        // Sätt att spelaren tillhör CATEGORY_PLAYER och ENDAST krockar med CATEGORY_TERRAIN
        this.sprite.setCollisionCategory(CATEGORY_PLAYER);
        this.sprite.setCollidesWith([CATEGORY_TERRAIN]);

        this.sprite.setExistingBody(body);
        this.sprite.setFixedRotation();
        this.sprite.setVisible(false);

        this.createDebug();
    }

    public spawn(): void {
        if (!this.scene.textures.exists("player_tile")) {
            createPlayerTexture(this.scene, "player_tile", this.settings.bodyColor);
        }

        this.bodySprite = this.scene.add.sprite(this.sprite.x, this.sprite.y, "player_tile");
        this.bodySprite.setDisplaySize(this.settings.width, this.settings.height);
        this.bodySprite.setDepth(10);

        if (!this.scene.textures.exists("player_hat")) {
            createPlayerHatTexture(this.scene, "player_hat", this.settings.hatColor);
            this.hat = this.scene.add.sprite(this.sprite.x, this.sprite.y, "player_hat");
            this.hat.setScale(this.settings.hatScale);
            this.hat.setOrigin(0.5, 1);
            this.hat?.setDepth(12);
        }

        this.armorGraphics = this.scene.add.graphics();
        this.armorGraphics?.setDepth(11);

        this.eyesGraphics = this.scene.add.graphics();
        this.eyesGraphics?.setDepth(13);

        this.weaponGraphics = this.scene.add.graphics();
        this.weaponGraphics.setDepth(100);
    }

    private findSpawnPosition(): { x: number; y: number } {
        const radius = this.planet.config.radius;
        const mapSize = radius * 2;
        const blockSize = this.planet.config.blockSize;

        let bestGridX = Math.floor(radius);
        let bestSurfaceY = -1;

        // Sök efter en lämplig kolumn i närheten av mitten (x = radius)
        for (let offsetX = 0; offsetX < radius; offsetX = offsetX <= 0 ? -offsetX + 1 : -offsetX) {
            const checkX = Math.floor(radius) + offsetX;
            if (checkX < 0 || checkX >= mapSize) continue;

            // Hitta det översta blocket i den aktuella kolumnen
            let highestBlockY = -1;
            let highestBlockType: BlockType | null = null;

            for (let y = 0; y < mapSize; y++) {
                const block = this.planet.blocks.get(checkX + "," + y);
                if (block) {
                    highestBlockY = y;
                    highestBlockType = block.type;
                    break;
                }
            }

            // Om det översta blocket är DIRT eller STONE är det säkert att spawna ovanför
            if (highestBlockY !== -1 && (highestBlockType === BlockType.DIRT || highestBlockType === BlockType.STONE)) {
                bestGridX = checkX;
                bestSurfaceY = highestBlockY;
                break;
            }
        }

        // Om ingen ren mark hittades, fall tillbaka på toppen av den mittersta kolumnen
        if (bestSurfaceY === -1) {
            for (let y = 0; y < mapSize; y++) {
                const block = this.planet.blocks.get(Math.floor(radius) + "," + y);
                if (block) {
                    bestSurfaceY = y;
                    break;
                }
            }
        }

        const worldX = bestGridX * blockSize + blockSize / 2;
        // Placera spelaren precis ovanför det översta blocket
        const worldY = (bestSurfaceY - 1) * blockSize + blockSize / 2;

        return { x: worldX, y: worldY };
    }

    public getDirection(): PlayerDirection {
        return this.direction;
    }

    private isBoarded: boolean = false;

    public setBoarded(boarded: boolean, position?: { x: number; y: number }): void {
        this.isBoarded = boarded;
        this.bodySprite?.setVisible(!boarded);
        this.hat?.setVisible(!boarded);
        this.eyesGraphics?.setVisible(!boarded);
        this.armorGraphics?.setVisible(!boarded);
        this.sprite.setSensor(boarded);

        if (position) {
            this.sprite.setPosition(position.x, position.y);
            const body = this.sprite.body as MatterJS.BodyType;
            if (body) {
                this.scene.matter.body.setPosition(body, position);
                this.scene.matter.body.setVelocity(body, { x: 0, y: 0 });
            }
        }
    }

    public update(
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: MobileInputState,
        joystickState?: {
            up: boolean;
            down: boolean;
            left: boolean;
            right: boolean;
            direction?: PlayerDirection | null;
        },
    ): void {
        if (this.isBoarded) return;
        this.updatePlayer(cursors, mobileState, joystickState);
        this.updateBodyPosition();
        this.updateHatPosition();
        this.drawEyes();
        this.drawEquipment();
        this.updateDebugGraphics();
    }

    private updatePlayer(
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: MobileInputState,
        joystickState?: {
            up: boolean;
            down: boolean;
            left: boolean;
            right: boolean;
            direction?: PlayerDirection | null;
        },
    ) {
        if (!this.sprite.body || !this.sprite.body.velocity || !this.sprite.body.position) return;

        const time = this.scene.time.now;

        const directions = this.calculateDirections();
        if (!directions || directions.distanceToPlanetCenter === 0) return;

        if (!this.isClimbing) {
            this.applyGravity(directions);
        }

        this.isGrounded = this.checkGroundedWithRay(directions);

        const isUp = Boolean(this.numpadKeys?.up?.isDown) || Boolean(cursors?.up?.isDown) || Boolean(mobileState?.up);
        const isDown = Boolean(this.numpadKeys?.down?.isDown) || Boolean(cursors?.down?.isDown) || Boolean(mobileState?.down);
        const isLeft = Boolean(this.numpadKeys?.left?.isDown) || Boolean(cursors?.left?.isDown) || Boolean(mobileState?.left);
        const isRight = Boolean(this.numpadKeys?.right?.isDown) || Boolean(cursors?.right?.isDown) || Boolean(mobileState?.right);

        const isHoldingShift = Boolean(this.shiftKey?.isDown);

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

        const shouldMoveLeft = !isHoldingShift && (isLeft || Boolean(joystickState?.left));
        const shouldMoveRight = !isHoldingShift && (isRight || Boolean(joystickState?.right));

        // Hastighetsmultiplikator baserad på skor
        const boots = useGameStore.getState().equipment.boots;
        const speedMultiplier = boots && boots.speedBonus ? boots.speedBonus : 1;
        const effectiveMoveSpeed = this.settings.moveSpeed * speedMultiplier;

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
                    moveX * effectiveMoveSpeed + directions.currentVelocity.x * 0.1,
                    moveY * effectiveMoveSpeed + directions.currentVelocity.y * 0.1,
                );
            } else {
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

        const isSpaceJustDown = Boolean(cursors?.space) && Phaser.Input.Keyboard.JustDown(cursors.space);
        const isMobileJump = Boolean(mobileState?.jump);
        const canJump = time - this.lastJumpTime > this.settings.jumpCooldown;

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
                    duration: this.settings.climbDuration,
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

        if (Math.abs(tangentSpeed) > this.settings.maxVelocity && !this.isClimbing) {
            const clampedTangent = Math.sign(tangentSpeed) * this.settings.maxVelocity;
            const diff = clampedTangent - tangentSpeed;

            this.scene.matter.body.setVelocity(body, {
                x: velX + directions.tangentX * diff,
                y: velY + directions.tangentY * diff,
            });
        }
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

        // Gravitationen drar mot planetens centrum (-upX, -upY)
        this.gravityVector.set(-directions.upX * this.settings.gravityStrength, -directions.upY * this.settings.gravityStrength);
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

        // Bestäm vinkeln utifrån spelarens position relativt planetens centrum (0, 90, 180, 270 deg)
        const margin = 12;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        let targetAngle = this.currentSnapAngle;

        if (absX > absY + margin) {
            targetAngle = dx > 0 ? -Math.PI / 2 : Math.PI / 2;
        } else if (absY > absX + margin) {
            targetAngle = dy > 0 ? 0 : Math.PI;
        }

        // Byt vinkel på fysikkroppen vid sidändring
        if (targetAngle !== this.currentSnapAngle) {
            this.currentSnapAngle = targetAngle;
            const body = this.sprite.body as MatterJS.BodyType;
            this.scene.matter.body.setVelocity(body, { x: 0, y: 0 });
            this.scene.matter.body.setAngle(body, targetAngle);
        }

        const upX = Math.sin(this.currentSnapAngle);
        const upY = -Math.cos(this.currentSnapAngle);

        // Hitta markblocket direkt under fötterna för debug-visning
        const currentGridX = Math.floor(playerPos.x / blockSize);
        const currentGridY = Math.floor(playerPos.y / blockSize);
        const feetGridX = currentGridX - Math.round(upX);
        const feetGridY = currentGridY - Math.round(upY);
        const feetKey = feetGridX + "," + feetGridY;

        if (this.planet.blocks.has(feetKey)) {
            this.activeBlockPos = { x: feetGridX, y: feetGridY };
        } else {
            this.activeBlockPos = undefined;
        }

        const tangentX = -upY;
        const tangentY = upX;

        const currentVelocity = this.sprite.body.velocity;

        const directionsResult = { tangentX, tangentY, currentVelocity, dirX, dirY, dx, dy, upX, upY, distanceToPlanetCenter };
        this.currentDirections = directionsResult;

        return directionsResult;
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

    private updateBodyPosition(): void {
        if (!this.bodySprite || !this.sprite) return;

        const currentRotation = this.sprite.rotation;
        const upAngle = currentRotation - Math.PI / 2;

        const upX = Math.cos(upAngle);
        const upY = Math.sin(upAngle);

        // Beräkna förskjutningen i "upp"-riktningen baserat på kroppens rotation
        const offsetX = upX;
        const offsetY = upY * +2;

        this.bodySprite.setPosition(this.sprite.x + offsetX, this.sprite.y + offsetY);
        this.bodySprite.setRotation(currentRotation);
    }

    private updateHatPosition(): void {
        if (!this.hat || !this.sprite) return;

        const currentRotation = this.sprite.rotation;
        const upAngle = currentRotation - Math.PI / 2;

        const upX = Math.cos(upAngle);
        const upY = Math.sin(upAngle);

        const headOffset = this.settings.height / 2 + 2;

        this.hat.setPosition(this.sprite.x + upX * headOffset, this.sprite.y + upY * headOffset);
        this.hat.setRotation(currentRotation);
        this.hat.setFlipX(this.direction.includes("left"));
    }

    private drawEquipment(): void {
        if (!this.armorGraphics || !this.sprite) return;

        this.armorGraphics.clear();
        this.armorGraphics.setPosition(this.sprite.x, this.sprite.y);
        this.armorGraphics.setRotation(this.sprite.rotation);

        const equipment = useGameStore.getState().equipment;

        // 1. Kläder (Chest)
        if (equipment.armor) {
            this.armorGraphics.fillStyle(equipment.armor.color, 1);
            this.armorGraphics.fillRect(-6, -4, 12, 8);
        }

        // 2. Skor (Boots)
        if (equipment.boots) {
            this.armorGraphics.fillStyle(equipment.boots.color, 1);
            this.armorGraphics.fillRect(-6, 4, 5, 4);
            this.armorGraphics.fillRect(1, 4, 5, 4);
        }

        // 3. Hjälm (Helmet)
        if (equipment.helmet) {
            this.armorGraphics.fillStyle(equipment.helmet.color, 1);
            this.armorGraphics.fillRect(-7, -10, 14, 5);
        }
    }

    private drawEyes(): void {
        if (!this.eyesGraphics || !this.sprite) return;

        this.eyesGraphics.clear();
        this.eyesGraphics.setPosition(this.sprite.x, this.sprite.y - 2);
        this.eyesGraphics.setRotation(this.sprite.rotation);

        this.eyesGraphics.setScale(this.settings.eyeScale);

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

    // src/game/player/Player.ts
    // src/game/player/Player.ts

    public swingWeapon(): void {
        if (!this.weaponGraphics || !this.sprite) return;

        // Rensa tidigare tweens & grafik
        this.scene.tweens.killTweensOf(this.weaponGraphics);
        this.weaponGraphics.clear();
        this.weaponGraphics.setAlpha(1);
        this.weaponGraphics.setPosition(this.sprite.x, this.sprite.y);
        this.weaponGraphics.setRotation(this.sprite.rotation);

        const radius = 30;

        // Vinkeloffset för de 8 riktningarna relativt spelarens lokala koordinatsystem
        let baseAngle = 0;

        switch (this.direction) {
            case "right":
                baseAngle = 0;
                break;
            case "down-right":
                baseAngle = Math.PI * 0.25;
                break;
            case "down":
                baseAngle = Math.PI * 0.5;
                break;
            case "down-left":
                baseAngle = Math.PI * 0.75;
                break;
            case "left":
                baseAngle = Math.PI;
                break;
            case "up-left":
                baseAngle = -Math.PI * 0.75;
                break;
            case "up":
                baseAngle = -Math.PI * 0.5;
                break;
            case "up-right":
                baseAngle = -Math.PI * 0.25;
                break;
        }

        // Bågens bredd (cirka 90 grader)
        const arcHalfWidth = Math.PI * 0.25;
        const startAngle = baseAngle - arcHalfWidth;
        const endAngle = baseAngle + arcHalfWidth;

        // Yttre neonbåge (Cyan/Blå)
        this.weaponGraphics.lineStyle(8, 0x00ffff, 0.8);
        this.weaponGraphics.beginPath();
        this.weaponGraphics.arc(0, 0, radius, startAngle, endAngle, false);
        this.weaponGraphics.strokePath();

        // Inre skarp vit klinga
        this.weaponGraphics.lineStyle(3, 0xffffff, 1.0);
        this.weaponGraphics.beginPath();
        this.weaponGraphics.arc(0, 0, radius - 2, startAngle, endAngle, false);
        this.weaponGraphics.strokePath();

        // Tona ut grafiken
        this.scene.tweens.add({
            targets: this.weaponGraphics,
            alpha: 0,
            duration: 180,
            ease: "Cubic.out",
            onComplete: () => {
                this.weaponGraphics.clear();
            },
        });
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
            const blockSize = this.planet.config.blockSize;

            // 1. Markera det aktiva markblocket med en färgad ram (om det finns ett)
            if (this.activeBlockPos) {
                const blockWorldX = this.activeBlockPos.x * blockSize;
                const blockWorldY = this.activeBlockPos.y * blockSize;

                const activeBlockColor = 0x9933ff;
                this.debugGraphics.lineStyle(2, activeBlockColor, 1);
                this.debugGraphics.fillStyle(activeBlockColor, 0.8);
                this.debugGraphics.strokeRect(blockWorldX, blockWorldY, blockSize, blockSize);
                this.debugGraphics.fillRect(blockWorldX, blockWorldY, blockSize, blockSize);
            }

            // 2. Rita gravitationsvektorn i rött (pekar mot centrum)
            const vectorLength = 24;
            const gravityDirX = -this.currentDirections.upX;
            const gravityDirY = -this.currentDirections.upY;

            const endX = playerX + gravityDirX * vectorLength;
            const endY = playerY + gravityDirY * vectorLength;

            const gravityColor = 0xff0000; // Röd (Gravitationspilen)
            this.debugGraphics.lineStyle(3, gravityColor, 1);
            this.debugGraphics.lineBetween(playerX, playerY, endX, endY);
            this.debugGraphics.fillStyle(gravityColor, 1);
            this.debugGraphics.fillCircle(endX, endY, 4);

            // 3. Rita tangent/rörelseriktning i blått
            const tangentColor = 0x0088ff; // Blå (Rörelseriktning/tangent)
            const facingSign = this.direction.includes("left") ? -1 : 1;
            const tangentEndX = playerX + this.currentDirections.tangentX * facingSign * 24;
            const tangentEndY = playerY + this.currentDirections.tangentY * facingSign * 24;
            this.debugGraphics.lineStyle(1, tangentColor, 0.8);
            this.debugGraphics.lineBetween(playerX, playerY, tangentEndX, tangentEndY);

            // 4. Debug-text
            const direction = this.getDirection();
            this.debugText.setPosition(playerX - 10, playerY - 32);
            this.debugText.setText("Dir: " + direction);
            this.debugText.setVisible(false);
        } else {
            this.debugText.setVisible(false);
        }
    }
}
