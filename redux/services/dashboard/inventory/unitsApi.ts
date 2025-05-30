import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const unitsApi = createApi({
  reducerPath: "unitsApi",
  baseQuery,
  endpoints: (builder) => ({
    getUnits: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `inventory/unit`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getUnitById: builder.query({
      query: (id) => `inventory/unit/${id}/`,
    }),
    createUnit: builder.mutation({
      query: (data) => ({
        url: `inventory/unit/`,
        method: "POST",
        body: data,
      }),
    }),
    updateUnit: builder.mutation({
      query: ({ id, data }) => ({
        url: `inventory/unit/${id}/`,
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
} = unitsApi;
