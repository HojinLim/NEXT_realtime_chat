import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: userSlice,
});

export default store;
export type RootState = ReturnType<typeof userSlice>;
export type AppDispatch = typeof store.dispatch;
