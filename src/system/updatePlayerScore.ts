import type { Scene } from "../libs/Scene";

export function updatePlayerScore(scene: Scene, _deltaTime: number) {
  const playerEntities = scene.query(["Player", "Score"]);
  const playerScoreEntities = scene.query(["Text", "Transform"]);

  for (const entityId of playerEntities) {
    const entityScore = scene.componentMaps.Score.get(entityId)!;

    for (const playerScoreEntityId of playerScoreEntities) {
      const entityText = scene.componentMaps.Text.get(playerScoreEntityId)!;

      entityText.content = String(entityScore.score);
    }
  }
}
