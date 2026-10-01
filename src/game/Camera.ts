import Phaser from "phaser";
import type { Planet } from "./Planet";
import type { Player } from "./Player";

export class CameraController {
  private scene: Phaser.Scene;
  private camera: Phaser.Cameras.Scene2D.Camera;
  private planet: Planet;
  private player: Player;

  private prevPinchDistance: number = 0;
  private isFollowingPlayer: boolean = true;

  constructor(scene: Phaser.Scene, planet: Planet, player: Player) {
    this.scene = scene;
    this.planet = planet;
    this.player = player;
    this.camera = scene.cameras.main;
  }

  public follow(target: Phaser.GameObjects.GameObject): void {
    this.camera.startFollow(target, true, 0.1, 0.1);
    this.camera.setZoom(1.8);
    this.camera.setFollowOffset(0, 0);
    this.isFollowingPlayer = true;

    this.setupZoomControls();
  }

  public update(): void {
    this.handlePinchZoom();

    const isZoomedOut = this.camera.zoom < 0.5;

    if (isZoomedOut) {
      if (this.isFollowingPlayer) {
        // Koppla loss kameran mjukt utan att anropa pan() varje frame
        this.camera.stopFollow();
        this.isFollowingPlayer = false;
      }

      // Mjuk förskjutning mot planetens centrum manuellt per frame
      this.camera.scrollX = Phaser.Math.Linear(this.camera.scrollX, this.planet.center.x - this.camera.width / 2, 0.05);
      this.camera.scrollY = Phaser.Math.Linear(this.camera.scrollY, this.planet.center.y - this.camera.height / 2, 0.05);
    } else {
      if (!this.isFollowingPlayer && this.player?.sprite) {
        // Återuppta spelarföljning
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

      // Anpassa rotationssteg mjukt efter zoom
      const rotationStep = Phaser.Math.Linear(0.015, 0.06, Phaser.Math.Clamp(this.camera.zoom / 1.8, 0, 1));

      const newRotation = Phaser.Math.Angle.RotateTo(currentRotation, targetRotation, rotationStep);

      camera.setRotation(newRotation);
    }
  }

  private setupZoomControls(): void {
    // Förhindra att webbläsaren zoomar hela sidan vid touch
    this.scene.game.canvas.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      },
      { passive: false },
    );

    this.scene.game.canvas.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      },
      { passive: false },
    );

    // Zoom via mushjul (Desktop)
    this.scene.input.on("wheel", (_pointer: Phaser.Input.Pointer, _gameObjects: unknown, _deltaX: number, deltaY: number) => {
      const zoomFactor = deltaY > 0 ? -0.15 : 0.15;
      const newZoom = Phaser.Math.Clamp(this.camera.zoom + zoomFactor, 0.3, 4);
      this.camera.setZoom(newZoom);
    });

    this.scene.input.on("pointerup", () => {
      if (!this.scene.input.pointer1.isDown || !this.scene.input.pointer2.isDown) {
        this.prevPinchDistance = 0;
      }
    });
  }

  private handlePinchZoom(): void {
    const pointer1 = this.scene.input.pointer1;
    const pointer2 = this.scene.input.pointer2;

    if (pointer1 && pointer2 && pointer1.isDown && pointer2.isDown) {
      const currentDistance = Phaser.Math.Distance.Between(pointer1.x, pointer1.y, pointer2.x, pointer2.y);

      if (this.prevPinchDistance > 0) {
        const distanceDelta = currentDistance - this.prevPinchDistance;
        const zoomFactor = distanceDelta * 0.003; // Något lägre känslighet för mjukare pinch
        const newZoom = Phaser.Math.Clamp(this.camera.zoom + zoomFactor, 0.3, 4);

        this.camera.setZoom(newZoom);
      }

      this.prevPinchDistance = currentDistance;
    } else {
      this.prevPinchDistance = 0;
    }
  }
}
