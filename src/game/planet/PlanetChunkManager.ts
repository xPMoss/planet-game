import RAPIER from "@dimforge/rapier2d-compat";
import { Planet } from "./Planet";
import { Player } from "../player/Player";
import { Rocket } from "../rocket/Rocket";
import { BlockType, COLLIDER_GROUPS } from "types";

interface ChunkColliderData {
    body: RAPIER.RigidBody;
    collider: RAPIER.Collider;
}
export class PlanetChunkManager {
    private world: RAPIER.World;
    private planet: Planet;
    private player: Player;
    private rocket?: Rocket;

    private activeColliders: Map<string, ChunkColliderData> = new Map();
    private activationRadiusPx: number;

    constructor(world: RAPIER.World, planet: Planet, player: Player, rocket?: Rocket, radiusInBlocks: number = 6) {
        this.world = world;
        this.planet = planet;
        this.player = player;
        this.rocket = rocket;
        this.activationRadiusPx = radiusInBlocks * planet.config.blockSize;
    }

    public update(): void {
        const playerPos = this.player.container;
        const rocketPos = this.rocket?.container;
        const blockSize = this.planet.config.blockSize;
        const radiusSq = this.activationRadiusPx * this.activationRadiusPx;

        const currentNeededKeys = new Set<string>();

        // 1. Hitta block inom radien för både spelaren och raketen
        this.planet.blocks.forEach((block, key) => {
            if (block.type === BlockType.AIR) return;

            const worldX = block.x * blockSize + blockSize / 2;
            const worldY = block.y * blockSize + blockSize / 2;

            // Kontrollera avstånd till spelare
            const pdx = worldX - playerPos.x;
            const pdy = worldY - playerPos.y;
            const playerDistSq = pdx * pdx + pdy * pdy;

            if (playerDistSq <= radiusSq) {
                currentNeededKeys.add(key);
                return;
            }

            // Kontrollera avstånd till raket om den finns
            if (rocketPos) {
                const rdx = worldX - rocketPos.x;
                const rdy = worldY - rocketPos.y;
                const rocketDistSq = rdx * rdx + rdy * rdy;

                if (rocketDistSq <= radiusSq) {
                    currentNeededKeys.add(key);
                }
            }
        });

        // 2. Ta bort både RigidBody och Collider som hamnat utanför radierna
        this.activeColliders.forEach((data, key) => {
            if (!currentNeededKeys.has(key)) {
                this.world.removeRigidBody(data.body);
                this.activeColliders.delete(key);
            }
        });

        // 3. Skapa nya för block inom radierna
        currentNeededKeys.forEach((key) => {
            if (!this.activeColliders.has(key)) {
                const block = this.planet.blocks.get(key);
                if (!block) return;

                const worldX = block.x * blockSize + blockSize / 2;
                const worldY = block.y * blockSize + blockSize / 2;

                const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(worldX, worldY);
                const body = this.world.createRigidBody(bodyDesc);

                const colliderDesc = RAPIER.ColliderDesc.cuboid(blockSize / 2, blockSize / 2)
                    .setFriction(block.friction || 0.8)
                    .setRestitution(block.restitution || 0.1);

                colliderDesc.setCollisionGroups((block.colliderGroup << 16) | 0xffff);
                const collider = this.world.createCollider(colliderDesc, body);

                this.activeColliders.set(key, { body, collider });
            }
        });
    }

    public destroy(): void {
        this.activeColliders.forEach((data) => {
            this.world.removeRigidBody(data.body);
        });
        this.activeColliders.clear();
    }
}
