// GameTypes.ts eller planetConfig.ts
import { BlockType } from "types";

export type PlanetType = "EARTH" | "ICE" | "VOLCANO" | "DESERT";

export interface PlanetBiomeConfig {
    surfaceBlock: BlockType;
    subSurfaceBlock: BlockType;
    deepBlock: BlockType;
    coreBlock: BlockType;
    decorations?: BlockType[];
    ores: { type: BlockType; chance: number }[];
    colors: Record<string, number>; // Färger för texturgenerering
}

export const PLANET_BIOMES: Record<PlanetType, PlanetBiomeConfig> = {
    EARTH: {
        surfaceBlock: BlockType.DIRT,
        subSurfaceBlock: BlockType.DIRT,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        decorations: [BlockType.WOOD, BlockType.LEAVES],
        ores: [
            { type: BlockType.COAL, chance: 0.05 },
            { type: BlockType.IRON_ORE, chance: 0.03 },
            { type: BlockType.GOLD_ORE, chance: 0.01 },
        ],
        colors: {
            dirt_tile: 0x8b5a2b,
            stone_tile: 0x808080,
            core_tile: 0xff4500,
        },
    },
    ICE: {
        surfaceBlock: BlockType.SAND, // Kan återanvändas som 'Snö/Is' eller lägg till ny BlockType
        subSurfaceBlock: BlockType.STONE,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        ores: [
            { type: BlockType.DIAMOND, chance: 0.02 },
            { type: BlockType.SILVER_ORE, chance: 0.04 },
        ],
        colors: {
            sand_tile: 0xe0ffff, // Ljusis
            stone_tile: 0x4682b4, // Mörkis
            core_tile: 0x00ffff,
        },
    },
    VOLCANO: {
        surfaceBlock: BlockType.STONE,
        subSurfaceBlock: BlockType.STONE,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        ores: [
            { type: BlockType.GOLD_ORE, chance: 0.04 },
            { type: BlockType.COPPER_ORE, chance: 0.06 },
        ],
        colors: {
            stone_tile: 0x2b2b2b, // Basalt/Obsidian
            core_tile: 0xff0000,
        },
    },
    DESERT: {
        surfaceBlock: BlockType.SAND,
        subSurfaceBlock: BlockType.SAND,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        ores: [
            { type: BlockType.GOLD_ORE, chance: 0.03 },
            { type: BlockType.COPPER_ORE, chance: 0.05 },
        ],
        colors: {
            sand_tile: 0xedc9af,
            stone_tile: 0xd2b48c,
            core_tile: 0xff8c00,
        },
    },
};
export interface PlanetConfig {
    radius: number;
    blockSize: number;
    gravityStrength: number;
    outlineDepth?: number;
    padding?: number;
    caveScaleFactor?: number;
    caveThreshold?: number;
    mountainScale?: number;
    mountainIntensity?: number;
    stoneRadiusRatio?: number;
    coreRadiusRatio?: number;
    blockHp?: Partial<Record<BlockType, number>>;
}

export const DEFAULT_PLANET_CONFIG: PlanetConfig = {
    radius: 30,
    blockSize: 16,
    gravityStrength: 1,
    outlineDepth: 10,
    padding: 0.5,
    caveScaleFactor: 8.0,
    caveThreshold: 0.76,
    mountainScale: 3.0,
    mountainIntensity: 0.3,
    stoneRadiusRatio: 0.825,
    coreRadiusRatio: 0.15,
    blockHp: {
        [BlockType.CORE]: 100,
        [BlockType.STONE]: 3,
        [BlockType.COAL]: 2,
        [BlockType.IRON_ORE]: 5,
        [BlockType.GOLD_ORE]: 8,
        [BlockType.DIAMOND]: 15,
        [BlockType.WOOD]: 2,
        [BlockType.DIRT]: 1,
        [BlockType.AIR]: 0,
    },
};
