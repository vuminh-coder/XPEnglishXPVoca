"use client";
import React from "react";
import { SignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoaded && userId) {
      router.replace("/dashboard");
    }
  }, [isLoaded, userId, router]);

  if (isLoaded && userId) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🦉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký</h1>
          <p className="text-gray-600">Tham gia cộng đồng và bắt đầu học tập</p>
        </div>
        <SignUp path="/register" />
      </div>
    </div>
  );
}
