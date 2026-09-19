import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { signAuthToken } from "@/infrastructure/auth/jwt";
import { createOAuthState, setOAuthStateCookie } from "@/infrastructure/auth/oauthState";

export async function GET(req: NextRequest) {
  const appId = process.env.FACEBOOK_APP_ID;

  if (!appId || appId.trim() === "") {
    if (process.env.NODE_ENV === "production" || process.env.ENABLE_MOCK_OAUTH !== "true") {
      return NextResponse.redirect(new URL("/login?error=facebook_config_missing", req.url));
    }

    try {
      const mockEmail = `user.fb.${Math.floor(Math.random() * 1000)}@facebook.com`;
      let profile = await prisma.profile.findFirst({ where: { email: mockEmail } });
      if (!profile) {
        profile = await prisma.profile.create({
          data: {
            id: `usr_fb_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
            email: mockEmail,
            fullName: "Facebook learner",
            username: `fb_user_${Math.floor(Math.random() * 1000)}`,
            avatarEmoji: "🔥",
            level: 3,
            totalXp: 850,
            currentStreak: 3,
            longestStreak: 7,
            minutesStudied: 120,
            title: "Facebook learner",
            coins: 150,
            streakFreezes: 0,
          },
        });
      }

      const token = signAuthToken({ userId: profile.id, email: profile.email, username: profile.username });
      const response = NextResponse.redirect(new URL("/dashboard", req.url));
      response.cookies.set("xp_voca_session", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      return response;
    } catch (error) {
      console.error("Mock Facebook OAuth error:", error);
      return NextResponse.redirect(new URL("/login?error=facebook_dev_failed", req.url));
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  const state = createOAuthState();
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: `${baseUrl}/api/auth/facebook/callback`,
    scope: "public_profile,email",
    response_type: "code",
    auth_type: "rerequest",
    state,
  });
  const response = NextResponse.redirect(`https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`);
  setOAuthStateCookie(response, "facebook", state);
  return response;
}
