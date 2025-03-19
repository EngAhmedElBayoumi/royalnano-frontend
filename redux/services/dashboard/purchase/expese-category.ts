import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const purchaseExpenseCategoryApi = createApi({
  reducerPath: "expenseCategoryApi",
  baseQuery,
  endpoints: (builder) => ({
    getExpenseCategorys: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/expense-category`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getExpenseCategorysMini: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `purchase/expense-category/mini`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getExpenseCategoryById: builder.query({
      query: (id) => `purchase/expense-category/${id}/`,
    }),
    createExpenseCategory: builder.mutation({
      query: (data) => ({
        url: `purchase/expense-category/`,
        method: "POST",
        body: data,
      }),
    }),
    updateExpenseCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchase/expense-category/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteExpenseCategory: builder.mutation({
      query: (id) => ({
        url: `purchase/expense-category/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetExpenseCategorysQuery,
  useGetExpenseCategorysMiniQuery,
  useGetExpenseCategoryByIdQuery,
  useCreateExpenseCategoryMutation,
  useUpdateExpenseCategoryMutation,
  useDeleteExpenseCategoryMutation,
} = purchaseExpenseCategoryApi;
