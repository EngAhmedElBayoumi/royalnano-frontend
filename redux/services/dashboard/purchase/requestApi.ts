import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const purchaseRequestApi = createApi({
  reducerPath: "requestApi",
  baseQuery,
  endpoints: (builder) => ({
    getRequests: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/purchase-request`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getRequestsMini: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/purchase-request/mini`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getRequestById: builder.query({
      query: (id) => `purchase/purchase-request/${id}/`,
    }),
    createRequest: builder.mutation({
      query: (data) => ({
        url: `purchase/purchase-request/`,
        method: "POST",
        body: data,
      }),
    }),
    updateRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchase/purchase-request/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `purchase/purchase-request/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useGetRequestsMiniQuery,
  useGetRequestByIdQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
} = purchaseRequestApi;
