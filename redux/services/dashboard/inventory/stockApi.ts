import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery,
  endpoints: (builder) => ({
    getStockAdjustments: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `inventory/stock-adjustment`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getStockAdjustmentById: builder.query({
      query: (id) => `inventory/stock-adjustment/${id}/`,
    }),
    createStockAdjustment: builder.mutation({
      query: (data) => ({
        url: `inventory/stock-adjustment/`,
        method: "POST",
        body: data,
      }),
    }),
    updateStockAdjustment: builder.mutation({
      query: ({ id, data }) => ({
        url: `inventory/stock-adjustment/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetStockAdjustmentsQuery,
  useGetStockAdjustmentByIdQuery,
  useCreateStockAdjustmentMutation,
  useUpdateStockAdjustmentMutation,
} = stockApi;
