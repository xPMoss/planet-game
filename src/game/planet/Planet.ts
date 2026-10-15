import { Assets, Container, Graphics, Rectangle, Sprite, Texture } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { BlockType, type BlockData, COLLIDER_GROUPS } from "types";
import { DEFAULT_PLANET_CONFIG, type PlanetConfig } from "./planetConfig";
import { PLANET_BIOMES, type PlanetType, type PlanetBiomeConfig } from "./planetConfig";

import { SimplexNoise } from "./planetHelpers";

export interface ExtendedPlanetConfig extends PlanetConfig {
  planetType?: PlanetType;
}

export class Planet {
  public config: ExtendedPlanetConfig;
  public center: { x: number; y: number };
  public biome: PlanetBiomeConfig;

  public blocks: Map<string, BlockData> = new Map();
  public container: Container;
  public coreContainer: Container; // <--- Ny behållare för kärnan
  private noise: SimplexNoise = new SimplexNoise();

  private world: RAPIER.World;
  private app: any;

  constructor(app: any, world: RAPIER.World, config: Partial<ExtendedPlanetConfig> = {}) {
    this.app = app;
    this.world = world;
    this.config = { ...DEFAULT_PLANET_CONFIG, ...config };
    this.container = new Container();

    this.coreContainer = new Container(); // Initiera lagret
    this.container.addChild(this.coreContainer); // Lägg till i huvudcontainern

    this.container.zIndex = 2;
    this.coreContainer.zIndex = 12;

    const type = this.config.planetType || "EARTH";
    this.biome = PLANET_BIOMES[type];

    const totalPixels = this.config.radius * 2 * this.config.blockSize;
    this.center = { x: totalPixels / 2, y: totalPixels / 2 };
  }

  // Lägg till denna metod i Planet-klassen (src/game/planet/Planet.ts)

  public findSpawnPosition(angleOffset: number = 0): { x: number; y: number } {
    const radius = this.config.radius;
    const blockSize = this.config.blockSize;
    const mapSize = radius * 2;

    // Utgå från toppen av planeten (-Math.PI / 2) plus eventuell offset
    const angle = -Math.PI / 2 + angleOffset;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);

    let surfaceBlockPos: { x: number; y: number } | null = null;

    // Sök utifrån och in för att hitta det yttersta GRÄSBLOCKET (ytan)
    for (let r = mapSize; r >= Math.floor(radius * 0.3); r--) {
      const checkX = Math.floor(this.center.x / blockSize + dirX * r);
      const checkY = Math.floor(this.center.y / blockSize + dirY * r);
      const key = checkX + "," + checkY;

      const block = this.blocks.get(key);
      // Vi vill enbart hitta det riktiga ytorganet (t.ex. gräs), inte träd/löv/surface-objekt
      if (block && block.type === BlockType.GRASS) {
        surfaceBlockPos = { x: checkX, y: checkY };
        break;
      }
    }

    // Fallback till vanliga blocket om gräs mot förmodan saknas i biom-konfigen
    if (!surfaceBlockPos) {
      for (let r = mapSize; r >= Math.floor(radius * 0.3); r--) {
        const checkX = Math.floor(this.center.x / blockSize + dirX * r);
        const checkY = Math.floor(this.center.y / blockSize + dirY * r);
        const key = checkX + "," + checkY;

        const block = this.blocks.get(key);
        if (block && block.type !== BlockType.AIR && block.type !== BlockType.WOOD && block.type !== BlockType.LEAVES) {
          surfaceBlockPos = { x: checkX, y: checkY };
          break;
        }
      }
    }

    if (surfaceBlockPos) {
      const worldX = surfaceBlockPos.x * blockSize + blockSize / 2;
      const worldY = surfaceBlockPos.y * blockSize + blockSize / 2;

      // Placera precis ovanför gräsblocket
      const spawnDistance = blockSize * 1.5;
      return {
        x: worldX + dirX * spawnDistance,
        y: worldY + dirY * spawnDistance,
      };
    }

