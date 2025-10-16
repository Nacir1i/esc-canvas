export class State {
  currentState: string = "";
  previousState: string = "";

  constructor(state: string) {
    this.currentState = state;
    this.previousState = state;
  }
}
