import Phaser from "phaser";
import { Planet } from "./Planet";
import { BlockType, type ResourceType } from "../types/GameTypes";
import type { Player } from "./Player";
import { useGameStore } from "../store/useGameStore";
import type { MobileInputState } from "../ui/MobileControls";

export class BuildingManager {
    private scene: Phaser.Scene;
    private planet: Planet;
    private player: Player;
    private maxBuildDistance: number = 48;
    private readonly debugGraphics: Phaser.GameObjects.Graphics;

    // Grafik-instans för bygg-markören
    private highlightGraphics: Phaser.GameObjects.Graphics;

    private canBuild: boolean = true;
    private readonly buildCooldownMs: number = 200;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;

        // Inaktivera webbläsarens vanliga högerklicksmeny i spelet
        this.scene.game.canvas.oncontextmenu = (e) => e.preventDefault();

        this.debugGraphics = this.scene.add.graphics();

        // Skapa grafikobjekt för bygg-highlight med högre depth
        this.highlightGraphics = this.scene.add.graphics();
        this.highlightGraphics.setDepth(20);

        this.setupInput();
    }

    public update(mobileState?: MobileInputState): void {
        this.debugGraphics.clear();

        // Uppdatera byggmarkören varje frame
        this.updateTargetHighlight();

        // Rita endast ut cirkeln om Matter.js debug-visning är aktiv
        const isDebugActive = this.scene.matter.world.drawDebug;

        if (isDebugActive && this.player?.sprite) {
            const playerX = this.player.sprite.x;
            const playerY = this.player.sprite.y;

            // Grön halvtransparent cirkel för räckvidd
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

        // Hämta valt resursmaterial och antal från Zustand store
        const selectedResource = useGameStore.getState().selectedResource;
        const inventoryCount = useGameStore.getState().inventory[selectedResource] || 0;

        if (inventoryCount <= 0) return;

        const blockType = this.mapResourceToBlockType(selectedResource);
        if (blockType === null) return;

        const target = this.getTargetGridPosition();
        if (!target) return;

        const blockSize = this.planet.config.blockSize;
        const worldPoint = new Phaser.Math.Vector2(target.gridX * blockSize + blockSize / 2, target.gridY * blockSize + blockSize / 2);

        // Se till att spelaren inte placerar blocket inuti sig själv
        if (this.isOverlappingPlayer(worldPoint)) return;

        // Försök placera blocket
        const success = this.planet.placeBlock(target.gridX, target.gridY, blockType);

        if (success) {
            // Minska antalet i inventoryt
            useGameStore.getState().removeResource(selectedResource, 1);

            // Aktivera cooldown
            this.canBuild = false;
            this.scene.time.delayedCall(this.buildCooldownMs, () => {
                this.canBuild = true;
            });
        }
    }

    private updateTargetHighlight(): void {
        this.highlightGraphics.clear();

        const target = this.getTargetGridPosition();
        if (!target) return;

        const selectedResource = useGameStore.getState().selectedResource;
        const inventoryCount = useGameStore.getState().inventory[selectedResource] || 0;

        const blockSize = this.planet.config.blockSize;
        const worldX = target.gridX * blockSize;
        const worldY = target.gridY * blockSize;

        const worldPoint = new Phaser.Math.Vector2(worldX + blockSize / 2, worldY + blockSize / 2);

        const isOverlapping = this.isOverlappingPlayer(worldPoint);
        const hasResources = inventoryCount > 0;

        // Byt färg baserat på om placering är tillåten (Grön = OK, Röd = Ogiltig/Tomt lager)
        const color = hasResources && !isOverlapping ? 0x00ff00 : 0xff0000;

        this.highlightGraphics.lineStyle(2, color, 0.9);
        this.highlightGraphics.fillStyle(color, 0.2);

        this.highlightGraphics.strokeRect(worldX, worldY, blockSize, blockSize);
        this.highlightGraphics.fillRect(worldX, worldY, blockSize, blockSize);
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

    private getTargetGridPosition(): { gridX: number; gridY: number } | null {
        if (!this.player?.sprite) return null;

        const blockSize = this.planet.config.blockSize;
        const playerDirection = this.player.getDirection();
        const rotation = this.player.sprite.rotation;

        const upX = Math.cos(rotation - Math.PI / 2);
        const upY = Math.sin(rotation - Math.PI / 2);

        const rightX = -upY;
        const rightY = upX;

        let dirX = 0;
        let dirY = 0;

        if (playerDirection === "right") {
            dirX = rightX;
            dirY = rightY;
        } else if (playerDirection === "left") {
            dirX = -rightX;
            dirY = -rightY;
        } else if (playerDirection === "up") {
            dirX = upX;
            dirY = upY;
        } else if (playerDirection === "down") {
            dirX = -upX;
            dirY = -upY;
        }

        const targetX = this.player.sprite.x + dirX * blockSize;
        const targetY = this.player.sprite.y + dirY * blockSize;

        return {
            gridX: Math.floor(targetX / blockSize),
            gridY: Math.floor(targetY / blockSize),
        };
    }
}
