import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./state/cart.slice";
import searchReducer from "./state/search.slice";
import menuReducer from "./state/menu.slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    menu: menuReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
