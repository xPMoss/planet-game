import type { ToolType, Tool, ArmorItem, EquipmentSlot } from "types";

export const MAX_INVENTORY_SLOTS = 20;

export const ALL_TOOLS: Record<ToolType, Tool> = {
    // Pickaxes
    "Wood Pickaxe": { name: "Wood Pickaxe", power: 0.1, damage: 0.1, price: 0, type: "pickaxe", speed: 200 },
    "Iron Pickaxe": { name: "Iron Pickaxe", power: 1, damage: 1, price: 10, type: "pickaxe", speed: 150 },
    "Diamond Pickaxe": { name: "Diamond Pickaxe", power: 10, damage: 10, price: 100, type: "pickaxe", speed: 50 },

    // Axes
    "Wood Axe": { name: "Wood Axe", power: 0.1, damage: 0.1, price: 0, type: "axe", speed: 200 },
    "Iron Axe": { name: "Iron Axe", power: 1, damage: 1, price: 10, type: "axe", speed: 150 },
    "Diamond Axe": { name: "Diamond Axe", power: 10, damage: 10, price: 100, type: "axe", speed: 50 },

    // Spades
    "Wood Shovel": { name: "Wood Shovel", power: 0.1, damage: 0.1, price: 0, type: "shovel", speed: 200 },
    "Iron Shovel": { name: "Iron Shovel", power: 1, damage: 1, price: 10, type: "shovel", speed: 150 },
    "Diamond Shovel": { name: "Diamond Shovel", power: 10, damage: 10, price: 100, type: "shovel", speed: 50 },
};

// Register över alla rustningsföremål
export const ALL_ARMOR: Record<string, ArmorItem> = {
    "Iron Helmet": { name: "Iron Helmet", slot: "helmet", armor: 5, color: 0xc0c0c0 },
    "Leather Clothes": { name: "Leather Clothes", slot: "chest", armor: 3, color: 0x8b5a2b },
    "Iron Clothes": { name: "Iron Clothes", slot: "chest", armor: 8, color: 0xc0c0c0 },
    "Speed Boots": { name: "Speed Boots", slot: "boots", armor: 2, speedBonus: 1.5, color: 0x00ffff },
};

export interface GameState {
    hp: number;
    maxHp: number;
    takeDamage: (amount: number) => void;
    heal: (amount: number) => void;

    inventory: Record<string, number>;
    maxSlots: number;
    currentTool: Tool | null;
    equipTool: (toolName: string | null) => void;

    // Nya fält för utrustning
    equipment: Record<EquipmentSlot, ArmorItem | null>;
    equipArmor: (slot: EquipmentSlot, item: ArmorItem | null) => void;

    hotbar: (string | null)[];
    selectedHotbarIndex: number;
    selectedResource: string | null;
    isInventoryOpen: boolean;

    getTotalItems: () => number;
    canPickUp: () => boolean;
    mineBlock: (type: any, amount: number) => boolean;
    craftTool: (type: ToolType) => void;
    setSelectedResource: (resource: string | null) => void;
    setSelectedHotbarIndex: (index: number) => void;
    setHotbarSlot: (index: number, resource: string | null) => void;
    toggleInventory: () => void;
    addResource: (type: any, amount: number) => boolean;
    removeResource: (type: any, amount: number) => void;
}
