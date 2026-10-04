// Item Types
export type ResourceType = "wood" | "dirt" | "stone" | "coal" | "iron_ore" | "iron_ingot" | "gold_ore" | "diamond" | "core";
export type ToolType = "Wood Pickaxe" | "Iron Pickaxe" | "Gold Pickaxe" | "Diamond Pickaxe";

export interface Tool {
    name: string;
    power: number;
    price: number;
}

// Planet
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
    CORE: 99,
} as const;

export type BlockType = (typeof BlockType)[keyof typeof BlockType];

export interface BlockData {
    x: number;
    y: number;
    type: BlockType;
    hp: number;
    maxHp: number;
    body: Phaser.GameObjects.Image | Phaser.Physics.Matter.Image;
}
