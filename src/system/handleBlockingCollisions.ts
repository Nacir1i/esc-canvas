import type { Scene } from "../libs/Scene";

export function handleBlockingCollisions(scene: Scene, _deltaTime: number) {
  const entityIds = scene.query([
    "LastValidPosition",
    "Transform",
    "Collisions",
    "Hitbox",
  ]);

  for (const entityId of entityIds) {
    const entityTransform = scene.componentMaps.Transform.get(entityId)!;
    const entityCollisions = scene.componentMaps.Collisions.get(entityId)!;
    const entityLastValidPosition =
      scene.componentMaps.LastValidPosition.get(entityId)!;
    const entityHitbox = scene.componentMaps.Hitbox.get(entityId)!;

    const blockingEntities = entityCollisions.collidingWith.filter((id) =>
      scene.componentMaps.Block.has(id)
    );

    if (blockingEntities.length === 0) {
      entityLastValidPosition.x = entityTransform.x;
      entityLastValidPosition.y = entityTransform.y;
      continue;
    }

    let resolvedX = entityTransform.x;
    let resolvedY = entityTransform.y;

    let wouldCollideOnX = false;
    for (const blockingId of blockingEntities) {
      const blockingHitbox = scene.componentMaps.Hitbox.get(blockingId)!;
      if (
        entityTransform.x < blockingHitbox.x + blockingHitbox.width &&
        entityTransform.x + entityHitbox.width > blockingHitbox.x &&
        entityLastValidPosition.y < blockingHitbox.y + blockingHitbox.height &&
        entityLastValidPosition.y + entityHitbox.height > blockingHitbox.y
      ) {
        wouldCollideOnX = true;
        break;
      }
    }

    let wouldCollideOnY = false;
    for (const blockingId of blockingEntities) {
      const blockingHitbox = scene.componentMaps.Hitbox.get(blockingId)!;
      if (
        entityLastValidPosition.x < blockingHitbox.x + blockingHitbox.width &&
        entityLastValidPosition.x + entityHitbox.width > blockingHitbox.x &&
        entityTransform.y < blockingHitbox.y + blockingHitbox.height &&
        entityTransform.y + entityHitbox.height > blockingHitbox.y
      ) {
        wouldCollideOnY = true;
        break;
      }
    }

    if (wouldCollideOnX) {
      resolvedX = entityLastValidPosition.x;
    }

    if (wouldCollideOnY) {
      resolvedY = entityLastValidPosition.y;
    }

    if (!wouldCollideOnX && !wouldCollideOnY) {
      resolvedX = entityLastValidPosition.x;
      resolvedY = entityLastValidPosition.y;
    }

    entityTransform.x = resolvedX;
    entityTransform.y = resolvedY;

    // entityLastValidPosition.x = resolvedX;
    // entityLastValidPosition.y = resolvedY;
  }
}
