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
          expensecategory: permissions.expensecategory,
          preorder: permissions.preorder,
          movement: permissions.movement,
          stockadjustment: permissions.stockadjustment,
          salesinvoice: permissions.salesinvoice,
          customer: permissions.customer,
          quotation: permissions.quotation,
          order: permissions.order,
          invoice: permissions.invoice,
          clientrequest: permissions.clientrequest,
          employee: permissions.employee,
          department: permissions.department,
          attendance: permissions.attendance,
          leaverequest: permissions.leaverequest,
          bonusdeduction: permissions.bonusdeduction,
          applicant: permissions.applicant,
          interview: permissions.interview,
          competition: permissions.competition,
          evaluation: permissions.evaluation,
          branch: permissions.branch,
          service: permissions.service,
          gallery: permissions.gallery,
          contact: permissions.contact,
          customerreview: permissions.customerreview,
          invoicedetail: permissions.invoicedetail,
          purchaseorder: permissions.purchaseorder,
          purchaserequest: permissions.purchaserequest,
          supplier: permissions.supplier,
          warehouse: permissions.warehouse,
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
