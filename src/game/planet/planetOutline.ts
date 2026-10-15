import { Container, Graphics } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import type { Planet } from "./Planet";
import { BlockType, COLLIDER_GROUPS } from "types";
import { mergeBlockGrid } from "./planetOptimizer";

export class PlanetOutline {
    private world: RAPIER.World;
    private app: any;
    private planet: Planet;
    public outlineGraphics?: Graphics;
    public outlineBodies: RAPIER.RigidBody[] = [];
    public container: Container;

    constructor(app: any, world: RAPIER.World, planet: Planet) {
        this.app = app;
        this.world = world;
        this.planet = planet;
        this.container = new Container();
    }

    public draw(depth?: number): void {
        const targetDepth = depth ?? this.planet.config.outlineDepth ?? 10;

        if (this.outlineGraphics) {
            this.outlineGraphics.clear();
        } else {
            this.outlineGraphics = new Graphics();
            this.outlineGraphics.zIndex = targetDepth;
            this.container.addChild(this.outlineGraphics);
        }
    }

    public drawOutline(depth?: number): void {
        this.draw(depth);

        this.outlineBodies.forEach((body) => {
            this.world.removeRigidBody(body);
        });
        this.outlineBodies = [];

        const mainBlockKeys = new Set<string>();

        this.planet.blocks.forEach((block, key) => {
            if (block.type !== BlockType.AIR) {
                mainBlockKeys.add(key);
            }
        });

        if (mainBlockKeys.size === 0) return;

        const mergedRects = mergeBlockGrid(mainBlockKeys);
        const blockSize = this.planet.config.blockSize;
        const padding = this.planet.config.padding ?? 0.5;

        mergedRects.forEach((rect) => {
            const widthPx = rect.width * blockSize;
            const heightPx = rect.height * blockSize;
            const worldX = rect.x * blockSize + widthPx / 2;
            const worldY = rect.y * blockSize + heightPx / 2;

            const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(worldX, worldY);
            const body = this.world.createRigidBody(bodyDesc);

            const colliderDesc = RAPIER.ColliderDesc.cuboid((widthPx + padding) / 2, (heightPx + padding) / 2)
                .setFriction(0.8)
                .setRestitution(0.0);

            colliderDesc.setCollisionGroups((COLLIDER_GROUPS.CATEGORY_TERRAIN << 16) | 0xffff);
            this.world.createCollider(colliderDesc, body);

            this.outlineBodies.push(body);
        });
    }
}
