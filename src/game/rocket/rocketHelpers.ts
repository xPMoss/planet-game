import { Graphics } from "pixi.js";

/**
 * Genererar en 8-bitars utomjordisk rymdfarkost med Phaser Graphics.
 */
export function createRocketTexture(): Graphics {
  const g = new Graphics();
  g.zIndex = 0;
  const offsetX = -64;
  const offsetY = -34;

  // 1. Sidovapen (Vänster och Höger)
  g.fill(0x00e5ff, 1);
  g.rect(2 + offsetX, 40 + offsetY, 10, 8);
  g.rect(116 + offsetX, 40 + offsetY, 10, 8);

  g.fill({ color: 0x333333, alpha: 1 });
  g.rect(12 + offsetX, 38 + offsetY, 8, 12);
  g.rect(108 + offsetX, 38 + offsetY, 8, 12);

  // 2. Vingelement / Sido-thrusters
  g.fill({ color: 0x7b1fa2, alpha: 1 });
  g.rect(16 + offsetX, 32 + offsetY, 16, 24);
  g.rect(96 + offsetX, 32 + offsetY, 16, 24);

  g.fill({ color: 0x4a148c, alpha: 1 });
  g.rect(16 + offsetX, 48 + offsetY, 16, 8);
  g.rect(96 + offsetX, 48 + offsetY, 16, 8);

  // 3. Huvudskrov (Tefat / UFO-kropp)
  g.fill({ color: 0x9c27b0, alpha: 1 });
  g.rect(28 + offsetX, 28 + offsetY, 72, 32);

  g.fill({ color: 0xba68c8, alpha: 1 });
  g.rect(32 + offsetX, 24 + offsetY, 58 + 6, 8);

  g.fill({ color: 0x4a148c, alpha: 1 });
  g.rect(24 + offsetX, 52 + offsetY, 80, 12);

  // 4. Detaljer & Paneler (Mörka skrovlinjer)
  g.fill({ color: 0x212121, alpha: 1 });
  g.rect(28 + offsetX, 42 + offsetY, 72, 3);

  // Ljusande neondioder på tefatet
  g.fill({ color: 0x00e5ff, alpha: 1 });
  g.rect(36 + offsetX, 56 + offsetY, 6, 4);
  g.rect(53 + offsetX, 56 + offsetY, 6, 4);
  g.rect(70 + offsetX, 56 + offsetY, 6, 4);
  g.rect(86 + offsetX, 56 + offsetY, 6, 4);

  // 5. Cockpit-kupol (Glas)
  g.fill({ color: 0x00e5ff, alpha: 0.7 });
  g.rect(48 + offsetX, 6 + offsetY, 32, 22);
  g.rect(52 + offsetX, 0 + offsetY, 24, 6);

  // Reflektion i glaset
  g.fill({ color: 0xffffff, alpha: 0.9 });
  g.rect(52 + offsetX, 8 + offsetY, 6, 6);

  // 7. Undre Motor / Glöd
  g.fill({ color: 0x00ff66, alpha: 0.9 });
  g.rect(46 + offsetX, 64 + offsetY, 36, 6);
  g.fill({ color: 0xffff00, alpha: 1 });
  g.rect(50 + offsetX, 66 + offsetY, 28, 4);

  return g;
}
