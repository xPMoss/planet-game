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