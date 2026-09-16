"use client";
import React from "react";
import { useAuthStore } from "@/stores/authStore";

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
          const decoded = decodeURIComponent(oauthUser);
          // Only attempt parse if it looks like JSON (starts with '{')
          if (decoded.startsWith("{")) {
            const userData = JSON.parse(decoded);
            if (userData && userData.id) {
              setUserPayload(userData);
            }
          }
        } catch (e) {
          // Silently ignore malformed oauth_user params
        }
        // Always clean up URL regardless of parse result
        window.history.replaceState({}, "", window.location.pathname);
        return; // Skip checkSession — either OAuth data was set, or we fall through to session cookie
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
