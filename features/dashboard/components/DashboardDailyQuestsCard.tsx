"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  PenLine,
  RotateCcw,
  BookOpen,
  Mic,
  Swords,
  Sparkles,
  Check,
  CheckCircle2,
} from "lucide-react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

export interface ChallengeItem {
  id: string;
  title: string;
  progress: number;
  target: number;
  xpReward: number;
  coinReward: number;
  isCompleted?: boolean;
  isClaimed?: boolean;
}

interface DashboardDailyQuestsCardProps {
  displayChallenges: ChallengeItem[];
  isLoadingChallenges: boolean;
  claimingChallengeId: string | null;
  handleClaimChallenge: (id: string, xp: number, coins: number) => Promise<void>;
}

type QuestFilter = "all" | "unclaimed" | "completed";

export function DashboardDailyQuestsCard({
  displayChallenges,
  isLoadingChallenges,
  claimingChallengeId,
  handleClaimChallenge,
}: DashboardDailyQuestsCardProps) {
  const [activeFilter, setActiveFilter] = useState<QuestFilter>("all");

  const completedCount = useMemo(() => {
    return displayChallenges.filter(
      (c) => (c.progress >= c.target || c.isCompleted) && c.isClaimed
    ).length;
  }, [displayChallenges]);

  const unclaimedCount = useMemo(() => {
    return displayChallenges.filter(
      (c) => (c.progress >= c.target || c.isCompleted) && !c.isClaimed
    ).length;
  }, [displayChallenges]);

  const filteredChallenges = useMemo(() => {
    if (activeFilter === "unclaimed") {
      return displayChallenges.filter(
        (c) => (c.progress >= c.target || c.isCompleted) && !c.isClaimed
      );
    }
    if (activeFilter === "completed") {
      return displayChallenges.filter((c) => Boolean(c.isClaimed));
    }
    return displayChallenges;
  }, [displayChallenges, activeFilter]);

  const filterTabs: { id: QuestFilter; label: string; count: number }[] = [
    { id: "all", label: "Tất cả", count: displayChallenges.length },
    { id: "unclaimed", label: "Chưa nhận", count: unclaimedCount },
    { id: "completed", label: "Đã xong", count: completedCount },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600 dark:text-sky-400 stroke-[2.2]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
            Nhiệm Vụ Hôm Nay
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs border border-blue-200 dark:border-blue-800">
          {completedCount}/{displayChallenges.length} ĐÃ XONG
        </span>
      </div>

      {/* 2. Sub-Tabs Filter with Spring Sliding Pill Indicator */}
      <div className="p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200/50 dark:border-slate-700/50 flex items-center relative gap-1">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`relative flex-1 py-1 px-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer z-10 ${
                isActive
                  ? "font-black text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="dashboardQuestsFilterIndicator"
                  className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
              )}
              <span className="relative z-10 text-[11px] sm:text-xs">{tab.label}</span>
              <span
                className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  tab.id === "unclaimed" && tab.count > 0
                    ? "bg-amber-500 text-white font-black animate-pulse"
                    : isActive
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    : "bg-slate-200/60 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Quest Cards List with AnimatePresence */}
      <div className="min-h-[180px]">
        {isLoadingChallenges ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2.5 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <ShimmerBox className="w-7 h-7 rounded-lg shrink-0" />
                  <ShimmerBox className="h-3.5 w-32 sm:w-44 rounded" />
                </div>
                <ShimmerBox className="h-4 w-12 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="space-y-2"
            >
              {filteredChallenges.length === 0 ? (
                <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-1.5 opacity-40 text-emerald-500" />
                  <p className="font-semibold">Không có nhiệm vụ nào trong mục này</p>
                </div>
              ) : (
                filteredChallenges.map((ch) => {
                  const hasReachedGoal = ch.progress >= ch.target || ch.isCompleted;
                  const isClaimed = Boolean(ch.isClaimed);
                  const isTaskFullyCompleted = hasReachedGoal && isClaimed;
                  const isClaiming = claimingChallengeId === ch.id;

                  return (
                    <div
                      key={ch.id}
                      className="flex items-center justify-between gap-2.5 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 shadow-2xs hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-2xs">
                          {ch.id === "write_essay" ? (
                            <PenLine className="w-3.5 h-3.5 text-amber-500 stroke-[2]" />
                          ) : ch.id === "review_cards" ? (
                            <RotateCcw className="w-3.5 h-3.5 text-blue-500 stroke-[2]" />
                          ) : ch.id === "learn_words" ? (
                            <BookOpen className="w-3.5 h-3.5 text-emerald-500 stroke-[2]" />
                          ) : ch.id === "speak_practice" ? (
                            <Mic className="w-3.5 h-3.5 text-purple-500 stroke-[2]" />
                          ) : ch.id === "win_pvp" ? (
                            <Swords className="w-3.5 h-3.5 text-rose-500 stroke-[2]" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-blue-500 stroke-[2]" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <h4
                            className={`text-xs font-bold truncate ${
                              isTaskFullyCompleted
                                ? "text-slate-400 dark:text-slate-500 line-through"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {ch.title}
                          </h4>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isTaskFullyCompleted ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[10px] flex items-center gap-1 border border-emerald-500/20">
                            <Check className="w-3 h-3 stroke-[3]" /> ĐÃ NHẬN
                          </span>
                        ) : hasReachedGoal ? (
                          <button
                            type="button"
                            disabled={isClaiming}
                            onClick={() =>
                              handleClaimChallenge(
                                ch.id,
                                ch.xpReward,
                                ch.coinReward
                              )
                            }
                            className="px-2.5 py-1 text-[10px] font-mono font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg shadow-2xs active:scale-95 transition-transform uppercase cursor-pointer whitespace-nowrap disabled:opacity-60"
                          >
                            {isClaiming ? "Đang nhận..." : `Nhận +${ch.xpReward} XP`}
                          </button>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono font-bold text-[10px]">
                            {ch.progress}/{ch.target}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
