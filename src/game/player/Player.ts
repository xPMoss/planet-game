import { Assets, Container, Graphics, Sprite, Texture } from "pixi.js";
import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "../planet/Planet";
import type { JoystickState, MobileInputState, PlayerDirection } from "types";
import { COLLIDER_GROUPS } from "types";
import { createPlayerTexture, createRedHatTexture } from "./playerHelpers";

export class Player {
    public container: Container;
    public body: RAPIER.RigidBody;
    public lookDirection: PlayerDirection = "right";

    private world: RAPIER.World;
    private planet: Planet;
    private bodySprite: Sprite;
    private eyesGraphics: Graphics;

    private toolSprite: Sprite;
    private armorSprite: Sprite;
    private helmetSprite: Sprite;
    private weaponSprite: Sprite;

    private moveSpeed: number = 100;
    private jumpSpeed: number = 200;
    private gravityStrength: number = 1000;
    private direction: PlayerDirection = "right";

    private jumpKeyReleased: boolean = true; // Förhindrar dubbelhopp genom att kräva att man släpper tangenten

    constructor(app: any, world: RAPIER.World, planet: Planet, startX: number, startY: number) {
        this.world = world;
        this.planet = planet;

        this.container = new Container();

        const playerTexture = createPlayerTexture(app, 0x9ce811);
        this.bodySprite = new Sprite(playerTexture);
        this.bodySprite.anchor.set(0.5);
        this.container.addChild(this.bodySprite);

        this.toolSprite = new Sprite();
        this.toolSprite.anchor.set(0.5);
        this.container.addChild(this.toolSprite);

        this.armorSprite = new Sprite();
        this.armorSprite.anchor.set(0.5);
        this.container.addChild(this.armorSprite);

        this.helmetSprite = new Sprite(Texture.WHITE);
        this.helmetSprite.anchor.set(0.5);
        this.container.addChild(this.helmetSprite);

        Assets.load("./src/assets/red_hat.png").then((texture) => {
            texture.source.scaleMode = "nearest";

            this.helmetSprite.texture = texture;
            this.helmetSprite.scale.set(1);
            this.helmetSprite.y = -10.5;
            this.helmetSprite.x = 2;
            this.helmetSprite.zIndex = 1;
        });

        this.eyesGraphics = new Graphics();
        this.container.addChild(this.eyesGraphics);

        this.weaponSprite = new Sprite();
        this.container.addChild(this.weaponSprite);

        const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(startX, startY).setLinearDamping(0.0).lockRotations();
        this.body = this.world.createRigidBody(bodyDesc);

        const colliderDesc = RAPIER.ColliderDesc.capsule(2, 6).setFriction(0.0).setRestitution(0.0);
        colliderDesc.setCollisionGroups(
            (COLLIDER_GROUPS.CATEGORY_PLAYER << 16) | COLLIDER_GROUPS.CATEGORY_SURFACE_OBJECTS | COLLIDER_GROUPS.CATEGORY_TERRAIN,
        );

        this.world.createCollider(colliderDesc, this.body);
    }

