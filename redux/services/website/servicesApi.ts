import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

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
    getActiveServices: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "website/services/active",
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
      query: ({ id, data }) => ({
        url: `website/services/${id}/`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetActiveServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
} = servicesAPi;
