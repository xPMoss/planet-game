# Code Review – planet-game

## Prioriterade förbättringar

### 1. Förbättra `isGrounded`-logiken i `Player.ts`

**Prioritet:** Hög

Nuvarande implementation sätter `isGrounded = true` vid vilken kollision som helst med spelarens kropp.

```ts
if (pair.bodyA === this.sprite.body || pair.bodyB === this.sprite.body) {
    this.isGrounded = true;
}
```

#### Problem

Det innebär att spelaren kan betraktas som stående på marken även efter exempelvis en sidokollision.

Det saknas också en motsvarande hantering av när kontakten upphör.

#### Konsekvenser

- Spelaren kan hoppa efter en sidokollision.
- `isGrounded` kan förbli `true` när spelaren är i luften.
- Hoppmekaniken kan bli inkonsekvent.

#### Förslag

Använd en separat ground-sensor eller kontrollera kollisionsnormalen för att avgöra om kontakten faktiskt är under spelaren.

---

### 2. Ta bort hårdkodade `BlockType`-nummer

**Prioritet:** Medel/Hög

I `MiningManager.ts` används numeriska enum-värden direkt:

```ts
if (type === 0) return 'dirt';
if (type === 1) return 'stone';
if (type === 2) return 'coal';
if (type === 3) return 'iron_ore';
if (type === 4) return 'gold_ore';
if (type === 5) return 'diamond';
```

#### Problem

Koden är beroende av ordningen på `BlockType`.

Om enumen ändras kan fel resurser tilldelas utan att felet är uppenbart.

#### Förslag

Använd enum-namnen:

```ts
switch (type) {
    case BlockType.DIRT:
        return 'dirt';

    case BlockType.STONE:
        return 'stone';

    case BlockType.COAL:
        return 'coal';

    case BlockType.IRON_ORE:
        return 'iron_ore';

    case BlockType.GOLD_ORE:
        return 'gold_ore';

    case BlockType.DIAMOND:
        return 'diamond';

    default:
        return null;
}
```

---

### 3. Optimera Matter.js bodies för planetens block

**Prioritet:** Hög vid större världar

`Planet.generate()` skapar ett separat Matter.js-objekt för varje block.

```ts
const image = this.scene.matter.add.image(...)
```

#### Problem

Det fungerar bra för en liten planet, men antalet fysikobjekt kan snabbt bli stort.

#### Möjliga konsekvenser

- Högre CPU-användning.
- Mer minnesanvändning.
- Fler collision checks.
- Sämre prestanda när planeten växer.

#### Förslag

Inför ett chunk-system.

Exempel:

```text
Planet
 ├── Chunk
 │    ├── blocks
 │    └── collision
 ├── Chunk
 │    ├── blocks
 │    └── collision
 └── ...
```

Skapa bara rendering och collision för chunks som behöver vara aktiva.

På längre sikt kan collision även optimeras så att endast block på planetens yta har fysik.

---

### 4. Lägg till cleanup för input-events

**Prioritet:** Medel

Både `MiningManager` och `BuildingManager` registrerar callbacks direkt på scenens input-system.

Exempel:

```ts
this.scene.input.on('pointerdown', ...)
```

#### Problem

Det finns ingen tydlig cleanup när manager-objekten förstörs.

Om scenen startas om eller managers skapas flera gånger kan samma event registreras flera gånger.

#### Konsekvens

Ett enda klick kan i värsta fall trigga flera callbacks.

#### Förslag

Spara callback-funktionen:

```ts
private handlePointerDown = (pointer: Phaser.Input.Pointer) => {
    // ...
};
```

Registrera:

```ts
this.scene.input.on('pointerdown', this.handlePointerDown);
```

Och ta bort:

```ts
this.scene.input.off('pointerdown', this.handlePointerDown);
```

Detta bör göras i en `destroy()`-metod eller motsvarande scene lifecycle.

---

### 5. Ta bort eller begränsa `console.log()`

**Prioritet:** Låg/Medel

Det finns flera debug-loggar i gameplay-koden.

Exempel:

```ts
console.log("CLICK", block);
```

```ts
console.log("BUILD", pointer);
```

#### Problem

Input-events kan köras mycket ofta och console logging kan påverka prestanda under utveckling.

Det gör också production-konsolen onödigt brusig.

#### Förslag

