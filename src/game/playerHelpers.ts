import Phaser from 'phaser';

export interface PlayerSettings {
  density: number;
  friction: number;
  frictionStatic: number;
  restitution: number;
  width: number;
  height: number;
  moveForce: number;
  maxJumpBlocks: number;
}

export const DEFAULT_PLAYER_SETTINGS: PlayerSettings = {
  // Spelarens fysikegenskaper
  density: 2,
  friction: 0.1,
  frictionStatic: 0.2,
  restitution: 0, // Ingen studs för att förhindra penetration

  // Storlek på spelaren och dess hit-box
  width: 12,
  height: 16,

  // Rörelsevärden
  moveForce: 0.001,
  maxJumpBlocks: 1.5, // Spelaren hoppar maximalt 2.5 block högt över marken
};

// Genererar hattexturen direkt i spelardomänen
export function createPlayerHatTexture(scene: Phaser.Scene, key: string, color: number): void {
  const graphics = scene.make.graphics({ x: 0, y: 0 });

  // Hattkulle
  graphics.fillStyle(color, 1);
  graphics.fillRect(2, 2, 8, 4);

  // Hattskärm åt höger
  graphics.fillRect(2, 6, 12, 2);

  graphics.generateTexture(key, 14, 8);
  graphics.destroy();
}