    public update(dt: number, keys: Record<string, boolean>, joystickState: JoystickState, mobileInputState: MobileInputState): void {
        const pos = this.body.translation();

        const { dirX, dirY, tangentX, tangentY, rawAngle } = this.applyGravity();

        const isLeft = keys["ArrowLeft"] || Boolean(joystickState?.left);
        const isRight = keys["ArrowRight"] || Boolean(joystickState?.right);
        const isUp = keys["ArrowUp"] || Boolean(joystickState?.up);
        const isDown = keys["ArrowDown"] || Boolean(joystickState?.down);
        const isJump = keys["Space"] || Boolean(mobileInputState?.jump);

        const isHoldingShift = keys["ShiftLeft"];

        const joystickForce = joystickState?.force || 0;
        const joystickAngle = joystickState?.angle || 0;
        const isInnerRing = joystickState?.isInnerRing || false;

        const joystickMoveDir = !isInnerRing && joystickForce > 0 ? Math.cos(joystickAngle) * joystickForce : 0;

        // Bestäm exakt riktning för alla 8 riktningar samt rakt upp/ner
        if (isUp && isLeft) this.direction = "up-left";
        else if (isUp && isRight) this.direction = "up-right";
        else if (isDown && isLeft) this.direction = "down-left";
        else if (isDown && isRight) this.direction = "down-right";
        else if (isUp && !isDown) this.direction = "up";
        else if (isDown && !isUp) this.direction = "down";
        else if (isLeft) this.direction = "left";
        else if (isRight) this.direction = "right";

        const shouldMoveLeft = !isHoldingShift && isLeft && !isInnerRing;
        const shouldMoveRight = !isHoldingShift && isRight && !isInnerRing;

        let moveDir = 0;
        if (shouldMoveLeft) moveDir = joystickForce > 0 ? joystickMoveDir : -1;
        if (shouldMoveRight) moveDir = joystickForce > 0 ? joystickMoveDir : 1;

        const currentVel = this.body.linvel();
        let radialVel = currentVel.x * dirX + currentVel.y * dirY;
        let tangentVel = currentVel.x * tangentX + currentVel.y * tangentY;

        if (moveDir !== 0) {
            const targetSpeed = moveDir * this.moveSpeed;
            tangentVel += (targetSpeed - tangentVel) * 0.2;
        } else {
            tangentVel *= 0.9;
        }

        const isGrounded = radialVel >= -5 && radialVel <= 8;

        if (!isJump) {
            this.jumpKeyReleased = true;
        }

        if (isJump && isGrounded && this.jumpKeyReleased) {
            radialVel = -this.jumpSpeed;
            this.jumpKeyReleased = false;

            const pushOut = -4;
            const currentPos = this.body.translation();
            this.body.setTranslation(
                {
                    x: currentPos.x + dirX * pushOut,
                    y: currentPos.y + dirY * pushOut,
                },
                true,
            );
        }

        this.body.setLinvel(
            {
                x: tangentX * tangentVel + dirX * radialVel,
                y: tangentY * tangentVel + dirY * radialVel,
            },
            true,
        );

        this.container.x = pos.x;
        this.container.y = pos.y;
        this.container.rotation = this.body.rotation();

        this.drawEyes();
        this.updateSprites();
    }

    private applyGravity(): { dirX: number; dirY: number; tangentX: number; tangentY: number; rawAngle: number } {
        const pos = this.body.translation();
        const center = this.planet.center;

        const dx = pos.x - center.x;
        const dy = pos.y - center.y;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        let dirX = 0;
        let dirY = 0;
        let rawAngle = 0;
        let tangentX = 0;
        let tangentY = 0;

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

        const mass = this.body.mass();
        this.body.resetForces(true);
        this.body.addForce(
            {
                x: dirX * this.gravityStrength * mass,
                y: dirY * this.gravityStrength * mass,
            },
            true,
        );

        this.body.setRotation(rawAngle, true);

        return { dirX, dirY, tangentX, tangentY, rawAngle };
    }

    public getDirection(): PlayerDirection {
        return this.direction;
    }

    private drawEyes(): void {
        this.eyesGraphics.clear();

        let eyeOffsetX = 0;
        let pupilOffsetX = 0;
        let pupilOffsetY = 0;
        if (this.direction.includes("right")) {
            eyeOffsetX = 1;
            pupilOffsetX = 1;
        }
        if (this.direction.includes("left")) {
            eyeOffsetX = -1;
            pupilOffsetX = -2;
        }
        if (this.direction.includes("up")) {
            pupilOffsetY = -1;
        }
        if (this.direction.includes("down")) {
            pupilOffsetY = 1;
        }

        this.eyesGraphics.rect(-4 + eyeOffsetX, -4, 3, 4);
        this.eyesGraphics.rect(1 + eyeOffsetX, -4, 3, 4);
        this.eyesGraphics.fill(0xffffff);

        this.eyesGraphics.rect(-3 + pupilOffsetX, -3 + pupilOffsetY, 2, 2);
        this.eyesGraphics.rect(2 + pupilOffsetX, -3 + pupilOffsetY, 2, 2);
        this.eyesGraphics.fill(0x000000);
    }

    private updateSprites() {
        if (this.direction.includes("left")) {
            this.helmetSprite.scale.x = -1; // Vänd hatten åt vänster
            this.helmetSprite.x = -2; // Justera eventuell offset i sidled
        } else {
            this.helmetSprite.scale.x = 1; // Vänd hatten åt höger
            this.helmetSprite.x = 2;
        }
    }
}
