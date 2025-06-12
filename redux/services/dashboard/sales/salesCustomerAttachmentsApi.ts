import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const attachmentsApi = createApi({
  reducerPath: "attachmentsApi",
  baseQuery,
  endpoints: (builder) => ({
    createAttachments: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `sales/customer/${id}/attachments`,
        method: "POST",
        body: data,
        formData: true,
      }),
    }),

    getAttachmentsById: builder.query({
      query: (id) => `sales/customer/${id}/attachments`,
    }),
    updateAttachments: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `sales/customer/${id}/attachments`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateAttachmentsMutation,
  useGetAttachmentsByIdQuery,
  useUpdateAttachmentsMutation,
} = attachmentsApi;
