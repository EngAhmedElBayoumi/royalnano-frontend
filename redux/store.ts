import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { contactApi } from "./services/contactApi";
import { customerReviewApi } from "./services/customerReviewApi";
import { galleryAPi } from "./services/galleryApi";
import { profileApi } from "./services/profileApi";
import { loginApi } from "./services/loginApi";
import { logoutApi } from "./services/logoutApi";
import { registerApi } from "./services/registerApi";
import { forgotPasswordApi } from "./services/forgotPasswordApi";
import { resendOTPApi } from "./services/resendOTP";
import { verifyOTPApi } from "./services/verifyOTP";
import { resetPasswordPApi } from "./services/resetPassword";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import { branchApi } from "./services/dashboard/inventory/branchesApi";
import { movementApi } from "./services/dashboard/inventory/movementApi";
import { preorderApi } from "./services/dashboard/inventory/preorderApi";
import { refreshTokenApi } from "./services/refreshTokenApi";
import { itemsApi } from "./services/dashboard/inventory/itemsApi";
import { itemCategoryApi } from "./services/dashboard/inventory/itemCategoryApi";
import { stockApi } from "./services/dashboard/inventory/stockApi";
import { bonusesApi } from "./services/dashboard/hr/bonusesApi";
import { employeeApi } from "./services/dashboard/hr/employeeApi";
import { salesQuotationApi } from "./services/dashboard/sales/salesQuotationsApi";
import { salesCustomerApi } from "./services/dashboard/sales/salesCustomerApi";
import { salesInvoiceApi } from "./services/dashboard/sales/salesInvoiceApi";
import { salesOrderApi } from "./services/dashboard/sales/salesOrderApi";
import { departmentApi } from "./services/dashboard/hr/departmentApi";
import { attendanceApi } from "./services/dashboard/hr/attendanceApi";
import { supplierApi } from "./services/dashboard/purchase/supplierApi";
import { salesReturnApi } from "./services/dashboard/sales/salesReturnApi";

// Create separate configs for each reducer
const authPersistConfig = {
  key: "auth",
  storage,
};

const profilePersistConfig = {
  key: "profile",
  storage,
};

// Use the separate configs when creating the persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedProfileReducer = persistReducer(
  profilePersistConfig,
  profileReducer
);
export const store = configureStore({
  reducer: {
    [contactApi.reducerPath]: contactApi.reducer,
    [customerReviewApi.reducerPath]: customerReviewApi.reducer,
    [galleryAPi.reducerPath]: galleryAPi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [logoutApi.reducerPath]: logoutApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
    [resendOTPApi.reducerPath]: resendOTPApi.reducer,
    [verifyOTPApi.reducerPath]: verifyOTPApi.reducer,
    [resetPasswordPApi.reducerPath]: resetPasswordPApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [movementApi.reducerPath]: movementApi.reducer,
    [preorderApi.reducerPath]: preorderApi.reducer,
    [refreshTokenApi.reducerPath]: refreshTokenApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [itemCategoryApi.reducerPath]: itemCategoryApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [salesQuotationApi.reducerPath]: salesQuotationApi.reducer,
    [salesCustomerApi.reducerPath]: salesCustomerApi.reducer,
    [salesInvoiceApi.reducerPath]: salesInvoiceApi.reducer,
    [salesOrderApi.reducerPath]: salesOrderApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [bonusesApi.reducerPath]: bonusesApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [salesReturnApi.reducerPath]: salesReturnApi.reducer,
    auth: persistedAuthReducer,
    profile: persistedProfileReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(contactApi.middleware)
      .concat(customerReviewApi.middleware)
      .concat(galleryAPi.middleware)
      .concat(profileApi.middleware)
      .concat(loginApi.middleware)
      .concat(logoutApi.middleware)
      .concat(registerApi.middleware)
      .concat(forgotPasswordApi.middleware)
      .concat(resendOTPApi.middleware)
      .concat(verifyOTPApi.middleware)
      .concat(resetPasswordPApi.middleware)
      .concat(branchApi.middleware)
      .concat(movementApi.middleware)
      .concat(preorderApi.middleware)
      .concat(refreshTokenApi.middleware)
      .concat(itemsApi.middleware)
      .concat(itemCategoryApi.middleware)
      .concat(stockApi.middleware)
      .concat(salesQuotationApi.middleware)
      .concat(salesCustomerApi.middleware)
      .concat(salesInvoiceApi.middleware)
      .concat(salesOrderApi.middleware)
      .concat(employeeApi.middleware)
      .concat(bonusesApi.middleware)
      .concat(departmentApi.middleware)
      .concat(attendanceApi.middleware)
      .concat(supplierApi.middleware)
      .concat(salesReturnApi.middleware);
  },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Create a persistor
export const persistor = persistStore(store);
