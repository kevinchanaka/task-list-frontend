import { configureStore, combineReducers } from "@reduxjs/toolkit";
import notificationsReducer from "./notifications";
import authReducer from "redux/auth";
import { apiSlice } from "redux/api";

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  auth: authReducer,
  api: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
