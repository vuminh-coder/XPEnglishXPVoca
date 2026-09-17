"use client";
import React from "react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

interface WaveformChartSkeletonProps {
  title: string;
  themeColor: string;
  unit: string;
  dates?: string[];
}

export const WaveformChartSkeleton: React.FC<WaveformChartSkeletonProps> = ({
  title,
  themeColor,
  unit,
  dates = ["26/7", "31/7", "5/8", "10/8", "Hôm nay", "17/8", "20/8", "24/8"],
}) => {
  const svgW = 700;
  const svgH = 254;
  const padLeft = 52;
  const padRight = 10;
  const padTop = 24;
  const ySteps = unit === "phút" ? [25, 20, 15, 10, 5, 0] : [250, 200, 150, 100, 50, 0];
  const yCoords = [24, 68, 112, 156, 200, 244];

  return (
    <div className="flex-1 space-y-3 min-w-0">
      <div className="flex items-center justify-between">
        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shadow-2xs" style={{ backgroundColor: themeColor }} />
          <span>{title}</span>
        </div>
        <ShimmerBox className="h-5 w-24 rounded-md" />
      </div>

      {/* Clean High-DPI Coordinate Canvas with Shimmer Sweep and No Fake Demo Lines */}
      <div className="relative pt-1.5 pb-0 bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden shadow-2xs before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent before:z-10 before:pointer-events-none">
        <div className="w-full relative">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto overflow-visible select-none">
            {/* 6 Horizontal Grid Lines & Y-Axis Labels matching Real Chart */}
            {ySteps.map((step, sIdx) => {
              const y = yCoords[sIdx];
              const isBaseline = sIdx === 5;
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
                    {step}
                    {unit === "phút" ? "m" : ""}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Interactive Date Column Buttons matching Real Chart */}
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
