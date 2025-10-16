import type { Scene } from "../libs/Scene";

export function movementAnimation(scene: Scene, _deltaTime: number) {
  const entityIds = scene.query(["Velocity", "State", "AnimationCollection"]);

  for (const entityId of entityIds) {
    const entityState = scene.componentMaps.State.get(entityId)!;
    const entityVelocity = scene.componentMaps.Velocity.get(entityId)!;

    let newState = entityState.currentState;

    const isHorizontalMoreDominant =
      Math.abs(entityVelocity.y) - Math.abs(entityVelocity.x) > 0
        ? true
        : false;

    if (isHorizontalMoreDominant) {
      if (entityVelocity.y > 0) {
        newState = "moving-down";
      } else if (entityVelocity.y < 0) {
        newState = "moving-up";
      }
    } else {
      if (entityVelocity.x > 0) {
        newState = "moving-right";
      } else if (entityVelocity.x < 0) {
        newState = "moving-left";
      }
    }

    if (newState !== entityState.currentState) {
      entityState.previousState = entityState.currentState;
      entityState.currentState = newState;
    }
  }
}
