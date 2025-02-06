import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";

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
      setCookie("accessToken", accessToken, {
        secure: process.env.NODE_ENV === "production", // Secure in production
        maxAge: 60 * 60 * 24, // 1 day
      });
    },
    logout: (state) => {
      state.userId = null;
      state.emailAddress = null;
      state.accessToken = null;
      state.refreshToken = null;
      deleteCookie("accessToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
