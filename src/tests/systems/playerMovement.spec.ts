import { describe, expect, test, vi } from "vitest";
import { playerMovement } from "../../system/playerMovement";
import { Scene } from "../../libs/Scene";
import { Velocity } from "../../component/Velocity";
import { Transform } from "../../component/Transform";
import { Dimensions } from "../../component/Dimensions";
import { InputManager } from "../../libs/InputManager";

describe("Player movement system test suits", () => {
  test("should not change velocity if no key is pressed", () => {
    const scene = new Scene();
    const entityId = "player";

    const velocity = new Velocity(0, 0, 100);
    const transform = new Transform(0, 0, 0);
    const dimensions = new Dimensions(10, 10);
    scene.registerComponents(entityId, [velocity, transform, dimensions]);

    const inputManager = new InputManager();
    scene.inputManager = inputManager;

    playerMovement(scene);

    expect(velocity.x).toBe(0);
    expect(velocity.y).toBe(0);
  });

  test("should set velocity x to 1 when D is pressed", () => {
    const scene = new Scene();
    const entityId = "player";

    const velocity = new Velocity(0, 0, 100);
    const transform = new Transform(0, 0, 0);
    const dimensions = new Dimensions(10, 10);
    scene.registerComponents(entityId, [velocity, transform, dimensions]);

    const inputManager = new InputManager();
    vi.spyOn(inputManager, "isKeyPressed").mockImplementation(
      (key: string) => key === "KeyD"
    );
    scene.inputManager = inputManager;

    playerMovement(scene);

    expect(velocity.x).toBe(1);
    expect(velocity.y).toBe(0);
  });

  test("should set velocity x to -1 when A is pressed", () => {
    const scene = new Scene();
    const entityId = "player";

    const velocity = new Velocity(0, 0, 100);
    const transform = new Transform(0, 0, 0);
    const dimensions = new Dimensions(10, 10);
    scene.registerComponents(entityId, [velocity, transform, dimensions]);

    const inputManager = new InputManager();
    vi.spyOn(inputManager, "isKeyPressed").mockImplementation(
      (key: string) => key === "KeyA"
    );
    scene.inputManager = inputManager;

    playerMovement(scene);

    expect(velocity.x).toBe(-1);
    expect(velocity.y).toBe(0);
  });

  test("should set velocity y to -1 when W is pressed", () => {
    const scene = new Scene();
    const entityId = "player";

    const velocity = new Velocity(0, 0, 100);
    const transform = new Transform(0, 0, 0);
    const dimensions = new Dimensions(10, 10);
    scene.registerComponents(entityId, [velocity, transform, dimensions]);

    const inputManager = new InputManager();
    vi.spyOn(inputManager, "isKeyPressed").mockImplementation(
      (key: string) => key === "KeyW"
    );
    scene.inputManager = inputManager;

    playerMovement(scene);

    expect(velocity.x).toBe(0);
    expect(velocity.y).toBe(-1);
  });

  test("should set velocity y to 1 when S is pressed", () => {
    const scene = new Scene();
    const entityId = "player";

    const velocity = new Velocity(0, 0, 100);
    const transform = new Transform(0, 0, 0);
    const dimensions = new Dimensions(10, 10);
    scene.registerComponents(entityId, [velocity, transform, dimensions]);

    const inputManager = new InputManager();
    vi.spyOn(inputManager, "isKeyPressed").mockImplementation(
      (key: string) => key === "KeyS"
    );
    scene.inputManager = inputManager;

    playerMovement(scene);

    expect(velocity.x).toBe(0);
    expect(velocity.y).toBe(1);
  });
});
