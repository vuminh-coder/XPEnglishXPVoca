"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Check, Gift, CheckCircle2, Loader2 } from "lucide-react";
import { ShimmerCircle } from "@/shared/components/feedback/ShimmerSkeleton";
import { StreakFlame3D } from "@/shared/components/feedback/StreakFlame3D";

interface DashboardStreakStudioProps {
  user: any;
  weekDays: { day: string; status: "learned" | "current" | "missed" | "pending" | "unlearned"; dateStr?: string }[];
  isLoadingCheckin: boolean;
  isCheckedInToday: boolean;
  isCheckingIn: boolean;
  handleCheckIn: () => void;
}

export function DashboardStreakStudio({
  user,
  weekDays,
  isLoadingCheckin,
  isCheckedInToday,
  isCheckingIn,
  handleCheckIn,
}: DashboardStreakStudioProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3 relative overflow-hidden">
      {/* 1. Speech Bubble */}
      <div className="relative mx-auto max-w-[290px] sm:max-w-[320px] text-center px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug">
          <span className="font-bold text-amber-600 dark:text-amber-400">Chuỗi streak rực lửa!</span>
          <span className="block mt-0.5 text-slate-600 dark:text-slate-300">Luyện tập mỗi ngày để nối dài streak.</span>
        </p>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-50 dark:bg-slate-800/90 border-r border-b border-slate-200/80 dark:border-slate-700 rotate-45" />
      </div>

      {/* 2. Hero Mascot 3D Flame & Streak Counter */}
      <div className="flex flex-col items-center justify-center pt-1 text-center">
        <StreakFlame3D size="lg" />

        <div className="mt-1">
          <div className="text-4xl sm:text-5xl font-black font-display bg-gradient-to-b from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent tracking-tight leading-none drop-shadow-[0_4px_12px_rgba(245,158,11,0.35)]">
            {user?.currentStreak || 1}
          </div>
          <div className="text-[11px] sm:text-xs font-black uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400 mt-1 font-display">
            ngày streak
          </div>
        </div>
      </div>

      {/* 3. 7-Day Circle Stepper with Smart Milestone Gift on Sunday */}
      {isLoadingCheckin ? (
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center pt-1">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((label, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold text-slate-400/70 dark:text-slate-500/70">
                {label}
              </span>
              <ShimmerCircle className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center pt-1">
          {weekDays.map((wd, i) => {
            const isToday = wd.status === "current";
            const isLearned = wd.status === "learned";
            const isMilestoneDay = i === 6 || wd.day === "CN";

            return (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 relative group/day cursor-pointer"
                title={
                  isMilestoneDay
                    ? "Mốc tuần: Học đủ 7 ngày nhận ngay +100 Vàng!"
                    : `${wd.day}: ${isLearned ? "Đã học" : isToday ? "Hôm nay" : "Chưa học"}`
                }
              >
                <span
                  className={`text-[11px] font-mono font-bold transition-colors ${
                    isToday
                      ? "text-amber-600 dark:text-amber-400 font-black"
                      : isLearned
                      ? "text-slate-800 dark:text-slate-200"
                      : isMilestoneDay
                      ? "text-amber-600 dark:text-amber-400 font-bold"
                      : "text-slate-500 dark:text-slate-400 font-semibold"
                  }`}
                >
                  {wd.day}
                </span>

                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                    isLearned
                      ? "bg-gradient-to-tr from-amber-500 to-orange-400 text-white shadow-xs shadow-orange-500/25 ring-1 ring-amber-400/20"
                      : isToday
                      ? "bg-gradient-to-tr from-amber-500 to-orange-500 text-white ring-4 ring-amber-400/35 shadow-md shadow-amber-500/35 animate-pulse"
                      : isMilestoneDay
                      ? "bg-amber-500/10 dark:bg-amber-500/15 border border-dashed border-amber-400/70 dark:border-amber-500/50 hover:bg-amber-500/20 transition-colors"
                      : "bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80"
                  }`}
                >
                  {isLearned ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : isToday ? (
                    isMilestoneDay ? (
                      <Gift className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Flame className="w-3.5 h-3.5 fill-white stroke-none" />
                    )
                  ) : isMilestoneDay ? (
                    <Gift className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Checkin Button CTA */}
      <div className="pt-1.5 sm:pt-2">
        {isCheckedInToday ? (
          <button
            type="button"
            disabled
            className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-default select-none border-t border-white/20"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            <span>ĐÃ ĐIỂM DANH HÔM NAY</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCheckIn}
            disabled={isCheckingIn || isLoadingCheckin}
            className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#0059bb] to-blue-600 hover:from-[#004fba] hover:to-blue-700 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border-t border-white/20 disabled:opacity-60"
          >
            {isCheckingIn ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Flame className="w-4 h-4 fill-white stroke-none" />
            )}
            <span>{isCheckingIn ? "Đang điểm danh..." : "ĐIỂM DANH (+15 XP)"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
