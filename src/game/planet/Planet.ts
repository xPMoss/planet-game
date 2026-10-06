import Phaser from "phaser";
import { BlockType, type BlockData } from "types";
import { SimplexNoise } from "./planetHelpers";
import { DEFAULT_PLANET_CONFIG, type PlanetConfig } from "./planetConfig";
import { PlanetOutline, CATEGORY_TERRAIN, CATEGORY_LOOT } from "./planetOutline";
import { PLANET_BIOMES, type PlanetType, type PlanetBiomeConfig } from "./planetConfig";
import { useGameStore } from "store";
import type { ResourceType } from "types";

export interface ExtendedPlanetConfig extends PlanetConfig {
  planetType?: PlanetType;
}

export class Planet {
  private scene: Phaser.Scene;
  public config: ExtendedPlanetConfig;
  public biome: PlanetBiomeConfig;
  public center: { x: number; y: number };
  private noise: SimplexNoise = new SimplexNoise();
  public blocks: Map<string, BlockData> = new Map();
  private outline!: PlanetOutline;

  constructor(scene: Phaser.Scene, config: Partial<ExtendedPlanetConfig> = {}) {
    this.scene = scene;
    this.config = Object.assign({}, DEFAULT_PLANET_CONFIG, { planetType: "EARTH" }, config);

    const type = this.config.planetType || "EARTH";
    this.biome = PLANET_BIOMES[type];

    const totalPixels = this.config.radius * 2 * this.config.blockSize;
    this.center = {
      x: totalPixels / 2,
      y: totalPixels / 2,
    };

    this.outline = new PlanetOutline(scene, this);
  }

  public createTextures(): void {
    const colors = this.biome.colors;

    this.createBlockTexture("dirt_tile", colors.dirt_tile || 0x8b5a2b);
    this.createBlockTexture("stone_tile", colors.stone_tile || 0x808080);
    this.createBlockTexture("core_tile", colors.core_tile || 0xff4500);
    this.createBlockTexture("player_tile", 0x00ff00);
    this.createBlockTexture("coal_tile", 0x000000);
    this.createBlockTexture("iron_ore_tile", 0x808080);
    this.createBlockTexture("gold_ore_tile", 0xffd700);
    this.createBlockTexture("diamond_tile", 0x00ffff);
    this.createBlockTexture("wood_tile", 0x5c4033);
    this.createBlockTexture("leaves_tile", 0x228b22);
    this.createBlockTexture("sand_tile", colors.sand_tile || 0xe0c068);

    // Nya texturer
    this.createBlockTexture("chest_tile", 0x8b4513);
    this.createBlockTexture("bed_tile", 0xff0000);
    this.createBlockTexture("torch_tile", 0xffcc00);
  }

  private createBlockTexture(key: string, color: number): void {
    const textureSize = 64;

    const graphics = this.scene.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(color, 1);
    graphics.fillRect(0, 0, textureSize, textureSize);

    const strokeWidth = Math.max(1, textureSize / this.config.blockSize);
    graphics.lineStyle(strokeWidth, 0x000000, 0.2);
    graphics.strokeRect(0, 0, textureSize, textureSize);

    graphics.generateTexture(key, textureSize, textureSize);
    graphics.destroy();
  }

  public generate(): void {
    const radius = this.config.radius;
    const blockSize = this.config.blockSize;
    const mapSize = radius * 2;

    const caveScaleFactor = this.config.caveScaleFactor ?? 8.0;
    const caveScale = Math.max(0.25, caveScaleFactor / radius);
    const caveThreshold = this.config.caveThreshold ?? 0.76;
    const mountainScale = this.config.mountainScale ?? 3.0;
    const mountainIntensity = this.config.mountainIntensity ?? 0.3;
    const stoneRadiusRatio = this.config.stoneRadiusRatio ?? 0.825;
    const coreRadiusRatio = this.config.coreRadiusRatio ?? 0.15;

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

          if (!isCave) {
            if (distance <= Math.max(2, radius * coreRadiusRatio)) {
              blockType = this.biome.coreBlock;
            } else if (distance <= dynamicRadius * stoneRadiusRatio) {
              blockType = this.getOreOrBlock(this.biome.deepBlock);
            } else {
              blockType = this.biome.surfaceBlock;
            }
          }
        }

