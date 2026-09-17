"use client";

import React from "react";

interface CommunityHeroBannerProps {
  gradientClass?: string;
  badgeLeft: React.ReactNode;
  badgeRight?: React.ReactNode;
  mobileExtra?: React.ReactNode;
  title: React.ReactNode;
  description: string;
  desktopExtra?: React.ReactNode;
}

export const CommunityHeroBanner: React.FC<CommunityHeroBannerProps> = ({
  gradientClass = "from-[#0059bb] via-[#004fba] to-[#00388a]",
  badgeLeft,
  badgeRight,
  mobileExtra,
  title,
  description,
  desktopExtra,
}) => {
  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${gradientClass} text-white shadow-md shadow-blue-900/20 relative overflow-hidden`}
    >
      <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
            {badgeLeft}
            {badgeRight}
          </div>

          {mobileExtra && <div className="sm:hidden shrink-0">{mobileExtra}</div>}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div className="space-y-1 max-w-2xl">
            <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
              {description}
            </p>
          </div>

          {desktopExtra && (
            <div className="hidden sm:flex items-center shrink-0">{desktopExtra}</div>
          )}
        </div>
      </div>
    </div>
  );
};
