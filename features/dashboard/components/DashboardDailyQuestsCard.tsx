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
  barGradient: string;
  iconBg: string;
  icon: React.ReactNode;
}

const QUEST_CONFIG: Record<string, QuestMeta> = {
  learn_words: {
    href: "/vocabulary",
    actionLabel: "Học từ mới",
    barGradient: "bg-gradient-to-r from-emerald-400 to-teal-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-800/50",
    icon: <BookOpen className="w-5 h-5 stroke-[2]" />,
  },
  review_cards: {
    href: "/review",
    actionLabel: "Ôn tập ngay",
    barGradient: "bg-gradient-to-r from-blue-400 to-indigo-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border-blue-200/80 dark:border-blue-800/50",
    icon: <RotateCcw className="w-5 h-5 stroke-[2]" />,
  },
  win_pvp: {
    href: "/study/pvp",
    actionLabel: "Vào đấu trường",
    barGradient: "bg-gradient-to-r from-rose-400 to-pink-500",
    iconBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/80 dark:border-rose-800/50",
    icon: <Swords className="w-5 h-5 stroke-[2]" />,
  },
  write_essay: {
    href: "/study/dictation",
    actionLabel: "Luyện chính tả",
    barGradient: "bg-gradient-to-r from-amber-400 to-orange-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200/80 dark:border-amber-800/50",
    icon: <PenLine className="w-5 h-5 stroke-[2]" />,
  },
  speak_practice: {
    href: "/study/shadowing",
    actionLabel: "Luyện phát âm",
    barGradient: "bg-gradient-to-r from-purple-400 to-violet-500",
    iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200/80 dark:border-purple-800/50",
    icon: <Mic className="w-5 h-5 stroke-[2]" />,
  },
};

const DEFAULT_QUEST_META: QuestMeta = {
  href: "/study/practice",
  actionLabel: "Luyện tập ngay",
  barGradient: "bg-gradient-to-r from-blue-400 to-indigo-500",
  iconBg: "bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border-blue-200/80 dark:border-blue-800/50",
  icon: <Sparkles className="w-5 h-5 stroke-[2]" />,
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
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center border border-blue-200/80 dark:border-blue-800/80 shrink-0">
            <Target className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-tight">
              Nhiệm Vụ Hôm Nay
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Hoàn thành thử thách để nhận thưởng XP & Vàng
            </p>
          </div>
        </div>

        {/* Dynamic Status Badge */}
        {unclaimedCount > 0 ? (
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs border border-amber-300 dark:border-amber-700/80 flex items-center gap-1.5 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>{unclaimedCount} SẴN SÀNG NHẬN</span>
          </span>
        ) : achievedCount === totalCount && totalCount > 0 ? (
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-300 dark:border-emerald-700/80 flex items-center gap-1.5 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[2.2]" />
            <span>HOÀN THÀNH ({achievedCount}/{totalCount})</span>
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
            <span>{achievedCount}/{totalCount} HOÀN THÀNH</span>
          </span>
        )}
      </div>

      {/* 2. Quest Cards List */}
      <div className="min-h-[180px]">
        {isLoadingChallenges ? (
          <div className="space-y-2.5">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <ShimmerBox className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="space-y-2 flex-1">
                    <ShimmerBox className="h-4 w-36 sm:w-52 rounded" />
                    <ShimmerBox className="h-2 w-28 rounded-full" />
                  </div>
                </div>
                <ShimmerBox className="h-8 w-20 rounded-xl" />
              </div>
            ))}
          </div>
        ) : sortedChallenges.length === 0 ? (
          <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-1.5 opacity-40 text-emerald-500" />
            <p className="font-semibold">Hôm nay không có nhiệm vụ mới</p>
          </div>
        ) : (
          <div className="space-y-2.5">
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
                  className={`p-3 sm:p-3.5 rounded-xl border transition-all duration-200 ${
                    isReadyToClaim
                      ? "bg-gradient-to-r from-emerald-500/[0.04] via-teal-500/[0.02] to-transparent dark:from-emerald-500/[0.08] dark:to-transparent border-emerald-500/40 dark:border-emerald-500/40 shadow-xs"
                      : isTaskFullyCompleted
                      ? "bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/50 opacity-75"
                      : "bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Left: Icon, Title, Progress & Rewards */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs transition-colors ${
                          isTaskFullyCompleted
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                            : meta.iconBg
                        }`}
                      >
                        {meta.icon}
                      </span>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4
                            className={`text-[13px] sm:text-sm font-bold truncate ${
                              isTaskFullyCompleted
                                ? "text-slate-400 dark:text-slate-500"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {ch.title}
                          </h4>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10.5px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                            +{ch.xpReward} XP
                          </span>
                        </div>

                        {/* Mini Progress Bar for in-progress tasks */}
                        {!hasReachedGoal && (
                          <div className="flex items-center gap-2.5 pt-0.5">
                            <div className="h-1.5 sm:h-2 flex-1 max-w-[200px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
                              <div
                                className={`h-full ${meta.barGradient} transition-all duration-500 ease-out rounded-full`}
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                              {ch.progress}/{ch.target}
                            </span>
                          </div>
                        )}

                        {/* Ready to claim hint */}
                        {isReadyToClaim && (
                          <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500 shrink-0" />
                            <span>Đã hoàn thành! Nhận ngay phần thưởng</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Action: Claim CTA, Done Badge, or "Làm ngay ↗" */}
                    <div className="shrink-0 flex items-center">
                      {isTaskFullyCompleted ? (
                        <span className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-mono font-bold text-xs flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 select-none">
                          <Check className="w-3.5 h-3.5 stroke-[2.5] text-emerald-500" />
                          <span>ĐÃ NHẬN</span>
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
                          className="px-3.5 py-1.5 text-xs font-mono font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-sm shadow-emerald-500/25 active:scale-97 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap disabled:opacity-60 border-t border-white/20"
                        >
                          <Sparkles className="w-3.5 h-3.5 fill-white text-white shrink-0" />
                          <span>{isClaiming ? "Đang nhận..." : `Nhận +${ch.xpReward} XP`}</span>
                        </button>
                      ) : (
                        <Link
                          href={meta.href}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#0059bb] dark:text-sky-400 bg-blue-50/80 hover:bg-[#0059bb] hover:text-white dark:bg-blue-950/60 dark:hover:bg-blue-600 dark:hover:text-white border border-blue-200/80 dark:border-blue-800/80 transition-all duration-200 flex items-center gap-1.5 group cursor-pointer shadow-2xs"
                        >
                          <span>Làm ngay</span>
                          <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 group-hover:bg-white/20 flex items-center justify-center transition-colors shrink-0">
                            <ArrowUpRight className="w-3 h-3 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </Link>
                      )}
                    </div>
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
