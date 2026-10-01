import Phaser from "phaser";
import { SimplexNoise, type PlanetConfig } from "./planetHelpers";
import { BlockType, type BlockData } from "../types/GameTypes";

export class Planet {
  private scene: Phaser.Scene;
  public config: PlanetConfig;
  public center: { x: number; y: number };
  private noise: SimplexNoise = new SimplexNoise();
  public blocks: Map<string, BlockData> = new Map();

  private outlineGraphics?: Phaser.GameObjects.Graphics;
  private outlineBodies: MatterJS.BodyType[] = [];

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

          /*
          const image = this.scene.matter.add.image(worldX, worldY, textureKey, undefined, {
            isStatic: true,
            friction: 0.8,
          });
          */

          // Skapa vanliga visuella bilder (GameObjects.Image) ISTÄLLET för Matter.Image
          const image = this.scene.add.image(worldX, worldY, textureKey);

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

    this.drawOutline();
  }

  public drawOutline(): void {
    if (this.outlineGraphics) {
      this.outlineGraphics.clear();
    } else {
      this.outlineGraphics = this.scene.add.graphics();
      this.outlineGraphics.setDepth(10);
    }

    // 1. Rensa gamla fysikkroppar
    this.outlineBodies.forEach((body) => {
      this.scene.matter.world.remove(body);
    });
    this.outlineBodies = [];

    this.outlineGraphics.lineStyle(2, 0x00ffff, 0.8);

    const blockSize = this.config.blockSize;
    const radius = this.config.radius;
    const mapSize = radius * 2;
    const thickness = 8;
    const offset = 0.5; // Förskjutning inåt

    // 2. Flood Fill (BFS) för att hitta yttre luft
    const outerAir = new Set<string>();
    const queue: Array<{ x: number; y: number }> = [];

    for (let i = -1; i <= mapSize; i++) {
      queue.push({ x: i, y: -1 });
      queue.push({ x: i, y: mapSize });
      queue.push({ x: -1, y: i });
      queue.push({ x: mapSize, y: i });
    }

    const directions = [
      { dx: 0, dy: -1, edge: "top" },
      { dx: 1, dy: 0, edge: "right" },
      { dx: 0, dy: 1, edge: "bottom" },
      { dx: -1, dy: 0, edge: "left" },
    ];

    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = current.x + "," + current.y;

      if (current.x < -1 || current.x > mapSize || current.y < -1 || current.y > mapSize || outerAir.has(key) || this.blocks.has(key)) {
        continue;
      }

      outerAir.add(key);

      for (const d of directions) {
        queue.push({ x: current.x + d.dx, y: current.y + d.dy });
      }
    }

    // 3. Samla alla exponerade kanter i separata kartor
    const topEdges = new Map<string, Set<number>>(); // y -> Set of x
    const bottomEdges = new Map<string, Set<number>>(); // y -> Set of x
    const leftEdges = new Map<string, Set<number>>(); // x -> Set of y
    const rightEdges = new Map<string, Set<number>>(); // x -> Set of y

    this.blocks.forEach((block) => {
      const { x, y } = block;

      directions.forEach(({ dx, dy, edge }) => {
        const neighborKey = x + dx + "," + (y + dy);
        if (outerAir.has(neighborKey)) {
          if (edge === "top") {
            if (!topEdges.has(y.toString())) topEdges.set(y.toString(), new Set());
            topEdges.get(y.toString())!.add(x);
          } else if (edge === "bottom") {
            if (!bottomEdges.has(y.toString())) bottomEdges.set(y.toString(), new Set());
            bottomEdges.get(y.toString())!.add(x);
          } else if (edge === "left") {
            if (!leftEdges.has(x.toString())) leftEdges.set(x.toString(), new Set());
            leftEdges.get(x.toString())!.add(y);
          } else if (edge === "right") {
            if (!rightEdges.has(x.toString())) rightEdges.set(x.toString(), new Set());
            rightEdges.get(x.toString())!.add(y);
          }
        }
      });
    });

    // Hjälpfunktion för att slå ihop sammanhängande tal i en sorterad array
    const groupContinuous = (indices: number[]): Array<{ start: number; count: number }> => {
      indices.sort((a, b) => a - b);
      const result: Array<{ start: number; count: number }> = [];
      if (indices.length === 0) return result;

      let start = indices[0];
      let count = 1;

      for (let i = 1; i < indices.length; i++) {
        if (indices[i] === indices[i - 1] + 1) {
          count++;
        } else {
          result.push({ start, count });
          start = indices[i];
          count = 1;
        }
      }
      result.push({ start, count });
      return result;
    };

    // 4. Bygg sammanfogade horisontella kroppar (TOP & BOTTOM)
    const createHorizontalSegment = (y: number, startX: number, count: number, isTop: boolean) => {
      const startWorldX = startX * blockSize;
      const endWorldX = (startX + count) * blockSize;
      const worldY = y * blockSize;

      // Rita linjen visuellt
      this.outlineGraphics?.beginPath();
      const lineY = isTop ? worldY : worldY + blockSize;
      this.outlineGraphics?.moveTo(startWorldX, lineY);
      this.outlineGraphics?.lineTo(endWorldX, lineY);
      this.outlineGraphics?.strokePath();

      // Skapa en enda lång Matter-kropp för hela segmentet
      const edgeX = startWorldX + (count * blockSize) / 2;
      const edgeY = isTop ? worldY + thickness / 2 + offset : worldY + blockSize - thickness / 2 - offset;
      const edgeWidth = count * blockSize;
      const edgeHeight = thickness;

      const body = this.scene.matter.add.rectangle(edgeX, edgeY, edgeWidth, edgeHeight, {
        isStatic: true,
        friction: 0.01,
        frictionStatic: 0,
        restitution: 0,
      });

      this.outlineBodies.push(body);
    };

    topEdges.forEach((xSet, yStr) => {
      const y = parseInt(yStr, 10);
      const groups = groupContinuous(Array.from(xSet));
      groups.forEach(({ start, count }) => createHorizontalSegment(y, start, count, true));
    });

    bottomEdges.forEach((xSet, yStr) => {
      const y = parseInt(yStr, 10);
      const groups = groupContinuous(Array.from(xSet));
      groups.forEach(({ start, count }) => createHorizontalSegment(y, start, count, false));
    });

    // 5. Bygg sammanfogade vertikala kroppar (LEFT & RIGHT)
    const createVerticalSegment = (x: number, startY: number, count: number, isLeft: boolean) => {
      const startWorldY = startY * blockSize;
      const endWorldY = (startY + count) * blockSize;
      const worldX = x * blockSize;

      // Rita linjen visuellt
      this.outlineGraphics?.beginPath();
      const lineX = isLeft ? worldX : worldX + blockSize;
      this.outlineGraphics?.moveTo(lineX, startWorldY);
      this.outlineGraphics?.lineTo(lineX, endWorldY);
      this.outlineGraphics?.strokePath();

      // Skapa en enda lång Matter-kropp för hela segmentet
      const edgeX = isLeft ? worldX + thickness / 2 + offset : worldX + blockSize - thickness / 2 - offset;
      const edgeY = startWorldY + (count * blockSize) / 2;
      const edgeWidth = thickness;
      const edgeHeight = count * blockSize;

      const body = this.scene.matter.add.rectangle(edgeX, edgeY, edgeWidth, edgeHeight, {
        isStatic: true,
        friction: 0.01,
        frictionStatic: 0,
        restitution: 0,
      });

      this.outlineBodies.push(body);
    };

    leftEdges.forEach((ySet, xStr) => {
      const x = parseInt(xStr, 10);
      const groups = groupContinuous(Array.from(ySet));
      groups.forEach(({ start, count }) => createVerticalSegment(x, start, count, true));
    });

    rightEdges.forEach((ySet, xStr) => {
      const x = parseInt(xStr, 10);
      const groups = groupContinuous(Array.from(ySet));
      groups.forEach(({ start, count }) => createVerticalSegment(x, start, count, false));
    });
  }

  public drawOutlineOld(): void {
    // Rensa tidigare ritad outline om den finns
    if (this.outlineGraphics) {
      this.outlineGraphics.clear();
    } else {
      this.outlineGraphics = this.scene.add.graphics();
      // Tilldela ett högt depth-värde så linjen visas ovanpå blocken
      this.outlineGraphics.setDepth(10);
    }

    this.outlineBodies.forEach((body) => {
      this.scene.matter.world.remove(body);
    });
    this.outlineBodies = [];

    // Linjestil för outlinen (bredd, färg, alfa)
    this.outlineGraphics.lineStyle(2, 0x00ffff, 0.8);

    const blockSize = this.config.blockSize;
    const thickness = 4; // Tjocklek på krockytan

    const directions = [
      { dx: 0, dy: -1, edge: "top" },
      { dx: 1, dy: 0, edge: "right" },
      { dx: 0, dy: 1, edge: "bottom" },
      { dx: -1, dy: 0, edge: "left" },
    ];

    this.blocks.forEach((block) => {
      const { x, y } = block;

      directions.forEach(({ dx, dy, edge }) => {
        const neighborKey = x + dx + "," + (y + dy);

        if (!this.blocks.has(neighborKey)) {
          const startX = x * blockSize;
          const startY = y * blockSize;

          let edgeX = 0;
          let edgeY = 0;
          let edgeWidth = 0;
          let edgeHeight = 0;

          // Rita linjen visuellt och beräkna krockzonens position och storlek
          this.outlineGraphics?.beginPath();

          if (edge === "top") {
            this.outlineGraphics?.moveTo(startX, startY);
            this.outlineGraphics?.lineTo(startX + blockSize, startY);
            edgeX = startX + blockSize / 2;
            edgeY = startY;
            edgeWidth = blockSize;
            edgeHeight = thickness;
          } else if (edge === "right") {
            this.outlineGraphics?.moveTo(startX + blockSize, startY);
            this.outlineGraphics?.lineTo(startX + blockSize, startY + blockSize);
            edgeX = startX + blockSize;
            edgeY = startY + blockSize / 2;
            edgeWidth = thickness;
            edgeHeight = blockSize;
          } else if (edge === "bottom") {
            this.outlineGraphics?.moveTo(startX, startY + blockSize);
            this.outlineGraphics?.lineTo(startX + blockSize, startY + blockSize);
            edgeX = startX + blockSize / 2;
            edgeY = startY + blockSize;
            edgeWidth = blockSize;
            edgeHeight = thickness;
          } else if (edge === "left") {
            this.outlineGraphics?.moveTo(startX, startY);
            this.outlineGraphics?.lineTo(startX, startY + blockSize);
            edgeX = startX;
            edgeY = startY + blockSize / 2;
            edgeWidth = thickness;
            edgeHeight = blockSize;
          }

          this.outlineGraphics?.strokePath();

          // Skapa den statiska kollisionskroppen för segmentet
          const body = this.scene.matter.add.rectangle(edgeX, edgeY, edgeWidth, edgeHeight, {
            isStatic: true,
            friction: 0.8,
            restitution: 0,
          });

          this.outlineBodies.push(body);
        }
      });
    });
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
      this.drawOutline();
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
      friction: 0.1,
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

    this.drawOutline();

    return true;
  }
}
