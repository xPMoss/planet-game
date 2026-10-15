// Item & Resource Types
export type ResourceType =
    | "dirt"
    | "stone"
    | "coal"
    | "copper_ore"
    | "copper"
    | "copper_ingot"
    | "silver_ore"
    | "silver"
    | "silver_ingot"
    | "iron_ore"
    | "iron_ingot"
    | "gold_ore"
    | "gold_ingot"
    | "diamond"
    | "wood"
    | "sand"
    | "core"
    | "chest"
    | "bed"
    | "torch";

// Planet & Block Types
export const BlockType = {
    AIR: -1,
    DIRT: 0,
    STONE: 1,
    COAL: 2,
    IRON_ORE: 3,
    COPPER_ORE: 4,
    SILVER_ORE: 5,
    GOLD_ORE: 6,
    DIAMOND: 7,
    WOOD: 8,
    LEAVES: 9,
    SAND: 10,
    CHEST: 11,
    BED: 12,
    TORCH: 13,
    CORE: 99,
} as const;

export type BlockType = (typeof BlockType)[keyof typeof BlockType];

export type ToolType =
    | "Wood Pickaxe"
    | "Iron Pickaxe"
    | "Diamond Pickaxe"
    | "Wood Axe"
    | "Iron Axe"
    | "Diamond Axe"
    | "Wood Shovel"
    | "Iron Shovel"
    | "Diamond Shovel"
    | "Wood Sword"
    | "Iron Sword"
    | "Diamond Sword";

export interface Tool {
    name: string;
    power: number;
    damage: number;
    price: number;
    type: "pickaxe" | "axe" | "shovel" | "sword";
    speed?: number; // Hastighetsmultiplikator eller cooldown i ms
}

export type EquipmentSlot = "helmet" | "armor" | "boots";

export interface ArmorItem {
    name: string;
    slot: EquipmentSlot;
    armor: number; // Ger skydd / minskar skada
    speedBonus?: number; // T.ex. skor som gör att man springer snabbare
    color: number; // Färg som ritas på spelaren
    textureKey?: string; // Unik textur för spriten på huvud/kropp
}

// Krav på verktygstyp för respektive block
export const REQUIRED_TOOL_TYPE: Record<BlockType, "pickaxe" | "axe" | "shovel" | "none"> = {
    [BlockType.AIR]: "none",
    [BlockType.DIRT]: "none",
    [BlockType.LEAVES]: "none",
    [BlockType.SAND]: "shovel",
    [BlockType.WOOD]: "axe",
    [BlockType.STONE]: "pickaxe",
    [BlockType.COAL]: "pickaxe",
    [BlockType.IRON_ORE]: "pickaxe",
    [BlockType.COPPER_ORE]: "pickaxe",
    [BlockType.SILVER_ORE]: "pickaxe",
    [BlockType.GOLD_ORE]: "pickaxe",
    [BlockType.DIAMOND]: "pickaxe",
    [BlockType.CHEST]: "none",
    [BlockType.BED]: "none",
    [BlockType.TORCH]: "none",
    [BlockType.CORE]: "none",
};

// Minsta verktygsstyrka (power) som krävs för respektive block
export const REQUIRED_TOOL_POWER: Record<BlockType, number> = {
    [BlockType.AIR]: 0,
    [BlockType.DIRT]: 0,
    [BlockType.LEAVES]: 0,
    [BlockType.SAND]: 0.1,
    [BlockType.WOOD]: 0.1,
    [BlockType.STONE]: 0.1,
    [BlockType.COAL]: 0.1,
    [BlockType.IRON_ORE]: 1,
    [BlockType.COPPER_ORE]: 1,
    [BlockType.SILVER_ORE]: 1,
    [BlockType.GOLD_ORE]: 5,
    [BlockType.DIAMOND]: 10,
    [BlockType.CHEST]: 0.1,
    [BlockType.BED]: 0,
    [BlockType.TORCH]: 0,
    [BlockType.CORE]: 999,
};

export interface BlockData {
    x: number;
    y: number;
    type: BlockType;
    hp: number;
    maxHp: number;
    body: Phaser.GameObjects.Image | Phaser.Physics.Matter.Image;
}
