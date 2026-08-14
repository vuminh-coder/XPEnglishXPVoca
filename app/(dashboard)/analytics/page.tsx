"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageEntranceWrapper, MotionItem } from "@/components/shared/PageEntranceAnimation";
import { useUserStore } from "@/lib/store/userStore";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { UserAvatar } from "@/components/shared/UserAvatar";
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
  Crown,
  Medal,
  Award,
  Loader2,
} from "lucide-react";
import {
  get30DaySkillAnalytics,
  get6MonthHeatmapAnalytics,
} from "@/lib/store/skillChartStore";

export default function AnalyticsPage() {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState<"ACTIVITIES" | "LEADERBOARD">("ACTIVITIES");

  // Single shared mode filter on top right
  const [modeFilter, setModeFilter] = useState<"Dictation" | "Shadowing" | "Nói" | "Từ vựng" | "Viết">("Dictation");
  const [apiRank, setApiRank] = useState<string>("#1");

  // Leaderboard state for inline tab
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState<boolean>(false);
  const [visibleLeaderboardCount, setVisibleLeaderboardCount] = useState<number>(8);

  useEffect(() => {
    if (activeTab === "LEADERBOARD" && leaderboardData.length === 0) {
      setIsLoadingLeaderboard(true);
      fetch("/api/leaderboard")
        .then((res) => res.json())
        .then((res) => {
          if (res.success && Array.isArray(res.data)) {
            setLeaderboardData(res.data);
          }
        })
        .catch((err) => console.error("Error fetching leaderboard:", err))
        .finally(() => setIsLoadingLeaderboard(false));
    }
  }, [activeTab, leaderboardData.length]);

  // Active hover & persistent clicked selection index for 30-day line charts
  const [hoveredChartIndex, setHoveredChartIndex] = useState<{
    chart: "MINUTES" | "XP";
    index: number;
  } | null>(null);

  const [selectedChartIndex, setSelectedChartIndex] = useState<{
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
  const weeklyRank = apiRank;

  // Dynamic 30-day date generator & backend API sync (Exactly 8 time milestones)
  const [dates, setDates] = useState<string[]>([
    "26 thg 7",
    "31 thg 7",
    "5 thg 8",
    "10 thg 8",
    "Hôm nay",
    "17 thg 8",
    "20 thg 8",
    "24 thg 8",
  ]);

  const [minutesValues, setMinutesValues] = useState<number[]>([0, 0, 0, 0, 6, 0, 0, 0]);
  const [xpValues, setXpValues] = useState<number[]>([0, 0, 0, 0, 10, 0, 0, 0]);

  // Fetch backend API analytics data & sync with localStorage
  useEffect(() => {
    fetch("/api/user/analytics")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const { stats, series } = res.data;
          if (stats?.weeklyRank) {
            setApiRank(stats.weeklyRank);
          }
          if (series?.dates && series.dates.length > 0) {
            setDates(series.dates);
            if (series.minutesSeries) setMinutesValues(series.minutesSeries);
            if (series.xpSeries) setXpValues(series.xpSeries);
          }
        }
      })
      .catch((err) => console.error("Error loading analytics API:", err));
  }, [user]);

  // Skill-Specific Analytics Computation for modeFilter ("Dictation" | "Shadowing" | "Nói" | "Từ vựng" | "Viết")
  const activeSkillData = useMemo(() => {
    const data = get30DaySkillAnalytics(user?.id, modeFilter);
    if (data.dates.length > 0) {
      return { minutes: data.minutes, xp: data.xp };
    }
    return { minutes: minutesValues, xp: xpValues };
  }, [modeFilter, user, minutesValues, xpValues]);

  // Dynamic 6-Month Heatmap Data Generator
  const { weeks: heatmapWeeks, totalActivities } = useMemo(() => {
    return get6MonthHeatmapAnalytics(user?.id);
  }, [user]);

  // Memoized Leaderboard Data Processor (Optimized Performance O(N))
  const processedLeaderboard = useMemo(() => {
    if (!leaderboardData || leaderboardData.length === 0) return [];

    const currentUserName = user?.fullName || user?.username || "";
    const userAvatar = user?.imageUrl || (user as any)?.avatar || (user as any)?.avatarUrl;

    return leaderboardData.map((item) => {
      const itemCleanName = item.fullName || item.username || "";
      const isSelf = Boolean(
        user &&
          (item.id === user.id ||
            (user.id && item.id && item.id.toString() === user.id.toString()) ||
            (user.id?.startsWith("local_user") && item.id?.startsWith("local_user")) ||
            (itemCleanName && currentUserName && itemCleanName.trim().toLowerCase() === currentUserName.trim().toLowerCase()))
      );

      const fullName = isSelf ? (user?.fullName || user?.username || item.fullName) : item.fullName;
      const avatarUrl = isSelf ? (userAvatar || item.avatarUrl || item.imageUrl || item.avatar) : (item.avatarUrl || item.imageUrl || item.avatar);
      const avatarEmoji = isSelf ? (user?.avatarEmoji || item.avatarEmoji) : item.avatarEmoji;

      return {
        ...item,
        fullName,
        xp: item.xp,
        level: isSelf ? (user?.level || item.level) : item.level,
        title: isSelf ? (user?.title || item.title) : item.title,
        avatarUrl,
        avatarEmoji,
        isSelf,
      };
    });
  }, [leaderboardData, user]);

  // Dynamic Rolling 6-Month Heatmap Month Headers (Auto-shifts relative to current date)
  const monthList = useMemo(() => {
    const today = new Date();
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const list: { name: string; startIndex: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = shortMonths[d.getMonth()];
      const startIndex = (5 - i) * 4;
      list.push({ name: monthName, startIndex });
    }

    return list;
  }, []);

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
    const padBottom = 32;

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
    const isCurrentSelected = selectedChartIndex?.chart === chartType;

    // Active point index: Hover preview takes priority if hovering; otherwise fallback to clicked selected index
    const activePointIndex = isCurrentHovered && hoveredChartIndex
      ? hoveredChartIndex.index
      : (isCurrentSelected && selectedChartIndex ? selectedChartIndex.index : null);

    const activePoint = activePointIndex !== null ? points[activePointIndex] : null;

    return (
      <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
        <h3 className="text-[11px] sm:text-xs font-semibold text-slate-500 font-display">
          {title}
        </h3>

        {/* OVERFLOW-HIDDEN CONTAINER TO GUARANTEE ZERO CANVAS LEAKS */}
        <div className="relative overflow-hidden rounded-xs border border-slate-100 dark:border-white/5 p-1 bg-slate-50/30 dark:bg-slate-900/30">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full h-36 sm:h-48 overflow-hidden cursor-pointer"
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
                    y={y + 3.5}
                    className="fill-slate-500 dark:fill-slate-400 text-[10px] sm:text-[11.5px] font-mono font-bold"
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
            <motion.path
              key={`fill-${modeFilter}-${chartType}`}
              d={fillD}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              fill={`url(#${gradientId})`}
            />

            {/* SLEEK ULTRA-FINE THIN LINE STROKE WITH SMOOTH PATHLENGTH DRAW */}
            <motion.path
              key={`line-${modeFilter}-${chartType}`}
              d={pathD}
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Points Hover & Click Selection Targets */}
            {points.map((p, idx) => {
              const isPointActive = activePointIndex === idx;

              return (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredChartIndex({ chart: chartType, index: idx })}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChartIndex({ chart: chartType, index: idx });
                    setHoveredChartIndex({ chart: chartType, index: idx });
                  }}
                  onTouchStart={() => {
                    setSelectedChartIndex({ chart: chartType, index: idx });
                    setHoveredChartIndex({ chart: chartType, index: idx });
                  }}
                  className="cursor-pointer"
                >
                  <rect
                    x={p.x - 15}
                    y={padTop}
                    width="30"
                    height={svgH - padTop - padBottom}
                    fill="transparent"
                  />

                  {isPointActive && (
                    <g>
                      {p.y < svgH - padBottom && (
                        <line
                          x1={p.x}
                          y1={p.y + 3}
                          x2={p.x}
                          y2={svgH - padBottom}
                          stroke="#cbd5e1"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      )}
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        animate={{ cx: p.x, cy: p.y }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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

            {/* Vertical Reference Guideline for TODAY (Origin Anchor - Starts from below circle point downwards) */}
            {points.map((p, idx) => {
              const isToday = p.date === "Hôm nay" || p.date.includes("Hôm nay");
              if (!isToday) return null;
              const lineY1 = Math.min(p.y + 3, svgH - padBottom);
              return (
                <g key={`today-anchor-${idx}`}>
                  {lineY1 < svgH - padBottom && (
                    <line
                      x1={p.x}
                      y1={lineY1}
                      x2={p.x}
                      y2={svgH - padBottom}
                      stroke="#0059bb"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                  )}
                  <circle cx={p.x} cy={p.y} r="3" fill="#0059bb" />
                </g>
              );
            })}

            {/* X-Axis Date Labels */}
            {points.map((p, idx) => {
              const isToday = p.date === "Hôm nay" || p.date.includes("Hôm nay");
              return (
                <text
                  key={idx}
                  x={p.x}
                  y={svgH - 5}
                  textAnchor="middle"
                  className={`text-[10.5px] sm:text-[11px] font-mono ${
                    isToday
                      ? "fill-[#0059bb] font-black"
                      : "fill-slate-500 dark:fill-slate-400 font-semibold"
                  }`}
                >
                  {p.date}
                </text>
              );
            })}

            {/* FRAMELESS VALUE LABEL DIRECTLY ABOVE HOVERED POINT (~8.5px SPACING ABOVE POINT EVEN AT 0 VAL) */}
            {activePoint && (
              <g className="pointer-events-none">
                <text
                  x={activePoint.x}
                  y={Math.max(8.5, activePoint.y - 8.5)}
                  textAnchor="middle"
                  fill={strokeColor}
                  className="text-[11px] sm:text-[12.5px] font-mono font-extrabold drop-shadow-2xs select-none"
                >
                  {chartType === "XP" ? `${activePoint.val} XP` : `${activePoint.val}m`}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <PageEntranceWrapper className="space-y-4 sm:space-y-6 pb-16 md:pb-6 select-none font-sans max-w-6xl mx-auto" suppressHydrationWarning>
      
      {/* 1. PAGE HEADER */}
      <MotionItem className="space-y-0.5 sm:space-y-1">
        <h1 className="text-sm sm:text-base font-bold font-display tracking-tight text-slate-900 dark:text-white">
          Tiến trình học tập
        </h1>
        <p className="hidden sm:block text-[10px] sm:text-xs text-slate-500 font-medium">
          Theo dõi hoạt động hàng ngày, chuỗi ngày học và thứ hạng của bạn so với người học khác.
        </p>
      </MotionItem>

      {/* 2. TOP 5 STAT CARDS (MICRO-GRID 2x2 + 1 FULL WIDTH ON MOBILE) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
        
        {/* CARD 1: STREAK */}
        <div className="p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xs bg-orange-50 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center shrink-0">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-orange-400" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-tight">
              {longestStreak} <span className="text-[10px] sm:text-xs font-normal text-slate-500">ngày</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">Chuỗi dài nhất</div>
          </div>
        </div>

        {/* CARD 2: SAVED WORDS */}
        <div className="p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0">
            <BookmarkCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-tight">
              {savedWords}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">Từ đã lưu</div>
          </div>
        </div>

        {/* CARD 3: PRACTICE TIME */}
        <div className="p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xs bg-sky-50 dark:bg-sky-950/40 text-sky-500 flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-tight">
              {minutesStudied}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">Thời gian luyện tập</div>
          </div>
        </div>

        {/* CARD 4: TOTAL XP */}
        <div className="p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center shrink-0">
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-tight">
              {totalXp}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">Tổng XP</div>
          </div>
        </div>

        {/* CARD 5: WEEKLY RANK (Spans 2 cols on mobile for balance) */}
        <div className="col-span-2 sm:col-span-1 p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xs bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-tight">
                {weeklyRank} <span className="text-[10px] sm:text-xs font-normal text-slate-500">Tuần</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">Hạng của bạn</div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. SUB-NAV TABS UNDER TOP CARDS BAR */}
      <div className="border-b border-slate-200/80 dark:border-white/10 flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab("ACTIVITIES")}
          className={`pb-2.5 sm:pb-3 relative font-bold transition-colors cursor-pointer ${
            activeTab === "ACTIVITIES"
              ? "text-slate-900 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          Hoạt động của tôi
          {activeTab === "ACTIVITIES" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-white rounded-xs" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("LEADERBOARD")}
          className={`pb-2.5 sm:pb-3 relative font-bold transition-colors cursor-pointer ${
            activeTab === "LEADERBOARD"
              ? "text-slate-900 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          Bảng xếp hạng
          {activeTab === "LEADERBOARD" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-white rounded-xs" />
          )}
        </button>
      </div>

      {/* 4. SECTION 1: TỔNG QUAN HOẠT ĐỘNG / BẢNG XẾP HẠNG 2 CỘT */}
      <AnimatePresence mode="wait">
        {activeTab === "LEADERBOARD" ? (
          <motion.div
            key="leaderboard-container"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-3.5 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                Bảng xếp hạng thành tích XP
              </h2>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-medium">
                Cập nhật trực tiếp từ hệ thống
              </span>
            </div>

            {isLoadingLeaderboard && leaderboardData.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-slate-400 gap-2 font-medium text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-[#0059bb]" />
                Đang tải bảng xếp hạng...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
                {/* LEFT COLUMN: TOP 3 BENTO PODIUM ISOSCELES TRAPEZOID (lg:col-span-5) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 flex flex-col justify-between p-3.5 sm:p-4 rounded-t-xs [clip-path:polygon(2%_0%,98%_0%,100%_100%,0%_100%)] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-slate-50/40 dark:from-amber-500/15 dark:to-slate-900/40 space-y-3 border-b-2 border-amber-500/30"
                >
                  <div className="text-center text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-display flex items-center justify-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    Top 3 Học Viên Đứng Đầu
                  </div>

                  {/* PODIUM 3 ISOSCELES TRAPEZOID PILLARS */}
                  <div className="grid grid-cols-3 gap-2 items-end pt-2 pb-1">
                    {/* TOP 2 (SILVER ISOSCELES TRAPEZOID) */}
                    {processedLeaderboard[1] && (() => {
                      const top2 = processedLeaderboard[1];
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.1 }}
                          className="flex flex-col items-center p-2 rounded-t-xs [clip-path:polygon(6%_0%,94%_0%,100%_100%,0%_100%)] bg-gradient-to-b from-slate-200/80 via-slate-100/60 to-white/90 dark:from-slate-700/80 dark:to-slate-800/90 text-center space-y-1.5 shadow-2xs border-t-2 border-slate-300"
                        >
                          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 px-2.5 py-0.5 [clip-path:polygon(12%_0%,88%_0%,100%_100%,0%_100%)] bg-white/80 dark:bg-slate-700/80 flex items-center gap-1">
                            <Medal className="w-3 h-3 text-slate-400 fill-slate-300" /> #2
                          </span>
                          <UserAvatar
                            avatarUrl={top2.avatarUrl}
                            emoji={top2.avatarEmoji}
                            name={top2.fullName}
                            size="w-9 h-9 sm:w-11 sm:h-11"
                          />
                          <div className="min-w-0 w-full flex flex-col items-center">
                            <div className="text-[11px] font-bold text-slate-800 dark:text-white truncate font-display w-full">
                              {top2.fullName}
                            </div>
                            <div className="w-full mt-1.5 py-1 sm:py-1.5 [clip-path:polygon(6%_0%,94%_0%,100%_100%,0%_100%)] bg-slate-700 dark:bg-slate-800 text-white font-mono font-bold text-[10px] sm:text-[11px] shadow-2xs text-center truncate">
                              {top2.xp?.toLocaleString()} XP
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}

                    {/* TOP 1 (GOLD CENTER ISOSCELES TRAPEZOID - TALLER & SHINY) */}
                    {processedLeaderboard[0] && (() => {
                      const top1 = processedLeaderboard[0];
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 18, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.15 }}
                          className="flex flex-col items-center p-2.5 rounded-t-xs [clip-path:polygon(6%_0%,94%_0%,100%_100%,0%_100%)] bg-gradient-to-b from-amber-200/90 via-amber-100/70 to-white dark:from-amber-900/90 dark:to-slate-800/90 text-center space-y-1.5 shadow-xs relative -top-1 border-t-2 border-amber-400"
                        >
                          <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-300 px-3 py-0.5 [clip-path:polygon(12%_0%,88%_0%,100%_100%,0%_100%)] bg-amber-200/80 dark:bg-amber-900/90 flex items-center gap-1">
                            <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-400" /> TOP 1
                          </span>
                          <UserAvatar
                            avatarUrl={top1.avatarUrl}
                            emoji={top1.avatarEmoji}
                            name={top1.fullName}
                            size="w-11 h-11 sm:w-13 sm:h-13"
                          />
                          <div className="min-w-0 w-full flex flex-col items-center">
                            <div className="text-xs font-bold text-amber-950 dark:text-amber-200 truncate font-display w-full">
                              {top1.fullName}
                            </div>
                            <div className="w-full mt-1.5 py-1 sm:py-1.5 [clip-path:polygon(6%_0%,94%_0%,100%_100%,0%_100%)] bg-amber-500 text-slate-950 font-mono font-extrabold text-[11px] sm:text-xs shadow-md border-t border-amber-300 text-center truncate">
                              {top1.xp?.toLocaleString()} XP
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}

                    {/* TOP 3 (BRONZE ISOSCELES TRAPEZOID) */}
                    {processedLeaderboard[2] && (() => {
                      const top3 = processedLeaderboard[2];
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.2 }}
                          className="flex flex-col items-center p-2 rounded-t-xs [clip-path:polygon(6%_0%,94%_0%,100%_100%,0%_100%)] bg-gradient-to-b from-amber-900/25 via-amber-800/15 to-amber-50/50 dark:from-amber-900/50 dark:to-slate-800/90 text-center space-y-1.5 shadow-2xs border-t-2 border-amber-600/60"
                        >
                          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 px-2.5 py-0.5 [clip-path:polygon(12%_0%,88%_0%,100%_100%,0%_100%)] bg-amber-100/80 dark:bg-amber-900/60 flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-700 fill-amber-600" /> #3
                          </span>
                          <UserAvatar
                            avatarUrl={top3.avatarUrl}
                            emoji={top3.avatarEmoji}
                            name={top3.fullName}
                            size="w-9 h-9 sm:w-11 sm:h-11"
                          />
                          <div className="min-w-0 w-full flex flex-col items-center">
                            <div className="text-[11px] font-bold text-slate-800 dark:text-white truncate font-display w-full">
                              {top3.fullName}
                            </div>
                            <div className="w-full mt-1.5 py-1 sm:py-1.5 [clip-path:polygon(6%_0%,94%_0%,100%_100%,0%_100%)] bg-amber-800 text-amber-100 font-mono font-bold text-[10px] sm:text-[11px] shadow-2xs text-center truncate">
                              {top3.xp?.toLocaleString()} XP
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </div>
                </motion.div>

                {/* RIGHT COLUMN: TOP 4+ SCROLLABLE LIST VIEW (lg:col-span-7) */}
                <div className="lg:col-span-7 flex flex-col min-w-0">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-display">
                    Thứ hạng Top 4 trở đi (Cuộn để xem tiếp)
                  </div>

                  <div
                    onScroll={(e) => {
                      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                      if (scrollTop + clientHeight >= scrollHeight - 20) {
                        if (visibleLeaderboardCount < processedLeaderboard.length) {
                          setVisibleLeaderboardCount((prev) => Math.min(processedLeaderboard.length, prev + 8));
                        }
                      }
                    }}
                    className="max-h-[300px] sm:max-h-[320px] overflow-y-auto pr-1.5 space-y-1.5 no-scrollbar"
                  >
                    {processedLeaderboard.slice(3, 3 + visibleLeaderboardCount).map((item, idx) => {
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: 0.03 * Math.min(idx, 8) }}
                          className={`flex items-center justify-between p-2 sm:p-2.5 rounded-xs border transition-all text-xs ${
                            item.isSelf
                              ? "bg-[#0059bb]/10 border-[#0059bb]/40 font-bold"
                              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-white/5 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-6 text-center font-mono font-bold text-slate-400 shrink-0 text-[11px]">
                              #{item.rank}
                            </span>
                            <UserAvatar
                              avatarUrl={item.avatarUrl}
                              emoji={item.avatarEmoji}
                              name={item.fullName}
                              size="w-7 h-7"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-slate-800 dark:text-white truncate font-display flex items-center gap-1.5 text-xs">
                                {item.fullName}
                                {item.isSelf && (
                                  <span className="text-[9px] px-1 py-0.2 rounded-xs bg-[#0059bb] text-white">Bạn</span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                Lv.{item.level || 1} • {item.title || "Học viên"}
                              </div>
                            </div>
                          </div>

                          <div className="font-bold font-mono text-[#0059bb] dark:text-sky-400 text-xs shrink-0 pl-2">
                            {item.xp?.toLocaleString()} XP
                          </div>
                        </motion.div>
                      );
                    })}

                    {visibleLeaderboardCount < leaderboardData.length - 3 && (
                      <button
                        onClick={() => setVisibleLeaderboardCount((prev) => Math.min(leaderboardData.length, prev + 8))}
                        className="w-full py-2 text-center text-[11px] font-bold text-[#0059bb] hover:underline cursor-pointer font-display"
                      >
                        Cuộn hoặc bấm để tải thêm thứ hạng tiếp theo...
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="activities-tab"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-3.5 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 sm:space-y-4"
          >
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
            Tổng quan hoạt động (6 tháng gần đây)
          </h2>

          <div className="relative w-full overflow-hidden sm:overflow-x-auto sm:no-scrollbar pb-2">
            
            {/* Main Matrix Container */}
            <div className="w-full sm:min-w-[520px] space-y-1.5 sm:space-y-2">
              
              {/* TOP MONTH LABELS */}
              <div className="flex items-center pl-5 sm:pl-8 text-[9px] sm:text-[11px] font-bold text-slate-400 font-display">
                {monthList.map((m, mIdx) => (
                  <div key={mIdx} className="w-[48px] sm:w-[68px] text-center shrink-0">
                    {m.name}
                  </div>
                ))}
              </div>

              {/* MATRIX GRID WITH VERTICAL DAY LABELS */}
              <div className="flex items-start gap-2 sm:gap-3.5">
                
                <div className="relative w-5 sm:w-6 pr-1 sm:pr-1.5 h-[78px] sm:h-[102px] shrink-0 text-[9px] sm:text-[10px] font-bold text-slate-400 font-display">
                  <span className="absolute top-[8px] sm:top-[13px] left-0 leading-none">Mon</span>
                  <span className="absolute top-[30px] sm:top-[43px] left-0 leading-none">Wed</span>
                  <span className="absolute top-[52px] sm:top-[73px] left-0 leading-none">Fri</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-3">
                  {monthList.map((mGroup, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-0.5 sm:gap-1">
                      {Array.from({ length: 4 }).map((_, wInMonth) => {
                        const globalWeekIdx = mIdx * 4 + wInMonth;
                        const weekTiles = heatmapWeeks[globalWeekIdx] || [];

                        return (
                          <div key={wInMonth} className="flex flex-col gap-0.5 sm:gap-1">
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
                                  className={`w-[9px] h-[9px] sm:w-3 sm:h-3 rounded-xs cursor-pointer transition-all hover:scale-125 ${tileBg}`}
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
              <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[11px] font-medium text-slate-400 pt-2 pl-5 sm:pl-8 border-t border-slate-100 dark:border-white/5">
                <span className="font-mono truncate">
                  {hoveredHeatmapTile
                    ? `${hoveredHeatmapTile.dateStr}: ${hoveredHeatmapTile.count} hoạt động`
                    : `${totalActivities} hoạt động trong 6 tháng qua`}
                </span>

                <div className="flex items-center gap-1 sm:gap-1.5 font-display shrink-0">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs bg-slate-100 dark:bg-slate-800" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs bg-[#0059bb]/35 dark:bg-sky-600/40" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs bg-[#0059bb]/70 dark:bg-sky-500/70" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs bg-[#0059bb] dark:bg-sky-400" />
                  </div>
                  <span>More</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

      {/* 5. SECTION 2: MODE SWITCHER PILLS & DYNAMIC REALTTIME LINE CHARTS */}
      <div className="p-3.5 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 sm:space-y-6">
        
        {/* CARD TOP HEADER: TITLE LEFT + MODE PILLS RIGHT */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3">
          <h2 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white font-display">
            Luyện tập hàng ngày (30 ngày gần đây)
          </h2>

          {/* Top Right Mode Switcher (1 Single Line Scrollable Strip on Mobile) */}
          <div className="p-1 rounded-xs bg-slate-100 dark:bg-slate-800/80 flex items-center gap-1 text-xs font-medium border border-slate-200/60 dark:border-white/5 overflow-x-auto no-scrollbar whitespace-nowrap max-w-full shrink-0">
            {[
              { id: "Dictation" as const, label: "Dictation" },
              { id: "Shadowing" as const, label: "Shadowing" },
              { id: "Nói" as const, label: "Nói" },
              { id: "Từ vựng" as const, label: "Từ vựng" },
              { id: "Viết" as const, label: "Viết" },
            ].map((mode) => {
              const isSelected = modeFilter === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setModeFilter(mode.id)}
                  className={`relative px-2.5 py-1 rounded-xs text-[11px] sm:text-xs transition-colors cursor-pointer select-none font-display shrink-0 ${
                    isSelected ? "text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeSkillTabPill"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-[#0059bb] rounded-xs shadow-2xs -z-0"
                    />
                  )}
                  <span className="relative z-10">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* INNER 2 SIDE-BY-SIDE DYNAMIC LINE CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-1 sm:pt-2">
          {renderExactSvgChart(
            `Phút luyện tập (${modeFilter})`,
            [4, 3, 2, 1, 0],
            activeSkillData.minutes,
            "MINUTES",
            "#0059bb",
            "minutesGradientBigCard"
          )}

          {renderExactSvgChart(
            `XP kiếm được (${modeFilter})`,
            [12, 9, 6, 3, 0],
            activeSkillData.xp,
            "XP",
            "#10b981",
            "xpGradientBigCard"
          )}
        </div>

      </div>

    </PageEntranceWrapper>
  );
}
