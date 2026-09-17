"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Target, CheckCircle2, Clock, RotateCcw, Headphones } from "lucide-react";

interface PracticeScoreCardProps {
  totalWords: number;
  totalEarnedXp: number;
  elapsedTime: number;
  formatElapsedTime: (seconds: number) => string;
  correctCount: number;
  onRestartSession: () => void;
}

export function PracticeScoreCard({
  totalWords,
  totalEarnedXp,
  elapsedTime,
  formatElapsedTime,
  correctCount,
  onRestartSession,
}: PracticeScoreCardProps) {
  const accuracyPercent = Math.round(
    ((correctCount || totalWords) / Math.max(1, totalWords)) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex-1 min-h-0 overflow-y-auto space-y-3"
    >
      {/* Top Score Banner Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-2xs shrink-0">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                  Hoàn Thành Buổi Ôn Tập Từ Vựng!
                </h2>
                <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase">
                  Xuất sắc
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Đã hoàn thành{" "}
                <strong className="text-slate-900 dark:text-white">{totalWords} từ vựng</strong> trong
                thời gian{" "}
                <strong className="text-slate-900 dark:text-white">
                  {formatElapsedTime(elapsedTime)}
                </strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:self-center">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Tổng Thưởng
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-display tabular-nums">
                +{totalEarnedXp} XP
              </span>
            </div>
          </div>
        </div>

        {/* 3 Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#0059bb]" /> Số từ đã ôn
            </span>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {totalWords} từ
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Tỷ lệ ghi nhớ
            </span>
            <p className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
              {accuracyPercent}%
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> Thời gian học
            </span>
            <p className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
              {formatElapsedTime(elapsedTime)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onRestartSession}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] active:scale-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Luyện Lại Buổi Này
          </button>

          <Link
            href="/study/listening"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
          >
            <Headphones className="w-4 h-4" /> Sang Phòng Luyện Nghe
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            Về Bảng Điều Khiển
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
