"use client";

import React from "react";
import { Trophy, Sparkles } from "lucide-react";
import { CommunityHeroBanner } from "../shared/CommunityHeroBanner";
import { LeaderboardPeriodFilter } from "./LeaderboardPeriodFilter";
import { LeaderboardPodiumTop3 } from "./LeaderboardPodiumTop3";
import { LeaderboardRanksTable } from "./LeaderboardRanksTable";
import { LeaderboardUserStatusWidget } from "./LeaderboardUserStatusWidget";
import { LeaderboardWeeklyRewardsWidget } from "./LeaderboardWeeklyRewardsWidget";
import { useLeaderboardData } from "../../hooks/useLeaderboardData";

interface CommunityLeaderboardViewProps {
  user: any;
  awardXp?: (amt: number) => void;
  isFromAnalytics?: boolean;
}

export function CommunityLeaderboardView({
  user,
}: CommunityLeaderboardViewProps) {
  const {
    loading,
    period,
    setPeriod,
    searchQuery,
    setSearchQuery,
    top1,
    top2,
    top3,
    currentUserItem,
    userRankNum,
    ranksFiltered,
  } = useLeaderboardData(user);

  const currentUserXp = currentUserItem?.xp || Number(user?.totalXp || user?.xp || 0);

  return (
    <div className="space-y-4">
      {/* 1. HERO SPOTLIGHT BANNER */}
      <CommunityHeroBanner
        gradientClass="from-[#0059bb] via-[#004fba] to-[#00388a]"
        badgeLeft={
          <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Bảng Vinh Danh XP
          </span>
        }
        badgeRight={
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-white/15 text-white border border-white/20 font-mono shrink-0">
            Reset: 23:59 Chủ Nhật
          </span>
        }
        mobileExtra={
          <div className="px-3 py-1 rounded-lg bg-amber-400/20 border border-amber-300/30 text-amber-200 flex items-center gap-1.5 text-xs font-black font-display shrink-0">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            {loading ? (
              <span className="w-12 h-3.5 bg-amber-300/30 rounded animate-pulse" />
            ) : (
              <span>Hạng #{userRankNum}</span>
            )}
          </div>
        }
        title={
          <>
            <span>Đua Top Chiến Binh XP English</span>
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
          </>
        }
        description="Vinh danh những học viên có chuỗi ngày học bền bỉ và tích lũy XP cao nhất. Tích lũy XP ngay bằng bài học & thi thử!"
        desktopExtra={
          <div className="flex items-center gap-3 shrink-0 p-3 rounded-xl bg-white/10 dark:bg-slate-900/60 border border-white/20 backdrop-blur-md shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-wider text-blue-100 font-bold block font-display">
                Vị trí của bạn
              </span>
              <div className="font-extrabold text-sm text-white font-mono flex items-center gap-1.5">
                {loading ? (
                  <span className="w-16 h-4 bg-white/20 rounded animate-pulse" />
                ) : (
                  <>
                    <span>Hạng #{userRankNum}</span>
                    <span className="text-xs text-amber-300 font-normal">
                      ({currentUserXp.toLocaleString()} XP)
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        }
      />

      {/* 2. BENTO GRID: 8/12 PODIUM & TABLE + 4/12 SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column (lg:col-span-8): Podium & List */}
        <div className="lg:col-span-8 space-y-4">
          <LeaderboardPeriodFilter
            period={period}
            onPeriodChange={setPeriod}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <LeaderboardPodiumTop3
            loading={loading}
            top1={top1}
            top2={top2}
            top3={top3}
          />

          <LeaderboardRanksTable
            loading={loading}
            ranks={ranksFiltered}
          />
        </div>

        {/* Right Column (lg:col-span-4): Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-4 sticky top-4">
          <LeaderboardUserStatusWidget
            user={user}
            userRankNum={userRankNum}
            currentUserXp={currentUserXp}
          />

          <LeaderboardWeeklyRewardsWidget />
        </div>
      </div>
    </div>
  );
}
