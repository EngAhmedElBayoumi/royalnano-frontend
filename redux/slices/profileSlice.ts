import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";

interface Permissions {
  [key: string]: {
    view: boolean;
    add: boolean;
    change: boolean;
    delete: boolean;
  };
}

interface ProfileState {
  name: string | null;
  email_address: string | null;
  phone_number: string | null;
  role: string | null;
  profile_picture: string | null;
  permissions: Permissions;
}

const initialState: ProfileState = {
  name: null,
  email_address: null,
  phone_number: null,
  role: null,
  profile_picture: null,
  permissions: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      state.name = action.payload.name;
      state.email_address = action.payload.email_address;
      state.phone_number = action.payload.phone_number;
      state.role = action.payload.role;
      state.profile_picture = action.payload.profile_picture?.startsWith("/")
        ? action.payload.profile_picture.slice(1)
        : action.payload.profile_picture;
      state.permissions = action.payload.permissions;

      if (action.payload.permissions) {
        // Extract only the specified permissions
        const { permissions } = action.payload;

        const extractedPermissions = {
          inventoryitem: permissions.inventoryitem,
          salesinvoice: permissions.salesinvoice,
          employee: permissions.employee,
          customer: permissions.customer,
          branch: permissions.branch,
          service: permissions.service,
        };
        setCookie("userPermissions", JSON.stringify(extractedPermissions), {
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24,
        });
      }
    },
    clearProfile: (state) => {
      state.name = null;
      state.email_address = null;
      state.phone_number = null;
      state.role = null;
      state.profile_picture = null;
      state.permissions = {};
      deleteCookie("userPermissions");
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
