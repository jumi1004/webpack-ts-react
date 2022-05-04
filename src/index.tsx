import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StoreProvider } from "./states/Context";
import { RootStore } from "./states/RootStore";

const rootStore = new RootStore();

ReactDOM.render(
  <BrowserRouter>
    <StoreProvider value={rootStore}>
      <App />
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById("app")
);
