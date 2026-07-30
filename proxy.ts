import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PREFIXES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/sign-in",
  "/sign-up",
  "/api/auth",
  "/fonts",
  "/icons",
  "/images",
  "/mascot.png",
  "/app-icon-horizontal-brand.png",
  "/sw.js",
  "/manifest.json",
];

const isPublicPath = (pathname: string) => {
  if (pathname === "/") return true;
  return PUBLIC_PREFIXES.some((p) => p !== "/" && pathname.startsWith(p));
};

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionCookie = request.cookies.get("xp_voca_session")?.value;
  const localUserId = request.cookies.get("local-user-id")?.value;
  const isAuthenticated = !!(sessionCookie || localUserId);

  // If user is authenticated and trying to access /login or /register, redirect to /dashboard
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow public routes
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users accessing protected routes to /login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
