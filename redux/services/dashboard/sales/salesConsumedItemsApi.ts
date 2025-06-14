import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const consumedItemsApi = createApi({
  reducerPath: "consumedItemsApi",
  baseQuery,
  endpoints: (builder) => ({
    getConsumedItems: builder.query({
      query: ({ search, ordering, page, page_size, customer }) => ({
        url: "sales/sales-consumed-item/",
        method: "GET",
        params: { search, ordering, page, page_size, customer },
      }),
    }),
    createConsumedItems: builder.mutation({
      query: (data) => ({
        url: "sales/sales-consumed-item/",
        method: "POST",
        body: data,
      }),
    }),
    getConsumedItemsById: builder.query({
      query: (id) => `sales/sales-consumed-item/${id}/`,
    }),
    updateConsumedItems: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `sales/sales-consumed-item/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetConsumedItemsQuery,
  useCreateConsumedItemsMutation,
  useGetConsumedItemsByIdQuery,
  useUpdateConsumedItemsMutation,
} = consumedItemsApi;
