import config from "@/lib/config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = config.apiUrl;

export const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  return result;
};
