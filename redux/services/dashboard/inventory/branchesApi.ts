import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const branchApi = createApi({
  reducerPath: "branchApi",
  baseQuery,
  endpoints: (builder) => ({
    getBranches: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `inventory/branch`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getBranchById: builder.query({
      query: (id) => `inventory/branch/${id}/`,
    }),
    createBranch: builder.mutation({
      query: (data) => ({
        url: `inventory/branch/`,
        method: "POST",
        body: data,
      }),
    }),
    updateBranch: builder.mutation({
      query: ({ id, data }) => ({
        url: `inventory/branch/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useGetBranchByIdQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
} = branchApi;
