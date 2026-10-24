"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useAuthStore } from "@/stores/authStore";
import { useUiStore } from "@/stores/uiStore";

// Dynamically import FloatingAiChatbot (ssr: false) so it doesn't inflate the critical root layout chunk
const FloatingAiChatbot = dynamic(
  () => import("@/features/ai/components/FloatingAiChatbot/FloatingAiChatbot"),
  { ssr: false }
);

function AuthStateSyncer() {
  const checkSession = useAuthStore((state) => state.checkSession);

  React.useEffect(() => {
    checkSession();
  }, [checkSession]);

  return null;
}

export default function ClientAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. ChunkLoadError / Dynamic import failure auto-recovery
      const handleChunkError = (event: ErrorEvent | PromiseRejectionEvent) => {
        const error = "error" in event ? event.error : "reason" in event ? event.reason : null;
        const message = event instanceof ErrorEvent ? event.message : error?.message || String(error || "");
        if (
          message.includes("ChunkLoadError") ||
          message.includes("Loading chunk") ||
          message.includes("Failed to fetch dynamically imported module")
        ) {
          console.warn("[XP English] ChunkLoadError detected, performing recovery reload...", event);
          const lastReload = sessionStorage.getItem("xp_last_chunk_reload");
          const now = Date.now();
          // Debounce reload: at most once every 10 seconds to prevent reload loops
          if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
            sessionStorage.setItem("xp_last_chunk_reload", String(now));
            window.location.reload();
          }
        }
      };
      window.addEventListener("error", handleChunkError);
      window.addEventListener("unhandledrejection", handleChunkError);

      // 2. Restore user theme preference (light, dark, system)
      const savedTheme = localStorage.getItem("xp_theme_preference");
      if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
        useUiStore.getState().setTheme(savedTheme);
      }

      // 3. Service Worker registration: Only register in production.
      // In development mode, unregister any lingering service workers to avoid intercepting localhost dev chunks & causing timeouts.
      if ("serviceWorker" in navigator) {
        if (process.env.NODE_ENV === "production") {
          navigator.serviceWorker
            .register("/sw.js")
            .then((reg) => console.log("Service Worker registered:", reg.scope))
            .catch((err) => console.warn("Service Worker registration failed:", err));
        } else {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (const registration of registrations) {
              registration.unregister();
            }
          });
        }
      }

      return () => {
        window.removeEventListener("error", handleChunkError);
        window.removeEventListener("unhandledrejection", handleChunkError);
      };
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
