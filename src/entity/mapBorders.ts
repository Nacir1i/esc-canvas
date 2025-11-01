import { createRectangle } from "./rectangle";

export function createMapBorders(canvasWidth: number, canvasHeight: number) {
  const BORDER_DEPTH = 10;

  const topBorder = createRectangle(
    "red",
    { x: 0, y: 0 },
    { width: canvasWidth, height: BORDER_DEPTH }
  );
  const bottomBorder = createRectangle(
    "green",
    { x: 0, y: canvasHeight - BORDER_DEPTH },
    { width: canvasWidth, height: BORDER_DEPTH }
  );
  const rightBorder = createRectangle(
    "blue",
    { x: 0, y: 0 },
    { width: BORDER_DEPTH, height: canvasHeight }
  );
  const leftBorder = createRectangle(
    "yellow",
    { x: canvasWidth - BORDER_DEPTH, y: 0 },
    { width: BORDER_DEPTH, height: canvasHeight }
  );

  return [topBorder, bottomBorder, rightBorder, leftBorder];
}
