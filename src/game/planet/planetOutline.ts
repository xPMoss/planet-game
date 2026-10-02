// planetOutline.ts
import Phaser from "phaser";
import type { Planet } from "./Planet";
import { PlanetOptimizer } from "./planetOptimizer";
import { BlockType } from "types";

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

    public draw(depth: number = 3): void {
        if (this.outlineGraphics) {
            this.outlineGraphics.clear();
        } else {
            this.outlineGraphics = this.scene.add.graphics();
            this.outlineGraphics.setDepth(10);
        }

        // 1. Rensa gamla fysikkroppar
        this.outlineBodies.forEach((body) => {
            this.scene.matter.world.remove(body);
        });
        this.outlineBodies = [];

        this.outlineGraphics.lineStyle(2, 0x00ffff, 0.8);

        const blockSize = this.planet.config.blockSize;
        const radius = this.planet.config.radius;
        const mapSize = radius * 2;
        const thickness = 16;
        const offset = 0.5;

        // 2. Samla alla CORE-block för en separat kärnkontur
        const coreBlocks = new Set<string>();
        this.planet.blocks.forEach((block, key) => {
            if (block.type === BlockType.CORE) {
                coreBlocks.add(key);
            }
        });

        // 3. Flood Fill (BFS) för att hitta yttre luft
        const outerAir = new Set<string>();
        const queue: Array<{ x: number; y: number }> = [];

        for (let i = -1; i <= mapSize; i++) {
            queue.push({ x: i, y: -1 });
            queue.push({ x: i, y: mapSize });
            queue.push({ x: -1, y: i });
            queue.push({ x: mapSize, y: i });
        }

        const directions = [
            { dx: 0, dy: -1, edge: "top" },
            { dx: 1, dy: 0, edge: "right" },
            { dx: 0, dy: 1, edge: "bottom" },
            { dx: -1, dy: 0, edge: "left" },
        ];

        while (queue.length > 0) {
            const current = queue.shift()!;
            const key = current.x + "," + current.y;

            if (
                current.x < -1 ||
                current.x > mapSize ||
                current.y < -1 ||
                current.y > mapSize ||
                outerAir.has(key) ||
                this.planet.blocks.has(key)
            ) {
                continue;
            }

            outerAir.add(key);

            for (const d of directions) {
                queue.push({ x: current.x + d.dx, y: current.y + d.dy });
            }
        }

        // 4. Hitta alla border-skikt för vanliga ytan
        let currentLayer = new Set<string>();
        const allBorderBlocks = new Set<string>();

        this.planet.blocks.forEach((block) => {
            const { x, y } = block;
            for (const d of directions) {
                if (outerAir.has(x + d.dx + "," + (y + d.dy))) {
                    const key = x + "," + y;
                    currentLayer.add(key);
                    allBorderBlocks.add(key);
                    break;
                }
            }
        });

        for (let d = 1; d < depth; d++) {
            const nextLayer = new Set<string>();

            this.planet.blocks.forEach((block) => {
                const key = block.x + "," + block.y;
                if (allBorderBlocks.has(key)) return;

                for (const dir of directions) {
                    const neighborKey = block.x + dir.dx + "," + (block.y + dir.dy);
                    if (currentLayer.has(neighborKey)) {
                        nextLayer.add(key);
                        allBorderBlocks.add(key);
                        break;
                    }
                }
            });

            currentLayer = nextLayer;
        }

        // Lägg även till alla CORE-block i border-mängden så att de får sin kontur och fysikkropp
        coreBlocks.forEach((key) => allBorderBlocks.add(key));

        // 5. Samla kanter för alla valda block (inklusive CORE)
        const topEdges = new Map<string, Set<number>>();
        const bottomEdges = new Map<string, Set<number>>();
        const leftEdges = new Map<string, Set<number>>();
        const rightEdges = new Map<string, Set<number>>();

        allBorderBlocks.forEach((key) => {
            const block = this.planet.blocks.get(key);
            if (!block) return;
            const { x, y } = block;

            directions.forEach(({ dx, dy, edge }) => {
                const neighborKey = x + dx + "," + (y + dy);
                const neighbor = this.planet.blocks.get(neighborKey);

                // Skapa kant om grannen är luft ELLER om detta är ett CORE-block mot ett icke-CORE block
                const isCoreBoundary = block.type === BlockType.CORE && neighbor?.type !== BlockType.CORE;
                const isAirBoundary = outerAir.has(neighborKey) || !this.planet.blocks.has(neighborKey);

                if (isAirBoundary || isCoreBoundary) {
                    if (edge === "top") {
                        if (!topEdges.has(y.toString())) topEdges.set(y.toString(), new Set());
                        topEdges.get(y.toString())!.add(x);
                    } else if (edge === "bottom") {
                        if (!bottomEdges.has(y.toString())) bottomEdges.set(y.toString(), new Set());
                        bottomEdges.get(y.toString())!.add(x);
                    } else if (edge === "left") {
                        if (!leftEdges.has(x.toString())) leftEdges.set(x.toString(), new Set());
                        leftEdges.get(x.toString())!.add(y);
                    } else if (edge === "right") {
                        if (!rightEdges.has(x.toString())) rightEdges.set(x.toString(), new Set());
                        rightEdges.get(x.toString())!.add(y);
                    }
                }
            });
        });

        const groupContinuous = (indices: number[]): Array<{ start: number; count: number }> => {
            indices.sort((a, b) => a - b);
            const result: Array<{ start: number; count: number }> = [];
            if (indices.length === 0) return result;

            let start = indices[0];
            let count = 1;

            for (let i = 1; i < indices.length; i++) {
                if (indices[i] === indices[i - 1] + 1) {
                    count++;
                } else {
                    result.push({ start, count });
                    start = indices[i];
                    count = 1;
                }
            }
            result.push({ start, count });
            return result;
        };

        const createHorizontalSegment = (y: number, startX: number, count: number, isTop: boolean) => {
            const startWorldX = startX * blockSize;
            const endWorldX = (startX + count) * blockSize;
            const worldY = y * blockSize;

            this.outlineGraphics?.beginPath();
            const lineY = isTop ? worldY : worldY + blockSize;
            this.outlineGraphics?.moveTo(startWorldX, lineY);
            this.outlineGraphics?.lineTo(endWorldX, lineY);
            this.outlineGraphics?.strokePath();

            // BORTTAGET: Skapade dubbla Matter.js-kroppar här tidigare!
        };

        topEdges.forEach((xSet, yStr) => {
            const y = parseInt(yStr, 10);
            const groups = groupContinuous(Array.from(xSet));
            groups.forEach(({ start, count }) => createHorizontalSegment(y, start, count, true));
        });

        bottomEdges.forEach((xSet, yStr) => {
            const y = parseInt(yStr, 10);
            const groups = groupContinuous(Array.from(xSet));
            groups.forEach(({ start, count }) => createHorizontalSegment(y, start, count, false));
        });

        const createVerticalSegment = (x: number, startY: number, count: number, isLeft: boolean) => {
            const startWorldY = startY * blockSize;
            const endWorldY = (startY + count) * blockSize;
            const worldX = x * blockSize;

            this.outlineGraphics?.beginPath();
            const lineX = isLeft ? worldX : worldX + blockSize;
            this.outlineGraphics?.moveTo(lineX, startWorldY);
            this.outlineGraphics?.lineTo(lineX, endWorldY);
            this.outlineGraphics?.strokePath();

            // BORTTAGET: Skapade dubbla Matter.js-kroppar här tidigare!
        };
        leftEdges.forEach((ySet, xStr) => {
            const x = parseInt(xStr, 10);
            const groups = groupContinuous(Array.from(ySet));
            groups.forEach(({ start, count }) => createVerticalSegment(x, start, count, true));
        });

        rightEdges.forEach((ySet, xStr) => {
            const x = parseInt(xStr, 10);
            const groups = groupContinuous(Array.from(ySet));
            groups.forEach(({ start, count }) => createVerticalSegment(x, start, count, false));
        });

        this.outlineBodies = this.optimizer.createCombinedBodies(allBorderBlocks);
    }
}
