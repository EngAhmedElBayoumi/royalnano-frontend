import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const competitionApi = createApi({
  reducerPath: "competitionApi",
  baseQuery,
  endpoints: (builder) => ({
    getCompetitions: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `hr/competition`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getCompetitionById: builder.query({
      query: (id) => `hr/competition/${id}`,
    }),
    createCompetition: builder.mutation({
      query: (data) => ({
        url: "hr/competition/",
        method: "POST",
        body: data,
      }),
    }),
    updateCompetition: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/competition/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCompetitionsQuery,
  useGetCompetitionByIdQuery,
  useCreateCompetitionMutation,
  useUpdateCompetitionMutation,
} = competitionApi;
