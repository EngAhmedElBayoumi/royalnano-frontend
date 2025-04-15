import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./../common";

export const blogsAPi = createApi({
  reducerPath: "blogsAPi",
  baseQuery,
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "website/blogs/",
        params: { search, ordering, page, page_size },
      }),
    }),
    getBlogById: builder.query({
      query: (id) => `website/blogs/${id}/`,
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "website/blogs/",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `website/blogs/${id}/`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
} = blogsAPi;
