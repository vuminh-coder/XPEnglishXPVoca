"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookMarked,
  Flame,
  CheckCircle2,
  Percent,
  Zap,
  Clock,
  Award,
} from "lucide-react";
import { useUserStore } from "@/stores/userStore";

interface GrammarHeroMetricsProps {
  stats: {
    total: number;
    completed: number;
    progressPercent: number;
    accuracy: number;
  };
}

export function GrammarHeroMetrics({ stats }: GrammarHeroMetricsProps) {
  const { user } = useUserStore();

  const streak = user?.currentStreak || 1;
  const totalXp = user?.totalXp || 0;
  const minutes = user?.minutesStudied || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs relative overflow-hidden space-y-4"
    >
      {/* Ambient top royal blue accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600/20 via-[#0059bb] to-indigo-600/20" />

      {/* Header Info Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs">
            <BookMarked className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white font-display truncate">
                Ngữ Pháp AI • Grammar Studio
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                CEFR B1 - C2
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-[#0059bb] dark:text-sky-300 border border-blue-500/20">
                60 Chuyên Đề
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-1">
              Chương trình ngữ pháp chuyên sâu chuẩn đề thi TOEIC & IELTS với bài tập sinh tự động từ Gemini AI.
            </p>
          </div>
        </div>

        {/* Level badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shrink-0">
          <Award className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display">
            Cấp độ: {user?.title || "Tân Binh"} (Lv.{user?.level || 1})
          </span>
        </div>
      </div>

      {/* 5 Analytics-Tier Bento Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {/* Metric 1: Streak */}
        <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs hover:border-amber-500/30 transition-colors">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider leading-none">
              Chuỗi Học
            </span>
            <span className="text-sm sm:text-base font-black font-display text-slate-900 dark:text-white mt-1 block truncate">
              {streak} ngày
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4 fill-amber-500/20" />
          </div>
        </div>

        {/* Metric 2: Mastered Topics */}
        <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs hover:border-emerald-500/30 transition-colors">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider leading-none">
              Đã Thuộc
            </span>
            <span className="text-sm sm:text-base font-black font-display text-emerald-600 dark:text-emerald-400 mt-1 block truncate">
              {stats.completed}/{stats.total} bài
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Metric 3: AI Accuracy */}
        <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs hover:border-blue-500/30 transition-colors">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider leading-none">
              Độ Chính Xác AI
            </span>
            <span className="text-sm sm:text-base font-black font-display text-[#0059bb] dark:text-sky-400 mt-1 block truncate">
              {stats.accuracy > 0 ? `${stats.accuracy}%` : "--"}
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Percent className="w-4 h-4" />
          </div>
        </div>

        {/* Metric 4: Total XP */}
        <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs hover:border-purple-500/30 transition-colors">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider leading-none">
              Tổng XP
            </span>
            <span className="text-sm sm:text-base font-black font-display text-purple-600 dark:text-purple-400 mt-1 block truncate">
              {totalXp.toLocaleString()} XP
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 fill-purple-500/20" />
          </div>
        </div>

        {/* Metric 5: Practice Minutes */}
        <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs hover:border-sky-500/30 transition-colors">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider leading-none">
              Thời Gian Học
            </span>
            <span className="text-sm sm:text-base font-black font-display text-sky-600 dark:text-sky-400 mt-1 block truncate">
              {minutes} phút
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
