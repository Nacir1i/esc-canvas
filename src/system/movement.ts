import type { Scene } from "../libs/Scene";

export function movement(scene: Scene, deltaTime: number) {
  const entityIds = scene.query(["Transform", "Velocity"]);

  if (!entityIds) return;

  for (const entityId of entityIds) {
    const entityVelocity = scene.componentMaps.Velocity.get(entityId)!;
    const entityTransform = scene.componentMaps.Transform.get(entityId)!;

    entityTransform.x += entityVelocity.x * entityVelocity.speed * deltaTime;
    entityTransform.y += entityVelocity.y * entityVelocity.speed * deltaTime;
  }
}
