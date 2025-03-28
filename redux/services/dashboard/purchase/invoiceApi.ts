import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const purchaseInvoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery,
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/purchase_invoice`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getInvoicesMini: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/purchase_invoice/mini`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getInvoiceById: builder.query({
      query: (id) => `purchase/purchase_invoice/${id}/`,
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: `purchase/purchase_invoice/`,
        method: "POST",
        body: data,
      }),
    }),
    updateInvoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchase/purchase_invoice/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `purchase/purchase_invoice/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoicesMiniQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = purchaseInvoiceApi;
