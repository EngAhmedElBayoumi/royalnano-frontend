import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/lib/config";
const baseUrl = config.apiUrl;

export const refreshTokenApi = createApi({
  reducerPath: "refreshTokenApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (data) => ({
        url: "token/refresh/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRefreshTokenMutation } = refreshTokenApi;
