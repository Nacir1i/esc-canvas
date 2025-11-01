import { describe, expect, test } from "vitest";
import { updatePlayerScore } from "../../system/updatePlayerScore";
import { Scene } from "../../libs/Scene";
import { Player } from "../../component/Player";
import { Score } from "../../component/Score";
import { Text } from "../../component/Text";
import { Transform } from "../../component/Transform";

const DELTA_TIME = 0;

describe("Update player score system test suits", () => {
  test("should update score text with player score", () => {
    const scene = new Scene();
    const playerId = "player";
    const scoreTextId = "scoreText";

    const player = new Player();
    const score = new Score();
    score.score = 500;
    scene.registerComponents(playerId, [player, score]);

    const text = new Text("white", "20px Arial", "0");
    const transform = new Transform(10, 10, 0);
    scene.registerComponents(scoreTextId, [text, transform]);

    updatePlayerScore(scene, DELTA_TIME);

    expect(text.content).toBe("500");
  });
});
