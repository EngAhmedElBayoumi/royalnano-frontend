import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const galleryAPi = createApi({
  reducerPath: "galleryAPi",
  baseQuery,
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "website/gallery/",
        params: { search, ordering, page, page_size },
      }),
    }),
    getGalleryById: builder.query({
      query: (id) => `website/gallery/${id}/`,
    }),
    createGallery: builder.mutation({
      query: (data) => ({
        url: "website/gallery/",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    updateGallery: builder.mutation({
      query: ({ id, data }) => ({
        url: `website/gallery/${id}/`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetGalleryQuery,
  useGetGalleryByIdQuery,
  useCreateGalleryMutation,
  useUpdateGalleryMutation,
} = galleryAPi;