        if (blockType !== BlockType.AIR) {
          const worldX = x * blockSize + blockSize / 2;
          const worldY = y * blockSize + blockSize / 2;
          const textureKey = this.getTextureKey(blockType);

          const image = this.scene.add.image(worldX, worldY, textureKey);
          image.setDisplaySize(blockSize, blockSize);

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

    if (this.biome.decorations && this.biome.decorations.length > 0) {
      this.generateSurfaceObjects();
    }

    this.drawOutline();
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

  private generateSurfaceObjects(): void {
    const radius = this.config.radius;
    const mapSize = radius * 2;
    const outerSurfaceMap = new Map<string, { x: number; y: number }>();

    const angleSteps = 360;
    for (let i = 0; i < angleSteps; i++) {
      const angle = (i * Math.PI * 2) / angleSteps;
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);

      let furthestBlock: { x: number; y: number; dist: number } | null = null;

      for (let r = Math.floor(radius * 0.3); r <= mapSize; r++) {
        const checkX = Math.floor(radius + dirX * r);
        const checkY = Math.floor(radius + dirY * r);
        const key = checkX + "," + checkY;

        const block = this.blocks.get(key);
        if (block && (block.type === BlockType.DIRT || block.type === BlockType.STONE || block.type === BlockType.SAND)) {
          const dist = Math.hypot(checkX - radius, checkY - radius);
          if (!furthestBlock || dist > furthestBlock.dist) {
            furthestBlock = { x: checkX, y: checkY, dist };
          }
        }
      }

      if (furthestBlock) {
        const surfaceKey = furthestBlock.x + "," + furthestBlock.y;
        outerSurfaceMap.set(surfaceKey, { x: furthestBlock.x, y: furthestBlock.y });
      }
    }

    const surfaceBlocks = Array.from(outerSurfaceMap.values());

    for (let i = surfaceBlocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = surfaceBlocks[i];
      surfaceBlocks[i] = surfaceBlocks[j];
      surfaceBlocks[j] = temp;
    }

    const maxTrees = 5 + Math.floor(Math.random() * 6);
    let treeCount = 0;
    const treePositions: { x: number; y: number }[] = [];
    const minTreeDistance = 8;

    surfaceBlocks.forEach((surface) => {
      if (treeCount < maxTrees) {
        const tooClose = treePositions.some((pos) => {
          return Math.hypot(pos.x - surface.x, pos.y - surface.y) < minTreeDistance;
        });

        if (!tooClose) {
          this.buildTreeOutward(surface.x, surface.y);
          treePositions.push({ x: surface.x, y: surface.y });
          treeCount++;
          return;
        }
      }

      if (Math.random() < 0.1) {
        const dx = surface.x - radius;
        const dy = surface.y - radius;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        let stepX = 0;
        let stepY = 0;

        if (absX > absY) {
          stepX = dx > 0 ? 1 : -1;
        } else {
          stepY = dy > 0 ? 1 : -1;
        }

        const targetX = surface.x + stepX;
        const targetY = surface.y + stepY;

        this.placeBlock(targetX, targetY, BlockType.STONE);
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

      this.placeBlock(targetX, targetY, BlockType.WOOD);
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

        this.placeBlock(leafX, leafY, BlockType.LEAVES);
      });
    });
  }

  public drawOutline(): void {
    this.outline.draw();
  }

  public getBlockMaxHp(type: BlockType): number {
    if (this.config.blockHp && typeof this.config.blockHp[type] === "number") {
      return this.config.blockHp[type];
    }
    return 1;
  }

  public isFullyMined(): boolean {
    for (const block of this.blocks.values()) {
      if (block.type !== BlockType.CORE) {
        return false;
      }
    }
    return true;
  }

  public removeBlock(x: number, y: number): void {
    const key = x + "," + y;
    const block = this.blocks.get(key);

    if (block) {
      const blockType = block.type;

      if (block.body.body) {
        this.scene.matter.world.remove(block.body.body);
      }
      block.body.destroy();
      this.blocks.delete(key);

      this.spawnLoot(x, y, blockType);

      if (blockType === BlockType.WOOD || blockType === BlockType.LEAVES) {
        this.removeConnectedLeaves(x, y);
      }

      this.drawOutline();

      if (this.isFullyMined()) {
        this.scene.events.emit("planet-cleared");
      }
    }
  }

  private removeConnectedLeaves(startX: number, startY: number): void {
    const neighbors = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: -1 },
    ];

    const queue: { x: number; y: number }[] = [];

    for (const offset of neighbors) {
      const nx = startX + offset.x;
      const ny = startY + offset.y;
      const key = nx + "," + ny;
      const neighborBlock = this.blocks.get(key);

      if (neighborBlock && neighborBlock.type === BlockType.LEAVES) {
        queue.push({ x: nx, y: ny });
      }
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = current.x + "," + current.y;
      const block = this.blocks.get(key);

      if (!block || block.type !== BlockType.LEAVES) continue;

      let hasTrunkSupport = false;

      for (const offset of neighbors) {
        const checkKey = current.x + offset.x + "," + (current.y + offset.y);
        const checkBlock = this.blocks.get(checkKey);

        if (checkBlock && checkBlock.type === BlockType.WOOD) {
          hasTrunkSupport = true;
          break;
        }
      }

      if (!hasTrunkSupport) {
        if (block.body.body) {
          this.scene.matter.world.remove(block.body.body);
        }
        block.body.destroy();
        this.blocks.delete(key);

        for (const offset of neighbors) {
          const nx = current.x + offset.x;
          const ny = current.y + offset.y;
          const nextKey = nx + "," + ny;
          const nextBlock = this.blocks.get(nextKey);

          if (nextBlock && nextBlock.type === BlockType.LEAVES) {
            queue.push({ x: nx, y: ny });
          }
        }
      }
    }
  }

  private spawnLoot(gridX: number, gridY: number, blockType: BlockType): void {
    if (blockType === BlockType.AIR || blockType === BlockType.CORE) return;

    const blockSize = this.config.blockSize;
    const worldX = gridX * blockSize + blockSize / 2;
    const worldY = gridY * blockSize + blockSize / 2;
    const textureKey = this.getTextureKey(blockType);

    const itemSize = blockSize * 0.4;

    const item = this.scene.matter.add.image(worldX, worldY, textureKey, undefined, {
      shape: "circle",
      friction: 1.0,
      frictionStatic: 10.0,
      frictionAir: 0.02,
      restitution: 0.0,
      density: 0.05,
    });

    if (item.body) {
      this.scene.matter.body.setInertia(item.body as MatterJS.BodyType, Infinity);
    }

    item.setCollisionCategory(CATEGORY_LOOT);
    item.setCollidesWith([CATEGORY_TERRAIN]);

    item.setDisplaySize(itemSize, itemSize);
    item.setData("itemType", blockType);
    item.setData("isLoot", true);

    const randomAngle = Math.random() * Math.PI * 2;
    item.setRotation(randomAngle);

    const dx = worldX - this.center.x;
    const dy = worldY - this.center.y;
    const dist = Math.hypot(dx, dy) || 1;
    const outX = dx / dist;
    const outY = dy / dist;

    item.setVelocity(outX * 1.5, outY * 1.5);

    let isTouchingGround = false;

    const onCollisionStart = (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
      if (!item.body) return;

      for (const pair of event.pairs) {
        if (pair.bodyA === item.body || pair.bodyB === item.body) {
          isTouchingGround = true;
          item.setFrictionAir(0.2);
          break;
        }
      }
    };

    const onCollisionEnd = (event: Phaser.Physics.Matter.Events.CollisionEndEvent) => {
      if (!item.body) return;

      for (const pair of event.pairs) {
        if (pair.bodyA === item.body || pair.bodyB === item.body) {
          isTouchingGround = false;
          item.setFrictionAir(0.02);
          break;
        }
      }
    };

    this.scene.matter.world.on("collisionstart", onCollisionStart);
    this.scene.matter.world.on("collisionend", onCollisionEnd);

    const updateListener = () => {
      if (!item.active) return;

      const player = this.scene.children.list.find((child) => child.getData("isPlayer")) as Phaser.Physics.Matter.Image | undefined;
      if (player && player.active) {
        const pickupRadius = blockSize * 0.8;
        const playerDist = Math.hypot(player.x - item.x, player.y - item.y);

        if (playerDist <= pickupRadius) {
          const resourceType = this.mapBlockToResource(blockType);
          if (resourceType) {
            const success = useGameStore.getState().mineBlock(resourceType, 1);
            if (success) {
              this.scene.events.emit("collect-item", blockType);
              cleanupListeners();
              item.destroy();
              return;
            }
          }
        }
      }

      if (item.body) {
        const body = item.body as MatterJS.BodyType;

        const cDx = this.center.x - item.x;
        const cDy = this.center.y - item.y;
        const absX = Math.abs(cDx);
        const absY = Math.abs(cDy);

        let downX = 0;
        let downY = 0;

        if (absX > absY) {
          downX = cDx > 0 ? 1 : -1;
        } else {
          downY = cDy > 0 ? 1 : -1;
        }

        const currentGridX = Math.floor(item.x / blockSize);
        const currentGridY = Math.floor(item.y / blockSize);

        const targetGridX = currentGridX + downX;
        const targetGridY = currentGridY + downY;

        const targetWorldX = targetGridX * blockSize + blockSize / 2;
        const targetWorldY = targetGridY * blockSize + blockSize / 2;

        const blockDx = targetWorldX - item.x;
        const blockDy = targetWorldY - item.y;
        const blockDist = Math.hypot(blockDx, blockDy);

        if (blockDist > 0) {
          const dirX = blockDx / blockDist;
          const dirY = blockDy / blockDist;

          const gravity = 0.003;
          const force = new Phaser.Math.Vector2(dirX * gravity * body.mass, dirY * gravity * body.mass);
          item.applyForce(force);
        }

        if (isTouchingGround) {
          const vx = body.velocity.x;
          const vy = body.velocity.y;

          const dot = vx * downX + vy * downY;

          this.scene.matter.body.setVelocity(body, {
            x: downX * dot,
            y: downY * dot,
          });
        }
      }
    };

    const cleanupListeners = () => {
      this.scene.events.off("update", updateListener);
      this.scene.matter.world.off("collisionstart", onCollisionStart);
      this.scene.matter.world.off("collisionend", onCollisionEnd);
    };

    this.scene.events.on("update", updateListener);
  }

  public placeBlock(x: number, y: number, blockType: BlockType): boolean {
    const key = x + "," + y;
    if (this.blocks.has(key)) return false;

    const blockSize = this.config.blockSize;
    const worldX = x * blockSize + blockSize / 2;
    const worldY = y * blockSize + blockSize / 2;
    const textureKey = this.getTextureKey(blockType);

    const image = this.scene.matter.add.image(worldX, worldY, textureKey, undefined, {
      isStatic: true,
      friction: 0,
      collisionFilter: {
        category: CATEGORY_TERRAIN,
      },
    });
    image.setDisplaySize(blockSize, blockSize);

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

  private getTextureKey(blockType: BlockType): string {
    if (blockType === BlockType.CORE) return "core_tile";
    if (blockType === BlockType.STONE) return "stone_tile";
    if (blockType === BlockType.IRON_ORE) return "iron_ore_tile";
    if (blockType === BlockType.COPPER_ORE) return "copper_ore_tile";
    if (blockType === BlockType.SILVER_ORE) return "silver_ore_tile";
    if (blockType === BlockType.GOLD_ORE) return "gold_ore_tile";
    if (blockType === BlockType.DIAMOND) return "diamond_tile";
    if (blockType === BlockType.COAL) return "coal_tile";
    if (blockType === BlockType.WOOD) return "wood_tile";
    if (blockType === BlockType.LEAVES) return "leaves_tile";
    if (blockType === BlockType.SAND) return "sand_tile";
    if (blockType === BlockType.CHEST) return "chest_tile";
    if (blockType === BlockType.BED) return "bed_tile";
    if (blockType === BlockType.TORCH) return "torch_tile";
    return "dirt_tile";
  }

  private mapBlockToResource(type: BlockType): ResourceType | null {
    if (type === BlockType.DIRT) return "dirt";
    if (type === BlockType.STONE) return "stone";
    if (type === BlockType.COAL) return "coal";
    if (type === BlockType.IRON_ORE) return "iron_ore";
    if (type === BlockType.COPPER_ORE) return "copper_ore";
    if (type === BlockType.SILVER_ORE) return "silver_ore";
    if (type === BlockType.GOLD_ORE) return "gold_ore";
    if (type === BlockType.DIAMOND) return "diamond";
    if (type === BlockType.WOOD) return "wood";
    if (type === BlockType.SAND) return "sand";
    if (type === BlockType.CHEST) return "chest";
    if (type === BlockType.BED) return "bed";
    if (type === BlockType.TORCH) return "torch";
    return null;
  }
}
