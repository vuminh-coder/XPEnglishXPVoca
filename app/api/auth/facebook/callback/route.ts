import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signAuthToken } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const error = req.nextUrl.searchParams.get("error");

    if (error || !code) {
      return NextResponse.redirect(new URL("/login?error=facebook_denied", req.url));
    }

    const appId = process.env.FACEBOOK_APP_ID!;
    const appSecret = process.env.FACEBOOK_APP_SECRET!;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const redirectUri = `${baseUrl}/api/auth/facebook/callback`;

    // Exchange code for access token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
        new URLSearchParams({
          client_id: appId,
          client_secret: appSecret,
          redirect_uri: redirectUri,
          code,
        })
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error("Facebook token exchange failed:", tokenData);
      return NextResponse.redirect(new URL("/login?error=facebook_token_failed", req.url));
    }

    // Fetch user profile from Facebook
    const profileRes = await fetch(
      `https://graph.facebook.com/v19.0/me?fields=id,name,email,picture.type(large)&access_token=${tokenData.access_token}`
    );

    const fbUser = await profileRes.json();

    const email = (fbUser.email || `fb_${fbUser.id}@facebook.com`).toLowerCase();
    const fullName = fbUser.name || "Học viên Facebook";
    const avatarUrl = fbUser.picture?.data?.url || "";

    // Find or create user in DB
    let profile = await prisma.profile.findFirst({
      where: { email },
    });

    if (!profile) {
      const userId = `usr_fb_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
      const username = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");

      profile = await prisma.profile.create({
        data: {
          id: userId,
          email,
          fullName,
          username: username || "user",
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
    } else if (avatarUrl && !profile.avatarUrl) {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: { avatarUrl },
      });
    }

    // Sign JWT session token
    const token = signAuthToken({
      userId: profile.id,
      email: profile.email,
      username: profile.username,
    });

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
      avatarEmoji: profile.avatarEmoji || "🔥",
      bio: "Học viên XP English | XP Voca! 🚀",
      title: profile.title,
      coins: profile.coins,
      streakFreezes: profile.streakFreezes,
      imageUrl: avatarUrl,
    };

    const encodedUser = encodeURIComponent(JSON.stringify(userPayload));
    const redirectUrl = new URL(`/dashboard?oauth_user=${encodedUser}`, req.url);

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("xp_voca_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Facebook OAuth Callback Error:", error);
    return NextResponse.redirect(new URL("/login?error=facebook_server_error", req.url));
  }
}
