// Item & Resource Types
export type ResourceType = "wood" | "dirt" | "stone" | "coal" | "iron_ore" | "iron_ingot" | "gold_ore" | "diamond" | "core" | "sand";
export type ToolType =
    | "Wood Pickaxe"
    | "Iron Pickaxe"
    | "Gold Pickaxe"
    | "Diamond Pickaxe"
    | "Wood Axe"
    | "Iron Axe"
    | "Gold Axe"
    | "Diamond Axe"
    | "Wood Shovel"
    | "Iron Shovel"
    | "Gold Shovel"
    | "Diamond Shovel";

export interface Tool {
    name: string;
    power: number;
    price: number;
    type: "pickaxe" | "axe" | "shovel";
}

// Planet & Block Types
export const BlockType = {
    AIR: -1,
    DIRT: 0,
    STONE: 1,
    COAL: 2,
    IRON_ORE: 3,
    GOLD_ORE: 4,
    DIAMOND: 5,
    WOOD: 6,
    LEAVES: 7,
    SAND: 8,
    CORE: 99,
} as const;

export type BlockType = (typeof BlockType)[keyof typeof BlockType];

// Krav på verktygstyp för respektive block
export const REQUIRED_TOOL_TYPE: Record<BlockType, "pickaxe" | "axe" | "shovel" | "none"> = {
    [BlockType.AIR]: "none",
    [BlockType.DIRT]: "none",
    [BlockType.LEAVES]: "none",
    [BlockType.SAND]: "shovel", // Kräver Spade
    [BlockType.WOOD]: "axe", // Kräver Yxa
    [BlockType.STONE]: "pickaxe", // Kräver Hacka
    [BlockType.COAL]: "pickaxe",
    [BlockType.IRON_ORE]: "pickaxe",
    [BlockType.GOLD_ORE]: "pickaxe",
    [BlockType.DIAMOND]: "pickaxe",
    [BlockType.CORE]: "none",
};

// Minsta verktygsstyrka (power) som krävs för respektive block
export const REQUIRED_TOOL_POWER: Record<BlockType, number> = {
    [BlockType.AIR]: 0,
    [BlockType.DIRT]: 0,
    [BlockType.LEAVES]: 0,
    [BlockType.SAND]: 0.1, // Kräver minst Wood Spade
    [BlockType.WOOD]: 0.1, // Kräver minst Wood Axe
    [BlockType.STONE]: 0.1, // Kräver minst Wood Pickaxe
    [BlockType.COAL]: 0.1,
    [BlockType.IRON_ORE]: 1,
    [BlockType.GOLD_ORE]: 5,
    [BlockType.DIAMOND]: 10,
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
