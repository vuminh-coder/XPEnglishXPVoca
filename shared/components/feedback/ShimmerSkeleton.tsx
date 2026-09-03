"use client";

import React from "react";

interface ShimmerProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * High-End Shimmer Box with 60fps linear wave gradient animation
 */
export function ShimmerBox({ className = "", children }: ShimmerProps) {
  return (
    <div
      className={`relative overflow-hidden bg-slate-200/80 dark:bg-slate-800/80 rounded-lg before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Circular Shimmer element for Avatars, Badges, and round Icons
 */
export function ShimmerCircle({ className = "", size = "w-10 h-10" }: { className?: string; size?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-full shrink-0 bg-slate-200/80 dark:bg-slate-800/80 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent ${size} ${className}`}
    />
  );
}

/**
 * Text line Shimmer element with rounded pill shape
 */
export function ShimmerText({ className = "h-4 w-24" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-slate-200/80 dark:bg-slate-800/80 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent ${className}`}
    />
  );
}
