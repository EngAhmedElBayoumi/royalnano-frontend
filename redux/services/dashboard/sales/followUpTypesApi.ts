import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const followUpTypesApi = createApi({
  reducerPath: "followUpTypesApi",
  baseQuery,
  endpoints: (builder) => ({
    getFollowUpTypes: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "sales/follow-up-types/",
        method: "GET",
        params: { search, ordering, page, page_size },
      }),
    }),
    createFollowUpType: builder.mutation({
      query: (data) => ({
        url: "sales/follow-up-types/",
        method: "POST",
        body: data,
      }),
    }),
    getFollowUpTypeById: builder.query({
      query: (id) => `sales/follow-up-types/${id}/`,
    }),
    updateFollowUpType: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `sales/follow-up-types/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetFollowUpTypesQuery,
  useCreateFollowUpTypeMutation,
  useGetFollowUpTypeByIdQuery,
  useUpdateFollowUpTypeMutation,
} = followUpTypesApi;
