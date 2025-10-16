export class Transform {
  x: number = 0;
  y: number = 0;

  rotation: number = 0;

  constructor(x: number, y: number, rotation: number) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }
}
