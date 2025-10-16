export class InputManager {
  private readonly keysPressed: Set<string> = new Set();

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  public attachListeners() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  public detachListeners() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  private handleKeyDown(event: KeyboardEvent) {
    this.keysPressed.add(event.code);
  }

  private handleKeyUp(event: KeyboardEvent) {
    this.keysPressed.delete(event.code);
  }

  public isKeyPressed(keyCode: string) {
    return this.keysPressed.has(keyCode);
  }
}
