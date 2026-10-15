import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";
import { Player } from "../player/Player";
import { HighlightManager } from "./HighlightManager";
import { HouseManager } from "../house/HouseManager";
import { useGameStore } from "../../store";
import { BlockType, type MobileInputState } from "types";

export class BuildingManager {
    private world: RAPIER.World;
    private planet: Planet;
    private player: Player;
    private highlightManager: HighlightManager;
    private houseManager: HouseManager;

    private canBuild: boolean = true;
    private readonly buildCooldownMs: number = 200;

    constructor(world: RAPIER.World, planet: Planet, player: Player, highlightManager: HighlightManager, houseManager: HouseManager) {
        this.world = world;
        this.planet = planet;
        this.player = player;
        this.highlightManager = highlightManager;
        this.houseManager = houseManager;
    }

    public update(keys: Record<string, boolean>, mobileInputState: MobileInputState): void {
        if (keys["KeyW"] || Boolean(mobileInputState?.secondaryAction)) {
            this.placeInFront();
        }
    }

    public placeInFront(): void {
        if (!this.canBuild) return;

        const selectedResource = useGameStore.getState().selectedResource;
        if (!selectedResource) return;

        const inventoryCount = useGameStore.getState().inventory[selectedResource] || 0;
        if (inventoryCount <= 0) return;

        const blockType = this.mapResourceToBlockType(selectedResource);
        if (blockType === null) return;

        // Hämta samma markerade målposition som HighlightManager använder
        const target = this.highlightManager.getTargetGridPosition();
        if (!target) return;

        const success = this.planet.placeBlock(target.gridX, target.gridY, blockType);

        if (success) {
            useGameStore.getState().removeResource(selectedResource, 1);
            this.houseManager?.checkForHouseAt(target.gridX, target.gridY);

            this.canBuild = false;
            setTimeout(() => {
                this.canBuild = true;
            }, this.buildCooldownMs);
        }
    }

    private mapResourceToBlockType(resource: string | null): BlockType | null {
        if (resource === "grass") return BlockType.GRASS;
        if (resource === "dirt") return BlockType.DIRT;
        if (resource === "stone") return BlockType.STONE;
        if (resource === "wood") return BlockType.WOOD;
        if (resource === "sand") return BlockType.SAND;
        if (resource === "core") return BlockType.CORE;
        if (resource === "coal") return BlockType.COAL;
        if (resource === "iron_ore") return BlockType.IRON_ORE;
        if (resource === "copper_ore") return BlockType.COPPER_ORE;
        if (resource === "silver_ore") return BlockType.SILVER_ORE;
        if (resource === "gold_ore") return BlockType.GOLD_ORE;
        if (resource === "diamond") return BlockType.DIAMOND;
        if (resource === "chest") return BlockType.CHEST;
        if (resource === "bed") return BlockType.BED;
        if (resource === "torch") return BlockType.TORCH;
        return null;
    }
}
