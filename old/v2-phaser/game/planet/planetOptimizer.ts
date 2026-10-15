import Phaser from "phaser";
import type { Planet } from "./Planet";

export interface MergedRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Slår ihop en mängd blockkoordinater ("x,y") till färre, större rektanglar (Greedy Meshing).
 */
export function mergeBlockGrid(targetBlockKeys: Set<string>): MergedRect[] {
    if (targetBlockKeys.size === 0) return [];

    const grid = new Map<number, Set<number>>();
    let minX = Infinity,
        maxX = -Infinity;
    let minY = Infinity,
        maxY = -Infinity;

    targetBlockKeys.forEach((key) => {
        const [x, y] = key.split(",").map(Number);
        if (!grid.has(x)) grid.set(x, new Set());
        grid.get(x)!.add(y);

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    });

    const visited = new Set<string>();
    const mergedRects: MergedRect[] = [];

    for (let x = minX; x <= maxX; x++) {
        const ySet = grid.get(x);
        if (!ySet) continue;

        for (let y = minY; y <= maxY; y++) {
            const key = x + "," + y;
            if (!ySet.has(y) || visited.has(key)) continue;

            let height = 1;
            while (ySet.has(y + height) && !visited.has(x + "," + (y + height))) {
                height++;
            }

            let width = 1;
            let canExpand = true;

            while (canExpand) {
                const nextX = x + width;
                const nextYSet = grid.get(nextX);

                if (!nextYSet) break;

                for (let h = 0; h < height; h++) {
                    const checkKey = nextX + "," + (y + h);
                    if (!nextYSet.has(y + h) || visited.has(checkKey)) {
                        canExpand = false;
                        break;
                    }
                }

                if (canExpand) {
                    width++;
                }
            }

            for (let w = 0; w < width; w++) {
                for (let h = 0; h < height; h++) {
                    visited.add(x + w + "," + (y + h));
                }
            }

            mergedRects.push({ x, y, width, height });
        }
    }

    return mergedRects;
}

export function createCombinedBodies(scene: Phaser.Scene, planet: Planet, targetBlockKeys: Set<string>): MatterJS.BodyType[] {
    const blockSize = planet.config.blockSize;
    const padding = planet.config.padding ?? 0.5;
    const mergedRects = mergeBlockGrid(targetBlockKeys);
    const bodies: MatterJS.BodyType[] = [];

    for (const rect of mergedRects) {
        const widthPx = rect.width * blockSize;
        const heightPx = rect.height * blockSize;

        const worldX = rect.x * blockSize + widthPx / 2;
        const worldY = rect.y * blockSize + heightPx / 2;

        const body = scene.matter.add.rectangle(worldX, worldY, widthPx + padding, heightPx + padding, {
            isStatic: true,
            friction: 0.8,
            frictionStatic: 1.0,
            restitution: 0,
            slop: 0,
        });

        bodies.push(body);
    }

    return bodies;
}

export class PlanetOptimizer {
    private scene: Phaser.Scene;
    private planet: Planet;

    constructor(scene: Phaser.Scene, planet: Planet) {
        this.scene = scene;
        this.planet = planet;
    }

    public createCombinedBodies(targetBlockKeys: Set<string>): MatterJS.BodyType[] {
        return createCombinedBodies(this.scene, this.planet, targetBlockKeys);
    }
}
