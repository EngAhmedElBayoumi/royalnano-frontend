import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common";

export const salesInvoiceApi = createApi({
  reducerPath: "salesInvoiceApi",
  baseQuery,
  endpoints: (builder) => ({
    getSalesInvoice: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "sales/sales-invoice/",
        method: "GET",
        params: { search, ordering, page, page_size },

      }),
    }),

    createSalesInvoice: builder.mutation({
      query: (data) => ({
        url: "sales/sales-invoice/",
        method: "POST",
        body: data,
      }),
    }),
    cancelSalesInvoice: builder.mutation({
        query: (id,...data) => ({
          url: `sales/sales-invoice/${id}/cancel/`,
          method: "POST",
          body: data,
        }),
      }),
          //fe hena patch kman , bs let's test asln eh l sh8al mnhom -_-
    updateSalesInvoice: builder.mutation({
        query: ({ id, ...data }) => ({
          url: `sales/sales-invoice/${id}/`,
          method: "PUT",
          body: data,
        }),
      }),
    getMiniSalesInvoice: builder.query({
        query: ({ search, ordering, page, page_size }) => ({
          url: "sales/sales-invoice/mini/",
          method: "GET",
          params: { search, ordering, page, page_size },
  
        }),
      }),


    
    getSalesInvoiceById: builder.query({
      query: (id) => `sales/sales-invoice/${id}/`,
    }),


    
  }),
});

export const { useGetSalesInvoiceQuery,useCreateSalesInvoiceMutation, useGetSalesInvoiceByIdQuery, useUpdateSalesInvoiceMutation, useGetMiniSalesInvoiceQuery,useCancelSalesInvoiceMutation } = salesInvoiceApi;