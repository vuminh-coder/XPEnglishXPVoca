"use client";

import React from "react";
import Link from "next/link";
import { Check, Crown, ArrowRight, Gift } from "lucide-react";
import { PlanKey } from "../../types";
import { PLANS } from "../../constants";
import { useUserStore } from "@/stores/userStore";

export interface PremiumPlanDeckProps {
  selectedPlanKey: PlanKey;
  onSelectPlan: (key: PlanKey) => void;
}

export function PremiumPlanDeck({
  selectedPlanKey: _selectedPlanKey,
  onSelectPlan,
}: PremiumPlanDeckProps) {
  const user = useUserStore((s) => s.user);
  return (
    <div className="space-y-4">
      <div className="text-center max-w-lg mx-auto space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight">
          Chọn Gói Học Phù Hợp
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Đầu tư thông minh cho mục tiêu bứt phá điểm số tiếng Anh của bạn
        </p>
      </div>

      {/* 3 Self-Contained Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
        {(["monthly", "yearly", "lifetime"] as PlanKey[]).map((key) => {
          const plan = PLANS[key];
          const isYearly = key === "yearly";
          const isCurrentActive = Boolean(user?.isPremium && user?.premiumTier === key);

          return (
            <div
              key={key}
              onClick={() => onSelectPlan(key)}
              className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between cursor-pointer select-none ${
                isCurrentActive
                  ? "bg-white dark:bg-slate-900 border-2 border-emerald-500 dark:border-emerald-400 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/15"
                  : isYearly
                  ? "bg-white dark:bg-slate-900 border-2 border-[#0059bb] dark:border-sky-500 shadow-lg shadow-blue-500/10 ring-2 ring-[#0059bb]/15 lg:-translate-y-1.5"
                  : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:-translate-y-0.5"
              }`}
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between mb-3">
                {isCurrentActive ? (
                  <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold tracking-wide bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 flex items-center gap-1 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[3]" /> GÓI ĐANG DÙNG
                  </span>
                ) : (
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold tracking-wide ${
                      isYearly
                        ? "bg-[#0059bb] text-white shadow-2xs"
                        : key === "lifetime"
                        ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {isYearly ? "TIẾT KIỆM 45% • PHỔ BIẾN NHẤT" : plan.badge}
                  </span>
                )}

                {isCurrentActive ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <Crown className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500 stroke-none" />
                    <span>Đang kích hoạt</span>
                  </span>
                ) : isYearly ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-500 stroke-none" />
                    <span>Khuyên dùng</span>
                  </span>
                ) : null}
              </div>

              {/* Plan Title & Price */}
              <div className="space-y-1.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                    {plan.pricePerMonthFormatted}
                  </span>
                  {key !== "lifetime" && (
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      / tháng
                    </span>
                  )}
                </div>

                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {key === "yearly" ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Tổng 828.000 đ/năm (Chỉ ~2.300 đ/ngày)
                    </span>
                  ) : key === "lifetime" ? (
                    <span className="text-slate-600 dark:text-slate-300 font-semibold">
                      Thanh toán 1 lần • Sở hữu vĩnh viễn
                    </span>
                  ) : (
                    <span>Thanh toán từng tháng linh hoạt</span>
                  )}
                </div>
              </div>

              {/* Concise Highlights List (Strictly 4 bullet points, concise & readable) */}
              <div className="py-4 space-y-2.5 flex-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                {isYearly ? (
                  <>
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold bg-amber-50/80 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200/60 dark:border-amber-800/40">
                      <Gift className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Tặng thêm 3 tháng học miễn phí</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Kho 37+ đề thi TOEIC & IELTS có giải thích</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Gia sư AI sửa phát âm IPA từng câu 24/7</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Thuật toán SM-2 không giới hạn từ vựng</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Bảo vệ Streak vĩnh viễn & Nhân đôi X2 XP</span>
                    </div>
                  </>
                ) : key === "lifetime" ? (
                  <>
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold bg-amber-50/80 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200/60 dark:border-amber-800/40">
                      <Crown className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Huy hiệu Vương Miện Vàng độc quyền</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Toàn bộ quyền lợi gói Pro vĩnh viễn</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Tự động nhận đề thi & bài học cập nhật mới</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Ưu tiên máy chủ AI tốc độ cao nhất</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Bảo hộ Streak trọn đời không bao giờ đứt</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Mở khóa toàn bộ tính năng Pro trong 30 ngày</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Gia sư AI Speaking & Writing 24/7</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Làm 37+ đề thi TOEIC & IELTS có giải thích</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Tự do hủy gia hạn bất kỳ lúc nào</span>
                    </div>
                  </>
                )}
              </div>

              {/* Direct CTA Action Button */}
              <div className="pt-2">
                {isCurrentActive && key === "lifetime" ? (
                  <Link
                    href="/profile"
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/80 transition-all cursor-pointer select-none"
                  >
                    <span>Đang Sở Hữu Trọn Đời</span>
                    <Crown className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  </Link>
                ) : isCurrentActive ? (
                  <Link
                    href={`/premium/checkout?plan=${key}`}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer select-none"
                  >
                    <span>Gia Hạn Thêm ({plan.name.split("(")[0].trim()})</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                ) : (
                  <Link
                    href={`/premium/checkout?plan=${key}`}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer select-none ${
                      isYearly
                        ? "bg-[#0059bb] hover:bg-[#004799] text-white shadow-md shadow-blue-500/20 active:scale-[0.98]"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 active:scale-[0.98]"
                    }`}
                  >
                    <span>
                      {user?.isPremium
                        ? `Nâng Cấp ${plan.name.split("(")[0].trim()}`
                        : isYearly
                        ? "Kích Hoạt Gói 1 Năm"
                        : `Chọn ${plan.name.split("(")[0].trim()}`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
