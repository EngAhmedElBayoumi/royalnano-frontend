import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const purchaseOrderApi = createApi({
  reducerPath: "orderApi",
  baseQuery,
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/order`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getOrdersMini: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/order/mini`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getOrderById: builder.query({
      query: (id) => `purchase/order/${id}/`,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `purchase/order/`,
        method: "POST",
        body: data,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchase/order/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `purchase/order/${id}/`,
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
