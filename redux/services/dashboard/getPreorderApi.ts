import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common";

export const preorderApi = createApi({
  reducerPath: "preorderApi",
  baseQuery,
  endpoints: (builder) => ({
    getPreorder: builder.query({
      query: () => ({
        url: "inventory/preorder",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPreorderQuery } = preorderApi;