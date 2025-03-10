import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./../common";

export const servicesAPi = createApi({
  reducerPath: "servicesAPi",
  baseQuery,
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "website/services/",
        params: { search, ordering, page, page_size },
      }),
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: "website/services/",
        method: "POST",
        body: data,
      }),
    }),
    updateService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `website/services/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `website/services/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesAPi;
