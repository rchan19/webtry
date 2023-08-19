// Look up what a RootState file does...
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./scenes/state/authSlice";
import { apiReducer } from "./scenes/state/api";

const rootReducer = combineReducers({
  api: apiReducer,
  auth: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
