"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NestedActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  icon?: React.ReactNode;
}

export const NestedActionButton = React.forwardRef<
  HTMLButtonElement,
  NestedActionButtonProps
>(({ label, variant = "primary", icon, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group inline-flex items-center justify-between gap-3 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 active:scale-98 cursor-pointer select-none",
        variant === "primary" &&
          "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/20",
        variant === "gradient" &&
          "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white shadow-lg shadow-indigo-500/25 border border-white/20",
        variant === "secondary" &&
          "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/15 hover:bg-slate-200 dark:hover:bg-white/15",
        variant === "ghost" &&
          "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5",
        className
      )}
      {...props}
    >
      <span className="whitespace-nowrap">{label}</span>
      {/* Trailing Icon Pill Enclosure */}
      <div className="w-7 h-7 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105">
        {icon || <ArrowRight className="w-3.5 h-3.5 text-current stroke-[2.5]" />}
      </div>
    </button>
  );
});

NestedActionButton.displayName = "NestedActionButton";
