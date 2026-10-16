"use client";

import React, { useMemo } from "react";
import Link from "next/link";
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
  ArrowUpRight,
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

interface QuestMeta {
  href: string;
  actionLabel: string;
  barColor: string;
  iconBg: string;
  icon: React.ReactNode;
}

const QUEST_CONFIG: Record<string, QuestMeta> = {
  learn_words: {
    href: "/vocabulary",
    actionLabel: "Học từ mới",
    barColor: "bg-emerald-500",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    icon: <BookOpen className="w-3.5 h-3.5 stroke-[2.2]" />,
  },
  review_cards: {
    href: "/review",
    actionLabel: "Ôn tập ngay",
    barColor: "bg-blue-500",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    icon: <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />,
  },
  win_pvp: {
    href: "/study/pvp",
    actionLabel: "Vào đấu trường",
    barColor: "bg-rose-500",
    iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    icon: <Swords className="w-3.5 h-3.5 stroke-[2.2]" />,
  },
  write_essay: {
    href: "/study/dictation",
    actionLabel: "Luyện chính tả",
    barColor: "bg-amber-500",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: <PenLine className="w-3.5 h-3.5 stroke-[2.2]" />,
  },
  speak_practice: {
    href: "/study/shadowing",
    actionLabel: "Luyện phát âm",
    barColor: "bg-purple-500",
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    icon: <Mic className="w-3.5 h-3.5 stroke-[2.2]" />,
  },
};

const DEFAULT_QUEST_META: QuestMeta = {
  href: "/study/practice",
  actionLabel: "Luyện tập ngay",
  barColor: "bg-blue-500",
  iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  icon: <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />,
};

