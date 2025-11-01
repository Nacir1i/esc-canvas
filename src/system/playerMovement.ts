import type { Scene } from "../libs/Scene";

export function playerMovement(scene: Scene) {
  const entityIds = scene.query(["Transform", "Velocity", "Dimensions"]);

  for (const entityId of entityIds) {
    const entityVelocity = scene.componentMaps.Velocity.get(entityId)!;

    if (scene.inputManager.isKeyPressed("KeyW")) {
      entityVelocity.y = -1;
    }
    if (scene.inputManager.isKeyPressed("KeyS")) {
      entityVelocity.y = 1;
    }
    if (scene.inputManager.isKeyPressed("KeyA")) {
      entityVelocity.x = -1;
    }
    if (scene.inputManager.isKeyPressed("KeyD")) {
      entityVelocity.x = 1;
    }
  }
}
