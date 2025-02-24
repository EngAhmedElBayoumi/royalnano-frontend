import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const salesQuotationApi = createApi({
  reducerPath: "salesQuotationApi",
  baseQuery,
  endpoints: (builder) => ({
    getSalesQuotation: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "sales/sales-quotation",
        method: "GET",
        params: { search, ordering, page, page_size },

      }),
    }),
    createSalesQuotation: builder.mutation({
      query: (data) => ({
        url: "sales/sales-quotation/",
        method: "POST",
        body: data,
      }),
    }),

    getSalesQuotationById: builder.query({
      query: (id) => `sales/sales-quotation/${id}/`,
    }),
    updateSalesQuotation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `sales/sales-quotation/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),

    
  }),
});

export const { useGetSalesQuotationQuery, useGetSalesQuotationByIdQuery ,useCreateSalesQuotationMutation, useUpdateSalesQuotationMutation} = salesQuotationApi;