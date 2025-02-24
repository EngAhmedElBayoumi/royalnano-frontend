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
import { branchApi } from "./services/dashboard/branchesApi";
import { movementApi } from "./services/dashboard/movementApi";
import { preorderApi } from "./services/dashboard/preorderApi";
import { refreshTokenApi } from "./services/refreshTokenApi";
import { itemsApi } from "./services/dashboard/itemsApi";
import { itemCategoryApi } from "./services/dashboard/itemCategoryApi";
import { stockApi } from "./services/dashboard/stockApi";

import { employeeApi } from "./services/dashboard/hr/employeeApi";
import { salesQuotationApi } from "./services/dashboard/sales/salesQuotationsApi";
import { salesCustomerApi } from "./services/dashboard/sales/salesCustomerApi";
import { salesInvoiceApi } from "./services/dashboard/sales/salesInvoiceApi";
import { salesOrderApi } from "./services/dashboard/sales/salesOrderApi";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedProfileReducer = persistReducer(persistConfig, profileReducer);

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
      .concat(employeeApi.middleware);
  },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Create a persistor
export const persistor = persistStore(store);