Ta bort loggarna eller använd en debug flagga:

```ts
const DEBUG = false;

if (DEBUG) {
    console.log("CLICK", block);
}
```

---

### 6. Dela upp ansvar i `Planet`

**Prioritet:** Medel

`Planet.ts` hanterar just nu flera olika ansvarsområden:

- Planet state
- Terrain generation
- Texture creation
- Block rendering
- Block placement
- Block removal
- Block HP
- Texture lookup

Exempel på nuvarande struktur:

```text
Planet
 ├── generate()
 ├── createTextures()
 ├── placeBlock()
 ├── removeBlock()
 ├── getBlockMaxHp()
 └── getTextureKey()
```

#### Problem

Klassen riskerar att växa till en så kallad "God Object".

Det blir svårare att ändra en del av systemet utan att påverka andra delar.

#### Förslag

Dela upp funktionaliteten:

```text
Planet
 └── World/planet state

PlanetGenerator
 └── Terrain generation

BlockRenderer
 └── Phaser sprites/textures

BlockRegistry
 └── Block properties

MiningManager
 └── Mining

BuildingManager
 └── Building
```

---

### 7. Kontrollera hela blockets collision med spelaren vid building

**Prioritet:** Medel

`BuildingManager` kontrollerar idag klickpunkten:

```ts
if (this.isOverlappingPlayer(worldPoint)) return;
```

#### Problem

Det är bara klickpunkten som kontrolleras.

Själva blocket kan vara större än klickpunkten och därför ändå överlappa spelarens hitbox.

#### Exempel

```text
    BLOCK
┌─────────────┐
│             │
│      X      │ ← klickpunkt
│             │
└─────────────┘
      PLAYER
```

Klickpunkten kan ligga utanför spelaren samtidigt som blockets faktiska bounds går in i spelaren.

#### Förslag

Skapa eller beräkna blockets rectangle och kontrollera intersection med spelarens bounds.

Exempel:

```ts
const blockBounds = new Phaser.Geom.Rectangle(
    gridX * blockSize,
    gridY * blockSize,
    blockSize,
    blockSize
);

const playerBounds = this.player.sprite.getBounds();

if (Phaser.Geom.Rectangle.Overlaps(blockBounds, playerBounds)) {
    return;
}
```

---

## Arkitektur

### 8. Separera blockdata från Phaser-objekt

**Prioritet:** Medel

`BlockData` verkar innehålla både speldata och Phaser-body.

Det gör game state hårt kopplat till rendering/fysik.

#### Förslag

Separera exempelvis:

```ts
interface BlockData {
    x: number;
    y: number;
    type: BlockType;
    hp: number;
    maxHp: number;
}
```

från rendering:

```ts
interface BlockView {
    sprite: Phaser.Physics.Matter.Image;
}
```

Det gör det enklare att:

- spara spelet
- ladda spelet
- skapa multiplayer senare
- byta renderer
- testa game logic utan Phaser

---

### 9. Centralisera blockegenskaper

**Prioritet:** Medel

Egenskaper som HP och texture keys ligger nu delvis i `Planet`.

Exempel:

```ts
getBlockMaxHp(type: BlockType)
```

och:

```ts
getTextureKey(blockType: BlockType)
```

#### Förslag

Skapa en central blockdefinition:

```ts
const BLOCK_DEFINITIONS = {
    [BlockType.DIRT]: {
        texture: 'dirt_tile',
        maxHp: 1,
        resource: 'dirt',
    },

    [BlockType.STONE]: {
        texture: 'stone_tile',
        maxHp: 3,
        resource: 'stone',
    },

    // ...
};
```

Då behöver inte flera system känna till samma information separat.

---

## Debugging och kodkvalitet

### 10. Ta bort oanvänd eller gammal kod

Det finns exempel på kod som verkar vara kvar från tidigare implementationer.

Exempel:

```ts
//this.sprite.setY(minY);
```

Sådana kommentarer bör antingen tas bort eller ersättas med en tydlig kommentar om varför koden är avstängd.

---

### 11. Rensa onödiga kommentarer

Det finns många kommentarer som beskriver vad koden redan uppenbart gör.

Exempel:

```ts
// Skapa hattexturen om den inte redan finns
```

Det är inte fel, men när projektet växer blir det bättre att fokusera kommentarer på **varför** något görs snarare än **vad** koden gör.

