import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const salesCustomerApi = createApi({
  reducerPath: "salesCustomerApi",
  baseQuery,
  endpoints: (builder) => ({
    getSalesCustomer: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "sales/customer/",
        method: "GET",
        params: { search, ordering, page, page_size },
      }),
    }),
    createSalesCustomer: builder.mutation({
      query: (data) => ({
        url: "sales/customer/",
        method: "POST",
        body: data,
        // formData: true,
      }),
    }),
    getMiniSalesCustomer: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "sales/customer/mini/",
        method: "GET",
        params: { search, ordering, page, page_size },
      }),
    }),
    getSalesCustomerById: builder.query({
      query: (id) => `sales/customer/${id}/`,
    }),
    updateSalesCustomer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `sales/customer/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSalesCustomerQuery,
  useCreateSalesCustomerMutation,
  useGetSalesCustomerByIdQuery,
  useUpdateSalesCustomerMutation,
  useGetMiniSalesCustomerQuery,
} = salesCustomerApi;
