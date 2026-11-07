"use client";
import React from "react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";
import {
  CHART_HEIGHT,
  CHART_PAD_LEFT,
  CHART_PAD_RIGHT,
  CHART_Y_COORDS,
  useChartWidth,
} from "../../utils/chartGeometry";

interface WaveformChartSkeletonProps {
  title: string;
  themeColor: string;
  unit: string;
  dates?: string[];
}

const DEFAULT_DATES = ["26/7", "31/7", "5/8", "10/8", "Hôm nay", "17/8", "20/8", "24/8"];

export const WaveformChartSkeleton: React.FC<WaveformChartSkeletonProps> = ({
  title,
  themeColor,
  unit,
  dates = DEFAULT_DATES,
}) => {
  const { ref, width: svgW } = useChartWidth();
  const ySteps = unit === "phút" ? [25, 20, 15, 10, 5, 0] : [250, 200, 150, 100, 50, 0];

  return (
    <div className="flex-1 space-y-3 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }} />
          <span>{title}</span>
        </div>
        <ShimmerBox className="h-6 w-28 rounded-lg" />
      </div>

      <div className="relative bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent before:z-10 before:pointer-events-none">
        <div ref={ref} className="w-full relative" style={{ height: CHART_HEIGHT }}>
          <svg
            viewBox={`0 0 ${svgW} ${CHART_HEIGHT}`}
            width="100%"
            height={CHART_HEIGHT}
            className="block select-none"
            aria-hidden="true"
          >
            {ySteps.map((step, sIdx) => {
              const y = CHART_Y_COORDS[sIdx];
              const isBaseline = sIdx === 5;
              return (
                <g key={sIdx}>
                  <line
                    x1={CHART_PAD_LEFT}
                    y1={y}
                    x2={svgW - CHART_PAD_RIGHT}
                    y2={y}
                    stroke="currentColor"
                    className={
                      isBaseline
                        ? "text-slate-200 dark:text-slate-800"
                        : "text-slate-200/70 dark:text-slate-800"
                    }
                    strokeDasharray={isBaseline ? undefined : "3 3"}
                  />
                  <text
                    x={CHART_PAD_LEFT - 8}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="central"
                    fontSize={12}
                    className="fill-slate-400/70 dark:fill-slate-500/70 font-sans font-bold tabular-nums"
                  >
                    {step}
                    {unit === "phút" ? "m" : ""}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div
          style={{ paddingLeft: CHART_PAD_LEFT, paddingRight: CHART_PAD_RIGHT }}
          className="grid grid-cols-8 text-center gap-0 border-t border-slate-100 dark:border-slate-800"
        >
          {dates.map((d, dIdx) => {
            const isToday = d === "Hôm nay" || dIdx === 4;
            return (
              <div
                key={dIdx}
                className="py-2 px-0 text-xs font-sans tabular-nums font-bold leading-tight whitespace-nowrap border-b-2 border-transparent text-slate-400/80"
              >
                {isToday ? (
                  <>
                    <span className="sm:hidden">Nay</span>
                    <span className="hidden sm:inline">Hôm nay</span>
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">{d.split("/")[0]}</span>
                    <span className="hidden sm:inline">{d}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
