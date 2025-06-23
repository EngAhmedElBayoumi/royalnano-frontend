import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const branchTransactionsApi = createApi({
  reducerPath: "branchTransactionsApi",
  baseQuery,
  endpoints: (builder) => ({
    getBranchesTransactions: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `inventory/branch-transactions`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getBranchTransactionsById: builder.query({
      query: (id) => `inventory/branch-transactions/${id}/`,
    }),
    createBranchTransactions: builder.mutation({
      query: (data) => ({
        url: `inventory/branch-transactions/`,
        method: "POST",
        body: data,
      }),
    }),
    updateBranchTransactions: builder.mutation({
      query: ({ id, data }) => ({
        url: `inventory/branch-transactions/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBranchesTransactionsQuery,
  useGetBranchTransactionsByIdQuery,
  useCreateBranchTransactionsMutation,
  useUpdateBranchTransactionsMutation,
} = branchTransactionsApi;
