import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const itemCategoryApi = createApi({
  reducerPath: "itemCategoryApi",
  baseQuery,
  endpoints: (builder) => ({
    getItemCategory: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "inventory/item-category",
        method: "GET",
        params: { search, ordering, page, page_size },
      }),
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "inventory/item-category/",
        method: "POST",
        body: data,
      }),
    }),
    getCategoryById: builder.query({
      query: (id) => `inventory/item-category/${id}/`,
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `inventory/item-category/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetItemCategoryQuery,
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = itemCategoryApi;
