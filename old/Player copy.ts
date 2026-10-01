import Phaser from "phaser";
import type { Planet } from "./Planet";
import { type PlayerSettings, DEFAULT_PLAYER_SETTINGS, createPlayerHatTexture } from "./playerHelpers";

type MatterCollisionPair = Phaser.Types.Physics.Matter.MatterCollisionPair;
type MatterBody = NonNullable<Phaser.Physics.Matter.Sprite["body"]>;

export class Player {
    private readonly scene: Phaser.Scene;
    private readonly planet: Planet;
    public sprite!: Phaser.Physics.Matter.Sprite;
    private hat!: Phaser.GameObjects.Sprite;
    private isGrounded: boolean = false;
    private groundContacts: Set<MatterCollisionPair> = new Set();
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
            frictionAir: this.settings.frictionAir,
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

        // 4. Markkontakt byggs upp varje fysiksteg utifrån de par som faktiskt kolliderar,
        // så att upphörande kontakter och borttagna block inte blir kvar som markkontakt.
        const matterWorld = this.scene.matter.world;
        matterWorld.on("beforeupdate", this.resetGroundContacts, this);
        matterWorld.on("collisionstart", this.handleCollisionStart, this);
        matterWorld.on("collisionactive", this.handleCollisionActive, this);
    }

    private resetGroundContacts(): void {
        this.groundContacts.clear();
    }

    private handleCollisionStart(event: Phaser.Physics.Matter.Events.CollisionStartEvent): void {
        const body = this.sprite.body;
        if (!body) return;

        event.pairs.forEach((pair) => {
            if (pair.bodyA !== body && pair.bodyB !== body) return;

            // Dämpningen gäller alla kontakter, även sneda sådana: på ett blockigt planeter
            // vilar spelaren ofta på ett blocks hörn när rotationen snappats till 90-graderssteg.
            this.dampenLandingVelocity(pair, body);

            if (this.isGroundContact(pair, body)) {
                this.groundContacts.add(pair);
            }
        });
    }

    private handleCollisionActive(event: Phaser.Physics.Matter.Events.CollisionActiveEvent): void {
        this.collectGroundContacts(event.pairs).forEach((pair) => this.groundContacts.add(pair));
    }

    private collectGroundContacts(pairs: MatterCollisionPair[]): MatterCollisionPair[] {
        const body = this.sprite.body;
        if (!body) return [];

        return pairs.filter((pair) => (pair.bodyA === body || pair.bodyB === body) && this.isGroundContact(pair, body));
    }

    private isGroundContact(pair: MatterCollisionPair, playerBody: MatterBody): boolean {
        const normal = this.getNormalTowardsOther(pair, playerBody);
        const up = this.getUpVector();

        // Bara kontakter där det träffade blocket ligger nedåt längs planetens yta räknas som mark,
        // vilket gör att sidokollitioner inte längre sätter isGrounded.
        return normal.dot(up) <= -this.settings.groundNormalThreshold;
    }

    // Normalen orienteras utifrån blockets faktiska position så att den pekar från spelaren
    // mot det träffade blocket, oavsett i vilken ordning Matter sparade paren.
    private getNormalTowardsOther(pair: MatterCollisionPair, playerBody: MatterBody): Phaser.Math.Vector2 {
        const otherBody = pair.bodyA === playerBody ? pair.bodyB : pair.bodyA;

        const towardsOtherX = otherBody.position.x - playerBody.position.x;
        const towardsOtherY = otherBody.position.y - playerBody.position.y;

        const normal = new Phaser.Math.Vector2(pair.collision.normal.x, pair.collision.normal.y);
        const pointsAwayFromOther = normal.x * towardsOtherX + normal.y * towardsOtherY < 0;

        return pointsAwayFromOther ? normal.negate() : normal;
    }

    private getUpVector(): Phaser.Math.Vector2 {
        const dx = this.sprite.x - this.planet.center.x;
        const dy = this.sprite.y - this.planet.center.y;

        return new Phaser.Math.Vector2(dx, dy).normalize();
    }

    private dampenLandingVelocity(pair: MatterCollisionPair, playerBody: MatterBody): void {
        const normal = this.getNormalTowardsOther(pair, playerBody);
        const impact = normal.x * playerBody.velocity.x + normal.y * playerBody.velocity.y;

        // Normalen pekar mot blocket, så ett positivt värde betyder att spelaren rör sig mot underlaget
        if (impact <= 0) return;

        const dampening = impact * (1 - this.settings.landingVelocityScale);
        this.sprite.setVelocity(
            playerBody.velocity.x - dampening * normal.x,
            playerBody.velocity.y - dampening * normal.y
        );
    }

    public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: { left: boolean; right: boolean; up: boolean }): void {
        if (!this.sprite) return;

        // Markkontakterna är insamlade under föregående fysiksteg, så här är de färska
        this.isGrounded = this.groundContacts.size > 0;

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

            // Luftmotstånd för att stabilisera fysik
            let nextX = vx * 0.97;
            let nextY = vy * 0.97;

            if (currentSpeed > maxSpeed && currentSpeed > 0) {
                const scale = maxSpeed / currentSpeed;
                nextX *= scale;
                nextY *= scale;
            }

            // Hastigheten måste sättas med setVelocity: Matter räknar om velocity från
            // position - positionPrev i början av varje steg, så att skriva direkt på
            // body.velocity har ingen effekt på fysiken.
            this.sprite.setVelocity(nextX, nextY);
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

        //this.sprite.body.velocity.y *= 0.5;
    }

    private handleMovement(cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: { left: boolean; right: boolean; up: boolean }): void {

        const isLeft = cursors.left.isDown || Boolean(mobileState?.left);
        const isRight = cursors.right.isDown || Boolean(mobileState?.right);
        const isUp = cursors.space.isDown || Phaser.Input.Keyboard.JustDown(cursors.up) || Boolean(mobileState?.up);


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
            const requiredVelocity = Math.sqrt(2 * this.planet.config.gravityStrength * targetHeightPixels);

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
