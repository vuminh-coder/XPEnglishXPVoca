import { cookies } from "next/headers";
import { verifyAuthToken } from "@/infrastructure/auth/jwt";

export async function getAuthenticatedUserId(req?: Request): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("xp_voca_session")?.value;
    
    if (sessionCookie) {
      // 1. Verify JWT token
      const jwtPayload = verifyAuthToken(sessionCookie);
      if (jwtPayload?.userId) {
        return jwtPayload.userId;
      }

      // 2. Legacy JSON parse fallback
      try {
        const parsed = JSON.parse(sessionCookie);
        if (parsed?.userId) return parsed.userId;
      } catch (e) {}
    }

    const localUserId = cookieStore.get("local-user-id")?.value;
    if (localUserId) return localUserId;

    if (req) {
      const headerUserId = req.headers.get("x-user-id");
      if (headerUserId) return headerUserId;
    }

    return "guest_user";
  } catch (e) {
    console.error("Session lookup failed on server:", e);
    if (req) {
      const headerUserId = req.headers.get("x-user-id");
      if (headerUserId) return headerUserId;
    }
    return "guest_user";
  }
}
