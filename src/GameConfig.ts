import Phaser from "phaser";
import { MainScene } from "./scenes/MainScene";

export const PhysicsConfig = {
  // Fysik-iterations för Matter.js (förhindrar penetration)
  positionIterations: 24, // DEFAULT 6
  velocityIterations: 24,
  constraintIterations: 24,
} as const;

export const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  backgroundColor: "#1a1a2e",
  disableContextMenu: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: "100%",
    height: "100%",
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { x: 0, y: 0 },
      runner: {
        fps: 60,
      },
      positionIterations: PhysicsConfig.positionIterations,
      velocityIterations: PhysicsConfig.velocityIterations,
      constraintIterations: PhysicsConfig.constraintIterations,
      debug: true,
    },
  },
  scene: [MainScene],
};
