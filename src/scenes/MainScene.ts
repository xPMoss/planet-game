import Phaser from 'phaser';
import { Planet } from '../game/Planet';
import { Player } from '../game/Player';
import { CameraController } from '../game/Camera';
import { MiningManager } from '../game/MiningManager';
import { BuildingManager } from '../game/BuildingManager';

import { MobileControls } from '../ui/MobileControls';

export class MainScene extends Phaser.Scene {
  private planet!: Planet;
  private player!: Player;
  private cameraController!: CameraController;
  miningManager: MiningManager;
  buildingManager: BuildingManager;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  mobileControls: MobileControls;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.planet = new Planet(this, {
      radius: 30,
      blockSize: 16,
      gravityStrength: 0.002,
    });
    this.planet.createTextures();
  }

  create(): void {
    this.planet.generate();

    this.player = new Player(this, this.planet);
    this.player.spawn();

    this.cameraController = new CameraController(this);
    this.cameraController.follow(this.player.sprite);

    // Initiera Mining Manager
    this.miningManager = new MiningManager(this, this.planet, this.player);
    this.buildingManager = new BuildingManager(this, this.planet, this.player);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    this.mobileControls = new MobileControls();

    console.log("MainScene.create()", this.planet.blocks)

  }

  override update(): void {
    if (!this.player || !this.miningManager) return;

    this.player.update(this.cursors, this.mobileControls.state);
    this.miningManager.update();

  }
}