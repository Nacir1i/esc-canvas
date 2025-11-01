import "./style.css";

import { Loop } from "./libs/Loop";
import { Scene } from "./libs/Scene";
import { createOrb } from "./entity/orb";
import { Renderer } from "./libs/Renderer";
import { movement } from "./system/movement";
import { animations } from "./system/animations";
import { createGhostEntity } from "./entity/ghost";
import { createPlayerEntity } from "./entity/player";
import { SpriteSheetLoader } from "./libs/SpriteSheetLoader";
import { createMapBorders } from "./entity/mapBorders";
import { playerMovement } from "./system/playerMovement";
import { createPlayerScore } from "./entity/playerScore";
import { movementDumping } from "./system/movementDumping";
import { movementAnimation } from "./system/movementAnimation";
import { updatePlayerScore } from "./system/updatePlayerScore";
import { collisionDetection } from "./system/collisionDetection";
import { playerOrbCollision } from "./system/playerOrbCollision";
import { handleBlockingCollisions } from "./system/handleBlockingCollisions";
import { syncHitboxPositionToEntityPosition } from "./system/syncHitboxPositionToEntityPosition";

export const CANVAS_WIDTH = 900;
export const CANVAS_HEIGHT = 900;

const player1StartingPosition = {
  x: 20,
  y: 20,
};
const ghostStartingPosition = {
  x: 100,
  y: 100,
};

async function main() {
  const canvas = document.querySelector<HTMLCanvasElement>("#app");
  if (!canvas) throw new Error("Missing app canvas");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) throw new Error("Missing canvas context");

  const assetsManager = new SpriteSheetLoader();

  await assetsManager.loadSprite();

  const scene = new Scene();
  const renderer = new Renderer(
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    canvasContext,
    assetsManager
  );

  const player = createPlayerEntity(player1StartingPosition);
  const ghost = createGhostEntity(ghostStartingPosition);
  const mapBorders = createMapBorders(CANVAS_WIDTH, CANVAS_HEIGHT);
  const orb = createOrb(300, 300);
  const orb2 = createOrb(310, 310);
  const orb3 = createOrb(320, 320);
  const orb4 = createOrb(330, 330);
  const playerScore = createPlayerScore();

  scene.registerSystem(playerMovement);
  scene.registerSystem(movement);
  scene.registerSystem(syncHitboxPositionToEntityPosition);
  scene.registerSystem(collisionDetection);
  scene.registerSystem(playerOrbCollision);
  scene.registerSystem(handleBlockingCollisions);
  scene.registerSystem(movementAnimation);
  scene.registerSystem(animations);
  scene.registerSystem(movementDumping);
  scene.registerSystem(updatePlayerScore);

  mapBorders.forEach((border) => {
    scene.registerComponents(border.id, border.components);
  });
  scene.registerComponents(player.id, player.components);
  scene.registerComponents(ghost.id, ghost.components);
  scene.registerComponents(orb.id, orb.components);
  scene.registerComponents(orb2.id, orb2.components);
  scene.registerComponents(orb3.id, orb3.components);
  scene.registerComponents(orb4.id, orb4.components);
  scene.registerComponents(playerScore.id, playerScore.components);

  const loop = new Loop(scene, renderer);

  scene.inputManager.attachListeners();
  loop.start();
}

main();
