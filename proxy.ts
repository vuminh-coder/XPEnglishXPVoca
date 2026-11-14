import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { memoryRateLimiter } from "@/infrastructure/security/rateLimiter";
import {
  getTrustedClientIp,
  isPayloadTooLarge,
  isStreamPayloadTooLarge,
} from "@/infrastructure/security/validation";
import { verifyEdgeAuthToken } from "@/infrastructure/auth/edgeJwt";

// Routes that strictly require authenticated server session
const PROTECTED_ROUTES = ["/settings", "/admin", "/profile", "/shop", "/onboarding"];

// Admin-only routes requiring role === "ADMIN"
const ADMIN_ROUTES = ["/admin", "/api/admin"];

// Authentication flow routes where logged-in users should be redirected
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

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

function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const ip = getTrustedClientIp(request);
  const rawSessionToken = request.cookies.get("xp_voca_session")?.value;
  const sessionPayload = rawSessionToken ? await verifyEdgeAuthToken(rawSessionToken) : null;

  // ─── 1. PAYLOAD SIZE VALIDATION (APIs) ───
  if (pathname.startsWith("/api/")) {
    const isMediaUploadRoute =
      pathname.startsWith("/api/listening/notes") || pathname.startsWith("/api/user/avatar");
    const maxAllowedSize = isMediaUploadRoute ? MAX_MEDIA_PAYLOAD_SIZE : MAX_GENERAL_PAYLOAD_SIZE;
    const contentLength = request.headers.get("content-length");

    const headerTooLarge = isPayloadTooLarge(contentLength, maxAllowedSize);
    const streamTooLarge =
      !headerTooLarge &&
      !contentLength &&
      ["POST", "PUT", "PATCH"].includes(request.method) &&
      (await isStreamPayloadTooLarge(request, maxAllowedSize));

    if (headerTooLarge || streamTooLarge) {
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
    } else {
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
  }

  // ─── 3. EDGE ROUTE & RBAC PROTECTION ───
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected && !sessionPayload) {
    const loginUrl = new URL("/login", request.url);
    const redirectTarget = pathname + search;
    loginUrl.searchParams.set("redirect", redirectTarget);
    const redirectResponse = NextResponse.redirect(loginUrl);
    if (rawSessionToken) {
      redirectResponse.cookies.delete("xp_voca_session");
    }
    return applySecurityHeaders(redirectResponse);
  }

  const isAdminRoute = ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAdminRoute) {
    if (!sessionPayload) {
      if (pathname.startsWith("/api/")) {
        return applySecurityHeaders(
          NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        );
      }
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname + search);
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }

    if (sessionPayload.role !== "ADMIN") {
      if (pathname.startsWith("/api/")) {
        return applySecurityHeaders(
          NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
        );
      }
      return applySecurityHeaders(NextResponse.redirect(new URL("/dashboard?error=forbidden", request.url)));
    }
  }

  // ─── 4. REVERSE AUTH GUARD (AUTH FLOW REDIRECT) ───
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthRoute && sessionPayload) {
    const rawRedirect = request.nextUrl.searchParams.get("redirect");
    const safeTarget =
      rawRedirect && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
        ? rawRedirect
        : "/dashboard";
    return applySecurityHeaders(NextResponse.redirect(new URL(safeTarget, request.url)));
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - static assets (.svg, .png, .jpg, .jpeg, .gif, .webp, .mp3, .wav)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3|wav)$).*)",
  ],
};
