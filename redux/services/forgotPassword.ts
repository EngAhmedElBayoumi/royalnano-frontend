import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";

export const forgotPasswordApi = createApi({
  reducerPath: "forgotPasswordApi",
  baseQuery,
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "core/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation } = forgotPasswordApi;
