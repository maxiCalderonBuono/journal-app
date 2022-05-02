import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";



export const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
      <Toaster />
    </Provider>
  );
};
