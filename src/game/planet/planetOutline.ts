// planetOutline.ts
import Phaser from "phaser";
import type { Planet } from "./Planet";
import { PlanetOptimizer } from "./planetOptimizer";
import { BlockType } from "types";

export class PlanetOutline {
    private scene: Phaser.Scene;
    private planet: Planet;
    public outlineGraphics?: Phaser.GameObjects.Graphics;
    public outlineBodies: MatterJS.BodyType[] = [];
    private optimizer: PlanetOptimizer;

    constructor(scene: Phaser.Scene, planet: Planet) {
        this.scene = scene;
        this.planet = planet;
        this.optimizer = new PlanetOptimizer(scene, planet);
    }

    public draw(depth: number = 4): void {
        if (this.outlineGraphics) {
            this.outlineGraphics.clear();
        } else {
            this.outlineGraphics = this.scene.add.graphics();
            this.outlineGraphics.setDepth(10);
        }

        // 1. Rensa gamla fysikkroppar
        this.outlineBodies.forEach((body) => {
            this.scene.matter.world.remove(body);
        });
        this.outlineBodies = [];

        // 2. Dela upp blocken i CORE och vanliga block
        const coreBlockKeys = new Set<string>();
        const mainBlockKeys = new Set<string>();

        this.planet.blocks.forEach((block, key) => {
            if (block.type === BlockType.CORE) {
                coreBlockKeys.add(key);
            } else {
                mainBlockKeys.add(key);
            }
        });

        // 3. Skapa EN sammansatt kropp för planetens yta
        if (mainBlockKeys.size > 0) {
            const planetBody = this.createCompoundFromKeys(mainBlockKeys);
            if (planetBody) {
                this.outlineBodies.push(planetBody);
            }
        }

        // 4. Skapa EN sammansatt kropp för kärnan (CORE)
        if (coreBlockKeys.size > 0) {
            const coreBody = this.createCompoundFromKeys(coreBlockKeys);
            if (coreBody) {
                this.outlineBodies.push(coreBody);
            }
        }
    }

    private createCompoundFromKeys(keys: Set<string>): MatterJS.BodyType | undefined {
        // Skapa optimerade rektanglar från nycklarna
        const rectBodies = this.optimizer.createCombinedBodies(keys);

        if (rectBodies.length === 0) return undefined;

        // Om det bara finns en rektangel behövs ingen compound body
        if (rectBodies.length === 1) {
            return rectBodies[0];
        }

        // Ta bort de enskilda kropparna från världen innan vi slår ihop dem
        rectBodies.forEach((body) => {
            this.scene.matter.world.remove(body);
        });

        // Slå ihop alla rektanglar till EN enda sammansatt Matter.js-kropp
        const compoundBody = this.scene.matter.body.create({
            parts: rectBodies,
            isStatic: true,
            friction: 0,
            frictionStatic: 0,
            restitution: 0,
            slop: 0,
        });

        this.scene.matter.world.add(compoundBody);
        return compoundBody;
    }
}
