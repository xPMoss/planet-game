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
    private moveSpeed: number = 0.001;
    private jumpForce: number = 0.005;
    private isGrounded: boolean = false;
    private maxVelocity: number = 8;

    private hat!: Phaser.GameObjects.Sprite;
    private eyesGraphics!: Phaser.GameObjects.Graphics;
    private direction: "right" | "left" | "up" | "down" = "right";

    // Återanvänd Vector2-objekt för att undvika Garbage Collection
    private gravityVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
    private moveVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
    private jumpVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

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
            friction: 0.1,
            frictionStatic: 1,
            frictionAir: 0.01,
            restitution: 0,
            chamfer: { radius: 4 },
        });
        this.sprite.setDisplaySize(this.settings.width, this.settings.height);

        if (this.sprite.body) {
            const body = this.sprite.body as MatterJS.BodyType;

            // Aktivera kontinuerlig kollision på Matter-kroppen
            (body as unknown as { isContinuous: boolean }).isContinuous = true;
        }

        // Gör spriten sensor-aktig eller justera fysiken så den inte krockar konstigt
        this.sprite.setExistingBody(body);
        this.sprite.setFixedRotation();

        this.scene.matter.world.on("collisionstart", (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
            event.pairs.forEach((pair) => {
                if (pair.bodyA === this.sprite.body || pair.bodyB === this.sprite.body) {
                    // Godkänn markkontakt vid kollision
                    this.isGrounded = true;
                }
            });
        });

        this.scene.matter.world.on("collisionend", (event: Phaser.Physics.Matter.Events.CollisionEndEvent) => {
            event.pairs.forEach((pair) => {
                if (pair.bodyA === this.sprite.body || pair.bodyB === this.sprite.body) {
                    this.isGrounded = false;
                }
            });
        });

        if (scene.input.keyboard) {
            this.numpadKeys = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT,
                down: Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,
                left: Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR,
                right: Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX,
            }) as Record<string, Phaser.Input.Keyboard.Key>;
        }

        this.createDebug();

        console.log("Player body:", this.sprite.body);
    }

    public spawn(): void {
        if (!this.scene.textures.exists("player_tile")) {
            createPlayerTexture(this.scene, "player_tile", 0x00ff00);
        }

        // Skapa hattexturen om den inte redan finns
        if (!this.scene.textures.exists("player_hat")) {
            createPlayerHatTexture(this.scene, "player_hat", 0xff0000);
            this.hat = this.scene.add.sprite(this.sprite.x, this.sprite.y, "player_hat");
            // Minska hattens visningsstorlek till den fysiska spelstorleken (14x8)
            // this.hat.setDisplaySize(14, 8);
            this.hat.setScale(0.25);
            this.hat.setOrigin(0.5, 1);
        }

        // Skapa ett Graphics-objekt för ögonen
        this.eyesGraphics = this.scene.add.graphics();
    }

    public getDirection(): "right" | "left" | "up" | "down" {
        return this.direction;
    }

    public update(
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: MobileInputState,
        keyboard?: Phaser.Input.Keyboard.KeyboardPlugin,
    ): void {
        if (!this.sprite.body || !this.sprite.body.velocity || !this.sprite.body.position) return;

        const body = this.sprite.body as MatterJS.BodyType;

        const velocity = body.velocity;
        const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);

        if (currentSpeed > this.maxVelocity) {
            // Räkna ut skalfaktorn för att sänka hastigheten till maxVelocity
            const scale = this.maxVelocity / currentSpeed;

            this.scene.matter.body.setVelocity(this.sprite.body as MatterJS.BodyType, {
                x: velocity.x * scale,
                y: velocity.y * scale,
            });
        }

        const directions = this.calculateDirections()!;
        if (directions.distanceToPlanetCenter === 0) return;
        this.applyGravity(directions);
        const targetSpeed = 4; // Önskad rörelsehastighet

        const isUp = Boolean(this.numpadKeys?.up?.isDown) || cursors.up.isDown || Boolean(mobileState?.up);
        const isDown = Boolean(this.numpadKeys?.down?.isDown) || cursors.down.isDown || Boolean(mobileState?.down);
        const isLeft = Boolean(this.numpadKeys?.left?.isDown) || cursors.left.isDown || Boolean(mobileState?.left);
        const isRight = Boolean(this.numpadKeys?.right?.isDown) || cursors.right.isDown || Boolean(mobileState?.right);

        if (isLeft) {
            this.sprite.setVelocity(
                -directions.tangentX * targetSpeed + directions.currentVelocity.x * 0.1,
                -directions.tangentY * targetSpeed + directions.currentVelocity.y * 0.1,
            );
            this.direction = "left";
        } else if (isRight) {
            this.sprite.setVelocity(
                directions.tangentX * targetSpeed + directions.currentVelocity.x * 0.1,
                directions.tangentY * targetSpeed + directions.currentVelocity.y * 0.1,
            );
            this.direction = "right";
        }

        if (isDown) {
            this.direction = "down";
        } else if (isUp) {
            this.direction = "up";
        }

        const isJump = cursors.space.isDown || Boolean(mobileState?.jump);
        if (isJump && this.isGrounded) {
            const jumpSpeed = 16;

            // Sätt hastigheten exakt i spelarens uppåt-riktning
            this.sprite.setVelocity(directions.upX * jumpSpeed, directions.upY * jumpSpeed);

            this.isGrounded = false;
        }

        this.updateHatPosition();
        this.drawEyes();

        this.updateDebugGraphics();
    }

    private applyGravity(directions: Directions): void {
        if (!this.sprite.body) return;

        // Applicera konstant gravitation mot centrum
        this.gravityVector.set(-directions.upX * this.gravityStrength, -directions.upY * this.gravityStrength);
        //this.gravityVector.set(directions.dirX * this.gravityStrength, directions.dirY * this.gravityStrength);
        this.sprite.applyForce(this.gravityVector);

        // Beräkna kontinuerlig vinkel mot centrum
        const rawAngle = Math.atan2(directions.dy, directions.dx) - Math.PI / 2;
        // Snappa till närmaste 90-graderssteg (PI / 2 radianer)
        const snapAngle = Math.round(rawAngle / (Math.PI / 2)) * (Math.PI / 2);
        this.sprite.setRotation(snapAngle);
    }

    private calculateDirections(): Directions | undefined {
        if (!this.sprite.body) return;

        const playerPos = this.sprite.body.position;
        const planetCenter = this.planet.center;

        // Beräkna riktningsvektor mot planetens centrum
        const dx = planetCenter.x - playerPos.x;
        const dy = planetCenter.y - playerPos.y;
        const distanceToPlanetCenter = Math.sqrt(dx * dx + dy * dy);

        // Enhetsvektor riktad mot planetens centrum
        const dirX = dx / distanceToPlanetCenter;
        const dirY = dy / distanceToPlanetCenter;

        // Tangentiell rörelse (Vänster / Höger)
        const tangentX = dirY;
        const tangentY = -dirX;

        const currentVelocity = this.sprite.body.velocity;

        // Beräkna riktningen "upp" utifrån spelarens egen rotation
        // (Inom Phaser/Math motsvarar sprite.rotation - Math.PI / 2 riktningen rakt upp från spriten)
        const upX = Math.cos(this.sprite.rotation - Math.PI / 2);
        const upY = Math.sin(this.sprite.rotation - Math.PI / 2);

        return { tangentX, tangentY, currentVelocity, dirX, dirY, dx, dy, upX, upY, distanceToPlanetCenter };
    }

    private updateHatPosition(): void {
        if (!this.hat || !this.sprite) return;

        // Använd spelarens snappade rotation för att beräkna hattens "uppåt"-vektor
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

        // Sätt grafikobjektets position och rotation direkt på spelarens sprite
        this.eyesGraphics.setPosition(this.sprite.x, this.sprite.y);
        this.eyesGraphics.setRotation(this.sprite.rotation);

        // Minska skalan till 0.25 så att koordinaterna nedan ritas i 4x upplösning
        const eyeScale = 0.25;
        this.eyesGraphics.setScale(eyeScale);

        // Förskjutning för pupiller baserat på riktning (skalad 4x för exakt samma avstånd)
        let pupilOffsetX = 0;
        let pupilOffsetY = 0;

        if (this.direction === "right") pupilOffsetX = 4;
        if (this.direction === "left") pupilOffsetX = -4;
        if (this.direction === "up") pupilOffsetY = -4;
        if (this.direction === "down") pupilOffsetY = 4;

        // Vita ögon (ursprungligen -4, -4 med storlek 3x4 -> skalat till -16, -16 med storlek 12x16)
        this.eyesGraphics.fillStyle(0xffffff, 1);
        this.eyesGraphics.fillRect(-16, -16, 12, 16);
        this.eyesGraphics.fillRect(4, -16, 12, 16);

        // Svarta pupiller (ursprungligen -3, -3 med storlek 2x2 -> skalat till -12, -12 med storlek 8x8)
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
