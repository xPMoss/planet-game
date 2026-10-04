import Phaser from "phaser";
import { Planet, DEFAULT_PLANET_CONFIG } from "planet";
import { Player } from "player";
import { Rocket } from "../game/rocket";
import { CameraController } from "camera";
import { MiningManager, HighlightManager, BuildingManager } from "managers";
//import { VirtualJoystick } from "phaser-virtual-joystick";
import { Starfield } from "../game/background/Starfield";

import { Header, MobileControls, VirtualJoystick } from "ui";

export class MainScene extends Phaser.Scene {
  private planet!: Planet;
  private player!: Player;
  private rocket!: Rocket;
  private starfield!: Starfield;
  private cameraController!: CameraController;
  private highlightManager!: HighlightManager;
  private miningManager!: MiningManager;
  private buildingManager!: BuildingManager;
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
    });
    this.planet.createTextures();
  }

  create(): void {
    // Stäng av den globala gravitationen i Matter-världen
    this.matter.world.setGravity(0, 0);

    //
    this.planet.generate();

    this.starfield = new Starfield(this, this.planet, 350);

    this.player = new Player(this, this.planet);
    this.player.spawn();

    this.rocket = new Rocket(this, this.planet);
    this.rocket.spawn();

    this.cameraController = new CameraController(this, this.planet, this.player);
    this.cameraController.follow(this.player.sprite);

    this.rocket.setPlayerAndCamera(this.player, this.cameraController);

    // Initiera Highlight Manager först och skicka med den till Mining och Building
    this.highlightManager = new HighlightManager(this, this.planet, this.player);
    this.miningManager = new MiningManager(this, this.planet, this.player, this.highlightManager);
    this.buildingManager = new BuildingManager(this, this.planet, this.player, this.highlightManager);

    // Keyboard input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    // UI
    this.virtualJoystick = document.createElement("virtual-joystick") as VirtualJoystick;
    document.body.appendChild(this.virtualJoystick);

    this.mobileControls = document.createElement("controls-ui") as MobileControls;
    document.body.prepend(this.mobileControls);
    this.header = document.createElement("header-ui") as Header;
    document.body.prepend(this.header);

    // Event-lyssnare
    this.events.on("planet-cleared", () => {
      alert("Hela planeten är utgrävd förutom kärnan!");

      // Starta nästa bana, ge poäng eller visa en Vinst-UI
    });

    //
    this.createDebug();

    console.log("MainScene.create()", this);
  }

  override update(): void {
    if (!this.player || !this.highlightManager || !this.miningManager || !this.buildingManager) return;

    this.starfield?.update();

    this.player.update(this.cursors, this.mobileControls?.state, this.virtualJoystick.state);
    this.rocket?.update(this.cursors, this.mobileControls?.state, this.virtualJoystick?.state);
    this.cameraController.update();

    // Uppdatera markören samt båda managers med mobiltillståndet
    this.highlightManager.update();
    this.miningManager.update(this.mobileControls.state);
    this.buildingManager.update(this.mobileControls.state);
  }

  private createDebug() {
    this.matter.world.drawDebug = true;
    if (this.matter.world.debugGraphic) {
      this.matter.world.debugGraphic.setDepth(999);
    }

    //this.matter.world.debugGraphic.clear();
    const debugConfig = this.matter.world.debugConfig as unknown as {
      showBody: boolean;
      showStaticBody: boolean;
      showVelocity: boolean;
      fillColor?: number;
      fillOpacity?: number;
      lineColor?: number;
      lineOpacity?: number;
    };

    debugConfig.showBody = true;
    debugConfig.showStaticBody = true;
    debugConfig.showVelocity = true;

    // Sätt tydliga färger och opacitet för spelaren
    debugConfig.fillColor = 0x00ff00; // Grön fyllning
    debugConfig.fillOpacity = 0.5; // Halvgenomskinlig
    debugConfig.lineColor = 0xffff00; // Gul linje runt spelaren
    debugConfig.lineOpacity = 1.0;
  }
}
