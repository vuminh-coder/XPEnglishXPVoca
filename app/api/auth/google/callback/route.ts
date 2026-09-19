import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { signAuthToken } from "@/infrastructure/auth/jwt";
import {
  clearOAuthStateCookie,
  hasValidOAuthState,
} from "@/infrastructure/auth/oauthState";

function redirectToLogin(req: NextRequest, error: string) {
  const response = NextResponse.redirect(new URL(`/login?error=${error}`, req.url));
  clearOAuthStateCookie(response, "google");
  return response;
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const providerError = req.nextUrl.searchParams.get("error");
  const state = req.nextUrl.searchParams.get("state");

  if (!hasValidOAuthState(req, "google", state)) {
    return redirectToLogin(req, "google_state_invalid");
  }
  if (providerError || !code) {
    return redirectToLogin(req, "google_denied");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return redirectToLogin(req, "google_config_missing");
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Google token exchange failed", { status: tokenRes.status });
      return redirectToLogin(req, "google_token_failed");
    }

    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: "no-store",
    });
    const googleUser = await profileRes.json();
    if (!profileRes.ok || !googleUser.email) {
      console.error("Google profile request failed", { status: profileRes.status });
      return redirectToLogin(req, "google_profile_failed");
    }

    const email = String(googleUser.email).toLowerCase();
    const fullName = googleUser.name || googleUser.given_name || email.split("@")[0];
    const avatarUrl = googleUser.picture || "";
    let profile = await prisma.profile.findFirst({ where: { email } });

    if (!profile) {
      const baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "") || "user";
      profile = await prisma.profile.create({
        data: {
          id: `usr_gg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          email,
          fullName,
          username: `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`,
          avatarEmoji: "🚀",
          avatarUrl: avatarUrl || undefined,
          level: 1,
          totalXp: 0,
          currentStreak: 1,
          longestStreak: 1,
          minutesStudied: 0,
          title: "Newbie",
          coins: 100,
          streakFreezes: 0,
        },
      });
    } else if (avatarUrl && avatarUrl !== profile.avatarUrl) {
      profile = await prisma.profile.update({ where: { id: profile.id }, data: { avatarUrl } });
    }

    const token = signAuthToken({ userId: profile.id, email: profile.email, username: profile.username });
    const response = NextResponse.redirect(new URL("/dashboard", req.url));
    response.cookies.set("xp_voca_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    clearOAuthStateCookie(response, "google");
    return response;
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return redirectToLogin(req, "google_server_error");
  }
}
