import { uuidv7 as uuid } from "uuidv7";
import { State } from "../component/State";
import { Velocity } from "../component/Velocity";
import { Animation } from "../component/Animation";
import { Transform } from "../component/Transform";
import { Dimensions } from "../component/Dimensions";
import pacmanAnimations from "../utils/animations/pacman.json";
import { AnimationCollection } from "../component/AnimationCollection";
import { Hitbox } from "../component/Hitbox";

const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 30;

type PlayerState =
  | "idle"
  | "moving-right"
  | "moving-left"
  | "moving-up"
  | "moving-down";

export function createPlayerEntity(startingPosition: { x: number; y: number }) {
  const id = uuid();

  const playerState: PlayerState = "moving-right";
  const state = new State(playerState);

  const hitbox = new Hitbox(
    startingPosition.x,
    startingPosition.y,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  );
  const dimensions = new Dimensions(PLAYER_WIDTH, PLAYER_HEIGHT);

  const velocity = new Velocity(0, 0, 90);
  const transform = new Transform(startingPosition.x, startingPosition.y, 0);

  const idleAnimation = new Animation(
    pacmanAnimations["idle"].frames,
    pacmanAnimations["idle"].frameRate
  );
  const movingRightAnimation = new Animation(
    pacmanAnimations["moving-right"].frames,
    pacmanAnimations["moving-right"].frameRate
  );
  const movingLeftAnimation = new Animation(
    pacmanAnimations["moving-left"].frames,
    pacmanAnimations["moving-left"].frameRate
  );
  const movingUptAnimation = new Animation(
    pacmanAnimations["moving-up"].frames,
    pacmanAnimations["moving-up"].frameRate
  );
  const movingDownAnimation = new Animation(
    pacmanAnimations["moving-down"].frames,
    pacmanAnimations["moving-down"].frameRate
  );

  const animationByState: Record<PlayerState, Animation> = {
    idle: idleAnimation,
    "moving-right": movingRightAnimation,
    "moving-left": movingLeftAnimation,
    "moving-up": movingUptAnimation,
    "moving-down": movingDownAnimation,
  };

  const animations = new AnimationCollection(animationByState);

  return { id, hitbox, dimensions, transform, velocity, animations, state };
}
