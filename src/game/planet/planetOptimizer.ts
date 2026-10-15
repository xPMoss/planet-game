import RAPIER from "@dimforge/rapier2d-compat";
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

export function createCombinedBodies(world: RAPIER.World, planet: Planet, targetBlockKeys: Set<string>): RAPIER.RigidBody[] {
    const blockSize = planet.config.blockSize;
    const padding = planet.config.padding ?? 0.5;
    const mergedRects = mergeBlockGrid(targetBlockKeys);
    const bodies: RAPIER.RigidBody[] = [];

    for (const rect of mergedRects) {
        const widthPx = rect.width * blockSize;
        const heightPx = rect.height * blockSize;

        const worldX = rect.x * blockSize + widthPx / 2;
        const worldY = rect.y * blockSize + heightPx / 2;

        const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(worldX, worldY);
        const body = world.createRigidBody(bodyDesc);

        const colliderDesc = RAPIER.ColliderDesc.cuboid((widthPx + padding) / 2, (heightPx + padding) / 2)
            .setFriction(0.6)
            .setRestitution(0.0);
        world.createCollider(colliderDesc, body);

        bodies.push(body);
    }

    return bodies;
}

export class PlanetOptimizer {
    private world: RAPIER.World;
    private planet: Planet;

    constructor(world: RAPIER.World, planet: Planet) {
        this.world = world;
        this.planet = planet;
    }

    public createCombinedBodies(targetBlockKeys: Set<string>): RAPIER.RigidBody[] {
        return createCombinedBodies(this.world, this.planet, targetBlockKeys);
    }
}
