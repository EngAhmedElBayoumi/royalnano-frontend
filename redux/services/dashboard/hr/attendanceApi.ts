import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery,
  endpoints: (builder) => ({
    getAttendance: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `hr/attendance`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getAttendanceById: builder.query({
      query: (id) => `hr/attendance/${id}/`,
    }),
    createAttendance: builder.mutation({
      query: (data) => ({
        url: `hr/attendance/`,
        method: "POST",
        body: data,
      }),
    }),
    updateAttendance: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/attendance/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAttendanceQuery,
  useGetAttendanceByIdQuery,
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
} = attendanceApi;
