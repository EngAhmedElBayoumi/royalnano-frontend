import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const bonusesApi = createApi({
  reducerPath: "bonusesApi",
  baseQuery,
  endpoints: (builder) => ({
    getBonuses: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `hr/bonus-deduction`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getBonusById: builder.query({
      query: (id) => `hr/bonus-deduction/${id}/`,
    }),
    createBonus: builder.mutation({
      query: (data) => ({
        url: `hr/bonus-deduction/`,
        method: "POST",
        body: data,
      }),
    }),
    updateBonus: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/bonus-deduction/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBonusesQuery,
  useGetBonusByIdQuery,
  useCreateBonusMutation,
  useUpdateBonusMutation,
} = bonusesApi;
