import { cookies } from "next/headers";

export async function getAuthenticatedUserId(): Promise<string | null> {
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
    return localUserId || null;
  } catch (e) {
    console.error("Session lookup failed on server:", e);
    return null;
  }
}
