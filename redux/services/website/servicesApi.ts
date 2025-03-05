import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./../common";


export const servicesAPi = createApi({
  reducerPath: "servicesAPi",
  baseQuery,
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "website/services/",
    }),
  }),
});

export const { useGetServicesQuery } = servicesAPi;
