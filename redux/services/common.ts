import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import { logout, setCredentials } from "@/redux/slices/authSlice";
import { setProfile } from "@/redux/slices/profileSlice";
import { refreshTokenApi } from "./auth/refreshTokenApi";
import config from "@/lib/config";
import { checkToken } from "@/lib/utils/checkToken";

const baseUrl = config.apiUrl;

// Define public API endpoints (No auth required)
const PUBLIC_ENDPOINTS = [
  "core/register",
  "core/login",
  "core/contact",
  "core/forgot-password",
  "core/logout",
  "core/resend-otp",
  "core/reset-password",
  "core/verify-otp",
  "token",
  "website",
];

// Update the args type to include the method property
type RequestArgs =
  | string
  | {
      url: string;
      method?: string;
      body?: unknown;
    };

export const baseQuery = async (
  args: RequestArgs,
  // eslint-disable-next-line
  api: any,
  extraOptions: Record<string, unknown>
) => {
  const state: RootState = api.getState();
  let accessToken = state?.auth?.accessToken;
  const refreshToken = state?.auth?.refreshToken;

  // Check if the request is for a public API and not on dashboard page
  const isPublicRequest = PUBLIC_ENDPOINTS.some((endpoint) => {
    const isPublicEndpoint =
      typeof args === "string"
        ? args.startsWith(endpoint)
        : args.url.startsWith(endpoint);

    const isWebsiteEndpoint =
      typeof args === "string"
        ? args.startsWith("website/")
        : args.url.startsWith("website/");

    const isNotDashboard = !window.location.pathname.includes("dashboard");
    const isGetRequest =
      typeof args === "string" || !("method" in args) || args.method === "GET";

    return isWebsiteEndpoint
      ? isGetRequest
      : isPublicEndpoint && isNotDashboard;
  });

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
          email_address: state.auth.email_address,
        })
      );

      const profileResponse = await fetch(`${config.apiUrl}core/profile`, {
        headers: {
          Authorization: `Bearer ${refreshResult.data.access}`,
          "Content-Type": "application/json",
        },
      });
      const profileData = await profileResponse.json();

      api.dispatch(setProfile(profileData));

      accessToken = refreshResult.data.access;
    } else {
      api.dispatch(logout());
      window.location.href = "/";
      return { error: { status: 401, message: "Unauthorized" } };
    }
  }

  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {}) => {
      // Don't set content-type for FormData, browser will set it automatically
      // if (
      //   typeof args === "object" &&
      //   args.body &&
      //   !(args.body instanceof FormData)
      // ) {
      //   headers.set("content-type", "application/json");
      // }
      if (
        typeof args === "object" &&
        args.body &&
        !(args.body instanceof FormData)
      ) {
        headers.set("Content-Type", "application/json");
      } else {
        headers.delete("Content-Type"); // ← ده مهم جدًا!
      }

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  return result;
};
