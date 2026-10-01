import Phaser from "phaser";
import { SimplexNoise, type PlanetConfig } from "./planetHelpers";
import { BlockType, type BlockData } from "../types/GameTypes";

export class Planet {
  private scene: Phaser.Scene;
  public config: PlanetConfig;
  public center: { x: number; y: number };
  private noise: SimplexNoise = new SimplexNoise();
  public blocks: Map<string, BlockData> = new Map();

  constructor(scene: Phaser.Scene, config: PlanetConfig) {
    this.scene = scene;
    this.config = config;

    const totalPixels = config.radius * 2 * config.blockSize;
    this.center = {
      x: totalPixels / 2,
      y: totalPixels / 2,
    };
  }

  public createTextures(): void {
    this.createBlockTexture("dirt_tile", 0x8b5a2b);
    this.createBlockTexture("stone_tile", 0x808080);
    this.createBlockTexture("core_tile", 0xff4500);
    this.createBlockTexture("player_tile", 0x00ff00);
    this.createBlockTexture("coal_tile", 0x000000);
    this.createBlockTexture("iron_ore_tile", 0x808080);
    this.createBlockTexture("gold_ore_tile", 0xffd700);
    this.createBlockTexture("diamond_tile", 0x00ffff);
  }

  private createBlockTexture(key: string, color: number): void {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(color, 1);
    graphics.fillRect(0, 0, this.config.blockSize, this.config.blockSize);
    graphics.lineStyle(1, 0x000000, 0.2);
    graphics.strokeRect(0, 0, this.config.blockSize, this.config.blockSize);
    graphics.generateTexture(key, this.config.blockSize, this.config.blockSize);
    graphics.destroy();
  }

  public generate(): void {
    const radius = this.config.radius;
    const blockSize = this.config.blockSize;
    const mapSize = radius * 2;

    const caveScale = Math.max(0.25, 8.0 / radius);
    const caveThreshold = 0.76;

    for (let x = 0; x < mapSize; x++) {
      for (let y = 0; y < mapSize; y++) {
        const dx = x - radius;
        const dy = y - radius;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const angle = Math.atan2(dy, dx);
        const mountainNoise = this.noise.noise2D(Math.cos(angle) * 3.0, Math.sin(angle) * 3.0);
        const dynamicRadius = radius + mountainNoise * 0.3;

        let blockType: BlockType = BlockType.AIR;

        if (distance <= dynamicRadius) {
          const caveNoise = this.noise.noise2D(x * caveScale, y * caveScale);
          const isCave = caveNoise > caveThreshold && distance > Math.max(3, radius * 0.3);

          if (!isCave) {
            if (distance <= Math.max(2, radius * 0.15)) {
              blockType = BlockType.CORE;
            } else if (distance <= dynamicRadius * 0.825) {
              // Ändrat från 0.65 till 0.825 gör att stenytan nås mycket tidigare (hälften så tunn jordskorpa)
              blockType = BlockType.STONE;
            } else {
              blockType = BlockType.DIRT;
            }
          }
        }

        if (blockType !== BlockType.AIR) {
          const worldX = x * blockSize + blockSize / 2;
          const worldY = y * blockSize + blockSize / 2;
          const textureKey = this.getTextureKey(blockType);

          const image = this.scene.matter.add.image(worldX, worldY, textureKey, undefined, {
            isStatic: true,
            friction: 0.8,
          });

          // Sätt klickbarhet på spriten
          image.setInteractive();
          image.setData("gridX", x);
          image.setData("gridY", y);

          const maxHp = this.getBlockMaxHp(blockType);
          const key = x + "," + y;

          this.blocks.set(key, {
            x,
            y,
            type: blockType,
            hp: maxHp,
            maxHp,
            body: image,
          });
        }
      }
    }
  }

  public getBlockMaxHp(type: BlockType): number {
    if (type === BlockType.CORE) return 100;
    if (type === BlockType.STONE) return 3;
    if (type === BlockType.COAL) return 2;
    if (type === BlockType.IRON_ORE) return 5;
    if (type === BlockType.GOLD_ORE) return 8;
    if (type === BlockType.DIAMOND) return 15;
    return 1; // Dirt
  }

  private getTextureKey(blockType: BlockType): string {
    if (blockType === BlockType.CORE) return "core_tile";
    if (blockType === BlockType.STONE) return "stone_tile";
    if (blockType === BlockType.IRON_ORE) return "iron_ore_tile";
    if (blockType === BlockType.GOLD_ORE) return "gold_ore_tile";
    if (blockType === BlockType.DIAMOND) return "diamond_tile";
    if (blockType === BlockType.COAL) return "coal_tile";
    return "dirt_tile";
  }

  // REMOVE BLOCK
  public removeBlock(x: number, y: number): void {
    const key = x + "," + y;
    const block = this.blocks.get(key);

    if (block) {
      if (block.body.body) {
        this.scene.matter.world.remove(block.body.body);
      }
      block.body.destroy();
      this.blocks.delete(key);
    }
  }

  // PLACE BLOCK
  public placeBlock(x: number, y: number, blockType: BlockType): boolean {
    const key = x + "," + y;
    if (this.blocks.has(key)) return false; // Det finns redan ett block här

    const blockSize = this.config.blockSize;
    const worldX = x * blockSize + blockSize / 2;
    const worldY = y * blockSize + blockSize / 2;
    const textureKey = this.getTextureKey(blockType);

    const image = this.scene.matter.add.image(worldX, worldY, textureKey, undefined, {
      isStatic: true,
      friction: 0.8,
    });

    image.setInteractive();
    image.setData("gridX", x);
    image.setData("gridY", y);

    const maxHp = this.getBlockMaxHp(blockType);

    this.blocks.set(key, {
      x,
      y,
      type: blockType,
      hp: maxHp,
      maxHp,
      body: image,
    });

    return true;
  }
}
