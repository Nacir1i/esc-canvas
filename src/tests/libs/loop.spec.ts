import { beforeEach, describe, expect, test, vi } from "vitest";

import { Loop } from "../../libs/Loop";
import { Scene } from "../../libs/Scene";
import { Renderer } from "../../libs/Renderer";
import type { SpriteSheetLoader } from "../../libs/SpriteSheetLoader";

vi.stubGlobal("requestAnimationFrame", vi.fn());
vi.mock("../../libs/Scene.ts", () => {
  const Scene = vi.fn(
    class {
      update = vi.fn();
    }
  );

  return { Scene };
});
vi.mock("../../libs/Renderer.ts", () => {
  const Renderer = vi.fn(
    class {
      render = vi.fn();
    }
  );

  return { Renderer };
});

describe("Loop test suits", () => {
  let scene: Scene;
  let render: Renderer;
  let loop: Loop;

  beforeEach(() => {
    vi.clearAllMocks();

    scene = new Scene();
    render = new Renderer(
      0,
      0,
      null as unknown as CanvasRenderingContext2D,
      null as unknown as SpriteSheetLoader
    );
    loop = new Loop(scene, render);
  });

  test("should run tick correctly", () => {
    const loop = new Loop(scene, render);

    loop.start();

    expect(scene.update).toBeCalled();
    expect(requestAnimationFrame).toBeCalled();
  });
  test("should not run tick if isRunning is false", () => {
    const loop = new Loop(scene, render);

    loop.tick(0);

    expect(scene.update).toBeCalledTimes(0);
    expect(requestAnimationFrame).toBeCalledTimes(0);
  });
});
