import type { Scene } from "../libs/Scene";

const movementDumpingValue = 0.7;

export function movementDumping(scene: Scene) {
  const entityIds = scene.query(["Velocity"]);

  for (const entityId of entityIds) {
    const entityVelocity = scene.componentMaps.Velocity.get(entityId)!;

    entityVelocity.x *= movementDumpingValue;
    entityVelocity.y *= movementDumpingValue;
  }
}
