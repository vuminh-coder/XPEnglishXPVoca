"use client";
import React from "react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

interface HeatmapTileData {
  dateStr: string;
  count: number;
  intensity: number;
}

interface HeatmapMatrixCardProps {
  isLoading: boolean;
  totalActivities: number;
  monthList: { name: string; startIndex: number }[];
  heatmapWeeks: HeatmapTileData[][];
  hoveredHeatmapTile: { dateStr: string; count: number } | null;
  onHoverTile: (tile: { dateStr: string; count: number } | null) => void;
}

export const HeatmapMatrixCard: React.FC<HeatmapMatrixCardProps> = ({
  isLoading,
  totalActivities,
  monthList,
  heatmapWeeks,
  hoveredHeatmapTile,
  onHoverTile,
}) => {
  return (
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

        <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono shadow-2xs border bg-blue-50/80 dark:bg-blue-950/50 border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400">
          Tổng: {totalActivities} hoạt động
        </span>
      </div>

      {isLoading ? (
        <div className="relative w-full overflow-x-auto no-scrollbar pb-2">
          <div className="min-w-[540px] space-y-2">
            {/* 1. EXACT MONTH LABELS */}
            <div className="flex items-center pl-6 sm:pl-8 text-[10px] sm:text-[11px] font-bold text-slate-400 font-display">
              {monthList.map((m, mIdx) => (
                <div key={mIdx} className="w-[52px] sm:w-[72px] text-center shrink-0">
                  {m.name}
                </div>
              ))}
            </div>

            {/* 2. EXACT MATRIX GRID WITH VERTICAL DAY LABELS */}
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

            {/* 3. EXACT FOOTER LEGEND */}
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
      ) : (
        <div className="relative w-full overflow-x-auto no-scrollbar pb-2">
          <div className="min-w-[540px] space-y-2">
            {/* TOP MONTH LABELS */}
            <div className="flex items-center pl-6 sm:pl-8 text-[10px] sm:text-[11px] font-bold text-slate-400 font-display">
              {monthList.map((m, mIdx) => (
                <div key={mIdx} className="w-[52px] sm:w-[72px] text-center shrink-0">
                  {m.name}
                </div>
              ))}
            </div>

            {/* MATRIX GRID WITH VERTICAL DAY LABELS */}
            <div className="flex items-start gap-2.5 sm:gap-3.5">
              <div className="relative w-5 sm:w-6 pr-1 sm:pr-1.5 h-[84px] sm:h-[108px] shrink-0 text-[10px] font-bold text-slate-400 font-display">
                <span className="absolute top-[8px] sm:top-[14px] left-0 leading-none">T2</span>
                <span className="absolute top-[32px] sm:top-[46px] left-0 leading-none">T4</span>
                <span className="absolute top-[56px] sm:top-[78px] left-0 leading-none">T6</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-3">
                {monthList.map((mGroup, mIdx) => (
                  <div key={mIdx} className="flex items-center gap-1">
                    {Array.from({ length: 4 }).map((_, wInMonth) => {
                      const globalWeekIdx = mIdx * 4 + wInMonth;
                      const weekTiles = heatmapWeeks[globalWeekIdx] || [];

                      return (
                        <div key={wInMonth} className="flex flex-col gap-1">
                          {weekTiles.map((tile, dIdx) => {
                            const tileBg =
                              tile.intensity === 3
                                ? "bg-[#0059bb] dark:bg-sky-400"
                                : tile.intensity === 2
                                ? "bg-[#0059bb]/70 dark:bg-sky-500/70"
                                : tile.intensity === 1
                                ? "bg-[#0059bb]/35 dark:bg-sky-600/40"
                                : "bg-slate-100 dark:bg-slate-800/70";

                            return (
                              <div
                                key={dIdx}
                                onMouseEnter={() => onHoverTile({ dateStr: tile.dateStr, count: tile.count })}
                                onMouseLeave={() => onHoverTile(null)}
                                className={`w-[10px] h-[10px] sm:w-3.5 sm:h-3.5 rounded-sm cursor-pointer transition-all hover:scale-125 ${tileBg}`}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER LEGEND & DYNAMIC TOOLTIP */}
            <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 pt-3 pl-6 sm:pl-8 border-t border-slate-100 dark:border-slate-800">
              <span className="font-mono text-xs truncate">
                {hoveredHeatmapTile
                  ? `${hoveredHeatmapTile.dateStr}: ${hoveredHeatmapTile.count} hoạt động hoàn thành`
                  : `${totalActivities} hoạt động đã hoàn thành trong 6 tháng qua`}
              </span>

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
      )}
    </div>
  );
};
