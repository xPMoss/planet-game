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
    const playerSpawn = this.planet.findSpawnPosition(0);
    this.player = new Player(this.app, this.world, this.planet, playerSpawn.x, playerSpawn.y);
    this.player.container.zIndex = 2;
    this.stageContainer.addChild(this.player.container);

    const rocketSpawn = this.planet.findSpawnPosition(0.12);
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
