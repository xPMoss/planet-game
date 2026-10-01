import Phaser from "phaser";
import { Planet } from "./Planet";
import { BlockType, type ResourceType } from "../types/GameTypes";
import type { Player } from "./Player";
import { useGameStore } from "../store/useGameStore";

export class BuildingManager {
    private scene: Phaser.Scene;
    private planet: Planet;
    private player: Player;
    private maxBuildDistance: number = 48;
    private readonly debugGraphics: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;

        // Inaktivera webbläsarens vanliga högerklicksmeny i spelet
        this.scene.game.canvas.oncontextmenu = (e) => e.preventDefault();

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
            this.debugGraphics.lineStyle(2, 0xffff00, 0.8);
            this.debugGraphics.fillStyle(0xffff00, 0.1);

            this.debugGraphics.strokeCircle(playerX, playerY, this.maxBuildDistance);
            this.debugGraphics.fillCircle(playerX, playerY, this.maxBuildDistance);
        }
    }

    private setupInput(): void {
        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            // Högerklick för att placera block (pointer.rightButtonDown())
            if (!pointer.rightButtonDown()) return;
            console.log("BUILD", pointer);

            const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
            const playerPos = new Phaser.Math.Vector2(this.player.sprite.x, this.player.sprite.y);

            // Avståndskontroll
            if (playerPos.distance(worldPoint) > this.maxBuildDistance) return;

            const gridX = Math.floor(worldPoint.x / this.planet.config.blockSize);
            const gridY = Math.floor(worldPoint.y / this.planet.config.blockSize);

            // Kontrollera att spelaren inte placerar blocket inuti sin egen hitbox
            if (this.isOverlappingPlayer(worldPoint)) return;

            // Hämta valt block/resurs från Zustand store
            const selectedResource = useGameStore.getState().selectedResource; // e.g. 'dirt'
            const inventoryCount = useGameStore.getState().inventory[selectedResource] || 0;

            if (inventoryCount <= 0) return;

            const blockType = this.mapResourceToBlockType(selectedResource);
            if (blockType === null) return;

            // Försök placera blocket i planeten
            const success = this.planet.placeBlock(gridX, gridY, blockType);

            if (success) {
                // Minska antalet i inventoryt
                useGameStore.getState().removeResource(selectedResource, 1);
            }
        });
    }

    private isOverlappingPlayer(worldPoint: Phaser.Math.Vector2): boolean {
        const playerBounds = this.player.sprite.getBounds();
        return playerBounds.contains(worldPoint.x, worldPoint.y);
    }

    private mapResourceToBlockType(resource: ResourceType): BlockType | null {
        if (resource === "dirt") return BlockType.DIRT;
        if (resource === "stone") return BlockType.STONE;
        if (resource === "core") return BlockType.CORE;
        if (resource === "coal") return BlockType.COAL;
        if (resource === "iron_ore") return BlockType.IRON_ORE;
        if (resource === "gold_ore") return BlockType.GOLD_ORE;
        if (resource === "diamond") return BlockType.DIAMOND;
        return null;
    }
}
