import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: number | null;
  emailAddress: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  userId: null,
  emailAddress: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { userId, emailAddress, accessToken, refreshToken } =
        action.payload;
      state.userId = userId;
      state.emailAddress = emailAddress;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      state.userId = null;
      state.emailAddress = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

// Selector to extract the access token
export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
