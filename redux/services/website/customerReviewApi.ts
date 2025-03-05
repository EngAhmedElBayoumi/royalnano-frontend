import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./../common";


export const customerReviewAPi = createApi({
  reducerPath: "customerReviewAPi",
  baseQuery,
  endpoints: (builder) => ({
    getCustomerReview: builder.query({
      query: () => "website/customer-review/",
    }),
  }),
});

export const { useGetCustomerReviewQuery } = customerReviewAPi;