export function DashboardDailyQuestsCard({
  displayChallenges,
  isLoadingChallenges,
  claimingChallengeId,
  handleClaimChallenge,
}: DashboardDailyQuestsCardProps) {
  // 1. Quests ready to claim (reached goal, not claimed)
  const unclaimedCount = useMemo(() => {
    return displayChallenges.filter(
      (c) => (c.progress >= c.target || c.isCompleted) && !c.isClaimed
    ).length;
  }, [displayChallenges]);

  // 2. Quests already completed & claimed
  const completedCount = useMemo(() => {
    return displayChallenges.filter(
      (c) => (c.progress >= c.target || c.isCompleted) && c.isClaimed
    ).length;
  }, [displayChallenges]);

  // 3. Quests that have reached target (regardless of whether claimed yet)
  const achievedCount = useMemo(() => {
    return displayChallenges.filter(
      (c) => c.progress >= c.target || c.isCompleted
    ).length;
  }, [displayChallenges]);

  const totalCount = displayChallenges.length;

  // Smart Priority Sorting:
  // - Ready to claim first (amber/emerald glowing)
  // - In-progress quests second (with interactive progress bar and "Làm ngay ↗")
  // - Completed/claimed quests last (muted)
  const sortedChallenges = useMemo(() => {
    return [...displayChallenges].sort((a, b) => {
      const aDone = Boolean(a.isClaimed);
      const bDone = Boolean(b.isClaimed);
      const aReady = (a.progress >= a.target || a.isCompleted) && !aDone;
      const bReady = (b.progress >= b.target || b.isCompleted) && !bDone;

      if (aReady && !bReady) return -1;
      if (!aReady && bReady) return 1;
      if (aDone && !bDone) return 1;
      if (!aDone && bDone) return -1;
      return 0;
    });
  }, [displayChallenges]);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
      {/* 1. Header with dynamic achievement status */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600 dark:text-sky-400 stroke-[2.2]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
            Nhiệm Vụ Hôm Nay
          </h3>
        </div>

        {unclaimedCount > 0 ? (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs border border-amber-500/30 flex items-center gap-1.5 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {unclaimedCount} SẴN SÀNG NHẬN
          </span>
        ) : achievedCount === totalCount && totalCount > 0 ? (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            {achievedCount}/{totalCount} HOÀN THÀNH
          </span>
        ) : (
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs border border-blue-200 dark:border-blue-800">
            {achievedCount}/{totalCount} HOÀN THÀNH
          </span>
        )}
      </div>

      {/* 2. Quest Cards List */}
      <div className="min-h-[180px]">
        {isLoadingChallenges ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2.5 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <ShimmerBox className="w-7 h-7 rounded-lg shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <ShimmerBox className="h-3.5 w-32 sm:w-44 rounded" />
                    <ShimmerBox className="h-1.5 w-24 rounded-full" />
                  </div>
                </div>
                <ShimmerBox className="h-6 w-16 rounded-lg" />
              </div>
            ))}
          </div>
        ) : sortedChallenges.length === 0 ? (
          <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-1.5 opacity-40 text-emerald-500" />
            <p className="font-semibold">Hôm nay không có nhiệm vụ mới</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedChallenges.map((ch) => {
              const hasReachedGoal =
                ch.progress >= ch.target || Boolean(ch.isCompleted);
              const isClaimed = Boolean(ch.isClaimed);
              const isTaskFullyCompleted = hasReachedGoal && isClaimed;
              const isReadyToClaim = hasReachedGoal && !isClaimed;
              const isClaiming = claimingChallengeId === ch.id;

              const meta = QUEST_CONFIG[ch.id] || DEFAULT_QUEST_META;
              const progressPercent = Math.min(
                100,
                Math.max(
                  0,
                  Math.round((ch.progress / (ch.target || 1)) * 100)
                )
              );

              return (
                <div
                  key={ch.id}
                  className={`flex items-center justify-between gap-3 p-2.5 rounded-xl border transition-all ${
                    isReadyToClaim
                      ? "bg-amber-50/60 dark:bg-amber-950/20 border-amber-300/80 dark:border-amber-800/80 shadow-xs ring-1 ring-amber-400/20"
                      : isTaskFullyCompleted
                      ? "bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/50 dark:border-slate-800/60 opacity-75"
                      : "bg-slate-50/80 dark:bg-slate-950/60 border-slate-200/70 dark:border-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-850/60 shadow-2xs"
                  }`}
                >
                  {/* Left: Icon, Title & Mini Progress Bar */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs ${
                        isTaskFullyCompleted
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                          : meta.iconBg
                      }`}
                    >
                      {meta.icon}
                    </span>

                    <div className="min-w-0 flex-1 space-y-1">
                      <h4
                        className={`text-xs font-bold truncate ${
                          isTaskFullyCompleted
                            ? "text-slate-400 dark:text-slate-500 line-through"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {ch.title}
                      </h4>

                      {/* Mini Progress Bar for in-progress tasks */}
                      {!hasReachedGoal && (
                        <div className="flex items-center gap-2 max-w-[190px]">
                          <div className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${meta.barColor} transition-all duration-300 rounded-full`}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold shrink-0">
                            {ch.progress}/{ch.target}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Action: Claim CTA, Done Badge, or "Làm ngay ↗" */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    {isTaskFullyCompleted ? (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[10px] flex items-center gap-1 border border-emerald-500/20">
                        <Check className="w-3 h-3 stroke-[3]" /> ĐÃ NHẬN
                      </span>
                    ) : isReadyToClaim ? (
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
                        className="px-2.5 py-1 text-[10px] font-mono font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg shadow-2xs active:scale-95 transition-all uppercase cursor-pointer whitespace-nowrap disabled:opacity-60 ring-2 ring-emerald-500/20"
                      >
                        {isClaiming ? "Đang nhận..." : `Nhận +${ch.xpReward} XP`}
                      </button>
                    ) : (
                      <Link
                        href={meta.href}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800/80 transition-colors flex items-center gap-1 cursor-pointer group"
                      >
                        <span>Làm ngay</span>
                        <ArrowUpRight className="w-3 h-3 stroke-[2.2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
