import { BlockType } from "types";

// Exempel på en ritning (6 block bred, 5 block hög)
export const HOUSE_BLUEPRINT = [
    [1, 1, 1, 1, 1, 1], // Tak
    [1, 0, 0, 0, 0, 1], // Väggar & tom insida
    [1, 0, 0, 0, 0, 1], // Väggar & tom insida
    [1, 0, 0, 0, 0, 1], // Ingång/Väggar
    [1, 1, 1, 1, 1, 1], // Golv
];

export const BLUEPRINT_WIDTH = HOUSE_BLUEPRINT[0].length;
export const BLUEPRINT_HEIGHT = HOUSE_BLUEPRINT.length;
