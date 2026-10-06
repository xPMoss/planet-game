import Phaser from "phaser";
import type { Planet } from "planet";
import type { Player } from "player";
import { useGameStore } from "store";

export class HighlightManager {
    private scene: Phaser.Scene;
    private planet: Planet;
    private player: Player;
    private graphics: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;

        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(20);
    }

    public update(): void {
        this.graphics.clear();

        const target = this.getTargetGridPosition();
        if (!target) return;

        const blockSize = this.planet.config.blockSize;
        const worldX = target.gridX * blockSize;
        const worldY = target.gridY * blockSize;

        const worldPoint = new Phaser.Math.Vector2(worldX + blockSize / 2, worldY + blockSize / 2);

        const key = target.gridX + "," + target.gridY;
        const existingBlock = this.planet.blocks.get(key);

        const selectedResource = useGameStore.getState().selectedResource;
        const inventoryCount = selectedResource ? useGameStore.getState().inventory[selectedResource] || 0 : 0;
        const isOverlapping = this.isOverlappingPlayer(worldPoint);
        const hasResources = inventoryCount > 0;

        let color = 0x00ff00; // Grön = Byggbar tom ruta

        if (existingBlock) {
            color = 0xffff00; // Gul = Finns block (Mine)
        } else if (!hasResources || isOverlapping) {
            color = 0xff0000; // Röd = Ingen resurs eller spelaren i vägen
        }

        this.graphics.lineStyle(2, color, 0.9);
        this.graphics.fillStyle(color, 0.2);

        this.graphics.strokeRect(worldX, worldY, blockSize, blockSize);
        this.graphics.fillRect(worldX, worldY, blockSize, blockSize);
    }

    public getTargetGridPosition(): { gridX: number; gridY: number } | null {
        if (!this.player?.sprite) return null;

        const blockSize = this.planet.config.blockSize;
        const playerDirection = this.player.getDirection();
        const rotation = this.player.sprite.rotation;

        const upX = Math.cos(rotation - Math.PI / 2);
        const upY = Math.sin(rotation - Math.PI / 2);

        const rightX = -upY;
        const rightY = upX;

        const diag = Math.SQRT1_2; // ~0.7071 (cos/sin för 45 grader)

        let dirX = 0;
        let dirY = 0;

        switch (playerDirection) {
            case "right":
                dirX = rightX;
                dirY = rightY;
                break;
            case "left":
                dirX = -rightX;
                dirY = -rightY;
                break;
            case "up":
                dirX = upX;
                dirY = upY;
                break;
            case "down":
                dirX = -upX;
                dirY = -upY;
                break;
            case "up-right":
                dirX = rightX * diag + upX * diag;
                dirY = rightY * diag + upY * diag;
                break;
            case "up-left":
                dirX = -rightX * diag + upX * diag;
                dirY = -rightY * diag + upY * diag;
                break;
            case "down-right":
                dirX = rightX * diag - upX * diag;
                dirY = rightY * diag - upY * diag;
                break;
            case "down-left":
                dirX = -rightX * diag - upX * diag;
                dirY = -rightY * diag - upY * diag;
                break;
        }

        const targetX = this.player.sprite.x + dirX * blockSize;
        const targetY = this.player.sprite.y + dirY * blockSize;

        return {
            gridX: Math.floor(targetX / blockSize),
            gridY: Math.floor(targetY / blockSize),
        };
    }

    private isOverlappingPlayer(worldPoint: Phaser.Math.Vector2): boolean {
        const playerBounds = this.player.sprite.getBounds();
        return playerBounds.contains(worldPoint.x, worldPoint.y);
    }

    public destroy(): void {
        this.graphics.destroy();
    }
}
