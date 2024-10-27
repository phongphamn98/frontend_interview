import { configureStore } from "@reduxjs/toolkit";
import { pokemon } from "./slices";

export const makeStore = () => {
  return configureStore({
    reducer: {
      pokemonType: pokemon,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
