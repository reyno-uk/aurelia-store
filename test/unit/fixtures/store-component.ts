import {
  inject,
  bindable,
  inlineView,
  Container
} from "aurelia-framework";

import { Store } from "../../../src/store";
import { registerAction } from "../../../src/decorators";

export interface TestState {
  counter: number;
}

@inlineView(`
  <template>
    <h1>Store Component</h1>
  </template>
`)
@inject(Store)
export class StoreComponent {

  public state: TestState;

  constructor(public store: Store<TestState>) {}

  attached() {
    this.store
      .state
      .subscribe((newState: TestState) => this.state = newState);
  }

  @registerAction()
  public incrementAction(currentState: TestState) {
    const newState = Object.assign({}, currentState);
    newState.counter++;

    return newState;
  }
}
