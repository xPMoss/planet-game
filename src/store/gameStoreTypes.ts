import type { ToolType, Tool } from "types";

export const MAX_INVENTORY_SLOTS = 20;

export const ALL_TOOLS: Record<ToolType, Tool> = {
    // Pickaxes
    "Wood Pickaxe": { name: "Wood Pickaxe", power: 0.1, price: 0, type: "pickaxe" },
    "Iron Pickaxe": { name: "Iron Pickaxe", power: 1, price: 10, type: "pickaxe" },
    "Gold Pickaxe": { name: "Gold Pickaxe", power: 5, price: 50, type: "pickaxe" },
    "Diamond Pickaxe": { name: "Diamond Pickaxe", power: 10, price: 100, type: "pickaxe" },

    // Axes
    "Wood Axe": { name: "Wood Axe", power: 0.1, price: 0, type: "axe" },
    "Iron Axe": { name: "Iron Axe", power: 1, price: 10, type: "axe" },
    "Gold Axe": { name: "Gold Axe", power: 5, price: 50, type: "axe" },
    "Diamond Axe": { name: "Diamond Axe", power: 10, price: 100, type: "axe" },

    // Spades
    "Wood Shovel": { name: "Wood Spade", power: 0.1, price: 0, type: "shovel" },
    "Iron Shovel": { name: "Iron Spade", power: 1, price: 10, type: "shovel" },
    "Gold Shovel": { name: "Gold Spade", power: 5, price: 50, type: "shovel" },
    "Diamond Shovel": { name: "Diamond Spade", power: 10, price: 100, type: "shovel" },
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
