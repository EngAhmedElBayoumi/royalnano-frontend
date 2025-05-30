import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const initializePaymentApi = createApi({
  reducerPath: "initializePaymentApi",
  baseQuery,
  endpoints: (builder) => ({
    getInitialPrices: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `sales/initializePayment-adjustment`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getInitialPriceById: builder.query({
      query: (id) => `sales/initialize-payment/${id}/`,
    }),
    createInitialPrice: builder.mutation({
      query: (payload) => ({
        // Changed from 'data' to 'payload' for clarity
        url: `sales/initialize-payment/`,
        method: "POST",
        body: payload, // This will send { request_id: serviceId }
      }),
    }),
    updateInitialPrice: builder.mutation({
      query: ({ id, data }) => ({
        url: `sales/initialize-payment/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetInitialPricesQuery,
  useGetInitialPriceByIdQuery,
  useCreateInitialPriceMutation,
  useUpdateInitialPriceMutation,
} = initializePaymentApi;
