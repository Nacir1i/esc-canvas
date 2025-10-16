import type { AssetsManager } from "./AssetsManager";
import type { Scene } from "./Scene";

export class Renderer {
  private canvasWidth;
  private canvasHeight;
  private readonly canvasContext: CanvasRenderingContext2D;

  assetsManager: AssetsManager;

  readonly staggerFrames = 10;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    canvasContext: CanvasRenderingContext2D,
    assetsManager: AssetsManager
  ) {
    this.canvasContext = canvasContext;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.assetsManager = assetsManager;
  }

  public render(scene: Scene, _deltaTime: number) {
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.renderFrame(scene);
  }

  private renderFrame(scene: Scene) {
    const assetEntities = scene.query([
      "Transform",
      "Dimensions",
      "AnimationCollection",
      "State",
    ]);

    for (const entityId of assetEntities) {
      const entityState = scene.componentMaps.State.get(entityId)!;
      // const entityDimensions = scene.componentMaps.Dimensions.get(entityId)!;
      const entityTransform = scene.componentMaps.Transform.get(entityId)!;
      const entityAnimations =
        scene.componentMaps.AnimationCollection.get(entityId)!;

      const animation = entityAnimations.getAnimation(entityState.currentState);

      const animationFrame = animation.getCurrentAnimationFrame();

      this.canvasContext.drawImage(
        this.assetsManager.sprite,
        animationFrame.spriteX,
        animationFrame.spriteY,
        animationFrame.spriteWidth,
        animationFrame.spriteHeight,
        entityTransform.x,
        entityTransform.y,
        animationFrame.spriteWidth,
        animationFrame.spriteHeight
      );
    }
  }
}
