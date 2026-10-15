// src/scenes/HouseScene.ts
import Phaser from "phaser";
import { useGameStore } from "store";

export interface HouseSceneData {
    houseId: string;
    returnPosition: { x: number; y: number };
}

export class HouseScene extends Phaser.Scene {
    private houseData!: HouseSceneData;
    private exitKey!: Phaser.Input.Keyboard.Key;

    constructor() {
        super({ key: "HouseScene" });
    }

    init(data: HouseSceneData): void {
        this.houseData = data;
    }

    create(): void {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Mörk bakgrund för husets insida
        this.add.rectangle(0, 0, width * 2, height * 2, 0x111122);

        // Husets rum / väggar
        const roomWidth = 400;
        const roomHeight = 250;
        const roomX = width / 2;
        const roomY = height / 2;

        const room = this.add.rectangle(roomX, roomY, roomWidth, roomHeight, 0x2a1a0a);
        room.setStrokeStyle(4, 0x8b5a2b);

        // Informationstext
        this.add
            .text(roomX, roomY - 80, "HUS-INSIDA", {
                fontFamily: "monospace",
                fontSize: "20px",
                color: "#ffffff",
            })
            .setOrigin(0.5);

        this.add
            .text(roomX, roomY + 80, "[E] Gå ut ur huset", {
                fontFamily: "monospace",
                fontSize: "14px",
                color: "#aaaaaa",
                backgroundColor: "#000000aa",
                padding: { x: 8, y: 4 },
            })
            .setOrigin(0.5);

        // Tangent för att gå ut
        if (this.input.keyboard) {
            this.exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            this.exitKey.on("down", () => {
                this.exitHouse();
            });
        }
    }

    private exitHouse(): void {
        // Återgå till huvudscenen och skicka med positionen spelaren ska hamna på
        this.scene.stop("HouseScene");
        this.scene.resume("MainScene", {
            returnPosition: this.houseData.returnPosition,
        });
    }
}
