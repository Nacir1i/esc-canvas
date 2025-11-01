export class SpriteSheetLoader {
  private readonly spriteSource: string = "/sprites.png";
  private readonly transparentColor: string = "#000";

  isLoaded: boolean = false;
  sprite: HTMLCanvasElement;

  constructor() {
    this.sprite = document.createElement("canvas");
  }

  async loadSprite(): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        this.sprite.width = image.width;
        this.sprite.height = image.height;

        this.makeTargetedColorTransparent(image);

        this.isLoaded = true;
        resolve();
      };
      image.onerror = (error) => {
        console.error(`Error while loading asset: ${this.spriteSource}`, error);
        reject(error);
      };
      image.src = this.spriteSource;
    });
  }

  private makeTargetedColorTransparent(image: HTMLImageElement) {
    const context = this.sprite.getContext("2d")!;
    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(0, 0, image.width, image.height);
    const data = imageData.data;

    const color = parseInt(this.transparentColor.slice(1), 16);

    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] === r && data[i + 1] === g && data[i + 2] === b) {
        data[i + 3] = 0;
      }
    }

    context.putImageData(imageData, 0, 0);
  }
}
