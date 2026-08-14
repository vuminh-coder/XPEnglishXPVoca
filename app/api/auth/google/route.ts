import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signAuthToken } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  // Nếu chưa có GOOGLE_CLIENT_ID trong .env (Môi trường Dev), thực hiện mô phỏng đăng nhập chọn tài khoản Google
  if (!clientId || clientId.trim() === "") {
    try {
      const mockEmail = `user.google.${Math.floor(Math.random() * 1000)}@gmail.com`;
      const mockName = `Học Viên Google (${Math.floor(Math.random() * 899 + 100)})`;
      const mockAvatar = "https://lh3.googleusercontent.com/a/default-user=s96-c";

      let profile = await prisma.profile.findFirst({
        where: { email: mockEmail },
      });

      if (!profile) {
        const userId = `usr_google_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
        const username = `google_user_${Math.floor(Math.random() * 1000)}`;

        profile = await prisma.profile.create({
          data: {
            id: userId,
            email: mockEmail,
            fullName: mockName,
            username: username,
            avatarEmoji: "🚀",
            avatarUrl: mockAvatar,
            level: 5,
            totalXp: 1250,
            currentStreak: 5,
            longestStreak: 12,
            minutesStudied: 180,
            title: "Tân Binh Google",
            coins: 200,
            streakFreezes: 1,
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
        avatarEmoji: profile.avatarEmoji || "🚀",
        bio: "Học tiếng Anh cùng Google Account! 🚀",
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
      console.error("Mock Google OAuth Error:", err);
      return NextResponse.redirect(new URL("/login?error=google_dev_failed", req.url));
    }
  }

  // Luồng Google OAuth thực sự (khi đã điền GOOGLE_CLIENT_ID trong .env)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
