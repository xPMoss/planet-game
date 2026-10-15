import { Application, Container, Graphics, Text } from "pixi.js";
import { Player } from "player";
import { Planet } from "planet";
import type RAPIER from "@dimforge/rapier2d-compat";
import type { MobileControls, VirtualJoystick } from "ui";

export class DebugScene {
    private app: Application;
    private stageContainer: Container;
    private stage: Container;
    private mockWorld: RAPIER.World;

    private player!: Player;
    private debugGraphics!: Graphics;
    private debugText!: Text;

    private keys: Record<string, boolean> = {};

    public mobileControls!: MobileControls;
    public virtualJoystick!: VirtualJoystick;

    private zoom: number = 12.0; // Startzoom nära spelaren

    constructor(app: Application, world: RAPIER.World, stageContainer: Container) {
        this.app = app;
        this.mockWorld = world;
        this.stageContainer = stageContainer;

        this.stage = new Container();
        this.stageContainer.addChild(this.stage);

        this.setupInput();
    }

    public start(): void {
        this.stage.removeChildren();

        const dummyPlanet = {
            center: { x: 0, y: 0 },
            config: { radius: 20, blockSize: 16 },
        } as unknown as Planet;

        this.mockWorld = {
            createRigidBody: () => ({
                setTranslation: () => {},
                translation: () => ({ x: 0, y: 0 }),
                setRotation: () => {},
                rotation: () => 0,
                linvel: () => ({ x: 0, y: 0 }),
                setLinvel: () => {},
                resetForces: () => {},
                addForce: () => {},
                mass: () => 1,
            }),
            createCollider: () => ({}),
        } as unknown as any;

        // Skapa spelaren i origo (0, 0)
        this.player = new Player(this.app, this.mockWorld, dummyPlanet, 0, 0);
        this.stage.addChild(this.player.container);

        this.mobileControls = document.createElement("controls-ui") as MobileControls;
        if (!document.querySelector("controls-ui")) {
            document.body.prepend(this.mobileControls);
        }

        this.virtualJoystick = document.createElement("virtual-joystick") as VirtualJoystick;
        if (!document.querySelector("virtual-joystick")) {
            document.body.prepend(this.virtualJoystick);
        }

        this.debugGraphics = new Graphics();
        this.stage.addChild(this.debugGraphics);

        this.debugText = new Text({
            text: "DEBUG SCENE - Spelargrafik & Fri navigation (Ingen fysik)\n[Scroll] Zoom",
            style: { fill: 0xffffff, fontSize: 14 },
        });
        this.debugText.x = 20;
        this.debugText.y = 20;
        this.app.stage.addChild(this.debugText);

        // Sätt initial zoom och centrera skärmen direkt här i start
        this.stage.scale.set(this.zoom);
        this.stage.x = this.app.screen.width / 2;
        this.stage.y = this.app.screen.height / 2;

        this.app.ticker.add(this.update, this);
    }

    private setupInput(): void {
        window.addEventListener("wheel", (e: WheelEvent) => {
            const zoomFactor = e.deltaY > 0 ? -0.2 : 0.2;
            this.zoom = Math.max(0.2, Math.min(20.0, this.zoom + zoomFactor));
            this.stage.scale.set(this.zoom);
        });
    }

    private update(ticker: any): void {
        const dt = ticker.deltaTime / 60;
        const time = performance.now();

        this.player.update(dt, this.keys, this.virtualJoystick?.state, this.mobileControls?.state);

        this.drawDebug();
    }

    drawDebug(): void {
        this.debugGraphics.clear();

        this.debugGraphics.strokeStyle = { width: 1, color: 0x444444, alpha: 0.2 };
        const gridSize = 16;
        const offsetX = 8;
        const offsetY = 8;

        for (let x = -2000; x <= 2000; x += gridSize) {
            this.debugGraphics.moveTo(x + offsetX, -2000 + offsetY);
            this.debugGraphics.lineTo(x + offsetX, 2000 + offsetY);
            this.debugGraphics.stroke();
        }
        for (let y = -2000; y <= 2000; y += gridSize) {
            this.debugGraphics.moveTo(-2000 + offsetX, y + offsetY);
            this.debugGraphics.lineTo(2000 + offsetX, y + offsetY);
            this.debugGraphics.stroke();
        }
    }

    public destroy(): void {
        this.app.ticker.remove(this.update, this);
        this.debugGraphics.destroy();
        this.debugText.destroy();
        this.stage.destroy();
    }
}
