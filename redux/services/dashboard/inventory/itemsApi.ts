import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery,
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `inventory/items`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getItemById: builder.query({
      query: (id) => `inventory/items/${id}/`,
    }),
    createItem: builder.mutation({
      query: (data) => ({
        url: `inventory/items/`,
        method: "POST",
        body: data,
      }),
    }),
    updateItem: builder.mutation({
      query: ({ id, data }) => ({
        url: `inventory/items/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `inventory/items/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApi;
