// src/store/gameStoreHelpers.ts

import { ALL_TOOLS } from "./gameStoreTypes";
import type { ResourceType, ToolType, Tool } from "types";
import { RESOURCE_INFO } from "ui";

const MAX_STACK_SIZE = 64;

export function findToolByName(toolName: string | null): Tool | null {
    if (!toolName) return null;
    return ALL_TOOLS[toolName as ToolType] || null;
}

export function calculateTotalItems(inventory: Record<string, number>): number {
    let usedSlots = 0;

    Object.keys(inventory).forEach((key) => {
        const count = inventory[key];
        if (count <= 0) return;

        const info = RESOURCE_INFO[key];

        // Verktyg och rustning tar alltid 1 hel slot per föremål
        if (info && (info.isTool || info.isArmor)) {
            usedSlots += count;
        } else {
            // Vanliga resurser stakar sig upp till MAX_STACK_SIZE
            usedSlots += Math.ceil(count / MAX_STACK_SIZE);
        }
    });

    return usedSlots;
}

export function updateHotbarWithResource(
    currentHotbar: (string | null)[],
    resourceType: ResourceType,
): { newHotbar: (string | null)[]; updated: boolean } {
    const newHotbar = [...currentHotbar];

    const info = RESOURCE_INFO[resourceType];
    if (info && (info.isTool || info.isArmor)) {
        return { newHotbar, updated: false };
    }

    if (!newHotbar.includes(resourceType)) {
        const emptyIndex = newHotbar.indexOf(null);
        if (emptyIndex !== -1) {
            newHotbar[emptyIndex] = resourceType;
            return { newHotbar, updated: true };
        }
    }

    return { newHotbar, updated: false };
}
