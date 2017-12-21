import "rxjs/add/operator/skip";

import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";
import { PLATFORM } from "aurelia-pal";

import { Store } from "../../src/store";
import { StoreComponent, TestState } from "./fixtures/store-component";

describe("decorators", () => {
  const initialState: TestState = {
    counter: 1
  };

  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName("./fixtures/store-component"))
      .inView("<store-component></store-component>");

    component.bootstrap((aurelia) => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(Store, new Store(initialState, false));
    });
  })

  it("should allow registering actions from within classes", async done => {
    await component.create(bootstrap);
    const storeComponent = component.viewModel as StoreComponent;

    storeComponent.store.dispatch(storeComponent.incrementAction);
    storeComponent.store.state.skip(1).subscribe((state: TestState) => {
      expect(state.counter).toEqual(2);
      
      component.dispose();
      done();
    });
  });
});
