import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";

export const customerReviewApi = createApi({
  reducerPath: "customerReviewApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "/website/customer-review/",
    }),
  }),
});

export const { useGetAllReviewsQuery } = customerReviewApi;
