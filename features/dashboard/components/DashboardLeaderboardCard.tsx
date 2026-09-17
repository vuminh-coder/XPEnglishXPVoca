"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, Award } from "lucide-react";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import { ShimmerBox, ShimmerCircle } from "@/shared/components/feedback/ShimmerSkeleton";

export interface LeaderboardLeader {
  id?: string;
  fullName: string;
  username?: string;
  xp: number;
  minutesStudied?: number;
  avatarUrl?: string;
  imageUrl?: string;
  avatar?: string;
  avatarEmoji?: string;
}

interface DashboardLeaderboardCardProps {
  leaderboardTab: "week" | "month";
  setLeaderboardTab: (tab: "week" | "month") => void;
  leaderboardCriterion: "time" | "xp";
  setLeaderboardCriterion: (criterion: "time" | "xp") => void;
  isLoadingLeaderboard: boolean;
  userRankInLeaderboard: number;
  user: any;
  topLeaders: LeaderboardLeader[];
}

export function DashboardLeaderboardCard({
  leaderboardTab,
  setLeaderboardTab,
  leaderboardCriterion,
  setLeaderboardCriterion,
  isLoadingLeaderboard,
  userRankInLeaderboard,
  user,
  topLeaders,
}: DashboardLeaderboardCardProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
      {/* 1. Header with Trophy and Period Switcher */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-amber-500">
          <Trophy className="w-4 h-4 stroke-[2.2]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
            Bảng Xếp Hạng
          </h3>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Spring Sliding Pill: Tuần vs Tháng */}
          <div className="p-0.5 bg-slate-100 dark:bg-slate-800/90 rounded-lg flex items-center relative border border-slate-200/50 dark:border-slate-700/50">
            {(["week", "month"] as const).map((tab) => {
              const isActive = leaderboardTab === tab;
              const label = tab === "week" ? "Tuần" : "Tháng";

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setLeaderboardTab(tab)}
                  className={`relative px-2.5 sm:px-3 py-1 min-w-[42px] sm:min-w-[46px] text-center rounded-md text-[11px] font-mono transition-colors z-10 cursor-pointer ${
                    isActive
                      ? "font-black text-slate-900 dark:text-white"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="dashboardLbPeriodIndicator"
                      className="absolute inset-0 rounded-md bg-white dark:bg-slate-900 shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          <Link
            href="/community/leaderboard"
            className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline shrink-0"
          >
            Xem tất cả ➔
          </Link>
        </div>
      </div>

      {/* 2. Criterion Switcher with Spring Sliding Pill (Thời gian học vs Điểm XP) */}
      <div className="p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200/50 dark:border-slate-700/50 grid grid-cols-2 gap-1 relative">
        <button
          type="button"
          onClick={() => setLeaderboardCriterion("time")}
          className={`relative py-1.5 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer z-10 ${
            leaderboardCriterion === "time"
              ? "text-[#0059bb] dark:text-blue-400 font-black"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
          }`}
        >
          {leaderboardCriterion === "time" && (
            <motion.div
              layoutId="dashboardLbCriterionIndicator"
              className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
            />
          )}
          <Clock className="w-3.5 h-3.5 stroke-[2.2] relative z-10" />
          <span className="relative z-10">Thời gian học</span>
        </button>

        <button
          type="button"
          onClick={() => setLeaderboardCriterion("xp")}
          className={`relative py-1.5 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer z-10 ${
            leaderboardCriterion === "xp"
              ? "text-[#0059bb] dark:text-blue-400 font-black"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
          }`}
        >
          {leaderboardCriterion === "xp" && (
            <motion.div
              layoutId="dashboardLbCriterionIndicator"
              className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
            />
          )}
          <Award className="w-3.5 h-3.5 stroke-[2.2] relative z-10" />
          <span className="relative z-10">Điểm XP</span>
        </button>
      </div>

      {/* 3. Leaderboard Rows with AnimatePresence */}
      <div className="min-h-[190px]">
        {isLoadingLeaderboard ? (
          <div className="space-y-2">
            {/* User Row Shimmer */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <ShimmerBox className="w-4 h-4 rounded" />
                <ShimmerCircle className="w-6 h-6 shrink-0" />
                <ShimmerBox className="h-3.5 w-24 rounded" />
              </div>
              <ShimmerBox className="h-4 w-12 rounded" />
            </div>

            {/* Top 3 Podium Shimmer Rows */}
            {[
              "bg-amber-400/20 border-amber-400/30",
              "bg-slate-200/60 dark:bg-slate-700/50 border-slate-300/40",
              "bg-amber-600/15 border-amber-600/30",
            ].map((badgeStyle, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-md border ${badgeStyle}`}>
                    <span className="font-mono text-[11px] font-black text-slate-400/60">{idx + 1}</span>
                  </span>
                  <ShimmerCircle className="w-6 h-6 shrink-0" />
                  <ShimmerBox className="h-3.5 w-28 rounded" />
                </div>
                <ShimmerBox className="h-4 w-12 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${leaderboardTab}-${leaderboardCriterion}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="space-y-2 pt-1"
            >
              {/* User Row (Live Synced) */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs font-black text-blue-600 dark:text-sky-400 font-mono shrink-0">
                    #{userRankInLeaderboard}
                  </span>
                  <UserAvatar
                    avatar={(user as any)?.avatarUrl || user?.imageUrl || (user as any)?.avatar}
                    imageUrl={user?.imageUrl}
                    emoji={user?.avatarEmoji}
                    name={user?.fullName || user?.username || "Bạn"}
                    size="w-6 h-6"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    Bạn (Hiện tại)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-600 text-white shadow-2xs shrink-0">
                  {leaderboardCriterion === "xp"
                    ? `${user?.totalXp || 0} XP`
                    : `${user?.minutesStudied || 0}m`}
                </span>
              </div>

              {/* Top 3 Leaders */}
              {topLeaders.map((leader: LeaderboardLeader, idx: number) => {
                const displayScore =
                  leaderboardCriterion === "xp"
                    ? `${leader.xp} XP`
                    : `${leader.minutesStudied ?? Math.max(5, Math.round(leader.xp / 10))}m`;

                return (
                  <div
                    key={leader.id || idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 shadow-2xs hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-md text-[11px] font-mono font-black shadow-2xs ${
                          idx === 0
                            ? "bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30"
                            : idx === 1
                            ? "bg-slate-200/60 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border border-slate-300/40"
                            : "bg-amber-600/15 text-amber-700 dark:text-amber-500 border border-amber-600/30"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <UserAvatar
                        avatar={leader.avatarUrl || leader.imageUrl || leader.avatar}
                        imageUrl={leader.imageUrl}
                        emoji={leader.avatarEmoji}
                        name={leader.fullName || leader.username || "Học viên"}
                        size="w-6 h-6"
                      />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {leader.fullName}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                      {displayScore}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
