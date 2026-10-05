export const RESOURCE_COLORS: Record<string, string> = {
    dirt: "#8b5a2b",
    stone: "#808080",
    coal: "#000000",
    iron_ore: "#808080",
    iron_ingot: "#c0c0c0",
    gold_ore: "#ffd700",
    diamond: "#00ffff",
    wood: "#5c4033",
    sand: "#e0c068",
    core: "#ff4500",
};

export const RESOURCE_INFO: Record<string, { name: string; color?: string; isTool?: boolean; isArmor?: boolean }> = {
    dirt: { name: "Jord", color: RESOURCE_COLORS.dirt },
    stone: { name: "Sten", color: RESOURCE_COLORS.stone },
    coal: { name: "Kol", color: RESOURCE_COLORS.coal },
    iron_ore: { name: "Järnmalm", color: RESOURCE_COLORS.iron_ore },
    iron_ingot: { name: "Järntacka", color: RESOURCE_COLORS.iron_ingot },
    gold_ore: { name: "Guld", color: RESOURCE_COLORS.gold_ore },
    diamond: { name: "Diamant", color: RESOURCE_COLORS.diamond },
    wood: { name: "Trä", color: RESOURCE_COLORS.wood },
    sand: { name: "Sand", color: RESOURCE_COLORS.sand },
    core: { name: "Kärna", color: RESOURCE_COLORS.core },

    // Pickaxes
    "Wood Pickaxe": { name: "Wood Pickaxe", isTool: true },
    "Iron Pickaxe": { name: "Iron Pickaxe", isTool: true },
    "Gold Pickaxe": { name: "Gold Pickaxe", isTool: true },
    "Diamond Pickaxe": { name: "Diamond Pickaxe", isTool: true },

    // Axes
    "Wood Axe": { name: "Wood Axe", isTool: true },
    "Iron Axe": { name: "Iron Axe", isTool: true },
    "Gold Axe": { name: "Gold Axe", isTool: true },
    "Diamond Axe": { name: "Diamond Axe", isTool: true },

    // Shovels
    "Wood Shovel": { name: "Wood Shovel", isTool: true },
    "Iron Shovel": { name: "Iron Shovel", isTool: true },
    "Gold Shovel": { name: "Gold Shovel", isTool: true },
    "Diamond Shovel": { name: "Diamond Shovel", isTool: true },

    // Rustning
    "Iron Helmet": { name: "Iron Helmet", isArmor: true },
    "Leather Clothes": { name: "Leather Clothes", isArmor: true },
    "Iron Clothes": { name: "Iron Clothes", isArmor: true },
    "Speed Boots": { name: "Speed Boots", isArmor: true },
};
