"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  Mic,
  BookOpen,
  Wand2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";
import { SKILL_CONFIGS, SkillType } from "@/stores/skillChartStore";

const SpeakingIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 15a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
    <circle cx="9" cy="7" r="3" />
    <path d="M17 9a3 3 0 0 1 0 6" />
    <path d="M20 7a6 6 0 0 1 0 10" />
  </svg>
);

const SKILL_TAB_CONFIGS = [
  { id: "dictation", label: "Dictation", Icon: Headphones },
  { id: "shadowing", label: "Shadowing", Icon: Mic },
  { id: "speaking", label: "Nói (AI)", Icon: SpeakingIcon },
  { id: "vocab", label: "Từ vựng", Icon: BookOpen },
  { id: "writing", label: "Viết (AI)", Icon: Wand2 },
] as const;

export type SkillTabId = (typeof SKILL_TAB_CONFIGS)[number]["id"];

/**
 * Custom hook to smoothly interpolate 7 Y-coordinates for continuous Bezier path morphing
 */
function useInterpolatedYPoints(targetYPoints: number[], duration = 320) {
  const [currentYPoints, setCurrentYPoints] = useState<number[]>(targetYPoints);
  const startYRef = useRef<number[]>(targetYPoints);
  const startTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    startYRef.current =
      currentYPoints.length === targetYPoints.length
        ? [...currentYPoints]
        : [...targetYPoints];
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);

      const nextY = startYRef.current.map((startVal, idx) => {
        const targetVal = targetYPoints[idx] ?? startVal;
        return startVal + (targetVal - startVal) * ease;
      });

      setCurrentYPoints(nextY);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetYPoints.join(",")]);

  return currentYPoints;
}

interface DashboardSkillChartCardProps {
  activeSkillTab: SkillTabId | SkillType;
  setActiveSkillTab: (tab: any) => void;
  selectedDayIndex: number | null;
  setSelectedDayIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isLoadingChart: boolean;
  skillWeeklyChartData: { day: string; minutes: number }[];
  currentSkillConfig?: { color: string; gradientId: string; label: string };
  maxSkillMinutes?: number;
  totalSkillMinutes?: number;
  skillTotalMinutes?: number;
  bestDayMinutes?: number;
  targetYPoints?: number[];
}

