import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../common";

export const evaluationApi = createApi({
  reducerPath: "evaluationApi",
  baseQuery,
  endpoints: (builder) => ({
    createEvaluation: builder.mutation({
      query: (data) => ({
        url: "/hr/evaluation",
        method: "POST",
        body: data,
      }),
    }),
    updateEvaluation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hr/evaluation/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getEvaluationById: builder.query({
      query: (id) => `/hr/evaluation/${id}`,
    }),
    getEvaluations: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: "/hr/evaluation",
        params: { search, ordering, page, page_size },
      }),
    }),
  }),
});

export const {
  useCreateEvaluationMutation,
  useUpdateEvaluationMutation,
  useGetEvaluationByIdQuery,
  useGetEvaluationsQuery,
} = evaluationApi;
