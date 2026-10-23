"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Compass, BarChart3, Trophy } from "lucide-react";
import { HeaderPillContainer, HeaderPillItem } from "../AppTopHeader";

export interface ProgressSuiteNavTabsProps {
  className?: string;
  is3D?: boolean;
}

export function ProgressSuiteNavTabs({ className, is3D = false }: ProgressSuiteNavTabsProps) {
  const pathname = usePathname();

  const isRoadmapActive = pathname === "/roadmap" || pathname?.startsWith("/roadmap/");
  const isAnalyticsActive = pathname === "/analytics" || pathname?.startsWith("/analytics/");
  const isLeaderboardActive =
    pathname === "/community/leaderboard" ||
    pathname?.startsWith("/community/leaderboard") ||
    pathname === "/leaderboard";

  if (is3D) {
    return (
      <div
        className={`p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border-2 border-slate-200/90 dark:border-slate-700/80 border-b-[3px] border-b-slate-300 dark:border-b-slate-600 shadow-2xs hidden sm:inline-flex items-center gap-1 shrink-0 ${className || ""}`}
      >
        <Link
          href="/roadmap"
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-display flex items-center gap-1.5 transition-all select-none ${
            isRoadmapActive
              ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 font-black border-2 border-slate-200/90 dark:border-slate-700 border-b-[3px] border-b-slate-300 dark:border-b-slate-600 shadow-xs translate-y-[-1px]"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold hover:bg-white/60 dark:hover:bg-slate-800/60 active:translate-y-0.5"
          }`}
        >
          <Compass className={`w-4 h-4 ${isRoadmapActive ? "text-[#0059bb] dark:text-sky-400 stroke-[2.3]" : "text-slate-500"}`} />
          <span>Lộ trình</span>
        </Link>

        <Link
          href="/analytics"
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-display flex items-center gap-1.5 transition-all select-none ${
            isAnalyticsActive
              ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 font-black border-2 border-slate-200/90 dark:border-slate-700 border-b-[3px] border-b-slate-300 dark:border-b-slate-600 shadow-xs translate-y-[-1px]"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold hover:bg-white/60 dark:hover:bg-slate-800/60 active:translate-y-0.5"
          }`}
        >
          <BarChart3 className={`w-4 h-4 ${isAnalyticsActive ? "text-blue-500 dark:text-sky-400 stroke-[2.3]" : "text-slate-500"}`} />
          <span>Thống kê</span>
        </Link>

        <Link
          href="/community/leaderboard"
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-display flex items-center gap-1.5 transition-all select-none ${
            isLeaderboardActive
              ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 font-black border-2 border-slate-200/90 dark:border-slate-700 border-b-[3px] border-b-slate-300 dark:border-b-slate-600 shadow-xs translate-y-[-1px]"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold hover:bg-white/60 dark:hover:bg-slate-800/60 active:translate-y-0.5"
          }`}
        >
          <Trophy className={`w-4 h-4 ${isLeaderboardActive ? "text-amber-500 dark:text-amber-400 stroke-[2.3]" : "text-slate-500"}`} />
          <span>Xếp hạng</span>
        </Link>
      </div>
    );
  }

  return (
    <HeaderPillContainer className={className}>
      <HeaderPillItem
        active={isRoadmapActive}
        href="/roadmap"
        layoutId="progressSuiteNavActiveTab"
        icon={<Compass className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
        label="Lộ trình"
      />
      <HeaderPillItem
        active={isAnalyticsActive}
        href="/analytics"
        layoutId="progressSuiteNavActiveTab"
        icon={<BarChart3 className="w-3.5 h-3.5 text-blue-500 dark:text-sky-400" />}
        label="Thống kê"
      />
      <HeaderPillItem
        active={isLeaderboardActive}
        href="/community/leaderboard"
        layoutId="progressSuiteNavActiveTab"
        icon={<Trophy className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />}
        label="Xếp hạng"
      />
    </HeaderPillContainer>
  );
}

export default ProgressSuiteNavTabs;
