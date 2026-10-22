"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, X } from "lucide-react";
import { ZiczacUnitGroup } from "../../types";

interface ZiczacUnitHeaderProps {
  unit: ZiczacUnitGroup;
}

export const ZiczacUnitHeader: React.FC<ZiczacUnitHeaderProps> = ({ unit }) => {
  const [showGuidebook, setShowGuidebook] = useState(false);

  // Theme colors per unit
  const getUnitTheme = (unitNum: number) => {
    switch (unitNum) {
      case 1:
        return {
          bg: "bg-[#0059bb]",
          border: "border-b-4 border-[#003d82]",
          buttonBg: "bg-white/15 hover:bg-white/25 text-white border-b-2 border-black/20",
        };
      case 2:
        return {
          bg: "bg-emerald-600",
          border: "border-b-4 border-emerald-800",
          buttonBg: "bg-white/15 hover:bg-white/25 text-white border-b-2 border-black/20",
        };
      case 3:
        return {
          bg: "bg-purple-600",
          border: "border-b-4 border-purple-800",
          buttonBg: "bg-white/15 hover:bg-white/25 text-white border-b-2 border-black/20",
        };
      case 4:
      default:
        return {
          bg: "bg-amber-600",
          border: "border-b-4 border-amber-800",
          buttonBg: "bg-white/15 hover:bg-white/25 text-white border-b-2 border-black/20",
        };
    }
  };

  const theme = getUnitTheme(unit.unitNumber);

  return (
    <div className="relative w-full max-w-xl mx-auto my-6 select-none">
      {/* Duolingo Section Header Banner */}
      <div
        className={`rounded-2xl p-4 sm:p-5 text-white ${theme.bg} ${theme.border} shadow-lg flex items-center justify-between gap-4`}
      >
        <div className="space-y-1 min-w-0">
          <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-white/80">
            PHẦN {unit.unitNumber} • BÀI {(unit.unitNumber - 1) * 5 + 1} - {unit.unitNumber * 5}
          </div>
          <h2 className="text-base sm:text-lg font-bold font-display leading-tight truncate">
            {unit.unitTitle}
          </h2>
          <p className="text-xs text-white/85 line-clamp-1">
            {unit.unitSubtitle}
          </p>
        </div>

        {/* Guidebook Button */}
        <button
          type="button"
          onClick={() => setShowGuidebook(true)}
          className={`h-9 px-3.5 rounded-xl text-xs font-bold font-display flex items-center gap-1.5 shrink-0 cursor-pointer transition-all active:translate-y-0.5 ${theme.buttonBg}`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>HƯỚNG DẪN</span>
        </button>
      </div>

      {/* Guidebook Modal / Drawer */}
      {showGuidebook && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold font-display text-slate-900 dark:text-white">
                <Sparkles className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                <span>Sổ Tay Hướng Dẫn: {unit.unitTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowGuidebook(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {unit.unitSubtitle}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                Mục tiêu cần đạt:
              </h5>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                <li>Hoàn thành 4 chặng rèn luyện kỹ năng độc lập.</li>
                <li>Đạt từ 70% trở lên ở Cột Mốc Tổng Hợp để mở khóa phần thưởng.</li>
                <li>Duy trì chuỗi học tập liên tục để tăng điểm XP nhanh nhất.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setShowGuidebook(false)}
              className="w-full h-10 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white font-bold text-xs font-display cursor-pointer"
            >
              ĐÃ HIỂU
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
