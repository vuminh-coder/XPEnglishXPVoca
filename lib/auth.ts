import { cookies } from "next/headers";

export async function getAuthenticatedUserId(req?: Request): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("xp_voca_session")?.value;
    
    if (sessionCookie) {
      try {
        const { userId } = JSON.parse(sessionCookie);
        if (userId) return userId;
      } catch (e) {
        // Fallback
      }
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
