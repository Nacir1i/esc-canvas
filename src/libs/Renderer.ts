import type { SpriteSheetLoader } from "./SpriteSheetLoader";
import type { Scene } from "./Scene";

export class Renderer {
  private canvasWidth;
  private canvasHeight;
  private readonly canvasContext: CanvasRenderingContext2D;

  assetsManager: SpriteSheetLoader;

  readonly staggerFrames = 10;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    canvasContext: CanvasRenderingContext2D,
    assetsManager: SpriteSheetLoader
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
    this.renderRectangles(scene);
    this.renderTexts(scene);
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

    this.canvasContext.strokeStyle = "yellow";
    for (const entityId of hitboxEntities) {
      const entityHitbox = scene.componentMaps.Hitbox.get(entityId)!;

      this.canvasContext.strokeRect(
        entityHitbox.x,
        entityHitbox.y,
        entityHitbox.width,
        entityHitbox.height
      );
    }
  }

  private renderRectangles(scene: Scene) {
    const rectangleEntities = scene.query([
      "Dimensions",
      "Transform",
      "Rectangle",
    ]);

    for (const entityId of rectangleEntities) {
      const entityTransform = scene.componentMaps.Transform.get(entityId)!;
      const entityRectangle = scene.componentMaps.Rectangle.get(entityId)!;
      const entityDimensions = scene.componentMaps.Dimensions.get(entityId)!;

      this.canvasContext.fillStyle = entityRectangle.color;
      this.canvasContext.fillRect(
        entityTransform.x,
        entityTransform.y,
        entityDimensions.width,
        entityDimensions.height
      );
    }
  }

  private renderTexts(scene: Scene) {
    const textEntities = scene.query(["Text", "Transform"]);

    for (const entityId of textEntities) {
      const entityText = scene.componentMaps.Text.get(entityId)!;
      const entityTransform = scene.componentMaps.Transform.get(entityId)!;

      this.canvasContext.fillStyle = entityText.color;
      this.canvasContext.font = entityText.font;
      this.canvasContext.fillText(
        entityText.content,
        entityTransform.x,
        entityTransform.y
      );
    }
  }
}
