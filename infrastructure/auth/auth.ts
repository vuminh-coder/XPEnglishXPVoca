import { cookies } from "next/headers";
import { verifyAuthToken } from "@/infrastructure/auth/jwt";

/**
 * Secure Server-Side User Authentication Resolver.
 * Cryptographically verifies JWT session cookies or Bearer Authorization headers.
 * NEVER trusts unauthenticated client headers (e.g. x-user-id) to prevent identity spoofing.
 */
export async function getAuthenticatedUserId(req?: Request): Promise<string | null> {
  try {
    // 1. Try reading secure HttpOnly session cookie
    const cookieStore = await cookies();
    const sessionToken =
      cookieStore.get("xp_voca_session")?.value ||
      cookieStore.get("auth-token")?.value;

    if (sessionToken) {
      const jwtPayload = verifyAuthToken(sessionToken);
      if (jwtPayload?.userId) {
        return jwtPayload.userId;
      }
    }

    // 2. Try reading Bearer Authorization header if request is provided
    if (req) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const bearerToken = authHeader.substring(7).trim();
        const jwtPayload = verifyAuthToken(bearerToken);
        if (jwtPayload?.userId) {
          return jwtPayload.userId;
        }
      }
    }

    // Unauthenticated request
    return null;
  } catch (error) {
    console.error("[Auth Resolver Error]:", error);
    return null;
  }
}
