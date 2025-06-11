import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery,
  endpoints: (builder) => ({
    getSocial: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "/core/social-media/",
        params: { search, ordering, page, page_size },
      }),
    }),
    getSocialById: builder.query({
      query: (id) => `/core/social-media/${id}/`,
    }),
    createSocial: builder.mutation({
      query: (data) => ({
        url: "/core/social-media/",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    updateSocial: builder.mutation({
      query: ({ id, data }) => ({
        url: `/core/social-media/${id}/`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetSocialQuery,
  useGetSocialByIdQuery,
  useCreateSocialMutation,
  useUpdateSocialMutation,
} = socialApi;
