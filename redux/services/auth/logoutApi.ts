import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const logoutApi = createApi({
  reducerPath: "logoutApi",
  baseQuery,
  endpoints: (builder) => ({
    Logout: builder.mutation({
      query: () => ({
        url: "core/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLogoutMutation } = logoutApi;
