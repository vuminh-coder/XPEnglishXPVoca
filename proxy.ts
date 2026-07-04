import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper to determine if Clerk should be used dynamically per request
const getIsClerkEnabled = (req: NextRequest) => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!key || !key.startsWith("pk_")) return false;
  // If it's a test key, but request hostname is not local, disable Clerk
  if (
    key.startsWith("pk_test_") &&
    req.nextUrl.hostname !== "localhost" &&
    req.nextUrl.hostname !== "127.0.0.1"
  ) {
    return false;
  }
  return true;
};

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/admin(.*)",
  "/api/auth/login(.*)",
  "/api/auth/register(.*)",
]);

const clerkMiddlewareInstance = clerkMiddleware(async (auth, req) => {
  const isAuthPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register";
  const isRootPage = req.nextUrl.pathname === "/";
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  const { userId } = await auth();
  if (isAuthPage && userId) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }
  if (isRootPage && userId) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }
});

// Development/Production fallback middleware when Clerk is disabled/not configured
const PUBLIC_PREFIXES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/sign-in",
  "/sign-up",
  "/api/public",
  "/fonts",
  "/icons",
  "/images",
];

const isPublicPath = (pathname: string) => {
  if (pathname === "/") return true;
  return PUBLIC_PREFIXES.some((p) => p !== "/" && pathname.startsWith(p));
};

const fallbackMiddleware = function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public paths
  if (isPublicPath(pathname)) return NextResponse.next();

  // Simple protection for dashboard, profile, admin and API routes in fallback mode
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api")
  ) {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
};

export default function middleware(request: NextRequest, event: any) {
  if (getIsClerkEnabled(request)) {
    return clerkMiddlewareInstance(request, event);
  } else {
    return fallbackMiddleware(request);
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
};
