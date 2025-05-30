import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery,
  endpoints: (builder) => ({
    Register: builder.mutation({
      query: (data) => ({
        url: "core/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
