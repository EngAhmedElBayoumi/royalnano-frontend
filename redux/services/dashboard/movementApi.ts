import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common";

export const movementApi = createApi({
  reducerPath: "movementApi",
  baseQuery,
  endpoints: (builder) => ({
    getMovements: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `inventory/movement/`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getMovementById: builder.query({
      query: (id) => `inventory/movement/${id}/`,
    }),
    createMovement: builder.mutation({
      query: (data) => ({
        url: `inventory/movement/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMovementsQuery,
  useGetMovementByIdQuery,
  useCreateMovementMutation,
} = movementApi;
