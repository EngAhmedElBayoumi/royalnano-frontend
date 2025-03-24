import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./common";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "core/profile",
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "core/profile/",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
