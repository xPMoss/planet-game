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

        // Uppdatera fysik & gravitation för alla aktiva hus
        this.houses.forEach((house) => {
            house.update();
        });

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
        const blockSize = this.planet.config.blockSize;
        const houseWidthPx = bp.width * blockSize;
        const houseHeightPx = bp.height * blockSize;

        // 1. Skapa en sammansatt textur för hela huset
        const textureKey = "house_texture_" + bp.id;
        const renderTexture = this.scene.make.renderTexture({ width: houseWidthPx, height: houseHeightPx }, false);

        bp.cells.forEach((cell) => {
            if (cell.required === 1) {
                const worldGridX = bp.startGridX + cell.relX;
                const worldGridY = bp.startGridY + cell.relY;
                const key = worldGridX + "," + worldGridY;
                const block = this.planet.blocks.get(key);

                if (block && block.body) {
                    // Rita av blockets textur till den gemensamma hus-texturen
                    renderTexture.draw(block.body.texture.key, cell.relX * blockSize, cell.relY * blockSize);

                    // Ta bort det enskilda blocket från planeten
                    if (block.body.body) {
                        this.scene.matter.world.remove(block.body.body);
                    }
                    block.body.destroy();
                    this.planet.blocks.delete(key);
                }
            }
        });

        renderTexture.saveTexture(textureKey);

        // 2. Beräkna husets centrum i världskoordinater
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

        // 3. Skapa husobjektet
        const newHouse = new House(
            this.scene,
            this.planet,
            bp.id,
            bounds,
            doorPos,
            textureKey,
            worldCenterX,
            worldCenterY,
            houseWidthPx,
            houseHeightPx,
        );

        this.houses.set(bp.id, newHouse);
        this.planet.drawOutline();
    }

    private getHoverGridPosition(): { x: number; y: number } | null {
        if (!this.player?.sprite) return null;

        const blockSize = this.planet.config.blockSize;
        const playerDirection = this.player.getDirection();
        const rotation = this.player.sprite.rotation;

        // Vektorer för spelarens upp- och höger-riktning i förhållande till planeten
        const upX = Math.cos(rotation - Math.PI / 2);
        const upY = Math.sin(rotation - Math.PI / 2);
        const rightX = -upY;
        const rightY = upX;

        const diag = Math.SQRT1_2;

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

        // 1. Ta hänsyn till spelarens halva bredd/höjd så vi startar mätningen från spelarens kant
        const playerHalfWidth = 4; // Hälften av spelarens bredd (12 / 2)
        const edgeX = this.player.sprite.x + dirX * playerHalfWidth;
        const edgeY = this.player.sprite.y + dirY * playerHalfWidth;

        // 2. Lägg till det önskade avståndet från spelarens kant (t.ex. 1 block ifrån)
        const offsetBlocks = 1;
        const targetX = edgeX + dirX * (blockSize * offsetBlocks);
        const targetY = edgeY + dirY * (blockSize * offsetBlocks);

        // 3. Omvandla till grid-koordinater med Math.floor för stabil placering
        const targetGridX = Math.floor(targetX / blockSize);
        const targetGridY = Math.floor(targetY / blockSize);

        // 4. Justera ritningens startposition beroende på tittriktning så att ritningen hamnar intill spelaren
        let startGridX = targetGridX;
        if (playerDirection.includes("left")) {
            startGridX = targetGridX - BLUEPRINT_WIDTH + 1;
        } else if (!playerDirection.includes("right")) {
            // Om spelaren tittar rakt upp/ner, centrera ritningen horisontellt
            startGridX = targetGridX - Math.floor(BLUEPRINT_WIDTH / 2);
        }

        const startGridY = targetGridY - BLUEPRINT_HEIGHT + 1;

        return {
            x: startGridX,
            y: startGridY,
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

        const playerX = this.player.sprite.x;
        const playerY = this.player.sprite.y;

        let activeHouse: House | null = null;

        for (const house of this.houses.values()) {
            if (!house.sprite || !house.sprite.active) continue;

            // Kontrollera om spelaren befinner sig inom husets sprits hitbox
            const houseBounds = house.sprite.getBounds();
            const isInsideHitbox = houseBounds.contains(playerX, playerY);

            if (isInsideHitbox) {
                activeHouse = house;
                break;
            }
        }

        if (activeHouse) {
            // Placera prompt-texten ovanför eller i mitten av huset
            const promptX = activeHouse.sprite.x;
            const promptY = activeHouse.sprite.y - activeHouse.sprite.displayHeight / 2 - 15;

            this.promptText.setPosition(promptX - 40, promptY);
            this.promptText.setRotation(activeHouse.sprite.rotation);
            this.promptText.setText(activeHouse.isPlayerInside ? "[E] Gå ut" : "[E] Gå in i huset");
            this.promptText.setVisible(true);

            if (this.enterKey && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
                this.togglePlayerInsideHouse(activeHouse);
            }
        } else {
            this.promptText.setVisible(false);
        }
    }

    private togglePlayerInsideHouse(house: House): void {
        if (!this.player?.sprite) return;

        // Spara positionen utanför dörren där spelaren ska hamna när hen går ut igen
        const returnPosition = {
            x: house.sprite.x,
            y: house.sprite.y + house.sprite.displayHeight / 16,
        };

        // Pausa MainScene och starta HouseScene
        this.scene.scene.pause("MainScene");
        this.scene.scene.launch("HouseScene", {
            houseId: house.id,
            returnPosition: returnPosition,
        });
    }
}
