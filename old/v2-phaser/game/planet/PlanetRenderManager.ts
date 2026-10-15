import Phaser from "phaser";

export function createPlanetRenderManager(scene: Phaser.Scene, planet: any, player: any, chunkSize: number = 12) {
    let activeChunks = new Set<string>();
    let outlineGraphics: Phaser.GameObjects.Graphics | null = null;
    let lastPlayerChunkX: number | null = null;
    let lastPlayerChunkY: number | null = null;

    function init(): void {
        outlineGraphics = scene.add.graphics();
        outlineGraphics.setDepth(1);
        renderOutline();
    }

    // Visualiserar planetens kontur/outline
    function renderOutline(): void {
        if (!outlineGraphics) return;

        outlineGraphics.clear();
        outlineGraphics.lineStyle(2, 0x00ff00, 0.8);

        const radius = planet.radius || 500;
        const center = planet.center || { x: 0, y: 0 };

        outlineGraphics.strokeCircle(center.x, center.y, radius);
    }

    // Beräknar vilken chunk spelaren befinner sig i
    function getPlayerChunkCoords(): { cx: number; cy: number } | null {
        if (!player || !player.sprite) return null;

        const cx = Math.floor(player.sprite.x / (chunkSize * 32));
        const cy = Math.floor(player.sprite.y / (chunkSize * 32));

        return { cx, cy };
    }

    // Optimizer: Döljer/visar objekt och laddar/ur-laddar chunks utifrån spelarens position
    function update(): void {
        const coords = getPlayerChunkCoords();
        if (!coords) return;

        // Kör endast tung beräkning när spelaren byter chunk (Optimizer)
        if (coords.cx === lastPlayerChunkX && coords.cy === lastPlayerChunkY) {
            return;
        }

        lastPlayerChunkX = coords.cx;
        lastPlayerChunkY = coords.cy;

        const visibleDistance = 2; // Antal chunks runt spelaren att hålla aktiva
        const newActiveChunks = new Set<string>();

        for (let x = coords.cx - visibleDistance; x <= coords.cx + visibleDistance; x++) {
            for (let y = coords.cy - visibleDistance; y <= coords.cy + visibleDistance; y++) {
                const chunkKey = x + "," + y;
                newActiveChunks.add(chunkKey);

                if (!activeChunks.has(chunkKey)) {
                    loadChunk(x, y);
                }
            }
        }

        // Inaktivera/ta bort chunks som inte längre syns
        activeChunks.forEach((chunkKey) => {
            if (!newActiveChunks.has(chunkKey)) {
                const parts = chunkKey.split(",");
                unloadChunk(parseInt(parts[0], 10), parseInt(parts[1], 10));
            }
        });

        activeChunks = newActiveChunks;
    }

    function loadChunk(cx: number, cy: number): void {
        if (planet.loadChunkData) {
            planet.loadChunkData(cx, cy);
        }
    }

    function unloadChunk(cx: number, cy: number): void {
        if (planet.unloadChunkData) {
            planet.unloadChunkData(cx, cy);
        }
    }

    function destroy(): void {
        if (outlineGraphics) {
            outlineGraphics.destroy();
            outlineGraphics = null;
        }
        activeChunks.clear();
    }

    return {
        init,
        update,
        renderOutline,
        destroy,
    };
}
