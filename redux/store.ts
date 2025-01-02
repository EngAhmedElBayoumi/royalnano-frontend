import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contactApi } from "./services/contactApi";
import { customerReviewApi } from "./services/customerReviewApi";

export const store = configureStore({
  reducer: {
    [contactApi.reducerPath]: contactApi.reducer,
    [customerReviewApi.reducerPath]: customerReviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(contactApi.middleware)
      .concat(customerReviewApi.middleware);
  },
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
