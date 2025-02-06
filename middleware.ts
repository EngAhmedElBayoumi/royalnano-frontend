import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

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
    if (publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    // Redirect to login page if trying to access protected routes while not authenticated
    if (
      protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow the request to proceed if authenticated and accessing other routes
  return NextResponse.next();
}

// Specify the paths where this middleware should apply
export const config = {
  matcher: [
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
