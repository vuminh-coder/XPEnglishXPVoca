import { NextResponse } from "next/server";

/**
 * This endpoint is now managed by Clerk UI components
 * Use Clerk SignIn component in /app/(auth)/login/page.tsx instead
 * This is a reference endpoint for developers
 */
export async function GET(request: Request) {
  return NextResponse.json({
    success: true,
    message: "Use Clerk SignIn component for authentication",
    docs: "See /app/(auth)/login/page.tsx",
  });
}

export async function POST(request: Request) {
  return NextResponse.json({
    success: true,
    message: "Use Clerk SignIn component for authentication",
    docs: "See /app/(auth)/login/page.tsx",
  });
}
