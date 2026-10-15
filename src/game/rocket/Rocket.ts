import { Container, Graphics } from "pixi.js";
import RAPIER, { Vector2, type Vector } from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";
import { Player } from "../player/Player";
import { COLLIDER_GROUPS } from "types";
import { createRocketTexture } from "./rocketHelpers";

export class Rocket {
  public container: Container;
  public flameGraphics: Graphics;
  public body: RAPIER.RigidBody;
  public isBoarded: boolean = false;

  private world: RAPIER.World;
  private planet: Planet;
  private player?: Player;

  private thrustPower: number = 100;

  private interactionKeyCooldown: boolean = false;

  constructor(world: RAPIER.World, planet: Planet, spawnX: number, spawnY: number) {
    this.world = world;
    this.planet = planet;

    this.container = new Container();

    // PixiJS grafik för raketen
    const graphics = createRocketTexture();
    this.container.addChild(graphics);

    this.flameGraphics = new Graphics();
    this.container.addChild(this.flameGraphics);

    // Rapier RigidBody & Collider
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(spawnX, spawnY).setLinearDamping(0.2).setAngularDamping(1.0);

    this.body = this.world.createRigidBody(bodyDesc);

    const width = 128;
    const height = 72;
    const colliderDesc = RAPIER.ColliderDesc.cuboid(width / 2, height / 2)
      .setFriction(0.8)
      .setRestitution(0.0);

    colliderDesc.setCollisionGroups((COLLIDER_GROUPS.CATEGORY_PLAYER << 16) | COLLIDER_GROUPS.CATEGORY_TERRAIN);
    this.world.createCollider(colliderDesc, this.body);
  }

  public setPlayer(player: Player): void {
    this.player = player;
  }

  public update(keys: Record<string, boolean>): void {
    const pos: Vector = this.body.translation();

    // Hantera påstigning / avstigning med "KeyF"
    if (keys["KeyF"] && !this.interactionKeyCooldown && this.player) {
      // --- KONTROLLERA ATT SPELAREN ÄR INOM RAKETENS HITBOX ---
      const playerPos = this.player.body.translation();
      const distance = Math.hypot(playerPos.x - pos.x, playerPos.y - pos.y);

      // 32 pixlar motsvarar ungefär raketens halva bredd/höjd (hitbox-storlek)
      const maxBoardingDistance = 35;

      if (distance <= maxBoardingDistance || this.isBoarded) {
        this.interactionKeyCooldown = true;
        this.isBoarded = !this.isBoarded;

        if (this.isBoarded) {
          this.player.container.visible = false;
          this.player.body.setTranslation(pos, true);
        } else {
          this.player.container.visible = true;
          this.player.body.setTranslation({ x: pos.x, y: pos.y }, true);
        }

        setTimeout(() => {
          this.interactionKeyCooldown = false;
        }, 300);
      }
    }

    // --------------------------------------------------------
    const { dirX, dirY, tangentX, tangentY, rawAngle, isWithinGravity, distToCenter } = this.calculateDirections();
    this.applyGravity(dirX, dirY, rawAngle, pos);

    if (this.isBoarded) {
      this.updateMovingRocket(keys, dirX, dirY, tangentX, tangentY, pos);
    } else {
      //this.updateStaticRocket();
    }

    // Synka PixiJS Container
    this.container.x = pos.x;
    this.container.y = pos.y;
    this.container.rotation = this.body.rotation();
  }

  private calculateDirections(): {
    dirX: number;
    dirY: number;
    tangentX: number;
    tangentY: number;
    rawAngle: number;
    isWithinGravity: boolean;
    distToCenter: number;
  } {
    const pos: Vector = this.body.translation();
    const planetCenter: Vector = this.planet.center;
    const distX: number = planetCenter.x - pos.x;
    const distY: number = planetCenter.y - pos.y;
    const distToCenter: number = Math.hypot(distX, distY);

    const dx: number = pos.x - planetCenter.x;
    const dy: number = pos.y - planetCenter.y;
    const absX: number = Math.abs(dx);
    const absY: number = Math.abs(dy);

    let dirX: number = 0;
    let dirY: number = 0;
    let rawAngle: number = 0;
    let tangentX: number = 0;
    let tangentY: number = 0;

    if (absX > absY) {
      dirX = dx > 0 ? -1 : 1;
      dirY = 0;
      rawAngle = dx > 0 ? Math.PI / 2 : -Math.PI / 2;
      tangentX = 0;
      tangentY = dx > 0 ? 1 : -1;
    } else {
      dirX = 0;
      dirY = dy > 0 ? -1 : 1;
      rawAngle = dy > 0 ? Math.PI : 0;
      tangentX = dy > 0 ? -1 : 1;
      tangentY = 0;
    }

    const isWithinGravity = distToCenter > 0 && distToCenter <= this.planet.config.radius * 2 * this.planet.config.blockSize;

    return { dirX, dirY, tangentX, tangentY, rawAngle, isWithinGravity, distToCenter };
  }

  private applyGravity(dirX: number, dirY: number, rawAngle: number, pos: Vector) {
    const gravity = this.planet.getGravityAt(pos.x, pos.y);

    const mass = this.body.mass();
    this.body.resetForces(true);
    this.body.addForce(
      {
        x: dirX * gravity.force * mass,
        y: dirY * gravity.force * mass,
      },
      true,
    );
    this.body.setRotation(rawAngle, true);
  }

  updateMovingRocket(keys: Record<string, boolean>, dirX: number, dirY: number, tangentX: number, tangentY: number, pos: Vector) {
    // Styr raketen med A/D eller Vänster/Höger pil
    if (keys["KeyA"] || keys["ArrowLeft"]) {
      this.body.setRotation(this.body.rotation() - 0.05, true);
    }
    if (keys["KeyD"] || keys["ArrowRight"]) {
      this.body.setRotation(this.body.rotation() + 0.05, true);
    }

    this.flameGraphics.clear();

    // Gasa med W eller Uppåt-pil
    if (keys["KeyW"] || keys["ArrowUp"]) {
      this.drawFlame();

      const currentVel = this.body.linvel();

      //console.log("currentVel", currentVel);
      let radialVel = currentVel.x * dirX + currentVel.y * dirY;
      let tangentVel = currentVel.x * tangentX + currentVel.y * tangentY;
      radialVel = -this.thrustPower;

      const pushOut = -1;
      const currentPos = this.body.translation();
      this.body.setTranslation(
        {
          x: currentPos.x + dirX * pushOut,
          y: currentPos.y + dirY * pushOut,
        },
        true,
      );

      this.body.setLinvel(
        {
          x: tangentX * tangentVel + dirX * radialVel,
          y: tangentY * tangentVel + dirY * radialVel,
        },
        true,
      );
    }

    if (this.player) {
      this.player.body.setTranslation(pos, true);
      this.player.body.setLinvel({ x: 0, y: 0 }, true);
    }
  }

  updateStaticRocket() {
    const pos = this.body.translation();
    const planetCenter = this.planet.center;
    const dx = planetCenter.x - pos.x;
    const dy = planetCenter.y - pos.y;
    const distToCenter = Math.hypot(dx, dy);

    const mass = this.body.mass();
    const gravityMag = 800 * mass;
    this.body.resetForces(true);
    this.body.addForce({ x: (dx / distToCenter) * gravityMag, y: (dy / distToCenter) * gravityMag }, true);
  }

  private drawFlame(): void {
    this.flameGraphics.circle(0, 36, 8);
    this.flameGraphics.fill(0xff6600);
    this.flameGraphics.zIndex = -1;
  }
}
