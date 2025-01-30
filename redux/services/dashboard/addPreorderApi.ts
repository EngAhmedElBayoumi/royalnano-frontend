import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common";

export const AddPreorderApi = createApi({
  reducerPath: "addPreorderApi",
  baseQuery,
  endpoints: (builder) => ({
    AddPreorder: builder.mutation({
      query: (data) => ({
        url: "inventory/preorder/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddPreorderMutation } = AddPreorderApi;
