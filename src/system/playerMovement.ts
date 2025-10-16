import type { Scene } from "../libs/Scene";

export function playerMovement(scene: Scene) {
  const entityIds = scene.query(["Transform", "Velocity", "Dimensions"]);

  for (const entityId of entityIds) {
    const entityVelocity = scene.componentMaps.Velocity.get(entityId)!;

    if (scene.inputManager.isKeyPressed("KeyW")) {
      entityVelocity.y = -entityVelocity.speed;
    }
    if (scene.inputManager.isKeyPressed("KeyS")) {
      entityVelocity.y = entityVelocity.speed;
    }
    if (scene.inputManager.isKeyPressed("KeyA")) {
      entityVelocity.x = -entityVelocity.speed;
    }
    if (scene.inputManager.isKeyPressed("KeyD")) {
      entityVelocity.x = entityVelocity.speed;
    }
  }
}
