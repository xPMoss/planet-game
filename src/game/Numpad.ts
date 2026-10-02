import Phaser from "phaser";

export class Numpad extends Phaser.Scene {
    // Deklarera ett objekt för att hålla tangentreferenserna
    private numpadKeys!: { [key: string]: Phaser.Input.Keyboard.Key };

    constructor() {
        super({ key: "NumpadScene" });
    }

    public create(): void {
        if (!this.input.keyboard) return;

        // 1. Registrera alla numpad-tangenter (NUMPAD_ZERO till NUMPAD_NINE)
        this.numpadKeys = {
            0: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO),
            1: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE),
            2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO),
            3: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE),
            4: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR),
            5: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE),
            6: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX),
            7: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN),
            8: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT),
            9: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE),
        };

        // Alternativ A: Lyssna via Event Listeners (rekommenderas för enstaka tryck)
        Object.keys(this.numpadKeys).forEach((num) => {
            this.numpadKeys[num].on("down", () => {
                this.handleNumpadPress(Number(num));
            });
        });
    }

    public update(): void {
        // Alternativ B: Kontrollera status direkt i spelloopen (update)
        if (Phaser.Input.Keyboard.JustDown(this.numpadKeys["1"])) {
            console.log("Siffra 1 trycktes ned i update-loopen!");
        }
    }

    private handleNumpadPress(digit: number): void {
        console.log("Du tryckte på numpad: " + digit);
    }
}
