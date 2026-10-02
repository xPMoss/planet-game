import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    base: "/planet-game/",
    plugins: [tsconfigPaths()],
    build: {
        outDir: "docs",
        emptyOutDir: true,
    },
});
