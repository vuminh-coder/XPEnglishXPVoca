import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export async function getAuthenticatedUserId(): Promise<string | null> {
  // Check if Clerk is enabled
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkEnabled = !!(key && key.startsWith("pk_"));

  if (isClerkEnabled) {
    try {
      const { userId } = await auth();
      if (userId) return userId;
    } catch (e) {
      console.warn("Clerk auth failed or was bypassed:", e);
    }
  }

  // Fallback to local cookie auth
  try {
    const cookieStore = await cookies();
    const localUserId = cookieStore.get("local-user-id")?.value;
    return localUserId || null;
  } catch (e) {
    console.error("Cookie lookup failed on server:", e);
    return null;
  }
}
