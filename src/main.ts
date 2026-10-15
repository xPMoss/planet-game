import { gameEngine } from "./game/GameEngine";
import { MainScene, DebugScene, SpaceScene } from "scenes";

async function bootstrap() {
    const container = document.getElementById("game-container");
    if (!container) return;

    await gameEngine.init(container);

    //const debugScene = new DebugScene(gameEngine.app, gameEngine.world, gameEngine.stageContainer);
    const mainScene = new MainScene(gameEngine.app, gameEngine.world, gameEngine.stageContainer);
    //const spaceScene = new SpaceScene(gameEngine.app, gameEngine.world, gameEngine.stageContainer);
    mainScene.start();
}

bootstrap();
