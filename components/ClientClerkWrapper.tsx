"use client";
import React from "react";
import { ClerkProvider, useUser, useAuth } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";

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
      signUpFallbackRedirectUrl="/dashboard"
    >
      <ClerkStateSyncer />
      {children}
      <div id="toast-container" className="toast-container"></div>
    </ClerkProvider>
  );
}
