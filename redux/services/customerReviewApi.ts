import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";

export const customerReviewApi = createApi({
  reducerPath: "customerReviewApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "website/customer-review/",
        params: { search, ordering, page, page_size },
      }),
    }),
    getReviewById: builder.query({
      query: (id) => `website/customer-review/${id}/`,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: "website/customer-review/",
        method: "POST",
        body: data,
      }),
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `website/customer-review/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
} = customerReviewApi;
