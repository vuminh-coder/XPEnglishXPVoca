"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  Crown,
  ArrowRight,
  ShieldCheck,
  Gift,
  Sparkles,
  Zap,
} from "lucide-react";
import { PlanKey } from "../../types";
import { PLANS } from "../../constants";

export interface PremiumPlanDeckProps {
  selectedPlanKey?: PlanKey;
  onSelectPlan?: (key: PlanKey) => void;
}

export function PremiumPlanDeck({
  selectedPlanKey = "yearly",
  onSelectPlan,
}: PremiumPlanDeckProps) {
  const yearly = PLANS.yearly;
  const monthly = PLANS.monthly;
  const lifetime = PLANS.lifetime;

  return (
    <div className="space-y-6 pt-1">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400 text-[10.5px] font-bold uppercase tracking-wider">
          <Zap className="w-3 h-3 text-[#0059bb] dark:text-sky-400" />
          <span>Bảng Giá Hội Viên</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
          Chọn Lộ Trình Phù Hợp Với Bạn
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Đầu tư một lần, nhận lại kết quả đột phá cho sự nghiệp và tương lai
        </p>
      </div>

      {/* 3 Self-Contained Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {/* ── CARD 1: 1 THÁNG (LINH HOẠT) ── */}
        <div
          onClick={() => onSelectPlan?.("monthly")}
          className={`rounded-2xl p-5 sm:p-6 bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between space-y-5 select-none ${
            selectedPlanKey === "monthly"
              ? "border-[#0059bb] dark:border-sky-400 shadow-md ring-1 ring-blue-500/20"
              : "border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                {monthly.badge}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {monthly.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {monthly.durationLabel}
              </p>
            </div>

            <div className="pt-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                  {monthly.pricePerMonthFormatted}
                </span>
                <span className="text-xs font-semibold text-slate-500">/ tháng</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                {monthly.dailyCostNote}
              </p>
            </div>

            {/* Features */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {monthly.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="leading-snug">{hl}</span>
                </div>
              ))}
            </div>

            {/* Gift Note */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Gift className="w-3 h-3 text-[#0059bb]" />
                <span>Quà tặng kèm:</span>
              </div>
              {monthly.gifts.map((g, i) => (
                <div key={i} className="text-[11.5px] flex items-center gap-1.5">
                  <span className="text-slate-400">•</span>
                  <span>{g.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/premium/checkout?plan=monthly"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-[#0059bb] hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-slate-800 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-400 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
            >
              <span>Chọn Gói 1 Tháng</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </Link>
          </div>
        </div>

        {/* ── CARD 2: 1 NĂM (PRO VIP PASS - HERO / BEST VALUE) ── */}
        <div
          onClick={() => onSelectPlan?.("yearly")}
          className="relative p-1 rounded-[1.75rem] bg-gradient-to-b from-[#0059bb] via-blue-600 to-[#004799] shadow-xl shadow-blue-500/15 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 select-none"
        >
          {/* Floating Best Choice Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap z-20">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950 stroke-[2.5]" />
            <span>TIẾT KIỆM 45% • PHỔ BIẾN NHẤT</span>
          </div>

          {/* Inner Core Container */}
          <div className="rounded-[calc(1.75rem-0.25rem)] bg-white dark:bg-slate-900 p-5 sm:p-6.5 flex flex-col justify-between space-y-5 h-full">
            <div className="space-y-4 pt-1">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-1.5">
                  <span>{yearly.name}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {yearly.billingDuration}
                </p>
              </div>

              {/* Price Block */}
              <div className="pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#0059bb] dark:text-sky-400 font-display">
                    {yearly.pricePerMonthFormatted}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">/ tháng</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Tổng: {yearly.totalPriceFormatted} / năm
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 line-through">
                    {yearly.originalPriceFormatted}
                  </span>
                </div>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {yearly.dailyCostNote} • Tiết kiệm 360.000 đ
                </p>
              </div>

              {/* Gift Bundle Box */}
              <div className="p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-1.5 shadow-2xs">
                <div className="text-[10.5px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 stroke-[2.2]" />
                  <span>Đặc quyền quà tặng hôm nay:</span>
                </div>
                <div className="space-y-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {yearly.gifts.map((g, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0 stroke-[2.5]" />
                      <span>{g.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {yearly.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="leading-snug font-medium">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary CTA Button (Button-in-Button) */}
            <div className="pt-3 space-y-2">
              <Link
                href="/premium/checkout?plan=yearly"
                className="w-full py-3 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white font-bold text-sm sm:text-base flex items-center justify-between shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Crown className="w-4 h-4 text-amber-300 stroke-[2.2] shrink-0" />
                  <span className="truncate">Bắt đầu với Gói 1 Năm</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-2 transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </Link>
              <div className="flex items-center justify-center gap-3 text-[10.5px] text-slate-400 font-medium">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3 h-3" /> Hoàn tiền 100% trong 7 ngày
                </span>
                <span>•</span>
                <span>VietQR 24/7 tự động</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 3: TRỌN ĐỜI (MASTER LIFETIME) ── */}
        <div
          onClick={() => onSelectPlan?.("lifetime")}
          className={`rounded-2xl p-5 sm:p-6 bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between space-y-5 select-none ${
            selectedPlanKey === "lifetime"
              ? "border-[#0059bb] dark:border-sky-400 shadow-md ring-1 ring-blue-500/20"
              : "border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{lifetime.badge}</span>
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {lifetime.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lifetime.durationLabel}
              </p>
            </div>

            <div className="pt-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                  {lifetime.pricePerMonthFormatted}
                </span>
              </div>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                Thanh toán 1 lần duy nhất — Sử dụng vĩnh viễn
              </p>
            </div>

            {/* Features */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {lifetime.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="leading-snug">{hl}</span>
                </div>
              ))}
            </div>

            {/* Lifetime VIP Gifts */}
            <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div className="text-[10.5px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Đặc quyền Lifetime:</span>
              </div>
              {lifetime.gifts.map((g, i) => (
                <div key={i} className="text-[11.5px] flex items-center gap-1.5">
                  <span className="text-amber-500">•</span>
                  <span>{g.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/premium/checkout?plan=lifetime"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-amber-500 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 text-slate-800 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-400 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
            >
              <span>Sở Hữu Trọn Đời</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
