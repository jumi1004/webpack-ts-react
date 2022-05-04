import { action, runInAction, makeObservable, observable } from "mobx";

export class HomeStore {
  rootStore;

  state = false;
  constructor(root) {
    makeObservable(this, {
      state: observable,
      setState: action,
    });
    this.rootStore = root;
  }

  setState = (v) => {
    runInAction(() => {
      this.state = v;
    });
  };
}
