import { create } from "zustand";
import { ALL_TOOLS, MAX_INVENTORY_SLOTS, type GameState } from "./gameStoreTypes";
import { findToolByName, calculateTotalItems, updateHotbarWithResource } from "./gameStoreHelpers";

export { ALL_TOOLS, MAX_INVENTORY_SLOTS };

export const useGameStore = create<GameState>((set, get) => ({
    hp: 100,
    maxHp: 100,
    takeDamage: (amount) => set((state) => ({ hp: Math.max(0, state.hp - amount) })),
    heal: (amount) => set((state) => ({ hp: Math.min(state.maxHp, state.hp + amount) })),

    inventory: {
        "Wood Pickaxe": 1,
        wood: 0,
        dirt: 0,
        stone: 0,
        coal: 0,
        iron_ore: 0,
        iron_ingot: 0,
        gold_ore: 0,
        diamond: 0,
        core: 0,
    },
    maxSlots: MAX_INVENTORY_SLOTS,
    currentTool: ALL_TOOLS["Wood Pickaxe"],

    equipTool: (toolName) => {
        const tool = findToolByName(toolName);
        if (toolName === null || (tool && (get().inventory[toolName] || 0) > 0)) {
            set({ currentTool: tool });
        }
    },

    hotbar: [null, null, null, null],
    selectedHotbarIndex: 0,
    selectedResource: null,
    isInventoryOpen: false,

    getTotalItems: () => calculateTotalItems(get().inventory),

    canPickUp: () => get().getTotalItems() < get().maxSlots,

    mineBlock: (type, amount) => {
        const state = get();
        if (state.getTotalItems() + amount > state.maxSlots) return false;

        const newInventory = {
            ...state.inventory,
            [type]: (state.inventory[type] || 0) + amount,
        };

        const { newHotbar, updated } = updateHotbarWithResource(state.hotbar, type);

        set({
            inventory: newInventory,
            hotbar: updated ? newHotbar : state.hotbar,
            selectedResource: newHotbar[state.selectedHotbarIndex],
        });

        return true;
    },

    craftTool: (type) =>
        set((state) => {
            const tool = ALL_TOOLS[type];
            if (!tool) return {};

            const currentAmount = state.inventory[type] || 0;
            const newInventory = {
                ...state.inventory,
                [type]: currentAmount + 1,
            };

            return {
                inventory: newInventory,
                currentTool: tool,
            };
        }),

    setSelectedResource: (resource) => set({ selectedResource: resource }),

    setSelectedHotbarIndex: (index) => {
        const state = get();
        set({
            selectedHotbarIndex: index,
            selectedResource: state.hotbar[index],
        });
    },

    setHotbarSlot: (index, resource) => {
        const state = get();
        const newHotbar = [...state.hotbar];
        newHotbar[index] = resource;
        set({
            hotbar: newHotbar,
            selectedResource: newHotbar[state.selectedHotbarIndex],
        });
    },

    toggleInventory: () => set((state) => ({ isInventoryOpen: !state.isInventoryOpen })),

    addResource: (type, amount) => get().mineBlock(type, amount),

    removeResource: (type, amount) =>
        set((state) => {
            const newAmount = Math.max(0, (state.inventory[type] || 0) - amount);
            const newInventory = { ...state.inventory, [type]: newAmount };
            const newHotbar = [...state.hotbar];

            if (newAmount === 0) {
                const index = newHotbar.indexOf(type);
                if (index !== -1) newHotbar[index] = null;
            }

            return {
                inventory: newInventory,
                hotbar: newHotbar,
                selectedResource: newHotbar[state.selectedHotbarIndex],
            };
        }),
}));
