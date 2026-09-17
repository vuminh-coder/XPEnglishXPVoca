"use client";

import React from "react";
import { Zap } from "lucide-react";

export function GameHeroBanner() {
  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-md shadow-[#0059bb]/15 relative overflow-hidden border border-white/15 dark:border-white/10">
      {/* Ambient Orbs */}
      <div className="absolute -right-10 -bottom-10 w-48 sm:w-60 h-48 sm:h-60 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-2xs">
              Gamified Learning
            </span>
            <span className="text-[11px] font-semibold text-blue-100/90">
              Vừa giải đố vừa phản xạ ghi nhớ từ vựng tức thì
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-display">
            Mini Games Từ Vựng Tương Tác
          </h1>
          <p className="text-xs sm:text-[13px] text-blue-100/90 leading-relaxed font-normal">
            Kích hoạt liên kết mặt chữ và nghĩa ngữ cảnh qua các vòng thử thách trí tuệ, tích lũy điểm thưởng XP và nhân đôi hiệu suất học tập mỗi ngày.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 shrink-0 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
            <Zap className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Thưởng XP Tức Thì
            </div>
            <div className="text-[11px] text-amber-300 font-semibold font-mono">
              +20 ~ 60 XP / Ván
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
