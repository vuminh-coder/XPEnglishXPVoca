"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Gift,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { PlanKey, PlanConfig } from "../../types";

export interface PremiumPlanPerksSpotlightProps {
  selectedPlan: PlanConfig;
  selectedPlanKey: PlanKey;
}

export function PremiumPlanPerksSpotlight({
  selectedPlan,
  selectedPlanKey,
}: PremiumPlanPerksSpotlightProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedPlanKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-slate-50/40 to-white dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border border-blue-200/80 dark:border-blue-900/40 shadow-sm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center">
          {/* Left (7/12): Plan Perks & Gifts */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shadow-md shadow-[#0059bb]/20 shrink-0">
                <Crown className="w-4 h-4 text-amber-300 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  Đặc Quyền Của Bạn Khi Kích Hoạt {selectedPlan.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Bắt đầu ngay hôm nay để bứt phá trình độ tiếng Anh vượt trội
                </p>
              </div>
            </div>

            {/* Gifts Bundle */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 space-y-1 shadow-2xs">
              <div className="text-[10.5px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Gói quà tặng kèm miễn phí hôm nay:</span>
              </div>
              <div className="space-y-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {selectedPlan.gifts.map((gift, gIdx) => {
                  const IconComp = gift.icon;
                  return (
                    <div key={gIdx} className="flex items-center gap-2">
                      <IconComp
                        className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 stroke-[2.2]"
                      />
                      <span>{gift.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              {selectedPlan.keyHighlights.map((hl, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-2.5 h-2.5 stroke-[2.8]" />
                  </div>
                  <span className="leading-snug">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right (5/12): Final Pricing Box & Direct Link to Checkout */}
          <div className="lg:col-span-5 p-4 sm:p-4.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-0.5">
              <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                Tổng thanh toán:
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-[#0059bb] dark:text-sky-400 font-display">
                  {selectedPlan.totalPriceFormatted}
                </span>
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {selectedPlan.durationLabel}
              </div>
            </div>

            {/* Direct Link to Dedicated Checkout Page with Button-in-Button Pattern */}
            <Link
              href={`/premium/checkout?plan=${selectedPlanKey}`}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs sm:text-sm font-bold flex items-center justify-between shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all group cursor-pointer select-none"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Crown className="w-4 h-4 text-amber-300 stroke-[2.2] shrink-0" />
                <span className="truncate">Kích hoạt {selectedPlan.name}</span>
              </div>
              {/* Trailing Icon Button-in-Button */}
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-2 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </Link>

            <div className="flex items-center justify-center gap-3.5 text-[10.5px] text-slate-500 font-medium pt-0.5">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 stroke-[2.2]" /> Hoàn tiền 7 ngày
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500 stroke-[2.2]" /> Quét mã VietQR 24/7
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
