import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";

export const galleryAPi = createApi({
  reducerPath: "galleryAPi",
  baseQuery,
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: () => "website/gallery/",
    }),
  }),
});

export const { useGetGalleryQuery } = galleryAPi;
