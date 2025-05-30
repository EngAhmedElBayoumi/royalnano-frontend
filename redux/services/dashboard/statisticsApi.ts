import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const statisticsAPi = createApi({
  reducerPath: "statisticsAPi",
  baseQuery,
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: () => "core/statistics/",
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsAPi;
