import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const KEY = "isLoggedIn";

interface Auth {
  isLoggedIn: boolean;
}

let initialState: Auth;
const stateFromStorage = window.localStorage.getItem(KEY);

if (stateFromStorage) {
  initialState = { isLoggedIn: Boolean(stateFromStorage) };
} else {
  initialState = { isLoggedIn: false };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      window.localStorage.setItem(KEY, "true");
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      window.localStorage.setItem(KEY, "false");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