    // Absolut fallback
    return {
      x: this.center.x,
      y: this.center.y - (radius * blockSize + 40),
    };
  }

  public generate(): void {
    this.generateBlocks();
    if (this.biome.decorations && this.biome.decorations.length > 0) {
      this.generateSurfaceObjects();
    }
    this.updateAllBlockFrames();
    this.drawCoreRectangles();
  }

  public updateAllBlockFrames(): void {
    const blockSize = this.config.blockSize;
    const tileSize = 32;

    this.blocks.forEach((block) => {
      if (block.body instanceof Sprite) {
        const worldX = block.x * blockSize + blockSize / 2;
        const worldY = block.y * blockSize + blockSize / 2;
        const dx = worldX - this.center.x;
        const dy = worldY - this.center.y;

        let snappedRotation = 0;
        if (Math.abs(dx) > Math.abs(dy)) {
          snappedRotation = dx > 0 ? Math.PI / 2 : -Math.PI / 2;
        } else {
          snappedRotation = dy > 0 ? Math.PI : 0;
        }

        const frameRect = this.getBlockTile(block.x, block.y, tileSize, snappedRotation, block.type);
        const texturePath = this.getBlockTexturePath(block.type);

        // Ladda (eller hämta från cache) och applicera rätt ram direkt
        Assets.load(texturePath)
          .then((baseTexture) => {
            baseTexture.source.scaleMode = "nearest";

            if (block.body instanceof Sprite) {
              block.body.texture = new Texture({
                source: baseTexture.source,
                frame: frameRect,
              });
            }
          })
          .catch(() => {
            console.warn("Kunde inte ladda textur för:", block.type);
          });
      }
    });
  }

  public generateBlocks(): void {
    const radius = this.config.radius;
    const mapSize = radius * 2;

    const caveScaleFactor = this.config.caveScaleFactor ?? 8.0;
    const caveScale = Math.max(0.25, caveScaleFactor / radius);
    const caveThreshold = this.config.caveThreshold ?? 0.76;
    const mountainScale = this.config.mountainScale ?? 3.0;
    const mountainIntensity = this.config.mountainIntensity ?? 0.3;
    const stoneRadiusRatio = this.config.stoneRadiusRatio ?? 0.825;

    // Slumpa fram antal lager för gräs (1-3 block) och jord (2-5 block)
    const grassDepth = Math.floor(Math.random() * 1) + 1; // 1, 2 eller 3
    const dirtDepth = Math.floor(Math.random() * 4) + 2; // 2, 3, 4 eller 5
    const coreRadiusRatio = 0.2; // 20% av radien utgör kärnan

    for (let x = 0; x < mapSize; x++) {
      for (let y = 0; y < mapSize; y++) {
        const dx = x - radius;
        const dy = y - radius;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const angle = Math.atan2(dy, dx);
        const mountainNoise = this.noise.noise2D(Math.cos(angle) * mountainScale, Math.sin(angle) * mountainScale);
        const dynamicRadius = radius + mountainNoise * mountainIntensity;

        let blockType: BlockType = BlockType.AIR;

        if (distance <= dynamicRadius) {
          const caveNoise = this.noise.noise2D(x * caveScale, y * caveScale);
          const isCave = caveNoise > caveThreshold && distance > Math.max(3, radius * 0.3);

          // Beräkna avståndet från ytan (radius - distance)
          const depthFromSurface = dynamicRadius - distance;

          if (!isCave) {
            if (distance <= Math.max(2, radius * coreRadiusRatio)) {
              blockType = this.biome.coreBlock;
            } else if (distance <= dynamicRadius * stoneRadiusRatio) {
              blockType = this.getOreOrBlock(this.biome.deepBlock);
            } else if (depthFromSurface < grassDepth) {
              blockType = this.biome.surfaceBlock;
            } else if (depthFromSurface < grassDepth + dirtDepth) {
              blockType = this.biome.subSurfaceBlock;
            } else {
              blockType = this.biome.deepBlock;
            }
          }
        }

        if (blockType !== BlockType.AIR) {
          this.createBlock(x, y, blockType, COLLIDER_GROUPS.CATEGORY_TERRAIN);
        }
      }
    }
  }

  // Byt ut generateSurfaceObjects i src/game/planet/Planet.ts till detta:

  private generateSurfaceObjects(): void {
    const radius = this.config.radius;
    const mapSize = radius * 2;
    const outerSurfaceMap = new Map<string, { x: number; y: number }>();

    const angleSteps = 360;
    for (let i = 0; i < angleSteps; i++) {
      const angle = (i * Math.PI * 2) / angleSteps;
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);

      let foundBlock: { x: number; y: number } | null = null;

      for (let r = mapSize; r >= Math.floor(radius * 0.3); r--) {
        const checkX = Math.floor(radius + dirX * r);
        const checkY = Math.floor(radius + dirY * r);
        const key = checkX + "," + checkY;

        const block = this.blocks.get(key);
        if (block && block.type !== BlockType.AIR) {
          foundBlock = { x: checkX, y: checkY };
          break;
        }
      }

      if (foundBlock) {
        const surfaceKey = foundBlock.x + "," + foundBlock.y;
        outerSurfaceMap.set(surfaceKey, foundBlock);
      }
    }

    const surfaceBlocks = Array.from(outerSurfaceMap.values());

    for (let i = surfaceBlocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = surfaceBlocks[i];
      surfaceBlocks[i] = surfaceBlocks[j];
      surfaceBlocks[j] = temp;
    }

    const maxObjects = 5 + Math.floor(Math.random() * 6);
    let objectCount = 0;
    const objectPositions: { x: number; y: number }[] = [];
    const minObjectDistance = 8;

    const isDesert = this.config.planetType === "DESERT";
    console.log("planetType", this.config.planetType);
    surfaceBlocks.forEach((surface) => {
      if (objectCount < maxObjects) {
        const tooClose = objectPositions.some((pos) => {
          return Math.hypot(pos.x - surface.x, pos.y - surface.y) < minObjectDistance;
        });

        if (!tooClose) {
          if (isDesert) {
            this.buildCactusOutward(surface.x, surface.y); // Bygg kaktus om det är öken
          } else {
            this.buildTreeOutward(surface.x, surface.y); // Annars träd
          }
          objectPositions.push({ x: surface.x, y: surface.y });
          objectCount++;
          return;
        }
      }
    });
  }

  private buildTreeOutward(startX: number, startY: number): void {
    const radius = this.config.radius;

    const dx = startX - radius;
    const dy = startY - radius;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    let dirX = 0;
    let dirY = 0;

    if (absX > absY) {
      dirX = dx > 0 ? 1 : -1;
    } else {
      dirY = dy > 0 ? 1 : -1;
    }

    const sideX = -dirY;
    const sideY = dirX;

    const trunkHeight = 2 + Math.floor(Math.random() * 2);

    let currentX = startX;
    let currentY = startY;

    for (let i = 1; i <= trunkHeight; i++) {
      const targetX = startX + dirX * i;
      const targetY = startY + dirY * i;

      this.createBlock(targetX, targetY, BlockType.WOOD, COLLIDER_GROUPS.CATEGORY_SURFACE_OBJECTS);
      currentX = targetX;
      currentY = targetY;
    }

    const crownLayers = [
      { forward: 1, sides: [-1, 0, 1] },
      { forward: 2, sides: [-1, 0, 1] },
      { forward: 3, sides: [0] },
    ];

    crownLayers.forEach((layer) => {
      layer.sides.forEach((sideOffset) => {
        const leafX = currentX + dirX * layer.forward + sideX * sideOffset;
        const leafY = currentY + dirY * layer.forward + sideY * sideOffset;

        this.createBlock(leafX, leafY, BlockType.LEAVES, COLLIDER_GROUPS.CATEGORY_SURFACE_OBJECTS);
      });
    });
  }

  // Lägg till denna metod i Planet.ts bland dina övriga byggfunktioner:

  private buildCactusOutward(startX: number, startY: number): void {
    const radius = this.config.radius;

    const dx = startX - radius;
    const dy = startY - radius;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    let dirX = 0;
    let dirY = 0;

    if (absX > absY) {
      dirX = dx > 0 ? 1 : -1;
    } else {
      dirY = dy > 0 ? 1 : -1;
    }

    // En kaktus är oftast 2-3 block hög
    const cactusHeight = 2 + Math.floor(Math.random() * 2);

    for (let i = 1; i <= cactusHeight; i++) {
      const targetX = startX + dirX * i;
      const targetY = startY + dirY * i;

      // Vi kan återanvända WOOD eller en dedikerad blocktyp för kaktus om det finns,
      // här använder vi WOOD (eller Leaves/annat block beroende på vad som passar grafiskt)
      this.createBlock(targetX, targetY, BlockType.CACTUS, COLLIDER_GROUPS.CATEGORY_SURFACE_OBJECTS);
    }
  }

  private getOreOrBlock(defaultBlock: BlockType): BlockType {
    const rand = Math.random();
    let cumulative = 0;

    for (const ore of this.biome.ores) {
      cumulative += ore.chance;
      if (rand < cumulative) {
        return ore.type;
      }
    }

    return defaultBlock;
  }

  public createBlock(x: number, y: number, blockType: BlockType, colliderGroup: number): boolean {
    const key = x + "," + y;
    if (this.blocks.has(key)) return false;

    const blockSize = this.config.blockSize;
    const worldX = x * blockSize + blockSize / 2;
    const worldY = y * blockSize + blockSize / 2;
    const dx = worldX - this.center.x;
    const dy = worldY - this.center.y;

    let snappedRotation = 0;
    if (Math.abs(dx) > Math.abs(dy)) {
      snappedRotation = dx > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      snappedRotation = dy > 0 ? Math.PI : 0;
    }

    // Skapa spriten direkt med en vit placeholder (eller färgtextur om du vill)
    const sprite = new Sprite(Texture.WHITE);
    sprite.anchor.set(0.5);
    sprite.width = blockSize;
    sprite.height = blockSize;
    sprite.x = worldX;
    sprite.y = worldY;
    sprite.rotation = snappedRotation;

    this.container.addChild(sprite);

    this.blocks.set(key, {
      x,
      y,
      type: blockType,
      hp: 1,
      maxHp: 1,
      body: sprite,
      colliderGroup: colliderGroup,
    });

    return true;
  }

  public placeBlock(x: number, y: number, blockType: BlockType): boolean {
    const key = x + "," + y;
    if (this.blocks.has(key)) return false;

    const blockSize = this.config.blockSize;
    const worldX = x * blockSize + blockSize / 2;
    const worldY = y * blockSize + blockSize / 2;

    /*
    const graphics = new Graphics();

    // Färger baserat på blocktyp
    let color = this.getBlockColor(blockType);

    graphics.rect(-blockSize / 2, -blockSize / 2, blockSize, blockSize);
    graphics.fill({ color: color });
    graphics.stroke({ width: 1, color: 0x000000, alpha: 0.2 });

    graphics.x = worldX;
    graphics.y = worldY;
    this.container.addChild(graphics);
*/

    const sprite = new Sprite(Texture.WHITE); // Sätt en placeholder-textur direkt
    sprite.anchor.set(0.5);
    sprite.width = blockSize;
    sprite.height = blockSize;
    sprite.x = worldX;
    sprite.y = worldY;

    const texturePath = this.getBlockTexturePath(blockType);

    // Ladda texturen via PixiJS Assets
    Assets.load(texturePath)
      .then((texture) => {
        texture.source.scaleMode = "nearest"; // För pixel-art stil
        sprite.texture = texture;
      })
      .catch(() => {
        // Fallback om texturen inte hittas
        console.warn("Kunde inte ladda textur för blocktyp:", blockType);
      });

    this.container.addChild(sprite);

    this.blocks.set(key, {
      x,
      y,
      type: blockType,
      hp: 1,
      maxHp: 1,
      body: sprite,
      colliderGroup: COLLIDER_GROUPS.CATEGORY_TERRAIN,
    });

    this.updateAllBlockFrames();
    return true;
  }

  // Om du gör det direkt i Planet.ts inne i removeBlock:
  public removeBlock(x: number, y: number): void {
    const key = x + "," + y;
    const block = this.blocks.get(key);

    if (block) {
      // Om vi tar bort en trädstam, rensa tillhörande löv i närheten
      if (block.type === BlockType.WOOD) {
        // Kolla runt stammblocket efter löv och ta bort dem
        const neighbors = [
          { x: x + 1, y },
          { x: x - 1, y },
          { x, y: y + 1 },
          { x, y: y - 1 },
          { x: x + 1, y: y + 1 },
          { x: x - 1, y: y - 1 },
          { x: x + 1, y: y - 1 },
          { x: x - 1, y: y + 1 },
        ];
        neighbors.forEach((n) => {
          const nKey = n.x + "," + n.y;
          const nBlock = this.blocks.get(nKey);
          if (nBlock && nBlock.type === BlockType.LEAVES) {
            this.removeConnectedLeaves(n.x, n.y);
          }
        });
      }

      if (block.body) {
        this.container.removeChild(block.body);
        block.body.destroy();
      }
      if (block.rapierBody) {
        this.world.removeRigidBody(block.rapierBody);
      }
      this.blocks.delete(key);

      this.updateAllBlockFrames();
    }
  }

  public removeConnectedLeaves(startX: number, startY: number): void {
    const visited = new Set<string>();
    const queue: { x: number; y: number }[] = [{ x: startX, y: startY }];

    while (queue.length > 0) {
      const current = queue.pop()!;
      const key = current.x + "," + current.y;

      if (visited.has(key)) continue;
      visited.add(key);

      const block = this.blocks.get(key);
      if (block && block.type === BlockType.LEAVES) {
        // Slumpmässig fördröjning mellan 50ms och 300ms per lövblock
        const delay = Math.floor(Math.random() * 400) + 100;

        setTimeout(() => {
          this.removeBlock(current.x, current.y);
        }, delay);

        // Kontrollera grannarna
        queue.push({ x: current.x + 1, y: current.y });
        queue.push({ x: current.x - 1, y: current.y });
        queue.push({ x: current.x, y: current.y + 1 });
        queue.push({ x: current.x, y: current.y - 1 });
      }
    }
  }

  public drawCoreRectangles(): void {
    this.coreContainer.removeChildren();

    const blockSize = this.config.blockSize;
    const maxDiameter = this.config.radius * 2 * blockSize;
    const step = 8 * blockSize; // 8 block i ökad diameter ger 4 block mellanrum på varje sida

    for (let currentSize = step; currentSize <= maxDiameter; currentSize += step) {
      const progress = currentSize / maxDiameter;
      const alpha = Math.max(0.1, 0.8 - progress * 0.6);

      const rect = new Graphics();
      rect.rect(this.center.x - currentSize / 2, this.center.y - currentSize / 2, currentSize, currentSize);
      rect.stroke({ width: 2, color: 0xff4500, alpha: alpha });

      this.coreContainer.addChild(rect);
    }
  }

  private getBlockColor(blockType: BlockType): number {
    // Färger baserat på blocktyp
    let color = 0x808080; // Standard sten (grå)
    if (blockType === BlockType.CORE) {
      color = 0xff4500; // Orange/Röd
    } else if (blockType === BlockType.GRASS) {
      color = 0x2e8b57; // Grön
    } else if (blockType === BlockType.DIRT) {
      color = 0x8b5a2b; // Brun
    } else if (blockType === BlockType.STONE) {
      color = 0x808080; // Grå
    } else if (blockType === BlockType.WOOD) {
      color = 0x5c4033; // Brun
    } else if (blockType === BlockType.SAND) {
      color = 0xf4a460; // Brunaktig
    } else if (blockType === BlockType.COAL) {
      color = 0x1a1a1a; // Svart
    } else if (blockType === BlockType.IRON_ORE) {
      color = 0x808080; // Grå (ojka i originalet)
    } else if (blockType === BlockType.COPPER_ORE) {
      color = 0xcd7f32; // Bronsfärg (ojka i originalet)
    } else if (blockType === BlockType.SILVER_ORE) {
      color = 0xc0c0c0; // Silverfärg
    } else if (blockType === BlockType.GOLD_ORE) {
      color = 0xffd700; // Guld
    } else if (blockType === BlockType.DIAMOND) {
      color = 0x00ffff; // Turkos
    } else if (blockType === BlockType.CHEST) {
      color = 0x8b5a2b; // Brun
    } else if (blockType === BlockType.BED) {
      color = 0x8b0000; // Röd
    } else if (blockType === BlockType.TORCH) {
      color = 0xffa500; // Orange
    } else if (blockType === BlockType.LEAVES) {
      color = 0x228b22; // Orange
    }
    return color;
  }

  // Lägg till denna hjälpfunktion i Planet-klassen
  private getBlockTile(x: number, y: number, tileSize: number, snappedRotation: number, blockType: BlockType): Rectangle {
    const rotIndex = Math.round((snappedRotation % (Math.PI * 2)) / (Math.PI / 2) + 4) % 4;

    let col: number = blockType;
    let row: number = 0;

    if (blockType > 7) {
      col = blockType - 8;
      row = 1;
    }
    if (blockType > 15) {
      col = blockType - 16;
      row = 2;
    }
    if (blockType > 23) {
      col = blockType - 24;
      row = 3;
    }

    if (blockType === BlockType.CORE) {
      col = 7;
      row = 7;
    }

    return new Rectangle(col * tileSize, row * tileSize, tileSize, tileSize);
  }

  //
  private getBlockTexturePath(blockType: BlockType): string {
    switch (blockType) {
      case BlockType.STONE:
        return "./src/assets/blocks.png";
      case BlockType.DIRT:
        return "./src/assets/blocks.png"; // Skapa/lägg till vid behov
      case BlockType.GRASS:
        return "./src/assets/blocks.png";
      case BlockType.WOOD:
        return "./src/assets/blocks.png";
      case BlockType.LEAVES:
        return "./src/assets/blocks.png";
      case BlockType.COAL:
        return "./src/assets/blocks.png";
      case BlockType.IRON_ORE:
        return "./src/assets/blocks.png";
      case BlockType.COPPER_ORE:
        return "./src/assets/blocks.png";
      case BlockType.SILVER_ORE:
        return "./src/assets/blocks.png";
      case BlockType.GOLD_ORE:
        return "./src/assets/blocks.png";
      case BlockType.DIAMOND:
        return "./src/assets/blocks.png";
      case BlockType.CHEST:
        return "./src/assets/blocks.png";
      case BlockType.BED:
        return "./src/assets/blocks.png";
      case BlockType.TORCH:
        return "./src/assets/blocks.png";
      default:
        return "./src/assets/blocks.png";
    }
  }

  //
  public getGravityAt(worldX: number, worldY: number): { force: number; isWithinRange: boolean } {
    const dx = this.center.x - worldX;
    const dy = this.center.y - worldY;
    const distToCenter = Math.hypot(dx, dy);
    const maxGravityDistance = this.config.maxGravityDistance ?? 3;

    const planetRadiusPx = this.config.radius * this.config.blockSize;

    const innerAtmosphereThickness = planetRadiusPx * maxGravityDistance * 0.33;
    const atmosphereThickness = planetRadiusPx * maxGravityDistance;

    // Om vi är utanför räckvidden för gravitationen
    if (distToCenter > atmosphereThickness) {
      return { force: 0, isWithinRange: false };
    }

    // Basgravitation från konfig
    const baseStrength = this.config.gravityStrength;

    // Enkel avtagande beräkning (linjär eller invers kvadrat)
    // Inom planeten eller nära ytan är kraften som starks, längre ut avtar den
    const distanceFactor = Math.max(0, 1 - (distToCenter - planetRadiusPx) / (atmosphereThickness - planetRadiusPx));

    // Alternativt fysikbaserat (invers kvadrat om man är i rymden):
    // const force = baseStrength * (planetRadiusPx / distToCenter) ** 2;

    return {
      force: baseStrength * Math.max(0.1, distanceFactor),
      isWithinRange: true,
    };
  }
}
