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
    this.renderHitboxes(scene);
  }

  private renderFrame(scene: Scene) {
    const assetEntities = scene.query([
      "State",
      "Transform",
      "Dimensions",
      "AnimationCollection",
    ]);

    for (const entityId of assetEntities) {
      const entityState = scene.componentMaps.State.get(entityId)!;
      const entityTransform = scene.componentMaps.Transform.get(entityId)!;
      const entityDimensions = scene.componentMaps.Dimensions.get(entityId)!;
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
        entityDimensions.width,
        entityDimensions.height
      );
    }
  }

  private renderHitboxes(scene: Scene) {
    const hitboxEntities = scene.query(["Hitbox"]);

    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d")!;

    const patternSize = 10;
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;

    patternCtx.strokeStyle = "#99ff00ff";
    patternCtx.lineWidth = 2;
    patternCtx.beginPath();
    patternCtx.moveTo(0, 0);
    patternCtx.lineTo(patternSize, patternSize);
    patternCtx.stroke();

    for (const entityId of hitboxEntities) {
      const entityHitbox = scene.componentMaps.Hitbox.get(entityId)!;

      const fillPattern = this.canvasContext.createPattern(
        patternCanvas,
        "repeat"
      )!;

      const rectX = entityHitbox.x;
      const rectY = entityHitbox.y;
      const rectWidth = entityHitbox.width;
      const rectHeight = entityHitbox.height;

      this.canvasContext.fillStyle = fillPattern;
      this.canvasContext.fillRect(rectX, rectY, rectWidth, rectHeight);
    }
  }
}
