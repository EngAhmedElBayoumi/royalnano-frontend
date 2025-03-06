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

    updateClientRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `sales/client-request/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),

        
    getClientRequestById: builder.query({
      query: (id) => `sales/client-request/${id}/`,
    }),

  }),
});

export const { useGetClientRequestQuery,useGetClientRequestByIdQuery, useCreateClientRequestMutation,useUpdateClientRequestMutation } = clientRequestAPi;