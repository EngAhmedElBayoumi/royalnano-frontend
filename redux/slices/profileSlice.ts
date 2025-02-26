import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";

interface Permission {
  id: number;
  name: string;
  codename: string;
}

interface ProfileState {
  name: string | null;
  emailAddress: string | null;
  phoneNumber: string | null;
  role: string | null;
  profilePicture: string | null;
  permissions: Permission[];
}

const initialState: ProfileState = {
  name: null,
  emailAddress: null,
  phoneNumber: null,
  role: null,
  profilePicture: null,
  permissions: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      state.name = action.payload.name;
      state.emailAddress = action.payload.emailAddress;
      state.phoneNumber = action.payload.phoneNumber;
      state.role = action.payload.role;
      state.profilePicture = action.payload.profilePicture;
      state.permissions = action.payload.permissions;

      // Store only permissions with codename starting with "view" in a cookie for middleware access
      const permissionCodes = action.payload.permissions
        // .filter((p: { codename: string }) => p.codename.startsWith("view"))
        // .map((p: { codename: string }) => p.codename);
console.log(permissionCodes)
      setCookie("userPermissions", permissionCodes, {
        secure: process.env.NODE_ENV === "production", 
        maxAge: 60 * 60 * 24,
      });
    },
    clearProfile: (state) => {
      state.name = null;
      state.emailAddress = null;
      state.phoneNumber = null;
      state.role = null;
      state.profilePicture = null;
      state.permissions = [];
      deleteCookie("userPermissions");
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
