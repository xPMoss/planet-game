export interface JoystickState {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    jump: boolean;
    primaryAction: boolean;
    secondaryAction: boolean;
    angle: number;
    force: number;
    isInnerRing: boolean; // True om man är innanför inre ringen
}

export interface MobileInputState {
    jump: boolean;
    primaryAction: boolean;
    secondaryAction: boolean;
}

export type PlayerDirection = "right" | "left" | "up" | "down" | "up-right" | "up-left" | "down-right" | "down-left";
