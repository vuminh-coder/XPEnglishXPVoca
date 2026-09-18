"use client";

import React from "react";

export interface IpaMetricCardProps {
  icon: React.ReactNode;
  iconBgClass?: string;
  value: React.ReactNode;
  unit?: string;
  label: string;
  subText?: string;
  onClick?: () => void;
  className?: string;
}

export const IpaMetricCard: React.FC<IpaMetricCardProps> = ({
  icon,
  iconBgClass = "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800/50",
  value,
  unit,
  label,
  subText,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs group select-none ${
        onClick ? "cursor-pointer active:scale-95" : ""
      } ${className}`}
    >
      {/* Icon Well (Soft Square with concentric inner curve) */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${iconBgClass}`}
      >
        {icon}
      </div>

      {/* Metric Text */}
      <div className="min-w-0 flex-1">
        <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate flex items-baseline gap-1">
          <span>{value}</span>
          {unit && (
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
              {unit}
            </span>
          )}
        </div>
        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
          {label}
        </div>
        {subText && (
          <div className="text-[9.5px] text-slate-400 dark:text-slate-500 truncate">
            {subText}
          </div>
        )}
      </div>
    </div>
  );
};
