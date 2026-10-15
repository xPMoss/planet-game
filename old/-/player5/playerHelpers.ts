import Phaser from "phaser";

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

// Original-hatten
export function createPlayerHatTexture(scene: Phaser.Scene, key: string = "red_hat", color: number = 0xff0000): void {
  const scale = 4;
  const width = 14 * scale;
  const height = 8 * scale;

  const graphics = scene.make.graphics({ x: 0, y: 0 });

  graphics.fillStyle(color, 1);
  graphics.fillRect(2 * scale, 2 * scale, 8 * scale, 4 * scale);
  graphics.fillRect(2 * scale, 6 * scale, 12 * scale, 2 * scale);

  graphics.lineStyle(1 * scale, 0x000000, 0.3);
  graphics.strokeRect(2 * scale, 2 * scale, 8 * scale, 4 * scale);

  graphics.generateTexture(key, width, height);
  graphics.destroy();

  if (scene.textures.exists(key)) {
    scene.textures.get(key).setFilter(Phaser.Textures.FilterMode.LINEAR);
  }
}

// Järnhjälmen
export function createIronHelmetTexture(scene: Phaser.Scene, key: string = "iron_helmet", color: number = 0xc0c0c0): void {
  const scale = 4;
  const width = 14 * scale;
  const height = 8 * scale;

  const graphics = scene.make.graphics({ x: 0, y: 0 });

  // Hjälmkupa
  graphics.fillStyle(color, 1);
  graphics.fillRect(2 * scale, 1 * scale, 10 * scale, 6 * scale);

  // Visir / Mörk springa
  graphics.fillStyle(0x222222, 1);
  graphics.fillRect(3 * scale, 4 * scale, 8 * scale, 2 * scale);

  // Kontur
  graphics.lineStyle(1 * scale, 0x000000, 0.4);
  graphics.strokeRect(2 * scale, 1 * scale, 10 * scale, 6 * scale);

  graphics.generateTexture(key, width, height);
  graphics.destroy();
}
