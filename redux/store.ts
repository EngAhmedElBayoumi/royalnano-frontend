import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import { contactApi } from "./services/website/contactApi";
import { customerReviewApi } from "./services/website/customerReviewApi";
import { galleryAPi } from "./services/website/galleryApi";
import { profileApi } from "./services/website/profileApi";
import { loginApi } from "./services/auth/loginApi";
import { logoutApi } from "./services/auth/logoutApi";
import { registerApi } from "./services/auth/registerApi";
import { forgotPasswordApi } from "./services/auth/forgotPasswordApi";
import { resendOTPApi } from "./services/auth/resendOTP";
import { verifyOTPApi } from "./services/auth/verifyOTP";
import { resetPasswordPApi } from "./services/auth/resetPassword";
import { branchApi } from "./services/dashboard/inventory/branchesApi";
import { movementApi } from "./services/dashboard/inventory/movementApi";
import { preorderApi } from "./services/dashboard/inventory/preorderApi";
import { refreshTokenApi } from "./services/auth/refreshTokenApi";
import { unitsApi } from "./services/dashboard/inventory/unitsApi";
import { itemsApi } from "./services/dashboard/inventory/itemsApi";
import { itemCategoryApi } from "./services/dashboard/inventory/itemCategoryApi";
import { stockApi } from "./services/dashboard/inventory/stockApi";
import { bonusesApi } from "./services/dashboard/hr/bonusesApi";
import { employeeApi } from "./services/dashboard/hr/employeeApi";
import { salesQuotationApi } from "./services/dashboard/sales/salesQuotationsApi";
import { salesCustomerApi } from "./services/dashboard/sales/salesCustomerApi";
import { salesInvoiceApi } from "./services/dashboard/sales/salesInvoiceApi";
import { departmentApi } from "./services/dashboard/hr/departmentApi";
import { attendanceApi } from "./services/dashboard/hr/attendanceApi";
import { vacationApi } from "./services/dashboard/hr/vacationApi";
import { applicantsApi } from "./services/dashboard/hr/applicantsApi";
import { interviewsApi } from "./services/dashboard/hr/interviewsApi";
import { competitionApi } from "./services/dashboard/hr/competitionApi";
import { evaluationApi } from "./services/dashboard/hr/evaluationApi";
import { PurchaseSupplierApi } from "./services/dashboard/purchase/supplierApi";
import { salesReturnApi } from "./services/dashboard/sales/salesReturnApi";
import { servicesAPi } from "./services/website/servicesApi";
import { blogsAPi } from "./services/website/blogsApi";
import { commentsAPi } from "./services/website/commentsApi";
import { socialApi } from "./services/website/socialApi";
import { clientRequestAPi } from "./services/clientRequestApi";
import { purchaseOrderApi } from "./services/dashboard/purchase/orderApi";
import { purchaseExpenseCategoryApi } from "./services/dashboard/purchase/expenseCategory";
import { purchaseInvoiceApi } from "./services/dashboard/purchase/invoiceApi";
import { purchaseRequestApi } from "./services/dashboard/purchase/request";
import { purchaseWarehouseApi } from "./services/dashboard/purchase/warehouseApi";
import { jobsApi } from "./services/dashboard/hr/jobsApi";
import { permissionsApi } from "./services/dashboard/hr/permissionsApi";
import { statisticsAPi } from "./services/dashboard/statisticsApi";
import { salesSalesClientRequestApi } from "./services/dashboard/sales/salesClientRequests";
import { initializePaymentApi } from "./services/dashboard/sales/initialPriceApi";
import { setPriceApi } from "./services/dashboard/sales/setPriceApi";
import { followUpApi } from "./services/dashboard/sales/followUpApi";
import { financeApi } from "./services/dashboard/finance/financeApi";
import { consumedItemsApi } from "./services/dashboard/sales/salesConsumedItemsApi";

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
    [unitsApi.reducerPath]: unitsApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [itemCategoryApi.reducerPath]: itemCategoryApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [salesQuotationApi.reducerPath]: salesQuotationApi.reducer,
    [salesCustomerApi.reducerPath]: salesCustomerApi.reducer,
    [salesInvoiceApi.reducerPath]: salesInvoiceApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [bonusesApi.reducerPath]: bonusesApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [vacationApi.reducerPath]: vacationApi.reducer,
    [applicantsApi.reducerPath]: applicantsApi.reducer,
    [interviewsApi.reducerPath]: interviewsApi.reducer,
    [competitionApi.reducerPath]: competitionApi.reducer,
    [evaluationApi.reducerPath]: evaluationApi.reducer,
    [salesReturnApi.reducerPath]: salesReturnApi.reducer,
    [servicesAPi.reducerPath]: servicesAPi.reducer,
    [blogsAPi.reducerPath]: blogsAPi.reducer,
    [commentsAPi.reducerPath]: commentsAPi.reducer,
    [socialApi.reducerPath]: socialApi.reducer,
    [clientRequestAPi.reducerPath]: clientRequestAPi.reducer,
    [PurchaseSupplierApi.reducerPath]: PurchaseSupplierApi.reducer,
    [purchaseOrderApi.reducerPath]: purchaseOrderApi.reducer,
    [purchaseExpenseCategoryApi.reducerPath]:
      purchaseExpenseCategoryApi.reducer,
    [purchaseInvoiceApi.reducerPath]: purchaseInvoiceApi.reducer,
    [purchaseRequestApi.reducerPath]: purchaseRequestApi.reducer,
    [purchaseWarehouseApi.reducerPath]: purchaseWarehouseApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [statisticsAPi.reducerPath]: statisticsAPi.reducer,
    [salesSalesClientRequestApi.reducerPath]:
      salesSalesClientRequestApi.reducer,
    [initializePaymentApi.reducerPath]: initializePaymentApi.reducer,
    [setPriceApi.reducerPath]: setPriceApi.reducer,
    [followUpApi.reducerPath]: followUpApi.reducer,
    [financeApi.reducerPath]: financeApi.reducer,
    [consumedItemsApi.reducerPath]: consumedItemsApi.reducer,

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
      .concat(unitsApi.middleware)
      .concat(itemsApi.middleware)
      .concat(itemCategoryApi.middleware)
      .concat(stockApi.middleware)
      .concat(salesQuotationApi.middleware)
      .concat(salesCustomerApi.middleware)
      .concat(salesInvoiceApi.middleware)
      .concat(employeeApi.middleware)
      .concat(bonusesApi.middleware)
      .concat(departmentApi.middleware)
      .concat(vacationApi.middleware)
      .concat(attendanceApi.middleware)
      .concat(applicantsApi.middleware)
      .concat(interviewsApi.middleware)
      .concat(competitionApi.middleware)
      .concat(evaluationApi.middleware)
      .concat(PurchaseSupplierApi.middleware)
      .concat(salesReturnApi.middleware)
      .concat(servicesAPi.middleware)
      .concat(clientRequestAPi.middleware)
      .concat(purchaseWarehouseApi.middleware)
      .concat(purchaseRequestApi.middleware)
      .concat(purchaseInvoiceApi.middleware)
      .concat(purchaseExpenseCategoryApi.middleware)
      .concat(purchaseOrderApi.middleware)
      .concat(jobsApi.middleware)
      .concat(permissionsApi.middleware)
      .concat(statisticsAPi.middleware)
      .concat(salesSalesClientRequestApi.middleware)
      .concat(initializePaymentApi.middleware)
      .concat(blogsAPi.middleware)
      .concat(commentsAPi.middleware)
      .concat(socialApi.middleware)
      .concat(followUpApi.middleware)
      .concat(financeApi.middleware)
      .concat(consumedItemsApi.middleware);
  },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Create a persistor
export const persistor = persistStore(store);
