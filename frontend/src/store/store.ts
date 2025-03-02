"use client";
import { configureStore } from "@reduxjs/toolkit";
import nodeDropReducer from "./canvas/nodeDropReducer";
export const store = configureStore({
  reducer: {
    nodeDrop: nodeDropReducer,
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
