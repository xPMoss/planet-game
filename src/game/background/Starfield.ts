import { Container, Graphics } from "pixi.js";
import { Planet } from "../planet/Planet";

interface Star {
    x: number;
    y: number;
    size: number;
    alpha: number;
    baseAlpha: number;
    twinkleSpeed: number;
    color: number;
}

export class Starfield {
    public container: Container;
    private graphics: Graphics;
    private stars: Star[] = [];

    constructor(planet: Planet, starCount: number = 350 * 10) {
        this.container = new Container();
        this.graphics = new Graphics();
        this.container.addChild(this.graphics);

        const mapSizePixels = planet.config.radius * 5 * planet.config.blockSize;
        const spawnRadius = mapSizePixels * 1.5;
        const planetRadiusPixels = planet.config.radius * planet.config.blockSize;

        this.generateStars(planet.center.x, planet.center.y, spawnRadius, starCount, planetRadiusPixels);
    }

    private generateStars(centerX: number, centerY: number, spawnRadius: number, count: number, planetRadiusPixels: number): void {
        const starColors = [0xffffff, 0xffe4e1, 0xb0e0e6, 0xfff8dc];

        for (let i = 0; i < count; i++) {
            let x = 0;
            let y = 0;
            let dist = 0;

            // Generera tills stjärnan hamnar utanför planeten
            do {
                const angle = Math.random() * Math.PI * 2;
                dist = Math.sqrt(Math.random()) * spawnRadius;

                x = centerX + Math.cos(angle) * dist;
                y = centerY + Math.sin(angle) * dist;
            } while (Math.hypot(x - centerX, y - centerY) < planetRadiusPixels);

            const size = Math.random() < 0.85 ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1.5;
            const baseAlpha = Math.random() * 0.6 + 0.3;
            const twinkleSpeed = Math.random() * 0.003;
            const color = starColors[Math.floor(Math.random() * starColors.length)];

            this.stars.push({
                x,
                y,
                size,
                alpha: baseAlpha,
                baseAlpha,
                twinkleSpeed,
                color,
            });
        }
    }

    public update(time: number): void {
        this.graphics.clear();

        for (const star of this.stars) {
            const currentAlpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed) * 0.25;
            const clampedAlpha = Math.max(0.1, Math.min(1, currentAlpha));

            this.graphics.rect(star.x, star.y, star.size, star.size);
            this.graphics.fill({ color: star.color, alpha: clampedAlpha });
        }
    }
}