export function DashboardSkillChartCard({
  activeSkillTab,
  setActiveSkillTab,
  selectedDayIndex,
  setSelectedDayIndex,
  isLoadingChart,
  skillWeeklyChartData,
  currentSkillConfig: propSkillConfig,
  maxSkillMinutes: propMaxMinutes,
  totalSkillMinutes: propTotalMinutes,
  skillTotalMinutes,
  bestDayMinutes: propBestDay,
  targetYPoints: propTargetYPoints,
}: DashboardSkillChartCardProps) {
  const currentSkillConfig = propSkillConfig || SKILL_CONFIGS[activeSkillTab as SkillType] || {
    color: "#0059bb",
    gradientId: "blueGrad",
    label: "Kỹ năng",
  };
  const totalSkillMinutes =
    propTotalMinutes ??
    skillTotalMinutes ??
    skillWeeklyChartData.reduce((acc, curr) => acc + curr.minutes, 0);
  const rawMax = Math.max(...skillWeeklyChartData.map((d) => d.minutes), 0);
  const maxSkillMinutes =
    propMaxMinutes ?? Math.max(60, Math.ceil(rawMax / 15) * 15);
  const bestDayMinutes = propBestDay ?? rawMax;

  // Compute raw target Y coordinates
  const targetYPoints =
    propTargetYPoints ||
    skillWeeklyChartData.map((d) => {
      const ratio = Math.min(1, Math.max(0, d.minutes) / maxSkillMinutes);
      return 200 - ratio * 176;
    });

  const animatedYPoints = useInterpolatedYPoints(targetYPoints, 320);

  return (
    <div
      suppressHydrationWarning
      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-4"
    >
      {/* Upper Header: Title & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shadow-2xs shrink-0">
            <TrendingUp className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
              Thời Lượng Luyện Kỹ Năng Tuần Này
            </h3>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Tổng 7 ngày:{" "}
              <span
                suppressHydrationWarning
                className="font-bold text-[#0059bb] dark:text-sky-400 font-mono"
              >
                {totalSkillMinutes} phút
              </span>
            </span>
          </div>
        </div>

        {/* Dynamic Metric Badges with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkillTab}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span
              suppressHydrationWarning
              className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono border shadow-2xs"
              style={{
                backgroundColor: `${currentSkillConfig.color}15`,
                color: currentSkillConfig.color,
                borderColor: `${currentSkillConfig.color}35`,
              }}
            >
              {currentSkillConfig.label}: {totalSkillMinutes}m
            </span>
            <span
              suppressHydrationWarning
              className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px] font-bold border border-slate-200/80 dark:border-slate-700/60 shadow-2xs"
            >
              Đỉnh: {bestDayMinutes}m
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 5-Skill Segmented Tab Switcher with Spring LayoutId */}
      <div
        role="tablist"
        className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar select-none"
      >
        {SKILL_TAB_CONFIGS.map((tab) => {
          const isActive = activeSkillTab === tab.id;
          const Icon = tab.Icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              onClick={() => setActiveSkillTab(tab.id)}
              className={`relative flex-1 py-1.5 px-1.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 sm:gap-1.5 z-10 select-none ${
                isActive
                  ? "text-slate-900 dark:text-white shadow-2xs font-extrabold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSkillTabIndicator"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg -z-10 shadow-xs border border-slate-200/60 dark:border-slate-700/60"
                />
              )}
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive SVG Chart Waveform Canvas / 1:1 Shimmer Skeleton */}
      {isLoadingChart ? (
        <div className="relative pt-1.5 pb-0 bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden shadow-2xs before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent before:z-10 before:pointer-events-none">
          <div className="w-full relative">
            <svg
              viewBox="0 0 700 210"
              className="w-full h-auto overflow-visible select-none"
            >
              {[24, 68, 112, 156, 200].map((y, sIdx) => {
                const isBaseline = sIdx === 4;
                const yLabels = ["60m", "45m", "30m", "15m", "0m"];
                return (
                  <g key={sIdx}>
                    <line
                      x1="52"
                      y1={y}
                      x2="690"
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
                      {yLabels[sIdx]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* 7 Interactive Day Column Buttons Skeleton */}
          <div
            style={{ paddingLeft: "7.43%", paddingRight: "1.43%" }}
            className="grid grid-cols-7 text-center pt-0 pb-1.5 gap-0 border-t border-slate-100 dark:border-slate-800"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div key={day} className="py-1.5 px-0.5">
                <ShimmerBox className="h-3.5 w-9 mx-auto rounded" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative pt-1.5 pb-0 bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden">
          <div className="w-full relative">
            <svg
              viewBox="0 0 700 210"
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                <linearGradient
                  id={currentSkillConfig.gradientId}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={currentSkillConfig.color}
                    stopOpacity="0.25"
                  />
                  <stop
                    offset="60%"
                    stopColor={currentSkillConfig.color}
                    stopOpacity="0.08"
                  />
                  <stop
                    offset="100%"
                    stopColor={currentSkillConfig.color}
                    stopOpacity="0.00"
                  />
                </linearGradient>
              </defs>

              {/* Grid Lines (5 Steps) */}
              {[
                { y: 24, label: `${maxSkillMinutes}m` },
                { y: 68, label: `${Math.round(maxSkillMinutes * 0.75)}m` },
                { y: 112, label: `${Math.round(maxSkillMinutes * 0.5)}m` },
                { y: 156, label: `${Math.round(maxSkillMinutes * 0.25)}m` },
                { y: 200, label: "0m", isBaseline: true },
              ].map((step, sIdx) => (
                <g key={sIdx}>
                  <line
                    x1="52"
                    y1={step.y}
                    x2="690"
                    y2={step.y}
                    stroke="currentColor"
                    className={
                      step.isBaseline
                        ? "text-slate-200/90 dark:text-slate-800"
                        : "text-slate-200/60 dark:text-slate-800"
                    }
                    strokeDasharray={step.isBaseline ? undefined : "3 3"}
                  />
                  <text
                    x="42"
                    y={step.y}
                    textAnchor="end"
                    dominantBaseline="central"
                    className="fill-slate-500 dark:fill-slate-400 font-mono text-[22px] sm:text-[17px] font-extrabold"
                  >
                    {step.label}
                  </text>
                </g>
              ))}

              {(() => {
                const colWidth = 638 / 7;
                const animatedPoints = skillWeeklyChartData.map((d, i) => {
                  const x = 52 + (i + 0.5) * colWidth;
                  const y =
                    animatedYPoints[i] ??
                    200 - (Math.min(1, Math.max(0, d.minutes) / maxSkillMinutes) * 176);
                  return { x, y, day: d.day, minutes: d.minutes };
                });

                const fullCurvePoints = [
                  { x: 52, y: animatedPoints[0].y },
                  ...animatedPoints,
                  { x: 690, y: animatedPoints[6].y },
                ];

                let pathD = `M 52,${animatedPoints[0].y}`;
                for (let i = 0; i < fullCurvePoints.length - 1; i++) {
                  const p0 = fullCurvePoints[i];
                  const p1 = fullCurvePoints[i + 1];
                  const cp1x = p0.x + (p1.x - p0.x) / 2;
                  const cp1y = p0.y;
                  const cp2x = p0.x + (p1.x - p0.x) / 2;
                  const cp2y = p1.y;
                  pathD += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
                }

                const areaD = `${pathD} L 690,200 L 52,200 Z`;
                const activeIndex = selectedDayIndex !== null ? selectedDayIndex : 4;
                const selPoint = animatedPoints[activeIndex];

                return (
                  <g>
                    {/* Gradient Area Fill */}
                    <path
                      d={areaD}
                      fill={`url(#${currentSkillConfig.gradientId})`}
                      className="transition-colors duration-300"
                    />

                    {/* Smooth Bezier Line (1.8px) */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={currentSkillConfig.color}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-colors duration-300"
                    />

                    {/* Floating Value Indicator on active point */}
                    {selPoint && (
                      <text
                        suppressHydrationWarning
                        x={selPoint.x}
                        y={Math.max(18, selPoint.y - 12)}
                        textAnchor="middle"
                        fill={currentSkillConfig.color}
                        className="font-mono text-[21px] sm:text-[16px] font-black tracking-tight select-none pointer-events-none"
                      >
                        {selPoint.minutes} phút
                      </text>
                    )}

                    {/* Column Hitboxes for touch / click */}
                    {animatedPoints.map((p, idx) => (
                      <rect
                        key={`col-hitbox-${idx}`}
                        x={52 + idx * colWidth}
                        y="0"
                        width={colWidth}
                        height="210"
                        fill="transparent"
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedDayIndex(selectedDayIndex === idx ? null : idx)
                        }
                      />
                    ))}
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* 7 Interactive Day Column Buttons */}
          <div
            style={{ paddingLeft: "7.43%", paddingRight: "1.43%" }}
            className="grid grid-cols-7 text-center pt-0 pb-1.5 gap-0 border-t border-slate-100 dark:border-slate-800"
          >
            {skillWeeklyChartData.map((d, i) => {
              const isSelected = (selectedDayIndex !== null ? selectedDayIndex : 4) === i;
              const isToday = i === 4;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    setSelectedDayIndex(selectedDayIndex === i ? null : i)
                  }
                  className={`py-1.5 px-0.5 rounded-t-lg text-center transition-all cursor-pointer font-mono text-[11px] sm:text-xs ${
                    isSelected
                      ? isToday
                        ? "text-amber-600 dark:text-amber-400 font-black border-b-2 border-amber-500 bg-amber-50/60 dark:bg-amber-950/30"
                        : "text-[#0059bb] dark:text-sky-400 font-black border-b-2 border-[#0059bb] dark:border-sky-400 bg-blue-50/60 dark:bg-blue-950/30"
                      : isToday
                      ? "text-amber-600 dark:text-amber-400 font-black border-b-2 border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold border-b-2 border-transparent"
                  }`}
                >
                  <span className="leading-tight block font-extrabold">{d.day}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Action Card Embedded */}
      <div className="p-3 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0">
            <BookOpen className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display">
              Mở rộng vốn từ vựng học thuật!
            </h4>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Học 10 từ mới mỗi ngày để hoàn thành mục tiêu 3,000 từ cốt lõi.
            </p>
          </div>
        </div>

        <Link href="/vocabulary" className="shrink-0">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-2xs active:scale-95"
          >
            <span>Học ngay</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </Link>
      </div>
    </div>
  );
}
