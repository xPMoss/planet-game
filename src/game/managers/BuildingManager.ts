import Phaser from "phaser";
import { Planet } from "planet";
import { BlockType, type ResourceType } from "types";
import type { Player } from "player";
import { useGameStore } from "@/store/useGameStore";
import type { MobileInputState } from "ui";
import type { HighlightManager } from "managers";

export class BuildingManager {
    private scene: Phaser.Scene;
    private planet: Planet;
    private player: Player;
    private highlightManager: HighlightManager;
    private maxBuildDistance: number = 48;
    private readonly debugGraphics: Phaser.GameObjects.Graphics;

    private canBuild: boolean = true;
    private readonly buildCooldownMs: number = 200;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player, highlightManager: HighlightManager) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;
        this.highlightManager = highlightManager;

        this.scene.game.canvas.oncontextmenu = (e) => e.preventDefault();
        this.debugGraphics = this.scene.add.graphics();

        this.setupInput();
    }

    public update(mobileState?: MobileInputState): void {
        this.debugGraphics.clear();

        const isDebugActive = this.scene.matter.world.drawDebug;

        if (isDebugActive && this.player?.sprite) {
            const playerX = this.player.sprite.x;
            const playerY = this.player.sprite.y;

            this.debugGraphics.lineStyle(2, 0xffff00, 0.8);
            this.debugGraphics.fillStyle(0xffff00, 0.1);

            this.debugGraphics.strokeCircle(playerX, playerY, this.maxBuildDistance);
            this.debugGraphics.fillCircle(playerX, playerY, this.maxBuildDistance);
        }

        if (mobileState && mobileState.secondaryAction) {
            this.placeInFront();
        }
    }

    public placeInFront(): void {
        if (!this.canBuild || !this.player?.sprite) return;

        const selectedResource = useGameStore.getState().selectedResource;
        const inventoryCount = useGameStore.getState().inventory[selectedResource] || 0;

        if (inventoryCount <= 0) return;

        const blockType = this.mapResourceToBlockType(selectedResource);
        if (blockType === null) return;

        const target = this.highlightManager.getTargetGridPosition();
        if (!target) return;

        const blockSize = this.planet.config.blockSize;
        const worldPoint = new Phaser.Math.Vector2(target.gridX * blockSize + blockSize / 2, target.gridY * blockSize + blockSize / 2);

        if (this.isOverlappingPlayer(worldPoint)) return;

        const success = this.planet.placeBlock(target.gridX, target.gridY, blockType);

        if (success) {
            useGameStore.getState().removeResource(selectedResource, 1);

            this.canBuild = false;
            this.scene.time.delayedCall(this.buildCooldownMs, () => {
                this.canBuild = true;
            });
        }
    }

    private setupInput(): void {
        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if (!pointer.rightButtonDown()) return;

            const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
            const playerPos = new Phaser.Math.Vector2(this.player.sprite.x, this.player.sprite.y);

            if (playerPos.distance(worldPoint) > this.maxBuildDistance) return;

            const gridX = Math.floor(worldPoint.x / this.planet.config.blockSize);
            const gridY = Math.floor(worldPoint.y / this.planet.config.blockSize);

            if (this.isOverlappingPlayer(worldPoint)) return;

            const selectedResource = useGameStore.getState().selectedResource;
            const inventoryCount = useGameStore.getState().inventory[selectedResource] || 0;

            if (inventoryCount <= 0) return;

            const blockType = this.mapResourceToBlockType(selectedResource);
            if (blockType === null) return;

            const success = this.planet.placeBlock(gridX, gridY, blockType);

            if (success) {
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
