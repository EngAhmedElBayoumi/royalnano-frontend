import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const salesOrderApi = createApi({
  reducerPath: "salesOrderApi",
  baseQuery,
  endpoints: (builder) => ({
    getSalesOrder: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "sales/sales-order/",
        method: "GET",
        params: { search, ordering, page, page_size },

      }),
    }),

    createSalesOrder: builder.mutation({
      query: (data) => ({
        url: "sales/sales-order/",
        method: "POST",
        body: data,
      }),
    }),
    // cancelSalesOrder: builder.mutation({
    //     query: (id,...data) => ({
    //       url: `sales/sales-order/${id}/cancel/`,
    //       method: "POST",
    //       body: data,
    //     }),
    //   }),
    updateSalesOrder: builder.mutation({
        query: ({ id, ...data }) => ({
          url: `sales/sales-order/${id}/`,
          method: "PATCH",
          body: data,
        }),
      }),
    // getMiniSalesOrder: builder.query({
    //     query: ({ search, ordering, page, page_size }) => ({
    //       url: "sales/sales-order/mini/",
    //       method: "GET",
    //       params: { search, ordering, page, page_size },
  
    //     }),
    //   }),


    
    getSalesOrderById: builder.query({
      query: (id) => `sales/sales-order/${id}/`,
    }),


    
  }),
});

export const { useGetSalesOrderQuery,useCreateSalesOrderMutation, useGetSalesOrderByIdQuery, useUpdateSalesOrderMutation, 
    // useGetMiniSalesOrderQuery,
    // useCancelSalesOrderMutation 
} = salesOrderApi;