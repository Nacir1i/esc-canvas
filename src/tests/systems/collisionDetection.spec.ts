import { describe, expect, test } from "vitest";
import { collisionDetection } from "../../system/collisionDetection";
import { Scene } from "../../libs/Scene";
import { Hitbox } from "../../component/Hitbox";
import { Collisions } from "../../component/Collisions";

const DELTA_TIME = 0;

describe("Collision detection system test suits", () => {
  test("should detect collision between two entities", () => {
    const scene = new Scene();

    const entity1Id = "entity1";
    const entity2Id = "entity2";

    const hitbox1 = new Hitbox(0, 0, 10, 10);
    const collisions1 = new Collisions();
    scene.registerComponents(entity1Id, [hitbox1, collisions1]);

    const hitbox2 = new Hitbox(5, 5, 10, 10);
    const collisions2 = new Collisions();
    scene.registerComponents(entity2Id, [hitbox2, collisions2]);

    collisionDetection(scene, DELTA_TIME);

    expect(collisions1.collidingWith).toContain(entity2Id);
    expect(collisions2.collidingWith).toContain(entity1Id);
  });

  test("should not detect collision when entities are not overlapping", () => {
    const scene = new Scene();
    const entity1Id = "entity1";
    const entity2Id = "entity2";

    const hitbox1 = new Hitbox(0, 0, 10, 10);
    const collisions1 = new Collisions();
    scene.registerComponents(entity1Id, [hitbox1, collisions1]);

    const hitbox2 = new Hitbox(20, 20, 10, 10);
    const collisions2 = new Collisions();
    scene.registerComponents(entity2Id, [hitbox2, collisions2]);

    collisionDetection(scene, DELTA_TIME);

    expect(collisions1.collidingWith).not.toContain(entity2Id);
    expect(collisions2.collidingWith).not.toContain(entity1Id);
  });

  test("should handle multiple entities", () => {
    const scene = new Scene();
    const entity1Id = "entity1";
    const entity2Id = "entity2";
    const entity3Id = "entity3";

    const hitbox1 = new Hitbox(0, 0, 10, 10);
    const collisions1 = new Collisions();
    scene.registerComponents(entity1Id, [hitbox1, collisions1]);

    const hitbox2 = new Hitbox(5, 5, 10, 10);
    const collisions2 = new Collisions();
    scene.registerComponents(entity2Id, [hitbox2, collisions2]);

    const hitbox3 = new Hitbox(20, 20, 10, 10);
    const collisions3 = new Collisions();
    scene.registerComponents(entity3Id, [hitbox3, collisions3]);

    collisionDetection(scene, DELTA_TIME);

    expect(collisions1.collidingWith).toContain(entity2Id);
    expect(collisions2.collidingWith).toContain(entity1Id);
    expect(collisions1.collidingWith).not.toContain(entity3Id);
    expect(collisions3.collidingWith).not.toContain(entity1Id);
    expect(collisions2.collidingWith).not.toContain(entity3Id);
    expect(collisions3.collidingWith).not.toContain(entity2Id);
  });

  test("should clear previous collisions", () => {
    const scene = new Scene();
    const entity1Id = "entity1";
    const entity2Id = "entity2";

    const hitbox1 = new Hitbox(0, 0, 10, 10);
    const collisions1 = new Collisions();
    scene.registerComponents(entity1Id, [hitbox1, collisions1]);

    const hitbox2 = new Hitbox(5, 5, 10, 10);
    const collisions2 = new Collisions();
    scene.registerComponents(entity2Id, [hitbox2, collisions2]);

    // First collision
    collisionDetection(scene, DELTA_TIME);
    expect(collisions1.collidingWith).toContain(entity2Id);
    expect(collisions2.collidingWith).toContain(entity1Id);

    // Move entities apart
    hitbox1.x = 30;
    hitbox1.y = 30;

    // Second collision detection
    collisionDetection(scene, DELTA_TIME);
    expect(collisions1.collidingWith).not.toContain(entity2Id);
    expect(collisions2.collidingWith).not.toContain(entity1Id);
  });
});
