import Phaser from 'phaser';

export class CameraController {
  private scene: Phaser.Scene;
  private camera: Phaser.Cameras.Scene2D.Camera;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.camera = scene.cameras.main;
  }

  public follow(target: Phaser.GameObjects.GameObject): void {
    this.camera.startFollow(target, true, 0.08, 0.08);
    // Ändrat från 2 till 1.2 för att zooma ut och visa mer av världen
    this.camera.setZoom(1.2);
    this.setupZoomControls();
  }

  private setupZoomControls(): void {
    this.scene.input.on(
      'wheel',
      (_pointer: Phaser.Input.Pointer, _gameObjects: unknown, _deltaX: number, deltaY: number) => {
        const zoomFactor = deltaY > 0 ? -0.15 : 0.15;
        // Tillåter även att man zoomar ut mer manuellt (från 0.3 till 4)
        const newZoom = Phaser.Math.Clamp(this.camera.zoom + zoomFactor, 0.3, 4);
        this.camera.setZoom(newZoom);
      }
    );
  }
}