"use client";

import React from "react";
import { Crown, Star, Check } from "lucide-react";

export function PremiumHeroStage() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0059bb] via-[#004799] to-[#0a2342] text-white p-4 sm:p-5 lg:p-6 border border-white/15 dark:border-white/10 shadow-md shadow-[#0059bb]/15">
      {/* Ambient Radial Lights */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-amber-400/20 to-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-sky-400/20 to-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
        {/* Left Pitch Block (7/12) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/35 text-amber-300 text-[10.5px] font-bold tracking-wider uppercase backdrop-blur-md shadow-2xs">
            <Crown className="w-3.5 h-3.5 text-amber-300 stroke-[2.2]" />
            <span>XP English PRO VIP Pass</span>
          </div>

          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white font-display leading-snug">
            Bứt Phá Điểm Số{" "}
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              TOEIC & IELTS
            </span>{" "}
            Cùng Trợ Lý AI Toàn Diện
          </h1>

          <p className="text-xs sm:text-[13px] text-blue-100/90 leading-relaxed font-medium max-w-lg">
            Mở khóa không giới hạn hơn 100+ chủ đề từ vựng Oxford chuẩn quốc tế, ngân hàng 37+ đề thi bấm giờ thực tế và gia sư AI sửa phát âm IPA từng câu 24/7.
          </p>

          {/* Realtime Live Learners & Rating */}
          <div className="pt-0.5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-blue-200/90">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>3.420+ học viên đang học hôm nay</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 stroke-[2.2]" />
              <span>4.9 / 5.0 (12.500+ đánh giá)</span>
            </div>
          </div>
        </div>

        {/* Right VIP Membership Card (5/12 Holographic Frame) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[290px] sm:max-w-[310px] rounded-2xl p-0.5 bg-gradient-to-br from-amber-400/60 via-yellow-500/20 to-amber-600/60 shadow-md shadow-amber-500/10">
            <div className="rounded-[14px] bg-gradient-to-b from-slate-900 via-[#0a1124] to-slate-950 p-3.5 sm:p-4 space-y-2.5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 border border-amber-400/30 shadow-2xs shrink-0">
                    <Crown className="w-4 h-4 text-amber-400 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white uppercase tracking-wider">Hội Viên Vàng</div>
                    <div className="text-[10px] text-amber-300/80 font-mono">VIP PRO PASS</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-black bg-amber-400 text-slate-950 shadow-2xs">
                  UNLIMITED
                </span>
              </div>

              <div className="space-y-1.5 py-1.5 border-y border-white/10 text-[11px] sm:text-[11.5px] font-medium text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>Gia Sư AI Speaking & Writing 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>Kho 37+ Đề Thi Thử TOEIC & IELTS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>Bảo Hộ Ngọn Lửa Streak Tự Động</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>Nhân Đôi Hệ Số Thưởng X2 XP</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5 text-xs">
                <span className="text-slate-400 text-[11px]">Đặc quyền trọn gói:</span>
                <span className="text-sm font-black text-amber-300 font-display">69.000 đ/tháng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
