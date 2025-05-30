import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

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
        formData: true,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
