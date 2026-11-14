import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAuthToken, SessionPayload } from "@/infrastructure/auth/jwt";
import { prisma } from "@/infrastructure/database/prisma";

function parseCookieFromHeader(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    if (k === name) {
      return decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return null;
}

async function resolveSessionPayload(req?: Request): Promise<SessionPayload | null> {
  try {
    // 1. Check Bearer Authorization header first when request is provided
    if (req) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const bearerToken = authHeader.substring(7).trim();
        const jwtPayload = verifyAuthToken(bearerToken);
        if (jwtPayload?.userId) {
          return jwtPayload;
        }
      }

      // 2. Check raw Cookie header on Request (supports unit tests & standard Request objects)
      const rawCookieHeader = req.headers.get("cookie");
      const headerSessionToken =
        parseCookieFromHeader(rawCookieHeader, "xp_voca_session") ||
        parseCookieFromHeader(rawCookieHeader, "auth-token");
      if (headerSessionToken) {
        const jwtPayload = verifyAuthToken(headerSessionToken);
        if (jwtPayload?.userId) {
          return jwtPayload;
        }
      }
    }

    // 3. Fallback to Next.js server request cookie store (safe outside request scope)
    try {
      const cookieStore = await cookies();
      const sessionToken =
        cookieStore.get("xp_voca_session")?.value ||
        cookieStore.get("auth-token")?.value;

      if (sessionToken) {
        const jwtPayload = verifyAuthToken(sessionToken);
        if (jwtPayload?.userId) {
          return jwtPayload;
        }
      }
    } catch {
      // Called outside Next.js dynamic request scope (e.g. direct Vitest Request execution)
    }

    return null;
  } catch (error) {
    console.error("[Auth Resolver Error]:", error);
    return null;
  }
}

/**
 * Secure Server-Side User Authentication Resolver.
 * Cryptographically verifies JWT session cookies or Bearer Authorization headers.
 * NEVER trusts unauthenticated client headers (e.g. x-user-id) to prevent identity spoofing.
 */
export async function getAuthenticatedUserId(req?: Request): Promise<string | null> {
  const payload = await resolveSessionPayload(req);
  return payload?.userId || null;
}

/**
 * Resolves authenticated user identity and verifies live role from PostgreSQL.
 */
export async function requireAdminUser(req?: Request): Promise<
  | { authorized: true; userId: string }
  | { authorized: false; response: NextResponse }
> {
  const payload = await resolveSessionPayload(req);
  if (!payload?.userId) {
    return {
      authorized: false,
      response: NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 }),
    };
  }

  const profile = await prisma.profile.findUnique({
    where: { id: payload.userId },
    select: { id: true, role: true },
  });

  if (!profile || profile.role !== "ADMIN") {
    return {
      authorized: false,
      response: NextResponse.json(
        { success: false, error: "Forbidden: Admin privileges required" },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, userId: profile.id };
}
