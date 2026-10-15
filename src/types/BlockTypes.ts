import RAPIER from "@dimforge/rapier2d-compat";
import { Container, Graphics, Sprite } from "pixi.js";

export type BlockType = (typeof BlockType)[keyof typeof BlockType];

export type ResourceType =
    | "grass"
    | "dirt"
    | "stone"
    | "coal"
    | "copper_ore"
    | "copper_ingot"
    | "silver_ore"
    | "silver_ingot"
    | "iron_ore"
    | "iron_ingot"
    | "gold_ore"
    | "gold_ingot"
    | "diamond"
    | "wood"
    | "sand"
    | "cactus"
    | "ice"
    | "ice_rock"
    | "lava"
    | "lava_rock"
    | "core"
    | "chest"
    | "bed"
    | "torch";

export const BlockType = {
    AIR: -1,
    GRASS: 0,
    DIRT: 1,
    STONE: 2,
    COAL: 3,
    IRON_ORE: 4,
    COPPER_ORE: 5,
    SILVER_ORE: 6,
    GOLD_ORE: 7,
    DIAMOND: 8,
    WOOD: 9,
    LEAVES: 10,
    SAND: 11,
    SAND_ROCK: 12,
    CACTUS: 13,
    ICE: 14,
    ICE_ROCK: 15,
    LAVA: 16,
    LAVA_ROCK: 17,
    CHEST: 31,
    BED: 32,
    TORCH: 33,
    CORE: 99,
} as const;

export interface BlockData {
    x: number;
    y: number;
    type: BlockType;
    hp: number;
    maxHp: number;
    body: Graphics | Container | Sprite;
    rapierBody?: RAPIER.RigidBody;
    colliderGroup: number;
    friction?: number;
    restitution?: number;
}

export const COLLIDER_GROUPS = {
    CATEGORY_PLAYER: 0x0001,
    CATEGORY_TERRAIN: 0x0002,
    CATEGORY_LOOT: 0x0004,
    CATEGORY_SURFACE_OBJECTS: 0x0008,
    MASK: 0xffff,
    NONE: 0,
} as const;

export const REQUIRED_TOOL_TYPE: Record<BlockType, ("pickaxe" | "axe" | "shovel" | "sword" | "none")[]> = {
    [BlockType.AIR]: ["none"],
    [BlockType.GRASS]: ["none"],
    [BlockType.DIRT]: ["pickaxe", "shovel"],
    [BlockType.LEAVES]: ["axe", "sword"],
    [BlockType.SAND]: ["shovel"],
    [BlockType.WOOD]: ["axe", "sword"],
    [BlockType.STONE]: ["pickaxe"],
    [BlockType.COAL]: ["pickaxe"],
    [BlockType.IRON_ORE]: ["pickaxe"],
    [BlockType.COPPER_ORE]: ["pickaxe"],
    [BlockType.SAND_ROCK]: ["pickaxe"],
    [BlockType.SILVER_ORE]: ["pickaxe"],
    [BlockType.GOLD_ORE]: ["pickaxe"],
    [BlockType.CACTUS]: ["axe", "sword"],
    [BlockType.ICE]: ["axe", "pickaxe"],
    [BlockType.ICE_ROCK]: ["axe", "pickaxe"],
    [BlockType.LAVA]: ["pickaxe"],
    [BlockType.LAVA_ROCK]: ["pickaxe"],
    [BlockType.DIAMOND]: ["pickaxe"],
    [BlockType.CHEST]: ["none"],
    [BlockType.BED]: ["none"],
    [BlockType.TORCH]: ["none"],
    [BlockType.CORE]: ["none"],
};

export const REQUIRED_TOOL_POWER: Record<BlockType, number> = {
    [BlockType.AIR]: 0,
    [BlockType.GRASS]: 0,
    [BlockType.DIRT]: 0,
    [BlockType.LEAVES]: 0,
    [BlockType.SAND]: 0.1,
    [BlockType.SAND_ROCK]: 0.1,
    [BlockType.WOOD]: 0.1,
    [BlockType.STONE]: 0.1,
    [BlockType.COAL]: 0.1,
    [BlockType.IRON_ORE]: 1,
    [BlockType.COPPER_ORE]: 1,
    [BlockType.SILVER_ORE]: 1,
    [BlockType.GOLD_ORE]: 5,
    [BlockType.CACTUS]: 0.1,
    [BlockType.ICE]: 0.1,
    [BlockType.ICE_ROCK]: 0.1,
    [BlockType.LAVA]: 0.1,
    [BlockType.LAVA_ROCK]: 0.1,
    [BlockType.DIAMOND]: 10,
    [BlockType.CHEST]: 0.1,
    [BlockType.BED]: 0,
    [BlockType.TORCH]: 0,
    [BlockType.CORE]: 999,
};
