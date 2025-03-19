import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const purchaseOrderApi = createApi({
  reducerPath: "orderApi",
  baseQuery,
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/purchase-order`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getOrdersMini: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/purchase-order/mini`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getOrderById: builder.query({
      query: (id) => `purchase/purchase-order/${id}/`,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `purchase/purchase-order/`,
        method: "POST",
        body: data,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchase/purchase-order/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `purchase/purchase-order/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrdersMiniQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = purchaseOrderApi;
