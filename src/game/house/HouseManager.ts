import Phaser from "phaser";
import type { Planet } from "../planet/Planet";
import type { Player } from "../player/Player";
import { House, type HouseBounds } from "./House";
import { PlacedBlueprint } from "./PlacedBlueprint";
import { BlockType } from "../../types";
import { HOUSE_BLUEPRINT, BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT } from "./HouseBlueprint";

export class HouseManager {
    private scene: Phaser.Scene;
    private planet: Planet;
    private player: Player;

    public houses: Map<string, House> = new Map();
    public placedBlueprints: PlacedBlueprint[] = [];

    public isPlacingBlueprint: boolean = false; // Om spelaren har ritningsverktyget aktivt

    private enterKey?: Phaser.Input.Keyboard.Key;
    private toggleBlueprintKey?: Phaser.Input.Keyboard.Key;
    private promptText: Phaser.GameObjects.Text;
    private guideGraphics: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;

        if (scene.input.keyboard) {
            this.enterKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            // Tryck på 'B' för att slå på/av ritningsplacering
            this.toggleBlueprintKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        }

        this.promptText = scene.add.text(0, 0, "[E] Gå in i huset", {
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#ffffff",
            backgroundColor: "#000000aa",
            padding: { x: 6, y: 3 },
        });
        this.promptText.setDepth(100);
        this.promptText.setVisible(false);

        this.guideGraphics = scene.add.graphics();
        this.guideGraphics.setDepth(15);

