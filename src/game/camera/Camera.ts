import { Container } from "pixi.js";
import { Player } from "../player/Player";
import { Planet } from "../planet/Planet";

export class CameraController {
  private stageContainer: Container;
  private player: Player;
  private planet: Planet;
  private app: any;

  private targetZoom: number = 2; // 1.8
  private minZoom: number = 0.3;
  private maxZoom: number = 5.0;
  private currentRotation: number = 0;
  private prevPinchDistance: number = 0;

  private rocketTarget?: any; // Valfri referens till raketen

  public setRocketTarget(rocket: any): void {
    this.rocketTarget = rocket;
  }

  constructor(stageContainer: Container, player: Player, planet: Planet, app: any) {
    this.stageContainer = stageContainer;
    this.player = player;
    this.planet = planet;
    this.app = app;

    this.stageContainer.scale.set(this.targetZoom);
    this.setupZoomControls();
  }

  private setupZoomControls(): void {
    window.addEventListener("wheel", (event: WheelEvent) => {
      const zoomFactor = event.deltaY > 0 ? -0.15 : 0.15;
      this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom + zoomFactor));
    });

    window.addEventListener("touchmove", (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const p1 = event.touches[0];
        const p2 = event.touches[1];
        const currentDistance = Math.hypot(p1.clientX - p2.clientX, p1.clientY - p2.clientY);

        if (this.prevPinchDistance > 0) {
          const distanceDelta = currentDistance - this.prevPinchDistance;
          const zoomFactor = distanceDelta * 0.005;
          this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom + zoomFactor));
        }

        this.prevPinchDistance = currentDistance;
      }
    });

    window.addEventListener("touchend", (event: TouchEvent) => {
      if (event.touches.length < 2) {
        this.prevPinchDistance = 0;
      }
    });
  }

  public update(): void {
    // Bestäm om kameran ska följa spelaren eller raketen
    const targetPos = this.rocketTarget?.isBoarded && this.rocketTarget?.container ? this.rocketTarget.container : this.player.container;

    // --- NY LOGIK FÖR ATT ZOOMA UT UTANFÖR PLANETEN ---
    if (this.rocketTarget?.isBoarded) {
      const planetCenter = this.planet.center;
      const dx = planetCenter.x - targetPos.x;
      const dy = planetCenter.y - targetPos.y;
      const distToCenter = Math.hypot(dx, dy);

      // Beräkna planetens gräns (radie * blockSize)
      const planetRadiusPx = this.planet.config.radius * this.planet.config.blockSize;

      // Om raketen kommit utanför planetens yta/dragningszon, zooma ut kameran
      if (distToCenter > planetRadiusPx + 100) {
        this.targetZoom = 0.7; // Anpassa detta värde för hur mycket det ska zooma ut
      } else {
        this.targetZoom = 1.8; // Standardzoom när man är på/nära planeten
      }
    } else {
      // Återställ standardzoom om spelaren är till fots (eller inte i raketen)
      // Här kan du behålla användarens egen scroll-zoom om du vill,
      // eller låta den styras av standardvärdet.
    }
    // --------------------------------------------------

    const screenWidth = this.app.screen.width;
    const screenHeight = this.app.screen.height;

    // Mjuk in- och utzoomning
    const currentZoom = this.stageContainer.scale.x;
    const newZoom = currentZoom + (this.targetZoom - currentZoom) * 0.1;
    this.stageContainer.scale.set(newZoom);

    // Beräkna rotationen baserat på målets position i förhållande till planeten
    const angleToCenter = Math.atan2(this.planet.center.y - targetPos.y, this.planet.center.x - targetPos.x);
    let targetRotation = -angleToCenter + Math.PI / 2;

    let diff = targetRotation - this.currentRotation;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    this.currentRotation += diff * 0.05;
    this.stageContainer.rotation = this.currentRotation;

    const zoomThreshold = 1.0;
    const lerpFactor = Math.max(0, Math.min(1, (newZoom - this.minZoom) / (zoomThreshold - this.minZoom)));

    const focusX = this.planet.center.x + (targetPos.x - this.planet.center.x) * lerpFactor;
    const focusY = this.planet.center.y + (targetPos.y - this.planet.center.y) * lerpFactor;

    this.stageContainer.x = screenWidth / 2;
    this.stageContainer.y = screenHeight / 2;
    this.stageContainer.pivot.set(focusX, focusY);
  }
}
