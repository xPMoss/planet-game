import Phaser from "phaser";
import { Planet } from "planet";
import { Player } from "player";
import { CameraController } from "camera";
import { MiningManager, HighlightManager, BuildingManager } from "managers";

import { Header, MobileControls, VirtualJoystick } from "ui";

export class MainScene extends Phaser.Scene {
  private planet!: Planet;
  private player!: Player;
  private cameraController!: CameraController;
  private highlightManager!: HighlightManager;
  private miningManager!: MiningManager;
  private buildingManager!: BuildingManager;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyboard!: Phaser.Input.Keyboard.KeyboardPlugin;

  mobileControls!: MobileControls;
  joystick!: VirtualJoystick;
  header!: Header;

  constructor() {
    super({ key: "MainScene" });
  }

  preload(): void {
    this.planet = new Planet(this, {
      radius: 30,
      blockSize: 16,
      gravityStrength: 0.001,
    });
    this.planet.createTextures();
  }

  create(): void {
    //
    this.createDebug();

    //
    this.planet.generate();

    this.player = new Player(this, this.planet);
    this.player.spawn();

    this.cameraController = new CameraController(this, this.planet, this.player);
    this.cameraController.follow(this.player.sprite);

    // Initiera Highlight Manager först och skicka med den till Mining och Building
    this.highlightManager = new HighlightManager(this, this.planet, this.player);
    this.miningManager = new MiningManager(this, this.planet, this.player, this.highlightManager);
    this.buildingManager = new BuildingManager(this, this.planet, this.player, this.highlightManager);

    // Keyboard input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.keyboard = this.input.keyboard;
    }

    // UI
    this.mobileControls = document.createElement("controls-ui") as MobileControls;
    //document.body.prepend(this.mobileControls);
    this.joystick = new VirtualJoystick(this, 150, 575, 40);

    this.header = document.createElement("header-ui") as Header;
    document.body.prepend(this.header);

    // Event-lyssnare
    this.events.on("planet-cleared", () => {
      alert("Hela planeten är utgrävd förutom kärnan!");

      // Starta nästa bana, ge poäng eller visa en Vinst-UI
    });

    console.log("MainScene.create()", this);
  }

  override update(): void {
    if (!this.player || !this.highlightManager || !this.miningManager || !this.buildingManager) return;

    this.player.update(this.cursors, this.mobileControls.state, this.keyboard);
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

    debugConfig.showBody = false;
    debugConfig.showStaticBody = true;
    debugConfig.showVelocity = true;

    // Sätt tydliga färger och opacitet för spelaren
    debugConfig.fillColor = 0x00ff00; // Grön fyllning
    debugConfig.fillOpacity = 0.5; // Halvgenomskinlig
    debugConfig.lineColor = 0xffff00; // Gul linje runt spelaren
    debugConfig.lineOpacity = 1.0;
  }
}
