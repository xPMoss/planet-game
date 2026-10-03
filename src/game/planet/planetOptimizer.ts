// planetOptimizer.ts

import Phaser from "phaser";
import type { Planet } from "./Planet";

export function createCombinedBodies(scene: Phaser.Scene, planet: Planet, targetBlockKeys: Set<string>): MatterJS.BodyType[] {
    const blockSize = planet.config.blockSize;
    const visited = new Set<string>();
    const bodies: MatterJS.BodyType[] = [];

    const sortedKeys = Array.from(targetBlockKeys).sort((a: string, b: string) => {
        const [x1, y1] = a.split(",").map(Number);
        const [x2, y2] = b.split(",").map(Number);
        return y1 !== y2 ? y1 - y2 : x1 - x2;
    });

    for (const key of sortedKeys) {
        if (visited.has(key)) continue;

        const [startX, startY] = key.split(",").map(Number);

        let width = 0;
        while (targetBlockKeys.has(startX + width + "," + startY) && !visited.has(startX + width + "," + startY)) {
            width++;
        }

        let height = 1;
        let canExpandDown = true;

        while (canExpandDown) {
            const nextY = startY + height;
            for (let x = 0; x < width; x++) {
                const checkKey = startX + x + "," + nextY;
                if (!targetBlockKeys.has(checkKey) || visited.has(checkKey)) {
                    canExpandDown = false;
                    break;
                }
            }
            if (canExpandDown) {
                height++;
            }
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                visited.add(startX + x + "," + (startY + y));
            }
        }

        const worldX = startX * blockSize + (width * blockSize) / 2;
        const worldY = startY * blockSize + (height * blockSize) / 2;

        // Lägg till 0.5px extra bredd/höjd för att eliminera mikroskopiska glipor mellan kroppar
        const padding = 0.5;
        const rectWidth = width * blockSize + padding;
        const rectHeight = height * blockSize + padding;

        const body = scene.matter.add.rectangle(worldX, worldY, rectWidth, rectHeight, {
            isStatic: true,
            friction: 0,
            frictionStatic: 0,
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
