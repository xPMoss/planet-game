
import Phaser from 'phaser';
import { MainScene } from './scenes/MainScene';

export const PhysicsConfig = {
  // Fysik-iterations för Matter.js (förhindrar penetration)
  positionIterations: 100, // DEFAULT 6
  velocityIterations: 100,
} as const;


export const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 390,
  height: 844,
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  disableContextMenu: true,
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 0 },
      positionIterations: PhysicsConfig.positionIterations,
      velocityIterations: PhysicsConfig.velocityIterations,
      debug: true
    }
  },
  scene: [MainScene]
};