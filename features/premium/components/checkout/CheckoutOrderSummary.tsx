"use client";

import React from "react";
import { Gift, Check, ShieldCheck } from "lucide-react";
import { PlanKey, PlanConfig } from "../../types";
import { PLANS } from "../../constants";

export interface CheckoutOrderSummaryProps {
  selectedKey: PlanKey;
  onSelectPlan: (key: PlanKey) => void;
  plan: PlanConfig;
}

export function CheckoutOrderSummary({
  selectedKey,
  onSelectPlan,
  plan,
}: CheckoutOrderSummaryProps) {
  return (
    <div className="space-y-4">
      {/* Plan Switcher Pills (rounded-full) */}
      <div className="p-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 flex items-center gap-1 shadow-inner">
        {(Object.keys(PLANS) as PlanKey[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => onSelectPlan(k)}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all cursor-pointer truncate ${
              selectedKey === k
                ? "bg-[#0059bb] text-white shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {k === "yearly" ? "Gói 1 Năm" : k === "monthly" ? "Gói 1 Tháng" : "Trọn Đời"}
          </button>
        ))}
      </div>

      {/* Order Details Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              {plan.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {plan.billingDuration || plan.durationLabel}
            </p>
          </div>
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
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 text-xs font-medium">
          {plan.originalPriceFormatted && (
            <div className="flex justify-between text-slate-400">
              <span>Giá gốc niêm yết:</span>
              <span className="line-through">{plan.originalPriceFormatted}</span>
            </div>
          )}
          {plan.savingsFormatted && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
              <span>Ưu đãi áp dụng:</span>
              <span>- {plan.savingsFormatted}</span>
            </div>
          )}
          <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Tổng thanh toán:
              </span>
              <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {plan.dailyCostNote}
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#0059bb] dark:text-sky-400 font-display">
              {plan.totalPriceFormatted}
            </span>
          </div>
        </div>

        {/* Bundled Gifts Box */}
        <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 space-y-1.5 shadow-2xs">
          <div className="text-[10.5px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Quà tặng đính kèm đơn hàng:</span>
          </div>
          <div className="space-y-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {plan.gifts.map((g, idx) => {
              const GiftIcon = g.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <GiftIcon
                    className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 stroke-[2.2]"
                  />
                  <span>{g.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
            Quyền lợi mở khóa tức thì:
          </div>
          <div className="space-y-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
            {plan.keyHighlights.slice(0, 4).map((f, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0 stroke-[2.8]" />
                <span className="leading-snug">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 100% 7-Day Money Back Guarantee Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 text-xs">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
          <ShieldCheck className="w-4.5 h-4.5 stroke-[2.2]" />
        </div>
        <div>
          <div className="font-bold text-slate-900 dark:text-white">
            Cam kết hoàn tiền 100% trong 7 ngày
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Bảo hiểm an tâm học tập tuyệt đối, không điều kiện rườm rà.
          </div>
        </div>
      </div>
    </div>
  );
}
