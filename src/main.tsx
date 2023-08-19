import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { Provider } from "react-redux";
import { Middleware, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootState";
import { api } from "./scenes/state/api";
import thunk from "redux-thunk";

const middleware: Array<Middleware> = [thunk, api.middleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
