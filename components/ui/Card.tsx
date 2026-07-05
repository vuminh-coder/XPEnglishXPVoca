"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bezel" | "glass";
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverable = false, children, ...props }, ref) => {
    const baseStyles = "rounded-2xl transition-all duration-300 relative overflow-hidden";

    const variants = {
      default:
        "bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm",
      bezel:
        "bg-white dark:bg-neutral-900 border-2 border-slate-200 dark:border-neutral-800 shadow-card bezel",
      glass:
        "bg-white/50 dark:bg-neutral-950/50 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-card",
    };

    const hoverStyles = hoverable
      ? "hover:-translate-y-1 hover:shadow-md cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {variant === "bezel" ? (
          <div className="bezel-inner p-5 h-full w-full">{children}</div>
        ) : (
          <div className="p-5 h-full w-full">{children}</div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";
