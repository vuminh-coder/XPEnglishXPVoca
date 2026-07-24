"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "rectangular" | "circular" | "text" | "card";
}

export const SkeletonLoader = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "rectangular", ...props }, ref) => {
    const base =
      "animate-pulse bg-slate-200/70 dark:bg-neutral-800/80 rounded-xl transition-all";

    const variantStyles = {
      text: "h-4 w-full rounded-md",
      circular: "rounded-full",
      rectangular: "h-20 w-full",
      card: "h-48 w-full p-4 border border-slate-200/50 dark:border-white/5 rounded-2xl",
    };

    return (
      <div
        ref={ref}
        className={cn(base, variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

SkeletonLoader.displayName = "SkeletonLoader";
