import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const salesSalesClientRequestApi = createApi({
  reducerPath: "salesSalesClientRequestApi",
  baseQuery,
  endpoints: (builder) => ({
    getSalesSalesClientRequest: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "sales/client-requests/all/",
        method: "GET",
        params: { search, ordering, page, page_size },
      }),
    }),
    createSalesSalesClientRequest: builder.mutation({
      query: (data) => ({
        url: "sales/client-requests/all/",
        method: "POST",
        body: data,
      }),
    }),
    getMiniSalesSalesClientRequest: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "sales/client-requests/all/mini/",
        method: "GET",
        params: { search, ordering, page, page_size },
      }),
    }),
    getSalesSalesClientRequestById: builder.query({
      query: (id) => `sales/client-requests/all/${id}/`,
    }),
    updateSalesSalesClientRequest: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `sales/client-requests/all/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSalesSalesClientRequestQuery,
  useCreateSalesSalesClientRequestMutation,
  useGetSalesSalesClientRequestByIdQuery,
  useUpdateSalesSalesClientRequestMutation,
  useGetMiniSalesSalesClientRequestQuery,
} = salesSalesClientRequestApi;
