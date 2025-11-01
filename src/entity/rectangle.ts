import { uuidv7 as uuid } from "uuidv7";
import { Block } from "../component/Block";
import { Hitbox } from "../component/Hitbox";
import { Collisions } from "../component/Collisions";
import { Dimensions } from "../component/Dimensions";
import { Rectangle } from "../component/Rectangle";
import { Transform } from "../component/Transform";

export function createRectangle(
  color: string,
  position: { x: number; y: number },
  recDimensions: { width: number; height: number }
) {
  const id = uuid();

  const rectangle = new Rectangle(color);

  const block = new Block();

  const transform = new Transform(position.x, position.y, 0);
  const hitbox = new Hitbox(
    position.x,
    position.y,
    recDimensions.width,
    recDimensions.height
  );
  const collisions = new Collisions();
  const dimensions = new Dimensions(recDimensions.width, recDimensions.height);

  return { id, components: [block, hitbox, collisions, dimensions, rectangle, transform] };
}
