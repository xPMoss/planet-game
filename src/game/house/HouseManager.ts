import { Container, Graphics, RenderTarget, RenderTexture, Sprite } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";
import { Player } from "../player/Player";
import { House, type HouseBounds } from "./House";
import { PlacedBlueprint } from "./PlacedBlueprint";
import { BlockType } from "../../types";
import { HOUSE_BLUEPRINT, BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT } from "./HouseBlueprint";

export class HouseManager {
    public houses: Map<string, House> = new Map();
    public placedBlueprints: PlacedBlueprint[] = [];
    public isPlacingBlueprint: boolean = false;
    public guideGraphics: Graphics;

    private app: any;
    private world: RAPIER.World;
    private planet: Planet;
    private player: Player;

    constructor(app: any, world: RAPIER.World, planet: Planet, player: Player) {
        this.app = app;
        this.world = world;
        this.planet = planet;
        this.player = player;

        this.guideGraphics = new Graphics();
    }

    public update(): void {
        this.houses.forEach((house) => house.update());
        this.renderGraphics();
    }

    public checkForHouseAt(gridX: number, gridY: number): void {
        for (let i = this.placedBlueprints.length - 1; i >= 0; i--) {
            const bp = this.placedBlueprints[i];
            if (gridX >= bp.startGridX && gridX < bp.startGridX + bp.width && gridY >= bp.startGridY && gridY < bp.startGridY + bp.height) {
                this.checkBlueprintProgress(bp);

                if (bp.isComplete()) {
                    this.convertBlueprintToHouse(bp);
                    this.placedBlueprints.splice(i, 1);
                }
            }
        }
    }

    private checkBlueprintProgress(bp: PlacedBlueprint): void {
        bp.cells.forEach((cell) => {
            const worldGridX = bp.startGridX + cell.relX;
            const worldGridY = bp.startGridY + cell.relY;
            const key = worldGridX + "," + worldGridY;
            const block = this.planet.blocks.get(key);

            if (cell.required === 1) {
                cell.isFulfilled = Boolean(block && block.type !== BlockType.AIR);
            } else if (cell.required === 0) {
                cell.isFulfilled = !block || block.type === BlockType.AIR;
            }
        });
    }

    private convertBlueprintToHouse(bp: PlacedBlueprint): void {
        const blockSize = this.planet.config.blockSize;
        const houseWidthPx = bp.width * blockSize;
        const houseHeightPx = bp.height * blockSize;

        // Skapa RenderTexture i PixiJS v8
        const renderTexture = RenderTexture.create({
            width: houseWidthPx,
            height: houseHeightPx,
        });

        bp.cells.forEach((cell) => {
            if (cell.required === 1) {
                const worldGridX = bp.startGridX + cell.relX;
                const worldGridY = bp.startGridY + cell.relY;
                const key = worldGridX + "," + worldGridY;
                const block = this.planet.blocks.get(key);

                if (block) {
                    this.planet.removeBlock(worldGridX, worldGridY);
                }
            }
        });

        const worldCenterX = bp.startGridX * blockSize + houseWidthPx / 2;
        const worldCenterY = bp.startGridY * blockSize + houseHeightPx / 2;

        const bounds: HouseBounds = {
            minX: bp.startGridX,
            maxX: bp.startGridX + bp.width - 1,
            minY: bp.startGridY,
            maxY: bp.startGridY + bp.height - 1,
        };

        const doorPos = {
            x: bp.startGridX + Math.floor(bp.width / 2),
            y: bp.startGridY + bp.height - 1,
        };

        const newHouse = new House(
            this.world,
            this.planet,
            bp.id,
            bounds,
            doorPos,
            renderTexture,
            worldCenterX,
            worldCenterY,
            houseWidthPx,
            houseHeightPx,
        );

        this.houses.set(bp.id, newHouse);
    }

    private renderGraphics(): void {
        this.guideGraphics.clear();
        const blockSize = this.planet.config.blockSize;

        this.placedBlueprints.forEach((bp) => {
            bp.cells.forEach((cell) => {
                const worldX = (bp.startGridX + cell.relX) * blockSize;
                const worldY = (bp.startGridY + cell.relY) * blockSize;

                if (cell.required === 1) {
                    if (cell.isFulfilled) {
                        this.guideGraphics.rect(worldX, worldY, blockSize, blockSize);
                        this.guideGraphics.stroke({ width: 2, color: 0x00ff00, alpha: 0.6 });
                    } else {
                        this.guideGraphics.rect(worldX, worldY, blockSize, blockSize);
                        this.guideGraphics.fill({ color: 0xffaa00, alpha: 0.15 });
                        this.guideGraphics.stroke({ width: 2, color: 0xffaa00, alpha: 0.8 });
                    }
                }
            });
        });
    }
}
