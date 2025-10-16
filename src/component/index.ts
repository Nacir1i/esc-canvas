import { State } from "./State";
import { Velocity } from "./Velocity";
import { Transform } from "./Transform";
import { Animation } from "./Animation";
import { Dimensions } from "./Dimensions";
import { AnimationCollection } from "./AnimationCollection";

export const components = {
  Transform,
  Dimensions,
  Velocity,
  Animation,
  State,
  AnimationCollection,
};
export type Component =
  | Transform
  | Dimensions
  | Velocity
  | Animation
  | State
  | AnimationCollection;
export type ComponentName = keyof typeof components;

export {
  Transform,
  Dimensions,
  Velocity,
  Animation,
  State,
  AnimationCollection,
};
