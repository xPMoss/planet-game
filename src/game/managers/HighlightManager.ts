import { Graphics } from "pixi.js";
import { Planet } from "../planet/Planet";
import { Player } from "../player/Player";
import { useGameStore } from "../../store";

export class HighlightManager {
    public graphics: Graphics;
    private planet: Planet;
    private player: Player;

    constructor(planet: Planet, player: Player) {
        this.planet = planet;
        this.player = player;

        this.graphics = new Graphics();
        this.graphics.zIndex = 100;
    }

    public update(): void {
        this.graphics.clear();

        const target = this.getTargetGridPosition();
        if (!target) return;

        const blockSize = this.planet.config.blockSize;
        const worldX = target.gridX * blockSize;
        const worldY = target.gridY * blockSize;

        const key = target.gridX + "," + target.gridY;
        const existingBlock = this.planet.blocks.get(key);

        const selectedResource = useGameStore.getState().selectedResource;
        const inventoryCount = selectedResource ? useGameStore.getState().inventory[selectedResource] || 0 : 0;

        let color = 0x00ff00; // Grön = Byggbar tom ruta

        if (existingBlock) {
            color = 0xffff00; // Gul = Finns block (Mine)
        } else if (inventoryCount <= 0) {
            color = 0xff0000; // Röd = Ingen resurs kvar
        }

        this.graphics.rect(worldX, worldY, blockSize, blockSize);
        this.graphics.fill({ color: color, alpha: 0.2 });
        this.graphics.stroke({ width: 2, color: color, alpha: 0.9 });
    }

    public getTargetGridPosition(): { gridX: number; gridY: number } | null {
        if (!this.player?.container) return null;

        const blockSize = this.planet.config.blockSize;
        const playerPos = this.player.container;
        const direction = this.player.getDirection();

        let offsetX = 0;
        let offsetY = 0;

        switch (direction) {
            case "left":
                offsetX = -blockSize;
                break;
            case "right":
                offsetX = blockSize;
                break;
            case "up":
                offsetY = -blockSize;
                break;
            case "down":
                offsetY = blockSize;
                break;
            case "up-left":
                offsetX = -blockSize;
                offsetY = -blockSize;
                break;
            case "up-right":
                offsetX = blockSize;
                offsetY = -blockSize;
                break;
            case "down-left":
                offsetX = -blockSize;
                offsetY = blockSize;
                break;
            case "down-right":
                offsetX = blockSize;
                offsetY = blockSize;
                break;
        }

        const cos = Math.cos(playerPos.rotation);
        const sin = Math.sin(playerPos.rotation);

        const targetX = playerPos.x + (offsetX * cos - offsetY * sin);
        const targetY = playerPos.y + (offsetX * sin + offsetY * cos);

        return {
            gridX: Math.floor(targetX / blockSize),
            gridY: Math.floor(targetY / blockSize),
        };
    }

    public destroy(): void {
        this.graphics.destroy();
    }
}
