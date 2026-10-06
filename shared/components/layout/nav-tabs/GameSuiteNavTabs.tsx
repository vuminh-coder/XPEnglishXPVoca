"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Gamepad2, Swords, Trophy, BookOpen } from "lucide-react";
import { HeaderPillContainer, HeaderPillItem } from "../AppTopHeader";

export interface GameSuiteNavTabsProps {
  className?: string;
}

export function GameSuiteNavTabs({ className }: GameSuiteNavTabsProps) {
  const pathname = usePathname();

  const isGamesActive =
    pathname === "/study/games" || pathname?.startsWith("/study/games/");
  const isPvpActive =
    pathname === "/study/pvp" || pathname?.startsWith("/study/pvp/");
  const isLeaderboardActive =
    pathname === "/community/leaderboard" ||
    pathname === "/leaderboard" ||
    pathname?.startsWith("/community/leaderboard/");
  const isPracticeActive =
    pathname === "/study/practice" || pathname?.startsWith("/study/practice/");

  return (
    <HeaderPillContainer className={className}>
      <HeaderPillItem
        active={isGamesActive}
        href="/study/games"
        layoutId="gameSuiteNavActiveTab"
        icon={<Gamepad2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
        label="Mini Games"
      />
      <HeaderPillItem
        active={isPvpActive}
        href="/study/pvp"
        layoutId="gameSuiteNavActiveTab"
        icon={<Swords className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />}
        label="Đấu trường 1v1"
      />
      <HeaderPillItem
        active={isLeaderboardActive}
        href="/community/leaderboard"
        layoutId="gameSuiteNavActiveTab"
        icon={<Trophy className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />}
        label="Xếp hạng"
      />
      <HeaderPillItem
        active={isPracticeActive}
        href="/study/practice"
        layoutId="gameSuiteNavActiveTab"
        icon={<BookOpen className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />}
        label="Luyện từ vựng"
      />
    </HeaderPillContainer>
  );
}

export default GameSuiteNavTabs;
