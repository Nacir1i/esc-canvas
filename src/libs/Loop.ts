import type { Renderer } from "./Renderer";
import type { Scene } from "./Scene";

export class Loop {
  private isRunning: boolean = false;

  lastTime = 0;
  private scene: Scene;
  private renderer: Renderer;

  constructor(scene: Scene, renderer: Renderer) {
    this.scene = scene;
    this.renderer = renderer;
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.tick(this.lastTime);
  }

  public end() {
    this.isRunning = false;
  }

  public tick(currentTime: number) {
    if (!this.isRunning) return;

    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.scene.update(deltaTime);

    this.renderer.render(this.scene, deltaTime);

    requestAnimationFrame(this.tick.bind(this));
  }
}
