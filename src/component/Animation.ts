export interface AnimationFrame {
  spriteX: number;
  spriteY: number;
  spriteWidth: number;
  spriteHeight: number;
}

export class Animation {
  readonly animationFrames: AnimationFrame[];

  frameRate: number;
  currentAnimationFrameIndex: number = 0;
  timeSinceLastFrame: number = 0;

  constructor(animationFrames: AnimationFrame[], frameRate: number = 10) {
    this.animationFrames = animationFrames;
    this.frameRate = frameRate;
  }

  getCurrentAnimationFrame() {
    return this.animationFrames[this.currentAnimationFrameIndex];
  }
}
