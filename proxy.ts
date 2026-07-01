import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Check if Clerk is properly configured at build time
const isClerkConfigured =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/admin(.*)",
  "/api/auth/login(.*)",
  "/api/auth/register(.*)",
]);

// If Clerk is configured, export Clerk's middleware directly with route protection.
let defaultMiddleware: any;

if (isClerkConfigured) {
  defaultMiddleware = clerkMiddleware(async (auth, req) => {
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
} else {
  // Development fallback middleware when Clerk keys are missing.
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

  defaultMiddleware = function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Allow public paths
    if (isPublicPath(pathname)) return NextResponse.next();

    // Simple protection for dashboard, profile, admin and API routes in dev mode
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api")
    ) {
      const token = request.cookies.get("auth-token")?.value;
      if (!token) return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  };
}

export default defaultMiddleware;

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
