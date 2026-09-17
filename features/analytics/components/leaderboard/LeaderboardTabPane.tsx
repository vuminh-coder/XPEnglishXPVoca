"use client";
import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { ShimmerBox, ShimmerCircle } from "@/shared/components/feedback/ShimmerSkeleton";
import { LeaderboardUser } from "../../types";
import { PodiumTop3Card } from "./PodiumTop3Card";
import { LeaderboardListView } from "./LeaderboardListView";

interface LeaderboardTabPaneProps {
  isLoadingLeaderboard: boolean;
  leaderboardData: any[];
  processedLeaderboard: LeaderboardUser[];
  visibleLeaderboardCount: number;
  setVisibleLeaderboardCount: React.Dispatch<React.SetStateAction<number>>;
}

export const LeaderboardTabPane: React.FC<LeaderboardTabPaneProps> = ({
  isLoadingLeaderboard,
  leaderboardData,
  processedLeaderboard,
  visibleLeaderboardCount,
  setVisibleLeaderboardCount,
}) => {
  return (
    <motion.div
      key="leaderboard-container"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.11, ease: [0.2, 0, 0, 1] }}
      className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3.5">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
            Bảng Xếp Hạng Thành Tích XP
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Xếp hạng dựa trên tổng điểm kinh nghiệm kiếm được qua các hoạt động học tập
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-xs shrink-0 self-start sm:self-auto shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Cập nhật thời gian thực</span>
        </div>
      </div>

      {isLoadingLeaderboard && leaderboardData.length === 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Column: Podium Skeleton */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <ShimmerBox className="h-4 w-36 mx-auto rounded" />
            <div className="grid grid-cols-3 gap-2.5 items-end pt-3 pb-1">
              {/* Top 2 Skeleton */}
              <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <ShimmerBox className="h-4 w-10 rounded-full" />
                <ShimmerCircle size="w-10 h-10 sm:w-12 sm:h-12" />
                <ShimmerBox className="h-3 w-16 rounded" />
                <ShimmerBox className="h-6 w-full rounded-lg" />
              </div>
              {/* Top 1 Skeleton */}
              <div className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-slate-800 border-2 border-amber-300 dark:border-amber-700/60 space-y-2 relative -top-2">
                <ShimmerBox className="h-4 w-14 rounded-full bg-amber-200 dark:bg-amber-800" />
                <ShimmerCircle size="w-12 h-12 sm:w-14 sm:h-14" className="ring-2 ring-amber-300" />
                <ShimmerBox className="h-3.5 w-20 rounded bg-amber-200 dark:bg-amber-800" />
                <ShimmerBox className="h-7 w-full rounded-lg bg-amber-400/50" />
              </div>
              {/* Top 3 Skeleton */}
              <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <ShimmerBox className="h-4 w-10 rounded-full" />
                <ShimmerCircle size="w-10 h-10 sm:w-12 sm:h-12" />
                <ShimmerBox className="h-3 w-16 rounded" />
                <ShimmerBox className="h-6 w-full rounded-lg" />
              </div>
            </div>
          </div>

          {/* Right Column: List Skeleton */}
          <div className="lg:col-span-7 space-y-2">
            <ShimmerBox className="h-3.5 w-32 rounded mb-2.5" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <ShimmerBox className="h-4 w-6 rounded" />
                  <ShimmerCircle size="w-8 h-8" />
                  <div className="space-y-1">
                    <ShimmerBox className="h-3.5 w-28 rounded" />
                    <ShimmerBox className="h-2.5 w-20 rounded" />
                  </div>
                </div>
                <ShimmerBox className="h-4 w-16 rounded" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          <PodiumTop3Card
            top1={processedLeaderboard[0]}
            top2={processedLeaderboard[1]}
            top3={processedLeaderboard[2]}
          />

          <LeaderboardListView
            processedLeaderboard={processedLeaderboard}
            visibleLeaderboardCount={visibleLeaderboardCount}
            totalCount={leaderboardData.length}
            onLoadMore={() =>
              setVisibleLeaderboardCount((prev) => Math.min(leaderboardData.length, prev + 8))
            }
          />
        </div>
      )}
    </motion.div>
  );
};
