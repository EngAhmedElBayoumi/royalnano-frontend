import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common";

export const preorderApi = createApi({
  reducerPath: "preorderApi",
  baseQuery,
  endpoints: (builder) => ({
    getPreorder: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "inventory/preorder",
        method: "GET",
        params: { search, ordering, page, page_size },

      }),
    }),

    createPreorder: builder.mutation({
      query: (data) => ({
        url: "inventory/preorder/",
        method: "POST",
        body: data,
      }),
    }),
    getPreorderById: builder.query({
      query: (id) => `inventory/preorder/${id}/`,
    }),
    updatePreorder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `inventory/preorder/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),

    
  }),
});

export const { useGetPreorderQuery,useCreatePreorderMutation, useGetPreorderByIdQuery, useUpdatePreorderMutation } = preorderApi;