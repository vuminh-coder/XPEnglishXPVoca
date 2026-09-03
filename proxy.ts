import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { memoryRateLimiter } from "@/infrastructure/security/rateLimiter";
import { isPayloadTooLarge } from "@/infrastructure/security/validation";

const PUBLIC_PREFIXES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/sign-in",
  "/sign-up",
  "/privacy",
  "/terms",
  "/dashboard",
  "/study",
  "/roadmap",
  "/vocabulary",
  "/analytics",
  "/profile",
  "/community",
  "/leaderboard",
  "/myvideo",
  "/myvocab",
  "/review",
  "/shop",
  "/premium",
  "/premium/checkout",
  "/settings",
  "/onboarding",
  "/ai",
  "/api",
  "/fonts",
  "/icons",
  "/images",
  "/mascot.png",
  "/app-icon-horizontal-brand.png",
  "/sw.js",
  "/manifest.json",
];

// Sensitive authentication API endpoints requiring strict rate limiting (max 5 requests per 15 mins)
const AUTH_RATE_LIMITED_PATHS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
];

// Max payload sizes in bytes
const MAX_GENERAL_PAYLOAD_SIZE = 1 * 1024 * 1024; // 1 MB
const MAX_MEDIA_PAYLOAD_SIZE = 10 * 1024 * 1024; // 10 MB for media upload routes

const isPublicPath = (pathname: string) => {
  if (pathname === "/") return true;
  return PUBLIC_PREFIXES.some((p) => p !== "/" && pathname.startsWith(p));
};

function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const ip = getClientIp(request);

  // ─── 1. PAYLOAD SIZE VALIDATION ───
  const isMediaUploadRoute = pathname.startsWith("/api/listening/notes") || pathname.startsWith("/api/user/avatar");
  const maxAllowedSize = isMediaUploadRoute ? MAX_MEDIA_PAYLOAD_SIZE : MAX_GENERAL_PAYLOAD_SIZE;
  const contentLength = request.headers.get("content-length");

  if (isPayloadTooLarge(contentLength, maxAllowedSize)) {
    const errorResponse = NextResponse.json(
      {
        error: "Payload Too Large",
        message: "Dung lượng dữ liệu gửi lên vượt quá giới hạn cho phép (Tối đa 1MB).",
      },
      { status: 413 }
    );
    return applySecurityHeaders(errorResponse);
  }

  // ─── 2. STRICT AUTH RATE LIMITING (Max 5 attempts per 15 mins) ───
  if (AUTH_RATE_LIMITED_PATHS.some((p) => pathname.startsWith(p))) {
    const rateKey = `auth_limit_${ip}_${pathname}`;
    const rateCheck = memoryRateLimiter.check(rateKey, 5, 15 * 60 * 1000);

    if (!rateCheck.allowed) {
      const errorResponse = NextResponse.json(
        {
          error: "Too Many Requests",
          message: `Bạn đã thử quá 5 lần. Vui lòng thử lại sau ${Math.ceil(rateCheck.resetSeconds / 60)} phút.`,
          retryAfterSeconds: rateCheck.resetSeconds,
        },
        { status: 429 }
      );
      errorResponse.headers.set("Retry-After", String(rateCheck.resetSeconds));
      errorResponse.headers.set("X-RateLimit-Limit", String(rateCheck.limit));
      errorResponse.headers.set("X-RateLimit-Remaining", "0");
      errorResponse.headers.set("X-RateLimit-Reset", String(rateCheck.resetSeconds));
      return applySecurityHeaders(errorResponse);
    }
  } else if (pathname.startsWith("/api/")) {
    // General API rate limiting (100 requests per minute)
    const generalRateKey = `api_limit_${ip}`;
    const generalCheck = memoryRateLimiter.check(generalRateKey, 100, 60 * 1000);

    if (!generalCheck.allowed) {
      const errorResponse = NextResponse.json(
        {
          error: "Too Many Requests",
          message: "Hệ thống đang nhận quá nhiều yêu cầu từ IP của bạn. Vui lòng đợi 1 phút.",
        },
        { status: 429 }
      );
      errorResponse.headers.set("Retry-After", String(generalCheck.resetSeconds));
      return applySecurityHeaders(errorResponse);
    }
  }

  // ─── 3. AUTHENTICATION & ROUTE ACCESS CONTROL ───
  const sessionCookie = request.cookies.get("xp_voca_session")?.value;
  const isAuthenticated = !!sessionCookie;

  // Redirect authenticated user away from login/register
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    const redirectRes = NextResponse.redirect(new URL("/dashboard", request.url));
    return applySecurityHeaders(redirectRes);
  }

  // Allow public routes
  if (isPublicPath(pathname)) {
    const res = NextResponse.next();
    return applySecurityHeaders(res);
  }

  // Redirect unauthenticated user to login
  if (!isAuthenticated) {
    const loginRes = NextResponse.redirect(new URL("/login", request.url));
    return applySecurityHeaders(loginRes);
  }

  const res = NextResponse.next();
  return applySecurityHeaders(res);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
