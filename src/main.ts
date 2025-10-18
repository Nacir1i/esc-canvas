import "./style.css";

import { Loop } from "./libs/Loop";
import { Scene } from "./libs/Scene";
import { Renderer } from "./libs/Renderer";
import { movement } from "./system/movement";
import { animations } from "./system/animations";
import { InputManager } from "./libs/InputManager";
import { createPlayerEntity } from "./entity/player";
import { AssetsManager } from "./libs/AssetsManager";
import { playerMovement } from "./system/playerMovement";
import { movementDumping } from "./system/movementDumping";
import { movementAnimation } from "./system/movementAnimation";
import { syncHitboxPositionToEntityPosition } from "./system/syncHitboxPositionToEntityPosition";

export const CANVAS_WIDTH = 900;
export const CANVAS_HEIGHT = 900;

const player1StartingPosition = {
  x: 10,
  y: 10,
};

async function main() {
  const canvas = document.querySelector<HTMLCanvasElement>("#app");
  if (!canvas) throw new Error("Missing app canvas");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) throw new Error("Missing canvas context");

  const assetsManager = new AssetsManager();

  await assetsManager.loadSprite();

  const inputManager = new InputManager();
  const scene = new Scene(inputManager);
  const renderer = new Renderer(
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    canvasContext,
    assetsManager
  );

  const player = createPlayerEntity(player1StartingPosition);

  scene.registerSystem(playerMovement);
  scene.registerSystem(movementDumping);
  scene.registerSystem(movement);
  scene.registerSystem(syncHitboxPositionToEntityPosition);
  scene.registerSystem(movementAnimation);
  scene.registerSystem(animations);

  scene.registerComponent(player.id, "State", player.state);
  scene.registerComponent(player.id, "Hitbox", player.hitbox);
  scene.registerComponent(player.id, "Velocity", player.velocity);
  scene.registerComponent(player.id, "Transform", player.transform);
  scene.registerComponent(player.id, "Dimensions", player.dimensions);
  scene.registerComponent(player.id, "AnimationCollection", player.animations);

  const loop = new Loop(scene, renderer);

  inputManager.attachListeners();
  loop.start();
}

main();
