"use client";

export { ConfettiEffect } from "../components/shared/ConfettiEffect";

/**
 * Mobile Haptic Feedback Vibration Controller
 */
export function triggerHaptic(type: "tap" | "success" | "warning" | "victory") {
  if (typeof window === "undefined" || !("vibrate" in navigator)) return;
  try {
    switch (type) {
      case "tap":
        navigator.vibrate(15);
        break;
      case "success":
        navigator.vibrate([25, 40, 25]);
        break;
      case "warning":
        navigator.vibrate([60, 50, 60]);
        break;
      case "victory":
        navigator.vibrate([40, 40, 40, 40, 80]);
        break;
    }
  } catch {}
}
