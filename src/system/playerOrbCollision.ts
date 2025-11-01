import type { Scene } from "../libs/Scene";

export function playerOrbCollision(scene: Scene, _deltaTime: number) {
  const entityIds = scene.query(["Player", "Hitbox", "Collisions", "Score"]);

  for (const entityId of entityIds) {
    const entityCollisions = scene.componentMaps.Collisions.get(entityId)!;
    const entityScore = scene.componentMaps.Score.get(entityId)!;

    const orbsInEntityCollisions = entityCollisions.collidingWith.filter(
      (id) => {
        return (
          scene.componentMaps.Collectable.has(id) &&
          scene.componentMaps.Orb.has(id)
        );
      }
    );

    orbsInEntityCollisions.forEach((id) => {
      const orbEntity = scene.componentMaps.Collectable.get(id)!;

      entityScore.score += orbEntity.bonusScore;
      scene.removeEntityComponents(id);
    });
  }
}
