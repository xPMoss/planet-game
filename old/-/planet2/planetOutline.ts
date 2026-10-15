import Phaser from "phaser";
import type { Planet } from "./Planet";
import { BlockType } from "types";
import { PlanetOptimizer } from "./planetOptimizer";

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

        // 1. Rensa tidigare fysikkroppar
        this.outlineBodies.forEach((body) => {
            this.scene.matter.world.remove(body);
        });
        this.outlineBodies = [];

        if (this.planet.blocks.size === 0) return;

        // 2. Hämta den obrutna slingan av punkter längs ytterkanten
        const contourPath = this.traceContourPath();
        if (contourPath.length < 3) return;

        // 3. Skapa en solid kropp från konturlinjen
        const body = this.scene.matter.add.fromVertices(
            0,
            0,
            [contourPath],
            {
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
            },
            true,
        );

        if (body) {
            // 4. Beräkna den faktiska mittpunkten för originalpunkterna
            const minX = Math.min(...contourPath.map((p) => p.x));
            const maxX = Math.max(...contourPath.map((p) => p.x));
            const minY = Math.min(...contourPath.map((p) => p.y));
            const maxY = Math.max(...contourPath.map((p) => p.y));

            const pathCenterX = (minX + maxX) / 2;
            const pathCenterY = (minY + maxY) / 2;

            // Beräkna förskjutningen jämfört med den skapade kroppens centrum
            const offsetX = pathCenterX - body.position.x;
            const offsetY = pathCenterY - body.position.y;

            // Flytta kroppen exakt på plats
            this.scene.matter.body.setPosition(body, {
                x: body.position.x + offsetX,
                y: body.position.y + offsetY,
            });

            this.outlineBodies.push(body);
        }
    }

    /**
     * Genererar en obruten, medurs kedja av punkter längs hela planetytans ytterkant.
     */
    private traceContourPath(): { x: number; y: number }[] {
        const blockSize = this.planet.config.blockSize;

        // 1. Samla alla fria ytterkanter som riktade segment (medurs runt blocken)
        const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];

        this.planet.blocks.forEach((block, key) => {
            if (block.type === BlockType.AIR) return;

            const [gx, gy] = key.split(",").map(Number);
            const x = gx * blockSize;
            const y = gy * blockSize;

            const topFree = !this.hasBlock(gx, gy - 1);
            const bottomFree = !this.hasBlock(gx, gy + 1);
            const leftFree = !this.hasBlock(gx - 1, gy);
            const rightFree = !this.hasBlock(gx + 1, gy);

            if (topFree) edges.push({ x1: x, y1: y, x2: x + blockSize, y2: y });
            if (rightFree) edges.push({ x1: x + blockSize, y1: y, x2: x + blockSize, y2: y + blockSize });
            if (bottomFree) edges.push({ x1: x + blockSize, y1: y + blockSize, x2: x, y2: y + blockSize });
            if (leftFree) edges.push({ x1: x, y1: y + blockSize, x2: x, y2: y });
        });

        if (edges.length === 0) return [];

        // 2. Kedja ihop alla segment till en obruten linje
        const path: { x: number; y: number }[] = [];
        const used = new Set<number>();

        let current = edges[0];
        path.push({ x: current.x1, y: current.y1 });
        used.add(0);

        while (used.size < edges.length) {
            let foundNext = false;

            for (let i = 0; i < edges.length; i++) {
                if (used.has(i)) continue;

                const candidate = edges[i];
                if (Math.abs(current.x2 - candidate.x1) < 0.01 && Math.abs(current.y2 - candidate.y1) < 0.01) {
                    path.push({ x: candidate.x1, y: candidate.y1 });
                    current = candidate;
                    used.add(i);
                    foundNext = true;
                    break;
                }
            }

            if (!foundNext) break;
        }

        return path;
    }

    private hasBlock(gx: number, gy: number): boolean {
        const block = this.planet.blocks.get(gx + "," + gy);
        return Boolean(block && block.type !== BlockType.AIR);
    }
}

export class PlanetOutline2 {
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
