"use client";
import React, { useMemo } from "react";
import { AppTopHeader, HeaderPillContainer, HeaderPillItem } from "@/shared/components/layout/AppTopHeader";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";
import { BarChart3, Trophy, Zap, Headphones, Mic, BookOpen, Wand2 } from "lucide-react";

export default function AnalyticsLoading() {
  const monthList = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const mName = `Thg ${d.getMonth() + 1}`;
      list.push({ name: mName, month: d.getMonth(), year: d.getFullYear() });
    }
    return list;
  }, []);

  const dates = ["26/7", "31/7", "5/8", "10/8", "Hôm nay", "17/8", "20/8", "24/8"];

  const renderWaveformSvgSkeleton = (title: string, themeColor: string, unit: string) => {
    const svgW = 700;
    const svgH = 210;
    const padLeft = 52;
    const padRight = 10;
    const padTop = 18;
    const ySteps = unit === "phút" ? [20, 15, 10, 5, 0] : [200, 150, 100, 50, 0];
    const yCoords = [padTop, 63, 108, 154, 200];

    return (
      <div className="flex-1 space-y-3 min-w-0">
        <div className="flex items-center justify-between">
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shadow-2xs" style={{ backgroundColor: themeColor }} />
            <span>{title}</span>
          </div>
          <ShimmerBox className="h-5 w-24 rounded-md" />
        </div>

        <div className="relative pt-1.5 pb-0 bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden shadow-2xs before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent before:z-10 before:pointer-events-none">
          <div className="w-full relative">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto overflow-visible select-none">
              {ySteps.map((step, sIdx) => {
                const y = yCoords[sIdx];
                const isBaseline = sIdx === 4;
                return (
                  <g key={sIdx}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={svgW - padRight}
                      y2={y}
                      stroke="currentColor"
                      className={
                        isBaseline
                          ? "text-slate-200/90 dark:text-slate-800"
                          : "text-slate-200/60 dark:text-slate-800"
                      }
                      strokeDasharray={isBaseline ? undefined : "3 3"}
                    />
                    <text
                      x="42"
                      y={y}
                      textAnchor="end"
                      dominantBaseline="central"
                      className="fill-slate-400/70 dark:fill-slate-500/70 font-mono text-[22px] sm:text-[17px] font-extrabold"
                    >
                      {step}{unit === "phút" ? "m" : ""}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div
            style={{ paddingLeft: "7.43%", paddingRight: "1.43%" }}
            className="grid grid-cols-8 text-center pt-0 pb-1.5 gap-0 border-t border-slate-100 dark:border-slate-800"
          >
            {dates.map((d, dIdx) => (
              <div key={dIdx} className="py-1 px-0.5">
                <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-400/80">
                  {d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      {/* 1. APP TOP HEADER (56px Baseline) MATCHING EXACT REAL HEADER */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb]/40 text-white/80 font-bold text-xs shadow-xs shrink-0 pointer-events-none">
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300/80" />
            <span>Luyện Tập Ngay +15 XP</span>
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={true}
            icon={<BarChart3 className="w-3.5 h-3.5 text-blue-500" />}
            label="Hoạt Động Của Tôi"
          />
          <HeaderPillItem
            active={false}
            icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
            label="Bảng Xếp Hạng XP"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* TOP 5 METRIC CARDS BENTO GRID 1:1 SKELETON */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {[
            { label: "Chuỗi dài nhất", bg: "bg-amber-50 dark:bg-amber-950/40", w: "w-14" },
            { label: "Vốn từ đã tích lũy", bg: "bg-emerald-50 dark:bg-emerald-950/40", w: "w-16" },
            { label: "Thời gian học", bg: "bg-blue-50 dark:bg-blue-950/40", w: "w-12" },
            { label: "Tổng điểm tích lũy", bg: "bg-purple-50 dark:bg-purple-950/40", w: "w-20" },
            { label: "Hạng của bạn", bg: "bg-amber-50 dark:bg-amber-950/40", w: "w-16" },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 ${
                idx === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className={`w-10 h-10 rounded-xl ${card.bg} shrink-0 shadow-2xs flex items-center justify-center`} />
              <div className="min-w-0 flex-1 space-y-1">
                <ShimmerBox className={`h-5 ${card.w} rounded-lg`} />
                <div className="text-[11px] text-slate-400 font-bold truncate">{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. SECTION 1: 6-MONTH HEATMAP MATRIX 1:1 SKELETON */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40">
                6 THÁNG
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                Ma trận hoạt động học tập
              </h3>
            </div>
            <ShimmerBox className="h-6 w-36 rounded-lg" />
          </div>

          <div className="relative w-full overflow-x-auto no-scrollbar pb-2">
            <div className="min-w-[540px] space-y-2">
              {/* Top Month Labels 1:1 match */}
              <div className="flex items-center pl-6 sm:pl-8 text-[10px] sm:text-[11px] font-bold text-slate-400 font-display">
                {monthList.map((m, mIdx) => (
                  <div key={mIdx} className="w-[52px] sm:w-[72px] text-center shrink-0">
                    {m.name}
                  </div>
                ))}
              </div>

              {/* Matrix Grid 1:1 match */}
              <div className="flex items-start gap-2.5 sm:gap-3.5">
                <div className="relative w-5 sm:w-6 pr-1 sm:pr-1.5 h-[84px] sm:h-[108px] shrink-0 text-[10px] font-bold text-slate-400 font-display">
                  <span className="absolute top-[8px] sm:top-[14px] left-0 leading-none">T2</span>
                  <span className="absolute top-[32px] sm:top-[46px] left-0 leading-none">T4</span>
                  <span className="absolute top-[56px] sm:top-[78px] left-0 leading-none">T6</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-3">
                  {monthList.map((_, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-1">
                      {Array.from({ length: 4 }).map((_, wInMonth) => (
                        <div key={wInMonth} className="flex flex-col gap-1">
                          {Array.from({ length: 7 }).map((_, dIdx) => (
                            <div
                              key={dIdx}
                              className="w-[10px] h-[10px] sm:w-3.5 sm:h-3.5 rounded-sm relative overflow-hidden bg-slate-100 dark:bg-slate-800/70 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/10 before:to-transparent"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Legend 1:1 match */}
              <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-400 pt-3 pl-6 sm:pl-8 border-t border-slate-100 dark:border-slate-800">
                <ShimmerBox className="h-3.5 w-60 rounded" />
                <div className="flex items-center gap-1.5 font-display shrink-0 text-xs">
                  <span>Ít</span>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800" />
                    <span className="w-3 h-3 rounded-sm bg-[#0059bb]/35 dark:bg-sky-600/40" />
                    <span className="w-3 h-3 rounded-sm bg-[#0059bb]/70 dark:bg-sky-500/70" />
                    <span className="w-3 h-3 rounded-sm bg-[#0059bb] dark:bg-sky-400" />
                  </div>
                  <span>Nhiều</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SECTION 2: 30-DAY PRACTICE WITH LINE CHARTS 1:1 SKELETON */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40">
                30 NGÀY
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                Phân tích thời lượng & XP theo kỹ năng
              </h3>
            </div>

            {/* Skill Selector Pill Strip */}
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1 overflow-x-auto max-w-full shrink-0">
              {[
                { label: "Dictation", icon: Headphones, active: true },
                { label: "Shadowing", icon: Mic, active: false },
                { label: "Nói (AI)", icon: Mic, active: false },
                { label: "Từ vựng", icon: BookOpen, active: false },
                { label: "Viết (AI)", icon: Wand2, active: false },
              ].map((pill, pIdx) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={pIdx}
                    className={`py-1.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 ${
                      pill.active
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700/60"
                        : "text-slate-500"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{pill.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
            {renderWaveformSvgSkeleton("Thời lượng luyện tập (Dictation)", "#0059bb", "phút")}
            {renderWaveformSvgSkeleton("Điểm XP tích lũy (Dictation)", "#10b981", "XP")}
          </div>
        </div>

      </div>
    </div>
  );
}
