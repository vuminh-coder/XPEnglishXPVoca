"use client";
import React from "react";
import { ClerkProvider, useUser, useAuth } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";

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

export default function ClientClerkWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ClerkStateSyncer />
      {children}
      <div id="toast-container" className="toast-container"></div>
    </ClerkProvider>
  );
}
