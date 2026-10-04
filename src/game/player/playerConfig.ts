export interface PlayerSettings {
    gravityStrength: number;
    frictionAir: number;

    density: number;
    friction: number;
    frictionStatic: number;
    restitution: number;
    width: number;
    height: number;
    moveSpeed: number;
    maxVelocity: number;
    jumpForce: number;
    maxJumpBlocks: number;
    groundNormalThreshold: number;
    landingVelocityScale: number;

    // Klättring & Cooldowns
    jumpCooldown: number;
    climbDuration: number;

    // Utseende & Färger
    bodyColor: number;
    hatColor: number;
    hatScale: number;
    eyeScale: number;
}

export const DEFAULT_PLAYER_SETTINGS: PlayerSettings = {
    // Planet & Fysikmiljö
    gravityStrength: 0.001,
    frictionAir: 0.1,

    // Spelarens fysikegenskaper
    density: 0.1,
    friction: 0,
    frictionStatic: 1,
    restitution: 0, // Ingen studs för att förhindra penetration

    // Storlek på spelaren och dess hit-box
    width: 12,
    height: 16,

    // Rörelsevärden
    moveSpeed: 2,
    maxVelocity: 2,
    jumpForce: 0.005,
    maxJumpBlocks: 1.5, // Spelaren hoppar maximalt 1.5 block högt över marken

    // Markkontakt
    groundNormalThreshold: 0.4,

    // Andelen av den nedåtriktade hastigheten som behålls när spelaren landar
    landingVelocityScale: 0.5,

    // Klättring & Cooldowns
    jumpCooldown: 250,
    climbDuration: 180,

    // Utseende & Färger
    bodyColor: 0x00ff00,
    hatColor: 0xff0000,
    hatScale: 0.25,
    eyeScale: 0.25,
};
