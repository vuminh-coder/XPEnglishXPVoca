"use client";
import React from "react";
import {
  CHART_BASELINE_Y,
  CHART_HEIGHT,
  CHART_PAD_LEFT,
  CHART_PAD_RIGHT,
  CHART_Y_COORDS,
  useChartWidth,
} from "../../utils/chartGeometry";

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
  const { ref, width: svgW } = useChartWidth();
  const padLeft = CHART_PAD_LEFT;
  const padRight = CHART_PAD_RIGHT;
  const baselineY = CHART_BASELINE_Y;
  const padTop = CHART_Y_COORDS[0];

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

  const colWidth = (svgW - padLeft - padRight) / Math.max(values.length, 1);
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
    const midX = p0.x + (p1.x - p0.x) / 2;
    pathD += ` C ${midX},${p0.y} ${midX},${p1.y} ${p1.x},${p1.y}`;
  }

  const areaD = `${pathD} L ${svgW - padRight},${baselineY} L ${padLeft},${baselineY} Z`;

  const activeIdx =
    selectedDayIndex !== null && selectedDayIndex < points.length ? selectedDayIndex : 4;
  const activePoint = points[activeIdx] || points[0];

  return (
    <div className="flex-1 space-y-3 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }} />
          <span>{title}</span>
        </div>

        <span
          className="px-2.5 py-0.5 rounded-lg font-bold text-xs tabular-nums border whitespace-nowrap"
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

      {/* Khung biểu đồ: chiều cao cố định => 0 CLS giữa skeleton và dữ liệu thật */}
      <div className="relative bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden">
        <div ref={ref} className="w-full relative" style={{ height: CHART_HEIGHT }}>
          <svg
            viewBox={`0 0 ${svgW} ${CHART_HEIGHT}`}
            width="100%"
            height={CHART_HEIGHT}
            className="block select-none"
            role="img"
            aria-label={title}
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={themeColor} stopOpacity="0.25" />
                <stop offset="60%" stopColor={themeColor} stopOpacity="0.08" />
                <stop offset="100%" stopColor={themeColor} stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {ySteps.map((step, sIdx) => {
              const y = CHART_Y_COORDS[sIdx];
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
                        ? "text-slate-200 dark:text-slate-800"
                        : "text-slate-200/70 dark:text-slate-800"
                    }
                    strokeDasharray={isBaseline ? undefined : "3 3"}
                  />
                  <text
                    x={padLeft - 8}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="central"
                    fontSize={12}
                    className="fill-slate-500 dark:fill-slate-400 font-sans font-bold tabular-nums"
                  >
                    {step}
                    {unit === "phút" ? "m" : ""}
                  </text>
                </g>
              );
            })}

            <path d={areaD} fill={`url(#${gradientId})`} className="transition-all duration-300" />

            <path
              d={pathD}
              fill="none"
              stroke={themeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300"
            />

            {activePoint && (
              <g>
                <circle cx={activePoint.x} cy={activePoint.y} r={4} fill="#fff" stroke={themeColor} strokeWidth={2} />
                <text
                  x={activePoint.x}
                  y={Math.max(16, activePoint.y - 12)}
                  textAnchor="middle"
                  fill={themeColor}
                  fontSize={13}
                  className="font-sans font-extrabold tabular-nums select-none pointer-events-none"
                >
                  {activePoint.val} {unit}
                </text>
              </g>
            )}

            {points.map((_, idx) => (
              <rect
                key={`col-hitbox-${idx}`}
                x={padLeft + idx * colWidth}
                y="0"
                width={colWidth}
                height={CHART_HEIGHT}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onSelectDayIndex(idx)}
              />
            ))}
          </svg>
        </div>

        {/* Cột ngày: căn đúng theo pixel với từng cột dữ liệu, cho phép xuống dòng thay vì cắt chữ */}
        <div
          style={{ paddingLeft: padLeft, paddingRight: padRight }}
          className="grid grid-cols-8 text-center gap-0 border-t border-slate-100 dark:border-slate-800"
        >
          {dates.map((dateLabel, i) => {
            const isSelected = activeIdx === i;
            const isToday = dateLabel === "Hôm nay" || i === 4;

            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelectDayIndex(i)}
                aria-pressed={isSelected}
                title={isToday ? "Hôm nay" : dateLabel}
                aria-label={isToday ? "Hôm nay" : `Ngày ${dateLabel}`}
                className={`py-2 px-0 text-center transition-colors cursor-pointer text-xs font-sans tabular-nums leading-tight whitespace-nowrap border-b-2 ${
                  isSelected
                    ? isToday
                      ? "text-amber-600 dark:text-amber-400 font-extrabold border-amber-500 bg-amber-50/60 dark:bg-amber-950/30"
                      : "text-[#0059bb] dark:text-sky-400 font-extrabold border-[#0059bb] dark:border-sky-400 bg-blue-50/60 dark:bg-blue-950/30"
                    : isToday
                    ? "text-amber-600 dark:text-amber-400 font-extrabold border-transparent hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold border-transparent hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
                }`}
              >
                {isToday ? (
                  <>
                    <span className="sm:hidden">Nay</span>
                    <span className="hidden sm:inline">Hôm nay</span>
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">{dateLabel.split("/")[0]}</span>
                    <span className="hidden sm:inline">{dateLabel}</span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
