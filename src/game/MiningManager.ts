import Phaser from 'phaser';
import type { Planet } from './Planet';
import type { BlockType, ResourceType } from '../types/GameTypes';
import type { Player } from './Player';
import { useGameStore } from '../store/useGameStore';

export class MiningManager {
    private readonly scene: Phaser.Scene;
    private readonly planet: Planet;
    private readonly player: Player;
    private readonly maxMiningDistance: number = 24; // Max avstånd i pixlar för brytning
    private readonly debugGraphics: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;

        this.debugGraphics = this.scene.add.graphics();

        this.setupInput();
    }

    public update(): void {
        this.debugGraphics.clear();

        // Rita endast ut cirkeln om Matter.js debug-visning är aktiv
        const isDebugActive = this.scene.matter.world.drawDebug;

        if (isDebugActive && this.player?.sprite) {
            const playerX = this.player.sprite.x;
            const playerY = this.player.sprite.y;

            // Grön halvtransparent cirkel för mining-sradie
            this.debugGraphics.lineStyle(2, 0x00ff00, 0.8);
            this.debugGraphics.fillStyle(0x00ff00, 0.1);

            this.debugGraphics.strokeCircle(playerX, playerY, this.maxMiningDistance);
            this.debugGraphics.fillCircle(playerX, playerY, this.maxMiningDistance);
        }
    }

    private setupInput(): void {
        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {

            // Omvandla skärmkoordinater till spelvärldskoordinater
            const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;

            // Kontrollera avståndet från spelaren till klickat område
            const playerPos = new Phaser.Math.Vector2(this.player.sprite.x, this.player.sprite.y);
            const distance = playerPos.distance(worldPoint);

            if (distance > this.maxMiningDistance) return;

            // Hitta vilket block som träffades
            const gridX = Math.floor(worldPoint.x / this.planet.config.blockSize);
            const gridY = Math.floor(worldPoint.y / this.planet.config.blockSize);
            const key = gridX + ',' + gridY;

            const block = this.planet.blocks.get(key);
            if (block) {
                this.mineBlock(gridX, gridY, block.type);
            }

            //console.log("CLICK", block)
        });
    }

    private mineBlock(x: number, y: number, type: BlockType): void {
        const key = x + ',' + y;
        const block = this.planet.blocks.get(key);
        if (!block) return;

        // Hämta skada från verktyget i Zustand store (eller standard 0.1)
        const toolPower = useGameStore.getState().currentTool?.power || 0.1;
        block.hp -= toolPower;

        // Flash-effekt när blocket tar skada
        block.body.setTint(0xffffff);
        this.scene.time.delayedCall(80, () => {
            if (block.body?.active) {
                block.body.clearTint();
            }
        });

        if (block.hp <= 0) {
            // Lägg till resurs i Zustand-storet
            const resourceType = this.mapBlockToResource(type);
            if (resourceType) {
                useGameStore.getState().mineBlock(resourceType, 1);
            }

            // Ta bort blocket från planeten
            this.planet.removeBlock(x, y);
        }
    }

    private mapBlockToResource(type: BlockType): ResourceType | null {
        if (type === 0) return 'dirt';
        if (type === 1) return 'stone';
        if (type === 2) return 'coal';
        if (type === 3) return 'iron_ore';
        if (type === 4) return 'gold_ore';
        if (type === 5) return 'diamond';
        return null;
    }
}