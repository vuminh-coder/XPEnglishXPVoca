"use client";

import React from "react";
import { Zap, Trophy, BookOpen, Flame } from "lucide-react";

export function GameHeroBanner() {
  return (
    <div className="p-4 sm:p-5 lg:p-6 rounded-3xl bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-lg shadow-[#0059bb]/15 relative overflow-hidden border border-white/20 select-none">
      {/* Ambient Glow Orbs */}
      <div className="absolute -right-10 -bottom-10 w-44 sm:w-56 h-44 sm:h-56 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-36 sm:w-48 h-36 sm:h-48 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-2xs">
              Gamified Learning Engine
            </span>
            <span className="text-[11px] font-semibold text-blue-100/90 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-300" />
              Luyện Phản Xạ Đa Giác Quan & Ghi Nhớ Sâu
            </span>
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-white font-display">
            Vừa Chơi Vừa Thuộc Lòng Từ Vựng
          </h1>
          <p className="text-xs text-blue-100/90 leading-relaxed font-normal">
            Kích hoạt liên kết mặt chữ và nghĩa ngữ cảnh qua các vòng thử thách trí tuệ, tự động tích lũy điểm thưởng XP, phát âm chuẩn giọng bản xứ và lưu sổ tay ôn tập tức thì.
          </p>
        </div>

        {/* Highlight Stats Badges */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2.5 shrink-0 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
              <Zap className="w-4 h-4 stroke-[2.2] fill-amber-300" />
            </div>
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-white uppercase tracking-wider">
                Thưởng XP & Vàng
              </div>
              <div className="text-xs text-amber-300 font-black font-mono">
                +20 ~ 60 XP / Ván
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2.5 shrink-0 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <BookOpen className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-white uppercase tracking-wider">
                Sổ Tay Ôn Tập
              </div>
              <div className="text-xs text-emerald-300 font-black font-mono">
                Audio & Lưu Từ Tức Thì
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
