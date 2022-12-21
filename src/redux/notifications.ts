import {createSlice} from '@reduxjs/toolkit';
import {nanoid} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface Notification {
  message: string,
  type: string
  id: string,
}

const initialState: Notification[] = [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addSuccess: {
      prepare(message: string) {
        return {
          payload: {id: nanoid(), type: 'success', message},
        };
      },
      reducer(state, action: PayloadAction<Notification>) {
        state.push(action.payload);
      },
    },
    addFailure: {
      prepare(message: string) {
        return {
          payload: {id: nanoid(), type: 'danger', message},
        };
      },
      reducer(state, action: PayloadAction<Notification>) {
        state.push(action.payload);
      },
    },
    removeNotification(state, action: PayloadAction<string>) {
      return state.filter((value) => value.id != action.payload);
    },
  },
});

export const {addSuccess, addFailure, removeNotification} = notificationsSlice.actions;
export default notificationsSlice.reducer;

// export const notifications = (state) => state.notifications;
