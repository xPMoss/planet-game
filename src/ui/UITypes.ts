export interface ResourceDetails {
    name: string;
    color?: string;
    isTool?: boolean;
    isArmor?: boolean;
    isCraftable?: boolean; // <--- Din nya flagga
    recipe?: Record<string, number>;
    type?: string;
}

export const RESOURCE_COLORS: Record<string, string> = {
    dirt: "#8b5a2b",
    stone: "#808080",
    coal: "#000000",
    iron_ore: "#808080",
    iron_ingot: "#c0c0c0",
    copper_ore: "#b87333",
    copper_ingot: "#d97724",
    silver_ore: "#a8a8a8",
    silver_ingot: "#e0e0e0",
    gold_ore: "#ffd700",
    gold_ingot: "#ffae00",
    diamond: "#00ffff",
    wood: "#5c4033",
    sand: "#e0c068",
    core: "#ff4500",
    chest: "#8b4513",
    bed: "#ff0000",
    torch: "#ffcc00",
};

export const RESOURCE_INFO: Record<string, ResourceDetails> = {
    dirt: { name: "Jord", color: RESOURCE_COLORS.dirt },
    stone: { name: "Sten", color: RESOURCE_COLORS.stone },
    coal: { name: "Kol", color: RESOURCE_COLORS.coal },
    wood: { name: "Trä", color: RESOURCE_COLORS.wood },
    sand: { name: "Sand", color: RESOURCE_COLORS.sand },
    iron_ore: { name: "Järnmalm", color: RESOURCE_COLORS.iron_ore },
    copper_ore: { name: "Kopparmalm", color: RESOURCE_COLORS.copper_ore },
    silver_ore: { name: "Silvermalm", color: RESOURCE_COLORS.silver_ore },
    gold_ore: { name: "Guldmalm", color: RESOURCE_COLORS.gold_ore },
    diamond: { name: "Diamant", color: RESOURCE_COLORS.diamond },

    // Ingots (Smältning / Crafting)
    iron_ingot: {
        name: "Järntacka",
        color: RESOURCE_COLORS.iron_ingot,
        isCraftable: true,
        recipe: { iron_ore: 1, coal: 1 },
    },
    copper_ingot: {
        name: "Koppartacka",
        color: RESOURCE_COLORS.copper_ingot,
        isCraftable: true,
        recipe: { copper_ore: 1, coal: 1 },
    },
    silver_ingot: {
        name: "Silvertacka",
        color: RESOURCE_COLORS.silver_ingot,
        isCraftable: true,
        recipe: { silver_ore: 1, coal: 1 },
    },
    gold_ingot: {
        name: "Guldtacka",
        color: RESOURCE_COLORS.gold_ingot,
        isCraftable: true,
        recipe: { gold_ore: 1, coal: 1 },
    },

    // Byggbara items & Möbler
    chest: {
        name: "Chest",
        color: RESOURCE_COLORS.chest,
        isCraftable: true,
        recipe: { wood: 8 },
    },
    bed: {
        name: "Bed",
        color: RESOURCE_COLORS.bed,
        isCraftable: true,
        recipe: { wood: 5, dirt: 3 },
    },
    torch: {
        name: "Torch",
        color: RESOURCE_COLORS.torch,
        isCraftable: true,
        recipe: { wood: 1, coal: 1 },
    },

    // Swords
    "Iron Sword": { name: "Iron Sword", isTool: true, type: "sword" },
    "Diamond Sword": { name: "Diamond Sword", isTool: true, type: "sword" },

    // Pickaxes
    "Wood Pickaxe": { name: "Wood Pickaxe", isTool: true, type: "pickaxe" },
    "Iron Pickaxe": { name: "Iron Pickaxe", isTool: true, type: "pickaxe" },
    "Diamond Pickaxe": { name: "Diamond Pickaxe", isTool: true, type: "pickaxe" },

    // Axes
    "Wood Axe": { name: "Wood Axe", isTool: true, type: "axe" },
    "Iron Axe": { name: "Iron Axe", isTool: true, type: "axe" },
    "Diamond Axe": { name: "Diamond Axe", isTool: true, type: "axe" },

    // Shovels
    "Wood Shovel": { name: "Wood Shovel", isTool: true, type: "shovel" },
    "Iron Shovel": { name: "Iron Shovel", isTool: true, type: "shovel" },
    "Diamond Shovel": { name: "Diamond Shovel", isTool: true, type: "shovel" },

    // Rustning
    "Iron Helmet": { name: "Iron Helmet", isArmor: true, type: "helmet" },
    "Leather Clothes": { name: "Leather Clothes", isArmor: true, type: "armor" },
    "Iron Clothes": { name: "Iron Clothes", isArmor: true, type: "armor" },
    "Speed Boots": { name: "Speed Boots", isArmor: true, type: "boots" },
};
