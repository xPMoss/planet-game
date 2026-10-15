import { BlurFilter, Container, Graphics } from "pixi.js";
import { Planet } from "../planet/Planet";

export class Atmosphere {
    public container: Container;
    private graphics: Graphics;

    constructor(planet: Planet) {
        this.container = new Container();
        this.graphics = new Graphics();
        this.container.addChild(this.graphics);
        this.container.zIndex = 0; // Precis ovanför planeten/stjärnorna
        const blurFilter = new BlurFilter();
        blurFilter.blur = 4; // Justera värdet för mer eller mindre utsmetad glöd
        this.container.filters = [blurFilter];
        this.drawAtmosphere(planet);
    }

    private drawAtmosphere(planet: Planet): void {
        this.graphics.clear();

        const blockSize = planet.config.blockSize;
        const planetRadiusPx = planet.config.radius * blockSize;
        const centerX = planet.center.x;
        const centerY = planet.center.y;

        // Rita en mjuk atmosfärsgel (tunn cirkel med lägre opacitet)
        const innerAtmosphereThickness = planetRadiusPx * 2;
        const atmosphereThickness = planetRadiusPx * 3;

        // plane's shadow / atmosphere
        this.graphics.circle(centerX, centerY, planetRadiusPx);
        this.graphics.fill({ color: 0x000000, alpha: 0.2 });

        // Innersta atmosfärslagret närmare ytan
        this.graphics.circle(centerX, centerY, innerAtmosphereThickness);
        this.graphics.fill({ color: 0x80d8ff, alpha: 0.15 });

        // Yttre atmosfärsglöd
        this.graphics.circle(centerX, centerY, atmosphereThickness);
        this.graphics.fill({ color: 0x00e5ff, alpha: 0.1 });
    }
}
