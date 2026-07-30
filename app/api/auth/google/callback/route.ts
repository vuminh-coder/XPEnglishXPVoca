import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signAuthToken } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const error = req.nextUrl.searchParams.get("error");

    if (error || !code) {
      console.error("Google OAuth returned error or no code:", error);
      return NextResponse.redirect(new URL("/login?error=google_denied", req.url));
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET");
      return NextResponse.redirect(new URL("/login?error=google_config_missing", req.url));
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    // Exchange code for tokens
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
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error("Google token exchange failed:", tokenData);
      return NextResponse.redirect(new URL("/login?error=google_token_failed", req.url));
    }

    // Fetch user profile from Google
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await profileRes.json();

    if (!googleUser.email) {
      console.error("Google profile returned no email:", googleUser);
      return NextResponse.redirect(new URL("/login?error=google_no_email", req.url));
    }

    const email = googleUser.email.toLowerCase();
    const fullName = googleUser.name || googleUser.given_name || email.split("@")[0];
    const avatarUrl = googleUser.picture || "";

    // Find or create user in DB
    let profile = await prisma.profile.findFirst({
      where: { email },
    });

    if (!profile) {
      const userId = `usr_gg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "") || "user";
      const uniqueUsername = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`;

      profile = await prisma.profile.create({
        data: {
          id: userId,
          email,
          fullName,
          username: uniqueUsername,
          avatarEmoji: "🚀",
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
    }

    // Sign JWT session token
    const token = signAuthToken({
      userId: profile.id,
      email: profile.email,
      username: profile.username,
    });

    // Build user payload to pass to frontend
    const userPayload = {
      id: profile.id,
      username: profile.username || profile.id,
      fullName: profile.fullName || fullName,
      email: profile.email || email,
      level: profile.level,
      totalXp: profile.totalXp,
      currentStreak: profile.currentStreak,
      longestStreak: profile.longestStreak,
      minutesStudied: profile.minutesStudied,
      avatarEmoji: profile.avatarEmoji || "🚀",
      bio: "Học viên XP English | XP Voca! 🚀",
      title: profile.title,
      coins: profile.coins,
      streakFreezes: profile.streakFreezes,
      imageUrl: avatarUrl,
    };

    const encodedUser = encodeURIComponent(JSON.stringify(userPayload));
    const response = NextResponse.redirect(new URL(`/dashboard?oauth_user=${encodedUser}`, req.url));

    response.cookies.set("xp_voca_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Google OAuth Callback Exception:", error);
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error?.message || "google_server_error")}`, req.url));
  }
}
