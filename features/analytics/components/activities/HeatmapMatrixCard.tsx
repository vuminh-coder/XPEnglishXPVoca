"use client";
import React from "react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

interface HeatmapTileData {
  dateStr: string;
  count: number;
  intensity: number;
  isoDate?: string;
}

interface HeatmapMatrixCardProps {
  isLoading: boolean;
  totalActivities: number;
  monthList: { name: string; startIndex: number }[];
  heatmapWeeks: HeatmapTileData[][];
  hoveredHeatmapTile: { dateStr: string; count: number } | null;
  onHoverTile: (tile: { dateStr: string; count: number } | null) => void;
}

const WEEKDAY_SHORT = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const WEEKS_PER_MONTH = 4;
const DAYS_PER_WEEK = 7;
const ROW_HEIGHT = "h-3 sm:h-4 lg:h-[18px]";

const TILE_COLORS = [
  "bg-slate-100 dark:bg-slate-800/70",
  "bg-[#0059bb]/35 dark:bg-sky-600/40",
  "bg-[#0059bb]/70 dark:bg-sky-500/70",
  "bg-[#0059bb] dark:bg-sky-400",
];

const LegendScale = () => (
  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 font-display shrink-0">
    <span>Ít</span>
    <div className="flex items-center gap-1">
      {TILE_COLORS.map((c) => (
        <span key={c} className={`w-3 h-3 rounded-[3px] ${c}`} />
      ))}
    </div>
    <span>Nhiều</span>
  </div>
);

export const HeatmapMatrixCard: React.FC<HeatmapMatrixCardProps> = ({
  isLoading,
  totalActivities,
  monthList,
  heatmapWeeks,
  hoveredHeatmapTile,
  onHoverTile,
}) => {
  // Nhãn thứ lấy theo ngày thật của hàng đầu tiên (mỗi tuần bắt đầu từ cùng một thứ)
  const rowLabels = Array.from({ length: DAYS_PER_WEEK }, (_, r) => {
    if (r % 2 === 0) return "";
    const iso = heatmapWeeks[0]?.[r]?.isoDate;
    return iso ? WEEKDAY_SHORT[new Date(`${iso}T00:00:00`).getDay()] : "";
  });

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 whitespace-nowrap">
            6 THÁNG
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
            Ma trận hoạt động học tập
          </h3>
        </div>

        {isLoading ? (
          <ShimmerBox className="h-7 w-36 rounded-lg" />
        ) : (
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold tabular-nums border bg-blue-50/80 dark:bg-blue-950/50 border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400 whitespace-nowrap">
            Tổng: {totalActivities} hoạt động
          </span>
        )}
      </div>

      {/* Lưới tự giãn theo bề rộng thẻ: 6 nhóm tháng × 4 tuần × 7 ngày, không còn khoảng trống bên phải */}
      <div className="grid grid-cols-[2rem_repeat(6,minmax(0,1fr))] gap-x-2 sm:gap-x-3 gap-y-2">
        <span aria-hidden="true" />
        {monthList.map((m, mIdx) => (
          <div
            key={mIdx}
            className="text-xs font-bold text-slate-500 dark:text-slate-400 font-display whitespace-nowrap"
          >
            {m.name}
          </div>
        ))}

        <div className="grid grid-rows-7 gap-[3px]" aria-hidden="true">
          {rowLabels.map((label, r) => (
            <span
              key={r}
              className={`${ROW_HEIGHT} flex items-center text-xs leading-none font-bold text-slate-500 dark:text-slate-400 font-display`}
            >
              {isLoading ? "" : label}
            </span>
          ))}
        </div>

        {monthList.map((_, mIdx) => (
          <div key={mIdx} className="grid grid-cols-4 gap-[3px]">
            {Array.from({ length: WEEKS_PER_MONTH }).map((_, wInMonth) => {
              const weekTiles = heatmapWeeks[mIdx * WEEKS_PER_MONTH + wInMonth] || [];
              return (
                <div key={wInMonth} className="grid grid-rows-7 gap-[3px]">
                  {Array.from({ length: DAYS_PER_WEEK }).map((_, dIdx) => {
                    const tile = weekTiles[dIdx];

                    if (isLoading || !tile) {
                      return (
                        <div
                          key={dIdx}
                          className={`w-full ${ROW_HEIGHT} rounded-[4px] relative overflow-hidden ${TILE_COLORS[0]} ${
                            isLoading
                              ? "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/10 before:to-transparent"
                              : ""
                          }`}
                        />
                      );
                    }

                    return (
                      <button
                        key={dIdx}
                        type="button"
                        aria-label={`${tile.dateStr}: ${tile.count} hoạt động`}
                        onMouseEnter={() => onHoverTile({ dateStr: tile.dateStr, count: tile.count })}
                        onMouseLeave={() => onHoverTile(null)}
                        onFocus={() => onHoverTile({ dateStr: tile.dateStr, count: tile.count })}
                        onBlur={() => onHoverTile(null)}
                        onClick={() => onHoverTile({ dateStr: tile.dateStr, count: tile.count })}
                        className={`w-full ${ROW_HEIGHT} rounded-[4px] cursor-pointer transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#0059bb] ${
                          TILE_COLORS[Math.min(3, Math.max(0, tile.intensity))]
                        }`}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        {isLoading ? (
          <ShimmerBox className="h-4 w-56 rounded" />
        ) : (
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
            {hoveredHeatmapTile
              ? `${hoveredHeatmapTile.dateStr}: ${hoveredHeatmapTile.count} hoạt động hoàn thành`
              : "Chạm hoặc rê chuột vào một ô để xem chi tiết từng ngày"}
          </span>
        )}
        <LegendScale />
      </div>
    </div>
  );
};
