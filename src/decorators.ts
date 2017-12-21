import { Container } from "aurelia-framework";  

import { Store } from "./store";

export interface RegisterActionOptions {
  mutateState: boolean
}

export function registerAction(options?: RegisterActionOptions) {
  return function(target: any, propertyKey: string) {
    const store = Container.instance.get(Store);
    store.registerAction(propertyKey, target[propertyKey]);
  };
}
