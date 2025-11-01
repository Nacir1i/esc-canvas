import { uuidv7 as uuid } from "uuidv7";
import { State } from "../component/State";
import { Hitbox } from "../component/Hitbox";
import { Transform } from "../component/Transform";
import { Animation } from "../component/Animation";
import { Collisions } from "../component/Collisions";
import { Dimensions } from "../component/Dimensions";
import ghostAnimations from "../utils/animations/ghost.json";
import { AnimationCollection } from "../component/AnimationCollection";

const GHOST_WIDTH = 40;
const GHOST_HEIGHT = 40;

type PlayerState = "idle";

export function createGhostEntity(startingPosition: { x: number; y: number }) {
  const id = uuid();

  const playerState: PlayerState = "idle";
  const state = new State(playerState);

  const hitbox = new Hitbox(
    startingPosition.x,
    startingPosition.y,
    GHOST_WIDTH,
    GHOST_HEIGHT
  );
  const collisions = new Collisions();
  const dimensions = new Dimensions(GHOST_WIDTH, GHOST_HEIGHT);

  const transform = new Transform(startingPosition.x, startingPosition.y, 0);

  const idleAnimation = new Animation(
    ghostAnimations["idle"].frames,
    ghostAnimations["idle"].frameRate
  );

  const animationByState: Record<PlayerState, Animation> = {
    idle: idleAnimation,
  };
  const animations = new AnimationCollection(animationByState);

  return {
    id,
    components: [state, hitbox, collisions, dimensions, transform, animations],
  };
}
