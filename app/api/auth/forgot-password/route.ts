import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập địa chỉ email." },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email).trim().toLowerCase();

    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      return NextResponse.json(
        { success: false, error: "Địa chỉ email không hợp lệ." },
        { status: 400 }
      );
    }

    // Check if user exists
    const profile = await prisma.profile.findFirst({
      where: { email: trimmedEmail },
    });

    if (!profile) {
      // For security, do not disclose if email exists or not, or return friendly confirmation
      return NextResponse.json({
        success: true,
        message: "Nếu email của bạn tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi.",
      });
    }

    // Generate reset token and 1-hour expiry
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Hướng dẫn khôi phục mật khẩu đã được gửi thành công!",
      // Expose resetToken in dev mode for testing
      ...(process.env.NODE_ENV !== "production" ? { resetToken } : {}),
    });
  } catch (error: any) {
    console.error("Forgot Password API Error:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
