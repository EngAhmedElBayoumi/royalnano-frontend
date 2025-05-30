import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery,
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `hr/job-roles`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getJobsById: builder.query({
      query: (id) => `hr/job-roles/${id}/`,
    }),
    createJobs: builder.mutation({
      query: (data) => ({
        url: `hr/job-roles/`,
        method: "POST",
        body: data,
      }),
    }),
    updateJobs: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/job-roles/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobsByIdQuery,
  useCreateJobsMutation,
  useUpdateJobsMutation,
} = jobsApi;
