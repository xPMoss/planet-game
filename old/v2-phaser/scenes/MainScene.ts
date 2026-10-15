import Phaser from "phaser";
import { Planet, DEFAULT_PLANET_CONFIG, PlanetChunkManager } from "planet";
import { Player } from "player";
import { Rocket } from "../game/rocket";
import { CameraController } from "camera";
import { MiningManager, HighlightManager, BuildingManager, CombatManager } from "managers";
import { Starfield } from "../game/background/Starfield";
import { HouseManager } from "house";

import { Header, MobileControls, VirtualJoystick } from "ui";
import { useGameStore } from "store";

export class MainScene extends Phaser.Scene {
  private planet!: Planet;
  private player!: Player;
  private rocket!: Rocket;
  private starfield!: Starfield;
  private planetChunkManager!: PlanetChunkManager;
  private cameraController!: CameraController;
  private combatManager!: CombatManager;
  private highlightManager!: HighlightManager;
  private miningManager!: MiningManager;
  private buildingManager!: BuildingManager;
  public houseManager!: HouseManager;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  mobileControls!: MobileControls;
  virtualJoystick!: VirtualJoystick;
  header!: Header;

  constructor() {
    super({ key: "MainScene" });
  }

  preload(): void {
    this.planet = new Planet(this, {
      ...DEFAULT_PLANET_CONFIG,
      planetType: "EARTH",
    });
    this.planet.createTextures();
  }

  create(): void {
    this.matter.world.setGravity(0, 0);

    this.planet.generate();

    this.starfield = new Starfield(this, this.planet, 350);

    this.player = new Player(this, this.planet);
    this.player.spawn();

    this.planetChunkManager = new PlanetChunkManager(this, this.planet, this.player, 6);
    this.planet.setChunkManager(this.planetChunkManager);
    this.planetChunkManager.update();

    this.rocket = new Rocket(this, this.planet);
    this.rocket.spawn();

    this.cameraController = new CameraController(this, this.planet, this.player);
    this.cameraController.follow(this.player.sprite);

    this.rocket.setPlayerAndCamera(this.player, this.cameraController);

    this.houseManager = new HouseManager(this, this.planet, this.player);
    this.combatManager = new CombatManager(this, this.player);

    this.highlightManager = new HighlightManager(this, this.planet, this.player);
    this.miningManager = new MiningManager(this, this.planet, this.player, this.highlightManager);
    this.buildingManager = new BuildingManager(this, this.planet, this.player, this.highlightManager, this.houseManager);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    this.virtualJoystick = document.createElement("virtual-joystick") as VirtualJoystick;
    document.body.appendChild(this.virtualJoystick);

    this.mobileControls = document.createElement("controls-ui") as MobileControls;
    document.body.prepend(this.mobileControls);
    this.header = document.createElement("header-ui") as Header;
    document.body.prepend(this.header);

    this.events.on("planet-cleared", () => {
      alert("Hela planeten är utgrävd förutom kärnan!");
    });

    this.events.on("resume", (_scene: Phaser.Scene, data?: { returnPosition?: { x: number; y: number } }) => {
      if (data && data.returnPosition && this.player?.sprite) {
        const body = this.player.sprite.body as MatterJS.BodyType;
        if (body) {
          this.matter.body.setPosition(body, data.returnPosition);
          this.matter.body.setVelocity(body, { x: 0, y: 0 });
        }
      }
    });

    this.createDebug();
  }

  override update(): void {
    if (!this.player || !this.highlightManager || !this.miningManager || !this.buildingManager) return;

    this.starfield?.update();

    this.player.update(this.cursors, this.mobileControls?.state, this.virtualJoystick.state);
    this.rocket?.update(this.cursors, this.mobileControls?.state, this.virtualJoystick?.state);
    this.cameraController.update();

    if (this.planetChunkManager) {
      this.planetChunkManager.update();
    }

    this.highlightManager.update();

    if (this.mobileControls?.state.primaryAction) {
      const currentTool = useGameStore.getState().currentTool;
      if (currentTool?.type === "sword") {
        this.combatManager.attack();
      } else {
        this.miningManager.mineInFront();
      }
    }

    this.buildingManager.update(this.mobileControls.state);
    this.houseManager.update();
  }

  private createDebug() {
    this.matter.world.drawDebug = true;
    if (this.matter.world.debugGraphic) {
      this.matter.world.debugGraphic.setDepth(999);
    }

    const debugConfig = this.matter.world.debugConfig as unknown as {
      showBody: boolean;
      showStaticBody: boolean;
      showVelocity: boolean;
      fillColor?: number;
      fillOpacity?: number;
      lineColor?: number;
      lineOpacity?: number;
    };

    debugConfig.showBody = false;
    debugConfig.showStaticBody = true;
    debugConfig.showVelocity = false;

    debugConfig.fillColor = 0x00ff00;
    debugConfig.fillOpacity = 0.5;
    debugConfig.lineColor = 0xffff00;
    debugConfig.lineOpacity = 1.0;
  }
}
