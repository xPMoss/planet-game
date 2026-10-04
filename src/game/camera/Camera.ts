import Phaser from "phaser";
import type { Planet } from "../planet/Planet";
import type { Player } from "../player/Player";

// Dubbellkolla pinch logik på mobilen

export class CameraController {
  private scene: Phaser.Scene;
  private camera: Phaser.Cameras.Scene2D.Camera;
  private planet: Planet;
  private player: Player;

  private defaultZoom: number = 1.8; // 1.8

  private prevPinchDistance: number = 0;
  private isFollowingTarget: boolean = true;
  private currentTarget?: Phaser.GameObjects.GameObject;

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
    this.currentTarget = player?.sprite;
    this.setupZoomControls();
    this.camera.setZoom(this.defaultZoom);
  }

  public follow(target: Phaser.GameObjects.GameObject, targetZoom?: number): void {
    this.currentTarget = target;
    this.camera.startFollow(target, true, 0.1, 0.1);

    const zoom = targetZoom ?? this.defaultZoom;
    this.camera.zoomTo(zoom, 1000, "Cubic.easeInOut");

    this.camera.setFollowOffset(0, 0);
    this.isFollowingTarget = true;
  }

  public update(): void {
    this.handlePinchZoom();

    const isZoomedOut = this.camera.zoom < 0.5;
    const targetObj = (this.currentTarget as any) || this.player?.sprite;

    if (isZoomedOut) {
      if (this.isFollowingTarget) {
        this.camera.stopFollow();
        this.isFollowingTarget = false;
      }

      // Panorera mjukt manuellt mot centrum
      this.camera.scrollX = Phaser.Math.Linear(this.camera.scrollX, this.planet.center.x - this.camera.width / 2, 0.05);
      this.camera.scrollY = Phaser.Math.Linear(this.camera.scrollY, this.planet.center.y - this.camera.height / 2, 0.05);
    } else {
      if (!this.isFollowingTarget && targetObj) {
        this.camera.startFollow(targetObj, true, 0.1, 0.1);
        this.camera.setFollowOffset(0, 0);
        this.isFollowingTarget = true;
      }
    }

    // Kamera-rotation baserat på målobjektets position relativt planetcentrum
    if (targetObj) {
      const targetPos = {
        x: targetObj.x,
        y: targetObj.y,
      };
      const planetCenter = this.planet.center;
      const camera = this.camera as any;

      const angleToTarget = Phaser.Math.Angle.Between(planetCenter.x, planetCenter.y, targetPos.x, targetPos.y);

      const targetRotation = -angleToTarget - Math.PI / 2;
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
