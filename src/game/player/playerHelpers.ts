import Phaser from "phaser";

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
  jumpForce: number;
  maxJumpBlocks: number;
  groundNormalThreshold: number;
  landingVelocityScale: number;
}

export const DEFAULT_PLAYER_SETTINGS: PlayerSettings = {
  // Planet & Fysikmiljö
  gravityStrength: 0.001,
  frictionAir: 0.01,

  // Spelarens fysikegenskaper
  density: 0.1,
  friction: 0.8,
  frictionStatic: 0.8,
  restitution: 0, // Ingen studs för att förhindra penetration

  // Storlek på spelaren och dess hit-box
  width: 12,
  height: 16,

  // Rörelsevärden
  moveSpeed: 0.001,
  jumpForce: 0.005,
  maxJumpBlocks: 1.5, // Spelaren hoppar maximalt 2.5 block högt över marken

  // Markkontakt
  // En kollision räknas som markkontakt endast om normalen pekar mot planetens centrum.
  // Värdet är cosinus för vinkeln mellan normalen och "upp"-riktningen: 0.4 motsvarar ~24° nedåt,
  // vilket utesluter rena sidokollisioner men fortfarande tolererar blockytans kurva.
  groundNormalThreshold: 0.4,

  // Andelen av den nedåtriktade hastigheten som behålls när spelaren landar
  landingVelocityScale: 0.5,
};

// Genererar den högupplösta spelartexturen
export function createPlayerTexture(scene: Phaser.Scene, key: string, color: number = 0x00ff00): void {
  const textureWidth = 48;
  const textureHeight = 64;

  const graphics = scene.make.graphics({ x: 0, y: 0 });

  // Fyllnad för spelarens kropp
  graphics.fillStyle(color, 1);
  graphics.fillRect(0, 0, textureWidth, textureHeight);

  // Konturlinje i högupplösning
  graphics.lineStyle(2, 0x000000, 0.4);
  graphics.strokeRect(0, 0, textureWidth, textureHeight);

  graphics.generateTexture(key, textureWidth, textureHeight);
  graphics.destroy();
}

// Genererar hattexturen direkt i spelardomänen
export function createPlayerHatTexture(scene: Phaser.Scene, key: string, color: number): void {
  const scale = 4;
  const width = 14 * scale;
  const height = 8 * scale;

  const graphics = scene.make.graphics({ x: 0, y: 0 });

  // Hattkulle
  graphics.fillStyle(color, 1);
  graphics.fillRect(2 * scale, 2 * scale, 8 * scale, 4 * scale);

  // Hattskärm åt höger
  graphics.fillRect(2 * scale, 6 * scale, 12 * scale, 2 * scale);

  // Konturlinje för hatten
  graphics.lineStyle(1 * scale, 0x000000, 0.3);
  graphics.strokeRect(2 * scale, 2 * scale, 8 * scale, 4 * scale);

  graphics.generateTexture(key, width, height);
  graphics.destroy();

  // Tvinga skarpare/mjukare filtrering när texturen skalas ner
  if (scene.textures.exists(key)) {
    scene.textures.get(key).setFilter(Phaser.Textures.FilterMode.LINEAR);
  }
}
