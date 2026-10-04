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
