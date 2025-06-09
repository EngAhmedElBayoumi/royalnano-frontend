import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery,
  tagTypes: ["finance"],
  endpoints: (builder) => ({
    getFinance: builder.query({
      query: () => ({
        url: "finance/accounts/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [{ type: "finance", id: "LIST" }]
          : [], // Enables re-fetching when invalidated
    }),

    createFinance: builder.mutation({
      query: (data) => ({
        url: "finance/accounts/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "finance", id: "LIST" }],
    }),

    getMiniFinance: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "finance/accounts/",
        method: "GET",
        params: { search, ordering, page, page_size },
      }),
    }),

    getFinanceById: builder.query({
      query: (id) => `finance/accounts/${id}/`,
    }),

    updateFinance: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `finance/accounts/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "finance", id: "LIST" }],
    }),
  }),
});

export const {
    useGetFinanceQuery,
    useCreateFinanceMutation,
    useGetFinanceByIdQuery,
    useUpdateFinanceMutation,
    useGetMiniFinanceQuery,
} = financeApi;