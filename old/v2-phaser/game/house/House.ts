import Phaser from "phaser";
import type { Planet } from "../planet/Planet";
import { CATEGORY_TERRAIN } from "../planet/planetOutline";

export interface HouseBounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export class House {
    public id: string;
    public bounds: HouseBounds;
    public doorGridPos: { x: number; y: number };
    public isPlayerInside: boolean = false;

    public sprite!: Phaser.Physics.Matter.Sprite;
    private scene: Phaser.Scene;
    private planet: Planet;
    private currentSnapAngle: number = 0;

    constructor(
        scene: Phaser.Scene,
        planet: Planet,
        id: string,
        bounds: HouseBounds,
        doorGridPos: { x: number; y: number },
        textureKey: string,
        worldX: number,
        worldY: number,
        width: number,
        height: number,
    ) {
        this.scene = scene;
        this.planet = planet;
        this.id = id;
        this.bounds = bounds;
        this.doorGridPos = doorGridPos;

        const body = this.scene.matter.bodies.rectangle(worldX, worldY, width, height, {
            friction: 0.8,
            frictionStatic: 1.0,
            frictionAir: 0.05,
            density: 0.1,
            restitution: 0,
        });

        this.sprite = this.scene.matter.add.sprite(worldX, worldY, textureKey);
        this.sprite.setExistingBody(body);
        this.sprite.setDisplaySize(width, height);
        this.sprite.setFixedRotation();

        // Kolliderar endast med terrängen
        this.sprite.setCollidesWith([CATEGORY_TERRAIN]);
    }

    public update(): void {
        if (!this.sprite || !this.sprite.active || !this.sprite.body) return;

        const center = this.planet.center;
        const dx = center.x - this.sprite.x;
        const dy = center.y - this.sprite.y;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        let targetAngle = 0;
        let gravityDirX = 0;
        let gravityDirY = 0;

        // Bestäm vilken sida av gravityRings-rektangeln huset befinner sig närmast
        if (absX > absY) {
            if (dx > 0) {
                // Vänster sida av rektangeln -> Gravitationen drar åt höger (+X)
                targetAngle = -Math.PI / 2;
                gravityDirX = 1;
                gravityDirY = 0;
            } else {
                // Höger sida av rektangeln -> Gravitationen drar åt vänster (-X)
                targetAngle = Math.PI / 2;
                gravityDirX = -1;
                gravityDirY = 0;
            }
        } else {
            if (dy > 0) {
                // Ovansidan av rektangeln -> Gravitationen drar nedåt (+Y)
                targetAngle = 0;
                gravityDirX = 0;
                gravityDirY = 1;
            } else {
                // Undersidan av rektangeln -> Gravitationen drar uppåt (-Y)
                targetAngle = Math.PI;
                gravityDirX = 0;
                gravityDirY = -1;
            }
        }

        // Snappa husets rotation
        if (targetAngle !== this.currentSnapAngle) {
            this.currentSnapAngle = targetAngle;
            const body = this.sprite.body as MatterJS.BodyType;
            this.scene.matter.body.setAngle(body, targetAngle);
        }

        this.sprite.setRotation(this.currentSnapAngle);

        // Applicera kraft vinkelrätt mot rektangelns sida
        const body = this.sprite.body as MatterJS.BodyType;
        const gravityStrength = 0.001 * body.mass;
        const gravityVector = new Phaser.Math.Vector2(gravityDirX * gravityStrength, gravityDirY * gravityStrength);

        this.sprite.applyForce(gravityVector);
    }

    public containsPoint(gridX: number, gridY: number): boolean {
        return gridX >= this.bounds.minX && gridX <= this.bounds.maxX && gridY >= this.bounds.minY && gridY <= this.bounds.maxY;
    }
}
