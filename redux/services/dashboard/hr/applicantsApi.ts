import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const applicantsApi = createApi({
  reducerPath: "applicantsApi",
  baseQuery,
  endpoints: (builder) => ({
    getApplicants: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `hr/applicants`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getApplicantById: builder.query({
      query: (id) => `hr/applicants/${id}/`,
    }),
    createApplicant: builder.mutation({
      query: (data) => ({
        url: `hr/applicants/`,
        method: "POST",
        body: data,
      }),
    }),
    updateApplicant: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/applicants/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetApplicantsQuery,
  useGetApplicantByIdQuery,
  useCreateApplicantMutation,
  useUpdateApplicantMutation,
} = applicantsApi;
