import { uuidv7 as uuid } from "uuidv7";
import { State } from "../component/State";
import { Hitbox } from "../component/Hitbox";
import { Transform } from "../component/Transform";
import { Dimensions } from "../component/Dimensions";
import orbAnimations from "../utils/animations/orb.json";
import { Animation } from "../component/Animation";
import { AnimationCollection } from "../component/AnimationCollection";
import { Collectable } from "../component/Collectable";
import { Collisions } from "../component/Collisions";
import { Orb } from "../component/Orb";

const ORB_SCORE = 1;

const ORB_WIDTH = 10;
const ORB_HEIGHT = 10;

type OrbState = "idle";

export function createOrb(x: number, y: number) {
  const id = uuid();

  const orb = new Orb();

  const collectable = new Collectable(ORB_SCORE);

  const orbState: OrbState = "idle";
  const state = new State(orbState);

  const hitbox = new Hitbox(x, y, ORB_WIDTH, ORB_HEIGHT);
  const collisions = new Collisions();
  const dimensions = new Dimensions(ORB_WIDTH, ORB_HEIGHT);

  const transform = new Transform(x, y, 0);

  const idleAnimation = new Animation(
    orbAnimations["idle"].frames,
    orbAnimations["idle"].frameRate
  );

  const animationByState: Record<OrbState, Animation> = {
    idle: idleAnimation,
  };
  const animations = new AnimationCollection(animationByState);

  return {
    id,
    components: [
      orb,
      collectable,
      state,
      hitbox,
      collisions,
      dimensions,
      transform,
      animations,
    ],
  };
}
