import { describe, expect, test } from "vitest";
import { movement } from "../../system/movement";

import { Scene } from "../../libs/Scene";
import { Velocity } from "../../component/Velocity";
import { Transform } from "../../component/Transform";

const ENTITY_ID = "id";
const DELTA_TIME = 0.01667; // simulating a smooth 60 fps

describe("Movement system test suits", () => {
  test("should move an entity to the right", () => {
    const scene = new Scene();

    const velocity = new Velocity(10, 0, 100);
    const transform = new Transform(0, 0, 0);

    scene.registerComponents(ENTITY_ID, [velocity, transform]);
    movement(scene, DELTA_TIME);

    const updatedTransform = scene.componentMaps.Transform.get(ENTITY_ID)!;

    const expectedX = velocity.x * velocity.speed * DELTA_TIME;

    expect(updatedTransform.y).toBe(0);
    expect(updatedTransform.x).toBe(expectedX);
  });
  test("should move an entity to the left", () => {
    const scene = new Scene();

    const velocity = new Velocity(-10, 0, 100);
    const transform = new Transform(0, 0, 0);

    scene.registerComponents(ENTITY_ID, [velocity, transform]);
    movement(scene, DELTA_TIME);

    const updatedTransform = scene.componentMaps.Transform.get(ENTITY_ID)!;

    const expectedX = velocity.x * velocity.speed * DELTA_TIME;

    expect(updatedTransform.y).toBe(0);
    expect(updatedTransform.x).toBe(expectedX);
  });
  test("should move an entity to the bottom", () => {
    const scene = new Scene();

    const velocity = new Velocity(0, 10, 100);
    const transform = new Transform(0, 0, 0);

    scene.registerComponents(ENTITY_ID, [velocity, transform]);
    movement(scene, DELTA_TIME);

    const updatedTransform = scene.componentMaps.Transform.get(ENTITY_ID)!;

    const expectedY = velocity.y * velocity.speed * DELTA_TIME;

    expect(updatedTransform.y).toBe(expectedY);
    expect(updatedTransform.x).toBe(0);
  });
  test("should move a entity to the top", () => {
    const scene = new Scene();

    const velocity = new Velocity(0, -10, 100);
    const transform = new Transform(0, 0, 0);

    scene.registerComponents(ENTITY_ID, [velocity, transform]);
    movement(scene, DELTA_TIME);

    const updatedTransform = scene.componentMaps.Transform.get(ENTITY_ID)!;

    const expectedY = velocity.y * velocity.speed * DELTA_TIME;

    expect(updatedTransform.y).toBe(expectedY);
    expect(updatedTransform.x).toBe(0);
  });
  test("should not move an entity with 0 velocity", () => {
    const scene = new Scene();

    const velocity = new Velocity(0, 0, 100);
    const transform = new Transform(0, 0, 0);

    scene.registerComponents(ENTITY_ID, [velocity, transform]);
    movement(scene, DELTA_TIME);

    const updatedTransform = scene.componentMaps.Transform.get(ENTITY_ID)!;

    expect(updatedTransform.y).toBe(0);
    expect(updatedTransform.x).toBe(0);
  });
});
