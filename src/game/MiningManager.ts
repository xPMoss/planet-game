import Phaser from "phaser";
import type { Planet } from "./Planet";
import type { BlockType, ResourceType } from "../types/GameTypes";
import type { Player } from "./Player";
import { useGameStore } from "../store/useGameStore";
import type { MobileInputState } from "../ui/MobileControls";

export class MiningManager {
    private readonly scene: Phaser.Scene;
    private readonly planet: Planet;
    private readonly player: Player;
    private readonly maxMiningDistance: number = 24; // Max avstånd i pixlar för brytning
    private readonly debugGraphics: Phaser.GameObjects.Graphics;
    private mineKey: Phaser.Input.Keyboard.Key | null = null;

    private canMine: boolean = true;
    private readonly mineCooldownMs: number = 200; // Intervall mellan slag (ms)

    // Ny grafik-instans för siktlinjen/översiktsrutan
    private highlightGraphics!: Phaser.GameObjects.Graphics;
    private debugText!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;

        // Skapa grafikobjektet för highlight
        this.highlightGraphics = this.scene.add.graphics();
        this.highlightGraphics.setDepth(20);

        this.setupInput();

        this.debugGraphics = this.scene.add.graphics();
        // Skapa en textinstans i världen
        this.debugText = this.scene.add.text(0, 0, "", {
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#ffffff",
            backgroundColor: "#00000088",
        });
        this.debugText.setDepth(100);
    }

    public update(mobileState?: MobileInputState): void {
        this.updateTargetHighlight();
        this.updateDebugGraphics();

        // Om E-tangenten hålls ned, gräv framför gubben (cooldown-hanteringen stoppar överdriven exekvering)
        if (this.mineKey && this.mineKey.isDown) {
            this.mineInFront();
        }

        if (mobileState && mobileState.primaryAction) {
            this.mineInFront();
        }
    }

    public mineInFront(): void {
        if (!this.canMine || !this.player?.sprite) return;

        const target = this.getTargetGridPosition();
        if (!target) return;

        const key = target.gridX + "," + target.gridY;
        const block = this.planet.blocks.get(key);

        if (block) {
            this.mineBlock(target.gridX, target.gridY, block.type);

            this.canMine = false;
            this.scene.time.delayedCall(this.mineCooldownMs, () => {
                this.canMine = true;
            });
        }
    }

    private setupInput(): void {
        if (this.scene.input.keyboard) {
            this.mineKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            // Kör bara en gång per knapptryck
            this.mineKey.on("down", () => {
                this.mineInFront();
            });
        }

        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            // Omvandla skärmkoordinater till spelvärldskoordinater
            const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;

            // Kontrollera avståndet från spelaren till klickat område
            const playerPos = new Phaser.Math.Vector2(this.player.sprite.x, this.player.sprite.y);
            const distance = playerPos.distance(worldPoint);

            if (distance > this.maxMiningDistance) return;

            // Hitta vilket block som träffades
            const gridX = Math.floor(worldPoint.x / this.planet.config.blockSize);
            const gridY = Math.floor(worldPoint.y / this.planet.config.blockSize);
            const key = gridX + "," + gridY;

            const block = this.planet.blocks.get(key);
            if (block) {
                this.mineBlock(gridX, gridY, block.type);
            }

            //console.log("CLICK", block)
        });
    }

    private mineBlock(x: number, y: number, type: BlockType): void {
        const key = x + "," + y;
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
        if (type === 0) return "dirt";
        if (type === 1) return "stone";
        if (type === 2) return "coal";
        if (type === 3) return "iron_ore";
        if (type === 4) return "gold_ore";
        if (type === 5) return "diamond";
        return null;
    }
    private updateTargetHighlight(): void {
        this.highlightGraphics.clear();

        const target = this.getTargetGridPosition();
        if (!target) return;

        const key = target.gridX + "," + target.gridY;
        const block = this.planet.blocks.get(key);

        if (block) {
            const blockSize = this.planet.config.blockSize;
            const worldX = target.gridX * blockSize;
            const worldY = target.gridY * blockSize;

            this.highlightGraphics.lineStyle(2, 0xffff00, 0.9);
            this.highlightGraphics.fillStyle(0xffff00, 0.2);

            this.highlightGraphics.strokeRect(worldX, worldY, blockSize, blockSize);
            this.highlightGraphics.fillRect(worldX, worldY, blockSize, blockSize);
        }
    }

    private getTargetGridPosition(): { gridX: number; gridY: number } | null {
        if (!this.player?.sprite) return null;

        const blockSize = this.planet.config.blockSize;
        const playerDirection = this.player.getDirection();
        const rotation = this.player.sprite.rotation;

        // Vektorer för spelarens lokala riktningar utifrån rotation
        // "upp" relativt spelarens fötter/kropp
        const upX = Math.cos(rotation - Math.PI / 2);
        const upY = Math.sin(rotation - Math.PI / 2);

        // "höger" relativt spelarens kropp
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

    private updateDebugGraphics(): void {
        this.debugGraphics.clear();

        const isDebugActive = this.scene.matter.world.drawDebug;

        if (isDebugActive && this.player?.sprite) {
            const playerX = this.player.sprite.x;
            const playerY = this.player.sprite.y;
            const direction = this.player.getDirection();

            // Placera texten 30 pixlar ovanför spelaren
            this.debugText.setPosition(playerX - 20, playerY - 30);
            this.debugText.setText("DIR: " + direction);
            this.debugText.setVisible(true);

            // Grön halvtransparent cirkel för mining-sradie
            this.debugGraphics.lineStyle(2, 0x00ff00, 0.8);
            this.debugGraphics.fillStyle(0x00ff00, 0.1);

            this.debugGraphics.strokeCircle(playerX, playerY, this.maxMiningDistance);
            this.debugGraphics.fillCircle(playerX, playerY, this.maxMiningDistance);
        } else {
            this.debugText.setVisible(false);
        }
    }
}
