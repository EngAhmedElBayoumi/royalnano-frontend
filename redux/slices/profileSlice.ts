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
  emailAddress: string | null;
  phoneNumber: string | null;
  role: string | null;
  profilePicture: string | null;
  permissions: Permissions;
}

const initialState: ProfileState = {
  name: null,
  emailAddress: null,
  phoneNumber: null,
  role: null,
  profilePicture: null,
  permissions: {},
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
      state.profilePicture = action.payload.profilePicture?.startsWith('/') 
        ? action.payload.profilePicture.slice(1) 
        : action.payload.profilePicture;
      state.permissions = action.payload.permissions;

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
    },
    clearProfile: (state) => {
      state.name = null;
      state.emailAddress = null;
      state.phoneNumber = null;
      state.role = null;
      state.profilePicture = null;
      state.permissions = {};
      deleteCookie("userPermissions");
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