Bra:

```ts
// Create the hat separately so it can rotate independently from the player body.
```

Mindre användbart:

```ts
// Skapa hatten
this.hat = ...
```

---

## Gameplay

### 12. Gör mining-data mer datadriven

Mining använder hårdkodad logik för resurser och block.

På sikt bör exempelvis följande ligga i blockdefinitionen:

```text
Block
 ├── type
 ├── maxHp
 ├── texture
 ├── resource
 ├── miningTime
 ├── requiredTool
 └── dropAmount
```

Det gör det mycket enklare att lägga till nya resurser.

---

### 13. Gör mining distance konfigurerbar

Just nu är:

```ts
private readonly maxMiningDistance: number = 24;
```

hårdkodat.

Samma gäller:

```ts
private maxBuildDistance: number = 48;
```

#### Förslag

Lägg dessa i `GameConfig` eller player settings.

Exempel:

```ts
export const GAME_CONFIG = {
    miningDistance: 24,
    buildingDistance: 48,
};
```

Då kan gameplay balanseras utan att leta igenom flera filer.

---

## Tekniskt underhåll

### 14. Lägg till automatiska tester

Projektet saknar i nuläget en tydlig teststruktur.

Viktiga delar att testa är exempelvis:

```text
Planet generation
Block placement
Block removal
Mining damage
Resource drops
Inventory changes
Block/resource mapping
Player movement calculations
```

Framför allt `BlockType -> ResourceType` och inventory-logiken lämpar sig mycket bra för unit tests.

---

### 15. Lägg till linting och formatting

Projektet har TypeScript men ingen tydlig lint/format-konfiguration i `package.json`.

Överväg:

```text
ESLint
Prettier
```

med scripts exempelvis:

```json
{
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "preview": "vite preview",
        "lint": "eslint .",
        "format": "prettier --write ."
    }
}
```

---

### 16. Lägg till README

`README.md` är för närvarande mycket kort.

README:n bör åtminstone beskriva:

```text
# Planet Game

## About

## Controls

## Running locally

npm install
npm run dev

## Build

npm run build

## Architecture

## Gameplay systems
```

Det blir särskilt viktigt om projektet ska delas med andra.

---

# Prioriteringsordning

## Hög prioritet

- [x] Fixa `isGrounded`-logiken.
- [ ] Undvik hårdkodade `BlockType`-nummer.
- [ ] Lägg en plan för optimering av Matter bodies/chunks.
- [ ] Säkerställ att input-events städas upp.

## Medelprioritet

- [ ] Kontrollera hela blockets bounds vid building.
- [ ] Dela upp ansvar i `Planet`.
- [ ] Separera game data från Phaser objects.
- [ ] Centralisera blockdefinitioner.
- [ ] Gör mining/building distance konfigurerbara.
- [ ] Lägg till tester.

## Lägre prioritet

- [ ] Ta bort `console.log()`.
- [ ] Rensa gammal/commented-out kod.
- [ ] Förbättra kommentarer.
- [ ] Lägg till ESLint/Prettier.
- [ ] Förbättra README.

# Föreslagen långsiktig struktur

```text
src/
├── game/
│   ├── Planet.ts
│   ├── Player.ts
│   ├── Camera.ts
│   ├── MiningManager.ts
│   ├── BuildingManager.ts
│   │
│   ├── blocks/
│   │   ├── BlockRegistry.ts
│   │   ├── BlockDefinitions.ts
│   │   └── BlockRenderer.ts
│   │
│   └── world/
│       ├── PlanetGenerator.ts
│       ├── Chunk.ts
│       └── ChunkManager.ts
│
├── store/
│   └── useGameStore.ts
│
├── types/
│   └── GameTypes.ts
│
├── scenes/
│   └── MainScene.ts
│
└── ui/
    ├── Hotbar.ts
    └── MobileControls.ts
```

# Sammanfattning

Projektet har en bra grundstruktur för ett tidigt Phaser-spel. De viktigaste sakerna att ta tag i innan mer gameplay läggs till är framför allt **grounded/collision-logiken, blockdata, input lifecycle och skalbarheten i planetens fysik**.

När dessa delar är stabila blir det betydligt enklare att bygga vidare med fler block, verktyg, crafting, större världar och mer avancerad gameplay.