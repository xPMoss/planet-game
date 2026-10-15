import { Assets, Container, Graphics, Sprite, Texture } from "pixi.js";

// Genererar den högupplösta spelartexturen
export function createPlayerTexture(app: any, color: number = 0x9ce811): Texture {
  const graphics = new Graphics();
  graphics.rect(-6, -8, 12, 16);
  graphics.fill(color);
  //graphics.stroke({ width: 1, color: 0x000000, alpha: 0.4 });
  return app.renderer.generateTexture(graphics);
}

export async function loadRedHatTexture(): Promise<Texture> {
  // Om du använder PixiJS Assets-systemet:
  try {
    const texture = await Assets.load("./src/assets/red_hat.png");
    return texture;
  } catch (e) {
    console.warn("Kunde inte ladda red_hat.png via Assets, använder fallback.", e);
    return Texture.WHITE;
  }
}
// Original-hatten
export function createRedHatTexture(app: any, key: string = "red_hat", color: number = 0xff0000): Texture {
  const graphics = new Graphics();

  const g1 = new Graphics();
  g1.rect(1, -20, 10, 10).fill(color);

  const g2 = new Graphics();
  g2.rect(1, -10, 20, 1).fill(0x000000);

  const g3 = new Graphics();
  g3.rect(4.5, -10, 16, 2).fill(color);

  graphics.addChild(g1, g2, g3);
  return app.renderer.generateTexture(graphics);
}

// Järnhjälmen
export function createIronHelmetTexture(app: any, key: string = "iron_helmet", color: number = 0xc0c0c0): Texture {
  const scale = 4;
  const width = 14 * scale;
  const height = 8 * scale;

  const graphics = new Graphics();

  // Hjälmkupa
  graphics.fill(color);
  graphics.rect(2 * scale, 1 * scale, 10 * scale, 6 * scale);

  // Visir / Mörk springa
  graphics.fill(0x222222);
  graphics.rect(3 * scale, 4 * scale, 8 * scale, 2 * scale);

  // Kontur
  graphics.lineStyle(1 * scale, 0x000000, 0.4);
  graphics.rect(2 * scale, 1 * scale, 10 * scale, 6 * scale);
  return app.renderer.generateTexture(graphics);
}
