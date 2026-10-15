export interface BlueprintCell {
    relX: number;
    relY: number;
    required: number; // 1 = Kräver block, 0 = Kräver tomrum
    isFulfilled: boolean;
}

export class PlacedBlueprint {
    public id: string;
    public startGridX: number;
    public startGridY: number;
    public width: number;
    public height: number;
    public cells: BlueprintCell[] = [];

    constructor(id: string, startGridX: number, startGridY: number, blueprintMatrix: number[][]) {
        this.id = id;
        this.startGridX = startGridX;
        this.startGridY = startGridY;
        this.height = blueprintMatrix.length;
        this.width = blueprintMatrix[0].length;

        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                this.cells.push({
                    relX: c,
                    relY: r,
                    required: blueprintMatrix[r][c],
                    isFulfilled: false,
                });
            }
        }
    }

    public isComplete(): boolean {
        return this.cells.every((cell) => cell.required === 0 || cell.isFulfilled);
    }
}
