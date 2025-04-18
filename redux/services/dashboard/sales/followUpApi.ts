import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const followUpApi = createApi({
  reducerPath: "followUpApi",
  baseQuery,
  endpoints: (builder) => ({
    getFollowUp: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "sales/follow-ups/",
        method: "GET",
        params: { search, ordering, page, page_size },
      }),
    }),
    createFollowUp: builder.mutation({
      query: (data) => ({
        url: "sales/follow-ups/",
        method: "POST",
        body: data,
      }),
    }),
    getFollowUpById: builder.query({
      query: (id) => `sales/follow-ups/${id}/`,
    }),
    updateFollowUp: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `sales/follow-ups/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetFollowUpQuery,
  useCreateFollowUpMutation,
  useGetFollowUpByIdQuery,
  useUpdateFollowUpMutation,
} = followUpApi;
