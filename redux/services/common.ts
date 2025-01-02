import config from "@/lib/config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = config.apiUrl;

export const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");

      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  return result;
};
