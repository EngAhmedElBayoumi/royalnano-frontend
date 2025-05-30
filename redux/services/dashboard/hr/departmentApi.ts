import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery,
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `hr/department`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getDepartmentById: builder.query({
      query: (id) => `hr/department/${id}/`,
    }),
    createDepartment: builder.mutation({
      query: (data) => ({
        url: `hr/department/`,
        method: "POST",
        body: data,
      }),
    }),
    updateDepartment: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/department/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentApi;
