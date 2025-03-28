import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const setPriceApi = createApi({
  reducerPath: "setPriceApi",
  baseQuery,
  endpoints: (builder) => ({
    postSetPrice: builder.mutation({
      query: ({ request_id, data }) => ({
        url: `sales/set-price/${request_id}/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostSetPriceMutation } = setPriceApi;
