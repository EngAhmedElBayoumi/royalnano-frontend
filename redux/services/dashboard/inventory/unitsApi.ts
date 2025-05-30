import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery,
  endpoints: (builder) => ({
    getUnits: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `inventory/stock-adjustment`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getUnitById: builder.query({
      query: (id) => `inventory/stock-adjustment/${id}/`,
    }),
    createUnit: builder.mutation({
      query: (data) => ({
        url: `inventory/stock-adjustment/`,
        method: "POST",
        body: data,
      }),
    }),
    updateUnit: builder.mutation({
      query: ({ id, data }) => ({
        url: `inventory/stock-adjustment/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUnitsQuery,
  useGetUnitByIdQuery,
  useCreateUnitMutation,
  useUpdateUnitMutation,
} = stockApi;
