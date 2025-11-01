import { describe, expect, test } from "vitest";
import { handleBlockingCollisions } from "../../system/handleBlockingCollisions";
import { Scene } from "../../libs/Scene";
import { LastValidPosition } from "../../component/LastValidPosition";
import { Transform } from "../../component/Transform";
import { Collisions } from "../../component/Collisions";
import { Hitbox } from "../../component/Hitbox";
import { Block } from "../../component/Block";

const DELTA_TIME = 0;

describe("Handle blocking collisions system test suits", () => {
  test("should update last valid position when no collision", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const lastValidPosition = new LastValidPosition(0, 0);
    const transform = new Transform(10, 10, 0);
    const collisions = new Collisions();
    const hitbox = new Hitbox(10, 10, 10, 10);
    scene.registerComponents(entityId, [
      lastValidPosition,
      transform,
      collisions,
      hitbox,
    ]);

    handleBlockingCollisions(scene, DELTA_TIME);

    expect(lastValidPosition.x).toBe(10);
    expect(lastValidPosition.y).toBe(10);
  });

  test("should resolve collision on X axis", () => {
    const scene = new Scene();
    const entityId = "entity1";
    const blockerId = "blocker";

    const lastValidPosition = new LastValidPosition(0, 0);
    const transform = new Transform(5, 0, 0);
    const collisions = new Collisions();
    const hitbox = new Hitbox(5, 0, 10, 10);
    scene.registerComponents(entityId, [
      lastValidPosition,
      transform,
      collisions,
      hitbox,
    ]);

    const block = new Block();
    const blockerHitbox = new Hitbox(10, 0, 10, 10);
    scene.registerComponents(blockerId, [block, blockerHitbox]);

    // Simulate collision
    collisions.collidingWith.push(blockerId);

    handleBlockingCollisions(scene, DELTA_TIME);

    expect(transform.x).toBe(lastValidPosition.x);
    expect(transform.y).toBe(transform.y); // Y should not change
  });

  test("should resolve collision on Y axis", () => {
    const scene = new Scene();
    const entityId = "entity1";
    const blockerId = "blocker";

    const lastValidPosition = new LastValidPosition(0, 0);
    const transform = new Transform(0, 5, 0);
    const collisions = new Collisions();
    const hitbox = new Hitbox(0, 5, 10, 10);
    scene.registerComponents(entityId, [
      lastValidPosition,
      transform,
      collisions,
      hitbox,
    ]);

    const block = new Block();
    const blockerHitbox = new Hitbox(0, 10, 10, 10);
    scene.registerComponents(blockerId, [block, blockerHitbox]);

    // Simulate collision
    collisions.collidingWith.push(blockerId);

    handleBlockingCollisions(scene, DELTA_TIME);

    expect(transform.y).toBe(lastValidPosition.y);
    expect(transform.x).toBe(transform.x); // X should not change
  });

  test("should resolve corner collision", () => {
    const scene = new Scene();
    const entityId = "entity1";
    const blockerId = "blocker";

    const lastValidPosition = new LastValidPosition(0, 0);
    const transform = new Transform(5, 5, 0);
    const collisions = new Collisions();
    const hitbox = new Hitbox(5, 5, 10, 10);
    scene.registerComponents(entityId, [
      lastValidPosition,
      transform,
      collisions,
      hitbox,
    ]);

    const block = new Block();
    const blockerHitbox = new Hitbox(10, 10, 10, 10);
    scene.registerComponents(blockerId, [block, blockerHitbox]);

    // Simulate collision
    collisions.collidingWith.push(blockerId);

    handleBlockingCollisions(scene, DELTA_TIME);

    expect(transform.x).toBe(lastValidPosition.x);
    expect(transform.y).toBe(lastValidPosition.y);
  });
});
