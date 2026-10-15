import { Container, Graphics, Sprite, Texture } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";

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

    public container: Container;
    public body: RAPIER.RigidBody;

    private world: RAPIER.World;
    private planet: Planet;
    private currentSnapAngle: number = 0;

    constructor(
        world: RAPIER.World,
        planet: Planet,
        id: string,
        bounds: HouseBounds,
        doorGridPos: { x: number; y: number },
        texture: Texture,
        worldX: number,
        worldY: number,
        width: number,
        height: number,
    ) {
        this.world = world;
        this.planet = planet;
        this.id = id;
        this.bounds = bounds;
        this.doorGridPos = doorGridPos;

        // 1. PixiJS Rendering
        this.container = new Container();
        const sprite = new Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.width = width;
        sprite.height = height;
        this.container.addChild(sprite);

        this.container.x = worldX;
        this.container.y = worldY;

        // 2. Rapier RigidBody & Collider
        const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(worldX, worldY).setLinearDamping(0.5).setAngularDamping(2.0);

        this.body = this.world.createRigidBody(bodyDesc);

        const colliderDesc = RAPIER.ColliderDesc.cuboid(width / 2, height / 2)
            .setFriction(0.8)
            .setRestitution(0.0);

        this.world.createCollider(colliderDesc, this.body);
    }

    public update(): void {
        const center = this.planet.center;
        const pos = this.body.translation();
        const dx = center.x - pos.x;
        const dy = center.y - pos.y;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        let targetAngle = 0;
        let gravityDirX = 0;
        let gravityDirY = 0;

        if (absX > absY) {
            if (dx > 0) {
                targetAngle = -Math.PI / 2;
                gravityDirX = 1;
            } else {
                targetAngle = Math.PI / 2;
                gravityDirX = -1;
            }
        } else {
            if (dy > 0) {
                targetAngle = 0;
                gravityDirY = 1;
            } else {
                targetAngle = Math.PI;
                gravityDirY = -1;
            }
        }

        if (targetAngle !== this.currentSnapAngle) {
            this.currentSnapAngle = targetAngle;
            this.body.setRotation(targetAngle, true);
        }

        const mass = this.body.mass();
        const gravityStrength = 800 * mass;
        this.body.resetForces(true);
        this.body.addForce({ x: gravityDirX * gravityStrength, y: gravityDirY * gravityStrength }, true);

        // Synka PixiJS Container
        this.container.x = pos.x;
        this.container.y = pos.y;
        this.container.rotation = this.body.rotation();
    }
}
