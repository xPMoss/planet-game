import Phaser from "phaser";
import type { Planet } from "./Planet";
import { BlockType } from "types";
import { mergeBlockGrid } from "./planetOptimizer";

export const CATEGORY_PLAYER = 0x0001;
export const CATEGORY_TERRAIN = 0x0002;
export const CATEGORY_LOOT = 0x0004;

export class PlanetOutline {
    private scene: Phaser.Scene;
    private planet: Planet;
    public outlineGraphics?: Phaser.GameObjects.Graphics;
    public outlineBodies: MatterJS.BodyType[] = [];

    constructor(scene: Phaser.Scene, planet: Planet) {
        this.scene = scene;
        this.planet = planet;
    }

    public draw(depth?: number): void {
        const targetDepth = depth ?? this.planet.config.outlineDepth ?? 10;

        if (this.outlineGraphics) {
            this.outlineGraphics.clear();
        } else {
            this.outlineGraphics = this.scene.add.graphics();
            this.outlineGraphics.setDepth(targetDepth);
        }
    }

    public drawOutline(depth?: number): void {
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

            const body = this.scene.matter.add.rectangle(worldX, worldY, widthPx + padding, heightPx + padding, {
                isStatic: true,
                friction: 0.8,
                frictionStatic: 1.0,
                restitution: 0,
                slop: 0,
                collisionFilter: {
                    category: CATEGORY_TERRAIN,
                    mask: 0xffffffff,
                    group: 0,
                },
            });

            this.outlineBodies.push(body);
        });
    }

    public draw2(depth?: number): void {
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

        const blockSize = this.planet.config.blockSize;
        const padding = this.planet.config.padding ?? 0.5;

        this.planet.blocks.forEach((block) => {
            if (block.type === BlockType.AIR) return;

            const worldX = block.x * blockSize + blockSize / 2;
            const worldY = block.y * blockSize + blockSize / 2;

            const body = this.scene.matter.add.rectangle(worldX, worldY, blockSize + padding, blockSize + padding, {
                isStatic: true,
                friction: 0.8,
                frictionStatic: 1.0,
                restitution: 0,
                slop: 0,
                collisionFilter: {
                    category: CATEGORY_TERRAIN,
                    mask: 0xffffffff,
                    group: 0,
                },
            });

            this.outlineBodies.push(body);
        });
    }
}
