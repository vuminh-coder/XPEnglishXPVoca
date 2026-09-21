"use client";
import React from "react";
import { useAuthStore } from "@/stores/authStore";

function AuthStateSyncer() {
  const checkSession = useAuthStore((state) => state.checkSession);
  const setUserPayload = useAuthStore((state) => state.setUserPayload);

  React.useEffect(() => {
    checkSession();
  }, [checkSession]);

  return null;
}

import { FloatingAiChatbot } from "@/features/ai/components/FloatingAiChatbot";

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
      <FloatingAiChatbot />
      <div id="toast-container" className="toast-container"></div>
    </div>
  );
}
