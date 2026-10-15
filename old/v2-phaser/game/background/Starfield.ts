import Phaser from "phaser";
import type { Planet } from "planet";

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
    private scene: Phaser.Scene;
    private graphics: Phaser.GameObjects.Graphics;
    private stars: Star[] = [];

    constructor(scene: Phaser.Scene, planet: Planet, starCount: number = 300) {
        this.scene = scene;

        // Sätt lågt depth (t.ex. -100) så att bakgrunden hamnar bakom alla spritar och terräng
        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(-100);

        // Beräkna radien för stjärnfältet baserat på planetens storlek
        const mapSizePixels = planet.config.radius * 2 * planet.config.blockSize;
        const spawnRadius = mapSizePixels * 1.5;

        this.generateStars(planet.center.x, planet.center.y, spawnRadius, starCount);
    }

    private generateStars(centerX: number, centerY: number, radius: number, count: number): void {
        const starColors = [0xffffff, 0xffe4e1, 0xb0e0e6, 0xfff8dc]; // Vita, lätt blåa, rosa och gula stjärnor

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            // Slumpmässigt avstånd för jämn spridning i en cirkel runt planeten
            const dist = Math.sqrt(Math.random()) * radius;

            const x = centerX + Math.cos(angle) * dist;
            const y = centerY + Math.sin(angle) * dist;

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

    public update(): void {
        this.graphics.clear();

        const time = this.scene.time.now;

        for (const star of this.stars) {
            // Skapa en mjuk tindrande effekt med Sinus
            const currentAlpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed) * 0.25;
            const clampedAlpha = Phaser.Math.Clamp(currentAlpha, 0.1, 1);

            this.graphics.fillStyle(star.color, clampedAlpha);
            this.graphics.fillRect(star.x, star.y, star.size, star.size);
        }
    }
}
