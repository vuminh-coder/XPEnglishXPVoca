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
      "animate-pulse bg-slate-200/70 dark:bg-neutral-800/80 rounded-xs transition-all";

    const variantStyles = {
      text: "h-4 w-full rounded-xs",
      circular: "rounded-full",
      rectangular: "h-20 w-full rounded-xs",
      card: "h-48 w-full p-4 border border-slate-200/80 dark:border-white/10 rounded-xs bg-white dark:bg-slate-900 shadow-2xs",
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
