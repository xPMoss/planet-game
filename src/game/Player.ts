import Phaser from "phaser";
import type { Planet } from "./Planet";
import { type PlayerSettings, DEFAULT_PLAYER_SETTINGS, createPlayerHatTexture } from "./playerHelpers";

export class Player {
    private readonly scene: Phaser.Scene;
    private readonly planet: Planet;
    public sprite!: Phaser.Physics.Matter.Sprite;
    private hat!: Phaser.GameObjects.Sprite;
    private isGrounded: boolean = false;
    private facingRight: boolean = true;
    private readonly settings: PlayerSettings;

    constructor(scene: Phaser.Scene, planet: Planet, customSettings?: Partial<PlayerSettings>) {
        this.scene = scene;
        this.planet = planet;
        this.settings = { ...DEFAULT_PLAYER_SETTINGS, ...customSettings };
    }

    public spawn(): void {
        if (this.scene.textures.exists("player_tile")) {
            console.log("Texture exists")
        }

        // Skapa hattexturen om den inte redan finns
        if (!this.scene.textures.exists("player_hat")) {
            createPlayerHatTexture(this.scene, "player_hat", 0xff0000);
        }

        const spawnY = this.planet.center.y - (this.planet.config.radius + 4) * this.planet.config.blockSize;

        // 2. Skapa spelarspriten
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
        this.sprite.setFixedRotation();

        // 3. Skapa hatt-spriten
        this.hat = this.scene.add.sprite(this.sprite.x, this.sprite.y, "player_hat");
        this.hat.setOrigin(0.5, 1);

        // 4. Kollisionshantering för mark - sätt isGrounded och korrigera penetration
        this.scene.matter.world.on("collisionstart", (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
            event.pairs.forEach((pair) => {
                if (pair.bodyA === this.sprite.body || pair.bodyB === this.sprite.body) {
                    this.isGrounded = true;
                    // Korrigera penetration: håll spelaren ovanför planetytan med ett block marge
                    const minY = this.planet.center.y - (this.planet.config.radius + 0.5) * this.planet.config.blockSize;
                    if (this.sprite.y > minY) {
                        //this.sprite.setY(minY);
                    }

                    if (this.sprite.body.velocity.y > 0) {
                        this.sprite.body.velocity.y *= 0.5; // Halve downward speed
                    }
                }
            });
        });
    }

    public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: { left: boolean; right: boolean; up: boolean }): void {
        if (!this.sprite) return;

        this.applyPointGravity();
        this.handleMovement(cursors, mobileState);
        this.updateHatPosition();

        // Kap max hastighet för att förhindra tunneling genom block
        // Använd sprite.body.velocity per Phaser Matter.js mönster
        if (this.sprite.body) {
            const maxSpeed = 8;
            const vx = this.sprite.body.velocity.x;
            const vy = this.sprite.body.velocity.y;
            const currentSpeed = Math.sqrt(vx * vx + vy * vy);

            if (currentSpeed > maxSpeed && currentSpeed > 0) {
                const scale = maxSpeed / currentSpeed;
                this.sprite.body.velocity.x *= scale;
                this.sprite.body.velocity.y *= scale;
            }

            // Luftmotstånd för att stabilisera fysik
            this.sprite.body.velocity.x *= 0.97;
            this.sprite.body.velocity.y *= 0.97;
        }
    }

    private applyPointGravity(): void {
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

    private handleMovement(cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: { left: boolean; right: boolean; up: boolean }): void {



        const isLeft = cursors.left.isDown || Boolean(mobileState?.left);
        const isRight = cursors.right.isDown || Boolean(mobileState?.right);
        const isUp = Phaser.Input.Keyboard.JustDown(cursors.up) || Boolean(mobileState?.up);


        const dx = this.planet.center.x - this.sprite.x;
        const dy = this.planet.center.y - this.sprite.y;
        const angleToCenter = Math.atan2(dy, dx);

        const tangentX = -Math.sin(angleToCenter);
        const tangentY = Math.cos(angleToCenter);

        const upX = -Math.cos(angleToCenter);
        const upY = -Math.sin(angleToCenter);

        // Vänster / Höger
        if (isLeft) {
            const force = new Phaser.Math.Vector2(tangentX * this.settings.moveForce, tangentY * this.settings.moveForce);
            this.sprite.applyForce(force);
            this.facingRight = false;

            this.sprite.body.velocity.y *= 0.5;
        }

        if (isRight) {
            const force = new Phaser.Math.Vector2(-tangentX * this.settings.moveForce, -tangentY * this.settings.moveForce);
            this.sprite.applyForce(force);
            this.facingRight = true;
        }

        // Hopp - fungerar för både tangentbord och touch
        // Ökad hastighet och liten uppjustering för att säkerställa att spelaren kommer upp ur marken
        if (isUp && this.isGrounded) {
            const targetHeightPixels = this.settings.maxJumpBlocks * this.planet.config.blockSize;
            const requiredVelocity = Math.sqrt(2 * this.planet.config.gravityStrength * 1000 * targetHeightPixels);

            this.sprite.setVelocity(upX * requiredVelocity, upY * requiredVelocity - 2);

            this.isGrounded = false;
        }
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
        this.hat.setFlipX(!this.facingRight);
    }
}
