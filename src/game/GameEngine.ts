import { Application, Container } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";

export class GameEngine {
  public app!: Application;
  public world!: RAPIER.World;
  public stageContainer!: Container;

  public async init(parentContainer: HTMLElement): Promise<void> {
    // Initiera Rapier WASM
    await RAPIER.init();

    // Skapa Rapier-värld utan global gravitation (0, 0)
    this.world = new RAPIER.World({ x: 0.0, y: 0.0 });

    // Initiera PixiJS v8 Application
    this.app = new Application();
    await this.app.init({
      resizeTo: window,
      backgroundColor: 0x1a1a2e,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    parentContainer.appendChild(this.app.canvas);

    // Huvudbehållare för alla spelobjekt (styrs av kameran)
    this.stageContainer = new Container();
    this.stageContainer.sortableChildren = true;
    this.app.stage.addChild(this.stageContainer);
  }
}

export const gameEngine = new GameEngine();
