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
    speed?: number;
}

export type EquipmentSlot = "helmet" | "armor" | "boots";

export interface ArmorItem {
    name: string;
    slot: EquipmentSlot;
    armor: number;
    speedBonus?: number;
    color: number;
    textureKey?: string;
}
