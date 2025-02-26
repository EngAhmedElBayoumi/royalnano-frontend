import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales: routing.locales, // Supported locales
  defaultLocale: routing.defaultLocale, // Default locale
});
// Define permission requirements for specific routes
const permissionRoutes = {
  "/dashboard/inventory": "inventoryitem",
  "/dashboard/sales": "salesinvoice",
  "/dashboard/hr": "employee",
  "/dashboard/clients": "customer",
  "/dashboard/branches": "branch",
  "/dashboard/website": "service",
};

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
  const protectedRoutes = ["/dashboard", "/profile", "/book-now"];

  // Check if the user is authenticated using the access token
  if (accessToken) {
    // Redirect to home page if trying to access public routes while logged in
    if (publicRoutes.some((route) => req.nextUrl.pathname.includes(route))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Check permissions for specific routes
    for (const [route, requiredPermissions] of Object.entries(
      permissionRoutes
    )) {
      if (req.nextUrl.pathname.includes(route)) {
        // Check if user has the required permission
        const hasPermission = userPermissions[requiredPermissions]?.view;

        if (!hasPermission) {
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
