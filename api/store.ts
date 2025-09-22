import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/api/features/auth/authSlice";
import { apiSlice } from "@/api/services/apiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV === "development",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
