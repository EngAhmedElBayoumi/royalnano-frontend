import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const interviewsApi = createApi({
  reducerPath: "interviewsApi",
  baseQuery,
  endpoints: (builder) => ({
    getInterviews: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `hr/interview`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getInterviewById: builder.query({
      query: (id) => `hr/interview/${id}`,
    }),
    createInterview: builder.mutation({
      query: (data) => ({
        url: `hr/interview/`,
        method: "POST",
        body: data,
      }),
    }),
    updateInterview: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/interview/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetInterviewsQuery,
  useGetInterviewByIdQuery,
  useCreateInterviewMutation,
  useUpdateInterviewMutation,
} = interviewsApi;
