import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const vacationApi = createApi({
  reducerPath: "vacationApi",
  baseQuery,
  endpoints: (builder) => ({
    getVacation: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `hr/leave-request`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getVacationById: builder.query({
      query: (id) => `hr/leave-request/${id}/`,
    }),
    createVacation: builder.mutation({
      query: (data) => ({
        url: `hr/leave-request/`,
        method: "POST",
        body: data,
      }),
    }),
    updateVacation: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/leave-request/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetVacationQuery,
  useGetVacationByIdQuery,
  useCreateVacationMutation,
  useUpdateVacationMutation,
} = vacationApi;
