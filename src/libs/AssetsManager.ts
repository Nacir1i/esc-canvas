export class AssetsManager {
  private readonly spriteSource: string = "/sprites.png";

  isLoaded: boolean = false;
  sprite: HTMLImageElement = new Image();

  constructor() {}

  async loadSprite(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.sprite.onload = () => {
        this.isLoaded = true;
        resolve();
      };
      this.sprite.onerror = (error) => {
        console.error(`Error while loading asset: ${this.spriteSource}`, error);
        reject(error);
      };
      this.sprite.src = this.spriteSource;
    });
  }
}
