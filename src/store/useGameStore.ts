import { create } from 'zustand';
import type { ResourceType, ToolType, Tool } from '../types/GameTypes';


interface GameState {
    inventory: Record<ResourceType, number>;
    tools: Record<ToolType, Tool>;
    currentTool: Tool;
    mineBlock: (type: ResourceType, amount: number) => void;
    craftTool: (type: ToolType) => void;

    selectedResource: ResourceType;
    setSelectedResource: (resource: ResourceType) => void;
    addResource: (type: ResourceType, amount: number) => void;
    removeResource: (type: ResourceType, amount: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
    inventory: {
        dirt: 0,
        stone: 0,
        coal: 0,
        iron_ore: 0,
        iron_ingot: 0,
        gold_ore: 0,
        diamond: 0,
        core: 0,
        wood: 0,
    },
    tools: {
        'Wood Pickaxe': {
            name: 'Wood Pickaxe',
            power: 0.1,
            price: 0,
        },
        'Iron Pickaxe': {
            name: 'Iron Pickaxe',
            power: 1,
            price: 10,
        },
        'Gold Pickaxe': {
            name: 'Gold Pickaxe',
            power: 5,
            price: 50,
        },
        'Diamond Pickaxe': {
            name: 'Diamond Pickaxe',
            power: 10,
            price: 100,
        },
    },
    currentTool: {
        name: 'Wood Pickaxe',
        power: 0.1,
        price: 0,
    },
    mineBlock: (type, amount) =>
        set((state) => ({
            inventory: {
                ...state.inventory,
                [type]: (state.inventory[type] || 0) + amount,
            },
        })),
    craftTool: (type) => set((state) => {
        const tool = state.tools[type];
        if (!tool) return {};

        // Kontrollera om vi har råd
        const requiredResources: Record<ResourceType, number> = {
            dirt: 10,
            stone: 5,
            coal: 0,
            iron_ore: 0,
            iron_ingot: 0,
            gold_ore: 0,
            diamond: 0,
            core: 0,
            wood: 0,
        };

        const canAfford = Object.entries(requiredResources).every(([res, amount]) => {
            return (state.inventory[res as ResourceType] || 0) >= amount;
        });

        if (!canAfford) return {}; // Ingen ändring om vi inte har råd

        // Dra av kostnaden
        const newInventory = { ...state.inventory };
        Object.entries(requiredResources).forEach(([res, amount]) => {
            newInventory[res as ResourceType] -= amount;
        });

        // Utrusta verktyget
        return {
            inventory: newInventory,
            currentTool: tool,
        };
    }),

    selectedResource: 'dirt',
    setSelectedResource: (resource) => set({ selectedResource: resource }),
    addResource: (type, amount) =>
        set((state) => ({
            inventory: {
                ...state.inventory,
                [type]: (state.inventory[type] || 0) + amount,
            },
        })),
    removeResource: (type, amount) =>
        set((state) => ({
            inventory: {
                ...state.inventory,
                [type]: Math.max(0, (state.inventory[type] || 0) - amount),
            },
        })),
}));