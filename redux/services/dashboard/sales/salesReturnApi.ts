import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const salesReturnApi = createApi({
  reducerPath: "salesReturnApi",
  baseQuery,
  endpoints: (builder) => ({
    getSalesReturn: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "sales/sales-return/",
        method: "GET",
        params: { search, ordering, page, page_size },

      }),
    }),

    createSalesReturn: builder.mutation({
      query: (data) => ({
        url: "sales/sales-return/",
        method: "POST",
        body: data,
      }),
    }),
   
          //fe hena patch kman , bs let's test asln eh l sh8al mnhom -_-
    updateSalesReturn: builder.mutation({
        query: ({ id, ...data }) => ({
          url: `sales/sales-return/${id}/`,
          method: "PATCH",
          body: data,
        }),
      }),
   


    
    getSalesReturnById: builder.query({
      query: (id) => `sales/sales-return/${id}/`,
    }),


    
  }),
});

export const { useGetSalesReturnQuery,useCreateSalesReturnMutation, useGetSalesReturnByIdQuery, useUpdateSalesReturnMutation } = salesReturnApi;