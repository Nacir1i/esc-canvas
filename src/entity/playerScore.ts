import { uuidv7 as uuid } from "uuidv7";
import { Text } from "../component/Text";
import { Transform } from "../component/Transform";

export function createPlayerScore() {
  const id = uuid();

  const text = new Text("red", "24px sans serif", "0");
  const transform = new Transform(500, 500, 0);

  return {
    id,
    components: [text, transform],
  };
}
