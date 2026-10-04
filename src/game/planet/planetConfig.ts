import { BlockType } from "types";

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
