import {configureStore} from '@reduxjs/toolkit';
import notificationsReducer from './notifications';
import labelsReducer from './labels';
import {apiSlice} from './api';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    labels: labelsReducer,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
