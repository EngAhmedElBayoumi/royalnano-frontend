import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery,
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `hr/employee`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getEmployeeById: builder.query({
      query: (id) => `hr/employee/${id}/`,
    }),
    createEmployee: builder.mutation({
      query: (data) => ({
        url: `hr/employee/`,
        method: "POST",
        body: data,
      }),
    }),
    updateEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/employee/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    uploadEmployeeAttachments: builder.mutation({
      query: ({ id, formData }) => ({
        url: `hr/employee/${id}/upload_attachments/`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useUploadEmployeeAttachmentsMutation,
} = employeeApi;
