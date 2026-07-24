"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface DoubleBezelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  outerClassName?: string;
  innerClassName?: string;
  hoverable?: boolean;
}

export const DoubleBezelCard = React.forwardRef<HTMLDivElement, DoubleBezelCardProps>(
  ({ children, outerClassName, innerClassName, hoverable = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative p-1.5 rounded-[20px] bg-[#f0f4f9] dark:bg-slate-900/60 border border-[#e9eef5] dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300",
          hoverable && "hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md",
          outerClassName,
          className
        )}
        {...props}
      >
        {/* Inner Core with concentric border radius: rounded-[16px] */}
        <div
          className={cn(
            "w-full h-full p-5 rounded-[16px] bg-white dark:bg-slate-950/80 backdrop-blur-xl border border-[#e9eef5]/60 dark:border-white/5 shadow-2xs transition-transform duration-300",
            hoverable && "group-hover:scale-[0.995]",
            innerClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

DoubleBezelCard.displayName = "DoubleBezelCard";
