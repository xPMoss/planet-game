import Phaser from "phaser";
import type { Planet } from "./Planet";
import type { BlockType, ResourceType } from "../types/GameTypes";
import type { Player } from "./Player";
import { useGameStore } from "../store/useGameStore";
import type { MobileInputState } from "../ui/MobileControls";
import type { HighlightManager } from "./HighlightManager";

export class MiningManager {
    private readonly scene: Phaser.Scene;
    private readonly planet: Planet;
    private readonly player: Player;
    private readonly highlightManager: HighlightManager;
    private readonly maxMiningDistance: number = 24;
    private readonly debugGraphics: Phaser.GameObjects.Graphics;
    private mineKey: Phaser.Input.Keyboard.Key | null = null;

    private canMine: boolean = true;
    private readonly mineCooldownMs: number = 200;

    private debugText!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player, highlightManager: HighlightManager) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;
        this.highlightManager = highlightManager;

        this.setupInput();

        this.debugGraphics = this.scene.add.graphics();
        this.debugText = this.scene.add.text(0, 0, "", {
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#ffffff",
            backgroundColor: "#00000088",
        });
        this.debugText.setDepth(100);
    }

    public update(mobileState?: MobileInputState): void {
        this.updateDebugGraphics();

        if (this.mineKey && this.mineKey.isDown) {
            this.mineInFront();
        }

        if (mobileState && mobileState.primaryAction) {
            this.mineInFront();
        }
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

        block.body.setTint(0xffffff);
        this.scene.time.delayedCall(80, () => {
            if (block.body?.active) {
                block.body.clearTint();
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

    private updateDebugGraphics(): void {
        this.debugGraphics.clear();

        const isDebugActive = this.scene.matter.world.drawDebug;

        if (isDebugActive && this.player?.sprite) {
            const playerX = this.player.sprite.x;
            const playerY = this.player.sprite.y;
            const direction = this.player.getDirection();

            this.debugText.setPosition(playerX - 20, playerY - 30);
            this.debugText.setText("DIR: " + direction);
            this.debugText.setVisible(true);

            this.debugGraphics.lineStyle(2, 0x00ff00, 0.8);
            this.debugGraphics.fillStyle(0x00ff00, 0.1);

            this.debugGraphics.strokeCircle(playerX, playerY, this.maxMiningDistance);
            this.debugGraphics.fillCircle(playerX, playerY, this.maxMiningDistance);
        } else {
            this.debugText.setVisible(false);
        }
    }
}
