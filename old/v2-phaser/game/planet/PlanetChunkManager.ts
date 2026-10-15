import Phaser from "phaser";
import type { Planet } from "./Planet";
import type { Player } from "../player/Player";
import { BlockType } from "types";
import { CATEGORY_PLAYER, CATEGORY_TERRAIN } from "./planetOutline";

export class PlanetChunkManager {
    private scene: Phaser.Scene;
    private planet: Planet;
    private player: Player;

    private activeBodyKeys: Set<string> = new Set();
    private bodyMap: Map<string, MatterJS.BodyType> = new Map();

    private activationRadiusPx: number;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player, radiusInBlocks: number = 6) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;
        this.activationRadiusPx = radiusInBlocks * planet.config.blockSize;
    }

    public update(): void {
        if (!this.player?.sprite) return;

        const playerX = this.player.sprite.x;
        const playerY = this.player.sprite.y;

        if (isNaN(playerX) || isNaN(playerY)) return;

        const blockSize = this.planet.config.blockSize;
        const padding = this.planet.config.padding ?? 0.5;
        const radiusSq = this.activationRadiusPx * this.activationRadiusPx;

        const currentNeededKeys = new Set<string>();

        // 1. Hitta alla block inom radien från spelaren
        this.planet.blocks.forEach((block, key) => {
            if (block.type === BlockType.AIR) return;

            const worldX = block.x * blockSize + blockSize / 2;
            const worldY = block.y * blockSize + blockSize / 2;

            const dx = worldX - playerX;
            const dy = worldY - playerY;
            const distSq = dx * dx + dy * dy;

            if (distSq <= radiusSq) {
                currentNeededKeys.add(key);
            }
        });

        // 2. Ta bort enskilda colliders för block som har hamnat utanför radien
        this.activeBodyKeys.forEach((key) => {
            if (!currentNeededKeys.has(key)) {
                const body = this.bodyMap.get(key);
                if (body) {
                    this.scene.matter.world.remove(body);
                    this.bodyMap.delete(key);
                }
                this.activeBodyKeys.delete(key);
            }
        });

        // 3. Skapa enskilda colliders för nya block som hamnat inom radien
        currentNeededKeys.forEach((key) => {
            if (!this.activeBodyKeys.has(key)) {
                const block = this.planet.blocks.get(key);
                if (!block) return;

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
                        mask: CATEGORY_PLAYER | 0x0004 | 0x0008, // Kollidera med spelare, loot och raket
                        group: 0,
                    },
                });

                this.bodyMap.set(key, body);
                this.activeBodyKeys.add(key);
            }
        });
    }

    /**
     * Tvingar en omberäkning genom att rensa alla nuvarande kroppar.
     * Användbart när ett block placeras eller förstörs direkt intill spelaren.
     */
    public forceRebuild(): void {
        this.destroy();
        this.update();
    }

    public destroy(): void {
        this.bodyMap.forEach((body) => {
            this.scene.matter.world.remove(body);
        });
        this.bodyMap.clear();
        this.activeBodyKeys.clear();
    }
}
