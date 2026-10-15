import Phaser from "phaser";
import { createPlayerTexture, createPlayerHatTexture } from "player";
import { createRocketTexture, createRocketTexture2 } from "../game/rocket/rocketHelpers";

export class DebugScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private isDragging = false;
    private dragStartX = 0;
    private dragStartY = 0;

    constructor() {
        super({ key: "DebugScene" });
    }

    preload(): void {
        createPlayerTexture(this, "player_tile", 0x00ff00);
        createPlayerHatTexture(this, "player_hat", 0xff0000);
        createRocketTexture(this, "ufo_starcruiser");
        createRocketTexture2(this, "classic_rocket");
    }

    create(): void {
        // Stäng av global gravitation för tomrum
        this.matter.world.setGravity(0, 0);

        // Aktivera Matter.js debug-rendering för kollisionskroppar
        this.enableMatterDebug();

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Bakgrundsnät
        const gridGraphics = this.add.graphics();
        gridGraphics.lineStyle(1, 0x333355, 0.5);
        const gridSize = 32;
        for (let x = -2000; x < 4000; x += gridSize) {
            gridGraphics.lineBetween(x, -2000, x, 4000);
        }
        for (let y = -2000; y < 4000; y += gridSize) {
            gridGraphics.lineBetween(-2000, y, 4000, y);
        }

        // UI Info-text
        const uiText = this.add.text(20, 20, "DEBUG SCENE - Matter.js Colliders & Visuals", {
            fontFamily: "monospace",
            fontSize: "18px",
            color: "#00ff00",
            backgroundColor: "#000000aa",
            padding: { x: 10, y: 5 },
        });
        uiText.setScrollFactor(0);

        // -------------------------------------------------------------
        // 1. SPELAREN (Sprite, Collider, Hatt & Ögon)
        // -------------------------------------------------------------
        const playerX = centerX - 200;
        const playerY = centerY;
        const playerWidth = 12;
        const playerHeight = 16;

        // A. Matter Body & Sprite
        const playerBody = this.matter.bodies.rectangle(playerX, playerY, playerWidth, playerHeight, {
            friction: 0,
            restitution: 0,
            chamfer: { radius: 2 },
        });

        const playerSprite = this.matter.add.sprite(playerX, playerY, "player_tile");
        playerSprite.setExistingBody(playerBody);
        playerSprite.setDisplaySize(playerWidth, playerHeight);
        playerSprite.setFixedRotation();
        playerSprite.setDepth(10);

        // B. Hatt (Samma positionering som i Player.ts)
        const hatScale = 0.25;
        const headOffset = playerHeight / 2 + 2;

        const playerHat = this.add.sprite(playerX, playerY - headOffset, "player_hat");
        playerHat.setScale(hatScale);
        playerHat.setOrigin(0.5, 1);
        playerHat.setDepth(12);

        // C. Ögon (Exakt samma grafik och skalning som i Player.ts)
        const eyeScale = 0.25;
        const eyes = this.add.graphics();
        eyes.setPosition(playerX, playerY - 2);
        eyes.setScale(eyeScale);
        eyes.setDepth(13);

        // Ögonvitor
        eyes.fillStyle(0xffffff, 1);
        eyes.fillRect(-16, -16, 12, 16);
        eyes.fillRect(4, -16, 12, 16);

        // Pupiller (tittar åt höger)
        const pupilOffsetX = 4;
        const pupilOffsetY = 0;
        eyes.fillStyle(0x000000, 1);
        eyes.fillRect(-12 + pupilOffsetX, -12 + pupilOffsetY, 8, 8);
        eyes.fillRect(8 + pupilOffsetX, -12 + pupilOffsetY, 8, 8);

        this.add
            .text(playerX, playerY + 30, "Player Collider (12x16)", {
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#ffffff",
            })
            .setOrigin(0.5);

        // -------------------------------------------------------------
        // 2. UFO / RYMDFARKOST (Sprite & Collider)
        // -------------------------------------------------------------
        const ufoX = centerX;
        const ufoY = centerY;
        const ufoWidth = 128;
        const ufoHeight = 72;

        const ufoBody = this.matter.bodies.rectangle(ufoX, ufoY, ufoWidth, ufoHeight, {
            friction: 0.8,
            density: 0.05,
        });

        const ufoSprite = this.matter.add.sprite(ufoX, ufoY, "ufo_starcruiser");
        ufoSprite.setExistingBody(ufoBody);
        ufoSprite.setDisplaySize(ufoWidth, ufoHeight);
        ufoSprite.setFixedRotation();
        ufoSprite.setDepth(10);

        this.add
            .text(ufoX, ufoY + 65, "UFO Collider (128x92)", {
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#ffffff",
            })
            .setOrigin(0.5);

        // -------------------------------------------------------------
        // 3. KLASSISK RAKET (Sprite & Collider)
        // -------------------------------------------------------------
        const rocketX = centerX + 200;
        const rocketY = centerY;
        const rocketWidth = 64;
        const rocketHeight = 128;

        const rocketBody = this.matter.bodies.rectangle(rocketX, rocketY, rocketWidth, rocketHeight, {
            friction: 0.8,
            density: 0.05,
        });

        const rocketSprite = this.matter.add.sprite(rocketX, rocketY, "classic_rocket");
        rocketSprite.setExistingBody(rocketBody);
        rocketSprite.setDisplaySize(rocketWidth, rocketHeight);
        rocketSprite.setFixedRotation();
        rocketSprite.setDepth(10);

        this.add
            .text(rocketX, rocketY + 80, "Rocket Collider (64x128)", {
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#ffffff",
            })
            .setOrigin(0.5);

        // Tangentbordskontroller
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        // Musnavigering (Dra & Zoom)
        this.setupMouseNavigation();
    }

    private enableMatterDebug(): void {
        this.matter.world.drawDebug = true;

        if (this.matter.world.debugGraphic) {
            // Sätt debug-lagret under hatten/ögonen så att de inte skyms
            this.matter.world.debugGraphic.setDepth(11);
        }

        const debugConfig = this.matter.world.debugConfig as unknown as {
            showBody: boolean;
            showStaticBody: boolean;
            showVelocity: boolean;
            fillColor?: number;
            fillOpacity?: number;
            lineColor?: number;
            lineOpacity?: number;
        };

        debugConfig.showBody = true;
        debugConfig.showStaticBody = true;
        debugConfig.showVelocity = true;

        // Färgkonfiguration för collider-konturer
        debugConfig.fillColor = 0x00ff00;
        debugConfig.fillOpacity = 0.2; // Låg opacitet så grafiken syns igenom
        debugConfig.lineColor = 0xffff00;
        debugConfig.lineOpacity = 0.8;
    }

    private setupMouseNavigation(): void {
        const camera = this.cameras.main;
        this.cameras.main.setZoom(2.5);

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            this.isDragging = true;
            this.dragStartX = pointer.x;
            this.dragStartY = pointer.y;
        });

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if (!this.isDragging) return;

            const dx = (pointer.x - this.dragStartX) / camera.zoom;
            const dy = (pointer.y - this.dragStartY) / camera.zoom;

            camera.scrollX -= dx;
            camera.scrollY -= dy;

            this.dragStartX = pointer.x;
            this.dragStartY = pointer.y;
        });

        this.input.on("pointerup", () => {
            this.isDragging = false;
        });

        this.input.on(
            "wheel",
            (_pointer: Phaser.Input.Pointer, _gameObjects: Phaser.GameObjects.GameObject[], _deltaX: number, deltaY: number) => {
                const zoomFactor = 0.1;
                const newZoom = deltaY > 0 ? camera.zoom - zoomFactor : camera.zoom + zoomFactor;
                const clampedZoom = Phaser.Math.Clamp(newZoom, 0.2, 5.0);
                camera.setZoom(clampedZoom);
            },
        );
    }

    override update(): void {
        const speed = 5 / this.cameras.main.zoom;

        if (this.cursors) {
            if (this.cursors.left.isDown) this.cameras.main.scrollX -= speed;
            if (this.cursors.right.isDown) this.cameras.main.scrollX += speed;
            if (this.cursors.up.isDown) this.cameras.main.scrollY -= speed;
            if (this.cursors.down.isDown) this.cameras.main.scrollY += speed;
        }
    }
}
