import Phaser from "phaser";
import type { Planet } from "planet";
import type { BlockType, ResourceType } from "src/types/GameTypes";
import type { Player } from "player";
import { useGameStore } from "src/store/useGameStore";
import type { MobileInputState } from "ui";
import type { HighlightManager } from "managers";

export class MiningManager {
    private debugGraphics!: Phaser.GameObjects.Graphics;
    private debugText!: Phaser.GameObjects.Text;

    private readonly scene: Phaser.Scene;
    private readonly planet: Planet;
    private readonly player: Player;
    private readonly highlightManager: HighlightManager;
    private readonly maxMiningDistance: number = 24;

    private mineKey: Phaser.Input.Keyboard.Key | null = null;
    private canMine: boolean = true;
    private readonly mineCooldownMs: number = 200;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player, highlightManager: HighlightManager) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;
        this.highlightManager = highlightManager;

        this.setupInput();

        this.createDebug();
    }

    public update(mobileState?: MobileInputState): void {
        if (this.mineKey && this.mineKey.isDown) {
            this.mineInFront();
        }

        if (mobileState && mobileState.primaryAction) {
            this.mineInFront();
        }

        this.updateDebugGraphics();
    }

    public mineInFront(): void {
        if (!this.canMine || !this.player?.sprite) return;

        const target = this.highlightManager.getTargetGridPosition();
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
            this.mineKey.on("down", () => {
                this.mineInFront();
            });
        }

        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
            const playerPos = new Phaser.Math.Vector2(this.player.sprite.x, this.player.sprite.y);

            if (playerPos.distance(worldPoint) > this.maxMiningDistance) return;

            const gridX = Math.floor(worldPoint.x / this.planet.config.blockSize);
            const gridY = Math.floor(worldPoint.y / this.planet.config.blockSize);
            const key = gridX + "," + gridY;

            const block = this.planet.blocks.get(key);
            if (block) {
                this.mineBlock(gridX, gridY, block.type);
            }
        });
    }

    private mineBlock(x: number, y: number, type: BlockType): void {
        const key = x + "," + y;
        const block = this.planet.blocks.get(key);
        if (!block) return;

        const toolPower = useGameStore.getState().currentTool?.power || 0.1;
        block.hp -= toolPower;

        const hpPercent = Math.max(0, block.hp / block.maxHp);

        // 2. Skapa den permanenta skadetonen (går från normal -> röd/mörk ju mer skadat det blir)
        const red = 255;
        const green = Math.floor(255 * hpPercent);
        const blue = Math.floor(255 * hpPercent);
        const damageTint = (red << 16) | (green << 8) | blue;

        // 3. Tillfällig vit blixt/träffeffekt
        block.body.setTint(0xffffff);

        // 4. Återgå till blockets permanenta skadeton efter 80ms
        this.scene.time.delayedCall(80, () => {
            if (block.body?.active) {
                if (hpPercent < 1) {
                    block.body.setTint(damageTint);
                } else {
                    block.body.clearTint();
                }
            }
        });
        if (block.hp <= 0) {
            const resourceType = this.mapBlockToResource(type);
            if (resourceType) {
                useGameStore.getState().mineBlock(resourceType, 1);
            }

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

    private createDebug() {
        this.debugGraphics = this.scene.add.graphics();
        this.debugText = this.scene.add.text(0, 0, "", {
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#ffffff",
            backgroundColor: "#00000088",
        });
        this.debugText.setDepth(100);
    }

    private updateDebugGraphics(): void {
        this.debugGraphics.clear();

        const isDebugActive = this.scene.matter.world.drawDebug;

        if (isDebugActive && this.player?.sprite) {
            const playerX = this.player.sprite.x;
            const playerY = this.player.sprite.y;

            this.debugGraphics.lineStyle(2, 0x00ff00, 0.8);
            this.debugGraphics.fillStyle(0x00ff00, 0.1);

            this.debugGraphics.strokeCircle(playerX, playerY, this.maxMiningDistance);
            this.debugGraphics.fillCircle(playerX, playerY, this.maxMiningDistance);
        } else {
            this.debugText.setVisible(false);
        }
    }
}
