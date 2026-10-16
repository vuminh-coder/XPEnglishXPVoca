import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Đã đăng xuất thành công.",
  });

  // Clear HTTP-only session cookie
  response.cookies.set("xp_voca_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  // Clear legacy cookies if any exist
  response.cookies.set("auth-token", "", { path: "/", maxAge: 0 });
  response.cookies.set("local-user-id", "", { path: "/", maxAge: 0 });

  return response;
}
