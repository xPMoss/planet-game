import Phaser from "phaser";
import type { Planet } from "./Planet";
import { PlanetOptimizer } from "./planetOptimizer";
import { BlockType } from "types";

export const CATEGORY_PLAYER = 0x0001;
export const CATEGORY_TERRAIN = 0x0002;
export const CATEGORY_LOOT = 0x0004;

export class PlanetOutline {
    private scene: Phaser.Scene;
    private planet: Planet;
    public outlineGraphics?: Phaser.GameObjects.Graphics;
    public outlineBodies: MatterJS.BodyType[] = [];
    private optimizer: PlanetOptimizer;

    constructor(scene: Phaser.Scene, planet: Planet) {
        this.scene = scene;
        this.planet = planet;
        this.optimizer = new PlanetOptimizer(scene, planet);
    }

    public draw(depth?: number): void {
        const targetDepth = depth ?? this.planet.config.outlineDepth ?? 10;

        if (this.outlineGraphics) {
            this.outlineGraphics.clear();
        } else {
            this.outlineGraphics = this.scene.add.graphics();
            this.outlineGraphics.setDepth(targetDepth);
        }

        this.outlineBodies.forEach((body) => {
            this.scene.matter.world.remove(body);
        });
        this.outlineBodies = [];

        const coreBlockKeys = new Set<string>();
        const mainBlockKeys = new Set<string>();

        this.planet.blocks.forEach((block, key) => {
            if (block.type === BlockType.CORE) {
                coreBlockKeys.add(key);
            } else {
                mainBlockKeys.add(key);
            }
        });

        if (mainBlockKeys.size > 0) {
            const planetBody = this.createCompoundFromKeys(mainBlockKeys);
            if (planetBody) {
                this.outlineBodies.push(planetBody);
            }
        }

        if (coreBlockKeys.size > 0) {
            const coreBody = this.createCompoundFromKeys(coreBlockKeys);
            if (coreBody) {
                this.outlineBodies.push(coreBody);
            }
        }
    }
    private createCompoundFromKeys(keys: Set<string>): MatterJS.BodyType | undefined {
        const rectBodies = this.optimizer.createCombinedBodies(keys);

        if (rectBodies.length === 0) return undefined;

        rectBodies.forEach((body) => {
            body.collisionFilter.category = CATEGORY_TERRAIN;
        });

        if (rectBodies.length === 1) {
            return rectBodies[0];
        }

        rectBodies.forEach((body) => {
            this.scene.matter.world.remove(body);
        });

        const compoundBody = this.scene.matter.body.create({
            parts: rectBodies,
            isStatic: true,
            friction: 0.8, // Ändrat från 0 till 0.8
            frictionStatic: 1.0, // Ändrat från 0 till 1.0
            restitution: 0,
            slop: 0,
            collisionFilter: {
                category: CATEGORY_TERRAIN,
                mask: 0xffffffff,
                group: 0,
            },
        });

        this.scene.matter.world.add(compoundBody);
        return compoundBody;
    }
}
