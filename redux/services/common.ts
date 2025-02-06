import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import { selectAccessToken } from "@/redux/slices/authSlice";
import config from "@/lib/config";

const baseUrl = config.apiUrl;

export const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const state: RootState = api.getState();
  const accessToken = selectAccessToken(state);

  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  return result;
};
