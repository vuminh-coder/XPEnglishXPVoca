"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ChevronRight, ShieldCheck, GraduationCap } from "lucide-react";

interface ProfileInventorySectionProps {
  streakFreezes: number;
  equippedHat: boolean;
  onToggleEquippedHat: () => void;
}

export const ProfileInventorySection: React.FC<ProfileInventorySectionProps> = ({
  streakFreezes,
  equippedHat,
  onToggleEquippedHat,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-2xs">
            <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Rương Vật Phẩm & Trang Bị
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Quản lý phụ kiện avatar và vật phẩm hỗ trợ học tập
            </p>
          </div>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-0.5 font-display"
        >
          <span>Vào Shop</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
        {/* Item 1: Streak Freeze with Crisp Lucide ShieldCheck Icon */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-50/80 to-orange-50/40 dark:from-amber-950/30 dark:to-slate-900 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800/60 shadow-2xs">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                Bảo Hộ Chuỗi Học Tập
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                Bảo vệ Streak khi nghỉ 1 ngày
              </div>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 text-[11px] font-mono font-black shadow-xs shrink-0">
            {streakFreezes} SẴN CÓ
          </span>
        </div>

        {/* Item 2: Graduation Hat Avatar Cosmetic with Crisp Lucide GraduationCap Icon */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-50/80 to-indigo-50/40 dark:from-purple-950/30 dark:to-slate-900 border border-purple-200/60 dark:border-purple-900/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800/60 shadow-2xs">
              <GraduationCap className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                Nón Cử Nhân Avatar
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                Phụ kiện vinh danh góc avatar
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleEquippedHat}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs shrink-0 font-display ${
              equippedHat
                ? "bg-purple-600 text-white border border-purple-700 shadow-md"
                : "bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 hover:bg-purple-50"
            }`}
          >
            {equippedHat ? "Đang Đeo ✓" : "Trang Bị"}
          </button>
        </div>
      </div>
    </div>
  );
};
