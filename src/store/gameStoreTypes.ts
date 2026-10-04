import type { ToolType, Tool } from "types";

export const MAX_INVENTORY_SLOTS = 20;

export const ALL_TOOLS: Record<ToolType, Tool> = {
    // Pickaxes
    "Wood Pickaxe": { name: "Wood Pickaxe", power: 0.1, price: 0, type: "pickaxe", speed: 200 },
    "Iron Pickaxe": { name: "Iron Pickaxe", power: 1, price: 10, type: "pickaxe", speed: 150 },
    "Diamond Pickaxe": { name: "Diamond Pickaxe", power: 10, price: 100, type: "pickaxe", speed: 50 },

    // Axes
    "Wood Axe": { name: "Wood Axe", power: 0.1, price: 0, type: "axe", speed: 200 },
    "Iron Axe": { name: "Iron Axe", power: 1, price: 10, type: "axe", speed: 150 },
    "Diamond Axe": { name: "Diamond Axe", power: 10, price: 100, type: "axe", speed: 50 },

    // Spades
    "Wood Shovel": { name: "Wood Shovel", power: 0.1, price: 0, type: "shovel", speed: 200 },
    "Iron Shovel": { name: "Iron Shovel", power: 1, price: 10, type: "shovel", speed: 150 },
    "Diamond Shovel": { name: "Diamond Shovel", power: 10, price: 100, type: "shovel", speed: 50 },
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
