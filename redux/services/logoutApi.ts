import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";

export const logoutApi = createApi({
  reducerPath: "logoutApi",
  baseQuery,
  endpoints: (builder) => ({
    Logout: builder.mutation({
      query: (data) => ({
        url: "core/logout",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLogoutMutation } = logoutApi;
