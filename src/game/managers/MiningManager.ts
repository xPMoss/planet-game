import Phaser from "phaser";
import type { Planet } from "planet";
import { BlockType, REQUIRED_TOOL_TYPE, REQUIRED_TOOL_POWER } from "types";
import type { Player } from "player";
import { useGameStore } from "store";
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
    private readonly defaultMineCooldownMs: number = 200;

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

        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool) return;

        if (!currentTool || currentTool.type === "sword") return;

        const target = this.highlightManager.getTargetGridPosition();
        if (!target) return;

        const key = target.gridX + "," + target.gridY;
        const block = this.planet.blocks.get(key);

        if (block) {
            this.damageBlock(target.gridX, target.gridY);

            // Använd verktygets speed om det finns, annars standard-cooldown
            const cooldown = currentTool.speed ?? this.defaultMineCooldownMs;

            this.canMine = false;
            this.scene.time.delayedCall(cooldown, () => {
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
            const currentTool = useGameStore.getState().currentTool;
            if (!currentTool) return;

            const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
            const playerPos = new Phaser.Math.Vector2(this.player.sprite.x, this.player.sprite.y);

            if (playerPos.distance(worldPoint) > this.maxMiningDistance) return;

            const gridX = Math.floor(worldPoint.x / this.planet.config.blockSize);
            const gridY = Math.floor(worldPoint.y / this.planet.config.blockSize);
            const key = gridX + "," + gridY;

            const block = this.planet.blocks.get(key);
            if (block) {
                this.damageBlock(gridX, gridY);
            }
        });
    }

    public damageBlock(x: number, y: number): void {
        const key = x + "," + y;
        const block = this.planet.blocks.get(key);
        if (!block) return;

        // 1. Kontrollera om blocket tillhör ett färdigt hus och är oförstörbart
        if ((block as any).isIndestructible) {
            // Blinka rött för att visa spelaren att blocket inte går att förstöra
            block.body.setTint(0xff0000);
            this.scene.time.delayedCall(150, () => {
                if (block.body?.active) {
                    block.body.setTint(0xcccccc); // Återställ till husets nyans
                }
            });
            return; // Avbryt brytningen!
        }

        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool) return;

        const requiredType = REQUIRED_TOOL_TYPE[block.type] ?? "none";
        const requiredPower = REQUIRED_TOOL_POWER[block.type] ?? 0;

        const hasCorrectType = requiredType === "none" || currentTool.type === requiredType;
        const hasCorrectPower = currentTool.power >= requiredPower;

        // Om fel verktygstyp eller för låg power -> Blinka rött och avbryt
        if (!hasCorrectType || !hasCorrectPower) {
            block.body.setTint(0xff0000);
            this.scene.time.delayedCall(100, () => {
                if (block.body?.active) {
                    block.body.clearTint();
                }
            });
            return;
        }

        // Applicera skada på blocket
        block.hp -= currentTool.damage;

        const hpPercent = Math.max(0, block.hp / block.maxHp);

        const red = 255;
        const green = Math.floor(255 * hpPercent);
        const blue = Math.floor(255 * hpPercent);
        const damageTint = (red << 16) | (green << 8) | blue;

        // Träffeffekt (vit blixt)
        block.body.setTint(0xffffff);

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
            this.planet.removeBlock(x, y);
        }
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
