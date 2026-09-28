import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { hashPassword } from "@/infrastructure/auth/password";
import { signAuthToken } from "@/infrastructure/auth/jwt";
import { sanitizeInput, isValidEmail } from "@/infrastructure/security/validation";
import { isRateLimited } from "@/infrastructure/security/rateLimit";

export async function POST(req: NextRequest) {
  try {
    // Anti-spam: 3 registrations per hour per IP
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (isRateLimited(`auth_register_${clientIp}`, 3, 60 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: "Quá nhiều lần đăng ký. Vui lòng thử lại sau." },
        { status: 429 }
      );
    }
    const body = await req.json();
    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập đầy đủ Họ tên, Email và Mật khẩu." },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedFullName = sanitizeInput(String(fullName).trim());

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Địa chỉ Email không đúng định dạng." },
        { status: 400 }
      );
    }

    if (String(password).length < 6) {
      return NextResponse.json(
        { success: false, error: "Mật khẩu phải chứa ít nhất 6 ký tự." },
        { status: 400 }
      );
    }

    // Check existing email in DB using indexed unique lookup
    const existingProfile = await prisma.profile.findUnique({
      where: { email: trimmedEmail },
      select: { id: true },
    });

    if (existingProfile) {
      return NextResponse.json(
        { success: false, error: "Địa chỉ email này đã được sử dụng. Vui lòng đăng nhập." },
        { status: 400 }
      );
    }

    // Generate unique User ID & Username
    const usernamePrefix = trimmedEmail.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const hashedPassword = hashPassword(String(password));

    // Create new Profile in Database with selective projection (no passwordHash leak)
    const newProfile = await prisma.profile.create({
      data: {
        id: userId,
        email: trimmedEmail,
        passwordHash: hashedPassword,
        fullName: trimmedFullName,
        username: usernamePrefix || "user",
        avatarEmoji: "🦉",
        level: 1,
        totalXp: 0,
        currentStreak: 1,
        longestStreak: 1,
        minutesStudied: 0,
        title: "Newbie",
        coins: 100,
        streakFreezes: 0,
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        level: true,
        totalXp: true,
        currentStreak: true,
        longestStreak: true,
        minutesStudied: true,
        avatarEmoji: true,
        avatarUrl: true,
        title: true,
        coins: true,
        streakFreezes: true,
      },
    });

    // Generate JWT Token
    const token = signAuthToken({
      userId: newProfile.id,
      email: newProfile.email,
      username: newProfile.username,
    });

    const userPayload = {
      id: newProfile.id,
      username: newProfile.username,
      fullName: newProfile.fullName,
      email: newProfile.email,
      level: newProfile.level,
      totalXp: newProfile.totalXp,
      currentStreak: newProfile.currentStreak,
      longestStreak: newProfile.longestStreak,
      minutesStudied: newProfile.minutesStudied,
      avatarEmoji: newProfile.avatarEmoji,
      avatarUrl: newProfile.avatarUrl || null,
      avatar: newProfile.avatarUrl || null,
      imageUrl: newProfile.avatarUrl || null,
      bio: "Học viên mới của XP English | XP Voca! 🚀",
      title: newProfile.title,
      coins: newProfile.coins,
      streakFreezes: newProfile.streakFreezes,
    };

    const response = NextResponse.json({
      success: true,
      user: userPayload,
      message: "Tạo tài khoản thành công!",
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
    console.error("Register API Error:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi hệ thống khi tạo tài khoản." },
      { status: 500 }
    );
  }
}
