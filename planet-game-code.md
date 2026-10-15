==================================================
PROJEKTSTRUKTUR (TRÄDKARTA)
==================================================

planet-game/
├── README.md
├── code_collector.py
├── index.html
├── package.json
├── public
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icons.svg
│   └── manifest.json
├── src
│   ├── assets
│   │   ├── blocks.png
│   │   ├── chest.png
│   │   ├── dirt.png
│   │   ├── grass.png
│   │   ├── grass1.png
│   │   ├── inventory.png
│   │   ├── leaves.png
│   │   ├── red_hat.png
│   │   ├── stone.png
│   │   └── wood.png
│   ├── game
│   │   ├── GameEngine.ts
│   │   ├── background
│   │   │   ├── Atmosphere.ts
│   │   │   └── Starfield.ts
│   │   ├── camera
│   │   │   ├── Camera.ts
│   │   │   └── index.ts
│   │   ├── house
│   │   │   ├── House.ts
│   │   │   ├── HouseBlueprint.ts
│   │   │   ├── HouseManager.ts
│   │   │   ├── PlacedBlueprint.ts
│   │   │   └── index.ts
│   │   ├── managers
│   │   │   ├── BuildingManager.ts
│   │   │   ├── CombatManager.ts
│   │   │   ├── HighlightManager.ts
│   │   │   ├── MiningManager.ts
│   │   │   └── index.ts
│   │   ├── planet
│   │   │   ├── Planet.ts
│   │   │   ├── PlanetChunkManager.ts
│   │   │   ├── index.ts
│   │   │   ├── planetConfig.ts
│   │   │   ├── planetHelpers.ts
│   │   │   ├── planetOptimizer.ts
│   │   │   └── planetOutline.ts
│   │   ├── player
│   │   │   ├── Player.ts
│   │   │   ├── index.ts
│   │   │   ├── playerConfig.ts
│   │   │   └── playerHelpers.ts
│   │   └── rocket
│   │       ├── Rocket.ts
│   │       ├── index.ts
│   │       └── rocketHelpers.ts
│   ├── main.ts
│   ├── scenes
│   │   ├── DebugScene.ts
│   │   ├── HouseScene.ts
│   │   ├── MainScene.ts
│   │   ├── SpaceScene.ts
│   │   └── index.ts
│   ├── store
│   │   ├── gameStoreHelpers.ts
│   │   ├── gameStoreTypes.ts
│   │   ├── index.ts
│   │   └── useGameStore.ts
│   ├── style.css
│   ├── types
│   │   ├── BlockTypes.ts
│   │   ├── ControllerTypes.ts
│   │   ├── ResourceTypes.ts
│   │   ├── ToolTypes.ts
│   │   └── index.ts
│   └── ui
│       ├── Header.ts
│       ├── HealthBar.ts
│       ├── Hotbar.ts
│       ├── InventoryModal.ts
│       ├── MenuModal.ts
│       ├── MobileControls.ts
│       ├── VirtualJoystick.ts
│       ├── index.ts
│       └── uiHelpers.ts
├── tailwind.config.js
├── todo.md
├── tsconfig.json
└── vite.config.ts

==================================================



==================================================
TYP: KONFIGURATION / PAKETHANTERING
FIL: package.json
==================================================

{
  "name": "planet-game",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "autoprefixer": "^10.6.1",
    "postcss": "^8.5.28",
    "rollup": "^4.64.2",
    "tailwindcss": "^4.3.3",
    "typescript": "~6.0.2",
    "vite": "^8.3.0",
    "vite-tsconfig-paths": "^6.1.1"
  },
  "dependencies": {
    "@dimforge/rapier2d-compat": "^0.21.0",
    "bootstrap-icons": "^1.13.1",
    "pixi.js": "^8.22.0",
    "zustand": "^5.0.15"
  },
  "main": "index.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}


==================================================
TYP: KONFIGURATION / PAKETHANTERING
FIL: README.md
==================================================

# VITE + REACT + TS + PIXI.JS Planet Game

![Game Preview](./preview.webp)

> A 2D procedural planet game with chunk-based infinite terrain generation, player physics, crafting, and building.

## Features

- **Infinite Procedural Terrain**: Generate infinite terrain using Simplex noise with configurable biomes
- **Chunk-Based Generation**: Dynamically load/unload chunks around the player for infinite exploration
- **Player Physics**: Real-time physics with gravity, walking, jumping, and gravity assist
- **Building System**: Place blocks (dirt, stone, wood, ore, etc.) and build structures
- **Crafting System**: Craft tools and items from collected resources
- **Inventory Management**: Track resources with drag-and-drop UI
- **Day/Night Cycle**: Real-time day/night cycle with lighting effects
- **Physics Integration**: Built-in physics system with collisions
- **Chunk Loading**: Visual feedback for chunk loading status

## Local Demo

### 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:5173`

### 🎮 Controls

- **WASD**: Move player
- **Space**: Jump
- **E**: Open/close inventory
- **1-9**: Select hotbar slots
- **LMB (hold)**: Place selected block
- **RMB (hold)**: Mine targeted block
- **Shift**: Slow walk (when Shift is enabled in settings)

### 📋 Game Rules

- Gravity only works when **below** the planet's surface
- Walking is disabled when **above** the planet's surface (unless Shift is enabled)
- Gravity assist helps you land when jumping from above the surface
- Must be **on or below** the surface to place blocks
- Must be **on or below** the surface to mine blocks
- Use Shift key for slower movement (when enabled in settings)
- Blocks have different breaking times based on material type
- Some blocks (like wood) can be placed on other blocks
- Some blocks (like dirt) can be placed on any solid block

## Tech Stack

