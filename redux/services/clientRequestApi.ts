import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";


export const clientRequestAPi = createApi({
  reducerPath: "clietRequestAPi",
  baseQuery,
  endpoints: (builder) => ({
    getClientRequest: builder.query({
      query: () => "sales/client-request/",
    }),
    createClientRequest: builder.mutation({
      query: (data) => ({
        url: "sales/client-request/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetClientRequestQuery, useCreateClientRequestMutation } = clientRequestAPi;