import { configureStore } from "@reduxjs/toolkit";
import { apiSplice } from "./query/apiSplice";
import authSlice from "./slice/authSlice";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: authSlice,
      [apiSplice.reducerPath]: apiSplice.reducer,
    },
    devTools: true,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSplice.middleware),
  });
  return store;
};

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type ReduxStore = typeof store;

export const wrapper = createWrapper<ReduxStore>(makeStore);
