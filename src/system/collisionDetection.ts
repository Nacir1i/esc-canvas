import type { Scene } from "../libs/Scene";

export function collisionDetection(scene: Scene, _deltaTime: number) {
  const entityIds = scene.query(["Hitbox", "Collisions"]);

  clearCollisions(scene, entityIds);

  for (let i = 0; i < entityIds.length; i++) {
    const entityId = entityIds[i];

    const entityHitbox = scene.componentMaps.Hitbox.get(entityId)!;
    const entityCollisions = scene.componentMaps.Collisions.get(entityId)!;

    for (let j = i + 1; j < entityIds.length; j++) {
      const entityToCheckId = entityIds[j];

      const entityToCheckHitbox =
        scene.componentMaps.Hitbox.get(entityToCheckId)!;
      const entityToCheckCollisions =
        scene.componentMaps.Collisions.get(entityToCheckId)!;

      const areHitboxesColliding =
        entityHitbox.x < entityToCheckHitbox.x + entityToCheckHitbox.width &&
        entityHitbox.x + entityHitbox.width > entityToCheckHitbox.x &&
        entityHitbox.y < entityToCheckHitbox.y + entityToCheckHitbox.height &&
        entityHitbox.y + entityHitbox.height > entityToCheckHitbox.y;

      if (areHitboxesColliding) {
        entityCollisions.collidingWith.push(entityToCheckId);
        entityToCheckCollisions.collidingWith.push(entityId);
      }
    }
  }
}

function clearCollisions(scene: Scene, entityIds: string[]) {
  entityIds.forEach((id) => {
    const entityCollisions = scene.componentMaps.Collisions.get(id)!;

    entityCollisions.collidingWith = [];
  });
}
