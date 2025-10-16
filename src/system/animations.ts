import type { Animation, AnimationFrame } from "../component/Animation";
import type { Scene } from "../libs/Scene";

export function animations(scene: Scene, deltaTime: number): void {
  const animatedEntities = scene.query(["AnimationCollection", "State"]);

  for (const entityId of animatedEntities) {
    const entityState = scene.componentMaps.State.get(entityId)!;
    const entityAnimations =
      scene.componentMaps.AnimationCollection.get(entityId)!;

    const animation = entityAnimations.getAnimation(entityState.currentState);

    updateAnimation(animation, deltaTime);
  }
}

function updateAnimation(animation: Animation, deltaTime: number) {
  animation.timeSinceLastFrame += deltaTime;
  const frameDuration = 1 / animation.frameRate;

  if (animation.timeSinceLastFrame > frameDuration) {
    animation.timeSinceLastFrame -= frameDuration;
    animation.currentAnimationFrameIndex = incrementCurrentAnimationFrameIndex(
      animation.currentAnimationFrameIndex,
      animation.animationFrames
    );
  }
}

function incrementCurrentAnimationFrameIndex(
  currentAnimationFrameIndex: number,
  frames: AnimationFrame[]
) {
  const isLastIndex = currentAnimationFrameIndex === frames.length - 1;

  if (isLastIndex) {
    return 0;
  } else {
    return currentAnimationFrameIndex + 1;
  }
}
