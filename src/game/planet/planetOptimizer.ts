import Phaser from "phaser";
import type { Planet } from "./Planet";

export class PlanetOptimizer {
    private scene: Phaser.Scene;
    private planet: Planet;

    constructor(scene: Phaser.Scene, planet: Planet) {
        this.scene = scene;
        this.planet = planet;
    }

    public createCombinedBodies(targetBlockKeys: Set<string>): MatterJS.BodyType[] {
        const blockSize = this.planet.config.blockSize;
        const visited = new Set<string>();
        const bodies: MatterJS.BodyType[] = [];

        // Sortera nycklarna (Y i första hand, sedan X)
        const sortedKeys = Array.from(targetBlockKeys).sort((a: string, b: string) => {
            const [x1, y1] = a.split(",").map(Number);
            const [x2, y2] = b.split(",").map(Number);
            return y1 !== y2 ? y1 - y2 : x1 - x2;
        });

        for (const key of sortedKeys) {
            if (visited.has(key)) continue;

            const [startX, startY] = key.split(",").map(Number);

            // 1. Hitta maximal bredd åt höger (X-led)
            let width = 0;
            while (targetBlockKeys.has(startX + width + "," + startY) && !visited.has(startX + width + "," + startY)) {
                width++;
            }

            // 2. Hitta maximal höjd nedåt (Y-led) där hela bredden är intakt
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

            // 3. Markera alla block i rektangeln som besökta
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    visited.add(startX + x + "," + (startY + y));
                }
            }

            // 4. Skapa den kombinerade Matter.js-kroppen
            const worldX = startX * blockSize + (width * blockSize) / 2;
            const worldY = startY * blockSize + (height * blockSize) / 2;
            const rectWidth = width * blockSize;
            const rectHeight = height * blockSize;

            const body = this.scene.matter.add.rectangle(worldX, worldY, rectWidth, rectHeight, {
                isStatic: true,
                friction: 0.01,
                frictionStatic: 0,
                restitution: 0,
            });

            bodies.push(body);
        }

        return bodies;
    }
}
