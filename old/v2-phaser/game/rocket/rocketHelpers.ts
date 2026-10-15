import Phaser from "phaser";

/**
 * Genererar en 8-bitars utomjordisk rymdfarkost med Phaser Graphics.
 */
export function createRocketTexture(scene: Phaser.Scene, key = "rocket_tile"): void {
  const width = 128;
  const height = 72;

  const g = scene.make.graphics({ x: 0, y: 0 });
  const offsetY = 8;

  // 1. Sidovapen (Vänster och Höger)
  g.fillStyle(0x00e5ff, 1);
  g.fillRect(2, 32 + offsetY, 10, 8);
  g.fillRect(116, 32 + offsetY, 10, 8);

  g.fillStyle(0x333333, 1);
  g.fillRect(12, 30 + offsetY, 8, 12);
  g.fillRect(108, 30 + offsetY, 8, 12);

  // 2. Vingelement / Sido-thrusters
  g.fillStyle(0x7b1fa2, 1);
  g.fillRect(16, 24 + offsetY, 16, 24);
  g.fillRect(96, 24 + offsetY, 16, 24);

  g.fillStyle(0x4a148c, 1);
  g.fillRect(16, 40 + offsetY, 16, 8);
  g.fillRect(96, 40 + offsetY, 16, 8);

  // 3. Huvudskrov (Tefat / UFO-kropp)
  g.fillStyle(0x9c27b0, 1);
  g.fillRect(28, 20 + offsetY, 72, 32);

  g.fillStyle(0xba68c8, 1);
  g.fillRect(32, 16 + offsetY, 58 + 6, 8);

  g.fillStyle(0x4a148c, 1);
  g.fillRect(24, 44 + offsetY, 80, 12);

  // 4. Detaljer & Paneler (Mörka skrovlinjer)
  g.fillStyle(0x212121, 1);
  g.fillRect(28, 34 + offsetY, 72, 3);

  // Ljusande neondioder på tefatet
  g.fillStyle(0x00e5ff, 1);
  g.fillRect(36, 48 + offsetY, 6, 4);
  g.fillRect(53, 48 + offsetY, 6, 4);
  g.fillRect(70, 48 + offsetY, 6, 4);
  g.fillRect(86, 48 + offsetY, 6, 4);

  // 5. Cockpit-kupol (Glas)
  g.fillStyle(0x00e5ff, 0.7);
  g.fillRect(48, 6, 32, 22);
  g.fillRect(52, 0, 24, 6);

  // Reflektion i glaset
  g.fillStyle(0xffffff, 0.9);
  g.fillRect(52, 8, 6, 6);

  // 7. Undre Motor / Glöd
  g.fillStyle(0x00ff66, 0.9);
  g.fillRect(46, 56 + offsetY, 36, 6);
  g.fillStyle(0xffff00, 1);
  g.fillRect(50, 58 + offsetY, 28, 4);

  // Generera texturen
  g.generateTexture(key, width, height);
  g.destroy();

  // Sätt skarpa pixlar utan oskärpa för 8-bitarskänsla
  if (scene.textures.exists(key)) {
    scene.textures.get(key).setFilter(Phaser.Textures.FilterMode.NEAREST);
  }
}

export function createRocketTexture2(scene: Phaser.Scene, key: string = "rocket_tile"): void {
  const width = 64;
  const height = 128;

  const g = scene.make.graphics({ x: 0, y: 0 });

  // 1. Thruster Nozzle (botten)
  g.fillStyle(0x333333, 1);
  g.fillRect(24, 108, 16, 16);
  g.lineStyle(2, 0x111111, 1);
  g.strokeRect(24, 108, 16, 16);

  // Thruster glöd (orange innerdel)
  g.fillStyle(0xff6600, 0.9);
  g.fillRect(28, 116, 8, 10);

  // 2. Vänster och höger fenor (bottom fins)
  // Vänster fena
  g.fillStyle(0xd32f2f, 1);
  g.beginPath();
  g.moveTo(20, 80);
  g.lineTo(4, 116);
  g.lineTo(20, 116);
  g.closePath();
  g.fillPath();
  g.lineStyle(2, 0x800000, 1);
  g.strokePath();

  // Höger fena
  g.fillStyle(0xd32f2f, 1);
  g.beginPath();
  g.moveTo(44, 80);
  g.lineTo(60, 116);
  g.lineTo(44, 116);
  g.closePath();
  g.fillPath();
  g.lineStyle(2, 0x800000, 1);
  g.strokePath();

  // 3. Raketkropp (skrov) - Silvrig/Vit cylinder
  g.fillStyle(0xe0e0e0, 1);
  g.fillRect(18, 36, 28, 74);

  // Highlights / skuggning på kroppen för 3D-känsla
  g.fillStyle(0xffffff, 0.6);
  g.fillRect(20, 36, 6, 74); // Ljus highlight
  g.fillStyle(0x9e9e9e, 0.4);
  g.fillRect(40, 36, 6, 74); // Skugga

  // Röd rand på raketkroppen
  g.fillStyle(0xd32f2f, 1);
  g.fillRect(18, 68, 28, 10);

  // Skrovlinje
  g.lineStyle(2, 0x212121, 1);
  g.strokeRect(18, 36, 28, 74);

  // 4. Noskon (Top nose cone)
  g.fillStyle(0xd32f2f, 1);
  g.beginPath();
  g.moveTo(32, 4);
  g.lineTo(18, 36);
  g.lineTo(46, 36);
  g.closePath();
  g.fillPath();
  g.lineStyle(2, 0x800000, 1);
  g.strokePath();

  // Highlight på noskon
  g.fillStyle(0xff8a80, 0.5);
  g.beginPath();
  g.moveTo(32, 8);
  g.lineTo(22, 34);
  g.lineTo(32, 34);
  g.closePath();
  g.fillPath();

  // 5. Fönster / Porthole
  // Yttre ram
  g.fillStyle(0x424242, 1);
  g.fillCircle(32, 52, 10);
  g.lineStyle(2, 0x111111, 1);
  g.strokeCircle(32, 52, 10);

  // Glaset (cyan glow)
  g.fillStyle(0x00e5ff, 1);
  g.fillCircle(32, 52, 7);

  // Reflektion i glaset
  g.fillStyle(0xffffff, 0.8);
  g.fillCircle(30, 50, 3);

  g.generateTexture(key, width, height);
  g.destroy();

  if (scene.textures.exists(key)) {
    scene.textures.get(key).setFilter(Phaser.Textures.FilterMode.LINEAR);
  }
}
