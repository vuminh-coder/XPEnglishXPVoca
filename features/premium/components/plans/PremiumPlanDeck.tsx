"use client";

import React from "react";
import { Check, CheckCircle } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { PlanKey } from "../../types";
import { PLANS } from "../../constants";

export interface PremiumPlanDeckProps {
  selectedPlanKey: PlanKey;
  onSelectPlan: (key: PlanKey) => void;
}

export function PremiumPlanDeck({
  selectedPlanKey,
  onSelectPlan,
}: PremiumPlanDeckProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="text-center max-w-xl mx-auto space-y-1">
        <Badge variant="primary" size="sm">Bảng Điều Khiển Gói Hội Viên</Badge>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
          Chọn Lộ Trình Phù Hợp Với Bạn
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Chạm để chọn gói — Toàn bộ ưu đãi và quà tặng sẽ hiển thị trực quan ngay lập tức
        </p>
      </div>

      {/* 3 Interactive Plan Selector Tiles with Equal Heights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {(Object.keys(PLANS) as PlanKey[]).map((key) => {
          const plan = PLANS[key];
          const isSelected = selectedPlanKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectPlan(key)}
              className={`relative p-3.5 sm:p-4.5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2.5 select-none ${
                isSelected
                  ? "bg-white dark:bg-slate-900 border-2 border-[#0059bb] dark:border-sky-400 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/15 -translate-y-0.5"
                  : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:-translate-y-0.5"
              }`}
            >
              {/* Floating Badge & Radio */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                    plan.badgeType === "hot"
                      ? "bg-amber-500 text-white shadow-2xs"
                      : plan.badgeType === "vip"
                      ? "bg-[#0059bb] text-white shadow-2xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                  }`}
                >
                  {plan.badge}
                </span>

                <div
                  className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                    isSelected
                      ? "border-[#0059bb] dark:border-sky-400 bg-[#0059bb] dark:bg-sky-400 text-white"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  {plan.name}
                </h3>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                    {plan.pricePerMonthFormatted}
                  </span>
                  {key !== "lifetime" && (
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ tháng</span>
                  )}
                </div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {plan.dailyCostNote}
                </p>
              </div>

              {/* Bottom Guarantee / Savings strip - Always present for consistent height */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 min-h-[22px]">
                <CheckCircle className="w-3.5 h-3.5 shrink-0 stroke-[2.2]" />
                <span className="truncate">{plan.savingsLabel}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
