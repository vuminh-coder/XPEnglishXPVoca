import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { isRateLimited } from "@/infrastructure/security/rateLimit";
import { getTrustedClientIp } from "@/infrastructure/security/validation";

/**
 * Returns the server-side Gemini API key.
 * Intentionally never falls back to NEXT_PUBLIC_GEMINI_API_KEY so secret credentials
 * are never encouraged or read from public client bundles.
 */
export function getServerGeminiApiKey(): string {
  return process.env.GEMINI_API_KEY?.trim() || "";
}

/**
 * Enforces strict JWT authentication + per-user rate limiting for protected AI endpoints.
 */
export async function requireAuthenticatedAiCaller(
  req: Request,
  rateKeyPrefix: string,
  limit: number,
  windowMs = 60_000
): Promise<{ userId: string } | { errorResponse: NextResponse }> {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) {
    return {
      errorResponse: NextResponse.json(
        { error: "Unauthorized: Vui lòng đăng nhập để sử dụng tính năng AI." },
        { status: 401 }
      ),
    };
  }

  if (isRateLimited(`${rateKeyPrefix}_user_${userId}`, limit, windowMs)) {
    return {
      errorResponse: NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      ),
    };
  }

  return { userId };
}

/**
 * Rate-limits conversational AI routes keyed by verified userId when signed in,
 * or strictly capped trusted edge IP for guest trial mode.
 */
export async function checkConversationalAiRateLimit(
  req: Request,
  prefix: string,
  authLimit = 60,
  guestLimit = 10,
  windowMs = 60_000
): Promise<{ authenticatedId: string | null; rateLimitedResponse?: NextResponse }> {
  const authenticatedId = await getAuthenticatedUserId(req);
  const clientIp = getTrustedClientIp(req);
  const rateLimitKey = authenticatedId ? `${prefix}_user_${authenticatedId}` : `${prefix}_guest_${clientIp}`;
  const limit = authenticatedId ? authLimit : guestLimit;

  if (isRateLimited(rateLimitKey, limit, windowMs)) {
    return {
      authenticatedId,
      rateLimitedResponse: NextResponse.json(
        {
          error: authenticatedId
            ? "Hệ thống AI đang bận. Vui lòng thử lại sau giây lát."
            : "Bạn đã đạt giới hạn dùng thử AI cho khách. Vui lòng đăng nhập để tiếp tục.",
        },
        { status: 429 }
      ),
    };
  }

  return { authenticatedId };
}
