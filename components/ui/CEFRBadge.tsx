"use client";
import React from "react";
import { cn } from "@/lib/utils";

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | string;

export interface CEFRBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  level: CEFRLevel;
  size?: "sm" | "md";
}

export const CEFRBadge = React.forwardRef<HTMLSpanElement, CEFRBadgeProps>(
  ({ level, size = "sm", className, ...props }, ref) => {
    const lvl = level.toUpperCase();

    const colorStyles: Record<string, string> = {
      A1: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30",
      A2: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      B1: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
      B2: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
      C1: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
      C2: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    };

    const style =
      colorStyles[lvl] ||
      "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30";

    const sizeStyles = {
      sm: "px-2 py-0.5 text-[10px]",
      md: "px-2.5 py-1 text-xs",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-black tracking-wider rounded-lg border backdrop-blur-sm select-none font-display",
          style,
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {lvl}
      </span>
    );
  }
);

CEFRBadge.displayName = "CEFRBadge";
