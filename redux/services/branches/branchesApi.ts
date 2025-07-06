import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common";

export interface Branch {
  id: number;
  name: string;
  branch_code: string;
  location?: string;
  description?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  balance: string;
  extra_fields?: any;
  manager?: number;
}

export interface BranchesResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Branch[];
}

export const branchesApi = createApi({
  reducerPath: "branchesApi",
  baseQuery,
  tagTypes: ["Branch"],
  endpoints: (builder) => ({
    getBranches: builder.query<BranchesResponse, void>({
      query: () => "inventory/branch/",
      providesTags: ["Branch"],
    }),
  }),
});

export const {
  useGetBranchesQuery,
} = branchesApi;

