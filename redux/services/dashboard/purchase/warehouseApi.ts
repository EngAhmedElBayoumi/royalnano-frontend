import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const purchaseWarehouseApi = createApi({
  reducerPath: "warehouseApi",
  baseQuery,
  endpoints: (builder) => ({
    getWarehouses: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/warehouse`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getWarehousesMini: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/warehouse/mini`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getWarehouseById: builder.query({
      query: (id) => `purchase/warehouse/${id}/`,
    }),
    createWarehouse: builder.mutation({
      query: (data) => ({
        url: `purchase/warehouse/`,
        method: "POST",
        body: data,
      }),
    }),
    updateWarehouse: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchase/warehouse/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `purchase/warehouse/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetWarehousesQuery,
  useGetWarehousesMiniQuery,
  useGetWarehouseByIdQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} = purchaseWarehouseApi;
