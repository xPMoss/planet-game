import Phaser from "phaser";
import { Planet } from "../game/Planet";
import { Player } from "../game/Player";
import { CameraController } from "../game/Camera";
import { MiningManager } from "../game/MiningManager";
import { BuildingManager } from "../game/BuildingManager";

import { MobileControls } from "../ui/MobileControls";

export class MainScene extends Phaser.Scene {
  private planet!: Planet;
  private player!: Player;
  private cameraController!: CameraController;
  private miningManager!: MiningManager;
  private buildingManager!: BuildingManager;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  mobileControls!: MobileControls;

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

    //
    this.planet.generate();

    this.player = new Player(this, this.planet);
    this.player.spawn();

    this.cameraController = new CameraController(this, this.planet, this.player);
    this.cameraController.follow(this.player.sprite);

    // Initiera Mining Manager
    this.miningManager = new MiningManager(this, this.planet, this.player);
    this.buildingManager = new BuildingManager(this, this.planet, this.player);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    this.mobileControls = new MobileControls();

    console.log("MainScene.create()", this.planet.blocks);
  }

  override update(): void {
    if (!this.player || !this.miningManager || !this.buildingManager) return;

    this.player.update(this.cursors, this.mobileControls.state);
    this.cameraController.update();

    this.miningManager.update(this.mobileControls.state);
    this.buildingManager.update(this.mobileControls.state);
  }
}
