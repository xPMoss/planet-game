import { Container, Graphics } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Player } from "../player/Player";
import { useGameStore } from "../../store";
import type { MobileInputState } from "types";

export class CombatManager {
    private world: RAPIER.World;
    private player: Player;
    private stageContainer: Container;
    private weaponGraphics: Graphics;

    private canAttack: boolean = true;
    private readonly defaultCooldownMs: number = 200;

    constructor(world: RAPIER.World, player: Player, stageContainer: Container) {
        this.world = world;
        this.player = player;
        this.stageContainer = stageContainer;

        this.weaponGraphics = new Graphics();
        this.stageContainer.addChild(this.weaponGraphics);
    }

    public update(keys: Record<string, boolean>, mobileInputState: MobileInputState): void {
        if (keys["KeyE"] || keys["Space"]) {
            this.attack();
        }
    }

    public attack(): void {
        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool || currentTool.type !== "sword" || !this.canAttack) return;

        // 1. Spela upp svärdsanimationen
        this.swingWeapon();

        // 2. Kontrollera träffar med Rapier
        this.checkHitbox(currentTool.damage);

        // 3. Cooldown
        this.canAttack = false;
        const cooldown = currentTool.speed ?? this.defaultCooldownMs;
        setTimeout(() => {
            this.canAttack = true;
        }, cooldown);
    }

    public swingWeapon(): void {
        const playerPos = this.player.container;
        const radius = 30;

        this.weaponGraphics.clear();
        this.weaponGraphics.x = playerPos.x;
        this.weaponGraphics.y = playerPos.y;
        this.weaponGraphics.rotation = playerPos.rotation;

        // Rita en svärdsbåge
        this.weaponGraphics.arc(0, 0, radius, -Math.PI / 4, Math.PI / 4);
        this.weaponGraphics.stroke({ width: 4, color: 0x00ffff, alpha: 0.8 });

        // Tona ut effekten
        setTimeout(() => {
            this.weaponGraphics.clear();
        }, 150);
    }

    private checkHitbox(damage: number): void {
        const playerPos = this.player.container;
        const radius = 32;

        // Sök efter kollisioner vid attackområdet framför spelaren
        const attackX = playerPos.x + Math.cos(playerPos.rotation) * radius;
        const attackY = playerPos.y + Math.sin(playerPos.rotation) * radius;

        // Använd Rapier intersection/point query
        this.world.intersectionsWithPoint({ x: attackX, y: attackY }, (collider) => {
            const body = collider.parent();
            if (body) {
                // Applicera skada på fiende eller objekt om träffat
                const userData = body.userData as any;
                if (userData && typeof userData.takeDamage === "function") {
                    userData.takeDamage(damage);
                }
            }
            return true;
        });
    }
}
