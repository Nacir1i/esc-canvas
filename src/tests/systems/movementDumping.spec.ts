import { describe, expect, test } from "vitest";
import { movementDumping } from "../../system/movementDumping";
import { Scene } from "../../libs/Scene";
import { Velocity } from "../../component/Velocity";

const movementDumpingValue = 0.7;

describe("Movement dumping system test suits", () => {
  test("should dump entity velocity", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const velocity = new Velocity(10, 20, 100);
    scene.registerComponents(entityId, [velocity]);

    movementDumping(scene);

    expect(velocity.x).toBe(10 * movementDumpingValue);
    expect(velocity.y).toBe(20 * movementDumpingValue);
  });

  test("should not change zero velocity", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const velocity = new Velocity(0, 0, 100);
    scene.registerComponents(entityId, [velocity]);

    movementDumping(scene);

    expect(velocity.x).toBe(0);
    expect(velocity.y).toBe(0);
  });

  test("should dump velocity for multiple entities", () => {
    const scene = new Scene();
    const entity1Id = "entity1";
    const entity2Id = "entity2";

    const velocity1 = new Velocity(10, 20, 100);
    scene.registerComponents(entity1Id, [velocity1]);

    const velocity2 = new Velocity(30, 40, 100);
    scene.registerComponents(entity2Id, [velocity2]);

    movementDumping(scene);

    expect(velocity1.x).toBe(10 * movementDumpingValue);
    expect(velocity1.y).toBe(20 * movementDumpingValue);
    expect(velocity2.x).toBe(30 * movementDumpingValue);
    expect(velocity2.y).toBe(40 * movementDumpingValue);
  });
});
