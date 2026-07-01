import { NextResponse } from "next/server";

/**
 * This endpoint is now managed by Clerk UI components
 * Use Clerk SignUp component in /app/(auth)/register/page.tsx instead
 * This is a reference endpoint for developers
 */
export async function GET(request: Request) {
  return NextResponse.json({
    success: true,
    message: "Use Clerk SignUp component for registration",
    docs: "See /app/(auth)/register/page.tsx",
  });
}

export async function POST(request: Request) {
  return NextResponse.json({
    success: true,
    message: "Use Clerk SignUp component for registration",
    docs: "See /app/(auth)/register/page.tsx",
  });
}
