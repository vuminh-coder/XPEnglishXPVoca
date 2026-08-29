import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { signAuthToken } from "@/infrastructure/auth/jwt";

export async function GET(req: NextRequest) {
  const appId = process.env.FACEBOOK_APP_ID;

  // Nếu chưa có FACEBOOK_APP_ID trong .env (Môi trường Dev), thực hiện mô phỏng đăng nhập Facebook
  if (!appId || appId.trim() === "") {
    try {
      const mockEmail = `user.fb.${Math.floor(Math.random() * 1000)}@facebook.com`;
      const mockName = `Học Viên Facebook (${Math.floor(Math.random() * 899 + 100)})`;
      const mockAvatar = "https://graph.facebook.com/100000000000000/picture?type=large";

      let profile = await prisma.profile.findFirst({
        where: { email: mockEmail },
      });

      if (!profile) {
        const userId = `usr_fb_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
        const username = `fb_user_${Math.floor(Math.random() * 1000)}`;

        profile = await prisma.profile.create({
          data: {
            id: userId,
            email: mockEmail,
            fullName: mockName,
            username: username,
            avatarEmoji: "🔥",
            avatarUrl: mockAvatar,
            level: 3,
            totalXp: 850,
            currentStreak: 3,
            longestStreak: 7,
            minutesStudied: 120,
            title: "Chiến Binh Facebook",
            coins: 150,
            streakFreezes: 0,
          },
        });
      } else if (!profile.avatarUrl) {
        profile = await prisma.profile.update({
          where: { id: profile.id },
          data: { avatarUrl: mockAvatar },
        });
      }

      const token = signAuthToken({
        userId: profile.id,
        email: profile.email,
        username: profile.username,
      });

      const userPayload = {
        id: profile.id,
        username: profile.username || profile.id,
        fullName: profile.fullName || mockName,
        email: profile.email || mockEmail,
        level: profile.level,
        totalXp: profile.totalXp,
        currentStreak: profile.currentStreak,
        longestStreak: profile.longestStreak,
        minutesStudied: profile.minutesStudied,
        avatarEmoji: profile.avatarEmoji || "🔥",
        bio: "Học tiếng Anh cùng Facebook Account! 🚀",
        title: profile.title,
        coins: profile.coins,
        streakFreezes: profile.streakFreezes,
        imageUrl: mockAvatar,
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
    } catch (err) {
      console.error("Mock Facebook OAuth Error:", err);
      return NextResponse.redirect(new URL("/login?error=facebook_dev_failed", req.url));
    }
  }

  // Luồng Facebook OAuth thực sự (khi đã điền FACEBOOK_APP_ID trong .env)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  const redirectUri = `${baseUrl}/api/auth/facebook/callback`;

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope: "public_profile,email",
    response_type: "code",
    auth_type: "rerequest",
  });

  return NextResponse.redirect(`https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`);
}