        this.setupInput();
    }

    private setupInput(): void {
        // Klicka med vänstermus för att fästa/placera ut ritningen i världen
        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if (!this.isPlacingBlueprint || !pointer.leftButtonDown()) return;

            const targetGrid = this.getHoverGridPosition();
            if (targetGrid) {
                this.placeBlueprintInWorld(targetGrid.x, targetGrid.y);
            }
        });
    }

    public update(): void {
        if (this.toggleBlueprintKey && Phaser.Input.Keyboard.JustDown(this.toggleBlueprintKey)) {
            this.isPlacingBlueprint = !this.isPlacingBlueprint;
            console.log("Ritningsläge:", this.isPlacingBlueprint ? "AKTIVT" : "INAKTIVT");
        }

        this.checkHousesForPlayer();
        this.renderGraphics();
    }

    /**
     * Sätter ner en ritning permanent i spelvärlden
     */
    public placeBlueprintInWorld(startGridX: number, startGridY: number): void {
        const id = startGridX + "," + startGridY + "_" + Date.now();
        const bp = new PlacedBlueprint(id, startGridX, startGridY, HOUSE_BLUEPRINT);

        this.placedBlueprints.push(bp);
        this.isPlacingBlueprint = false; // Stäng av placeringsläget efter klick

        // Stäm av om några block redan finns placerade där
        this.checkBlueprintProgress(bp);
    }

    /**
     * Anropas varje gång ett block placeras eller bryts ner på planeten
     */
    public checkForHouseAt(gridX: number, gridY: number): void {
        for (let i = this.placedBlueprints.length - 1; i >= 0; i--) {
            const bp = this.placedBlueprints[i];

            // Om blocket är inom ritningens område
            if (gridX >= bp.startGridX && gridX < bp.startGridX + bp.width && gridY >= bp.startGridY && gridY < bp.startGridY + bp.height) {
                this.checkBlueprintProgress(bp);

                // Om ritningen nu är helt färdigbyggd!
                if (bp.isComplete()) {
                    this.convertBlueprintToHouse(bp);
                    this.placedBlueprints.splice(i, 1); // Ta bort ritningen ur listan
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
        const bounds: HouseBounds = {
            minX: bp.startGridX,
            maxX: bp.startGridX + bp.width - 1,
            minY: bp.startGridY,
            maxY: bp.startGridY + bp.height - 1,
        };

        // Sätt dörren i understa raden i mitten av huset
        const doorPos = {
            x: bp.startGridX + Math.floor(bp.width / 2),
            y: bp.startGridY + bp.height - 1,
        };

        const newHouse = new House(bp.id, bounds, doorPos);
        this.houses.set(bp.id, newHouse);

        bp.cells.forEach((cell) => {
            if (cell.required === 1) {
                const worldGridX = bp.startGridX + cell.relX;
                const worldGridY = bp.startGridY + cell.relY;
                const key = worldGridX + "," + worldGridY;
                const block = this.planet.blocks.get(key);

                if (block) {
                    (block as any).isIndestructible = true;

                    if (block.body) {
                        block.body.setDepth(1);
                        if (block.body.body) {
                            this.scene.matter.world.remove(block.body.body);
                            block.body.body = null as any;
                        }
                    }
                }
            }
        });

        this.planet.drawOutline();
    }

    private getHoverGridPosition(): { x: number; y: number } | null {
        if (!this.player?.sprite) return null;

        const blockSize = this.planet.config.blockSize;
        const playerGridX = Math.floor(this.player.sprite.x / blockSize);
        const playerGridY = Math.floor(this.player.sprite.y / blockSize);

        // Placera ritningen lite framför spelaren
        return {
            x: playerGridX + 2,
            y: playerGridY - BLUEPRINT_HEIGHT + 2,
        };
    }

    private renderGraphics(): void {
        this.guideGraphics.clear();

        const blockSize = this.planet.config.blockSize;

        // 1. Rita ut alla existerande placerade ritningar i världen (Gula/Gröna rutor)
        this.placedBlueprints.forEach((bp) => {
            bp.cells.forEach((cell) => {
                const worldX = (bp.startGridX + cell.relX) * blockSize;
                const worldY = (bp.startGridY + cell.relY) * blockSize;

                if (cell.required === 1) {
                    if (cell.isFulfilled) {
                        // Färdigbyggd del (Grön ram)
                        this.guideGraphics.lineStyle(2, 0x00ff00, 0.6);
                        this.guideGraphics.strokeRect(worldX, worldY, blockSize, blockSize);
                    } else {
                        // Saknar block (Gul/Orange streckad förhandsvisning)
                        this.guideGraphics.lineStyle(2, 0xffaa00, 0.8);
                        this.guideGraphics.fillStyle(0xffaa00, 0.15);
                        this.guideGraphics.strokeRect(worldX, worldY, blockSize, blockSize);
                        this.guideGraphics.fillRect(worldX, worldY, blockSize, blockSize);
                    }
                }
            });
        });

        // 2. Om spelaren hålls på att placera en ny ritning (Förhandsgranskning / Ghost)
        if (this.isPlacingBlueprint) {
            const hoverPos = this.getHoverGridPosition();
            if (hoverPos) {
                for (let r = 0; r < BLUEPRINT_HEIGHT; r++) {
                    for (let c = 0; c < BLUEPRINT_WIDTH; c++) {
                        const cellType = HOUSE_BLUEPRINT[r][c];
                        const worldX = (hoverPos.x + c) * blockSize;
                        const worldY = (hoverPos.y + r) * blockSize;

                        if (cellType === 1) {
                            // Blå svävande ritningskontur
                            this.guideGraphics.lineStyle(2, 0x00ffff, 0.9);
                            this.guideGraphics.fillStyle(0x00ffff, 0.3);
                            this.guideGraphics.strokeRect(worldX, worldY, blockSize, blockSize);
                            this.guideGraphics.fillRect(worldX, worldY, blockSize, blockSize);
                        }
                    }
                }
            }
        }
    }

    private checkHousesForPlayer(): void {
        if (!this.player?.sprite) return;

        const blockSize = this.planet.config.blockSize;
        const playerGridX = Math.floor(this.player.sprite.x / blockSize);
        const playerGridY = Math.floor(this.player.sprite.y / blockSize);

        let nearHouseDoor: House | null = null;

        for (const house of this.houses.values()) {
            // Beräkna avståndet till dörren
            const distToDoor = Math.hypot(playerGridX - house.doorGridPos.x, playerGridY - house.doorGridPos.y);

            // Öka radien till 2.5 block så dörren aktiveras både direkt utanför och direkt innanför
            if (distToDoor <= 2.5) {
                nearHouseDoor = house;
                break;
            }
        }

        if (nearHouseDoor) {
            const doorWorldX = nearHouseDoor.doorGridPos.x * blockSize + blockSize / 2;
            const doorWorldY = nearHouseDoor.doorGridPos.y * blockSize;

            this.promptText.setPosition(doorWorldX - 40, doorWorldY - 20);
            this.promptText.setText(nearHouseDoor.isPlayerInside ? "[E] Gå ut" : "[E] Gå in i huset");
            this.promptText.setVisible(true);

            if (this.enterKey && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
                this.togglePlayerInsideHouse(nearHouseDoor);
            }
        } else {
            this.promptText.setVisible(false);
        }
    }

    private togglePlayerInsideHouse(house: House): void {
        house.isPlayerInside = !house.isPlayerInside;

        // Tona ner/upp alla husets block beroende på om spelaren är inuti eller utanför
        for (let x = house.bounds.minX; x <= house.bounds.maxX; x++) {
            for (let y = house.bounds.minY; y <= house.bounds.maxY; y++) {
                const key = x + "," + y;
                const block = this.planet.blocks.get(key);

                if (block && block.body) {
                    // Gör husväggarna halvtransparenta (0.4 alpha) när spelaren är inuti
                    block.body.setAlpha(house.isPlayerInside ? 0.4 : 1.0);
                }
            }
        }

        console.log(house.isPlayerInside ? "Spelaren gick IN i huset" : "Spelaren gick UT ur huset");
    }
}
