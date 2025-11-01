import { describe, expect, test } from "vitest";
import { animations } from "../../system/animations";
import { Scene } from "../../libs/Scene";
import { Animation, type AnimationFrame } from "../../component/Animation";
import { AnimationCollection } from "../../component/AnimationCollection";
import { State } from "../../component/State";

const ENTITY_ID = "id";
const DELTA_TIME = 0.01667; // simulating a smooth 60 fps (delta time in seconds)

const animationFrames: AnimationFrame[] = [
  {
    spriteX: 0,
    spriteY: 0,
    spriteWidth: 0,
    spriteHeight: 0,
  },
  {
    spriteX: 0,
    spriteY: 0,
    spriteWidth: 0,
    spriteHeight: 0,
  },
  {
    spriteX: 0,
    spriteY: 0,
    spriteWidth: 0,
    spriteHeight: 0,
  },
  {
    spriteX: 0,
    spriteY: 0,
    spriteWidth: 0,
    spriteHeight: 0,
  },
];

describe("Animation system test suits", () => {
  test("should not update animation frame when not enough frame time passed", () => {
    const scene = new Scene();

    const animationFrameRate = 1;
    const idleAnimations = new Animation(animationFrames, animationFrameRate);
    const animationsCollection = new AnimationCollection({
      idle: idleAnimations,
    });
    const state = new State("idle");

    scene.registerComponents(ENTITY_ID, [animationsCollection, state]);

    // We create a baseline for animation state before testing its update
    expect(idleAnimations.timeSinceLastFrame).toBe(0);
    expect(idleAnimations.currentAnimationFrameIndex).toBe(0);

    animations(scene, DELTA_TIME);

    const updatedAnimation = scene.componentMaps.AnimationCollection.get(
      ENTITY_ID
    )!.getAnimation(state.currentState);

    // Checking it the updated happened correctly
    expect(updatedAnimation.currentAnimationFrameIndex).toBe(0);
  });

  test("should update animation frame", () => {
    const scene = new Scene();

    const animationFrameRate = 1;
    const idleAnimations = new Animation(animationFrames, animationFrameRate);
    const animationsCollection = new AnimationCollection({
      idle: idleAnimations,
    });
    const state = new State("idle");

    scene.registerComponents(ENTITY_ID, [animationsCollection, state]);

    // We create a baseline for animation state before testing its update
    expect(idleAnimations.timeSinceLastFrame).toBe(0);
    expect(idleAnimations.currentAnimationFrameIndex).toBe(0);

    const deltaTimeAfter61Cycles = DELTA_TIME * 61;
    animations(scene, deltaTimeAfter61Cycles);

    const updatedAnimation = scene.componentMaps.AnimationCollection.get(
      ENTITY_ID
    )!.getAnimation(state.currentState);

    // Checking it the updated happened correctly
    expect(updatedAnimation.currentAnimationFrameIndex).toBe(1);
  });
});
