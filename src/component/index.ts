import { Orb } from "./Orb";
import { Text } from "./Text";
import { State } from "./State";
import { Score } from "./Score";
import { Block } from "./Block";
import { Player } from "./Player";
import { Hitbox } from "./Hitbox";
import { Velocity } from "./Velocity";
import { Transform } from "./Transform";
import { Animation } from "./Animation";
import { Dimensions } from "./Dimensions";
import { Rectangle } from "./Rectangle";
import { Collisions } from "./Collisions";
import { Collectable } from "./Collectable";
import { LastValidPosition } from "./LastValidPosition";
import { AnimationCollection } from "./AnimationCollection";

export const components = {
  Transform,
  Dimensions,
  Velocity,
  Animation,
  State,
  AnimationCollection,
  Hitbox,
  Collisions,
  Block,
  LastValidPosition,
  Rectangle,
  Collectable,
  Player,
  Text,
  Score,
  Orb,
};
export type ComponentName = keyof typeof components;

export default components;
