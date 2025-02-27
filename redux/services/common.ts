import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import { logout, setCredentials } from "@/redux/slices/authSlice";
import { setProfile } from "@/redux/slices/profileSlice";
import { refreshTokenApi } from "./refreshTokenApi";
import config from "@/lib/config";
import { checkToken } from "@/lib/utils/checkToken";

const baseUrl = config.apiUrl;

// Define public API endpoints (No auth required)
const PUBLIC_ENDPOINTS = ["core", "token", "website"];
export const baseQuery = async (
  args: string | { url: string; body?: any },
  api: any,
  extraOptions: Record<string, any>
) => {
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

      const profileResponse = await fetch(`${config.apiUrl}core/profile`, {
        headers: {
          Authorization: `Bearer ${refreshResult.data.access}`,
          "Content-Type": "application/json",
        },
      });
      const profileData = await profileResponse.json();

      api.dispatch(
        setProfile({
          name: profileData.name,
          emailAddress: profileData.email_address,
          phoneNumber: profileData.phone_number,
          role: profileData.role,
          profilePicture: profileData.profile_picture,
          permissions: profileData.permissions,
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
