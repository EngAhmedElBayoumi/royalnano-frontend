import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const employeeAttachmentApi = createApi({
  reducerPath: "employeeAttachmentApi",
  baseQuery,
  tagTypes: ["EmployeeAttachment"],
  endpoints: (builder) => ({
    getEmployeeAttachments: builder.query({
      query: (employeeId) => ({
        url: "hr/employee-attachments/",
        params: { employee: employeeId },
      }),
      providesTags: ["EmployeeAttachment"],
    }),
    createEmployeeAttachment: builder.mutation({
      query: (data) => ({
        url: "hr/employee-attachments/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EmployeeAttachment"],
    }),
    updateEmployeeAttachment: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/employee-attachments/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["EmployeeAttachment"],
    }),
    deleteEmployeeAttachment: builder.mutation({
      query: (id) => ({
        url: `hr/employee-attachments/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmployeeAttachment"],
    }),
    downloadEmployeeAttachment: builder.query({
      query: (id) => ({
        url: `hr/employee-attachments/${id}/download/`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetEmployeeAttachmentsQuery,
  useCreateEmployeeAttachmentMutation,
  useUpdateEmployeeAttachmentMutation,
  useDeleteEmployeeAttachmentMutation,
  useDownloadEmployeeAttachmentQuery,
} = employeeAttachmentApi;

