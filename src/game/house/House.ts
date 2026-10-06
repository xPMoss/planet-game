import Phaser from "phaser";

export interface HouseBounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export class House {
    public id: string;
    public bounds: HouseBounds;
    public doorGridPos: { x: number; y: number };
    public isPlayerInside: boolean = false;

    constructor(id: string, bounds: HouseBounds, doorGridPos: { x: number; y: number }) {
        this.id = id;
        this.bounds = bounds;
        this.doorGridPos = doorGridPos;
    }

    public containsPoint(gridX: number, gridY: number): boolean {
        return gridX > this.bounds.minX && gridX < this.bounds.maxX && gridY > this.bounds.minY && gridY < this.bounds.maxY;
    }
}
