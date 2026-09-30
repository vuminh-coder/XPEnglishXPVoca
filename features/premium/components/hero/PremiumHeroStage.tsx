"use client";

import React from "react";
import { Crown, Star, ShieldCheck, Zap } from "lucide-react";

export function PremiumHeroStage() {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-blue-50/80 via-white to-slate-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 p-6 sm:p-8 lg:p-10 border border-blue-100 dark:border-slate-800 shadow-sm text-center">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-3.5">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>XP English PRO VIP Pass</span>
        </div>

        {/* Clean, Impactful Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display leading-tight">
          Nâng Tầm Trình Độ Tiếng Anh{" "}
          <span className="text-[#0059bb] dark:text-sky-400">
            Không Giới Hạn
          </span>
        </h1>

        {/* Concise Value Proposition */}
        <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">
          Mở khóa toàn bộ 37+ đề thi TOEIC & IELTS chuẩn hóa, Gia sư AI phân tích phát âm IPA 24/7 và hệ thống Spaced Repetition ghi nhớ vĩnh viễn.
        </p>

        {/* Trust Badges - 1 Single Elegant Row */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>3.420+ học viên đang học</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-amber-600 dark:text-amber-400 shadow-2xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-slate-800 dark:text-slate-200">4.9 / 5.0 (12.500+ đánh giá)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 stroke-[2.2]" />
            <span className="text-slate-800 dark:text-slate-200">Cam kết hoàn tiền 7 ngày</span>
          </div>
        </div>
      </div>
    </div>
  );
}
