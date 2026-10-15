// src/game/managers/CombatManager.ts

import Phaser from "phaser";
import { useGameStore } from "store";
import type { Player } from "player";

export class CombatManager {
    private scene: Phaser.Scene;
    private player: Player;
    private canAttack: boolean = true;
    private readonly defaultCooldownMs: number = 200;
    private attackKey: Phaser.Input.Keyboard.Key | null = null;

    constructor(scene: Phaser.Scene, player: Player) {
        this.scene = scene;
        this.player = player;

        this.setupInput();
    }

    private setupInput(): void {
        if (this.scene.input.keyboard) {
            // Registrera 'E' tangenten för attack
            this.attackKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

            this.attackKey.on("down", () => {
                this.attack();
            });
        }
    }

    public update(): void {
        // Kontinuerlig attack när 'E' hålls nedtryckt
        if (this.attackKey && this.attackKey.isDown) {
            this.attack();
        }
    }

    public attack(): void {
        const currentTool = useGameStore.getState().currentTool;

        // Kör endast om ett svärd är utrustat
        if (!currentTool || currentTool.type !== "sword" || !this.canAttack) return;

        // 1. Spela upp svärdsanimationen
        this.player.swingWeapon();

        // 2. Beräkna skada
        this.checkHitbox(currentTool.damage);

        // 3. Cooldown
        this.canAttack = false;
        const cooldown = currentTool.speed ?? this.defaultCooldownMs;
        this.scene.time.delayedCall(cooldown, () => {
            this.canAttack = true;
        });
    }

    // src/game/managers/CombatManager.ts

    private checkHitbox(damage: number): void {
        if (!this.player.sprite) return;

        const blockSize = 16;
        const direction = this.player.getDirection();
        const rotation = this.player.sprite.rotation;

        // Upp- och högervektorer baserat på spelarens rotation relativt planeten
        const upX = Math.cos(rotation - Math.PI / 2);
        const upY = Math.sin(rotation - Math.PI / 2);
        const rightX = -upY;
        const rightY = upX;

        const diag = Math.SQRT1_2; // ~0.7071

        let dirX = 0;
        let dirY = 0;

        // Beräkna riktningsvektor för alla 8 riktningar
        switch (direction) {
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

        // Placera attackcentrum utifrån riktningsvektorn
        const attackX = this.player.sprite.x + dirX * blockSize * 1.5;
        const attackY = this.player.sprite.y + dirY * blockSize * 1.5;

        // Sök efter fiender vid attackpositionen
        const bodies = this.scene.matter.world.getAllBodies();
        const hitBodies = this.scene.matter.query.point(bodies, { x: attackX, y: attackY });

        hitBodies.forEach((body) => {
            const gameObject = body.gameObject as Phaser.Physics.Matter.Sprite;
            if (gameObject && gameObject.getData("isEnemy")) {
                const enemy = gameObject.getData("enemyInstance");
                if (enemy && typeof enemy.takeDamage === "function") {
                    enemy.takeDamage(damage);
                }
            }
        });
    }
}
