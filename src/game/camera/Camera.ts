import Phaser from "phaser";
import type { Planet } from "../planet/Planet";
import type { Player } from "../player/Player";

// Dubbellkolla pinch logik på mobilen

export class CameraController {
  private scene: Phaser.Scene;
  private camera: Phaser.Cameras.Scene2D.Camera;
  private planet: Planet;
  private player: Player;

  private defaultZoom: number = 2; // 1.8

  private prevPinchDistance: number = 0;
  private isFollowingPlayer: boolean = true;

  constructor(
    scene: Phaser.Scene,
    planet: Planet,
    player: Player,
    camera?: Phaser.Cameras.Scene2D.Camera, // <--- Ta emot kameran som argument
  ) {
    this.scene = scene;
    this.planet = planet;
    this.player = player;
    this.camera = camera || scene.cameras.main;
  }

  public follow(target: Phaser.GameObjects.GameObject): void {
    this.camera.startFollow(target, true, 0.1, 0.1);
    this.camera.setZoom(this.defaultZoom);
    this.camera.setFollowOffset(0, 0);
    this.isFollowingPlayer = true;

    this.setupZoomControls();
  }

  public update(): void {
    this.handlePinchZoom();

    const isZoomedOut = this.camera.zoom < 0.5;

    if (isZoomedOut) {
      if (this.isFollowingPlayer) {
        this.camera.stopFollow();
        this.isFollowingPlayer = false;
      }

      // Panorera mjukt manuellt mot centrum
      this.camera.scrollX = Phaser.Math.Linear(this.camera.scrollX, this.planet.center.x - this.camera.width / 2, 0.05);
      this.camera.scrollY = Phaser.Math.Linear(this.camera.scrollY, this.planet.center.y - this.camera.height / 2, 0.05);
    } else {
      if (!this.isFollowingPlayer && this.player?.sprite) {
        this.camera.startFollow(this.player.sprite, true, 0.1, 0.1);
        this.camera.setFollowOffset(0, 0);
        this.isFollowingPlayer = true;
      }
    }

    // Kamera-rotation
    if (this.player?.sprite) {
      const playerPos = {
        x: this.player.sprite.x,
        y: this.player.sprite.y,
      };
      const planetCenter = this.planet.center;
      const camera = this.camera as any;

      const angleToPlayer = Phaser.Math.Angle.Between(planetCenter.x, planetCenter.y, playerPos.x, playerPos.y);

      const targetRotation = -angleToPlayer - Math.PI / 2;
      const currentRotation = camera.rotation ?? 0;

      const rotationStep = Phaser.Math.Linear(0.015, 0.06, Phaser.Math.Clamp(this.camera.zoom / 1.8, 0, 1));

      const newRotation = Phaser.Math.Angle.RotateTo(currentRotation, targetRotation, rotationStep);

      camera.setRotation(newRotation);
    }
  }

  private setupZoomControls(): void {
    // Zoom via mushjul (Desktop)
    this.scene.input.on("wheel", (_pointer: Phaser.Input.Pointer, _gameObjects: unknown, _deltaX: number, deltaY: number) => {
      const zoomFactor = deltaY > 0 ? -0.15 : 0.15;
      const newZoom = Phaser.Math.Clamp(this.camera.zoom + zoomFactor, 0.3, 4);
      this.camera.setZoom(newZoom);
    });
  }

  private handlePinchZoom(): void {
    const p1 = this.scene.input.pointer1;
    const p2 = this.scene.input.pointer2;

    // Kontrollera att båda pekarna finns och är active/nedtryckta
    if (p1 && p2 && p1.active && p2.active && p1.isDown && p2.isDown) {
      const currentDistance = Phaser.Math.Distance.Between(p1.x, p1.y, p2.x, p2.y);

      if (this.prevPinchDistance > 0) {
        const distanceDelta = currentDistance - this.prevPinchDistance;
        const zoomFactor = distanceDelta * 0.003;
        const newZoom = Phaser.Math.Clamp(this.camera.zoom + zoomFactor, 0.3, 4);

        this.camera.setZoom(newZoom);
      }

      this.prevPinchDistance = currentDistance;
    } else {
      this.prevPinchDistance = 0;
    }
  }
}
