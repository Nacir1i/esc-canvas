import { describe, test, vi, expect, beforeEach } from "vitest";
import type { Scene } from "../../libs/Scene";
import { Renderer } from "../../libs/Renderer";
import type { SpriteSheetLoader } from "../../libs/SpriteSheetLoader";
import { State } from "../../component/State";
import { Animation } from "../../component/Animation";
import { AnimationCollection } from "../../component/AnimationCollection";
import { uuidv7 as uuid } from "uuidv7";
import { Transform } from "../../component/Transform";
import { Dimensions } from "../../component/Dimensions";

type Hitbox = { x: number; y: number; width: number; height: number };
type Rectangle = { color: string };
type Text = { content: string; color: string; font: string };

const mockCanvasContext = {
  fillStyle: "",
  font: "",
  strokeStyle: "",
  clearRect: vi.fn(),
  drawImage: vi.fn(),
  fillText: vi.fn(),
  fillRect: vi.fn(),
  strokeRect: vi.fn(),
} as unknown as CanvasRenderingContext2D;

const mockAssetsManager = {
  sprite: { id: "mock-sprite-sheet" },
} as SpriteSheetLoader;

const createMockScene = (): Scene =>
  ({
    componentMaps: {
      State: new Map(),
      Transform: new Map(),
      Dimensions: new Map(),
      AnimationCollection: new Map(),
      Hitbox: new Map(),
      Rectangle: new Map(),
      Text: new Map(),
    },
    query: vi.fn(() => new Set()),
  } as unknown as Scene);