- **Framework**: [React 18](https://react.dev)
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Build Tool**: [Vite 5](https://vitejs.dev)
- **Renderer**: [PixiJS v8](https://pixijs.com)
- **Physics**: [Matter.js](https://brm.io/matter-js/)
- **State Management**: [Pinia](https://pinia.vuejs.org)
- **Routing**: [React Router](https://reactrouter.com)

## Project Structure

```
src/
├── components/
│   ├── common/         # Reusable UI components
│   │   ├── BlockPicker.tsx
│   │   ├── InventorySlot.tsx
│   │   ├── KeyBindButton.tsx
│   │   ├── Modal.tsx
│   │   ├── Settings.tsx
│   │   └── Tooltip.tsx
│   ├── game/           # Game-specific components
│   │   ├── Hotbar.tsx
│   │   ├── Hud.tsx
│   │   └── Inventory.tsx
│   └── ui/             # Main UI screens
│       ├── App.tsx
│       ├── Game.tsx
│       ├── MainMenu.tsx
│       └── SettingsMenu.tsx
├── game/               # Core game logic
│   ├── blocks/         # Block definitions and utilities
│   │   ├── blockUtils.ts
│   │   ├── blocks.ts
│   │   └── blocksConfig.ts
│   ├── biome/          # Biome generation and configuration
│   │   ├── biomes.ts
│   │   └── planetGeneration.ts
│   ├── chunk/          # Chunk management system
│   │   ├── planetChunkManager.ts
│   │   ├── ChunkLoadingMonitor.tsx
│   │   └── useChunkLoading.ts
│   ├── planet/         # Planet generation and rendering
│   │   ├── planet.ts
│   │   ├── planetOutline.ts
│   │   ├── planetPhysics.ts
│   │   ├── planetTextures.ts
│   │   └── planetUtils.ts
│   ├── player/         # Player logic
│   │   ├── player.ts
│   │   ├── playerInput.ts
│   │   ├── playerPhysics.ts
│   │   └── playerTextures.ts
│   ├── systems/        # Game systems and managers
│   │   ├── chunkManager.ts
│   │   ├── dayNightCycle.ts
│   │   ├── highlightManager.ts
│   │   ├── itemManager.ts
│   │   ├── miningManager.ts
│   │   ├── physicsManager.ts
│   │   ├── buildingManager.ts
│   │   └── simulationLoop.ts
│   ├── types.ts        # TypeScript type definitions
│   ├── game.ts         # Main game initialization
│   └── utils.ts        # Utility functions
├── hooks/              # React hooks
│   ├── useGame.ts
│   └── useGameState.ts
├── store/              # Pinia stores
│   ├── game.ts
│   ├── inventory.ts
│   └── settings.ts
├── styles/             # Global styles
├── utils/              # General utilities
└── main.tsx            # Application entry point
```

## Configuration

Game settings can be configured in `src/store/settings.ts`:

```typescript
export const DEFAULT_SETTINGS = {
  gravityStrength: 0.45,
  gravityAssistRadius: 400,
  physicsGravity: { x: 0, y: 1 }, // Gravity direction
  showChunkBounds: false,
  showChunkLoadTimes: false,
  showGrid: false,
  showDebugStats: false,
  gravityEnabled: true,
  walkEnabled: false,
  cameraFollow: true,
  dayLength: 600, // seconds
  gravityRingsEnabled: true,
  showGravityBoundary: true,
};
```

## Development

### Adding New Biomes

1. Add biome configuration to `src/game/biome/biomes.ts`:

```typescript
export const PLANET_BIOMES: Record<PlanetType, PlanetBiomeConfig> = {
  EARTH: {
    name: "Earth",
    surfaceBlock: BlockType.DIRT,
    deepBlock: BlockType.STONE,
    coreBlock: BlockType.COAL,
    
    colors: {
      dirt_tile: 0x8b5a2b,
      stone_tile: 0x808080,
      core_tile: 0xff4500,
    }
  }
};
```

2. Update `src/game/biome/planetGeneration.ts` with new noise parameters if needed

3. Create new block textures in `src/game/planet/planetTextures.ts`

### Adding New Blocks

1. Add block type to `src/game/types.ts`:

```typescript
export enum BlockType {
  AIR = 0,
  // ...
  COAL = 9,
}
```

2. Update block configuration in `src/game/blocks/blocksConfig.ts`:

```typescript
export const BLOCK_CONFIG: Record<BlockType, BlockConfig> = {
  [BlockType.COAL]: {
    name: "Coal",
    textureKey: "coal_tile",
    texture: "mining_atlas",
    miningTime: 2,
    miningItem: "coal_ore",
    isObstruction: true,
    isDestroyable: true,
    isFlammable: false,
    isPlaceable: true,
    canBePlacedOn: [BlockType.DIRT, BlockType.STONE],
    blockSound: "block_break",
    itemSound: "item_drop",
  }
};
```

### Adding New Items

1. Add item type to `src/game/types.ts`:

```typescript
export type ItemType = "dirt" | "stone" | "wood" | "coal" | "iron_ore"

==================================================
TYP: KONFIGURATION / PAKETHANTERING
FIL: tailwind.config.js
==================================================

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

==================================================
TYP: KONFIGURATION / PAKETHANTERING
FIL: tsconfig.json
==================================================

{
  "compilerOptions": {
    "target": "es2023",
    "module": "esnext",
    "lib": ["ES2023", "DOM"],
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noImplicitReturns": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,

    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,

    "paths": {
      "@/*": ["./src/*"],
      "src/*": ["./src/*"],
      "camera": ["./src/game/camera"],
      "managers": ["./src/game/managers"],
      "house": ["./src/game/house"],
      "player": ["./src/game/player"],
      "planet": ["./src/game/planet"],
      "rocket": ["./src/game/rocket"],
      "scenes": ["./src/scenes"],
      "ui": ["./src/ui"],
      "store": ["./src/store"],
      "types": ["./src/types"],
    },
  },
  "include": ["src", "old/Rocket copy.ts"],
}


==================================================
TYP: KONFIGURATION / PAKETHANTERING
FIL: vite.config.ts
==================================================

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    base: "/planet-game/",
    plugins: [tsconfigPaths()],
    build: {
        outDir: "docs",
        emptyOutDir: true,
        target: "esnext", // Tillåter Top-Level Await utan extra plugins
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "esnext",
        },
    },
    server: {
        host: true,
    },
});


==================================================
TYP: KÄLLKOD
FIL: index.html
==================================================

<!DOCTYPE html>
<html lang="sv">

  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Planet Game</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet"/>
    <link href="/node_modules/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet"/>
    <link rel="manifest" href="/manifest.json">

  </head>

  <body class="font-family 'Orbitron', sans-serif">
    <div id="game-container" class="w-dvw h-dvh"></div>

    <script type="module" src="/src/main.ts"></script>
  </body>

</html>


==================================================
TYP: KÄLLKOD
FIL: todo.md
==================================================


#WARP

#Fler planets

#En till planet att landa på borde finnas lite varstans att välja på. 

#Planet som är en butik

#En butik trader borde finnas på en planet. Den kan också vara ett hus. Men jag tänker mer en byggnad på planeten. 


#Uppdatera husets insida och utsida



#Karta över planeter

#Truster boots, jetpack
#Annorlunda vapen
#Mining gun

#Uppgradera rymddräkten, tools, vapen


==================================================
TYP: KÄLLKOD
FIL: public\manifest.json
==================================================

{
  "name": "PlanetGame",
  "short_name": "PlanetGame",
  "description":"PlanetGame",
  "start_url": "./",
  "scope": "./",
  "display": "fullscreen",
  "display_override": [ "fullscreen", "standalone" ],
  "background_color": "#3D4C5C",
  "theme_color": "#3D4C5C",
  "prefer_related_applications": false,
  "launch_handler": {
    "client_mode": [ "focus-existing", "auto" ]
  },
  "icons": [
    {
      "src": "icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    },
    {
      "src": "icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    }
  ]
}


==================================================
TYP: KÄLLKOD
FIL: src\main.ts
==================================================

import { gameEngine } from "./game/GameEngine";
import { MainScene, DebugScene, SpaceScene } from "scenes";

async function bootstrap() {
    const container = document.getElementById("game-container");
    if (!container) return;

    await gameEngine.init(container);

    //const debugScene = new DebugScene(gameEngine.app, gameEngine.world, gameEngine.stageContainer);
    const mainScene = new MainScene(gameEngine.app, gameEngine.world, gameEngine.stageContainer);
    //const spaceScene = new SpaceScene(gameEngine.app, gameEngine.world, gameEngine.stageContainer);
    mainScene.start();
}

bootstrap();


==================================================
TYP: KÄLLKOD
FIL: src\style.css
==================================================

@import "tailwindcss";


html, body {
  margin: 0;
  padding: 0;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
}

#game-container {
  width: 100%;
  height: 100%;
}

==================================================
TYP: KÄLLKOD
FIL: src\game\GameEngine.ts
==================================================

import { Application, Container } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";

export class GameEngine {
  public app!: Application;
  public world!: RAPIER.World;
  public stageContainer!: Container;

  public async init(parentContainer: HTMLElement): Promise<void> {
    // Initiera Rapier WASM
    await RAPIER.init();

    // Skapa Rapier-värld utan global gravitation (0, 0)
    this.world = new RAPIER.World({ x: 0.0, y: 0.0 });

    // Initiera PixiJS v8 Application
    this.app = new Application();
    await this.app.init({
      resizeTo: window,
      backgroundColor: 0x1a1a2e,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    parentContainer.appendChild(this.app.canvas);

    // Huvudbehållare för alla spelobjekt (styrs av kameran)
    this.stageContainer = new Container();
    this.stageContainer.sortableChildren = true;
    this.app.stage.addChild(this.stageContainer);
  }
}

export const gameEngine = new GameEngine();


==================================================
TYP: KÄLLKOD
FIL: src\game\background\Atmosphere.ts
==================================================

import { BlurFilter, Container, Graphics } from "pixi.js";
import { Planet } from "../planet/Planet";

export class Atmosphere {
    public container: Container;
    private graphics: Graphics;

    constructor(planet: Planet) {
        this.container = new Container();
        this.graphics = new Graphics();
        this.container.addChild(this.graphics);
        this.container.zIndex = 0; // Precis ovanför planeten/stjärnorna
        const blurFilter = new BlurFilter();
        blurFilter.blur = 4; // Justera värdet för mer eller mindre utsmetad glöd
        this.container.filters = [blurFilter];
        this.drawAtmosphere(planet);
    }

    private drawAtmosphere(planet: Planet): void {
        this.graphics.clear();

        const blockSize = planet.config.blockSize;
        const planetRadiusPx = planet.config.radius * blockSize;
        const centerX = planet.center.x;
        const centerY = planet.center.y;

        // Rita en mjuk atmosfärsgel (tunn cirkel med lägre opacitet)
        const innerAtmosphereThickness = planetRadiusPx * 2;
        const atmosphereThickness = planetRadiusPx * 3;

        // plane's shadow / atmosphere
        this.graphics.circle(centerX, centerY, planetRadiusPx);
        this.graphics.fill({ color: 0x000000, alpha: 0.2 });

        // Innersta atmosfärslagret närmare ytan
        this.graphics.circle(centerX, centerY, innerAtmosphereThickness);
        this.graphics.fill({ color: 0x80d8ff, alpha: 0.15 });

        // Yttre atmosfärsglöd
        this.graphics.circle(centerX, centerY, atmosphereThickness);
        this.graphics.fill({ color: 0x00e5ff, alpha: 0.1 });
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\background\Starfield.ts
==================================================

import { Container, Graphics } from "pixi.js";
import { Planet } from "../planet/Planet";

interface Star {
    x: number;
    y: number;
    size: number;
    alpha: number;
    baseAlpha: number;
    twinkleSpeed: number;
    color: number;
}

export class Starfield {
    public container: Container;
    private graphics: Graphics;
    private stars: Star[] = [];

    constructor(planet: Planet, starCount: number = 350 * 10) {
        this.container = new Container();
        this.graphics = new Graphics();
        this.container.addChild(this.graphics);

        const mapSizePixels = planet.config.radius * 5 * planet.config.blockSize;
        const spawnRadius = mapSizePixels * 1.5;
        const planetRadiusPixels = planet.config.radius * planet.config.blockSize;

        this.generateStars(planet.center.x, planet.center.y, spawnRadius, starCount, planetRadiusPixels);
    }

    private generateStars(centerX: number, centerY: number, spawnRadius: number, count: number, planetRadiusPixels: number): void {
        const starColors = [0xffffff, 0xffe4e1, 0xb0e0e6, 0xfff8dc];

        for (let i = 0; i < count; i++) {
            let x = 0;
            let y = 0;
            let dist = 0;

            // Generera tills stjärnan hamnar utanför planeten
            do {
                const angle = Math.random() * Math.PI * 2;
                dist = Math.sqrt(Math.random()) * spawnRadius;

                x = centerX + Math.cos(angle) * dist;
                y = centerY + Math.sin(angle) * dist;
            } while (Math.hypot(x - centerX, y - centerY) < planetRadiusPixels);

            const size = Math.random() < 0.85 ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1.5;
            const baseAlpha = Math.random() * 0.6 + 0.3;
            const twinkleSpeed = Math.random() * 0.003;
            const color = starColors[Math.floor(Math.random() * starColors.length)];

            this.stars.push({
                x,
                y,
                size,
                alpha: baseAlpha,
                baseAlpha,
                twinkleSpeed,
                color,
            });
        }
    }

    public update(time: number): void {
        this.graphics.clear();

        for (const star of this.stars) {
            const currentAlpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed) * 0.25;
            const clampedAlpha = Math.max(0.1, Math.min(1, currentAlpha));

            this.graphics.rect(star.x, star.y, star.size, star.size);
            this.graphics.fill({ color: star.color, alpha: clampedAlpha });
        }
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\camera\Camera.ts
==================================================

import { Container } from "pixi.js";
import { Player } from "../player/Player";
import { Planet } from "../planet/Planet";

export class CameraController {
  private stageContainer: Container;
  private player: Player;
  private planet: Planet;
  private app: any;

  private targetZoom: number = 2; // 1.8
  private minZoom: number = 0.3;
  private maxZoom: number = 5.0;
  private currentRotation: number = 0;
  private prevPinchDistance: number = 0;

  private rocketTarget?: any; // Valfri referens till raketen

  public setRocketTarget(rocket: any): void {
    this.rocketTarget = rocket;
  }

  constructor(stageContainer: Container, player: Player, planet: Planet, app: any) {
    this.stageContainer = stageContainer;
    this.player = player;
    this.planet = planet;
    this.app = app;

    this.stageContainer.scale.set(this.targetZoom);
    this.setupZoomControls();
  }

  private setupZoomControls(): void {
    window.addEventListener("wheel", (event: WheelEvent) => {
      const zoomFactor = event.deltaY > 0 ? -0.15 : 0.15;
      this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom + zoomFactor));
    });

    window.addEventListener("touchmove", (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const p1 = event.touches[0];
        const p2 = event.touches[1];
        const currentDistance = Math.hypot(p1.clientX - p2.clientX, p1.clientY - p2.clientY);

        if (this.prevPinchDistance > 0) {
          const distanceDelta = currentDistance - this.prevPinchDistance;
          const zoomFactor = distanceDelta * 0.005;
          this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom + zoomFactor));
        }

        this.prevPinchDistance = currentDistance;
      }
    });

    window.addEventListener("touchend", (event: TouchEvent) => {
      if (event.touches.length < 2) {
        this.prevPinchDistance = 0;
      }
    });
  }

  public update(): void {
    // Bestäm om kameran ska följa spelaren eller raketen
    const targetPos = this.rocketTarget?.isBoarded && this.rocketTarget?.container ? this.rocketTarget.container : this.player.container;

    // --- NY LOGIK FÖR ATT ZOOMA UT UTANFÖR PLANETEN ---
    if (this.rocketTarget?.isBoarded) {
      const planetCenter = this.planet.center;
      const dx = planetCenter.x - targetPos.x;
      const dy = planetCenter.y - targetPos.y;
      const distToCenter = Math.hypot(dx, dy);

      // Beräkna planetens gräns (radie * blockSize)
      const planetRadiusPx = this.planet.config.radius * this.planet.config.blockSize;

      // Om raketen kommit utanför planetens yta/dragningszon, zooma ut kameran
      if (distToCenter > planetRadiusPx + 100) {
        this.targetZoom = 0.7; // Anpassa detta värde för hur mycket det ska zooma ut
      } else {
        this.targetZoom = 1.8; // Standardzoom när man är på/nära planeten
      }
    } else {
      // Återställ standardzoom om spelaren är till fots (eller inte i raketen)
      // Här kan du behålla användarens egen scroll-zoom om du vill,
      // eller låta den styras av standardvärdet.
    }
    // --------------------------------------------------

    const screenWidth = this.app.screen.width;
    const screenHeight = this.app.screen.height;

    // Mjuk in- och utzoomning
    const currentZoom = this.stageContainer.scale.x;
    const newZoom = currentZoom + (this.targetZoom - currentZoom) * 0.1;
    this.stageContainer.scale.set(newZoom);

    // Beräkna rotationen baserat på målets position i förhållande till planeten
    const angleToCenter = Math.atan2(this.planet.center.y - targetPos.y, this.planet.center.x - targetPos.x);
    let targetRotation = -angleToCenter + Math.PI / 2;

    let diff = targetRotation - this.currentRotation;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    this.currentRotation += diff * 0.05;
    this.stageContainer.rotation = this.currentRotation;

    const zoomThreshold = 1.0;
    const lerpFactor = Math.max(0, Math.min(1, (newZoom - this.minZoom) / (zoomThreshold - this.minZoom)));

    const focusX = this.planet.center.x + (targetPos.x - this.planet.center.x) * lerpFactor;
    const focusY = this.planet.center.y + (targetPos.y - this.planet.center.y) * lerpFactor;

    this.stageContainer.x = screenWidth / 2;
    this.stageContainer.y = screenHeight / 2;
    this.stageContainer.pivot.set(focusX, focusY);
  }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\camera\index.ts
==================================================

export * from "./Camera";


==================================================
TYP: KÄLLKOD
FIL: src\game\house\House.ts
==================================================

import { Container, Graphics, Sprite, Texture } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";

export interface HouseBounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export class House {
    public id: string;
    public bounds: HouseBounds;
    public doorGridPos: { x: number; y: number };
    public isPlayerInside: boolean = false;

    public container: Container;
    public body: RAPIER.RigidBody;

    private world: RAPIER.World;
    private planet: Planet;
    private currentSnapAngle: number = 0;

    constructor(
        world: RAPIER.World,
        planet: Planet,
        id: string,
        bounds: HouseBounds,
        doorGridPos: { x: number; y: number },
        texture: Texture,
        worldX: number,
        worldY: number,
        width: number,
        height: number,
    ) {
        this.world = world;
        this.planet = planet;
        this.id = id;
        this.bounds = bounds;
        this.doorGridPos = doorGridPos;

        // 1. PixiJS Rendering
        this.container = new Container();
        const sprite = new Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.width = width;
        sprite.height = height;
        this.container.addChild(sprite);

        this.container.x = worldX;
        this.container.y = worldY;

        // 2. Rapier RigidBody & Collider
        const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(worldX, worldY).setLinearDamping(0.5).setAngularDamping(2.0);

        this.body = this.world.createRigidBody(bodyDesc);

        const colliderDesc = RAPIER.ColliderDesc.cuboid(width / 2, height / 2)
            .setFriction(0.8)
            .setRestitution(0.0);

        this.world.createCollider(colliderDesc, this.body);
    }

    public update(): void {
        const center = this.planet.center;
        const pos = this.body.translation();
        const dx = center.x - pos.x;
        const dy = center.y - pos.y;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        let targetAngle = 0;
        let gravityDirX = 0;
        let gravityDirY = 0;

        if (absX > absY) {
            if (dx > 0) {
                targetAngle = -Math.PI / 2;
                gravityDirX = 1;
            } else {
                targetAngle = Math.PI / 2;
                gravityDirX = -1;
            }
        } else {
            if (dy > 0) {
                targetAngle = 0;
                gravityDirY = 1;
            } else {
                targetAngle = Math.PI;
                gravityDirY = -1;
            }
        }

        if (targetAngle !== this.currentSnapAngle) {
            this.currentSnapAngle = targetAngle;
            this.body.setRotation(targetAngle, true);
        }

        const mass = this.body.mass();
        const gravityStrength = 800 * mass;
        this.body.resetForces(true);
        this.body.addForce({ x: gravityDirX * gravityStrength, y: gravityDirY * gravityStrength }, true);

        // Synka PixiJS Container
        this.container.x = pos.x;
        this.container.y = pos.y;
        this.container.rotation = this.body.rotation();
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\house\HouseBlueprint.ts
==================================================

import { BlockType } from "types";

// Exempel på en ritning (6 block bred, 5 block hög)
export const HOUSE_BLUEPRINT2 = [
    [1, 1, 1, 1, 1, 1], // Tak
    [1, 0, 0, 0, 0, 1], // Väggar & tom insida
    [1, 0, 0, 0, 0, 1], // Väggar & tom insida
    [1, 0, 0, 0, 0, 1], // Ingång/Väggar
    [1, 1, 1, 1, 1, 1], // Golv
];

export const HOUSE_BLUEPRINT = [
    [1, 1, 1, 1], // Tak
    [1, 0, 0, 1], // Väggar & tom insida
    [1, 0, 0, 1], // Ingång/Väggar
    [1, 1, 1, 1], // Golv
];

export const BLUEPRINT_WIDTH = HOUSE_BLUEPRINT[0].length;
export const BLUEPRINT_HEIGHT = HOUSE_BLUEPRINT.length;


==================================================
TYP: KÄLLKOD
FIL: src\game\house\HouseManager.ts
==================================================

import { Container, Graphics, RenderTarget, RenderTexture, Sprite } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";
import { Player } from "../player/Player";
import { House, type HouseBounds } from "./House";
import { PlacedBlueprint } from "./PlacedBlueprint";
import { BlockType } from "../../types";
import { HOUSE_BLUEPRINT, BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT } from "./HouseBlueprint";

export class HouseManager {
    public houses: Map<string, House> = new Map();
    public placedBlueprints: PlacedBlueprint[] = [];
    public isPlacingBlueprint: boolean = false;
    public guideGraphics: Graphics;

    private app: any;
    private world: RAPIER.World;
    private planet: Planet;
    private player: Player;

    constructor(app: any, world: RAPIER.World, planet: Planet, player: Player) {
        this.app = app;
        this.world = world;
        this.planet = planet;
        this.player = player;

        this.guideGraphics = new Graphics();
    }

    public update(): void {
        this.houses.forEach((house) => house.update());
        this.renderGraphics();
    }

    public checkForHouseAt(gridX: number, gridY: number): void {
        for (let i = this.placedBlueprints.length - 1; i >= 0; i--) {
            const bp = this.placedBlueprints[i];
            if (gridX >= bp.startGridX && gridX < bp.startGridX + bp.width && gridY >= bp.startGridY && gridY < bp.startGridY + bp.height) {
                this.checkBlueprintProgress(bp);

                if (bp.isComplete()) {
                    this.convertBlueprintToHouse(bp);
                    this.placedBlueprints.splice(i, 1);
                }
            }
        }
    }

    private checkBlueprintProgress(bp: PlacedBlueprint): void {
        bp.cells.forEach((cell) => {
            const worldGridX = bp.startGridX + cell.relX;
            const worldGridY = bp.startGridY + cell.relY;
            const key = worldGridX + "," + worldGridY;
            const block = this.planet.blocks.get(key);

            if (cell.required === 1) {
                cell.isFulfilled = Boolean(block && block.type !== BlockType.AIR);
            } else if (cell.required === 0) {
                cell.isFulfilled = !block || block.type === BlockType.AIR;
            }
        });
    }

    private convertBlueprintToHouse(bp: PlacedBlueprint): void {
        const blockSize = this.planet.config.blockSize;
        const houseWidthPx = bp.width * blockSize;
        const houseHeightPx = bp.height * blockSize;

        // Skapa RenderTexture i PixiJS v8
        const renderTexture = RenderTexture.create({
            width: houseWidthPx,
            height: houseHeightPx,
        });

        bp.cells.forEach((cell) => {
            if (cell.required === 1) {
                const worldGridX = bp.startGridX + cell.relX;
                const worldGridY = bp.startGridY + cell.relY;
                const key = worldGridX + "," + worldGridY;
                const block = this.planet.blocks.get(key);

                if (block) {
                    this.planet.removeBlock(worldGridX, worldGridY);
                }
            }
        });

        const worldCenterX = bp.startGridX * blockSize + houseWidthPx / 2;
        const worldCenterY = bp.startGridY * blockSize + houseHeightPx / 2;

        const bounds: HouseBounds = {
            minX: bp.startGridX,
            maxX: bp.startGridX + bp.width - 1,
            minY: bp.startGridY,
            maxY: bp.startGridY + bp.height - 1,
        };

        const doorPos = {
            x: bp.startGridX + Math.floor(bp.width / 2),
            y: bp.startGridY + bp.height - 1,
        };

        const newHouse = new House(
            this.world,
            this.planet,
            bp.id,
            bounds,
            doorPos,
            renderTexture,
            worldCenterX,
            worldCenterY,
            houseWidthPx,
            houseHeightPx,
        );

        this.houses.set(bp.id, newHouse);
    }

    private renderGraphics(): void {
        this.guideGraphics.clear();
        const blockSize = this.planet.config.blockSize;

        this.placedBlueprints.forEach((bp) => {
            bp.cells.forEach((cell) => {
                const worldX = (bp.startGridX + cell.relX) * blockSize;
                const worldY = (bp.startGridY + cell.relY) * blockSize;

                if (cell.required === 1) {
                    if (cell.isFulfilled) {
                        this.guideGraphics.rect(worldX, worldY, blockSize, blockSize);
                        this.guideGraphics.stroke({ width: 2, color: 0x00ff00, alpha: 0.6 });
                    } else {
                        this.guideGraphics.rect(worldX, worldY, blockSize, blockSize);
                        this.guideGraphics.fill({ color: 0xffaa00, alpha: 0.15 });
                        this.guideGraphics.stroke({ width: 2, color: 0xffaa00, alpha: 0.8 });
                    }
                }
            });
        });
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\house\index.ts
==================================================

export * from "./House";
export * from "./HouseManager";
export * from "./HouseBlueprint";
export * from "./PlacedBlueprint";


==================================================
TYP: KÄLLKOD
FIL: src\game\house\PlacedBlueprint.ts
==================================================

export interface BlueprintCell {
    relX: number;
    relY: number;
    required: number; // 1 = Kräver block, 0 = Kräver tomrum
    isFulfilled: boolean;
}

export class PlacedBlueprint {
    public id: string;
    public startGridX: number;
    public startGridY: number;
    public width: number;
    public height: number;
    public cells: BlueprintCell[] = [];

    constructor(id: string, startGridX: number, startGridY: number, blueprintMatrix: number[][]) {
        this.id = id;
        this.startGridX = startGridX;
        this.startGridY = startGridY;
        this.height = blueprintMatrix.length;
        this.width = blueprintMatrix[0].length;

        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                this.cells.push({
                    relX: c,
                    relY: r,
                    required: blueprintMatrix[r][c],
                    isFulfilled: false,
                });
            }
        }
    }

    public isComplete(): boolean {
        return this.cells.every((cell) => cell.required === 0 || cell.isFulfilled);
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\managers\BuildingManager.ts
==================================================

import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";
import { Player } from "../player/Player";
import { HighlightManager } from "./HighlightManager";
import { HouseManager } from "../house/HouseManager";
import { useGameStore } from "../../store";
import { BlockType, type MobileInputState } from "types";

export class BuildingManager {
    private world: RAPIER.World;
    private planet: Planet;
    private player: Player;
    private highlightManager: HighlightManager;
    private houseManager: HouseManager;

    private canBuild: boolean = true;
    private readonly buildCooldownMs: number = 200;

    constructor(world: RAPIER.World, planet: Planet, player: Player, highlightManager: HighlightManager, houseManager: HouseManager) {
        this.world = world;
        this.planet = planet;
        this.player = player;
        this.highlightManager = highlightManager;
        this.houseManager = houseManager;
    }

    public update(keys: Record<string, boolean>, mobileInputState: MobileInputState): void {
        if (keys["KeyW"] || Boolean(mobileInputState?.secondaryAction)) {
            this.placeInFront();
        }
    }

    public placeInFront(): void {
        if (!this.canBuild) return;

        const selectedResource = useGameStore.getState().selectedResource;
        if (!selectedResource) return;

        const inventoryCount = useGameStore.getState().inventory[selectedResource] || 0;
        if (inventoryCount <= 0) return;

        const blockType = this.mapResourceToBlockType(selectedResource);
        if (blockType === null) return;

        // Hämta samma markerade målposition som HighlightManager använder
        const target = this.highlightManager.getTargetGridPosition();
        if (!target) return;

        const success = this.planet.placeBlock(target.gridX, target.gridY, blockType);

        if (success) {
            useGameStore.getState().removeResource(selectedResource, 1);
            this.houseManager?.checkForHouseAt(target.gridX, target.gridY);

            this.canBuild = false;
            setTimeout(() => {
                this.canBuild = true;
            }, this.buildCooldownMs);
        }
    }

    private mapResourceToBlockType(resource: string | null): BlockType | null {
        if (resource === "grass") return BlockType.GRASS;
        if (resource === "dirt") return BlockType.DIRT;
        if (resource === "stone") return BlockType.STONE;
        if (resource === "wood") return BlockType.WOOD;
        if (resource === "sand") return BlockType.SAND;
        if (resource === "core") return BlockType.CORE;
        if (resource === "coal") return BlockType.COAL;
        if (resource === "iron_ore") return BlockType.IRON_ORE;
        if (resource === "copper_ore") return BlockType.COPPER_ORE;
        if (resource === "silver_ore") return BlockType.SILVER_ORE;
        if (resource === "gold_ore") return BlockType.GOLD_ORE;
        if (resource === "diamond") return BlockType.DIAMOND;
        if (resource === "chest") return BlockType.CHEST;
        if (resource === "bed") return BlockType.BED;
        if (resource === "torch") return BlockType.TORCH;
        return null;
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\managers\CombatManager.ts
==================================================

import { Container, Graphics } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Player } from "../player/Player";
import { useGameStore } from "../../store";
import type { MobileInputState } from "types";

export class CombatManager {
    private world: RAPIER.World;
    private player: Player;
    private stageContainer: Container;
    private weaponGraphics: Graphics;

    private canAttack: boolean = true;
    private readonly defaultCooldownMs: number = 200;

    constructor(world: RAPIER.World, player: Player, stageContainer: Container) {
        this.world = world;
        this.player = player;
        this.stageContainer = stageContainer;

        this.weaponGraphics = new Graphics();
        this.stageContainer.addChild(this.weaponGraphics);
    }

    public update(keys: Record<string, boolean>, mobileInputState: MobileInputState): void {
        if (keys["KeyE"] || keys["Space"]) {
            this.attack();
        }
    }

    public attack(): void {
        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool || currentTool.type !== "sword" || !this.canAttack) return;

        // 1. Spela upp svärdsanimationen
        this.swingWeapon();

        // 2. Kontrollera träffar med Rapier
        this.checkHitbox(currentTool.damage);

        // 3. Cooldown
        this.canAttack = false;
        const cooldown = currentTool.speed ?? this.defaultCooldownMs;
        setTimeout(() => {
            this.canAttack = true;
        }, cooldown);
    }

    public swingWeapon(): void {
        const playerPos = this.player.container;
        const radius = 30;

        this.weaponGraphics.clear();
        this.weaponGraphics.x = playerPos.x;
        this.weaponGraphics.y = playerPos.y;
        this.weaponGraphics.rotation = playerPos.rotation;

        // Rita en svärdsbåge
        this.weaponGraphics.arc(0, 0, radius, -Math.PI / 4, Math.PI / 4);
        this.weaponGraphics.stroke({ width: 4, color: 0x00ffff, alpha: 0.8 });

        // Tona ut effekten
        setTimeout(() => {
            this.weaponGraphics.clear();
        }, 150);
    }

    private checkHitbox(damage: number): void {
        const playerPos = this.player.container;
        const radius = 32;

        // Sök efter kollisioner vid attackområdet framför spelaren
        const attackX = playerPos.x + Math.cos(playerPos.rotation) * radius;
        const attackY = playerPos.y + Math.sin(playerPos.rotation) * radius;

        // Använd Rapier intersection/point query
        this.world.intersectionsWithPoint({ x: attackX, y: attackY }, (collider) => {
            const body = collider.parent();
            if (body) {
                // Applicera skada på fiende eller objekt om träffat
                const userData = body.userData as any;
                if (userData && typeof userData.takeDamage === "function") {
                    userData.takeDamage(damage);
                }
            }
            return true;
        });
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\managers\HighlightManager.ts
==================================================

import { Graphics } from "pixi.js";
import { Planet } from "../planet/Planet";
import { Player } from "../player/Player";
import { useGameStore } from "../../store";

export class HighlightManager {
    public graphics: Graphics;
    private planet: Planet;
    private player: Player;

    constructor(planet: Planet, player: Player) {
        this.planet = planet;
        this.player = player;

        this.graphics = new Graphics();
        this.graphics.zIndex = 100;
    }

    public update(): void {
        this.graphics.clear();

        const target = this.getTargetGridPosition();
        if (!target) return;

        const blockSize = this.planet.config.blockSize;
        const worldX = target.gridX * blockSize;
        const worldY = target.gridY * blockSize;

        const key = target.gridX + "," + target.gridY;
        const existingBlock = this.planet.blocks.get(key);

        const selectedResource = useGameStore.getState().selectedResource;
        const inventoryCount = selectedResource ? useGameStore.getState().inventory[selectedResource] || 0 : 0;

        let color = 0x00ff00; // Grön = Byggbar tom ruta

        if (existingBlock) {
            color = 0xffff00; // Gul = Finns block (Mine)
        } else if (inventoryCount <= 0) {
            color = 0xff0000; // Röd = Ingen resurs kvar
        }

        this.graphics.rect(worldX, worldY, blockSize, blockSize);
        this.graphics.fill({ color: color, alpha: 0.2 });
        this.graphics.stroke({ width: 2, color: color, alpha: 0.9 });
    }

    public getTargetGridPosition(): { gridX: number; gridY: number } | null {
        if (!this.player?.container) return null;

        const blockSize = this.planet.config.blockSize;
        const playerPos = this.player.container;
        const direction = this.player.getDirection();

        let offsetX = 0;
        let offsetY = 0;

        switch (direction) {
            case "left":
                offsetX = -blockSize;
                break;
            case "right":
                offsetX = blockSize;
                break;
            case "up":
                offsetY = -blockSize;
                break;
            case "down":
                offsetY = blockSize;
                break;
            case "up-left":
                offsetX = -blockSize;
                offsetY = -blockSize;
                break;
            case "up-right":
                offsetX = blockSize;
                offsetY = -blockSize;
                break;
            case "down-left":
                offsetX = -blockSize;
                offsetY = blockSize;
                break;
            case "down-right":
                offsetX = blockSize;
                offsetY = blockSize;
                break;
        }

        const cos = Math.cos(playerPos.rotation);
        const sin = Math.sin(playerPos.rotation);

        const targetX = playerPos.x + (offsetX * cos - offsetY * sin);
        const targetY = playerPos.y + (offsetX * sin + offsetY * cos);

        return {
            gridX: Math.floor(targetX / blockSize),
            gridY: Math.floor(targetY / blockSize),
        };
    }

    public destroy(): void {
        this.graphics.destroy();
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\managers\index.ts
==================================================

export * from "./MiningManager";
export * from "./HighlightManager";
export * from "./BuildingManager";
export * from "./CombatManager";


==================================================
TYP: KÄLLKOD
FIL: src\game\managers\MiningManager.ts
==================================================

import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";
import { Player } from "../player/Player";
import { HighlightManager } from "./HighlightManager";
import { useGameStore } from "../../store";
import { REQUIRED_TOOL_TYPE, REQUIRED_TOOL_POWER, type MobileInputState } from "types";

export class MiningManager {
    private world: RAPIER.World;
    private planet: Planet;
    private player: Player;
    private highlightManager: HighlightManager;

    private canMine: boolean = true;
    private readonly defaultMineCooldownMs: number = 200;

    constructor(world: RAPIER.World, planet: Planet, player: Player, highlightManager: HighlightManager) {
        this.world = world;
        this.planet = planet;
        this.player = player;
        this.highlightManager = highlightManager;
    }

    public update(keys: Record<string, boolean>, mobileInputState: MobileInputState): void {
        if (keys["KeyE"] || Boolean(mobileInputState?.primaryAction)) {
            this.mineInFront();
        }
    }

    public mineInFront(): void {
        if (!this.canMine) return;

        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool || currentTool.type === "sword") return;

        const target = this.highlightManager.getTargetGridPosition();
        if (!target) return;

        const key = target.gridX + "," + target.gridY;
        const block = this.planet.blocks.get(key);

        if (block) {
            this.damageBlock(target.gridX, target.gridY);

            const cooldown = currentTool.speed ?? this.defaultMineCooldownMs;
            this.canMine = false;
            setTimeout(() => {
                this.canMine = true;
            }, cooldown);
        }
    }

    public damageBlock(x: number, y: number): void {
        const key = x + "," + y;
        const block = this.planet.blocks.get(key);

        if (!block) return;

        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool) return;

        const requiredTypes = REQUIRED_TOOL_TYPE[block.type] ?? ["none"];
        const requiredPower = REQUIRED_TOOL_POWER[block.type] ?? 0;

        const hasCorrectType = requiredTypes.includes("none") || requiredTypes.includes(currentTool.type);
        const hasCorrectPower = currentTool.power >= requiredPower;

        if (!hasCorrectType || !hasCorrectPower) return;

        block.hp -= currentTool.damage;

        if (block.hp <= 0) {
            this.planet.removeBlock(x, y);
        }
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\planet\index.ts
==================================================

export * from "./Planet";
export * from "./planetOutline";
export * from "./planetHelpers";
export * from "./planetOptimizer";
export * from "./planetConfig";
export * from "./PlanetChunkManager";


==================================================
TYP: KÄLLKOD
FIL: src\game\planet\Planet.ts
==================================================

import { Assets, Container, Graphics, Rectangle, Sprite, Texture } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { BlockType, type BlockData, COLLIDER_GROUPS } from "types";
import { DEFAULT_PLANET_CONFIG, type PlanetConfig } from "./planetConfig";
import { PLANET_BIOMES, type PlanetType, type PlanetBiomeConfig } from "./planetConfig";

import { SimplexNoise, getBlockColor, getBlockTexturePath } from "./planetHelpers";

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

  public findSpawnPosition(angleOffset: number = 0, spawnDistanceMultiplier: number = 1.5): { x: number; y: number } {
    const radius = this.config.radius;
    const blockSize = this.config.blockSize;
    const mapSize = radius * 2;

    const angle = -Math.PI / 2 + angleOffset;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);

    let surfaceBlockPos: { x: number; y: number } | null = null;
    const surfaceType = this.biome.surfaceBlock;

    for (let r = mapSize; r >= Math.floor(radius * 0.3); r--) {
      const checkX = Math.floor(this.center.x / blockSize + dirX * r);
      const checkY = Math.floor(this.center.y / blockSize + dirY * r);
      const key = checkX + "," + checkY;

      const block = this.blocks.get(key);
      if (block && block.type === surfaceType) {
        surfaceBlockPos = { x: checkX, y: checkY };
        break;
      }
    }

    if (!surfaceBlockPos) {
      for (let r = mapSize; r >= Math.floor(radius * 0.3); r--) {
        const checkX = Math.floor(this.center.x / blockSize + dirX * r);
        const checkY = Math.floor(this.center.y / blockSize + dirY * r);
        const key = checkX + "," + checkY;

        const block = this.blocks.get(key);
        if (
          block &&
          block.type !== BlockType.AIR &&
          block.type !== BlockType.WOOD &&
          block.type !== BlockType.LEAVES &&
          block.type !== BlockType.CACTUS
        ) {
          surfaceBlockPos = { x: checkX, y: checkY };
          break;
        }
      }
    }

    if (surfaceBlockPos) {
      const worldX = surfaceBlockPos.x * blockSize + blockSize / 2;
      const worldY = surfaceBlockPos.y * blockSize + blockSize / 2;

      const spawnDistance = blockSize * spawnDistanceMultiplier;
      return {
        x: worldX + dirX * spawnDistance,
        y: worldY + dirY * spawnDistance,
      };
    }

    return {
      x: this.center.x,
      y: this.center.y - (radius * blockSize + 60),
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
        const texturePath = getBlockTexturePath(block.type);

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

    /*
    // Skapa spriten direkt med en vit placeholder (eller färgtextur om du vill)
    const sprite = new Sprite(Texture.WHITE);
    sprite.anchor.set(0.5);
    sprite.width = blockSize;
    sprite.height = blockSize;
    sprite.x = worldX;
    sprite.y = worldY;
    sprite.rotation = snappedRotation;

    this.container.addChild(sprite);
    */

    const graphics = new Graphics();

    // Färger baserat på blocktyp
    let color = getBlockColor(blockType);

    graphics.rect(-blockSize / 2, -blockSize / 2, blockSize, blockSize);
    graphics.fill({ color: color });
    graphics.stroke({ width: 1, color: 0x000000, alpha: 0.2 });

    graphics.x = worldX;
    graphics.y = worldY;
    this.container.addChild(graphics);

    this.blocks.set(key, {
      x,
      y,
      type: blockType,
      hp: 1,
      maxHp: 1,
      body: graphics,
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

    const graphics = new Graphics();

    // Färger baserat på blocktyp
    let color = getBlockColor(blockType);

    graphics.rect(-blockSize / 2, -blockSize / 2, blockSize, blockSize);
    graphics.fill({ color: color });
    graphics.stroke({ width: 1, color: 0x000000, alpha: 0.2 });

    graphics.x = worldX;
    graphics.y = worldY;
    this.container.addChild(graphics);

    this.blocks.set(key, {
      x,
      y,
      type: blockType,
      hp: 1,
      maxHp: 1,
      body: graphics,
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


==================================================
TYP: KÄLLKOD
FIL: src\game\planet\PlanetChunkManager.ts
==================================================

import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "./Planet";
import { Player } from "../player/Player";
import { Rocket } from "../rocket/Rocket";
import { BlockType, COLLIDER_GROUPS } from "types";

interface ChunkColliderData {
    body: RAPIER.RigidBody;
    collider: RAPIER.Collider;
}
export class PlanetChunkManager {
    private world: RAPIER.World;
    private planet: Planet;
    private player: Player;
    private rocket?: Rocket;

    private activeColliders: Map<string, ChunkColliderData> = new Map();
    private activationRadiusPx: number;

    constructor(world: RAPIER.World, planet: Planet, player: Player, rocket?: Rocket, radiusInBlocks: number = 6) {
        this.world = world;
        this.planet = planet;
        this.player = player;
        this.rocket = rocket;
        this.activationRadiusPx = radiusInBlocks * planet.config.blockSize;
    }

    public update(): void {
        const playerPos = this.player.container;
        const rocketPos = this.rocket?.container;
        const blockSize = this.planet.config.blockSize;
        const radiusSq = this.activationRadiusPx * this.activationRadiusPx;

        const currentNeededKeys = new Set<string>();

        // 1. Hitta block inom radien för både spelaren och raketen
        this.planet.blocks.forEach((block, key) => {
            if (block.type === BlockType.AIR) return;

            const worldX = block.x * blockSize + blockSize / 2;
            const worldY = block.y * blockSize + blockSize / 2;

            // Kontrollera avstånd till spelare
            const pdx = worldX - playerPos.x;
            const pdy = worldY - playerPos.y;
            const playerDistSq = pdx * pdx + pdy * pdy;

            if (playerDistSq <= radiusSq) {
                currentNeededKeys.add(key);
                return;
            }

            // Kontrollera avstånd till raket om den finns
            if (rocketPos) {
                const rdx = worldX - rocketPos.x;
                const rdy = worldY - rocketPos.y;
                const rocketDistSq = rdx * rdx + rdy * rdy;

                if (rocketDistSq <= radiusSq) {
                    currentNeededKeys.add(key);
                }
            }
        });

        // 2. Ta bort både RigidBody och Collider som hamnat utanför radierna
        this.activeColliders.forEach((data, key) => {
            if (!currentNeededKeys.has(key)) {
                this.world.removeRigidBody(data.body);
                this.activeColliders.delete(key);
            }
        });

        // 3. Skapa nya för block inom radierna
        currentNeededKeys.forEach((key) => {
            if (!this.activeColliders.has(key)) {
                const block = this.planet.blocks.get(key);
                if (!block) return;

                const worldX = block.x * blockSize + blockSize / 2;
                const worldY = block.y * blockSize + blockSize / 2;

                const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(worldX, worldY);
                const body = this.world.createRigidBody(bodyDesc);

                const colliderDesc = RAPIER.ColliderDesc.cuboid(blockSize / 2, blockSize / 2)
                    .setFriction(block.friction || 0.8)
                    .setRestitution(block.restitution || 0.1);

                colliderDesc.setCollisionGroups((block.colliderGroup << 16) | 0xffff);
                const collider = this.world.createCollider(colliderDesc, body);

                this.activeColliders.set(key, { body, collider });
            }
        });
    }

    public destroy(): void {
        this.activeColliders.forEach((data) => {
            this.world.removeRigidBody(data.body);
        });
        this.activeColliders.clear();
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\planet\planetConfig.ts
==================================================

// GameTypes.ts eller planetConfig.ts
import { BlockType } from "types";

export type PlanetType = "EARTH" | "ICE" | "VOLCANO" | "DESERT";

export interface PlanetBiomeConfig {
    surfaceBlock: BlockType;
    subSurfaceBlock: BlockType;
    deepBlock: BlockType;
    coreBlock: BlockType;
    decorations?: BlockType[];
    ores: { type: BlockType; chance: number }[];
    colors: Record<string, number>; // Färger för texturgenerering
    textures?: Record<BlockType, string>; // Nytt: Mappning till texture keys
}

export const PLANET_BIOMES: Record<PlanetType, PlanetBiomeConfig> = {
    EARTH: {
        surfaceBlock: BlockType.GRASS,
        subSurfaceBlock: BlockType.DIRT,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        decorations: [BlockType.WOOD, BlockType.LEAVES],
        ores: [
            { type: BlockType.COAL, chance: 0.05 },
            { type: BlockType.IRON_ORE, chance: 0.03 },
            { type: BlockType.GOLD_ORE, chance: 0.01 },
        ],
        colors: {
            dirt_tile: 0x8b5a2b,
            stone_tile: 0x808080,
            core_tile: 0xff4500,
        },
    },
    ICE: {
        surfaceBlock: BlockType.ICE,
        subSurfaceBlock: BlockType.ICE_ROCK,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        ores: [
            { type: BlockType.DIAMOND, chance: 0.02 },
            { type: BlockType.SILVER_ORE, chance: 0.04 },
        ],
        colors: {
            sand_tile: 0xe0ffff, // Ljusis
            stone_tile: 0x4682b4, // Mörkis
            core_tile: 0x00ffff,
        },
    },
    VOLCANO: {
        surfaceBlock: BlockType.LAVA_ROCK,
        subSurfaceBlock: BlockType.LAVA,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        ores: [
            { type: BlockType.GOLD_ORE, chance: 0.04 },
            { type: BlockType.COPPER_ORE, chance: 0.06 },
        ],
        colors: {
            stone_tile: 0x2b2b2b, // Basalt/Obsidian
            core_tile: 0xff0000,
        },
    },
    DESERT: {
        surfaceBlock: BlockType.SAND,
        subSurfaceBlock: BlockType.SAND_ROCK,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        decorations: [BlockType.CACTUS],
        ores: [
            { type: BlockType.GOLD_ORE, chance: 0.03 },
            { type: BlockType.COPPER_ORE, chance: 0.05 },
        ],
        colors: {
            sand_tile: 0xedc9af,
            stone_tile: 0xd2b48c,
            core_tile: 0xff8c00,
        },
    },
};

export interface PlanetConfig {
    radius: number;
    blockSize: number;
    gravityStrength: number;
    maxGravityDistance?: number;
    outlineDepth?: number;
    padding?: number;
    caveScaleFactor?: number;
    caveThreshold?: number;
    mountainScale?: number;
    mountainIntensity?: number;
    stoneRadiusRatio?: number;
    coreRadiusRatio?: number;
    blockHp?: Partial<Record<BlockType, number>>;
}

export const DEFAULT_PLANET_CONFIG: PlanetConfig = {
    radius: 20,
    blockSize: 16,
    gravityStrength: 1000,
    maxGravityDistance: 3,
    outlineDepth: 10,
    padding: 0.5,
    caveScaleFactor: 8.0,
    caveThreshold: 0.76,
    mountainScale: 3.0,
    mountainIntensity: 0.3,
    stoneRadiusRatio: 0.825,
    coreRadiusRatio: 0.15,
    blockHp: {
        [BlockType.CORE]: 100,
        [BlockType.GRASS]: 1,
        [BlockType.DIRT]: 1,
        [BlockType.STONE]: 3,
        [BlockType.COAL]: 2,
        [BlockType.IRON_ORE]: 5,
        [BlockType.GOLD_ORE]: 8,
        [BlockType.DIAMOND]: 15,
        [BlockType.WOOD]: 2,
        [BlockType.CHEST]: 2,
        [BlockType.BED]: 1,
        [BlockType.TORCH]: 1,
        [BlockType.AIR]: 0,
    },
};


==================================================
TYP: KÄLLKOD
FIL: src\game\planet\planetHelpers.ts
==================================================

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


==================================================
TYP: KÄLLKOD
FIL: src\game\planet\planetOptimizer.ts
==================================================

import RAPIER from "@dimforge/rapier2d-compat";
import type { Planet } from "./Planet";

export interface MergedRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Slår ihop en mängd blockkoordinater ("x,y") till färre, större rektanglar (Greedy Meshing).
 */
export function mergeBlockGrid(targetBlockKeys: Set<string>): MergedRect[] {
    if (targetBlockKeys.size === 0) return [];

    const grid = new Map<number, Set<number>>();
    let minX = Infinity,
        maxX = -Infinity;
    let minY = Infinity,
        maxY = -Infinity;

    targetBlockKeys.forEach((key) => {
        const [x, y] = key.split(",").map(Number);
        if (!grid.has(x)) grid.set(x, new Set());
        grid.get(x)!.add(y);

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    });

    const visited = new Set<string>();
    const mergedRects: MergedRect[] = [];

    for (let x = minX; x <= maxX; x++) {
        const ySet = grid.get(x);
        if (!ySet) continue;

        for (let y = minY; y <= maxY; y++) {
            const key = x + "," + y;
            if (!ySet.has(y) || visited.has(key)) continue;

            let height = 1;
            while (ySet.has(y + height) && !visited.has(x + "," + (y + height))) {
                height++;
            }

            let width = 1;
            let canExpand = true;

            while (canExpand) {
                const nextX = x + width;
                const nextYSet = grid.get(nextX);

                if (!nextYSet) break;

                for (let h = 0; h < height; h++) {
                    const checkKey = nextX + "," + (y + h);
                    if (!nextYSet.has(y + h) || visited.has(checkKey)) {
                        canExpand = false;
                        break;
                    }
                }

                if (canExpand) {
                    width++;
                }
            }

            for (let w = 0; w < width; w++) {
                for (let h = 0; h < height; h++) {
                    visited.add(x + w + "," + (y + h));
                }
            }

            mergedRects.push({ x, y, width, height });
        }
    }

    return mergedRects;
}

export function createCombinedBodies(world: RAPIER.World, planet: Planet, targetBlockKeys: Set<string>): RAPIER.RigidBody[] {
    const blockSize = planet.config.blockSize;
    const padding = planet.config.padding ?? 0.5;
    const mergedRects = mergeBlockGrid(targetBlockKeys);
    const bodies: RAPIER.RigidBody[] = [];

    for (const rect of mergedRects) {
        const widthPx = rect.width * blockSize;
        const heightPx = rect.height * blockSize;

        const worldX = rect.x * blockSize + widthPx / 2;
        const worldY = rect.y * blockSize + heightPx / 2;

        const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(worldX, worldY);
        const body = world.createRigidBody(bodyDesc);

        const colliderDesc = RAPIER.ColliderDesc.cuboid((widthPx + padding) / 2, (heightPx + padding) / 2)
            .setFriction(0.6)
            .setRestitution(0.0);
        world.createCollider(colliderDesc, body);

        bodies.push(body);
    }

    return bodies;
}

export class PlanetOptimizer {
    private world: RAPIER.World;
    private planet: Planet;

    constructor(world: RAPIER.World, planet: Planet) {
        this.world = world;
        this.planet = planet;
    }

    public createCombinedBodies(targetBlockKeys: Set<string>): RAPIER.RigidBody[] {
        return createCombinedBodies(this.world, this.planet, targetBlockKeys);
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\planet\planetOutline.ts
==================================================

import { Container, Graphics } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import type { Planet } from "./Planet";
import { BlockType, COLLIDER_GROUPS } from "types";
import { mergeBlockGrid } from "./planetOptimizer";

export class PlanetOutline {
    private world: RAPIER.World;
    private app: any;
    private planet: Planet;
    public outlineGraphics?: Graphics;
    public outlineBodies: RAPIER.RigidBody[] = [];
    public container: Container;

    constructor(app: any, world: RAPIER.World, planet: Planet) {
        this.app = app;
        this.world = world;
        this.planet = planet;
        this.container = new Container();
    }

    public draw(depth?: number): void {
        const targetDepth = depth ?? this.planet.config.outlineDepth ?? 10;

        if (this.outlineGraphics) {
            this.outlineGraphics.clear();
        } else {
            this.outlineGraphics = new Graphics();
            this.outlineGraphics.zIndex = targetDepth;
            this.container.addChild(this.outlineGraphics);
        }
    }

    public drawOutline(depth?: number): void {
        this.draw(depth);

        this.outlineBodies.forEach((body) => {
            this.world.removeRigidBody(body);
        });
        this.outlineBodies = [];

        const mainBlockKeys = new Set<string>();

        this.planet.blocks.forEach((block, key) => {
            if (block.type !== BlockType.AIR) {
                mainBlockKeys.add(key);
            }
        });

        if (mainBlockKeys.size === 0) return;

        const mergedRects = mergeBlockGrid(mainBlockKeys);
        const blockSize = this.planet.config.blockSize;
        const padding = this.planet.config.padding ?? 0.5;

        mergedRects.forEach((rect) => {
            const widthPx = rect.width * blockSize;
            const heightPx = rect.height * blockSize;
            const worldX = rect.x * blockSize + widthPx / 2;
            const worldY = rect.y * blockSize + heightPx / 2;

            const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(worldX, worldY);
            const body = this.world.createRigidBody(bodyDesc);

            const colliderDesc = RAPIER.ColliderDesc.cuboid((widthPx + padding) / 2, (heightPx + padding) / 2)
                .setFriction(0.8)
                .setRestitution(0.0);

            colliderDesc.setCollisionGroups((COLLIDER_GROUPS.CATEGORY_TERRAIN << 16) | 0xffff);
            this.world.createCollider(colliderDesc, body);

            this.outlineBodies.push(body);
        });
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\player\index.ts
==================================================

export * from "./Player";
export * from "./playerConfig";
export * from "./playerHelpers";


==================================================
TYP: KÄLLKOD
FIL: src\game\player\Player.ts
==================================================

import { Assets, Container, Graphics, Sprite, Texture } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";
import type { JoystickState, MobileInputState, PlayerDirection } from "types";
import { COLLIDER_GROUPS } from "types";
import { createPlayerTexture, createRedHatTexture } from "./playerHelpers";

export class Player {
    public container: Container;
    public body: RAPIER.RigidBody;
    public lookDirection: PlayerDirection = "right";

    private world: RAPIER.World;
    private planet: Planet;
    private bodySprite: Sprite;
    private eyesGraphics: Graphics;

    private toolSprite: Sprite;
    private armorSprite: Sprite;
    private helmetSprite: Sprite;
    private weaponSprite: Sprite;

    private moveSpeed: number = 100;
    private jumpSpeed: number = 200;
    private gravityStrength: number = 1000;
    private direction: PlayerDirection = "right";

    private jumpKeyReleased: boolean = true; // Förhindrar dubbelhopp genom att kräva att man släpper tangenten

    constructor(app: any, world: RAPIER.World, planet: Planet, startX: number, startY: number) {
        this.world = world;
        this.planet = planet;

        this.container = new Container();

        const playerTexture = createPlayerTexture(app, 0x9ce811);
        this.bodySprite = new Sprite(playerTexture);
        this.bodySprite.anchor.set(0.5);
        this.container.addChild(this.bodySprite);

        this.toolSprite = new Sprite();
        this.toolSprite.anchor.set(0.5);
        this.container.addChild(this.toolSprite);

        this.armorSprite = new Sprite();
        this.armorSprite.anchor.set(0.5);
        this.container.addChild(this.armorSprite);

        this.helmetSprite = new Sprite(Texture.WHITE);
        this.helmetSprite.anchor.set(0.5);
        this.container.addChild(this.helmetSprite);

        Assets.load("./src/assets/red_hat.png").then((texture) => {
            texture.source.scaleMode = "nearest";

            this.helmetSprite.texture = texture;
            this.helmetSprite.scale.set(1);
            this.helmetSprite.y = -10.5;
            this.helmetSprite.x = 2;
            this.helmetSprite.zIndex = 1;
        });

        this.eyesGraphics = new Graphics();
        this.container.addChild(this.eyesGraphics);

        this.weaponSprite = new Sprite();
        this.container.addChild(this.weaponSprite);

        const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(startX, startY).setLinearDamping(0.0).lockRotations();
        this.body = this.world.createRigidBody(bodyDesc);

        const colliderDesc = RAPIER.ColliderDesc.capsule(2, 6).setFriction(0.0).setRestitution(0.0);
        colliderDesc.setCollisionGroups(
            (COLLIDER_GROUPS.CATEGORY_PLAYER << 16) | COLLIDER_GROUPS.CATEGORY_SURFACE_OBJECTS | COLLIDER_GROUPS.CATEGORY_TERRAIN,
        );

        this.world.createCollider(colliderDesc, this.body);
    }

    public update(dt: number, keys: Record<string, boolean>, joystickState: JoystickState, mobileInputState: MobileInputState): void {
        const pos = this.body.translation();

        const { dirX, dirY, tangentX, tangentY, rawAngle } = this.applyGravity();

        const isLeft = keys["ArrowLeft"] || Boolean(joystickState?.left);
        const isRight = keys["ArrowRight"] || Boolean(joystickState?.right);
        const isUp = keys["ArrowUp"] || Boolean(joystickState?.up);
        const isDown = keys["ArrowDown"] || Boolean(joystickState?.down);
        const isJump = keys["Space"] || Boolean(mobileInputState?.jump);

        const isHoldingShift = keys["ShiftLeft"];

        const joystickForce = joystickState?.force || 0;
        const joystickAngle = joystickState?.angle || 0;
        const isInnerRing = joystickState?.isInnerRing || false;

        const joystickMoveDir = !isInnerRing && joystickForce > 0 ? Math.cos(joystickAngle) * joystickForce : 0;

        // Bestäm exakt riktning för alla 8 riktningar samt rakt upp/ner
        if (isUp && isLeft) this.direction = "up-left";
        else if (isUp && isRight) this.direction = "up-right";
        else if (isDown && isLeft) this.direction = "down-left";
        else if (isDown && isRight) this.direction = "down-right";
        else if (isUp && !isDown) this.direction = "up";
        else if (isDown && !isUp) this.direction = "down";
        else if (isLeft) this.direction = "left";
        else if (isRight) this.direction = "right";

        const shouldMoveLeft = !isHoldingShift && isLeft && !isInnerRing;
        const shouldMoveRight = !isHoldingShift && isRight && !isInnerRing;

        let moveDir = 0;
        if (shouldMoveLeft) moveDir = joystickForce > 0 ? joystickMoveDir : -1;
        if (shouldMoveRight) moveDir = joystickForce > 0 ? joystickMoveDir : 1;

        const currentVel = this.body.linvel();
        let radialVel = currentVel.x * dirX + currentVel.y * dirY;
        let tangentVel = currentVel.x * tangentX + currentVel.y * tangentY;

        if (moveDir !== 0) {
            const targetSpeed = moveDir * this.moveSpeed;
            tangentVel += (targetSpeed - tangentVel) * 0.2;
        } else {
            tangentVel *= 0.9;
        }

        const isGrounded = radialVel >= -5 && radialVel <= 8;

        if (!isJump) {
            this.jumpKeyReleased = true;
        }

        if (isJump && isGrounded && this.jumpKeyReleased) {
            radialVel = -this.jumpSpeed;
            this.jumpKeyReleased = false;

            const pushOut = -4;
            const currentPos = this.body.translation();
            this.body.setTranslation(
                {
                    x: currentPos.x + dirX * pushOut,
                    y: currentPos.y + dirY * pushOut,
                },
                true,
            );
        }

        this.body.setLinvel(
            {
                x: tangentX * tangentVel + dirX * radialVel,
                y: tangentY * tangentVel + dirY * radialVel,
            },
            true,
        );

        this.container.x = pos.x;
        this.container.y = pos.y;
        this.container.rotation = this.body.rotation();

        this.drawEyes();
        this.updateSprites();
    }

    private applyGravity(): { dirX: number; dirY: number; tangentX: number; tangentY: number; rawAngle: number } {
        const pos = this.body.translation();
        const center = this.planet.center;

        const dx = pos.x - center.x;
        const dy = pos.y - center.y;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        let dirX = 0;
        let dirY = 0;
        let rawAngle = 0;
        let tangentX = 0;
        let tangentY = 0;

        if (absX > absY) {
            dirX = dx > 0 ? -1 : 1;
            dirY = 0;
            rawAngle = dx > 0 ? Math.PI / 2 : -Math.PI / 2;
            tangentX = 0;
            tangentY = dx > 0 ? 1 : -1;
        } else {
            dirX = 0;
            dirY = dy > 0 ? -1 : 1;
            rawAngle = dy > 0 ? Math.PI : 0;
            tangentX = dy > 0 ? -1 : 1;
            tangentY = 0;
        }

        const mass = this.body.mass();
        this.body.resetForces(true);
        this.body.addForce(
            {
                x: dirX * this.gravityStrength * mass,
                y: dirY * this.gravityStrength * mass,
            },
            true,
        );

        this.body.setRotation(rawAngle, true);

        return { dirX, dirY, tangentX, tangentY, rawAngle };
    }

    public getDirection(): PlayerDirection {
        return this.direction;
    }

    private drawEyes(): void {
        this.eyesGraphics.clear();

        let eyeOffsetX = 0;
        let pupilOffsetX = 0;
        let pupilOffsetY = 0;
        if (this.direction.includes("right")) {
            eyeOffsetX = 1;
            pupilOffsetX = 1;
        }
        if (this.direction.includes("left")) {
            eyeOffsetX = -1;
            pupilOffsetX = -2;
        }
        if (this.direction.includes("up")) {
            pupilOffsetY = -1;
        }
        if (this.direction.includes("down")) {
            pupilOffsetY = 1;
        }

        this.eyesGraphics.rect(-4 + eyeOffsetX, -4, 3, 4);
        this.eyesGraphics.rect(1 + eyeOffsetX, -4, 3, 4);
        this.eyesGraphics.fill(0xffffff);

        this.eyesGraphics.rect(-3 + pupilOffsetX, -3 + pupilOffsetY, 2, 2);
        this.eyesGraphics.rect(2 + pupilOffsetX, -3 + pupilOffsetY, 2, 2);
        this.eyesGraphics.fill(0x000000);
    }

    private updateSprites() {
        if (this.direction.includes("left")) {
            this.helmetSprite.scale.x = -1; // Vänd hatten åt vänster
            this.helmetSprite.x = -2; // Justera eventuell offset i sidled
        } else {
            this.helmetSprite.scale.x = 1; // Vänd hatten åt höger
            this.helmetSprite.x = 2;
        }
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\player\playerConfig.ts
==================================================

export interface PlayerSettings {
    gravityStrength: number;
    frictionAir: number;

    density: number;
    friction: number;
    frictionStatic: number;
    restitution: number;
    width: number;
    height: number;
    moveSpeed: number;
    maxVelocity: number;
    jumpForce: number;
    maxJumpBlocks: number;
    groundNormalThreshold: number;
    landingVelocityScale: number;

    // Klättring & Cooldowns
    jumpCooldown: number;
    climbDuration: number;

    // Utseende & Färger
    bodyColor: number;
    hatColor: number;
    hatScale: number;
    eyeScale: number;
}

export const DEFAULT_PLAYER_SETTINGS: PlayerSettings = {
    // Planet & Fysikmiljö
    gravityStrength: 0.001,
    frictionAir: 0.1,

    // Spelarens fysikegenskaper
    density: 0.1,
    friction: 0,
    frictionStatic: 1,
    restitution: 0, // Ingen studs för att förhindra penetration

    // Storlek på spelaren och dess hit-box
    width: 12,
    height: 16,

    // Rörelsevärden
    moveSpeed: 2,
    maxVelocity: 2,
    jumpForce: 0.005,
    maxJumpBlocks: 1.5, // Spelaren hoppar maximalt 1.5 block högt över marken

    // Markkontakt
    groundNormalThreshold: 0.4,

    // Andelen av den nedåtriktade hastigheten som behålls när spelaren landar
    landingVelocityScale: 0.5,

    // Klättring & Cooldowns
    jumpCooldown: 250,
    climbDuration: 180,

    // Utseende & Färger
    bodyColor: 0x00ff00,
    hatColor: 0xff0000,
    hatScale: 0.25,
    eyeScale: 0.25,
};


==================================================
TYP: KÄLLKOD
FIL: src\game\player\playerHelpers.ts
==================================================

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


==================================================
TYP: KÄLLKOD
FIL: src\game\rocket\index.ts
==================================================

export * from "./Rocket";
export * from "./rocketHelpers";


==================================================
TYP: KÄLLKOD
FIL: src\game\rocket\Rocket.ts
==================================================

import { Container, Graphics } from "pixi.js";
import RAPIER, { Vector2, type Vector } from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";
import { Player } from "../player/Player";
import { COLLIDER_GROUPS } from "types";
import { createRocketTexture } from "./rocketHelpers";

export class Rocket {
  public container: Container;
  public flameGraphics: Graphics;
  public body: RAPIER.RigidBody;
  public isBoarded: boolean = false;

  private world: RAPIER.World;
  private planet: Planet;
  private player?: Player;

  private thrustPower: number = 100;

  private interactionKeyCooldown: boolean = false;

  constructor(world: RAPIER.World, planet: Planet, spawnX: number, spawnY: number) {
    this.world = world;
    this.planet = planet;

    this.container = new Container();

    // PixiJS grafik för raketen
    const graphics = createRocketTexture();
    this.container.addChild(graphics);

    this.flameGraphics = new Graphics();
    this.container.addChild(this.flameGraphics);

    // Rapier RigidBody & Collider
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(spawnX, spawnY).setLinearDamping(0.2).setAngularDamping(1.0);

    this.body = this.world.createRigidBody(bodyDesc);

    const width = 128;
    const height = 72;
    const colliderDesc = RAPIER.ColliderDesc.cuboid(width / 2, height / 2)
      .setFriction(0.8)
      .setRestitution(0.0);

    colliderDesc.setCollisionGroups((COLLIDER_GROUPS.CATEGORY_PLAYER << 16) | COLLIDER_GROUPS.CATEGORY_TERRAIN);
    this.world.createCollider(colliderDesc, this.body);
  }

  public setPlayer(player: Player): void {
    this.player = player;
  }

  public update(keys: Record<string, boolean>): void {
    const pos: Vector = this.body.translation();

    // Hantera påstigning / avstigning med "KeyF"
    if (keys["KeyF"] && !this.interactionKeyCooldown && this.player) {
      // --- KONTROLLERA ATT SPELAREN ÄR INOM RAKETENS HITBOX ---
      const playerPos = this.player.body.translation();
      const distance = Math.hypot(playerPos.x - pos.x, playerPos.y - pos.y);

      // 32 pixlar motsvarar ungefär raketens halva bredd/höjd (hitbox-storlek)
      const maxBoardingDistance = 35;

      if (distance <= maxBoardingDistance || this.isBoarded) {
        this.interactionKeyCooldown = true;
        this.isBoarded = !this.isBoarded;

        if (this.isBoarded) {
          this.player.container.visible = false;
          this.player.body.setTranslation(pos, true);
        } else {
          this.player.container.visible = true;
          this.player.body.setTranslation({ x: pos.x, y: pos.y }, true);
        }

        setTimeout(() => {
          this.interactionKeyCooldown = false;
        }, 300);
      }
    }

    // --------------------------------------------------------
    const { dirX, dirY, tangentX, tangentY, rawAngle, isWithinGravity, distToCenter } = this.calculateDirections();
    this.applyGravity(dirX, dirY, rawAngle, pos);

    if (this.isBoarded) {
      this.updateMovingRocket(keys, dirX, dirY, tangentX, tangentY, pos);
    } else {
      //this.updateStaticRocket();
    }

    // Synka PixiJS Container
    this.container.x = pos.x;
    this.container.y = pos.y;
    this.container.rotation = this.body.rotation();
  }

  private calculateDirections(): {
    dirX: number;
    dirY: number;
    tangentX: number;
    tangentY: number;
    rawAngle: number;
    isWithinGravity: boolean;
    distToCenter: number;
  } {
    const pos: Vector = this.body.translation();
    const planetCenter: Vector = this.planet.center;
    const distX: number = planetCenter.x - pos.x;
    const distY: number = planetCenter.y - pos.y;
    const distToCenter: number = Math.hypot(distX, distY);

    const dx: number = pos.x - planetCenter.x;
    const dy: number = pos.y - planetCenter.y;
    const absX: number = Math.abs(dx);
    const absY: number = Math.abs(dy);

    let dirX: number = 0;
    let dirY: number = 0;
    let rawAngle: number = 0;
    let tangentX: number = 0;
    let tangentY: number = 0;

    if (absX > absY) {
      dirX = dx > 0 ? -1 : 1;
      dirY = 0;
      rawAngle = dx > 0 ? Math.PI / 2 : -Math.PI / 2;
      tangentX = 0;
      tangentY = dx > 0 ? 1 : -1;
    } else {
      dirX = 0;
      dirY = dy > 0 ? -1 : 1;
      rawAngle = dy > 0 ? Math.PI : 0;
      tangentX = dy > 0 ? -1 : 1;
      tangentY = 0;
    }

    const isWithinGravity = distToCenter > 0 && distToCenter <= this.planet.config.radius * 2 * this.planet.config.blockSize;

    return { dirX, dirY, tangentX, tangentY, rawAngle, isWithinGravity, distToCenter };
  }

  private applyGravity(dirX: number, dirY: number, rawAngle: number, pos: Vector) {
    const gravity = this.planet.getGravityAt(pos.x, pos.y);

    const mass = this.body.mass();
    this.body.resetForces(true);
    this.body.addForce(
      {
        x: dirX * gravity.force * mass,
        y: dirY * gravity.force * mass,
      },
      true,
    );
    this.body.setRotation(rawAngle, true);
  }

  updateMovingRocket(keys: Record<string, boolean>, dirX: number, dirY: number, tangentX: number, tangentY: number, pos: Vector) {
    // Styr raketen med A/D eller Vänster/Höger pil
    if (keys["KeyA"] || keys["ArrowLeft"]) {
      this.body.setRotation(this.body.rotation() - 0.05, true);
    }
    if (keys["KeyD"] || keys["ArrowRight"]) {
      this.body.setRotation(this.body.rotation() + 0.05, true);
    }

    this.flameGraphics.clear();

    // Gasa med W eller Uppåt-pil
    if (keys["KeyW"] || keys["ArrowUp"]) {
      this.drawFlame();

      const currentVel = this.body.linvel();

      //console.log("currentVel", currentVel);
      let radialVel = currentVel.x * dirX + currentVel.y * dirY;
      let tangentVel = currentVel.x * tangentX + currentVel.y * tangentY;
      radialVel = -this.thrustPower;

      const pushOut = -1;
      const currentPos = this.body.translation();
      this.body.setTranslation(
        {
          x: currentPos.x + dirX * pushOut,
          y: currentPos.y + dirY * pushOut,
        },
        true,
      );

      this.body.setLinvel(
        {
          x: tangentX * tangentVel + dirX * radialVel,
          y: tangentY * tangentVel + dirY * radialVel,
        },
        true,
      );
    }

    if (this.player) {
      this.player.body.setTranslation(pos, true);
      this.player.body.setLinvel({ x: 0, y: 0 }, true);
    }
  }

  updateStaticRocket() {
    const pos = this.body.translation();
    const planetCenter = this.planet.center;
    const dx = planetCenter.x - pos.x;
    const dy = planetCenter.y - pos.y;
    const distToCenter = Math.hypot(dx, dy);

    const mass = this.body.mass();
    const gravityMag = 800 * mass;
    this.body.resetForces(true);
    this.body.addForce({ x: (dx / distToCenter) * gravityMag, y: (dy / distToCenter) * gravityMag }, true);
  }

  private drawFlame(): void {
    this.flameGraphics.circle(0, 36, 8);
    this.flameGraphics.fill(0xff6600);
    this.flameGraphics.zIndex = -1;
  }
}


==================================================
TYP: KÄLLKOD
FIL: src\game\rocket\rocketHelpers.ts
==================================================

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


==================================================
TYP: KÄLLKOD
FIL: src\scenes\DebugScene.ts
==================================================

import { Application, Container, Graphics, Text } from "pixi.js";
import { Player } from "player";
import { Planet } from "planet";
import type RAPIER from "@dimforge/rapier2d-compat";
import type { MobileControls, VirtualJoystick } from "ui";

export class DebugScene {
    private app: Application;
    private stageContainer: Container;
    private stage: Container;
    private mockWorld: RAPIER.World;

    private player!: Player;
    private debugGraphics!: Graphics;
    private debugText!: Text;

    private keys: Record<string, boolean> = {};

    public mobileControls!: MobileControls;
    public virtualJoystick!: VirtualJoystick;

    private zoom: number = 12.0; // Startzoom nära spelaren

    constructor(app: Application, world: RAPIER.World, stageContainer: Container) {
        this.app = app;
        this.mockWorld = world;
        this.stageContainer = stageContainer;

        this.stage = new Container();
        this.stageContainer.addChild(this.stage);

        this.setupInput();
    }

    public start(): void {
        this.stage.removeChildren();

        const dummyPlanet = {
            center: { x: 0, y: 0 },
            config: { radius: 20, blockSize: 16 },
        } as unknown as Planet;

        this.mockWorld = {
            createRigidBody: () => ({
                setTranslation: () => {},
                translation: () => ({ x: 0, y: 0 }),
                setRotation: () => {},
                rotation: () => 0,
                linvel: () => ({ x: 0, y: 0 }),
                setLinvel: () => {},
                resetForces: () => {},
                addForce: () => {},
                mass: () => 1,
            }),
            createCollider: () => ({}),
        } as unknown as any;

        // Skapa spelaren i origo (0, 0)
        this.player = new Player(this.app, this.mockWorld, dummyPlanet, 0, 0);
        this.stage.addChild(this.player.container);

        this.mobileControls = document.createElement("controls-ui") as MobileControls;
        if (!document.querySelector("controls-ui")) {
            document.body.prepend(this.mobileControls);
        }

        this.virtualJoystick = document.createElement("virtual-joystick") as VirtualJoystick;
        if (!document.querySelector("virtual-joystick")) {
            document.body.prepend(this.virtualJoystick);
        }

        this.debugGraphics = new Graphics();
        this.stage.addChild(this.debugGraphics);

        this.debugText = new Text({
            text: "DEBUG SCENE - Spelargrafik & Fri navigation (Ingen fysik)\n[Scroll] Zoom",
            style: { fill: 0xffffff, fontSize: 14 },
        });
        this.debugText.x = 20;
        this.debugText.y = 20;
        this.app.stage.addChild(this.debugText);

        // Sätt initial zoom och centrera skärmen direkt här i start
        this.stage.scale.set(this.zoom);
        this.stage.x = this.app.screen.width / 2;
        this.stage.y = this.app.screen.height / 2;

        this.app.ticker.add(this.update, this);
    }

    private setupInput(): void {
        window.addEventListener("wheel", (e: WheelEvent) => {
            const zoomFactor = e.deltaY > 0 ? -0.2 : 0.2;
            this.zoom = Math.max(0.2, Math.min(20.0, this.zoom + zoomFactor));
            this.stage.scale.set(this.zoom);
        });
    }

    private update(ticker: any): void {
        const dt = ticker.deltaTime / 60;
        const time = performance.now();

        this.player.update(dt, this.keys, this.virtualJoystick?.state, this.mobileControls?.state);

        this.drawDebug();
    }

    drawDebug(): void {
        this.debugGraphics.clear();

        this.debugGraphics.strokeStyle = { width: 1, color: 0x444444, alpha: 0.2 };
        const gridSize = 16;
        const offsetX = 8;
        const offsetY = 8;

        for (let x = -2000; x <= 2000; x += gridSize) {
            this.debugGraphics.moveTo(x + offsetX, -2000 + offsetY);
            this.debugGraphics.lineTo(x + offsetX, 2000 + offsetY);
            this.debugGraphics.stroke();
        }
        for (let y = -2000; y <= 2000; y += gridSize) {
            this.debugGraphics.moveTo(-2000 + offsetX, y + offsetY);
            this.debugGraphics.lineTo(2000 + offsetX, y + offsetY);
            this.debugGraphics.stroke();
        }
    }

    public destroy(): void {
        this.app.ticker.remove(this.update, this);
        this.debugGraphics.destroy();
        this.debugText.destroy();
        this.stage.destroy();
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\scenes\HouseScene.ts
==================================================

export class HouseScene {}


==================================================
TYP: KÄLLKOD
FIL: src\scenes\index.ts
==================================================

// src/scenes/index.ts
export * from "./MainScene";
export * from "./DebugScene";
export * from "./HouseScene";
export * from "./SpaceScene"; // <--- Lägg till denna


==================================================
TYP: KÄLLKOD
FIL: src\scenes\MainScene.ts
==================================================

import { Application, Container, Graphics } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Planet, type PlanetConfig, type PlanetType } from "planet";
import { Player } from "player";
import { Rocket } from "rocket";
import { CameraController } from "../game/camera/Camera";
import { Starfield } from "../game/background/Starfield";
import { HouseManager } from "../game/house/HouseManager";
import { MiningManager } from "../game/managers/MiningManager";
import { BuildingManager } from "../game/managers/BuildingManager";
import { CombatManager } from "../game/managers/CombatManager";
import { HighlightManager } from "../game/managers/HighlightManager";
import { PlanetChunkManager } from "../game/planet/PlanetChunkManager";
import { Header, MobileControls, VirtualJoystick } from "ui";
import { Atmosphere } from "../game/background/Atmosphere";
import { SpaceScene } from "./SpaceScene";

export class MainScene {
  private app: Application;
  private world: RAPIER.World;
  private stageContainer: Container;

  private starfield!: Starfield;
  private atmosphere!: Atmosphere;
  private planet!: Planet;
  private planetType!: PlanetType;
  private chunkManager!: PlanetChunkManager;
  private player!: Player;
  private rocket!: Rocket;
  private cameraController!: CameraController;

  private houseManager!: HouseManager;
  private miningManager!: MiningManager;
  private buildingManager!: BuildingManager;
  private combatManager!: CombatManager;
  private highlightManager!: HighlightManager;

  private keys: Record<string, boolean> = {};

  public mobileControls!: MobileControls;
  public virtualJoystick!: VirtualJoystick;
  public header!: Header;

  private debugContainer!: Container; // <-- Byt till en container

  constructor(app: Application, world: RAPIER.World, stageContainer: Container, planetType?: PlanetType) {
    this.app = app;
    this.world = world;
    this.stageContainer = stageContainer;
    this.planetType = planetType ?? ("EARTH" as PlanetType);

    this.setupInput();

    this.debugContainer = new Container();
    this.debugContainer.zIndex = 9999;
    this.stageContainer.addChild(this.debugContainer);
  }

  public start(): void {
    // Generera planet
    this.planet = new Planet(this.app, this.world, { planetType: this.planetType });
    this.planet.generate();

    // Bakgrund
    this.starfield = new Starfield(this.planet);
    this.stageContainer.addChild(this.starfield.container);

    // Skapa och lägg till atmosfären
    this.atmosphere = new Atmosphere(this.planet);
    this.stageContainer.addChild(this.atmosphere.container);

    // Lägg till planetens grafik
    this.stageContainer.addChild(this.planet.container);

    // Spelare & Raket
    // Beräkna spawn-position för spelaren
    const playerSpawn = this.planet.findSpawnPosition(0, 1.5);
    this.player = new Player(this.app, this.world, this.planet, playerSpawn.x, playerSpawn.y);
    this.player.container.zIndex = 2;
    this.stageContainer.addChild(this.player.container);

    const rocketSpawn = this.planet.findSpawnPosition(0.12, 4.5);
    this.rocket = new Rocket(this.world, this.planet, rocketSpawn.x, rocketSpawn.y);
    this.rocket.setPlayer(this.player);
    this.rocket.container.zIndex = 1;
    this.stageContainer.addChild(this.rocket.container);

    this.chunkManager = new PlanetChunkManager(this.world, this.planet, this.player, this.rocket);

    // 4. Kamera
    this.cameraController = new CameraController(this.stageContainer, this.player, this.planet, this.app);
    this.cameraController.setRocketTarget(this.rocket);

    // 5. System & Managers
    this.houseManager = new HouseManager(this.app, this.world, this.planet, this.player);
    this.stageContainer.addChild(this.houseManager.guideGraphics);

    this.highlightManager = new HighlightManager(this.planet, this.player);
    this.stageContainer.addChild(this.highlightManager.graphics);

    this.miningManager = new MiningManager(this.world, this.planet, this.player, this.highlightManager);
    this.buildingManager = new BuildingManager(this.world, this.planet, this.player, this.highlightManager, this.houseManager);
    this.combatManager = new CombatManager(this.world, this.player, this.stageContainer);

    this.mobileControls = document.createElement("controls-ui") as MobileControls;
    if (!document.querySelector("controls-ui")) {
      document.body.prepend(this.mobileControls);
    }

    this.virtualJoystick = document.createElement("virtual-joystick") as VirtualJoystick;
    if (!document.querySelector("virtual-joystick")) {
      document.body.prepend(this.virtualJoystick);
    }

    this.header = document.createElement("header-ui") as Header;
    if (!document.querySelector("header-ui")) {
      document.body.prepend(this.header);
    }

    // Starta Spelloopen (PixiJS Ticker)
    this.app.ticker.add(this.update, this);
  }

  private setupInput(): void {
    window.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
    });
    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });
  }

  private update(ticker: any): void {
    const dt = ticker.deltaTime / 60;
    const time = performance.now();

    // 1. Stega Rapier-fysikvärlden
    this.world.step();

    // 2. Uppdatera bakgrund och visningselement
    this.starfield.update(time);

    // 3. Uppdatera entiteter
    this.player.update(dt, this.keys, this.virtualJoystick?.state, this.mobileControls?.state);
    this.rocket.update(this.keys);

    this.chunkManager.update();

    // 4. Uppdatera spelhanterare
    this.highlightManager.update();
    this.miningManager.update(this.keys, this.mobileControls?.state);
    this.buildingManager.update(this.keys, this.mobileControls?.state);
    this.combatManager.update(this.keys, this.mobileControls?.state);
    this.houseManager.update();

    // 5. Kameraföljning
    this.cameraController.update();

    this.checkSpaceTransition();

    this.drawDebug();
  }

  private checkSpaceTransition(): void {
    if (!this.rocket || !this.rocket.isBoarded) return;

    const rocketPos = this.rocket.container;
    const planetCenter = this.planet.center;
    const dist = Math.hypot(planetCenter.x - rocketPos.x, planetCenter.y - rocketPos.y);

    // Beräkna planetens gräns i pixlar (t.ex. radie * blockSize + 300 pixlar marginal)
    const planetRadiusPx = this.planet.config.radius * this.planet.config.blockSize;
    const spaceTransitionLimit = planetRadiusPx + 400;

    if (dist > spaceTransitionLimit) {
      // Stäng ner MainScene och starta SpaceScene
      this.destroy();
      const spaceScene = new SpaceScene(this.app, this.world, this.stageContainer);
      spaceScene.start();
    }
  }

  public destroy(): void {
    this.app.ticker.remove(this.update, this);
    this.stageContainer.removeChildren();
    this.chunkManager.destroy();
    if (this.mobileControls) this.mobileControls.remove();
    if (this.virtualJoystick) this.virtualJoystick.remove();
    if (this.header) this.header.remove();
  }

  drawDebug(): void {
    this.debugContainer.removeChildren(); // Rensa gamla rutor

    this.world.forEachCollider((collider) => {
      const translation = collider.translation();
      const shape = collider.shape;

      const g = new Graphics();
      g.x = translation.x;
      g.y = translation.y;
      g.rotation = collider.rotation();

      if (shape.type === RAPIER.ShapeType.Cuboid) {
        const extents = (shape as RAPIER.Cuboid).halfExtents;
        g.rect(-extents.x, -extents.y, extents.x * 2, extents.y * 2);
        g.stroke({ width: 1, color: 0xff00ff, alpha: 0.8 }); // Lila för block/terräng
      } else if (shape.type === RAPIER.ShapeType.Capsule) {
        const radius = (shape as RAPIER.Capsule).radius;
        const halfHeight = (shape as RAPIER.Capsule).halfHeight;

        // Rita kapseln (eller en rektangel + cirklar för en finare kapsel-visuell)
        g.rect(-radius, -halfHeight - radius, radius * 2, halfHeight * 2 + radius * 2);
        g.stroke({ width: 1, color: 0x00ffff, alpha: 0.8 }); // Cyan för spelaren
      }

      this.debugContainer.addChild(g);
    });
  }
}


==================================================
TYP: KÄLLKOD
FIL: src\scenes\SpaceScene.ts
==================================================

// src/scenes/SpaceScene.ts
import { Application, Container, Graphics, Text } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Starfield } from "../game/background/Starfield";
import { Planet } from "planet";
import { Rocket } from "rocket";
import { MainScene } from "./MainScene";

interface PlanetNode {
    name: string;
    x: number;
    y: number;
    radius: number;
    color: number;
    type: "EARTH" | "ICE" | "VOLCANO" | "DESERT";
}

export class SpaceScene {
    private app: Application;
    private world: RAPIER.World;
    private stageContainer: Container;
    private stage: Container;

    private starfield!: Starfield;
    private rocket!: Rocket;
    private planetsContainer!: Container;
    private infoText!: Text;

    private planets: PlanetNode[] = [
        { name: "Startplaneten", x: 0, y: -300, radius: 20, color: 0x2e8b57, type: "EARTH" },
        { name: "Isplaneten (Bana 2)", x: 0, y: -1800, radius: 25, color: 0x4682b4, type: "ICE" },
        { name: "Vulkanplaneten (Bana 3)", x: 0, y: -2400, radius: 30, color: 0xff4500, type: "VOLCANO" },
        { name: "Ökenplaneten (Bana 4)", x: 0, y: -3200, radius: 22, color: 0xedc9af, type: "DESERT" },
    ];

    private keys: Record<string, boolean> = {};

    constructor(app: Application, world: RAPIER.World, stageContainer: Container) {
        this.app = app;
        this.world = world;
        this.stageContainer = stageContainer;
        this.stage = new Container();

        window.addEventListener("keydown", (e) => (this.keys[e.code] = true));
        window.addEventListener("keyup", (e) => (this.keys[e.code] = false));
    }

    public start(): void {
        this.stageContainer.removeChildren();
        this.stageContainer.addChild(this.stage);

        const dummyPlanet = {
            center: { x: 0, y: 0 },
            config: { radius: 100, blockSize: 16 },
        } as unknown as Planet;

        this.starfield = new Starfield(dummyPlanet, 800);
        this.stage.addChild(this.starfield.container);

        this.planetsContainer = new Container();
        this.stage.addChild(this.planetsContainer);
        this.drawPlanets();

        // Skapa noll-gravitations-planet för rymden
        const spaceCenterPlanet = new Planet(this.app, this.world, { radius: 20 });
        spaceCenterPlanet.center = { x: 0, y: 0 };
        spaceCenterPlanet.getGravityAt = () => ({ force: 0, isWithinRange: false });

        // Skapa raketen i startplaneten (eller nära origo)
        this.rocket = new Rocket(this.world, spaceCenterPlanet, 0, -500);
        this.rocket.isBoarded = true;
        this.stage.addChild(this.rocket.container);

        // Sätt initial kameracentrering direkt vid start så raketen syns i mitten
        const rocketPos = this.rocket.container;
        this.stage.x = this.app.screen.width / 2 - rocketPos.x;
        this.stage.y = this.app.screen.height / 2 - rocketPos.y;

        this.infoText = new Text({
            text: "RYMDNAVIGERING\nStyr med W/A/S/D eller pilar.\nNärma dig en planet och tryck 'F' för att landa!",
            style: { fill: 0xffffff, fontSize: 16, align: "center" },
        });
        this.infoText.anchor.set(0.5, 0);
        this.infoText.x = this.app.screen.width / 2;
        this.infoText.y = 20;
        this.app.stage.addChild(this.infoText);

        this.app.ticker.add(this.update, this);
    }

    private drawPlanets(): void {
        this.planetsContainer.removeChildren();

        this.planets.forEach((p) => {
            const g = new Graphics();
            const radiusPx = p.radius * 16;

            g.circle(p.x, p.y, radiusPx);
            g.fill(p.color);
            g.stroke({ width: 4, color: 0xffffff, alpha: 0.8 });

            const text = new Text({
                text: p.name,
                style: { fill: 0xffffff, fontSize: 14, fontWeight: "bold" },
            });
            text.anchor.set(0.5);
            text.x = p.x;
            text.y = p.y + radiusPx + 20;

            this.planetsContainer.addChild(g);
            this.planetsContainer.addChild(text);
        });
    }

    private update(ticker: any): void {
        const time = performance.now();

        this.world.step();
        this.starfield.update(time);
        this.rocket.update(this.keys);

        const rocketPos = this.rocket.container;

        // Kontinuerlig kameraföljning av raketen
        this.stage.x = this.app.screen.width / 2 - rocketPos.x;
        this.stage.y = this.app.screen.height / 2 - rocketPos.y;

        this.checkPlanetProximity();
    }

    private checkPlanetProximity(): void {
        const rocketPos = this.rocket.container;

        for (const p of this.planets) {
            const dist = Math.hypot(rocketPos.x - p.x, rocketPos.y - p.y);
            const landingRadius = p.radius * 16 + 60;

            if (dist < landingRadius) {
                if (this.keys["KeyF"]) {
                    this.destroy();

                    const mainScene = new MainScene(this.app, this.world, this.stageContainer, p.type);
                    mainScene.start();
                    break;
                }
            }
        }
    }

    public destroy(): void {
        this.app.ticker.remove(this.update, this);
        if (this.infoText) this.infoText.destroy();
        this.stage.destroy();
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\store\gameStoreHelpers.ts
==================================================

// src/store/gameStoreHelpers.ts

import { ALL_TOOLS } from "./gameStoreTypes";
import type { ResourceType, ToolType, Tool } from "types";
import { RESOURCE_INFO } from "types";

const MAX_STACK_SIZE = 64;

export function findToolByName(toolName: string | null): Tool | null {
    if (!toolName) return null;
    return ALL_TOOLS[toolName as ToolType] || null;
}

export function calculateTotalItems(inventory: Record<string, number>): number {
    let usedSlots = 0;

    Object.keys(inventory).forEach((key) => {
        const count = inventory[key];
        if (count <= 0) return;

        const info = RESOURCE_INFO[key];

        // Verktyg och rustning tar alltid 1 hel slot per föremål
        if (info && (info.isTool || info.isArmor)) {
            usedSlots += count;
        } else {
            // Vanliga resurser stakar sig upp till MAX_STACK_SIZE
            usedSlots += Math.ceil(count / MAX_STACK_SIZE);
        }
    });

    return usedSlots;
}

export function updateHotbarWithResource(
    currentHotbar: (string | null)[],
    resourceType: ResourceType,
): { newHotbar: (string | null)[]; updated: boolean } {
    const newHotbar = [...currentHotbar];

    const info = RESOURCE_INFO[resourceType];
    // Ändra här så att endast isArmor blockeras från hotbaren, inte isTool
    if (info && info.isArmor) {
        return { newHotbar, updated: false };
    }

    if (!newHotbar.includes(resourceType)) {
        const emptyIndex = newHotbar.indexOf(null);
        if (emptyIndex !== -1) {
            newHotbar[emptyIndex] = resourceType;
            return { newHotbar, updated: true };
        }
    }

    return { newHotbar, updated: false };
}


==================================================
TYP: KÄLLKOD
FIL: src\store\gameStoreTypes.ts
==================================================

import type { ToolType, Tool, ArmorItem, EquipmentSlot } from "types";

export const MAX_INVENTORY_SLOTS = 20;

export const ALL_TOOLS: Record<ToolType, Tool> = {
    // Pickaxes
    "Wood Pickaxe": { name: "Wood Pickaxe", power: 0.1, damage: 0.1, price: 0, type: "pickaxe", speed: 200 },
    "Iron Pickaxe": { name: "Iron Pickaxe", power: 1, damage: 1, price: 10, type: "pickaxe", speed: 150 },
    "Diamond Pickaxe": { name: "Diamond Pickaxe", power: 10, damage: 10, price: 100, type: "pickaxe", speed: 50 },

    // Axes
    "Wood Axe": { name: "Wood Axe", power: 0.1, damage: 0.1, price: 0, type: "axe", speed: 200 },
    "Iron Axe": { name: "Iron Axe", power: 1, damage: 1, price: 10, type: "axe", speed: 150 },
    "Diamond Axe": { name: "Diamond Axe", power: 10, damage: 10, price: 100, type: "axe", speed: 50 },

    // Spades
    "Wood Shovel": { name: "Wood Shovel", power: 0.1, damage: 0.1, price: 0, type: "shovel", speed: 200 },
    "Iron Shovel": { name: "Iron Shovel", power: 1, damage: 1, price: 10, type: "shovel", speed: 150 },
    "Diamond Shovel": { name: "Diamond Shovel", power: 10, damage: 10, price: 100, type: "shovel", speed: 50 },

    // Swords
    "Wood Sword": { name: "Wood Sword", power: 0.1, damage: 0.1, price: 0, type: "sword", speed: 200 },
    "Iron Sword": { name: "Iron Sword", power: 1, damage: 1, price: 10, type: "sword", speed: 150 },
    "Diamond Sword": { name: "Diamond Sword", power: 10, damage: 10, price: 100, type: "sword", speed: 50 },
};

// Register över alla rustningsföremål
export const ALL_ARMOR: Record<string, ArmorItem> = {
    "Red Hat": { name: "Red Hat", slot: "helmet", armor: 1, color: 0xff0000, textureKey: "red_hat" },
    "Iron Helmet": { name: "Iron Helmet", slot: "helmet", armor: 5, color: 0xc0c0c0, textureKey: "iron_helmet" },
    "Leather Clothes": { name: "Leather Clothes", slot: "armor", armor: 3, color: 0x8b5a2b },
    "Iron Clothes": { name: "Iron Clothes", slot: "armor", armor: 8, color: 0xc0c0c0 },
    "Speed Boots": { name: "Speed Boots", slot: "boots", armor: 2, speedBonus: 1.5, color: 0x00ffff },
};

export interface GameState {
    hp: number;
    maxHp: number;
    takeDamage: (amount: number) => void;
    heal: (amount: number) => void;

    inventory: Record<string, number>;
    maxSlots: number;
    currentTool: Tool | null;
    equipTool: (toolName: string | null) => void;

    // Nya fält för utrustning
    equipment: Record<EquipmentSlot, ArmorItem | null>;
    equipArmor: (slot: EquipmentSlot, item: ArmorItem | null) => void;

    hotbar: (string | null)[];
    selectedHotbarIndex: number;
    selectedResource: string | null;
    isInventoryOpen: boolean;

    getTotalItems: () => number;
    canPickUp: () => boolean;
    mineBlock: (type: any, amount: number) => boolean;
    craftTool: (type: ToolType) => void;
    setSelectedResource: (resource: string | null) => void;
    setSelectedHotbarIndex: (index: number) => void;
    setHotbarSlot: (index: number, resource: string | null) => void;
    toggleInventory: () => void;
    addResource: (type: any, amount: number) => boolean;
    removeResource: (type: any, amount: number) => void;
    craftItem: (itemKey: string) => boolean;
}


==================================================
TYP: KÄLLKOD
FIL: src\store\index.ts
==================================================

export * from "./useGameStore";
export * from "./gameStoreTypes";
export * from "./gameStoreHelpers";


==================================================
TYP: KÄLLKOD
FIL: src\store\useGameStore.ts
==================================================

import { create } from "zustand";
import { ALL_TOOLS, ALL_ARMOR, MAX_INVENTORY_SLOTS, type GameState } from "./gameStoreTypes";
import { calculateTotalItems, updateHotbarWithResource } from "./gameStoreHelpers";
import { RESOURCE_INFO } from "../types/ResourceTypes";
import type { ToolType } from "../types";

export const useGameStore = create<GameState>((set, get) => ({
    hp: 100,
    maxHp: 100,
    takeDamage: (amount) =>
        set((state) => {
            const totalArmor = Object.values(state.equipment).reduce((acc, item) => acc + (item ? item.armor : 0), 0);
            const damageAfterArmor = Math.max(1, amount - totalArmor);
            return { hp: Math.max(0, state.hp - damageAfterArmor) };
        }),
    heal: (amount) => set((state) => ({ hp: Math.min(state.maxHp, state.hp + amount) })),

    inventory: {
        "Iron Sword": 1,
        "Wood Pickaxe": 1,
        "Iron Pickaxe": 1,
        "Diamond Pickaxe": 1,
        "Wood Axe": 1,
        "Iron Axe": 1,
        "Wood Shovel": 1,

        "Red Hat": 1,
        "Iron Helmet": 1,
        "Leather Clothes": 1,
        "Speed Boots": 1,
        wood: 32,
        dirt: 32,
        stone: 0,
        coal: 0,
        iron_ore: 0,
        iron_ingot: 0,
        copper_ore: 0,
        copper: 0,
        copper_ingot: 0,
        silver_ore: 0,
        silver: 0,
        silver_ingot: 0,
        gold_ore: 0,
        diamond: 0,
        core: 0,
    },
    maxSlots: MAX_INVENTORY_SLOTS,
    currentTool: ALL_TOOLS["Diamond Pickaxe"],

    equipment: {
        helmet: ALL_ARMOR["Red Hat"],
        armor: null,
        boots: null,
    },

    hotbar: ["Diamond Pickaxe", "dirt", null, null],
    selectedHotbarIndex: 0,
    selectedResource: "dirt",
    isInventoryOpen: false,

    equipArmor: (slot, item) =>
        set((state) => ({
            equipment: {
                ...state.equipment,
                [slot]: item,
            },
        })),

    equipTool: (toolName) => {
        if (toolName === null) {
            set({ currentTool: null });
            return;
        }

        const tool = ALL_TOOLS[toolName as ToolType];
        if (tool && (get().inventory[toolName] || 0) > 0) {
            set({ currentTool: tool });
        }
    },

    getTotalItems: () => calculateTotalItems(get().inventory),

    canPickUp: () => get().getTotalItems() < get().maxSlots,

    mineBlock: (type, amount) => {
        const state = get();
        if (state.getTotalItems() + amount > state.maxSlots) return false;

        const newInventory = {
            ...state.inventory,
            [type]: (state.inventory[type] || 0) + amount,
        };

        const { newHotbar, updated } = updateHotbarWithResource(state.hotbar, type);

        set({
            inventory: newInventory,
            hotbar: updated ? newHotbar : state.hotbar,
            selectedResource: newHotbar[state.selectedHotbarIndex],
        });

        return true;
    },

    craftTool: (type) =>
        set((state) => {
            const tool = ALL_TOOLS[type];
            if (!tool) return {};

            const currentAmount = state.inventory[type] || 0;
            const newInventory = {
                ...state.inventory,
                [type]: currentAmount + 1,
            };

            return {
                inventory: newInventory,
                currentTool: tool,
            };
        }),

    craftItem: (itemKey: string) => {
        const info = RESOURCE_INFO[itemKey];
        if (!info || !info.isCraftable || !info.recipe) return false;

        const state = get();
        const inventory = state.inventory;

        const hasIngredients = Object.entries(info.recipe).every(
            ([ingredient, neededAmount]) => (inventory[ingredient] || 0) >= neededAmount,
        );

        if (!hasIngredients || !state.canPickUp()) return false;

        const newInventory = { ...inventory };
        Object.entries(info.recipe).forEach(([ingredient, neededAmount]) => {
            newInventory[ingredient] -= neededAmount;
        });

        newInventory[itemKey] = (newInventory[itemKey] || 0) + 1;

        set({ inventory: newInventory });
        return true;
    },

    setSelectedResource: (resource) => set({ selectedResource: resource }),

    setSelectedHotbarIndex: (index) => {
        const state = get();
        const item = state.hotbar[index];
        const tool = ALL_TOOLS[item as ToolType] || null;

        set({
            selectedHotbarIndex: index,
            selectedResource: tool ? null : item,
            currentTool: tool,
        });
    },

    setHotbarSlot: (index, resource) => {
        const state = get();
        const newHotbar = [...state.hotbar];

        if (resource) {
            const existingIndex = newHotbar.indexOf(resource);
            if (existingIndex !== -1 && existingIndex !== index) {
                newHotbar[existingIndex] = null;
            }
        }

        newHotbar[index] = resource;
        const selectedItem = newHotbar[state.selectedHotbarIndex];
        const tool = ALL_TOOLS[selectedItem as ToolType] || null;

        set({
            hotbar: newHotbar,
            selectedResource: tool ? null : selectedItem,
            currentTool: tool,
        });
    },

    toggleInventory: () => set((state) => ({ isInventoryOpen: !state.isInventoryOpen })),

    addResource: (type, amount) => get().mineBlock(type, amount),

    removeResource: (type, amount) =>
        set((state) => {
            const newAmount = Math.max(0, (state.inventory[type] || 0) - amount);
            const newInventory = { ...state.inventory, [type]: newAmount };
            const newHotbar = [...state.hotbar];

            if (newAmount === 0) {
                const index = newHotbar.indexOf(type);
                if (index !== -1) newHotbar[index] = null;
            }

            return {
                inventory: newInventory,
                hotbar: newHotbar,
                selectedResource: newHotbar[state.selectedHotbarIndex],
            };
        }),
}));


==================================================
TYP: KÄLLKOD
FIL: src\types\BlockTypes.ts
==================================================

import RAPIER from "@dimforge/rapier2d-compat";
import { Container, Graphics, Sprite } from "pixi.js";

export type BlockType = (typeof BlockType)[keyof typeof BlockType];

export type ResourceType =
    | "grass"
    | "dirt"
    | "stone"
    | "coal"
    | "copper_ore"
    | "copper_ingot"
    | "silver_ore"
    | "silver_ingot"
    | "iron_ore"
    | "iron_ingot"
    | "gold_ore"
    | "gold_ingot"
    | "diamond"
    | "wood"
    | "sand"
    | "cactus"
    | "ice"
    | "ice_rock"
    | "lava"
    | "lava_rock"
    | "core"
    | "chest"
    | "bed"
    | "torch";

export const BlockType = {
    AIR: -1,
    GRASS: 0,
    DIRT: 1,
    STONE: 2,
    COAL: 3,
    IRON_ORE: 4,
    COPPER_ORE: 5,
    SILVER_ORE: 6,
    GOLD_ORE: 7,
    DIAMOND: 8,
    WOOD: 9,
    LEAVES: 10,
    SAND: 11,
    SAND_ROCK: 12,
    CACTUS: 13,
    ICE: 14,
    ICE_ROCK: 15,
    LAVA: 16,
    LAVA_ROCK: 17,
    CHEST: 31,
    BED: 32,
    TORCH: 33,
    CORE: 99,
} as const;

export interface BlockData {
    x: number;
    y: number;
    type: BlockType;
    hp: number;
    maxHp: number;
    body: Graphics | Container | Sprite;
    rapierBody?: RAPIER.RigidBody;
    colliderGroup: number;
    friction?: number;
    restitution?: number;
}

export const COLLIDER_GROUPS = {
    CATEGORY_PLAYER: 0x0001,
    CATEGORY_TERRAIN: 0x0002,
    CATEGORY_LOOT: 0x0004,
    CATEGORY_SURFACE_OBJECTS: 0x0008,
    MASK: 0xffff,
    NONE: 0,
} as const;

export const REQUIRED_TOOL_TYPE: Record<BlockType, ("pickaxe" | "axe" | "shovel" | "sword" | "none")[]> = {
    [BlockType.AIR]: ["none"],
    [BlockType.GRASS]: ["none"],
    [BlockType.DIRT]: ["pickaxe", "shovel"],
    [BlockType.LEAVES]: ["axe", "sword"],
    [BlockType.SAND]: ["shovel"],
    [BlockType.WOOD]: ["axe", "sword"],
    [BlockType.STONE]: ["pickaxe"],
    [BlockType.COAL]: ["pickaxe"],
    [BlockType.IRON_ORE]: ["pickaxe"],
    [BlockType.COPPER_ORE]: ["pickaxe"],
    [BlockType.SAND_ROCK]: ["pickaxe"],
    [BlockType.SILVER_ORE]: ["pickaxe"],
    [BlockType.GOLD_ORE]: ["pickaxe"],
    [BlockType.CACTUS]: ["axe", "sword"],
    [BlockType.ICE]: ["axe", "pickaxe"],
    [BlockType.ICE_ROCK]: ["axe", "pickaxe"],
    [BlockType.LAVA]: ["pickaxe"],
    [BlockType.LAVA_ROCK]: ["pickaxe"],
    [BlockType.DIAMOND]: ["pickaxe"],
    [BlockType.CHEST]: ["none"],
    [BlockType.BED]: ["none"],
    [BlockType.TORCH]: ["none"],
    [BlockType.CORE]: ["none"],
};

export const REQUIRED_TOOL_POWER: Record<BlockType, number> = {
    [BlockType.AIR]: 0,
    [BlockType.GRASS]: 0,
    [BlockType.DIRT]: 0,
    [BlockType.LEAVES]: 0,
    [BlockType.SAND]: 0.1,
    [BlockType.SAND_ROCK]: 0.1,
    [BlockType.WOOD]: 0.1,
    [BlockType.STONE]: 0.1,
    [BlockType.COAL]: 0.1,
    [BlockType.IRON_ORE]: 1,
    [BlockType.COPPER_ORE]: 1,
    [BlockType.SILVER_ORE]: 1,
    [BlockType.GOLD_ORE]: 5,
    [BlockType.CACTUS]: 0.1,
    [BlockType.ICE]: 0.1,
    [BlockType.ICE_ROCK]: 0.1,
    [BlockType.LAVA]: 0.1,
    [BlockType.LAVA_ROCK]: 0.1,
    [BlockType.DIAMOND]: 10,
    [BlockType.CHEST]: 0.1,
    [BlockType.BED]: 0,
    [BlockType.TORCH]: 0,
    [BlockType.CORE]: 999,
};


==================================================
TYP: KÄLLKOD
FIL: src\types\ControllerTypes.ts
==================================================

export interface JoystickState {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    jump: boolean;
    primaryAction: boolean;
    secondaryAction: boolean;
    angle: number;
    force: number;
    isInnerRing: boolean; // True om man är innanför inre ringen
}

export interface MobileInputState {
    jump: boolean;
    primaryAction: boolean;
    secondaryAction: boolean;
}

export type PlayerDirection = "right" | "left" | "up" | "down" | "up-right" | "up-left" | "down-right" | "down-left";


==================================================
TYP: KÄLLKOD
FIL: src\types\index.ts
==================================================

export * from "./ToolTypes";
export * from "./ControllerTypes";
export * from "./BlockTypes";
export * from "./ResourceTypes";


==================================================
TYP: KÄLLKOD
FIL: src\types\ResourceTypes.ts
==================================================

export interface ResourceDetails {
    name: string;
    color?: string;
    isTool?: boolean;
    isArmor?: boolean;
    isCraftable?: boolean; // <--- Din nya flagga
    recipe?: Record<string, number>;
    type?: string;
}

export const RESOURCE_COLORS: Record<string, string> = {
    grass: "#228b22",
    dirt: "#8b5a2b",
    stone: "#808080",
    coal: "#000000",
    iron_ore: "#808080",
    iron_ingot: "#c0c0c0",
    copper_ore: "#b87333",
    copper_ingot: "#d97724",
    silver_ore: "#a8a8a8",
    silver_ingot: "#e0e0e0",
    gold_ore: "#ffd700",
    gold_ingot: "#ffae00",
    diamond: "#00ffff",
    wood: "#5c4033",
    sand: "#e0c068",
    core: "#ff4500",
    chest: "#8b4513",
    bed: "#ff0000",
    torch: "#ffcc00",
    ice: "#40c4ff",
    ice_rock: "#a8d8ee",
    lava: "#ff0000",
    lava_rock: "#ff0000",
};

export const RESOURCE_INFO: Record<string, ResourceDetails> = {
    grass: { name: "Gräs", color: RESOURCE_COLORS.grass },
    dirt: { name: "Jord", color: RESOURCE_COLORS.dirt },
    stone: { name: "Sten", color: RESOURCE_COLORS.stone },
    coal: { name: "Kol", color: RESOURCE_COLORS.coal },
    wood: { name: "Trä", color: RESOURCE_COLORS.wood },
    sand: { name: "Sand", color: RESOURCE_COLORS.sand },
    iron_ore: { name: "Järnmalm", color: RESOURCE_COLORS.iron_ore },
    copper_ore: { name: "Kopparmalm", color: RESOURCE_COLORS.copper_ore },
    silver_ore: { name: "Silvermalm", color: RESOURCE_COLORS.silver_ore },
    gold_ore: { name: "Guldmalm", color: RESOURCE_COLORS.gold_ore },
    diamond: { name: "Diamant", color: RESOURCE_COLORS.diamond },

    // Ingots (Smältning / Crafting)
    iron_ingot: {
        name: "Järntacka",
        color: RESOURCE_COLORS.iron_ingot,
        isCraftable: true,
        recipe: { iron_ore: 1, coal: 1 },
    },
    copper_ingot: {
        name: "Koppartacka",
        color: RESOURCE_COLORS.copper_ingot,
        isCraftable: true,
        recipe: { copper_ore: 1, coal: 1 },
    },
    silver_ingot: {
        name: "Silvertacka",
        color: RESOURCE_COLORS.silver_ingot,
        isCraftable: true,
        recipe: { silver_ore: 1, coal: 1 },
    },
    gold_ingot: {
        name: "Guldtacka",
        color: RESOURCE_COLORS.gold_ingot,
        isCraftable: true,
        recipe: { gold_ore: 1, coal: 1 },
    },

    // Byggbara items & Möbler
    chest: {
        name: "Chest",
        color: RESOURCE_COLORS.chest,
        isCraftable: true,
        recipe: { wood: 8 },
    },
    bed: {
        name: "Bed",
        color: RESOURCE_COLORS.bed,
        isCraftable: true,
        recipe: { wood: 5, dirt: 3 },
    },
    torch: {
        name: "Torch",
        color: RESOURCE_COLORS.torch,
        isCraftable: true,
        recipe: { wood: 1, coal: 1 },
    },

    // Swords
    "Iron Sword": { name: "Iron Sword", isTool: true, type: "sword" },
    "Diamond Sword": { name: "Diamond Sword", isTool: true, type: "sword" },

    // Pickaxes
    "Wood Pickaxe": { name: "Wood Pickaxe", isTool: true, type: "pickaxe" },
    "Iron Pickaxe": { name: "Iron Pickaxe", isTool: true, type: "pickaxe" },
    "Diamond Pickaxe": { name: "Diamond Pickaxe", isTool: true, type: "pickaxe" },

    // Axes
    "Wood Axe": { name: "Wood Axe", isTool: true, type: "axe" },
    "Iron Axe": { name: "Iron Axe", isTool: true, type: "axe" },
    "Diamond Axe": { name: "Diamond Axe", isTool: true, type: "axe" },

    // Shovels
    "Wood Shovel": { name: "Wood Shovel", isTool: true, type: "shovel" },
    "Iron Shovel": { name: "Iron Shovel", isTool: true, type: "shovel" },
    "Diamond Shovel": { name: "Diamond Shovel", isTool: true, type: "shovel" },

    // Rustning
    "Red Hat": { name: "Red Hat", isArmor: true, type: "helmet" },
    "Iron Helmet": { name: "Iron Helmet", isArmor: true, type: "helmet" },
    "Leather Clothes": { name: "Leather Clothes", isArmor: true, type: "armor" },
    "Iron Clothes": { name: "Iron Clothes", isArmor: true, type: "armor" },
    "Speed Boots": { name: "Speed Boots", isArmor: true, type: "boots" },
};


==================================================
TYP: KÄLLKOD
FIL: src\types\ToolTypes.ts
==================================================

export type ToolType =
    | "Wood Pickaxe"
    | "Iron Pickaxe"
    | "Diamond Pickaxe"
    | "Wood Axe"
    | "Iron Axe"
    | "Diamond Axe"
    | "Wood Shovel"
    | "Iron Shovel"
    | "Diamond Shovel"
    | "Wood Sword"
    | "Iron Sword"
    | "Diamond Sword";

export interface Tool {
    name: string;
    power: number;
    damage: number;
    price: number;
    type: "pickaxe" | "axe" | "shovel" | "sword";
    speed?: number;
}

export type EquipmentSlot = "helmet" | "armor" | "boots";

export interface ArmorItem {
    name: string;
    slot: EquipmentSlot;
    armor: number;
    speedBonus?: number;
    color: number;
    textureKey?: string;
}


==================================================
TYP: KÄLLKOD
FIL: src\ui\Header.ts
==================================================

import { Hotbar } from "./Hotbar";
import { InventoryModal } from "./InventoryModal";
import { HealthBar } from "./HealthBar";
import { useGameStore } from "store";
import { MenuModal } from "./MenuModal"; // <--- Importera

export class Header extends HTMLElement {
    private hotbar!: Hotbar;
    private healthBar!: HealthBar;
    private inventoryModal!: InventoryModal;
    private invBtn!: HTMLButtonElement;
    private menuBtn!: HTMLButtonElement; // <--- Ny knapp
    private menuModal!: MenuModal; // <--- Referens till nya modalen

    connectedCallback() {
        this.id = "header-container";
        Object.assign(this.style, {
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            zIndex: "1000",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "12px 16px",
            boxSizing: "border-box",
            gap: "8px",
        });

        const topRow = document.createElement("div");
        Object.assign(topRow.style, {
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
        });

        this.hotbar = document.createElement("hotbar-ui") as Hotbar;
        topRow.appendChild(this.hotbar);

        const menuContainer = document.createElement("div");
        menuContainer.id = "inventory-container";
        Object.assign(menuContainer.style, {
            position: "relative",
            right: "0px",
            top: "0px",
            display: "flex",
            gap: "8px",
        });

        this.invBtn = document.createElement("button");
        Object.assign(this.invBtn.style, {
            width: "48px",
            height: "48px",
            //backgroundColor: "rgba(0, 0, 0, 0.7)",
            background: "url('./assets/inventory.png') no-repeat center center/cover",
            border: "2px solid #666",
            borderRadius: "6px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
            cursor: "pointer",
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
        });

        // Sätt initial ikon baserat på store-läget
        //this.invBtn.innerText = useGameStore.getState().isInventoryOpen ? "📂" : "🎒";

        this.invBtn.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            useGameStore.getState().toggleInventory();
        });

        // Uppdatera endast ikonen när isInventoryOpen ändras (ingen border-ändring)
        useGameStore.subscribe((state) => {
            if (state.isInventoryOpen) {
                this.invBtn.innerText = "📂"; // Öppen väska/mapp
            } else {
                this.invBtn.innerText = "🎒"; // Stängd ryggsäck
            }
        });

        // --- NY MENYKNAPP ---
        this.menuBtn = document.createElement("button");
        Object.assign(this.menuBtn.style, {
            width: "48px",
            height: "48px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "2px solid #666",
            borderRadius: "6px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
            cursor: "pointer",
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
        });
        this.menuBtn.innerText = "⚙️"; // Ikon för menyn/inställningar

        this.menuBtn.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            this.menuModal.toggle(); // <--- Öppna/stäng menyn
        });

        // --------------------

        menuContainer.appendChild(this.invBtn);
        menuContainer.appendChild(this.menuBtn);
        topRow.appendChild(menuContainer);
        this.appendChild(topRow);

        const bottomRow = document.createElement("div");
        Object.assign(bottomRow.style, {
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
        });

        this.healthBar = document.createElement("health-bar-ui") as HealthBar;
        bottomRow.appendChild(this.healthBar);
        this.appendChild(bottomRow);

        this.inventoryModal = document.createElement("inventory-modal") as InventoryModal;
        this.inventoryModal.style.pointerEvents = "auto";
        this.appendChild(this.inventoryModal);

        this.menuModal = document.createElement("menu-modal") as MenuModal;
        this.menuModal.style.pointerEvents = "auto";
        this.appendChild(this.menuModal);
    }

    public destroy(): void {
        this.hotbar.destroy();
        this.healthBar.destroy();
        this.remove();
    }
}

if (!customElements.get("header-ui")) {
    customElements.define("header-ui", Header);
}


==================================================
TYP: KÄLLKOD
FIL: src\ui\HealthBar.ts
==================================================

import { useGameStore } from "store";

export class HealthBar extends HTMLElement {
    private barFill!: HTMLDivElement;
    private textElement!: HTMLSpanElement;

    connectedCallback(): void {
        this.setupStyles();
        this.createDomElements();
        this.subscribeToStore();
    }

    private setupStyles(): void {
        this.classList.add("flex", "items-center", "min-w-[340px]", "max-w-[340px]");
        Object.assign(this.style, {
            userSelect: "none",
            pointerEvents: "auto",
        });
    }

    private createDomElements(): void {
        const container = document.createElement("div");
        Object.assign(container.style, {
            width: "100%",
            height: "24px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "2px solid #555555",
            borderRadius: "6px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        });

        // Den röda fyllningen för HP
        this.barFill = document.createElement("div");
        Object.assign(this.barFill.style, {
            position: "absolute",
            left: "0px",
            top: "0px",
            height: "100%",
            width: "100%",
            backgroundColor: "#ff3333",
            transition: "width 0.2s ease-in-out",
        });

        // Textindikator för HP (t.ex. 100 / 100)
        this.textElement = document.createElement("span");
        Object.assign(this.textElement.style, {
            position: "relative",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#ffffff",
            //textShadow: "1px 1px 2px #000000",
        });

        container.appendChild(this.barFill);
        container.appendChild(this.textElement);
        this.appendChild(container);

        this.updateUI();
    }

    private subscribeToStore(): void {
        useGameStore.subscribe(() => {
            this.updateUI();
        });
    }

    private updateUI(): void {
        const state = useGameStore.getState();
        const percentage = Math.max(0, Math.min(100, (state.hp / state.maxHp) * 100));

        this.barFill.style.width = percentage + "%";
        this.textElement.innerText = state.hp + " / " + state.maxHp;
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("health-bar-ui")) {
    customElements.define("health-bar-ui", HealthBar);
}


==================================================
TYP: KÄLLKOD
FIL: src\ui\Hotbar.ts
==================================================

import { useGameStore, ALL_TOOLS } from "store";
import { RESOURCE_COLORS } from "types";
import { getToolIcon } from "./uiHelpers";

export class Hotbar extends HTMLElement {
    private buttons: HTMLButtonElement[] = [];

    connectedCallback(): void {
        this.setupStyles();
        this.createDomElements();
        this.setupEvents();
        this.subscribeToStore();
    }

    private setupStyles(): void {
        this.classList.add("relative", "flex", "gap-2", "w-fit");
        Object.assign(this.style, { userSelect: "none" });
    }

    private createDomElements(): void {
        this.innerHTML = "";
        this.buttons = [];

        for (let i = 0; i < 4; i++) {
            const button = document.createElement("button");

            Object.assign(button.style, {
                width: "48px",
                height: "48px",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                color: "#ffffff",
                outline: "none",
                transition: "all 0.1s ease",
                border: "2px solid #444444",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                pointerEvents: "auto",
            });

            const keyBadge = document.createElement("span");
            keyBadge.innerText = String(i + 1);
            Object.assign(keyBadge.style, {
                position: "absolute",
                top: "3px",
                left: "5px",
                fontSize: "11px",
                fontWeight: "bold",
                color: "#aaaaaa",
            });

            button.appendChild(keyBadge);

            const index = i;
            button.addEventListener("click", (event: MouseEvent) => {
                event.stopPropagation();
                useGameStore.getState().setSelectedHotbarIndex(index);
            });

            this.buttons.push(button);
            this.appendChild(button);
        }

        this.updateUI();
    }

    private setupEvents(): void {
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.code.startsWith("Digit")) {
                const digitIndex = parseInt(event.code.replace("Digit", ""), 10) - 1;
                if (digitIndex >= 0 && digitIndex < 4) {
                    useGameStore.getState().setSelectedHotbarIndex(digitIndex);
                }
            }
        });
    }

    private subscribeToStore(): void {
        useGameStore.subscribe(() => {
            this.updateUI();
        });
    }

    private updateUI(): void {
        const state = useGameStore.getState();

        this.buttons.forEach((button, index) => {
            const resource = state.hotbar[index];
            const isSelected = state.selectedHotbarIndex === index;

            button.style.border = isSelected ? "3px solid #ffffff" : "2px solid #444444";
            button.style.backgroundColor = isSelected ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.6)";

            while (button.children.length > 1) {
                button.removeChild(button.lastChild!);
            }

            if (resource) {
                const tool = ALL_TOOLS[resource as keyof typeof ALL_TOOLS];

                if (tool) {
                    // Om det är ett verktyg/vapen
                    const iconEl = document.createElement("span");
                    iconEl.innerText = getToolIcon(tool);
                    Object.assign(iconEl.style, {
                        fontSize: "16px",
                        marginTop: "4px",
                        pointerEvents: "none",
                    });

                    const nameEl = document.createElement("span");
                    nameEl.innerText = resource.split(" ")[0];
                    Object.assign(nameEl.style, {
                        fontSize: "9px",
                        fontWeight: "bold",
                        color: "#ffd700",
                        pointerEvents: "none",
                    });

                    button.appendChild(iconEl);
                    button.appendChild(nameEl);
                } else {
                    // Om det är ett vanligt block/resurs
                    const colorPreview = document.createElement("div");
                    Object.assign(colorPreview.style, {
                        width: "24px",
                        height: "24px",
                        borderRadius: "4px",
                        border: "1px solid rgba(0,0,0,0.4)",
                        backgroundColor: RESOURCE_COLORS[resource] || "#ffffff",
                    });

                    const countText = document.createElement("span");
                    countText.innerText = String(state.inventory[resource] || 0);
                    Object.assign(countText.style, {
                        position: "absolute",
                        bottom: "3px",
                        right: "5px",
                        fontSize: "12px",
                        fontWeight: "bold",
                    });

                    button.appendChild(colorPreview);
                    button.appendChild(countText);
                }
            }
        });
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("hotbar-ui")) {
    customElements.define("hotbar-ui", Hotbar);
}


==================================================
TYP: KÄLLKOD
FIL: src\ui\index.ts
==================================================

export * from "./Header";
export * from "./MobileControls";
export * from "./VirtualJoystick";
export * from "./InventoryModal";
export * from "./HealthBar";
export * from "./Hotbar";
export * from "./uiHelpers";
export * from "./MenuModal"; // <--- Lägg till denna


==================================================
TYP: KÄLLKOD
FIL: src\ui\InventoryModal.ts
==================================================

// src/ui/InventoryModal.ts

import { useGameStore, ALL_TOOLS, ALL_ARMOR } from "store";
import type { ToolType, EquipmentSlot } from "types";
import { RESOURCE_INFO } from "types";
import { getToolIcon } from "./uiHelpers";

interface DragPayload {
    source: "inventory" | "hotbar" | "equipment";
    resource: string;
    fromSlot?: EquipmentSlot;
    fromIndex?: number;
}

export class InventoryModal extends HTMLElement {
    private container!: HTMLDivElement;
    private draggedPayload: DragPayload | null = null;

    connectedCallback() {
        this.classList.add("fixed", "inset-0", "z-50", "hidden");

        // Stäng om man klickar på backdropen
        this.addEventListener("click", (e: MouseEvent) => {
            if (e.target === this) {
                e.stopPropagation();
                useGameStore.getState().toggleInventory();
            }
        });

        this.container = document.createElement("div");
        Object.assign(this.container.style, {
            position: "fixed",
            top: "104px",
            left: "50%",
            transform: "translate(-50%, 0)",
            backgroundColor: "#222222",
            border: "3px solid #444444",
            borderRadius: "8px",
            padding: "16px",
            color: "#fff",
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.9)",
            pointerEvents: "auto",
            userSelect: "none",
        });

        this.container.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
        });

        this.appendChild(this.container);
        this.subscribeToStore();
        this.updateVisibility();
        this.render();
    }

    private updateVisibility(): void {
        const isInventoryOpen = useGameStore.getState().isInventoryOpen;
        if (isInventoryOpen) {
            this.classList.remove("hidden");
            this.style.display = "block";
            this.style.pointerEvents = "auto";
            this.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        } else {
            this.classList.add("hidden");
            this.style.display = "none";
            this.style.pointerEvents = "none";
            this.style.backgroundColor = "transparent";
        }
    }

    private render() {
        this.updateVisibility();
        if (this.classList.contains("hidden")) return;

        this.container.innerHTML = "";

        this.renderHeader();
        this.renderArmorSection(useGameStore.getState());
        this.renderInventoryGrid(useGameStore.getState());
        this.renderEquipmentSection(useGameStore.getState());
    }

    private renderHeader(): void {
        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";

        const title = document.createElement("h2");
        title.innerText = "Inventory & Equipment";
        title.style.fontWeight = "bold";
        title.style.fontSize = "18px";

        const closeBtn = document.createElement("button");
        closeBtn.innerText = "✕";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.background = "none";
        closeBtn.style.border = "none";
        closeBtn.style.color = "#aaa";
        closeBtn.style.fontSize = "18px";
        closeBtn.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            useGameStore.getState().toggleInventory();
        });

        header.appendChild(title);
        header.appendChild(closeBtn);
        this.container.appendChild(header);
    }

    private renderArmorSection(state: ReturnType<typeof useGameStore.getState>): void {
        const label = document.createElement("p");
        label.innerText = "Utrustning (Rustning):";
        label.style.fontSize = "12px";
        label.style.color = "#aaa";
        this.container.appendChild(label);

        const armorRow = document.createElement("div");
        Object.assign(armorRow.style, {
            width: "fit-content",
            display: "flex",
            backgroundColor: "#111111",
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #333333",
            gap: "8px",
        });

        const slots: { slot: EquipmentSlot; icon: string; name: string }[] = [
            { slot: "helmet", icon: "🪖", name: "Hjälm" },
            { slot: "armor", icon: "👕", name: "Kläder" },
            { slot: "boots", icon: "🥾", name: "Skor" },
        ];

        slots.forEach(({ slot, icon, name }) => {
            const item = state.equipment[slot];
            const slotEl = document.createElement("div");

            Object.assign(slotEl.style, {
                width: "48px",
                height: "48px",
                backgroundColor: "#1a1a1a",
                border: item ? "2px solid #00ffff" : "2px inset #333333",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: item ? "grab" : "default",
                boxSizing: "border-box",
            });

            if (item) {
                slotEl.draggable = true;

                const iconEl = document.createElement("span");
                iconEl.innerText = icon;
                iconEl.style.fontSize = "14px";
                iconEl.style.pointerEvents = "none";

                const nameEl = document.createElement("span");
                nameEl.innerText = item.name.split(" ")[0];
                nameEl.style.fontSize = "9px";
                nameEl.style.fontWeight = "bold";
                nameEl.style.color = "#00ffff";
                nameEl.style.pointerEvents = "none";

                const statEl = document.createElement("span");
                statEl.innerText = item.speedBonus ? "⚡" + item.speedBonus : "🛡️" + item.armor;
                statEl.style.fontSize = "9px";
                statEl.style.color = "#aaa";
                statEl.style.pointerEvents = "none";

                slotEl.appendChild(iconEl);
                slotEl.appendChild(nameEl);
                slotEl.appendChild(statEl);

                this.setupDragStart(slotEl, {
                    source: "equipment",
                    resource: item.name,
                    fromSlot: slot,
                });

                slotEl.addEventListener("click", () => {
                    const store = useGameStore.getState();
                    store.addResource(item.name, 1);
                    store.equipArmor(slot, null);
                });
            } else {
                const placeholder = document.createElement("span");
                placeholder.innerText = icon;
                placeholder.style.fontSize = "18px";
                placeholder.style.opacity = "0.25";
                placeholder.style.pointerEvents = "none";

                const labelEl = document.createElement("span");
                labelEl.innerText = name;
                labelEl.style.fontSize = "9px";
                labelEl.style.color = "#555";
                labelEl.style.pointerEvents = "none";

                slotEl.appendChild(placeholder);
                slotEl.appendChild(labelEl);
            }

            this.setupDropTarget(slotEl, (resource) => {
                if (resource && ALL_ARMOR[resource]) {
                    const armor = ALL_ARMOR[resource];
                    if (armor.slot === slot) {
                        const store = useGameStore.getState();
                        const currentEquipped = store.equipment[slot];

                        store.removeResource(resource, 1);
                        if (currentEquipped) {
                            store.addResource(currentEquipped.name, 1);
                        }
                        store.equipArmor(slot, armor);
                    }
                }
            });

            armorRow.appendChild(slotEl);
        });

        this.container.appendChild(armorRow);
    }

    private renderInventoryGrid(state: ReturnType<typeof useGameStore.getState>): void {
        const activeResources: { res: string; count: number }[] = [];

        Object.keys(state.inventory).forEach((key) => {
            const count = state.inventory[key];
            if (count <= 0 || !RESOURCE_INFO[key]) return;

            const info = RESOURCE_INFO[key];

            // 1. Om detta är ett verktyg och det är utrustat som nuvarande verktyg -> Dölj från inventoryt
            if (info && info.isArmor) {
                for (let i = 0; i < count; i++) {
                    activeResources.push({ res: key, count: 1 });
                }
            }
            // 3. Vanliga byggblock/resurser -> Dölj om resursen ligger i Hotbaren
            else {
                if (state.hotbar.includes(key)) {
                    return; // Lämnar platsen tom i inventory-gridet!
                }
                activeResources.push({ res: key, count });
            }
        });

        const grid = document.createElement("div");
        Object.assign(grid.style, {
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "8px",
            backgroundColor: "#111111",
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #333333",
            width: "fit-content",
        });

        for (let i = 0; i < state.maxSlots; i++) {
            const slotData = activeResources[i];
            const slot = this.createInventorySlot(slotData, state);
            grid.appendChild(slot);
        }

        this.container.appendChild(grid);
    }

    private createInventorySlot(
        slotData: { res: string; count: number } | undefined,
        state: ReturnType<typeof useGameStore.getState>,
    ): HTMLDivElement {
        const slot = document.createElement("div");
        Object.assign(slot.style, {
            width: "48px",
            height: "48px",
            backgroundColor: "#1a1a1a",
            border: "2px inset #333333",
            borderRadius: "6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxSizing: "border-box",
        });

        if (slotData) {
            slot.draggable = true;
            slot.style.cursor = "grab";

            const info = RESOURCE_INFO[slotData.res];

            if (info && info.isTool) {
                const isEquipped = state.currentTool?.name === slotData.res;
                const toolObj = ALL_TOOLS[slotData.res as ToolType];

                if (isEquipped) {
                    slot.style.borderColor = "#ffd700";
                }

                const name = document.createElement("span");
                name.innerText = slotData.res.split(" ")[0];
                name.style.fontSize = "10px";
                name.style.fontWeight = "bold";
                name.style.color = "#ffd700";
                name.style.pointerEvents = "none";

                const icon = document.createElement("span");
                icon.innerText = getToolIcon(toolObj);
                icon.style.fontSize = "14px";
                icon.style.pointerEvents = "none";

                slot.appendChild(icon);
                slot.appendChild(name);
            } else if (info && info.isArmor) {
                const armorObj = ALL_ARMOR[slotData.res];

                const name = document.createElement("span");
                name.innerText = slotData.res.split(" ")[0];
                name.style.fontSize = "10px";
                name.style.fontWeight = "bold";
                name.style.color = "#00ffff";
                name.style.pointerEvents = "none";

                const icon = document.createElement("span");
                icon.innerText = armorObj?.slot === "helmet" ? "🪖" : armorObj?.slot === "armor" ? "👕" : "🥾";
                icon.style.fontSize = "14px";
                icon.style.pointerEvents = "none";

                slot.appendChild(icon);
                slot.appendChild(name);
            } else if (info && info.color) {
                const colorBox = document.createElement("div");
                Object.assign(colorBox.style, {
                    width: "32px",
                    height: "32px",
                    backgroundColor: info.color,
                    borderRadius: "4px",
                    border: "1px solid rgba(0,0,0,0.5)",
                    pointerEvents: "none",
                });

                const countBadge = document.createElement("span");
                countBadge.innerText = String(slotData.count);
                Object.assign(countBadge.style, {
                    position: "absolute",
                    bottom: "2px",
                    right: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    textShadow: "1px 1px 2px #000",
                    pointerEvents: "none",
                });

                slot.appendChild(colorBox);
                slot.appendChild(countBadge);
            }

            this.setupDragStart(slot, {
                source: "inventory",
                resource: slotData.res,
            });

            slot.addEventListener("click", () => {
                const store = useGameStore.getState();

                if (info && info.isArmor) {
                    const armor = ALL_ARMOR[slotData.res];
                    if (armor) {
                        const currentlyEquipped = store.equipment[armor.slot];
                        store.removeResource(slotData.res, 1);
                        if (currentlyEquipped) {
                            store.addResource(currentlyEquipped.name, 1);
                        }
                        store.equipArmor(armor.slot, armor);
                    }
                } else {
                    // Hantera både verktyg och vanliga resurser på samma sätt för hotbar
                    const currentHotbar = store.hotbar;
                    const existingIndex = currentHotbar.indexOf(slotData.res);

                    if (existingIndex !== -1) {
                        store.setSelectedHotbarIndex(existingIndex);
                    } else {
                        const emptyIdx = currentHotbar.indexOf(null);
                        if (emptyIdx !== -1) {
                            store.setHotbarSlot(emptyIdx, slotData.res);
                        }
                    }
                }

                this.render();
            });
        }

        this.setupDropTarget(slot, () => {
            if (!this.draggedPayload) return;

            const store = useGameStore.getState();

            if (this.draggedPayload.source === "equipment" && this.draggedPayload.fromSlot) {
                const currentEquipped = store.equipment[this.draggedPayload.fromSlot];
                if (currentEquipped) {
                    store.addResource(currentEquipped.name, 1);
                    store.equipArmor(this.draggedPayload.fromSlot, null);
                }
            } else if (this.draggedPayload.source === "hotbar" && typeof this.draggedPayload.fromIndex === "number") {
                store.setHotbarSlot(this.draggedPayload.fromIndex, null);
            }
        });

        return slot;
    }

    private renderEquipmentSection(state: ReturnType<typeof useGameStore.getState>): void {
        const barLabel = document.createElement("p");
        barLabel.innerText = "Hotbar:";
        barLabel.style.fontSize = "12px";
        barLabel.style.color = "#aaa";
        this.container.appendChild(barLabel);

        const bottomContainer = document.createElement("div");
        Object.assign(bottomContainer.style, {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#111111",
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #333333",
            justifyContent: "center",
            width: "fit-content",
        });

        // Vi sätter in hotbar-gridet direkt här istället för separat verktygsruta
        bottomContainer.appendChild(this.renderHotbarGrid(state));

        this.container.appendChild(bottomContainer);
    }

    private renderHotbarGrid(state: ReturnType<typeof useGameStore.getState>): HTMLDivElement {
        const hotbarGrid = document.createElement("div");
        Object.assign(hotbarGrid.style, {
            display: "flex",
            gap: "8px",
        });

        state.hotbar.forEach((slotRes, index) => {
            const slot = document.createElement("div");
            Object.assign(slot.style, {
                width: "48px",
                height: "48px",
                border: state.selectedHotbarIndex === index ? "2px solid #ffffff" : "2px inset #333333",
                borderRadius: "6px",
                backgroundColor: state.selectedHotbarIndex === index ? "rgba(255, 255, 255, 0.2)" : "#1a1a1a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: slotRes ? "grab" : "pointer",
                position: "relative",
            });

            if (slotRes) {
                slot.draggable = true;
                const tool = ALL_TOOLS[slotRes as ToolType];
                const info = RESOURCE_INFO[slotRes];

                if (tool) {
                    // Om det är ett verktyg eller vapen i hotbaren
                    const iconEl = document.createElement("span");
                    iconEl.innerText = getToolIcon(tool);
                    Object.assign(iconEl.style, {
                        fontSize: "14px",
                        marginTop: "4px",
                        pointerEvents: "none",
                    });

                    const nameEl = document.createElement("span");
                    nameEl.innerText = slotRes.split(" ")[0];
                    Object.assign(nameEl.style, {
                        fontSize: "9px",
                        fontWeight: "bold",
                        color: "#ffd700",
                        pointerEvents: "none",
                    });

                    slot.appendChild(iconEl);
                    slot.appendChild(nameEl);
                } else if (info && info.color) {
                    // Vanligt block/resurs
                    const colorBox = document.createElement("div");
                    Object.assign(colorBox.style, {
                        width: "28px",
                        height: "28px",
                        backgroundColor: info.color,
                        borderRadius: "4px",
                        pointerEvents: "none",
                    });

                    const countText = document.createElement("span");
                    countText.innerText = String(state.inventory[slotRes] || 0);
                    Object.assign(countText.style, {
                        position: "absolute",
                        bottom: "2px",
                        right: "4px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        pointerEvents: "none",
                    });

                    slot.appendChild(colorBox);
                    slot.appendChild(countText);
                }

                this.setupDragStart(slot, {
                    source: "hotbar",
                    resource: slotRes,
                    fromIndex: index,
                });
            }

            slot.addEventListener("click", () => {
                useGameStore.getState().setHotbarSlot(index, null);
            });

            // Här tillåter vi att BÅDE verktyg och resurser läggs i hotbaren
            this.setupDropTarget(slot, (resource) => {
                if (resource) {
                    useGameStore.getState().setHotbarSlot(index, resource);
                }
            });

            hotbarGrid.appendChild(slot);
        });

        return hotbarGrid;
    }

    private setupDragStart(element: HTMLElement, payload: DragPayload): void {
        element.addEventListener("dragstart", (e: DragEvent) => {
            e.stopPropagation();
            this.draggedPayload = payload;
            if (e.dataTransfer) {
                e.dataTransfer.setData("text/plain", payload.resource);
                e.dataTransfer.effectAllowed = "move";
            }
        });

        element.addEventListener("dragend", (e: DragEvent) => {
            e.stopPropagation();
            this.draggedPayload = null;
        });
    }

    private setupDropTarget(element: HTMLElement, onDrop: (resource: string) => void): void {
        element.addEventListener("dragover", (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = "move";
            }
        });

        element.addEventListener("drop", (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const resource = this.draggedPayload?.resource || e.dataTransfer?.getData("text/plain") || "";
            onDrop(resource);
            this.draggedPayload = null;
        });
    }

    private subscribeToStore() {
        useGameStore.subscribe(() => {
            this.render();
        });
    }
}

if (!customElements.get("inventory-modal")) {
    customElements.define("inventory-modal", InventoryModal);
}


==================================================
TYP: KÄLLKOD
FIL: src\ui\MenuModal.ts
==================================================

export class MenuModal extends HTMLElement {
    private container!: HTMLDivElement;
    private isOpen: boolean = false;

    connectedCallback() {
        this.classList.add("fixed", "inset-0", "z-50", "hidden");

        // Stäng modalen om man klickar på bakgrunden (backdrop)
        this.addEventListener("click", (e: MouseEvent) => {
            if (e.target === this) {
                e.stopPropagation();
                this.toggle();
            }
        });

        this.container = document.createElement("div");
        Object.assign(this.container.style, {
            position: "fixed",
            top: "104px",
            left: "50%",
            transform: "translate(-50%, 0)",
            backgroundColor: "#222222",
            border: "3px solid #444444",
            borderRadius: "8px",
            padding: "16px",
            color: "#fff",
            width: "300px", // Justera bredden efter behov för din meny
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.9)",
            pointerEvents: "auto",
            userSelect: "none",
        });

        this.container.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
        });

        this.appendChild(this.container);
        this.updateVisibility();
        this.render();
    }

    public toggle(): void {
        this.isOpen = !this.isOpen;
        this.render();
    }

    private updateVisibility(): void {
        if (this.isOpen) {
            this.classList.remove("hidden");
            this.style.display = "block";
            this.style.pointerEvents = "auto";
            this.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        } else {
            this.classList.add("hidden");
            this.style.display = "none";
            this.style.pointerEvents = "none";
            this.style.backgroundColor = "transparent";
        }
    }

    private render() {
        this.updateVisibility();
        if (!this.isOpen) return;

        this.container.innerHTML = "";

        // --- Header ---
        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";

        const title = document.createElement("h2");
        title.innerText = "Meny";
        title.style.fontWeight = "bold";
        title.style.fontSize = "18px";

        const closeBtn = document.createElement("button");
        closeBtn.innerText = "✕";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.background = "none";
        closeBtn.style.border = "none";
        closeBtn.style.color = "#aaa";
        closeBtn.style.fontSize = "18px";
        closeBtn.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            this.toggle();
        });

        header.appendChild(title);
        header.appendChild(closeBtn);
        this.container.appendChild(header);

        // --- Innehåll i menyn ---
        const contentBox = document.createElement("div");
        Object.assign(contentBox.style, {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        });

        // Exempel på en knapp i menyn
        const sampleButton = document.createElement("button");
        sampleButton.innerText = "Alternativ 1";
        Object.assign(sampleButton.style, {
            padding: "10px",
            backgroundColor: "#333",
            border: "1px solid #555",
            borderRadius: "4px",
            color: "#fff",
            cursor: "pointer",
        });
        sampleButton.addEventListener("click", () => {
            console.log("Alternativ 1 klickat");
        });

        contentBox.appendChild(sampleButton);
        this.container.appendChild(contentBox);
    }
}

if (!customElements.get("menu-modal")) {
    customElements.define("menu-modal", MenuModal);
}


==================================================
TYP: KÄLLKOD
FIL: src\ui\MobileControls.ts
==================================================

import type { MobileInputState } from "types";

export class MobileControls extends HTMLElement {
    public state: MobileInputState = {
        jump: false,
        primaryAction: false,
        secondaryAction: false,
    };

    constructor() {
        super();
    }

    connectedCallback() {
        this.id = "mobile-controls-container";

        this.setupStyles();
        this.createDomElements();
        this.setupEvents();
    }

    private setupStyles(): void {
        this.classList.add(
            "absolute",
            "bottom-0",
            "w-full",
            "flex",
            "justify-between",
            "items-center",
            "text-4xl",
            "pointer-events-none",
            "z-10",
        );
    }

    private createDomElements(): void {
        const leftContainer = this.createContainer("btn-container-left", 1, 1);
        const rightContainer = this.createContainer("btn-container-right", 2, 2);

        this.appendChild(leftContainer);
        this.appendChild(rightContainer);

        const emptyPlaceholder = this.createButton("empty", "", 0, 0);
        const emptyPlaceholder1 = emptyPlaceholder.cloneNode(true) as HTMLButtonElement;

        const upButton = this.createButton("btn-up", "bi-caret-up", 0, 1);
        const leftButton = this.createButton("btn-left", "bi-caret-left", 1, 0);
        const rightButton = this.createButton("btn-right", "bi-caret-right", 1, 2);
        const downButton = this.createButton("btn-down", "bi-caret-down", 2, 1);

        const secondaryActionButton = this.createButton("btn-secondaryAction", "bi-plus", 3, 0);
        const primaryActionButton = this.createButton("btn-primaryAction", "bi-x", 3, 1);

        const jumpButton = this.createButton("btn-jump", "bi-circle", 4, 1);

        // append buttons to dpad in right position
        const dpadContainerLeft = document.getElementById("dpad-container-btn-container-left") as HTMLDivElement;
        dpadContainerLeft.appendChild(emptyPlaceholder);

        const dpadContainerRight = document.getElementById("dpad-container-btn-container-right") as HTMLDivElement;
        dpadContainerRight.appendChild(secondaryActionButton);
        dpadContainerRight.appendChild(primaryActionButton);
        dpadContainerRight.appendChild(emptyPlaceholder1);
        dpadContainerRight.appendChild(jumpButton);
    }

    private createContainer(id: string, rows: number, cols: number): HTMLDivElement {
        // left and right containers, 1 up/down container, 1 action container
        // 4 or 3 containers for buttons

        const container = document.createElement("div");
        container.id = id;
        container.classList.add(
            "w-full",
            "flex",
            id === "btn-container-left" ? "justify-start" : "justify-end",
            "items-center",
            "text-4xl",
            "p-4",
            "pointer-events-none",
            "z-500",
            "rounded-3xl",
        );

        // create 2 rows 2 cols for dpad
        const dpadContainer = document.createElement("div");
        dpadContainer.id = "dpad-container-" + id;
        dpadContainer.classList.add("w-fit", "h-full", "gap-2");
        dpadContainer.classList.add("grid", `grid-cols-${cols}`, `grid-rows-${rows}`);

        container.appendChild(dpadContainer);

        return container;
    }

    private createButton(id: string, icon: string, row: number, column: number): HTMLButtonElement {
        const button = document.createElement("button");

        if (id === "empty") {
            button.id = id;
            button.classList.add("w-20", "h-20");
            return button;
        }

        button.id = id;
        button.classList.add(
            "mx-auto",
            "w-20",
            "h-20",
            "rounded-full",
            "bg-blue-950",
            "text-white",
            "cursor-pointer",
            "flex",
            "items-center",
            "justify-center",
            "active:scale-90",
            "transition-all",
            "pointer-events-auto",
            "select-none",
        );
        button.innerHTML = `<i class="bi ${icon}"></i>`;
        button.dataset.row = row.toString();
        button.dataset.col = column.toString();

        return button;
    }

    private setupEvents(): void {
        this.bindButton("btn-jump", "jump");
        this.bindButton("btn-primaryAction", "primaryAction");
        this.bindButton("btn-secondaryAction", "secondaryAction");
    }

    private bindButton(id: string, key: keyof MobileInputState): void {
        const btn = document.getElementById(id);
        if (!btn) return;

        // Hantera touch- och mus-events för mobil och desktop-test
        const startPress = (e: Event) => {
            e.preventDefault();
            this.state[key] = true;
        };

        const endPress = (e: Event) => {
            e.preventDefault();
            this.state[key] = false;
        };

        btn.addEventListener("touchstart", startPress, { passive: false });
        btn.addEventListener("touchend", endPress, { passive: false });
        btn.addEventListener("mousedown", startPress);
        btn.addEventListener("mouseup", endPress);
        btn.addEventListener("mouseleave", endPress);
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("controls-ui")) {
    customElements.define("controls-ui", MobileControls);
}


==================================================
TYP: KÄLLKOD
FIL: src\ui\uiHelpers.ts
==================================================

import type { Tool } from "types";

export function getToolIcon(tool?: Tool | null): string {
    if (!tool) return "";
    if (tool.type === "pickaxe") return "⛏️";
    if (tool.type === "axe") return "🪓";
    if (tool.type === "shovel") return "🧹";
    if (tool.type === "sword") return "⚔️️";
    return "";
}

export function renderSlotContent(
    parent: HTMLElement,
    options: {
        itemKey?: string | null;
        color?: string;
        isTool?: boolean;
        toolData?: Tool | null;
        count?: number;
        icon?: string;
    },
): void {
    parent.innerHTML = "";

    if (options.icon) {
        const badge = document.createElement("span");
        badge.innerText = options.icon;
        Object.assign(badge.style, {
            position: "absolute",
            top: "3px",
            left: "5px",
            fontSize: "11px",
            pointerEvents: "none",
        });
        parent.appendChild(badge);
    }

    if (options.isTool && options.itemKey) {
        const name = document.createElement("span");
        name.innerText = options.itemKey.split(" ")[0];
        Object.assign(name.style, {
            fontSize: "10px",
            fontWeight: "bold",
            color: "#ffd700",
            marginTop: options.icon ? "6px" : "0px",
            pointerEvents: "none",
        });

        parent.appendChild(name);

        if (options.toolData) {
            const power = document.createElement("span");
            power.innerText = "⚡" + options.toolData.power;
            Object.assign(power.style, {
                position: "absolute",
                bottom: "3px",
                right: "5px",
                fontSize: "10px",
                fontWeight: "bold",
                color: "#ffffff",
                pointerEvents: "none",
            });
            parent.appendChild(power);
        }
    } else if (options.color) {
        const colorBox = document.createElement("div");
        Object.assign(colorBox.style, {
            width: "28px",
            height: "28px",
            backgroundColor: options.color,
            borderRadius: "4px",
            border: "1px solid rgba(0,0,0,0.5)",
            pointerEvents: "none",
        });

        parent.appendChild(colorBox);

        if (typeof options.count === "number" && options.count > 0) {
            const countText = document.createElement("span");
            countText.innerText = String(options.count);
            Object.assign(countText.style, {
                position: "absolute",
                bottom: "2px",
                right: "4px",
                fontSize: "11px",
                fontWeight: "bold",
                color: "#ffffff",
                textShadow: "1px 1px 2px #000",
                pointerEvents: "none",
            });
            parent.appendChild(countText);
        }
    }
}


==================================================
TYP: KÄLLKOD
FIL: src\ui\VirtualJoystick.ts
==================================================

import type { JoystickState } from "types";

export class VirtualJoystick extends HTMLElement {
    public state: JoystickState = {
        up: false,
        down: false,
        left: false,
        right: false,
        jump: false,
        primaryAction: false,
        secondaryAction: false,
        angle: 0,
        force: 0,
        isInnerRing: false,
    };

    private base!: HTMLDivElement;
    private thumb!: HTMLDivElement;
    private activePointerId: number | null = null;
    private radius: number = 150;

    connectedCallback(): void {
        this.render();
        this.setupEvents();
    }

    private render(): void {
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = `
            :host {
                position: fixed;
                bottom: 24px;
                left: 24px;
                touch-action: none;
                user-select: none;
                z-index: 1000;
            }
            .joystick-base {
                width: ${this.radius}px;
                height: ${this.radius}px;
                background: rgba(0, 0, 0, 0.4);
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .joystick-thumb {
                width: ${this.radius * 0.3}px;
                height: ${this.radius * 0.3}px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                position: absolute;
                pointer-events: none;
                transform: translate(0px, 0px);
            }
                .joystick-inner-ring {
                width: ${this.radius * 0.6}px;
                height: ${this.radius * 0.6}px;
                border: 1px dashed rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                position: absolute;
                pointer-events: none;
            }
        `;

        this.base = document.createElement("div");
        this.base.className = "joystick-base";

        const innerRing = document.createElement("div");
        innerRing.className = "joystick-inner-ring";

        this.thumb = document.createElement("div");
        this.thumb.className = "joystick-thumb";

        this.base.appendChild(innerRing);
        this.base.appendChild(this.thumb);
        shadow.appendChild(style);
        shadow.appendChild(this.base);
    }

    private setupEvents(): void {
        this.base.addEventListener("pointerdown", (e: PointerEvent) => {
            this.activePointerId = e.pointerId;
            this.base.setPointerCapture(e.pointerId);
            this.updatePosition(e);
        });

        this.base.addEventListener("pointermove", (e: PointerEvent) => {
            if (e.pointerId === this.activePointerId) {
                this.updatePosition(e);
            }
        });

        const resetHandler = (e: PointerEvent) => {
            if (e.pointerId === this.activePointerId) {
                this.reset();
            }
        };

        this.base.addEventListener("pointerup", resetHandler);
        this.base.addEventListener("pointercancel", resetHandler);
    }

    private updatePosition(e: PointerEvent): void {
        const rect = this.base.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const clampedDist = Math.min(dist, this.radius);

        const thumbX = Math.cos(angle) * clampedDist;
        const thumbY = Math.sin(angle) * clampedDist;

        this.thumb.style.transform = "translate(" + thumbX + "px, " + thumbY + "px)";

        const force = clampedDist / this.radius;
        const innerRingThreshold = 0.4; // 40% av radien är den inre ringen
        const isInner = force <= innerRingThreshold;

        this.state = {
            left: dx < -this.radius * 0.1,
            right: dx > this.radius * 0.1,
            up: dy < -this.radius * 0.1,
            down: dy > this.radius * 0.1,
            jump: false,
            primaryAction: false,
            secondaryAction: false,
            angle: angle,
            force: isInner ? 0 : force,
            isInnerRing: isInner,
        };
    }

    private reset(): void {
        this.activePointerId = null;
        this.thumb.style.transform = "translate(0px, 0px)";
        this.state = {
            up: false,
            down: false,
            left: false,
            right: false,
            jump: false,
            primaryAction: false,
            secondaryAction: false,
            angle: 0,
            force: 0,
            isInnerRing: false,
        };
    }
}

if (!customElements.get("virtual-joystick")) {
    customElements.define("virtual-joystick", VirtualJoystick);
}
