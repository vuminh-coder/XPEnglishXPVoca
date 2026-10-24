"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, X, Lightbulb, Languages, CheckCircle2 } from "lucide-react";
import { ZiczacUnitGroup } from "../../types";

interface ZiczacUnitHeaderProps {
  unit: ZiczacUnitGroup;
}

export const ZiczacUnitHeader: React.FC<ZiczacUnitHeaderProps> = ({ unit }) => {
  const [showGuidebook, setShowGuidebook] = useState(false);

  // Theme colors per unit with high-contrast text and luminous badges
  const getUnitTheme = (colorTheme?: string, unitNum: number = 1) => {
    const cycleColors = ["blue", "emerald", "purple", "amber", "rose"] as const;
    const resolvedColor = colorTheme || cycleColors[(unitNum - 1) % cycleColors.length];
    switch (resolvedColor) {
      case "blue":
        return {
          bg: "bg-[#0059bb]",
          border: "border-b-4 border-[#003d82]",
          badge: "bg-amber-300 text-amber-950 font-black",
          subtitle: "text-blue-100",
          buttonBg: "bg-white hover:bg-blue-50 text-[#0059bb] border-b-2 border-slate-300 shadow-sm",
        };
      case "emerald":
        return {
          bg: "bg-emerald-600",
          border: "border-b-4 border-emerald-800",
          badge: "bg-amber-300 text-amber-950 font-black",
          subtitle: "text-emerald-100",
          buttonBg: "bg-white hover:bg-emerald-50 text-emerald-700 border-b-2 border-slate-300 shadow-sm",
        };
      case "purple":
        return {
          bg: "bg-purple-600",
          border: "border-b-4 border-purple-800",
          badge: "bg-amber-300 text-amber-950 font-black",
          subtitle: "text-purple-100",
          buttonBg: "bg-white hover:bg-purple-50 text-purple-700 border-b-2 border-slate-300 shadow-sm",
        };
      case "amber":
        return {
          bg: "bg-amber-600 dark:bg-amber-700",
          border: "border-b-4 border-amber-800",
          badge: "bg-white text-amber-950 font-black",
          subtitle: "text-amber-100",
          buttonBg: "bg-white hover:bg-amber-50 text-amber-800 border-b-2 border-slate-300 shadow-sm",
        };
      case "rose":
      default:
        return {
          bg: "bg-rose-600 dark:bg-rose-700",
          border: "border-b-4 border-rose-800",
          badge: "bg-amber-300 text-amber-950 font-black",
          subtitle: "text-rose-100",
          buttonBg: "bg-white hover:bg-rose-50 text-rose-700 border-b-2 border-slate-300 shadow-sm",
        };
    }
  };

  const theme = getUnitTheme(unit.colorTheme, unit.unitNumber);

  // Split "Unit X: Title" into distinct Unit badge & Title
  const match = unit.unitTitle.match(/^(Unit\s+\d+)(?::\s*(.*))?$/i);
  const unitTag = match ? match[1] : `Unit ${unit.unitNumber}`;
  const cleanTitle = match && match[2] ? match[2] : unit.unitTitle;

  return (
    <div className="relative w-full my-6 sm:my-8 select-none">
      {/* Duolingo Section Header Banner: Split into 85% Unit Content & 15% Guidebook Interactive Block */}
      <div
        className={`rounded-2xl sm:rounded-3xl text-white ${theme.bg} ${theme.border} shadow-lg flex items-stretch overflow-hidden transition-all`}
      >
        {/* Part 1 (85%): Unit Badge, Title & Pedagogical Subtitle */}
        <div className="w-[85%] px-5 sm:px-6 lg:px-7 py-4 sm:py-5 flex flex-col justify-center space-y-1.5 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`inline-flex items-center px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase shadow-xs ${theme.badge}`}
            >
              {unitTag}
            </span>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-black font-display text-white leading-tight">
              {cleanTitle}
            </h2>
          </div>
          <p className={`text-xs sm:text-sm ${theme.subtitle} font-medium line-clamp-1`}>
            {unit.unitSubtitle}
          </p>
        </div>

        {/* Part 2 (15%): Integrated Guidebook Interactive Block */}
        <button
          type="button"
          onClick={() => setShowGuidebook(true)}
          className="w-[15%] min-w-[84px] sm:min-w-[110px] bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all flex flex-col items-center justify-center p-3 sm:p-3.5 text-white group cursor-pointer text-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          title={`Mở sổ tay hướng dẫn: ${cleanTitle}`}
        >
          <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[2.2] mb-1 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-[11px] sm:text-xs font-bold font-display uppercase tracking-wider whitespace-nowrap leading-none">
            HƯỚNG DẪN
          </span>
        </button>
      </div>

      {/* Guidebook Modal / Drawer */}
      {showGuidebook && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
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

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {unit.unitSubtitle}
            </p>

            {/* 1. Mục tiêu năng lực */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Mục tiêu năng lực:</span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4 font-sans">
                {unit.guidebookObjectives && unit.guidebookObjectives.length > 0 ? (
                  unit.guidebookObjectives.map((obj, idx) => (
                    <li key={`obj-${idx}`}>{obj}</li>
                  ))
                ) : (
                  <>
                    <li>Hoàn thành {unit.steps.length} chặng rèn luyện kỹ năng độc lập.</li>
                    <li>Đạt từ 70% trở lên ở Cột Mốc Tổng Hợp để mở khóa phần thưởng.</li>
                    <li>Duy trì chuỗi học tập liên tục để tăng điểm XP nhanh nhất.</li>
                  </>
                )}
              </ul>
            </div>

            {/* 2. Mẹo ngữ pháp / Quy tắc cốt lõi */}
            {unit.guidebookGrammarTip && (
              <div className="space-y-1.5 p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider font-mono">
                  <Lightbulb className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>Bí quyết ngữ pháp & phát âm:</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {unit.guidebookGrammarTip}
                </p>
              </div>
            )}

            {/* 3. Cụm từ then chốt (Key Phrases) */}
            {unit.guidebookKeyPhrases && unit.guidebookKeyPhrases.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                  <Languages className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                  <span>Cụm từ then chốt (Key Phrases):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {unit.guidebookKeyPhrases.map((item, idx) => (
                    <div
                      key={`phrase-${idx}`}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 text-xs space-y-0.5"
                    >
                      <p className="font-bold text-[#0059bb] dark:text-sky-400 font-display">
                        {item.phrase}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                        {item.translation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowGuidebook(false)}
              className="w-full h-10 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white font-bold text-xs font-display cursor-pointer transition-colors"
            >
              ĐÃ HIỂU
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
