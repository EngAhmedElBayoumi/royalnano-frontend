import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import config from "@/lib/config";
import { checkToken } from "@/lib/utils/checkToken";
import { logout, setCredentials } from "@/redux/slices/authSlice";
import { refreshTokenApi } from "./refreshTokenApi";

const baseUrl = config.apiUrl;

// Define public API endpoints (No auth required)
const PUBLIC_ENDPOINTS = ["/core", "/token", "/website"];
export const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const state: RootState = api.getState();
  let accessToken = state.auth.accessToken;
  const refreshToken = state.auth.refreshToken;

  // Check if the request is for a public API
  const isPublicRequest = PUBLIC_ENDPOINTS.some((endpoint) =>
    typeof args === "string"
      ? args.startsWith(endpoint)
      : args.url.startsWith(endpoint)
  );

  // If the request is public, no token is needed
  if (isPublicRequest)
    return fetchBaseQuery({ baseUrl })(args, api, extraOptions);

  // Check if accessToken is expired
  if (accessToken && !checkToken(accessToken) && refreshToken) {
    // Refresh token using RTK Query
    const refreshResult = await api.dispatch(
      refreshTokenApi.endpoints.refreshToken.initiate({ refresh: refreshToken })
    );

    if (refreshResult?.data) {
      // Store new tokens
      api.dispatch(
        setCredentials({
          accessToken: refreshResult.data.access,
          refreshToken: refreshResult.data.refresh,
          userId: state.auth.userId,
          emailAddress: state.auth.emailAddress,
        })
      );

      accessToken = refreshResult.data.access;
    } else {
      api.dispatch(logout());
      return { error: { status: 401, message: "Unauthorized" } };
    }
  }

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
