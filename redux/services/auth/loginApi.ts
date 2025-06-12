import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery,
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (data) => ({
        url: "core/login/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
