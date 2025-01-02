import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery,
  endpoints: (builder) => ({
    postContact: builder.mutation({
      query: (data) => ({
        url: "core/contact",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostContactMutation } = contactApi;
