import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common";

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


    getSalesQuotationById: builder.query({
      query: (id) => `sales/sales-quotation/${id}/`,
    }),
   

    
  }),
});

export const { useGetSalesQuotationQuery, useGetSalesQuotationByIdQuery } = salesQuotationApi;