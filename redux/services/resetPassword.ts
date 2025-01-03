import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";

export const resetPasswordPApi = createApi({
  reducerPath: "ResetPasswordApi",
  baseQuery,
  endpoints: (builder) => ({
    ResetPassword: builder.mutation({
      query: (data) => ({
        url: "core/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = resetPasswordPApi;
