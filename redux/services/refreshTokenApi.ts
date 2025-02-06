import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";

export const refreshTokenApi = createApi({
  reducerPath: "refreshTokenApi",
  baseQuery,
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
