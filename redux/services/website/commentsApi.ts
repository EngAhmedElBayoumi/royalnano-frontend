import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./../common";

export const commentsAPi = createApi({
  reducerPath: "commentsAPi",
  baseQuery,
  endpoints: (builder) => ({
    getComments: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "website/comments/",
        params: { search, ordering, page, page_size },
      }),
    }),
    getCommentById: builder.query({
      query: (id) => `website/comments/${id}/`,
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: "website/comments/",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `website/comments/${id}/`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `website/comments/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentByIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsAPi;
