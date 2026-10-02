import Phaser from "phaser";

export interface JoystickOutput {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    force: number;
    angle: number;
}

export class VirtualJoystick {
    private scene: Phaser.Scene;
    private base: Phaser.GameObjects.Arc;
    private thumb: Phaser.GameObjects.Arc;
    private radius: number;
    private pointer: Phaser.Input.Pointer | null = null;

    public force: number = 0;
    public angle: number = 0;
    public up: boolean = false;
    public down: boolean = false;
    public left: boolean = false;
    public right: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, radius: number = 60) {
        this.scene = scene;
        this.radius = radius;

        // Skapa grafik för bas och knopp
        this.base = scene.add.circle(x, y, radius, 0x000000, 0.5).setScrollFactor(0).setDepth(1000);
        this.thumb = scene.add
            .circle(x, y, radius / 2, 0xffffff, 0.8)
            .setScrollFactor(0)
            .setDepth(1001);

        // Gör basen interaktiv
        this.base.setInteractive();

        this.setupEvents();
    }

    private setupEvents(): void {
        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.base.x, this.base.y);
            if (dist <= this.radius) {
                this.pointer = pointer;
                this.updatePosition(pointer);
            }
        });

        this.scene.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if (this.pointer && this.pointer.id === pointer.id) {
                this.updatePosition(pointer);
            }
        });

        this.scene.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
            if (this.pointer && this.pointer.id === pointer.id) {
                this.reset();
            }
        });
    }

    private updatePosition(pointer: Phaser.Input.Pointer): void {
        const angle = Phaser.Math.Angle.Between(this.base.x, this.base.y, pointer.x, pointer.y);
        const dist = Phaser.Math.Distance.Between(this.base.x, this.base.y, pointer.x, pointer.y);

        const clampedDist = Math.min(dist, this.radius);

        this.thumb.x = this.base.x + Math.cos(angle) * clampedDist;
        this.thumb.y = this.base.y + Math.sin(angle) * clampedDist;

        this.angle = angle;
        this.force = clampedDist / this.radius;

        // Tröskelvärde (deadzone) för booleans
        const deadzone = 0.3;
        this.left = Math.cos(angle) < -deadzone && this.force > deadzone;
        this.right = Math.cos(angle) > deadzone && this.force > deadzone;
        this.up = Math.sin(angle) < -deadzone && this.force > deadzone;
        this.down = Math.sin(angle) > deadzone && this.force > deadzone;
    }

    private reset(): void {
        this.pointer = null;
        this.thumb.x = this.base.x;
        this.thumb.y = this.base.y;
        this.force = 0;
        this.angle = 0;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
    }

    public destroy(): void {
        this.base.destroy();
        this.thumb.destroy();
    }
}
