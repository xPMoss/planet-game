import Phaser from 'phaser';

export interface PlayerSettings {
  gravityStrength: number;
  frictionAir: number;

  density: number;
  friction: number;
  frictionStatic: number;
  restitution: number;
  width: number;
  height: number;
  moveForce: number;
  jumpForce: number;
  maxJumpBlocks: number;
  groundNormalThreshold: number;
  landingVelocityScale: number;
}

export const DEFAULT_PLAYER_SETTINGS: PlayerSettings = {
  // Planet & Fysikmiljö
  gravityStrength: 0.1,
  frictionAir: 0.05,

  // Spelarens fysikegenskaper
  density: 0.1,
  friction: 0.1,
  frictionStatic: 0.2,
  restitution: 0, // Ingen studs för att förhindra penetration

  // Storlek på spelaren och dess hit-box
  width: 12,
  height: 16,

  // Rörelsevärden
  moveForce: 0.001,
  jumpForce: 10,
  maxJumpBlocks: 1.5, // Spelaren hoppar maximalt 2.5 block högt över marken

  // Markkontakt
  // En kollision räknas som markkontakt endast om normalen pekar mot planetens centrum.
  // Värdet är cosinus för vinkeln mellan normalen och "upp"-riktningen: 0.4 motsvarar ~24° nedåt,
  // vilket utesluter rena sidokollisioner men fortfarande tolererar blockytans kurva.
  groundNormalThreshold: 0.4,

  // Andelen av den nedåtriktade hastigheten som behålls när spelaren landar
  landingVelocityScale: 0.5
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