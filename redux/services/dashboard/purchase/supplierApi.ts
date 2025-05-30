import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const PurchaseSupplierApi = createApi({
  reducerPath: "supplierApi",
  baseQuery,
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/supplier`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getSuppliersMini: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/supplier/mini`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getSupplierById: builder.query({
      query: (id) => `purchase/supplier/${id}/`,
    }),
    createSupplier: builder.mutation({
      query: (data) => ({
        url: `purchase/supplier/`,
        method: "POST",
        body: data,
      }),
    }),
    updateSupplier: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchase/supplier/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `purchase/supplier/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSuppliersMiniQuery,
  useGetSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = PurchaseSupplierApi;
