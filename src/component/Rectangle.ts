import type { BaseRenderOptions } from "../libs/Renderer";

export class Rectangle {
  readonly renderStyle: BaseRenderOptions;
  readonly color: string;

  constructor(color: string, renderStyle: BaseRenderOptions) {
    this.renderStyle = renderStyle;
    this.color = color;
  }
}
