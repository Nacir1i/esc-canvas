import type { Scene } from "../libs/Scene";

export function syncHitboxPositionToEntityPosition(scene: Scene) {
  const entityIds = scene.query(["Hitbox", "Transform"]);

  for (const entityId of entityIds) {
    const entityHitbox = scene.componentMaps.Hitbox.get(entityId)!;
    const entityTransform = scene.componentMaps.Transform.get(entityId)!;

    entityHitbox.x = entityTransform.x;
    entityHitbox.y = entityTransform.y;
  }
}
