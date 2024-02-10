import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { walletSlice } from "./slices/walletSlice";
import { syncSlice } from "./slices/syncSlice";

export const Store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    sync: syncSlice.reducer,
  },
  devTools: "true" === import.meta.env.VITE_APP_REDUX_DEVTOOLS,
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
