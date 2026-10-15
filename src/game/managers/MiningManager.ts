import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";
import { Player } from "../player/Player";
import { HighlightManager } from "./HighlightManager";
import { useGameStore } from "../../store";
import { REQUIRED_TOOL_TYPE, REQUIRED_TOOL_POWER, type MobileInputState } from "types";

export class MiningManager {
    private world: RAPIER.World;
    private planet: Planet;
    private player: Player;
    private highlightManager: HighlightManager;

    private canMine: boolean = true;
    private readonly defaultMineCooldownMs: number = 200;

    constructor(world: RAPIER.World, planet: Planet, player: Player, highlightManager: HighlightManager) {
        this.world = world;
        this.planet = planet;
        this.player = player;
        this.highlightManager = highlightManager;
    }

    public update(keys: Record<string, boolean>, mobileInputState: MobileInputState): void {
        if (keys["KeyE"] || Boolean(mobileInputState?.primaryAction)) {
            this.mineInFront();
        }
    }

    public mineInFront(): void {
        if (!this.canMine) return;

        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool || currentTool.type === "sword") return;

        const target = this.highlightManager.getTargetGridPosition();
        if (!target) return;

        const key = target.gridX + "," + target.gridY;
        const block = this.planet.blocks.get(key);

        if (block) {
            this.damageBlock(target.gridX, target.gridY);

            const cooldown = currentTool.speed ?? this.defaultMineCooldownMs;
            this.canMine = false;
            setTimeout(() => {
                this.canMine = true;
            }, cooldown);
        }
    }

    public damageBlock(x: number, y: number): void {
        const key = x + "," + y;
        const block = this.planet.blocks.get(key);

        if (!block) return;

        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool) return;

        const requiredTypes = REQUIRED_TOOL_TYPE[block.type] ?? ["none"];
        const requiredPower = REQUIRED_TOOL_POWER[block.type] ?? 0;

        const hasCorrectType = requiredTypes.includes("none") || requiredTypes.includes(currentTool.type);
        const hasCorrectPower = currentTool.power >= requiredPower;

        if (!hasCorrectType || !hasCorrectPower) return;

        block.hp -= currentTool.damage;

        if (block.hp <= 0) {
            this.planet.removeBlock(x, y);
        }
    }
}
