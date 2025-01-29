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

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

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
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        // Allow non-serializable values
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
      .concat(resetPasswordPApi.middleware);
  },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Create a persistor
export const persistor = persistStore(store);
