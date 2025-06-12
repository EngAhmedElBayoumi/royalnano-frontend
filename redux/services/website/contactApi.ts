import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery,
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "core/contact",
        params: { search, ordering, page, page_size },
      }),
    }),
    postContact: builder.mutation({
      query: (data) => ({
        url: "core/contact/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetContactsQuery, usePostContactMutation } = contactApi;
