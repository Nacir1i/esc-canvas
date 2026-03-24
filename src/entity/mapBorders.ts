import type { FillRenderOption } from "../libs/Renderer";
import { createRectangle } from "./rectangle";

export function createMapBorders(canvasWidth: number, canvasHeight: number) {
  const BORDER_DEPTH = 0;

  const renderOption: FillRenderOption = {
    rec: "fillRect",
    style: "fillStyle",
  };

  const topBorder = createRectangle(
    "red",
    { x: 0, y: 0 },
    { width: canvasWidth, height: BORDER_DEPTH },
    renderOption
  );
  const bottomBorder = createRectangle(
    "green",
    { x: 0, y: canvasHeight - BORDER_DEPTH },
    { width: canvasWidth, height: BORDER_DEPTH },
    renderOption
  );
  const rightBorder = createRectangle(
    "blue",
    { x: 0, y: 0 },
    { width: BORDER_DEPTH, height: canvasHeight },
    renderOption
  );
  const leftBorder = createRectangle(
    "yellow",
    { x: canvasWidth - BORDER_DEPTH, y: 0 },
    { width: BORDER_DEPTH, height: canvasHeight },
    renderOption
  );

  return [topBorder, bottomBorder, rightBorder, leftBorder];
}
