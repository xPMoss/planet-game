import Phaser from "phaser";
import { Planet, CATEGORY_TERRAIN } from "planet";
import type { Player } from "../player/Player";
import type { CameraController } from "../camera/Camera";
import { createRocketTexture } from "./rocketHelpers";
import type { MobileInputState } from "ui";

export const CATEGORY_ROCKET = 0x0008;

export class Rocket {
  private scene: Phaser.Scene;
  private planet: Planet;
  public sprite!: Phaser.Physics.Matter.Sprite;

  public isBoarded: boolean = false;
  private player?: Player;
  private cameraController?: CameraController;

  private promptText!: Phaser.GameObjects.Text;
  private flameGraphics!: Phaser.GameObjects.Graphics;

  private eKey?: Phaser.Input.Keyboard.Key;
  private wKey?: Phaser.Input.Keyboard.Key;
  private aKey?: Phaser.Input.Keyboard.Key;
  private sKey?: Phaser.Input.Keyboard.Key;
  private dKey?: Phaser.Input.Keyboard.Key;

  private thrustPower: number = 0.003;

  constructor(scene: Phaser.Scene, planet: Planet) {
    this.scene = scene;
    this.planet = planet;

    if (scene.input.keyboard) {
      this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
  }

  public setPlayerAndCamera(player: Player, cameraController: CameraController): void {
    this.player = player;
    this.cameraController = cameraController;
  }

  public spawn(): void {
    if (!this.scene.textures.exists("rocket_tile")) {
      createRocketTexture(this.scene, "rocket_tile");
    }

    const radius = this.planet.config.radius;
    const mapSize = radius * 2;
    const blockSize = this.planet.config.blockSize;

    // Hitta en bra plats att spawna på
    // Måste vara minst 10 block från mitten (där spelaren spawnar)
    // Måste ha minst 2 block bred platt yta av DIRT (typ 0) utan träd eller stenar ovanpå
    let bestGridX = Math.floor(radius);
    let bestGridY = 0;

    for (let x = Math.floor(radius) + 10; x < mapSize - 2; x++) {
      let y1 = -1;
      let y2 = -1;
      let type1 = -1;
      let type2 = -1;

      // Hitta översta blocket för x
      for (let y = 0; y < mapSize; y++) {
        const block = this.planet.blocks.get(x + "," + y);
        if (block) {
          y1 = y;
          type1 = block.type;
          break;
        }
      }

      // Hitta översta blocket för x + 1
      for (let y = 0; y < mapSize; y++) {
        const block = this.planet.blocks.get(x + 1 + "," + y);
        if (block) {
          y2 = y;
          type2 = block.type;
          break;
        }
      }

      // Kolla om ytan är platt och består av rent gräs/smuts (DIRT = 0)
      if (y1 !== -1 && y1 === y2 && type1 === 0 && type2 === 0) {
        bestGridX = x;
        bestGridY = y1;
        break; // Hittade en perfekt landningsplats!
      }
    }

    const rocketWidth = 128;
    const rocketHeight = 72;

    // Centrera raketen mellan de två platta blocken
    const spawnX = bestGridX * blockSize + blockSize;
    const spawnY = bestGridY * blockSize - rocketHeight / 2 - 15;

    // Dynamisk sprit från start så att massa och fysik beräknas korrekt utan NaN
    this.sprite = this.scene.matter.add.sprite(spawnX, spawnY, "rocket_tile", undefined, {
      friction: 0.8,
      frictionStatic: 1.0,
      frictionAir: 0.02,
      density: 0.05,
      restitution: 0,
    });

    this.sprite.setCollisionCategory(CATEGORY_ROCKET);
    this.sprite.setCollidesWith([CATEGORY_TERRAIN]);
    this.sprite.setFixedRotation();

    this.sprite.setDisplaySize(rocketWidth, rocketHeight);
    this.sprite.setData("isRocket", true);
    this.sprite.setDepth(5);

    // Prompt för att hoppa in i raketen
    this.promptText = this.scene.add.text(spawnX, spawnY - 65, "[E] Gå in i raketen", {
      fontFamily: "sans-serif",
      fontSize: "14px",
      color: "#ffffff",
      backgroundColor: "#000000aa",
      padding: { x: 8, y: 4 },
    });
    this.promptText.setOrigin(0.5);
    this.promptText.setDepth(100);
    this.promptText.setVisible(false);

    this.promptText.setInteractive({ useHandCursor: true });
    this.promptText.on("pointerdown", () => {
      if (!this.isBoarded) {
        this.boardRocket();
      } else {
        this.exitRocket();
      }
    });

    // Flamma grafik
    this.flameGraphics = this.scene.add.graphics();
    this.flameGraphics.setDepth(4);
  }

  public update(
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys,
    mobileState?: MobileInputState,
    joystickState?: { up: boolean; down: boolean; left: boolean; right: boolean },
  ): void {
    if (!this.sprite || !this.sprite.active || isNaN(this.sprite.x) || isNaN(this.sprite.y)) return;

    const playerSprite = this.player?.sprite;

    // 1. Beräkna avstånd och position i förhållande till planetens centrum
    const planetCenter = this.planet.center;
    const blockSize = this.planet.config.blockSize;
    const maxRadiusBlocks = this.planet.config.radius;

    const dx = planetCenter.x - this.sprite.x;
    const dy = planetCenter.y - this.sprite.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const distToCenter = Math.hypot(dx, dy);

    // Yttersta kvadratens halva storlek i pixlar
    const outerSquareHalfSize = maxRadiusBlocks * blockSize;

    // Gravitationsgräns i pixlar (t.ex. planetens radie + 300px extra distans)
    const gravityCutoffRadius = outerSquareHalfSize + 300;

    // 2. Gravitationslogik
    if (distToCenter > 0 && distToCenter <= gravityCutoffRadius) {
      const body = this.sprite.body as MatterJS.BodyType;
      if (body) {
        const gravityMag = 0.001 * body.mass;
        let gravityX = 0;
        let gravityY = 0;

        const isInsideOuterSquare = absX <= outerSquareHalfSize && absY <= outerSquareHalfSize;

        if (isInsideOuterSquare) {
          // A. Kvadratisk gravitation inom planetens yttre kvadrat
          if (absX > absY) {
            gravityX = dx > 0 ? gravityMag : -gravityMag;
            gravityY = 0;
          } else {
            gravityX = 0;
            gravityY = dy > 0 ? gravityMag : -gravityMag;
          }
        } else {
          // B. Cirkulär gravitation mellan yttersta kvadraten och gravitationscirkeln
          gravityX = (dx / distToCenter) * gravityMag;
          gravityY = (dy / distToCenter) * gravityMag;
        }

        // Applicera beräknad gravitation
        this.sprite.applyForce(new Phaser.Math.Vector2(gravityX, gravityY));
      }
    } else {
      // C. Utanför gravitationscirkeln: Ingen gravitation appliceras (viktlöshet i rymden)
    }

    // 3. Om spelaren INTE är i raketen: Hantera prompt och instigning
    if (!this.isBoarded && playerSprite) {
      const rocketBounds = this.sprite.getBounds();
      const isInsideHitbox = rocketBounds.contains(playerSprite.x, playerSprite.y);

      if (isInsideHitbox) {
        const angleRad = Phaser.Math.DegToRad(this.sprite.angle - 90);
        this.promptText.setPosition(this.sprite.x + Math.cos(angleRad) * 65, this.sprite.y + Math.sin(angleRad) * 65);
        this.promptText.setRotation(this.sprite.rotation);
        this.promptText.setText("[E] Gå in i raketen");
        this.promptText.setVisible(true);

        if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
          this.boardRocket();
        }
      } else {
        this.promptText.setVisible(false);
      }

      this.flameGraphics.clear();
      return;
    }

    // 4. Om spelaren ÄR i raketen: Hantera styrning, kamera och urladdning/urtramp
    if (this.isBoarded) {
      if (playerSprite && playerSprite.body) {
        this.scene.matter.body.setPosition(playerSprite.body as MatterJS.BodyType, {
          x: this.sprite.x,
          y: this.sprite.y,
        });
      }

      const body = this.sprite.body as MatterJS.BodyType;
      const speed = body ? body.speed : 0;
      const isLanded = speed < 0.5;

      if (isLanded) {
        const angleRad = Phaser.Math.DegToRad(this.sprite.angle - 90);
        this.promptText.setPosition(this.sprite.x + Math.cos(angleRad) * 75, this.sprite.y + Math.sin(angleRad) * 75);
        this.promptText.setRotation(this.sprite.rotation);
        this.promptText.setText("[E] Lämna raketen");
        this.promptText.setVisible(true);

        if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
          this.exitRocket();
          return;
        }
      } else {
        this.promptText.setVisible(false);
      }

      // Flygkontroller (W, A, S, D / Pilknappar)
      const isThrusting =
        Boolean(this.wKey?.isDown) || Boolean(cursors?.up?.isDown) || Boolean(mobileState?.up) || Boolean(joystickState?.up);
      const isRotatingLeft =
        Boolean(this.aKey?.isDown) || Boolean(cursors?.left?.isDown) || Boolean(mobileState?.left) || Boolean(joystickState?.left);
      const isRotatingRight =
        Boolean(this.dKey?.isDown) || Boolean(cursors?.right?.isDown) || Boolean(mobileState?.right) || Boolean(joystickState?.right);
      const isBraking =
        Boolean(this.sKey?.isDown) || Boolean(cursors?.down?.isDown) || Boolean(mobileState?.down) || Boolean(joystickState?.down);

      const isInSpace = distToCenter > gravityCutoffRadius;
      if (!isLanded || isInSpace) {
        if (isRotatingLeft) {
          this.sprite.setAngle(this.sprite.angle - 2.5);
        }
        if (isRotatingRight) {
          this.sprite.setAngle(this.sprite.angle + 2.5);
        }
      }

      this.flameGraphics.clear();
      if (isThrusting) {
        if (body) {
          const angleRad = Phaser.Math.DegToRad(this.sprite.angle - 90);
          const forceMag = this.thrustPower * body.mass;
          const thrustX = Math.cos(angleRad) * forceMag;
          const thrustY = Math.sin(angleRad) * forceMag;

          this.sprite.applyForce(new Phaser.Math.Vector2(thrustX, thrustY));
          this.drawEngineFlame();
        }
      }

      if (isBraking) {
        if (body) {
          this.scene.matter.body.setVelocity(body, {
            x: body.velocity.x * 0.95,
            y: body.velocity.y * 0.95,
          });
        }
      }
    }
  }

  private boardRocket(): void {
    if (!this.player) return;
    this.isBoarded = true;
    this.player.setBoarded(true);

    // Sätt kameran att följa raketen och zooma ut mjukt
    if (this.cameraController) {
      this.cameraController.follow(this.sprite, 0.8);
    }
  }

  private exitRocket(): void {
    if (!this.player) return;
    this.isBoarded = false;

    // Placera spelaren bredvid raketen
    const exitX = this.sprite.x + 40;
    const exitY = this.sprite.y;

    this.player.setBoarded(false, { x: exitX, y: exitY });

    // Återställ kameran att följa spelaren och zooma in till normalnivå
    if (this.cameraController && this.player.sprite) {
      this.cameraController.follow(this.player.sprite, 2.0);
    }

    this.promptText.setVisible(false);
    this.flameGraphics.clear();
  }

  private drawEngineFlame(): void {
    const angleRad = Phaser.Math.DegToRad(this.sprite.angle - 90);
    const bottomX = this.sprite.x - Math.cos(angleRad) * 45;
    const bottomY = this.sprite.y - Math.sin(angleRad) * 45;

    this.flameGraphics.fillStyle(0xff6600, 0.9);
    this.flameGraphics.fillCircle(bottomX + (Math.random() * 6 - 3), bottomY + (Math.random() * 6 - 3), 10 + Math.random() * 8);

    this.flameGraphics.fillStyle(0xffff00, 1);
    this.flameGraphics.fillCircle(bottomX, bottomY, 5 + Math.random() * 4);
  }
}
