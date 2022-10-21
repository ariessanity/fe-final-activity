import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  name: string | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  name: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.name = null;
      state.accessToken = null;
    },
  },
});

export const selectAuth = (state: any) => state.auth;
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
