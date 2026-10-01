import Phaser from "phaser";
import { Planet } from "./Planet";
import { type PlayerSettings, DEFAULT_PLAYER_SETTINGS, createPlayerHatTexture } from "./playerHelpers";
import type { MobileInputState } from "../ui/MobileControls";

export class Player {
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

    constructor(scene: Phaser.Scene, planet: Planet) {
        this.scene = scene;
        this.planet = planet;
        this.settings = { ...DEFAULT_PLAYER_SETTINGS };

        // Stäng av den globala gravitationen i Matter-världen
        this.scene.matter.world.setGravity(0, 0);

        // Skapa spriten på planetens skapade yta
        const startX = planet.center.x;
        const startY = planet.center.y - (planet.config.radius * planet.config.blockSize + 20);

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

        console.log("Player body:", this.sprite.body);
    }

    public spawn(): void {
        if (this.scene.textures.exists("player_tile")) {
            console.log("Texture exists");
        }

        // Skapa hattexturen om den inte redan finns
        if (!this.scene.textures.exists("player_hat")) {
            createPlayerHatTexture(this.scene, "player_hat", 0xff0000);
            this.hat = this.scene.add.sprite(this.sprite.x, this.sprite.y, "player_hat");
            this.hat.setOrigin(0.5, 1);
        }

        // Skapa ett Graphics-objekt för ögonen
        this.eyesGraphics = this.scene.add.graphics();
    }

    public getDirection(): "right" | "left" | "up" | "down" {
        return this.direction;
    }

    public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, mobileState?: MobileInputState): void {
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

        const playerPos = this.sprite.body.position;
        const center = this.planet.center;

        // 1. Beräkna riktningsvektor mot centrum
        const dx = center.x - playerPos.x;
        const dy = center.y - playerPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return;

        // Enhetsvektor riktad mot centrum
        const dirX = dx / distance;
        const dirY = dy / distance;

        // Applicera konstant gravitation mot centrum
        this.gravityVector.set(dirX * this.gravityStrength, dirY * this.gravityStrength);
        this.sprite.applyForce(this.gravityVector);

        // Beräkna kontinuerlig vinkel mot centrum
        const rawAngle = Math.atan2(dy, dx) - Math.PI / 2;
        // Snappa till närmaste 90-graderssteg (PI / 2 radianer)
        const snapAngle = Math.round(rawAngle / (Math.PI / 2)) * (Math.PI / 2);
        this.sprite.setRotation(snapAngle);

        // Tangentiell rörelse (Vänster / Höger)
        const tangentX = dirY;
        const tangentY = -dirX;

        const currentVel = this.sprite.body.velocity;
        const targetSpeed = 4; // Önskad rörelsehastighet

        const isLeft = cursors.left.isDown || Boolean(mobileState?.left);
        const isRight = cursors.right.isDown || Boolean(mobileState?.right);
        const isDown = cursors.down.isDown || Boolean(mobileState?.down);
        const isUp = cursors.space.isDown || Phaser.Input.Keyboard.JustDown(cursors.up) || Boolean(mobileState?.up);

        if (isLeft) {
            // Bevara befintlig hastighet mot/från centrum, men sätt tangenten
            this.sprite.setVelocity(-tangentX * targetSpeed + currentVel.x * 0.1, -tangentY * targetSpeed + currentVel.y * 0.1);
            this.direction = "left";
        }

        if (isRight) {
            this.sprite.setVelocity(tangentX * targetSpeed + currentVel.x * 0.1, tangentY * targetSpeed + currentVel.y * 0.1);
            this.direction = "right";
        }

        if (isDown) {
            this.direction = "down";
        }

        if (isUp && this.isGrounded) {
            const jumpSpeed = 16;

            // Beräkna riktningen "upp" utifrån spelarens egen rotation
            // (Inom Phaser/Math motsvarar sprite.rotation - Math.PI / 2 riktningen rakt upp från spriten)
            const upX = Math.cos(this.sprite.rotation - Math.PI / 2);
            const upY = Math.sin(this.sprite.rotation - Math.PI / 2);

            // Sätt hastigheten exakt i spelarens uppåt-riktning
            this.sprite.setVelocity(upX * jumpSpeed, upY * jumpSpeed);

            this.isGrounded = false;
        }

        this.updateHatPosition();
        this.drawEyes();
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

        // Använd spelarens position och rotation
        const x = this.sprite.x;
        const y = this.sprite.y;
        const rotation = this.sprite.rotation;

        // Förskjutning för pupiller baserat på riktning
        let pupilOffsetX = 0;
        let pupilOffsetY = 0;

        if (this.direction === "right") pupilOffsetX = 1;
        if (this.direction === "left") pupilOffsetX = -1;
        if (this.direction === "up") pupilOffsetY = -1;
        if (this.direction === "down") pupilOffsetY = 1;

        // Rita vita ögon
        this.eyesGraphics.fillStyle(0xffffff, 1);
        this.eyesGraphics.fillRect(x - 4, y - 4, 3, 4);
        this.eyesGraphics.fillRect(x + 1, y - 4, 3, 4);

        // Rita svarta pupiller som reagerar på riktningen
        this.eyesGraphics.fillStyle(0x000000, 1);
        this.eyesGraphics.fillRect(x - 3 + pupilOffsetX, y - 3 + pupilOffsetY, 2, 2);
        this.eyesGraphics.fillRect(x + 2 + pupilOffsetX, y - 3 + pupilOffsetY, 2, 2);

        // Sätt rotation på ögonen så de följer planetens krökning
        this.eyesGraphics.setRotation(rotation);
    }
}
