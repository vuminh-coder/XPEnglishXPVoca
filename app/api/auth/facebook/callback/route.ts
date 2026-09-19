import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { signAuthToken } from "@/infrastructure/auth/jwt";
import {
  clearOAuthStateCookie,
  hasValidOAuthState,
} from "@/infrastructure/auth/oauthState";

function redirectToLogin(req: NextRequest, error: string) {
  const response = NextResponse.redirect(new URL(`/login?error=${error}`, req.url));
  clearOAuthStateCookie(response, "facebook");
  return response;
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const providerError = req.nextUrl.searchParams.get("error");
  const state = req.nextUrl.searchParams.get("state");
  if (!hasValidOAuthState(req, "facebook", state)) {
    return redirectToLogin(req, "facebook_state_invalid");
  }
  if (providerError || !code) {
    return redirectToLogin(req, "facebook_denied");
  }

  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  if (!appId || !appSecret) {
    return redirectToLogin(req, "facebook_config_missing");
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const tokenParams = new URLSearchParams({
      client_id: appId,
      client_secret: appSecret,
      redirect_uri: `${baseUrl}/api/auth/facebook/callback`,
      code,
    });
    const tokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?${tokenParams.toString()}`,
      { cache: "no-store" }
    );
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Facebook token exchange failed", { status: tokenRes.status });
      return redirectToLogin(req, "facebook_token_failed");
    }

    const profileParams = new URLSearchParams({
      fields: "id,name,email,picture.type(large)",
      access_token: tokenData.access_token,
    });
    const profileRes = await fetch(`https://graph.facebook.com/v19.0/me?${profileParams.toString()}`, {
      cache: "no-store",
    });
    const fbUser = await profileRes.json();
    if (!profileRes.ok || !fbUser.id) {
      console.error("Facebook profile request failed", { status: profileRes.status });
      return redirectToLogin(req, "facebook_profile_failed");
    }

    const email = String(fbUser.email || `fb_${fbUser.id}@facebook.com`).toLowerCase();
    const fullName = fbUser.name || "Facebook learner";
    const avatarUrl = fbUser.picture?.data?.url || "";
    let profile = await prisma.profile.findFirst({ where: { email } });
    if (!profile) {
      const baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "") || "user";
      profile = await prisma.profile.create({
        data: {
          id: `usr_fb_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
          email,
          fullName,
          username: `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`,
          avatarEmoji: "🔥",
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
    clearOAuthStateCookie(response, "facebook");
    return response;
  } catch (error) {
    console.error("Facebook OAuth callback error:", error);
    return redirectToLogin(req, "facebook_server_error");
  }
}
