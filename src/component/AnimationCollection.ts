import type { Animation } from "./Animation";

export class AnimationCollection {
  readonly animations: Record<string, Animation>;

  constructor(animations: Record<string, Animation>) {
    this.animations = animations;
  }

  getAnimation(state: string) {
    const selectedAnimation = this.animations[state];
    if (!selectedAnimation)
      throw new Error(`Invalid animation state: ${state}`);

    return selectedAnimation;
  }
}
