import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";

export const verifyOTPApi = createApi({
  reducerPath: "verifyOTPApi",
  baseQuery,
  endpoints: (builder) => ({
    VerifyOTP: builder.mutation({
      query: (data) => ({
        url: "core/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useVerifyOTPMutation } = verifyOTPApi;
