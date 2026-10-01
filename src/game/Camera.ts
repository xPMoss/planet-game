import Phaser from "phaser";
import type { Planet } from "./Planet";
import type { Player } from "./Player";

export class CameraController {
  private scene: Phaser.Scene;
  private camera: Phaser.Cameras.Scene2D.Camera;
  private planet: Planet;
  private player: Player;

  constructor(scene: Phaser.Scene, planet: Planet, player: Player) {
    this.scene = scene;
    this.planet = planet;
    this.player = player;
    this.camera = scene.cameras.main;
  }

  public follow(target: Phaser.GameObjects.GameObject): void {
    this.camera.startFollow(target, true, 0.1, 0.1);
    // Ändrat från 2 till 1.2 för att zooma ut och visa mer av världen
    this.camera.setZoom(1.8);

    this.camera.setFollowOffset(0, 0);

    this.setupZoomControls();
  }

  public update(): void {
    // om utzoomad centrera kamera på planet
    if (this.camera.zoom < 0.5) {
      const offset = this.planet.config.radius * 20;
      this.camera.setFollowOffset(0, -offset);
    } else {
      this.camera.setFollowOffset(0, 0);
    }

    const playerPos = {
      x: this.player.sprite.x,
      y: this.player.sprite.y,
    };
    const planetCenter = this.planet.center;
    const camera = this.camera as any;

    // Vinkel från planetens centrum till spelaren
    const angleToPlayer = Phaser.Math.Angle.Between(planetCenter.x, planetCenter.y, playerPos.x, playerPos.y);

    // Ändra förtecknet (minus istället för plus) eller invertera vinkeln
    const targetRotation = -angleToPlayer - Math.PI / 2;

    // Mjuk övergång
    const currentRotation = camera.rotation ?? 0;
    const newRotation = Phaser.Math.Angle.RotateTo(currentRotation, targetRotation, 0.05);

    // Tilldela ny rotation
    camera.setRotation(newRotation);
  }

  private setupZoomControls(): void {
    this.scene.input.on("wheel", (_pointer: Phaser.Input.Pointer, _gameObjects: unknown, _deltaX: number, deltaY: number) => {
      const zoomFactor = deltaY > 0 ? -0.15 : 0.15;

      // Tillåter även att man zoomar ut mer manuellt (från 0.3 till 4)
      const newZoom = Phaser.Math.Clamp(this.camera.zoom + zoomFactor, 0.3, 4);
      this.camera.setZoom(newZoom);
    });
  }
}
