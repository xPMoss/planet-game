import { ALL_TOOLS } from "./gameStoreTypes";
import type { ResourceType, ToolType, Tool } from "types";

export function findToolByName(toolName: string | null): Tool | null {
    if (!toolName) return null;
    return ALL_TOOLS[toolName as ToolType] || null;
}

export function calculateTotalItems(inventory: Record<string, number>): number {
    return Object.values(inventory).reduce((sum, count) => sum + count, 0);
}

export function updateHotbarWithResource(
    currentHotbar: (string | null)[],
    resourceType: ResourceType,
): { newHotbar: (string | null)[]; updated: boolean } {
    const newHotbar = [...currentHotbar];

    if (!newHotbar.includes(resourceType)) {
        const emptyIndex = newHotbar.indexOf(null);
        if (emptyIndex !== -1) {
            newHotbar[emptyIndex] = resourceType;
            return { newHotbar, updated: true };
        }
    }

    return { newHotbar, updated: false };
}
