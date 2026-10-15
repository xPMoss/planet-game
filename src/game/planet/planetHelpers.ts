import { BlockType } from "types";

export type { PlanetConfig } from "./planetConfig";
export { DEFAULT_PLANET_CONFIG } from "./planetConfig";

export function getBlockColor(blockType: BlockType): number {
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
  } else if (blockType === BlockType.ICE) {
    color = 0x40c4ff; // Blue
  } else if (blockType === BlockType.ICE_ROCK) {
    color = 0xa8d8ee; // Blue
  } else if (blockType === BlockType.LAVA) {
    color = 0xff0000; // Red
  } else if (blockType === BlockType.LAVA_ROCK) {
    color = 0xff0000; // Red
  }

  return color;
}

//
export function getBlockTexturePath(blockType: BlockType): string {
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

export class SimplexNoise {
  private p: Uint8Array = new Uint8Array(256);
  private perm: Uint8Array = new Uint8Array(512);

  constructor() {
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
  }

  public noise2D(xin: number, yin: number): number {
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;

    let i1 = 0;
    let j1 = 1;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;

    const ii = i & 255;
    const jj = j & 255;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    let n0 = 0;
    if (t0 > 0) {
      t0 *= t0;
      n0 = t0 * t0 * this.gi(this.perm[ii + this.perm[jj]], x0, y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    let n1 = 0;
    if (t1 > 0) {
      t1 *= t1;
      n1 = t1 * t1 * this.gi(this.perm[ii + i1 + this.perm[jj + j1]], x1, y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    let n2 = 0;
    if (t2 > 0) {
      t2 *= t2;
      n2 = t2 * t2 * this.gi(this.perm[ii + 1 + this.perm[jj + 1]], x2, y2);
    }

    return 70.0 * (n0 + n1 + n2);
  }

  private gi(i: number, x: number, y: number): number {
    const h = i & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
}
