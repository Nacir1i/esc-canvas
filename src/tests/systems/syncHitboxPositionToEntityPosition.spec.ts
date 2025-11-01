import { describe, expect, test } from "vitest";
import { syncHitboxPositionToEntityPosition } from "../../system/syncHitboxPositionToEntityPosition";
import { Scene } from "../../libs/Scene";
import { Hitbox } from "../../component/Hitbox";
import { Transform } from "../../component/Transform";

describe("Sync hitbox position to entity position system test suits", () => {
  test("should sync hitbox position to entity transform position", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const hitbox = new Hitbox(0, 0, 10, 10);
    const transform = new Transform(100, 200, 0);
    scene.registerComponents(entityId, [hitbox, transform]);

    syncHitboxPositionToEntityPosition(scene);

    expect(hitbox.x).toBe(transform.x);
    expect(hitbox.y).toBe(transform.y);
  });

  test("should sync positions for multiple entities", () => {
    const scene = new Scene();
    const entity1Id = "entity1";
    const entity2Id = "entity2";

    const hitbox1 = new Hitbox(0, 0, 10, 10);
    const transform1 = new Transform(10, 20, 0);
    scene.registerComponents(entity1Id, [hitbox1, transform1]);

    const hitbox2 = new Hitbox(0, 0, 10, 10);
    const transform2 = new Transform(30, 40, 0);
    scene.registerComponents(entity2Id, [hitbox2, transform2]);

    syncHitboxPositionToEntityPosition(scene);

    expect(hitbox1.x).toBe(transform1.x);
    expect(hitbox1.y).toBe(transform1.y);
    expect(hitbox2.x).toBe(transform2.x);
    expect(hitbox2.y).toBe(transform2.y);
  });

  test("should not change position if already synced", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const hitbox = new Hitbox(50, 60, 10, 10);
    const transform = new Transform(50, 60, 0);
    scene.registerComponents(entityId, [hitbox, transform]);

    syncHitboxPositionToEntityPosition(scene);

    expect(hitbox.x).toBe(50);
    expect(hitbox.y).toBe(60);
  });
});
