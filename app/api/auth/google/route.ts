import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { signAuthToken } from "@/infrastructure/auth/jwt";
import { createOAuthState, setOAuthStateCookie } from "@/infrastructure/auth/oauthState";

function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set("xp_voca_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  // Mock authentication must be explicitly enabled and is never available in production.
  if (!clientId || clientId.trim() === "") {
    if (process.env.NODE_ENV === "production" || process.env.ENABLE_MOCK_OAUTH !== "true") {
      return NextResponse.redirect(new URL("/login?error=google_config_missing", req.url));
    }

    try {
      const mockEmail = `user.google.${Math.floor(Math.random() * 1000)}@gmail.com`;
      const mockName = `Google learner ${Math.floor(Math.random() * 899 + 100)}`;
      let profile = await prisma.profile.findFirst({ where: { email: mockEmail } });

      if (!profile) {
        profile = await prisma.profile.create({
          data: {
            id: `usr_google_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
            email: mockEmail,
            fullName: mockName,
            username: `google_user_${Math.floor(Math.random() * 1000)}`,
            avatarEmoji: "🚀",
            level: 5,
            totalXp: 1250,
            currentStreak: 5,
            longestStreak: 12,
            minutesStudied: 180,
            title: "Google learner",
            coins: 200,
            streakFreezes: 1,
          },
        });
      }

      const token = signAuthToken({ userId: profile.id, email: profile.email, username: profile.username });
      const response = NextResponse.redirect(new URL("/dashboard", req.url));
      setSessionCookie(response, token);
      return response;
    } catch (error) {
      console.error("Mock Google OAuth error:", error);
      return NextResponse.redirect(new URL("/login?error=google_dev_failed", req.url));
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  const redirectUri = `${baseUrl}/api/auth/google/callback`;
  const state = createOAuthState();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
    state,
  });

  const response = NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  setOAuthStateCookie(response, "google", state);
  return response;
}
