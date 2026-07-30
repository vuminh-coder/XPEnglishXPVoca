"use client";
import React from "react";
import { useAuthStore } from "@/lib/store/authStore";

function AuthStateSyncer() {
  const checkSession = useAuthStore((state) => state.checkSession);
  const setUserPayload = useAuthStore((state) => state.setUserPayload);

  React.useEffect(() => {
    // Check if returning from OAuth redirect with user data in URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const oauthUser = params.get("oauth_user");

      if (oauthUser) {
        try {
          const userData = JSON.parse(decodeURIComponent(oauthUser));
          setUserPayload(userData);

          // Clean up URL (remove oauth_user param)
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, "", cleanUrl);
          return; // Skip checkSession since we already have user data
        } catch (e) {
          console.error("Failed to parse OAuth user data:", e);
        }
      }
    }

    checkSession();
  }, [checkSession, setUserPayload]);

  return null;
}

export default function ClientAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered:", reg.scope))
        .catch((err) => console.warn("Service Worker registration failed:", err));
    }
  }, []);

  return (
    <div suppressHydrationWarning>
      <AuthStateSyncer />
      {children}
      <div id="toast-container" className="toast-container"></div>
    </div>
  );
}
