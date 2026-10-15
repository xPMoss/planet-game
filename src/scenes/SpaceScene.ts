// src/scenes/SpaceScene.ts
import { Application, Container, Graphics, Text } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Starfield } from "../game/background/Starfield";
import { Planet } from "planet";
import { Rocket } from "rocket";
import { MainScene } from "./MainScene";

interface PlanetNode {
    name: string;
    x: number;
    y: number;
    radius: number;
    color: number;
    type: "EARTH" | "ICE" | "VOLCANO" | "DESERT";
}

export class SpaceScene {
    private app: Application;
    private world: RAPIER.World;
    private stageContainer: Container;
    private stage: Container;

    private starfield!: Starfield;
    private rocket!: Rocket;
    private planetsContainer!: Container;
    private infoText!: Text;

    private planets: PlanetNode[] = [
        { name: "Startplaneten", x: 0, y: -300, radius: 20, color: 0x2e8b57, type: "EARTH" },
        { name: "Isplaneten (Bana 2)", x: 0, y: -1800, radius: 25, color: 0x4682b4, type: "ICE" },
        { name: "Vulkanplaneten (Bana 3)", x: 0, y: -2400, radius: 30, color: 0xff4500, type: "VOLCANO" },
        { name: "Ökenplaneten (Bana 4)", x: 0, y: -3200, radius: 22, color: 0xedc9af, type: "DESERT" },
    ];

    private keys: Record<string, boolean> = {};

    constructor(app: Application, world: RAPIER.World, stageContainer: Container) {
        this.app = app;
        this.world = world;
        this.stageContainer = stageContainer;
        this.stage = new Container();

        window.addEventListener("keydown", (e) => (this.keys[e.code] = true));
        window.addEventListener("keyup", (e) => (this.keys[e.code] = false));
    }

    public start(): void {
        this.stageContainer.removeChildren();
        this.stageContainer.addChild(this.stage);

        const dummyPlanet = {
            center: { x: 0, y: 0 },
            config: { radius: 100, blockSize: 16 },
        } as unknown as Planet;

        this.starfield = new Starfield(dummyPlanet, 800);
        this.stage.addChild(this.starfield.container);

        this.planetsContainer = new Container();
        this.stage.addChild(this.planetsContainer);
        this.drawPlanets();

        // Skapa noll-gravitations-planet för rymden
        const spaceCenterPlanet = new Planet(this.app, this.world, { radius: 20 });
        spaceCenterPlanet.center = { x: 0, y: 0 };
        spaceCenterPlanet.getGravityAt = () => ({ force: 0, isWithinRange: false });

        // Skapa raketen i startplaneten (eller nära origo)
        this.rocket = new Rocket(this.world, spaceCenterPlanet, 0, -500);
        this.rocket.isBoarded = true;
        this.stage.addChild(this.rocket.container);

        // Sätt initial kameracentrering direkt vid start så raketen syns i mitten
        const rocketPos = this.rocket.container;
        this.stage.x = this.app.screen.width / 2 - rocketPos.x;
        this.stage.y = this.app.screen.height / 2 - rocketPos.y;

        this.infoText = new Text({
            text: "RYMDNAVIGERING\nStyr med W/A/S/D eller pilar.\nNärma dig en planet och tryck 'F' för att landa!",
            style: { fill: 0xffffff, fontSize: 16, align: "center" },
        });
        this.infoText.anchor.set(0.5, 0);
        this.infoText.x = this.app.screen.width / 2;
        this.infoText.y = 20;
        this.app.stage.addChild(this.infoText);

        this.app.ticker.add(this.update, this);
    }

    private drawPlanets(): void {
        this.planetsContainer.removeChildren();

        this.planets.forEach((p) => {
            const g = new Graphics();
            const radiusPx = p.radius * 16;

            g.circle(p.x, p.y, radiusPx);
            g.fill(p.color);
            g.stroke({ width: 4, color: 0xffffff, alpha: 0.8 });

            const text = new Text({
                text: p.name,
                style: { fill: 0xffffff, fontSize: 14, fontWeight: "bold" },
            });
            text.anchor.set(0.5);
            text.x = p.x;
            text.y = p.y + radiusPx + 20;

            this.planetsContainer.addChild(g);
            this.planetsContainer.addChild(text);
        });
    }

    private update(ticker: any): void {
        const time = performance.now();

        this.world.step();
        this.starfield.update(time);
        this.rocket.update(this.keys);

        const rocketPos = this.rocket.container;

        // Kontinuerlig kameraföljning av raketen
        this.stage.x = this.app.screen.width / 2 - rocketPos.x;
        this.stage.y = this.app.screen.height / 2 - rocketPos.y;

        this.checkPlanetProximity();
    }

    private checkPlanetProximity(): void {
        const rocketPos = this.rocket.container;

        for (const p of this.planets) {
            const dist = Math.hypot(rocketPos.x - p.x, rocketPos.y - p.y);
            const landingRadius = p.radius * 16 + 60;

            if (dist < landingRadius) {
                if (this.keys["KeyF"]) {
                    this.destroy();

                    const mainScene = new MainScene(this.app, this.world, this.stageContainer, p.type);
                    mainScene.start();
                    break;
                }
            }
        }
    }

    public destroy(): void {
        this.app.ticker.remove(this.update, this);
        if (this.infoText) this.infoText.destroy();
        this.stage.destroy();
    }
}
