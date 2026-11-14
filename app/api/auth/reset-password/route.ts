import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/infrastructure/database/prisma";
import { hashPassword } from "@/infrastructure/auth/password";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Thiếu mã xác nhận hoặc mật khẩu mới." },
        { status: 400 }
      );
    }

    if (String(newPassword).length < 6) {
      return NextResponse.json(
        { success: false, error: "Mật khẩu mới phải chứa ít nhất 6 ký tự." },
        { status: 400 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(String(token)).digest("hex");

    // Find profile by hashed reset token (with legacy fallback during transition) and verify expiry
    const profile = await prisma.profile.findFirst({
      where: {
        OR: [{ passwordResetToken: tokenHash }, { passwordResetToken: String(token) }],
        passwordResetExpires: {
          gt: new Date(),
        },
      },
      select: { id: true },
    });

    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Mã khôi phục mật khẩu không hợp lệ hoặc đã hết hạn." },
        { status: 400 }
      );
    }

    // Hash new password and reset token fields
    const hashedPassword = hashPassword(String(newPassword));

    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        passwordHash: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
      select: { id: true },
    });

    return NextResponse.json({
      success: true,
      message: "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay bây giờ.",
    });
  } catch (error: any) {
    console.error("Reset Password API Error:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi hệ thống khi cập nhật mật khẩu." },
      { status: 500 }
    );
  }
}
