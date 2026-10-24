"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Target, CheckCircle2, Clock, RotateCcw, ArrowRight, Zap, Sparkles } from "lucide-react";
import { XP_CHARACTERS } from "@/features/games/data/characterRoster";

interface PracticeScoreCardProps {
  totalWords: number;
  totalEarnedXp: number;
  elapsedTime: number;
  formatElapsedTime: (seconds: number) => string;
  correctCount: number;
  onRestartSession: () => void;
  // Partition & Navigation
  currentPart?: number;
  totalParts?: number;
  hasNextPart?: boolean;
  nextPartNumber?: number;
  onNextPart?: () => void;
  isCheckpoint?: boolean;
}

export function PracticeScoreCard({
  totalWords,
  totalEarnedXp,
  elapsedTime,
  formatElapsedTime,
  correctCount,
  onRestartSession,
  currentPart,
  totalParts,
  hasNextPart,
  nextPartNumber,
  onNextPart,
  isCheckpoint,
}: PracticeScoreCardProps) {
  const accuracyPercent = Math.round(
    ((correctCount || totalWords) / Math.max(1, totalWords)) * 100
  );

  const character = XP_CHARACTERS[1] || XP_CHARACTERS[0]; // Cô Linh

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col justify-between py-2 sm:py-4 gap-4 min-h-0 select-none"
    >
      {/* 1. Companion Character & Victory Headline */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 pt-2">
        <div className="relative w-24 h-32 sm:w-32 sm:h-40 flex items-end justify-center pointer-events-none">
          <div className="absolute bottom-0 w-20 sm:w-26 h-3 rounded-[100%] bg-slate-400/25 dark:bg-black/40 blur-[2px]" />
          <img
            src={character.avatarUrl}
            alt={character.name}
            className="relative max-h-full w-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
            loading="eager"
          />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isCheckpoint
                ? "Vượt Qua Cột Mốc Xuất Sắc"
                : totalParts && totalParts > 1
                ? `Hoàn Thành Phần ${currentPart}/${totalParts}`
                : "Hoàn Thành Xuất Sắc"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
            {isCheckpoint ? "Đạt Chuẩn Cột Mốc Unit!" : "Tổng Kết Buổi Luyện Tập!"}
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            {isCheckpoint
              ? `Bạn đã hoàn thành bài thi tổng hợp ${totalWords} câu hỏi với kết quả ấn tượng!`
              : `Bạn đã ôn tập trọn vẹn ${totalWords} từ vựng với kết quả ấn tượng!`}
          </p>
        </div>
      </div>

      {/* 2. Key Metrics Grid (3D Cards) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-xl mx-auto w-full">
        {/* XP Earned */}
        <div className="p-3 sm:p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-b-[4px] border-amber-300 dark:border-amber-800 text-center space-y-1 shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-amber-700 dark:text-amber-300 text-xs font-bold">
            <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>XP Thưởng</span>
          </div>
          <p className="text-xl sm:text-2xl font-black font-display text-amber-900 dark:text-amber-100 tabular-nums">
            +{totalEarnedXp}
          </p>
        </div>

        {/* Accuracy */}
        <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-b-[4px] border-emerald-300 dark:border-emerald-800 text-center space-y-1 shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Ghi nhớ</span>
          </div>
          <p className="text-xl sm:text-2xl font-black font-display text-emerald-900 dark:text-emerald-100 tabular-nums">
            {accuracyPercent}%
          </p>
        </div>

        {/* Elapsed Time */}
        <div className="p-3 sm:p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border-2 border-b-[4px] border-blue-300 dark:border-blue-800 text-center space-y-1 shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-[#0059bb] dark:text-sky-300 text-xs font-bold">
            <Clock className="w-4 h-4" />
            <span>Thời gian</span>
          </div>
          <p className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
            {formatElapsedTime(elapsedTime)}
          </p>
        </div>
      </div>

      {/* 3. Action Buttons Row (3D Duolingo CTA) */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 max-w-xl mx-auto w-full pt-2">
        <button
          type="button"
          onClick={onRestartSession}
          className="w-full sm:flex-1 h-12 rounded-2xl border-2 border-b-[4px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-black font-display uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs transition-all"
        >
          <RotateCcw className="w-4 h-4 stroke-[2.4]" />
          <span>{totalParts && totalParts > 1 ? "Luyện lại phần này" : "Luyện lại bài này"}</span>
        </button>

        {hasNextPart && onNextPart ? (
          <button
            type="button"
            onClick={onNextPart}
            className="w-full sm:flex-1 h-12 rounded-2xl border-2 border-b-[4px] border-[#003d82] bg-[#0059bb] hover:bg-blue-600 text-white text-sm font-black font-display uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-sm transition-all"
          >
            <span>Sang Phần {nextPartNumber}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.8]" />
          </button>
        ) : (
          <Link
            href="/roadmap"
            className="w-full sm:flex-1 h-12 rounded-2xl border-2 border-b-[4px] border-[#003d82] bg-[#0059bb] hover:bg-blue-600 text-white text-sm font-black font-display uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-sm transition-all"
          >
            <span>Tiếp tục Lộ trình</span>
            <ArrowRight className="w-4 h-4 stroke-[2.8]" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
