import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { comparePassword } from "@/infrastructure/auth/password";
import { signAuthToken } from "@/infrastructure/auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { emailOrUsername, password } = body;

    if (!emailOrUsername || !password) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập đầy đủ Email/Tên đăng nhập và Mật khẩu." },
        { status: 400 }
      );
    }

    const trimmedInput = String(emailOrUsername).trim().toLowerCase();

    // Find profile by email, username, or id
    const profile = await prisma.profile.findFirst({
      where: {
        OR: [
          { email: trimmedInput },
          { username: trimmedInput },
          { id: trimmedInput },
        ],
      },
    });

    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Tài khoản hoặc mật khẩu không chính xác." },
        { status: 401 }
      );
    }

    // Strictly enforce password verification - NEVER bypass if passwordHash is missing
    if (!profile.passwordHash || !profile.passwordHash.trim()) {
      return NextResponse.json(
        { success: false, error: "Tài khoản chưa thiết lập mật khẩu. Vui lòng đặt lại mật khẩu hoặc đăng nhập qua mạng xã hội." },
        { status: 401 }
      );
    }

    const isPasswordValid = comparePassword(String(password), profile.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Tài khoản hoặc mật khẩu không chính xác." },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = signAuthToken({
      userId: profile.id,
      email: profile.email,
      username: profile.username,
    });

    const userPayload = {
      id: profile.id,
      username: profile.username || profile.id,
      fullName: profile.fullName || profile.username || "Học viên XP Voca",
      email: profile.email || `${profile.id}@xpvoca.com`,
      level: profile.level,
      totalXp: profile.totalXp,
      currentStreak: profile.currentStreak,
      longestStreak: profile.longestStreak,
      minutesStudied: profile.minutesStudied,
      avatarEmoji: profile.avatarEmoji || "🦉",
      bio: "Học viên xuất sắc của XP English | XP Voca! 🚀",
      title: profile.title,
      coins: profile.coins,
      streakFreezes: profile.streakFreezes,
    };

    const response = NextResponse.json({
      success: true,
      user: userPayload,
      message: "Đăng nhập thành công!",
    });

    // Set secure HTTP-only session cookie
    response.cookies.set("xp_voca_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
