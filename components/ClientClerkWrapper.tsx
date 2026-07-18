"use client";
import React from "react";
import { ClerkProvider, useUser, useAuth } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";
import { viVN } from "@clerk/localizations";

// Check if Clerk is enabled based on key type and domain
const checkIsClerkEnabled = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_"));
};

function ClerkStateSyncer() {
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const syncClerkUser = useAuthStore((state) => state.syncClerkUser);

  React.useEffect(() => {
    if (isUserLoaded && isAuthLoaded) {
      syncClerkUser(clerkUser, !!isSignedIn);
    }
  }, [clerkUser, isSignedIn, isUserLoaded, isAuthLoaded, syncClerkUser]);

  return null;
}

// Custom Vietnamese translation overrides to prevent English placeholders from slipping through
const customLocalization = {
  ...viVN,
  formFieldInputPlaceholder__password: "Nhập mật khẩu của bạn",
  formFieldInputPlaceholder__signUp_password: "Tạo mật khẩu của bạn",
  formFieldInputPlaceholder__newPassword: "Tạo mật khẩu mới của bạn",
  formFieldInputPlaceholder__currentPassword: "Nhập mật khẩu hiện tại",
  formFieldInputPlaceholder__confirmPassword: "Xác nhận lại mật khẩu",
  formFieldInputPlaceholder__emailAddress: "Nhập địa chỉ email của bạn",
  formFieldInputPlaceholder__username: "Nhập tên người dùng của bạn",
  formFieldInputPlaceholder__emailAddressOrUsername: "Nhập email hoặc tên người dùng",
};

function LocalStateSyncer() {
  const setLocalUser = useAuthStore((state) => state.setLocalUser);
  React.useEffect(() => {
    setLocalUser();
  }, [setLocalUser]);
  return null;
}

export default function ClientClerkWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkEnabled = checkIsClerkEnabled();
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  React.useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered:", reg.scope))
        .catch((err) => console.warn("Service Worker registration failed:", err));
    }
  }, []);

  if (!clerkEnabled || !publishableKey) {
    return (
      <div suppressHydrationWarning>
        <LocalStateSyncer />
        {children}
        <div id="toast-container" className="toast-container"></div>
      </div>
    );
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl="/login"
      signUpUrl="/register"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/onboarding"
      localization={customLocalization}
    >
      <ClerkStateSyncer />
      {children}
      <div id="toast-container" className="toast-container"></div>
    </ClerkProvider>
  );
}
