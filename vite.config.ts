import { defineConfig } from "vite";

export default defineConfig({
    base: "/planet-game/",
    build: {
        outDir: "docs",
        emptyOutDir: true,
    },
});
