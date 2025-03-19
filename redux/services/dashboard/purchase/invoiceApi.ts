import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const purchaseInvoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery,
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/invoice`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getInvoicesMini: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/invoice/mini`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getInvoiceById: builder.query({
      query: (id) => `purchase/invoice/${id}/`,
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: `purchase/invoice/`,
        method: "POST",
        body: data,
      }),
    }),
    updateInvoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchase/invoice/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `purchase/invoice/${id}/`,
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
