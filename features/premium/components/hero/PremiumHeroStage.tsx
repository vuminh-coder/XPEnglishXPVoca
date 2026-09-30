"use client";

import React from "react";
import { Crown, Star, ShieldCheck, Zap } from "lucide-react";

export function PremiumHeroStage() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-900/80 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-8 text-center border border-slate-200/80 dark:border-slate-800 shadow-xs">
      {/* Subtle ambient light (soft blue, light and clean) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-3">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400 text-xs font-bold tracking-wide shadow-2xs">
          <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 stroke-[2]" />
          <span>ĐẶC QUYỀN HỘI VIÊN PRO</span>
        </div>

        {/* Concise Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display">
          Nâng Tầm Tiếng Anh Cùng{" "}
          <span className="text-[#0059bb] dark:text-sky-400">XP Pro</span>
        </h1>

        {/* 1 Short, clear subtitle */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
          Mở khóa toàn bộ 37+ đề thi TOEIC/IELTS, gia sư AI 24/7 và thuật toán ghi nhớ SM-2 không giới hạn.
        </p>

        {/* Micro Trust Proof Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-400 font-semibold">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
              ))}
            </div>
            <span className="text-slate-700 dark:text-slate-300 font-bold">4.9/5 (12.500+ đánh giá)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <Zap className="w-3.5 h-3.5 text-amber-500 stroke-[2.2]" />
            <span>Kích hoạt tức thì VietQR</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
            <span>Cam kết hoàn tiền 7 ngày</span>
          </div>
        </div>
      </div>
    </div>
  );
}
