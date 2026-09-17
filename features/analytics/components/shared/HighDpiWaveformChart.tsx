"use client";
import React from "react";

interface HighDpiWaveformChartProps {
  title: string;
  values: number[];
  chartType: "MINUTES" | "XP";
  themeColor: string;
  gradientId: string;
  unit: string;
  dates: string[];
  selectedDayIndex: number | null;
  onSelectDayIndex: (idx: number) => void;
}

export const HighDpiWaveformChart: React.FC<HighDpiWaveformChartProps> = ({
  title,
  values,
  chartType,
  themeColor,
  gradientId,
  unit,
  dates,
  selectedDayIndex,
  onSelectDayIndex,
}) => {
  const svgW = 700;
  const svgH = 254;
  const padLeft = 52;
  const padRight = 10;
  const padTop = 24;
  const baselineY = 244;

  const maxDataVal = Math.max(...values, 0);
  const defaultMax = chartType === "XP" ? 15 : 5;
  const dynamicMax = maxDataVal > defaultMax ? Math.ceil(maxDataVal / 5) * 5 : defaultMax;

  const ySteps = [
    dynamicMax,
    Math.round(dynamicMax * 0.8),
    Math.round(dynamicMax * 0.6),
    Math.round(dynamicMax * 0.4),
    Math.round(dynamicMax * 0.2),
    0,
  ];

  const yCoords = [24, 68, 112, 156, 200, 244];

  const colWidth = (svgW - padLeft - padRight) / values.length;
  const points = values.map((val, idx) => {
    const x = padLeft + (idx + 0.5) * colWidth;
    const clampedVal = Math.max(0, Math.min(val, dynamicMax));
    const ratio = dynamicMax > 0 ? clampedVal / dynamicMax : 0;
    const y = baselineY - ratio * (baselineY - padTop);
    return { x, y, val, date: dates[idx] || "" };
  });

  const fullCurvePoints = [
    { x: padLeft, y: points[0]?.y ?? baselineY },
    ...points,
    { x: svgW - padRight, y: points[points.length - 1]?.y ?? baselineY },
  ];

  let pathD = `M ${fullCurvePoints[0].x},${fullCurvePoints[0].y}`;
  for (let i = 0; i < fullCurvePoints.length - 1; i++) {
    const p0 = fullCurvePoints[i];
    const p1 = fullCurvePoints[i + 1];
    const cp1x = p0.x + (p1.x - p0.x) / 2;
    const cp1y = p0.y;
    const cp2x = p0.x + (p1.x - p0.x) / 2;
    const cp2y = p1.y;
    pathD += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
  }

  const areaD = `${pathD} L ${svgW - padRight},${baselineY} L ${padLeft},${baselineY} Z`;

  const activeIdx = selectedDayIndex !== null && selectedDayIndex < points.length ? selectedDayIndex : 4;
  const activePoint = points[activeIdx] || points[0];

  return (
    <div className="flex-1 space-y-3 min-w-0">
      <div className="flex items-center justify-between">
        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shadow-2xs" style={{ backgroundColor: themeColor }} />
          <span>{title}</span>
        </div>

        <span
          className="px-2.5 py-0.5 rounded-md font-mono font-bold text-xs shadow-2xs border"
          style={{
            backgroundColor: `${themeColor}15`,
            borderColor: `${themeColor}35`,
            color: themeColor,
          }}
        >
          {activePoint
            ? `${activePoint.date}: ${activePoint.val} ${unit}`
            : `${values.reduce((a, b) => a + b, 0)} ${unit}`}
        </span>
      </div>

      {/* High-DPI Waveform Canvas */}
      <div className="relative pt-1.5 pb-0 bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden shadow-2xs">
        <div className="w-full relative">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto overflow-visible select-none">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={themeColor} stopOpacity="0.25" />
                <stop offset="60%" stopColor={themeColor} stopOpacity="0.08" />
                <stop offset="100%" stopColor={themeColor} stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* 6 Horizontal Grid Lines & Y-Axis Labels matching Dashboard */}
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
                    className="fill-slate-500 dark:fill-slate-400 font-mono text-[22px] sm:text-[17px] font-extrabold"
                  >
                    {step}
                    {unit === "phút" ? "m" : ""}
                  </text>
                </g>
              );
            })}

            {/* Gradient Area Fill */}
            <path d={areaD} fill={`url(#${gradientId})`} className="transition-all duration-300" />

            {/* Smooth Bezier Line (1.8px) */}
            <path
              d={pathD}
              fill="none"
              stroke={themeColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300"
            />

            {/* Floating Text trực tiếp trên biểu đồ cách dọc 12px */}
            {activePoint && (
              <text
                x={activePoint.x}
                y={Math.max(18, activePoint.y - 12)}
                textAnchor="middle"
                fill={themeColor}
                className="font-mono text-[21px] sm:text-[16px] font-black tracking-tight select-none pointer-events-none"
              >
                {activePoint.val} {unit}
              </text>
            )}

            {/* Invisible Column Hitboxes for Click & Touch */}
            {points.map((p, idx) => (
              <rect
                key={`col-hitbox-${idx}`}
                x={padLeft + idx * colWidth}
                y="0"
                width={colWidth}
                height={svgH}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onSelectDayIndex(idx)}
              />
            ))}
          </svg>
        </div>

        {/* Interactive Date Column Buttons */}
        <div
          style={{ paddingLeft: "7.43%", paddingRight: "1.43%" }}
          className="grid grid-cols-8 text-center pt-0 pb-1.5 gap-0 border-t border-slate-100 dark:border-slate-800"
        >
          {dates.map((dateLabel, i) => {
            const isSelected = activeIdx === i;
            const isToday = dateLabel === "Hôm nay" || i === 4;

            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelectDayIndex(i)}
                className={`py-1.5 px-0.5 rounded-t-lg text-center transition-all cursor-pointer font-mono text-[10.5px] sm:text-xs ${
                  isSelected
                    ? isToday
                      ? "text-amber-600 dark:text-amber-400 font-black border-b-2 border-amber-500 bg-amber-50/60 dark:bg-amber-950/30"
                      : "text-[#0059bb] dark:text-sky-400 font-black border-b-2 border-[#0059bb] dark:border-sky-400 bg-blue-50/60 dark:bg-blue-950/30"
                    : isToday
                    ? "text-amber-600 dark:text-amber-400 font-black border-b-2 border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold border-b-2 border-transparent"
                }`}
              >
                <span className="leading-tight block font-extrabold truncate">
                  {dateLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
