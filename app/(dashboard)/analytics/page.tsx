"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useUserStore } from "@/lib/store/userStore";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import Link from "next/link";
import {
  Flame,
  BookOpen,
  BookmarkCheck,
  Clock,
  Target,
  Trophy,
  Activity,
  Headphones,
  Mic,
  PenTool,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function AnalyticsPage() {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState<"ACTIVITIES" | "LEADERBOARD">("ACTIVITIES");

  // Single shared mode filter on top right
  const [modeFilter, setModeFilter] = useState<"Dictation" | "Shadowing" | "Nói" | "Từ vựng" | "Viết">("Dictation");

  // Active tooltip index for 30-day line charts (Default null, ONLY shows on hover!)
  const [hoveredChartIndex, setHoveredChartIndex] = useState<{
    chart: "MINUTES" | "XP";
    index: number;
  } | null>(null);

  // Active hover tile for 6-month heatmap
  const [hoveredHeatmapTile, setHoveredHeatmapTile] = useState<{
    dateStr: string;
    count: number;
  } | null>(null);

  const { learned } = useVocabularyStore();

  // Dynamic live savedWords & longestStreak computation
  const savedWords = useMemo(() => {
    if (!user) return 0;
    const count = learned.filter(
      (item) => (item.userId === user.id || item.userId === "local_user") && (item.isFavorite || (item.proficiency && item.proficiency > 0))
    ).length;
    return Math.max(count, user.wordsLearned || 0);
  }, [learned, user]);

  const longestStreak = user?.longestStreak ?? user?.currentStreak ?? 1;
  const minutesStudied = user?.minutesStudied !== undefined ? `${user.minutesStudied}m` : "6m";
  const totalXp = user?.totalXp !== undefined ? `${user.totalXp} XP` : "10 XP";
  const weeklyRank = "#3638";

  // Dynamic 30-day date generator & backend API sync
  const [dates, setDates] = useState<string[]>([
    "26 thg 6",
    "30 thg 6",
    "3 thg 7",
    "6 thg 7",
    "9 thg 7",
    "12 thg 7",
    "15 thg 7",
    "18 thg 7",
    "25 thg 7",
  ]);

  const [minutesValues, setMinutesValues] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 4]);
  const [xpValues, setXpValues] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 10]);

  // Fetch backend API analytics data & sync with localStorage
  useEffect(() => {
    fetch("/api/user/analytics")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const { series } = res.data;
          if (series?.dates && series.dates.length > 0) {
            setDates(series.dates);
            if (series.minutesSeries) setMinutesValues(series.minutesSeries);
            if (series.xpSeries) setXpValues(series.xpSeries);
          }
        }
      })
      .catch((err) => console.error("Error loading analytics API:", err));

    if (!user || typeof window === "undefined") return;

    try {
      const today = new Date();
      const generatedDates: string[] = [];
      const mValues: number[] = [];
      const xValues: number[] = [];

      const dailyXpKey = `xp_voca_daily_xp_${user.id}`;
      const dailyMinKey = `xp_voca_daily_minutes_${user.id}`;

      const storedXp = localStorage.getItem(dailyXpKey);
      const storedMin = localStorage.getItem(dailyMinKey);

      const dailyXpMap = storedXp ? JSON.parse(storedXp) : {};
      const dailyMinMap = storedMin ? JSON.parse(storedMin) : {};

      const intervals = [28, 24, 20, 16, 12, 8, 5, 2, 0];

      intervals.forEach((daysAgo) => {
        const d = new Date(today);
        d.setDate(d.getDate() - daysAgo);

        const isoKey = d.toISOString().slice(0, 10);
        const dayNum = d.getDate();
        const monthNum = d.getMonth() + 1;
        generatedDates.push(`${dayNum} thg ${monthNum}`);

        const dayXp = dailyXpMap[isoKey] || (daysAgo === 0 ? user.totalXp || 10 : 0);
        const dayMin = dailyMinMap[isoKey] || (daysAgo === 0 ? user.minutesStudied || 4 : 0);

        xValues.push(dayXp);
        mValues.push(dayMin);
      });

      setDates(generatedDates);
      setXpValues(xValues);
      setMinutesValues(mValues);
    } catch (e) {
      console.error("Error reading daily activity stats:", e);
    }
  }, [user]);

  // 6-Month Heatmap Structured Data
  const monthList = [
    { name: "Feb", startIndex: 0 },
    { name: "Mar", startIndex: 4 },
    { name: "Apr", startIndex: 8 },
    { name: "May", startIndex: 12 },
    { name: "Jun", startIndex: 16 },
    { name: "Jul", startIndex: 20 },
  ];

  // Generate 24 weeks of 7 days
  const heatmapWeeks = Array.from({ length: 24 }, (_, weekIdx) => {
    const monthIndex = Math.floor(weekIdx / 4);
    const monthName = monthList[monthIndex]?.name || "Jul";
    return Array.from({ length: 7 }, (_, dIdx) => {
      let intensity = 0;
      let count = 0;

      if (weekIdx === 20 && (dIdx === 5 || dIdx === 6)) {
        intensity = 3;
        count = 5;
      } else if (weekIdx === 19 && (dIdx === 6 || dIdx === 5)) {
        intensity = 2;
        count = 3;
      } else if (weekIdx === 18 && dIdx === 1) {
        intensity = 1;
        count = 1;
      } else if (weekIdx === 18 && dIdx === 3) {
        intensity = 2;
        count = 2;
      } else if (weekIdx === 18 && dIdx === 6) {
        intensity = 1;
        count = 1;
      }

      const dayNum = (weekIdx * 7 + dIdx) % 28 + 1;
      const dateStr = `Ngày ${dayNum} ${monthName} 2026`;

      return { intensity, count, dateStr };
    });
  });

  // Helper to render SVG line chart with Dynamic Scaled Y-Axis & Clamped Canvas (NO OVERFLOW SPIKES)
  const renderExactSvgChart = (
    title: string,
    defaultYSteps: number[],
    values: number[],
    chartType: "MINUTES" | "XP",
    strokeColor: string,
    gradientId: string
  ) => {
    const svgW = 460;
    const svgH = 160;
    const padLeft = 30;
    const padRight = 15;
    const padTop = 15;
    const padBottom = 25;

    // DYNAMICALLY SCALE Y-AXIS BASED ON MAXIMUM DATA VALUE TO PREVENT OVERFLOW SPIKES
    const maxDataVal = Math.max(...values, 0);
    const defaultMax = Math.max(...defaultYSteps, 1);
    const dynamicMaxY = maxDataVal > defaultMax ? Math.ceil(maxDataVal / 10) * 10 : defaultMax;

    // Generate dynamic 5 Y-axis steps
    const yAxisValues = maxDataVal > defaultMax
      ? [
          dynamicMaxY,
          Math.round(dynamicMaxY * 0.75),
          Math.round(dynamicMaxY * 0.5),
          Math.round(dynamicMaxY * 0.25),
          0,
        ]
      : defaultYSteps;

    // Safe Y-coordinate calculation clamped strictly inside padTop -> svgH - padBottom
    const points = values.map((val, idx) => {
      const clampedVal = Math.min(val, dynamicMaxY);
      const x = padLeft + (idx / (values.length - 1)) * (svgW - padLeft - padRight);
      const rawY = svgH - padBottom - (clampedVal / dynamicMaxY) * (svgH - padTop - padBottom);
      const y = Math.max(padTop, Math.min(svgH - padBottom, rawY));
      return { x, y, val, date: dates[idx] || "" };
    });

    // Smooth Bezier path string
    let pathD = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y;
      const cp2x = p0.x + (p1.x - p0.x) / 2;
      const cp2y = p1.y;
      pathD += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
    }

    const fillD = `${pathD} L ${svgW - padRight},${svgH - padBottom} L ${padLeft},${svgH - padBottom} Z`;

    const isCurrentHovered = hoveredChartIndex?.chart === chartType;
    const activePoint = isCurrentHovered && hoveredChartIndex ? points[hoveredChartIndex.index] : null;

    return (
      <div className="space-y-3 flex-1 min-w-0">
        <h3 className="text-xs font-semibold text-slate-500 font-display">
          {title}
        </h3>

        {/* OVERFLOW-HIDDEN CONTAINER TO GUARANTEE ZERO CANVAS LEAKS */}
        <div className="relative overflow-hidden rounded-md border border-slate-100 dark:border-white/5 p-1 bg-slate-50/30 dark:bg-slate-900/30">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full h-44 sm:h-48 overflow-hidden cursor-pointer"
            onMouseLeave={() => setHoveredChartIndex(null)}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Dashed Horizontal Gridlines & Dynamic Y-Axis Labels */}
            {yAxisValues.map((yVal, i) => {
              const y = padTop + (i / (yAxisValues.length - 1)) * (svgH - padTop - padBottom);
              return (
                <g key={i}>
                  <text
                    x="10"
                    y={y + 3}
                    className="fill-slate-400 text-[10px] font-mono font-medium"
                  >
                    {yVal}
                  </text>
                  <line
                    x1={padLeft}
                    y1={y}
                    x2={svgW - padRight}
                    y2={y}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            {/* Soft Gradient Fill */}
            <path d={fillD} fill={`url(#${gradientId})`} />

            {/* SLEEK ULTRA-FINE THIN LINE STROKE (strokeWidth="1.3") */}
            <path
              d={pathD}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Points Hover Targets */}
            {points.map((p, idx) => {
              const isPointHovered = isCurrentHovered && hoveredChartIndex?.index === idx;

              return (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredChartIndex({ chart: chartType, index: idx })}
                  className="cursor-pointer"
                >
                  <rect
                    x={p.x - 15}
                    y={padTop}
                    width="30"
                    height={svgH - padTop - padBottom}
                    fill="transparent"
                  />

                  {isPointHovered && (
                    <g>
                      <line
                        x1={p.x}
                        y1={padTop}
                        x2={p.x}
                        y2={svgH - padBottom}
                        stroke="#cbd5e1"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="3"
                        fill="white"
                        stroke={strokeColor}
                        strokeWidth="2"
                      />
                    </g>
                  )}
                </g>
              );
            })}

            {/* X-Axis Date Labels */}
            {points.map((p, idx) => (
              <text
                key={idx}
                x={p.x}
                y={svgH - 5}
                textAnchor="middle"
                className={`text-[9px] font-mono ${
                  idx === points.length - 1
                    ? "fill-[#0059bb] font-bold"
                    : "fill-slate-400 font-medium"
                }`}
              >
                {p.date}
              </text>
            ))}
          </svg>

          {/* FLOATING TOOLTIP BOX */}
          {activePoint && (
            <div
              className="absolute pointer-events-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-md p-2 shadow-sm text-center min-w-[90px] z-10 transition-opacity"
              style={{
                left: `${(activePoint.x / svgW) * 100}%`,
                top: "35%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="text-xs font-bold text-slate-800 dark:text-white font-mono">
                {activePoint.date}
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                {chartType === "XP" ? `Điểm : ${activePoint.val} XP` : `Phút : ${activePoint.val}m`}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-16 md:pb-6 select-none font-sans max-w-6xl mx-auto" suppressHydrationWarning>
      
      {/* 1. PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
          Tiến trình học tập
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Theo dõi hoạt động hàng ngày, chuỗi ngày học và thứ hạng của bạn so với người học khác.
        </p>
      </div>

      {/* 2. TOP 5 STAT CARDS (LIVE DYNAMIC ZUSTAND STORE SYNC) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* CARD 1: STREAK */}
        <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-orange-50 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4 fill-orange-400" />
          </div>
          <div>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white leading-tight">
              {longestStreak} <span className="text-xs font-normal text-slate-500">ngày</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Chuỗi dài nhất</div>
          </div>
        </div>

        {/* CARD 2: SAVED WORDS */}
        <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0">
            <BookmarkCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white leading-tight">
              {savedWords}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Từ đã lưu</div>
          </div>
        </div>

        {/* CARD 3: PRACTICE TIME */}
        <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-500 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white leading-tight">
              {minutesStudied}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Thời gian luyện tập</div>
          </div>
        </div>

        {/* CARD 4: TOTAL XP */}
        <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white leading-tight">
              {totalXp}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Tổng XP</div>
          </div>
        </div>

        {/* CARD 5: WEEKLY RANK */}
        <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white leading-tight">
              {weeklyRank} <span className="text-xs font-normal text-slate-500">Tuần</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Hạng của bạn</div>
          </div>
        </div>

      </div>

      {/* 3. SUB-NAV TABS UNDER TOP CARDS BAR */}
      <div className="border-b border-slate-200/80 dark:border-white/10 flex items-center gap-8 text-sm font-medium">
        <button
          onClick={() => setActiveTab("ACTIVITIES")}
          className={`pb-3 relative font-bold transition-colors ${
            activeTab === "ACTIVITIES"
              ? "text-slate-900 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          Hoạt động của tôi
          {activeTab === "ACTIVITIES" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-white rounded-sm" />
          )}
        </button>

        <Link
          href="/community/leaderboard?from=analytics"
          className="pb-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors"
        >
          Bảng xếp hạng
        </Link>
      </div>

      {/* 4. SECTION 1: TỔNG QUAN HOẠT ĐỘNG 6 THÁNG */}
      <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white font-display">
          Tổng quan hoạt động (6 tháng gần đây)
        </h2>

        <div className="relative overflow-x-auto pb-2">
          
          {/* Main Matrix Container */}
          <div className="min-w-[520px] space-y-2">
            
            {/* TOP MONTH LABELS */}
            <div className="flex items-center pl-8 text-[11px] font-bold text-slate-400 font-display">
              {monthList.map((m, mIdx) => (
                <div key={mIdx} className="w-[68px] text-center">
                  {m.name}
                </div>
              ))}
            </div>

            {/* MATRIX GRID WITH VERTICAL DAY LABELS */}
            <div className="flex items-start gap-3">
              
              <div className="relative w-5 h-[102px] shrink-0 text-[10px] font-bold text-slate-400 font-display">
                <span className="absolute top-[13px] left-0 leading-none">Mon</span>
                <span className="absolute top-[43px] left-0 leading-none">Wed</span>
                <span className="absolute top-[73px] left-0 leading-none">Fri</span>
              </div>

              <div className="flex items-center gap-3">
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
                                : "bg-slate-100 dark:bg-slate-800/60";

                            return (
                              <div
                                key={dIdx}
                                onMouseEnter={() => setHoveredHeatmapTile({ dateStr: tile.dateStr, count: tile.count })}
                                onMouseLeave={() => setHoveredHeatmapTile(null)}
                                className={`w-3 h-3 rounded-xs cursor-pointer transition-all hover:scale-125 ${tileBg}`}
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
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-2 pl-8 border-t border-slate-100 dark:border-white/5">
              <span className="font-mono">
                {hoveredHeatmapTile
                  ? `${hoveredHeatmapTile.dateStr}: ${hoveredHeatmapTile.count} hoạt động`
                  : "15 activities in 2026"}
              </span>

              <div className="flex items-center gap-1.5 font-display">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 dark:bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0059bb]/35 dark:bg-sky-600/40" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0059bb]/70 dark:bg-sky-500/70" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0059bb] dark:bg-sky-400" />
                </div>
                <span>More</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 5. SECTION 2: MODE SWITCHER PILLS & DYNAMIC REALTTIME LINE CHARTS */}
      <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-6">
        
        {/* CARD TOP HEADER: TITLE LEFT + MODE PILLS RIGHT */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
            Luyện tập hàng ngày (30 ngày gần đây)
          </h2>

          {/* Top Right Mode Switcher */}
          <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800/80 flex items-center gap-1 text-xs font-medium border border-slate-200/60 dark:border-white/5">
            <button
              onClick={() => setModeFilter("Dictation")}
              className={`px-3 py-1 rounded-md transition-all ${
                modeFilter === "Dictation" ? "bg-[#0059bb] text-white shadow-2xs font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Dictation
            </button>
            <button
              onClick={() => setModeFilter("Shadowing")}
              className={`px-3 py-1 rounded-md transition-all ${
                modeFilter === "Shadowing" ? "bg-[#0059bb] text-white shadow-2xs font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Shadowing
            </button>
            <button
              onClick={() => setModeFilter("Nói")}
              className={`px-3 py-1 rounded-md transition-all ${
                modeFilter === "Nói" ? "bg-[#0059bb] text-white shadow-2xs font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Nói
            </button>
            <button
              onClick={() => setModeFilter("Từ vựng")}
              className={`px-3 py-1 rounded-md transition-all ${
                modeFilter === "Từ vựng" ? "bg-[#0059bb] text-white shadow-2xs font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Từ vựng
            </button>
            <button
              onClick={() => setModeFilter("Viết")}
              className={`px-3 py-1 rounded-md transition-all ${
                modeFilter === "Viết" ? "bg-[#0059bb] text-white shadow-2xs font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Viết
            </button>
          </div>
        </div>

        {/* INNER 2 SIDE-BY-SIDE DYNAMIC LINE CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          {renderExactSvgChart(
            "Phút luyện tập",
            [4, 3, 2, 1, 0],
            minutesValues,
            "MINUTES",
            "#0059bb",
            "minutesGradientBigCard"
          )}

          {renderExactSvgChart(
            "XP kiếm được",
            [12, 9, 6, 3, 0],
            xpValues,
            "XP",
            "#10b981",
            "xpGradientBigCard"
          )}
        </div>

      </div>

    </div>
  );
}