describe("Renderer test suits", () => {
  let renderer: Renderer;
  let scene: Scene;

  beforeEach(() => {
    vi.clearAllMocks();

    scene = createMockScene();
    renderer = new Renderer(800, 600, mockCanvasContext, mockAssetsManager);
  });

  test("should clear the canvas on every render", () => {
    renderer.render(scene, 0);

    expect(mockCanvasContext.clearRect).toHaveBeenCalledTimes(1);
    expect(mockCanvasContext.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
  });

  test("should render frames (sprites)", () => {
    const entity = createRenderableEntity();
    scene.componentMaps.State.set(entity.id, entity.components.state);
    scene.componentMaps.Transform.set(entity.id, entity.components.transform);
    scene.componentMaps.Dimensions.set(entity.id, entity.components.dimensions);
    scene.componentMaps.AnimationCollection.set(
      entity.id,
      entity.components.animationCollection
    );

    // @ts-expect-error This is a mocked implementation
    scene.query.mockImplementation((components: string[]) => {
      if (components.includes("AnimationCollection")) {
        return new Set([entity.id]);
      }
      return new Set();
    });

    renderer.render(scene, 0);

    const frame = entity.components.animationCollection
      .getAnimation("idle")
      .getCurrentAnimationFrame();

    expect(mockCanvasContext.drawImage).toHaveBeenCalledTimes(1);
    expect(mockCanvasContext.drawImage).toHaveBeenCalledWith(
      mockAssetsManager.sprite,
      frame.spriteX,
      frame.spriteY,
      frame.spriteWidth,
      frame.spriteHeight,
      entity.components.transform.x,
      entity.components.transform.y,
      entity.components.dimensions.width,
      entity.components.dimensions.height
    );
  });

  test("should render hitboxes", () => {
    const entityId = uuid();
    const hitbox: Hitbox = { x: 10, y: 10, width: 50, height: 50 };
    scene.componentMaps.Hitbox.set(entityId, hitbox);

    // @ts-expect-error This is a mocked implementation
    scene.query.mockImplementation((components: string[]) => {
      if (components.includes("Hitbox")) {
        return new Set([entityId]);
      }
      return new Set();
    });

    renderer.render(scene, 0);

    expect(mockCanvasContext.strokeRect).toHaveBeenCalledTimes(1);
    expect(mockCanvasContext.strokeStyle).toBe("yellow");
    expect(mockCanvasContext.strokeRect).toHaveBeenCalledWith(
      hitbox.x,
      hitbox.y,
      hitbox.width,
      hitbox.height
    );
  });

  test("should render rectangles", () => {
    const entityId = uuid();
    const rect: Rectangle = { color: "red" };
    const transform: Transform = new Transform(20, 20, 0);
    const dimensions: Dimensions = new Dimensions(100, 100);

    scene.componentMaps.Rectangle.set(entityId, rect);
    scene.componentMaps.Transform.set(entityId, transform);
    scene.componentMaps.Dimensions.set(entityId, dimensions);

    // @ts-expect-error This is a mocked implementation
    scene.query.mockImplementation((components: string[]) => {
      if (components.includes("Rectangle")) {
        return new Set([entityId]);
      }
      return new Set();
    });

    renderer.render(scene, 0);

    expect(mockCanvasContext.fillRect).toHaveBeenCalledTimes(1);
    expect(mockCanvasContext.fillStyle).toBe(rect.color);
    expect(mockCanvasContext.fillRect).toHaveBeenCalledWith(
      transform.x,
      transform.y,
      dimensions.width,
      dimensions.height
    );
  });

  test("should render texts", () => {
    const entityId = uuid();
    const text: Text = {
      content: "Hello ECS",
      color: "blue",
      font: "16px Arial",
    };
    const transform: Transform = new Transform(30, 30, 0);

    scene.componentMaps.Text.set(entityId, text);
    scene.componentMaps.Transform.set(entityId, transform);

    // @ts-expect-error This is a mocked implementation
    scene.query.mockImplementation((components: string[]) => {
      if (components.includes("Text")) {
        return new Set([entityId]);
      }
      return new Set();
    });

    renderer.render(scene, 0);

    expect(mockCanvasContext.fillText).toHaveBeenCalledTimes(1);
    expect(mockCanvasContext.fillStyle).toBe(text.color);
    expect(mockCanvasContext.font).toBe(text.font);
    expect(mockCanvasContext.fillText).toHaveBeenCalledWith(
      text.content,
      transform.x,
      transform.y
    );
  });

  test("should render all types of entities in one frame", () => {
    const frameEntity = createRenderableEntity();
    scene.componentMaps.State.set(frameEntity.id, frameEntity.components.state);
    scene.componentMaps.Transform.set(
      frameEntity.id,
      frameEntity.components.transform
    );
    scene.componentMaps.Dimensions.set(
      frameEntity.id,
      frameEntity.components.dimensions
    );
    scene.componentMaps.AnimationCollection.set(
      frameEntity.id,
      frameEntity.components.animationCollection
    );

    const hitboxEntityId = uuid();
    const hitbox: Hitbox = { x: 10, y: 10, width: 50, height: 50 };
    scene.componentMaps.Hitbox.set(hitboxEntityId, hitbox);

    const rectEntityId = uuid();
    const rect: Rectangle = { color: "red" };
    const rectTransform: Transform = new Transform(20, 20, 0);
    const rectDimensions: Dimensions = new Dimensions(100, 100);
    scene.componentMaps.Rectangle.set(rectEntityId, rect);
    scene.componentMaps.Transform.set(rectEntityId, rectTransform);
    scene.componentMaps.Dimensions.set(rectEntityId, rectDimensions);

    const textEntityId = uuid();
    const text: Text = {
      content: "Hello ECS",
      color: "blue",
      font: "16px Arial",
    };
    const textTransform: Transform = new Transform(30, 30, 0);
    scene.componentMaps.Text.set(textEntityId, text);
    scene.componentMaps.Transform.set(textEntityId, textTransform);

    // @ts-expect-error This is a mocked implementation
    scene.query.mockImplementation((components: string[]) => {
      if (components.includes("AnimationCollection"))
        return new Set([frameEntity.id]);
      if (components.includes("Hitbox")) return new Set([hitboxEntityId]);
      if (components.includes("Rectangle")) return new Set([rectEntityId]);
      if (components.includes("Text")) return new Set([textEntityId]);
      return new Set();
    });

    renderer.render(scene, 0);

    expect(mockCanvasContext.clearRect).toHaveBeenCalledTimes(1);
    expect(mockCanvasContext.drawImage).toHaveBeenCalledTimes(1);
    expect(mockCanvasContext.strokeRect).toHaveBeenCalledTimes(1);
    expect(mockCanvasContext.fillRect).toHaveBeenCalledTimes(1);
    expect(mockCanvasContext.fillText).toHaveBeenCalledTimes(1);
  });
});

function createRenderableEntity() {
  const id = uuid();

  const animationFrames = [
    {
      spriteX: 0,
      spriteY: 0,
      spriteWidth: 16,
      spriteHeight: 16,
    },
  ];
  const animations = new Animation(animationFrames, 1);
  const animationCollection = new AnimationCollection({ idle: animations });
  const state = new State("idle");
  const transform = new Transform(10, 10, 0);
  const dimensions = new Dimensions(32, 32);

  return {
    id,
    components: {
      state,
      transform,
      dimensions,
      animationCollection,
    },
  };
}
