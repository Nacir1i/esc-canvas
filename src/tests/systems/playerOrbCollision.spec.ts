import { describe, expect, test } from "vitest";
import { playerOrbCollision } from "../../system/playerOrbCollision";
import { Scene } from "../../libs/Scene";
import { Player } from "../../component/Player";
import { Hitbox } from "../../component/Hitbox";
import { Collisions } from "../../component/Collisions";
import { Score } from "../../component/Score";
import { Collectable } from "../../component/Collectable";
import { Orb } from "../../component/Orb";

const DELTA_TIME = 0;

describe("Player orb collision system test suits", () => {
  test("should increase score and remove orb on collision", () => {
    const scene = new Scene();
    const playerId = "player";
    const orbId = "orb";

    const player = new Player();
    const hitbox = new Hitbox(0, 0, 10, 10);
    const collisions = new Collisions();
    const score = new Score();
    scene.registerComponents(playerId, [player, hitbox, collisions, score]);

    const collectable = new Collectable(100);
    const orb = new Orb();
    scene.registerComponents(orbId, [collectable, orb]);

    // Simulate collision
    collisions.collidingWith.push(orbId);

    playerOrbCollision(scene, DELTA_TIME);

    const doesOrbExist = Boolean(scene.componentMaps.Orb.get(orbId));

    expect(score.score).toBe(100);
    expect(doesOrbExist).toBe(false);
  });

  test("should not change score if not colliding with orb", () => {
    const scene = new Scene();
    const playerId = "player";
    const orbId = "other";

    const player = new Player();
    const hitbox = new Hitbox(0, 0, 10, 10);
    const collisions = new Collisions();
    const score = new Score();
    scene.registerComponents(playerId, [player, hitbox, collisions, score]);

    const collectable = new Collectable(100);
    const orb = new Orb();
    scene.registerComponents(orbId, [collectable, orb]);

    playerOrbCollision(scene, DELTA_TIME);

    const doesOrbExist = Boolean(scene.componentMaps.Orb.get(orbId));

    expect(score.score).toBe(0);
    expect(doesOrbExist).toBe(true);
  });

  test("should not change score if not colliding with anything", () => {
    const scene = new Scene();
    const playerId = "player";

    const player = new Player();
    const hitbox = new Hitbox(0, 0, 10, 10);
    const collisions = new Collisions();
    const score = new Score();
    scene.registerComponents(playerId, [player, hitbox, collisions, score]);

    playerOrbCollision(scene, DELTA_TIME);

    expect(score.score).toBe(0);
  });
});
