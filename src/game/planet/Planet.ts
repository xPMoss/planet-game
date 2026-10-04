import Phaser from "phaser";
import { BlockType, type BlockData } from "types";
import { SimplexNoise } from "./planetHelpers";
import { DEFAULT_PLANET_CONFIG, type PlanetConfig } from "./planetConfig";
import { PlanetOutline, CATEGORY_PLAYER, CATEGORY_TERRAIN, CATEGORY_LOOT } from "./planetOutline";

export class Planet {
  private scene: Phaser.Scene;
  public config: PlanetConfig;
  public center: { x: number; y: number };
  private noise: SimplexNoise = new SimplexNoise();
  public blocks: Map<string, BlockData> = new Map();
  private outline!: PlanetOutline;

  constructor(scene: Phaser.Scene, config: Partial<PlanetConfig> = {}) {
    this.scene = scene;
    this.config = Object.assign({}, DEFAULT_PLANET_CONFIG, config);

    const totalPixels = this.config.radius * 2 * this.config.blockSize;
    this.center = {
      x: totalPixels / 2,
      y: totalPixels / 2,
    };

    this.outline = new PlanetOutline(scene, this);
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
    this.createBlockTexture("wood_tile", 0x5c4033);
    this.createBlockTexture("leaves_tile", 0x228b22);
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
              blockType = BlockType.CORE;
            } else if (distance <= dynamicRadius * stoneRadiusRatio) {
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

    this.generateSurfaceObjects();
    this.drawOutline();
  }

  private generateSurfaceObjects(): void {
    const surfaceBlocks: { x: number; y: number }[] = [];
    const radius = this.config.radius;

    this.blocks.forEach((block) => {
      if (block.type !== BlockType.DIRT) return;

      const dx = block.x - radius;
      const dy = block.y - radius;
      const dist = Math.hypot(dx, dy);

      if (dist === 0) return;

      const dirX = Math.round(dx / dist);
      const dirY = Math.round(dy / dist);

      const checkKey = block.x + dirX + "," + (block.y + dirY);
      if (!this.blocks.has(checkKey)) {
        surfaceBlocks.push({ x: block.x, y: block.y });
      }
    });

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
        const groundKey = surface.x + "," + surface.y;
        const groundBlock = this.blocks.get(groundKey);

        if (groundBlock && groundBlock.type !== BlockType.AIR) {
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

  private getTextureKey(blockType: BlockType): string {
    if (blockType === BlockType.CORE) return "core_tile";
    if (blockType === BlockType.STONE) return "stone_tile";
    if (blockType === BlockType.IRON_ORE) return "iron_ore_tile";
    if (blockType === BlockType.GOLD_ORE) return "gold_ore_tile";
    if (blockType === BlockType.DIAMOND) return "diamond_tile";
    if (blockType === BlockType.COAL) return "coal_tile";
    if (blockType === BlockType.WOOD) return "wood_tile";
    if (blockType === BlockType.LEAVES) return "leaves_tile";
    return "dirt_tile";
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
          this.scene.events.emit("collect-item", blockType);
          cleanupListeners();
          item.destroy();
          return;
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
}
