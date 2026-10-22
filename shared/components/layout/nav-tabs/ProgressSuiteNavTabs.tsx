"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Compass, BarChart3, Trophy } from "lucide-react";
import { HeaderPillContainer, HeaderPillItem } from "../AppTopHeader";

export interface ProgressSuiteNavTabsProps {
  className?: string;
}

export function ProgressSuiteNavTabs({ className }: ProgressSuiteNavTabsProps) {
  const pathname = usePathname();

  const isRoadmapActive = pathname === "/roadmap" || pathname?.startsWith("/roadmap/");
  const isAnalyticsActive = pathname === "/analytics" || pathname?.startsWith("/analytics/");
  const isLeaderboardActive =
    pathname === "/community/leaderboard" ||
    pathname?.startsWith("/community/leaderboard") ||
    pathname === "/leaderboard";

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
