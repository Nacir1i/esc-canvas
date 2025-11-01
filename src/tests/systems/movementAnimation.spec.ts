import { describe, expect, test } from "vitest";
import { movementAnimation } from "../../system/movementAnimation";
import { Scene } from "../../libs/Scene";
import { Velocity } from "../../component/Velocity";
import { State } from "../../component/State";
import { AnimationCollection } from "../../component/AnimationCollection";

const DELTA_TIME = 0;

describe("Movement animation system test suits", () => {
  test("should not change state if velocity is zero", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const velocity = new Velocity(0, 0, 100);
    const state = new State("idle");
    const animations = new AnimationCollection({});

    scene.registerComponents(entityId, [velocity, state, animations]);

    movementAnimation(scene, DELTA_TIME);

    expect(state.currentState).toBe("idle");
  });

  test("should change state to moving-right", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const velocity = new Velocity(1, 0, 100);
    const state = new State("idle");
    const animations = new AnimationCollection({});

    scene.registerComponents(entityId, [velocity, state, animations]);

    movementAnimation(scene, DELTA_TIME);

    expect(state.currentState).toBe("moving-right");
    expect(state.previousState).toBe("idle");
  });

  test("should change state to moving-left", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const velocity = new Velocity(-1, 0, 100);
    const state = new State("idle");
    const animations = new AnimationCollection({});

    scene.registerComponents(entityId, [velocity, state, animations]);

    movementAnimation(scene, DELTA_TIME);

    expect(state.currentState).toBe("moving-left");
    expect(state.previousState).toBe("idle");
  });

  test("should change state to moving-up", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const velocity = new Velocity(0, -1, 100);
    const state = new State("idle");
    const animations = new AnimationCollection({});

    scene.registerComponents(entityId, [velocity, state, animations]);

    movementAnimation(scene, DELTA_TIME);

    expect(state.currentState).toBe("moving-up");
    expect(state.previousState).toBe("idle");
  });

  test("should change state to moving-down", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const velocity = new Velocity(0, 1, 100);
    const state = new State("idle");
    const animations = new AnimationCollection({});

    scene.registerComponents(entityId, [velocity, state, animations]);

    movementAnimation(scene, DELTA_TIME);

    expect(state.currentState).toBe("moving-down");
    expect(state.previousState).toBe("idle");
  });

  test("should prioritize vertical movement when y is greater than x", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const velocity = new Velocity(0.5, 1, 100);
    const state = new State("idle");
    const animations = new AnimationCollection({});

    scene.registerComponents(entityId, [velocity, state, animations]);

    movementAnimation(scene, DELTA_TIME);

    expect(state.currentState).toBe("moving-down");
  });

  test("should prioritize horizontal movement when x is greater than y", () => {
    const scene = new Scene();
    const entityId = "entity1";

    const velocity = new Velocity(1, 0.5, 100);
    const state = new State("idle");
    const animations = new AnimationCollection({});

    scene.registerComponents(entityId, [velocity, state, animations]);

    movementAnimation(scene, DELTA_TIME);

    expect(state.currentState).toBe("moving-right");
  });
});
