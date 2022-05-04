import axios from "axios";
import { HomeStore } from "./HomeStore";

export class RootStore {
  axios = axios;
  dev = process.env.NODE_ENV === "development" ? "dev_" : "";

  homeStore;

  constructor() {
    this.homeStore = new HomeStore(this);
  }
}
