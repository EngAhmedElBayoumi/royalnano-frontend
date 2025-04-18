import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { checkToken } from "./lib/utils/checkToken";
import { permissionRoutes } from "./lib/config/permissions";

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales: routing.locales, // Supported locales
  defaultLocale: routing.defaultLocale, // Default locale
});

export async function middleware(req: NextRequest) {
  // Apply the next-intl middleware first
  const intlResponse = intlMiddleware(req);

  // Your custom authentication logic
  const accessToken = req.cookies.get("accessToken")?.value;

  // Get user permissions from cookie (stored during login)
  const permissionsCookie = req.cookies.get("userPermissions")?.value;
  let userPermissions: { [key: string]: { view: boolean } } = {};

  if (permissionsCookie) {
    try {
      userPermissions = JSON.parse(decodeURIComponent(permissionsCookie));
    } catch (e) {
      console.error("Failed to parse permissions cookie:", e);
    }
  }
  // Define the public routes
  const publicRoutes = [
    "/change-password",
    "/forget-password",
    "/login",
    "/otp-verification",
    "/register",
  ];

  // Define the protected routes
  const protectedRoutes = ["/dashboard", "/profile"];

  // Check if the user is authenticated using the access token
  if (accessToken && checkToken(accessToken)) {
    // Redirect to home page if trying to access public routes while logged in
    if (publicRoutes.some((route) => req.nextUrl.pathname.includes(route))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Check permissions for specific routes
    for (const [route, requiredPermissions] of Object.entries(
      permissionRoutes
    )) {
      if (req.nextUrl.pathname.includes(route)) {
        // Check if user has any of the required permissions
        const hasAnyPermission = requiredPermissions.some(
          (permission) => userPermissions[permission]?.view
        );

        if (!hasAnyPermission) {
          // Redirect to unauthorized page or dashboard
          return NextResponse.redirect(new URL("/en/forbidden", req.url));
        }
      }
    }
  } else {
    // Redirect to login page if trying to access protected routes while not authenticated
    if (protectedRoutes.some((route) => req.nextUrl.pathname.includes(route))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow the request to proceed if authenticated and accessing other routes
  return intlResponse || NextResponse.next();
}

// Specify the paths where this middleware should apply
export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*", // Matches locale-specific routes
    "/change-password",
    "/forget-password",
    "/login",
    "/otp-verification",
    "/register",
    "/dashboard/:path*", // Matches "/dashboard" and everything inside it
    "/profile",
    "/book-now",
  ],
};
