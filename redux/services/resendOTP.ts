import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const resendOTPApi = createApi({
  reducerPath: "resendOTPApi",
  baseQuery,
  endpoints: (builder) => ({
    ResendOTP: builder.mutation({
      query: (data) => ({
        url: "core/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useResendOTPMutation } = resendOTPApi;
