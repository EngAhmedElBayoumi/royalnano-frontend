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
    getServiceById: builder.query({
      query: (id) => `website/services/${id}/`,
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: "website/services/",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    updateService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `website/services/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
} = servicesAPi;
