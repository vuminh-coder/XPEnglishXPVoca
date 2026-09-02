"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { useUserStore } from "@/stores/userStore";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import Link from "next/link";
import {
  Flame,
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
  Sparkles,
  Zap,
  ChevronRight,
  TrendingUp,
  Calendar,
  BookOpen,
  Wand2,
} from "lucide-react";
import {
  get30DaySkillAnalytics,
  get6MonthHeatmapAnalytics,
  modeNameToSkillType,
  hydrateSkillMinutesFromBackend,
} from "@/stores/skillChartStore";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

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

const SKILL_THEMES: Record<
  string,
  { label: string; color: string; gradientId: string; Icon: any }
> = {
  Dictation: {
    label: "Dictation",
    color: "#0059bb",
    gradientId: "dictationAnalyticsGradient",
    Icon: Headphones,
  },
  Shadowing: {
    label: "Shadowing",
    color: "#8b5cf6",
    gradientId: "shadowingAnalyticsGradient",
    Icon: Mic,
  },
  "Nói": {
    label: "Nói (AI)",
    color: "#10b981",
    gradientId: "speakingAnalyticsGradient",
    Icon: SpeakingIcon,
  },
  "Từ vựng": {
    label: "Từ vựng",
    color: "#f59e0b",
    gradientId: "vocabAnalyticsGradient",
    Icon: BookOpen,
  },
  "Viết": {
    label: "Viết (AI)",
    color: "#ec4899",
    gradientId: "writingAnalyticsGradient",
    Icon: Wand2,
  },
};

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

  // Active day index for 30-day line charts (default to index 4 - "Hôm nay")
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(4);

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
  const minutesStudied = user?.minutesStudied !== undefined ? `${user.minutesStudied}m` : "0m";
  const totalXp = user?.totalXp !== undefined ? `${user.totalXp} XP` : "0 XP";
  const weeklyRank = apiRank;

  const [dates, setDates] = useState<string[]>([
    "26/7",
    "31/7",
    "5/8",
    "10/8",
    "Hôm nay",
    "17/8",
    "20/8",
    "24/8",
  ]);

  const [minutesValues, setMinutesValues] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [xpValues, setXpValues] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [apiPerSkillData, setApiPerSkillData] = useState<any>(null);
  const [apiHeatmapData, setApiHeatmapData] = useState<{ weeks: any[][]; totalActivities: number } | null>(null);

  // Fetch backend API analytics data & sync with localStorage
  useEffect(() => {
    if (user?.id) {
      hydrateSkillMinutesFromBackend(user.id);
    }

    fetch("/api/user/analytics")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const { stats, series, perSkill, heatmap } = res.data;
          if (stats?.weeklyRank) {
            setApiRank(stats.weeklyRank);
          }
          if (series?.dates && series.dates.length > 0) {
            setDates(series.dates);
            if (series.minutesSeries) setMinutesValues(series.minutesSeries);
            if (series.xpSeries) setXpValues(series.xpSeries);
          }
          if (perSkill) {
            setApiPerSkillData(perSkill);
          }
          if (heatmap && Array.isArray(heatmap.weeks) && heatmap.weeks.length > 0) {
            setApiHeatmapData(heatmap);
          }
        }
      })
      .catch((err) => console.error("Error loading analytics API:", err));
  }, [user]);

  // Skill-Specific Analytics Computation for modeFilter merging DB + Local Cache
  const activeSkillData = useMemo(() => {
    const skillKey = modeNameToSkillType(modeFilter);
    const localData = get30DaySkillAnalytics(user?.id, modeFilter);

    const dbSkill = apiPerSkillData?.[skillKey];
    if (dbSkill && Array.isArray(dbSkill.minutes) && dbSkill.minutes.length > 0) {
      const mergedMins = dbSkill.minutes.map((dbMin: number, i: number) =>
        Math.max(dbMin || 0, localData.minutes[i] || 0)
      );
      const mergedXp = (dbSkill.xp || []).map((dbXp: number, i: number) =>
        Math.max(dbXp || 0, localData.xp[i] || 0)
      );
      return { minutes: mergedMins, xp: mergedXp };
    }

    return { minutes: localData.minutes, xp: localData.xp };
  }, [modeFilter, user, apiPerSkillData]);

  // Dynamic 6-Month Heatmap Data Generator merging DB + Local Cache
  const { heatmapWeeks, totalActivities } = useMemo(() => {
    if (apiHeatmapData && apiHeatmapData.weeks && apiHeatmapData.weeks.length > 0) {
      return {
        heatmapWeeks: apiHeatmapData.weeks,
        totalActivities: apiHeatmapData.totalActivities,
      };
    }
    const localHeatmap = get6MonthHeatmapAnalytics(user?.id);
    return {
      heatmapWeeks: localHeatmap.weeks,
      totalActivities: localHeatmap.totalActivities,
    };
  }, [user, apiHeatmapData]);

  // Memoized Leaderboard Data Processor
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

  // Dynamic Rolling 6-Month Heatmap Month Headers
  const monthList = useMemo(() => {
    const today = new Date();
    const shortMonths = ["Th 1", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "Th 8", "Th 9", "Th 10", "Th 11", "Th 12"];
    const list: { name: string; startIndex: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = shortMonths[d.getMonth()];
      const startIndex = (5 - i) * 4;
      list.push({ name: monthName, startIndex });
    }

    return list;
  }, []);

  const currentTheme = SKILL_THEMES[modeFilter] || SKILL_THEMES.Dictation;

  // Render Dashboard-Exact High-DPI Waveform Chart
  const renderDashboardStyledChart = (
    title: string,
    values: number[],
    chartType: "MINUTES" | "XP",
    themeColor: string,
    gradientId: string,
    unit: string
  ) => {
    const svgW = 700;
    const svgH = 210;
    const padLeft = 52;
    const padRight = 10;
    const padTop = 24;
    const padBottom = 10; // y=200 is baseline

    const maxDataVal = Math.max(...values, 0);
    const defaultMax = chartType === "XP" ? 12 : 4;
    const dynamicMax = maxDataVal > defaultMax ? Math.ceil(maxDataVal / 4) * 4 : defaultMax;

    const ySteps = [
      dynamicMax,
      Math.round(dynamicMax * 0.75),
      Math.round(dynamicMax * 0.5),
      Math.round(dynamicMax * 0.25),
      0,
    ];

    const yCoords = [24, 68, 112, 156, 200];

    const colWidth = (svgW - padLeft - padRight) / values.length;
    const points = values.map((val, idx) => {
      const x = padLeft + (idx + 0.5) * colWidth;
      const clampedVal = Math.max(0, Math.min(val, dynamicMax));
      const ratio = dynamicMax > 0 ? clampedVal / dynamicMax : 0;
      const y = 200 - ratio * (200 - padTop);
      return { x, y, val, date: dates[idx] || "" };
    });

    const fullCurvePoints = [
      { x: padLeft, y: points[0]?.y ?? 200 },
      ...points,
      { x: svgW - padRight, y: points[points.length - 1]?.y ?? 200 },
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

    const areaD = `${pathD} L ${svgW - padRight},200 L ${padLeft},200 Z`;

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
            {activePoint ? `${activePoint.date}: ${activePoint.val} ${unit}` : `${values.reduce((a, b) => a + b, 0)} ${unit}`}
          </span>
        </div>

        {/* High-DPI Waveform Canvas */}
        <div className="relative pt-1.5 pb-0 bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden shadow-2xs">
          <div className="w-full relative">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={themeColor} stopOpacity="0.25" />
                  <stop offset="60%" stopColor={themeColor} stopOpacity="0.08" />
                  <stop offset="100%" stopColor={themeColor} stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* 5 Horizontal Grid Lines & Y-Axis Labels matching Dashboard */}
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
                      className="fill-slate-500 dark:fill-slate-400 font-mono text-[22px] sm:text-[17px] font-extrabold"
                    >
                      {step}{unit === "phút" ? "m" : ""}
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

              {/* Floating Text trực tiếp trên biểu đồ cách dọc 12px khớp 100% Dashboard */}
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
                  onClick={() => setSelectedDayIndex(idx)}
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
                  onClick={() => setSelectedDayIndex(i)}
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

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      
      {/* 1. APP TOP HEADER INTEGRATION */}
      <AppTopHeader
        rightDesktopContent={
          <Link
            href="/study/practice"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            <span>Luyện Tập Ngay +15 XP</span>
          </Link>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={activeTab === "ACTIVITIES"}
            onClick={() => setActiveTab("ACTIVITIES")}
            icon={<BarChart3 className="w-3.5 h-3.5 text-blue-500" />}
            label="Hoạt Động Của Tôi"
          />
          <HeaderPillItem
            active={activeTab === "LEADERBOARD"}
            onClick={() => setActiveTab("LEADERBOARD")}
            icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
            label="Bảng Xếp Hạng XP"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">

        {/* HERO TOP 5 METRIC CARDS BENTO GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          
          {/* CARD 1: STREAK */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-amber-300 dark:hover:border-amber-700/50">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0 shadow-2xs">
              <Flame className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
                {longestStreak} <span className="text-xs font-bold text-slate-500 font-sans">ngày</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">Chuỗi dài nhất</div>
            </div>
          </div>

          {/* CARD 2: SAVED WORDS */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-emerald-300 dark:hover:border-emerald-700/50">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0 shadow-2xs">
              <BookmarkCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
                {savedWords} <span className="text-xs font-bold text-slate-500 font-sans">từ</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">Vốn từ đã tích lũy</div>
            </div>
          </div>

          {/* CARD 3: PRACTICE TIME */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-blue-300 dark:hover:border-blue-700/50">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
                {minutesStudied}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">Thời gian học</div>
            </div>
          </div>

          {/* CARD 4: TOTAL XP */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-purple-300 dark:hover:border-purple-700/50">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Target className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
                {totalXp}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">Tổng điểm tích lũy</div>
            </div>
          </div>

          {/* CARD 5: WEEKLY RANK */}
          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-amber-300 dark:hover:border-amber-700/50">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Trophy className="w-5 h-5 text-amber-500 fill-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
                {weeklyRank} <span className="text-xs font-bold text-slate-500 font-sans">Tuần</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">Hạng của bạn</div>
            </div>
          </div>

        </div>

        {/* 3. TAB VIEWS (ACTIVITIES vs LEADERBOARD) */}
        <AnimatePresence mode="wait">
          {activeTab === "LEADERBOARD" ? (
            <motion.div
              key="leaderboard-container"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                    Bảng Xếp Hạng Thành Tích XP
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Xếp hạng dựa trên tổng điểm kinh nghiệm kiếm được qua các hoạt động học tập
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-xs shrink-0 self-start sm:self-auto shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Cập nhật thời gian thực</span>
                </div>
              </div>

              {isLoadingLeaderboard && leaderboardData.length === 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch animate-pulse">
                  {/* Left Column: Podium Skeleton */}
                  <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
                    <div className="h-4 w-36 mx-auto rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="grid grid-cols-3 gap-2.5 items-end pt-3 pb-1">
                      {/* Top 2 Skeleton */}
                      <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                        <div className="h-4 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                        <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="h-6 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
                      </div>
                      {/* Top 1 Skeleton */}
                      <div className="flex flex-col items-center p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800/50 space-y-2 relative -top-2">
                        <div className="h-4 w-14 rounded-full bg-amber-200 dark:bg-amber-800" />
                        <div className="w-12 h-12 rounded-full bg-amber-200 dark:bg-amber-800" />
                        <div className="h-3.5 w-20 rounded bg-amber-200 dark:bg-amber-800" />
                        <div className="h-7 w-full rounded-lg bg-amber-300 dark:bg-amber-700" />
                      </div>
                      {/* Top 3 Skeleton */}
                      <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                        <div className="h-4 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                        <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="h-6 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: List Skeleton */}
                  <div className="lg:col-span-7 space-y-2">
                    <div className="h-3.5 w-32 rounded bg-slate-200 dark:bg-slate-700 mb-2.5" />
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-5 rounded bg-slate-200 dark:bg-slate-700" />
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                          <div className="space-y-1">
                            <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                            <div className="h-2.5 w-16 rounded bg-slate-100 dark:bg-slate-800" />
                          </div>
                        </div>
                        <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                  
                  {/* LEFT COLUMN: PODIUM TOP 3 (lg:col-span-5) */}
                  <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-slate-50/60 dark:from-amber-500/15 dark:to-slate-900/40 border border-amber-300/40 dark:border-amber-500/20 shadow-2xs space-y-4">
                    <div className="text-center text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider font-display flex items-center justify-center gap-1.5">
                      <Crown className="w-4 h-4 fill-amber-400 text-amber-500" />
                      Top 3 Học Viên Dẫn Đầu
                    </div>

                    {/* 3 PODIUM PILLARS */}
                    <div className="grid grid-cols-3 gap-2.5 items-end pt-3 pb-1">
                      
                      {/* TOP 2: SILVER */}
                      {processedLeaderboard[1] && (() => {
                        const top2 = processedLeaderboard[1];
                        return (
                          <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 text-center space-y-2 shadow-2xs border border-slate-200/90 dark:border-slate-700">
                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center gap-1">
                              <Medal className="w-3 h-3 text-slate-400 fill-slate-300" /> #2
                            </span>
                            <UserAvatar
                              avatarUrl={top2.avatarUrl}
                              emoji={top2.avatarEmoji}
                              name={top2.fullName}
                              size="w-10 h-10 sm:w-12 sm:h-12"
                            />
                            <div className="min-w-0 w-full flex flex-col items-center">
                              <div className="text-xs font-bold text-slate-800 dark:text-white truncate font-display w-full">
                                {top2.fullName}
                              </div>
                              <div className="w-full mt-1.5 py-1 rounded-lg bg-slate-700 dark:bg-slate-850 text-white font-mono font-bold text-[10px] sm:text-[11px] shadow-2xs text-center truncate">
                                {top2.xp?.toLocaleString()} XP
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* TOP 1: GOLD */}
                      {processedLeaderboard[0] && (() => {
                        const top1 = processedLeaderboard[0];
                        return (
                          <div className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-amber-100/90 via-amber-50/80 to-white dark:from-amber-950/80 dark:to-slate-800/95 text-center space-y-2 shadow-md border-2 border-amber-400/80 relative -top-2">
                            <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 px-3 py-0.5 rounded-full bg-amber-200/90 dark:bg-amber-900/90 flex items-center gap-1 shadow-2xs">
                              <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-400" /> TOP 1
                            </span>
                            <UserAvatar
                              avatarUrl={top1.avatarUrl}
                              emoji={top1.avatarEmoji}
                              name={top1.fullName}
                              size="w-12 h-12 sm:w-14 sm:h-14"
                            />
                            <div className="min-w-0 w-full flex flex-col items-center">
                              <div className="text-xs font-black text-amber-950 dark:text-amber-100 truncate font-display w-full">
                                {top1.fullName}
                              </div>
                              <div className="w-full mt-1.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-mono font-black text-xs shadow-md border-t border-amber-300 text-center truncate">
                                {top1.xp?.toLocaleString()} XP
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* TOP 3: BRONZE */}
                      {processedLeaderboard[2] && (() => {
                        const top3 = processedLeaderboard[2];
                        return (
                          <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 text-center space-y-2 shadow-2xs border border-amber-200/80 dark:border-amber-900/50">
                            <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center gap-1">
                              <Award className="w-3 h-3 text-amber-700 fill-amber-600" /> #3
                            </span>
                            <UserAvatar
                              avatarUrl={top3.avatarUrl}
                              emoji={top3.avatarEmoji}
                              name={top3.fullName}
                              size="w-10 h-10 sm:w-12 sm:h-12"
                            />
                            <div className="min-w-0 w-full flex flex-col items-center">
                              <div className="text-xs font-bold text-slate-800 dark:text-white truncate font-display w-full">
                                {top3.fullName}
                              </div>
                              <div className="w-full mt-1.5 py-1 rounded-lg bg-amber-800 text-amber-100 font-mono font-bold text-[10px] sm:text-[11px] shadow-2xs text-center truncate">
                                {top3.xp?.toLocaleString()} XP
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                    </div>
                  </div>

                  {/* RIGHT COLUMN: SCROLLABLE TOP 4+ LIST (lg:col-span-7) */}
                  <div className="lg:col-span-7 flex flex-col min-w-0">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-display">
                      Danh Sách Học Viên Khác
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
                      className="max-h-[320px] sm:max-h-[350px] overflow-y-auto pr-1.5 space-y-2 no-scrollbar"
                    >
                      {processedLeaderboard.slice(3, 3 + visibleLeaderboardCount).map((item, idx) => {
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                              item.isSelf
                                ? "bg-[#0059bb]/10 border-[#0059bb]/40 font-bold shadow-2xs"
                                : "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-6 text-center font-mono font-black text-slate-400 shrink-0 text-xs">
                                #{item.rank}
                              </span>
                              <UserAvatar
                                avatarUrl={item.avatarUrl}
                                emoji={item.avatarEmoji}
                                name={item.fullName}
                                size="w-8 h-8"
                              />
                              <div className="min-w-0">
                                <div className="font-extrabold text-slate-900 dark:text-white truncate font-display flex items-center gap-1.5 text-xs sm:text-sm">
                                  {item.fullName}
                                  {item.isSelf && (
                                    <span className="text-[9.5px] px-1.5 py-0.5 rounded-full bg-[#0059bb] text-white font-black shadow-2xs">Bạn</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                                  <span className="px-1.5 py-0.2 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-mono font-extrabold text-[11px] border border-blue-200/60 dark:border-blue-800/40">
                                    Lv.{item.level || 1}
                                  </span>
                                  <span className="text-slate-300 dark:text-slate-700">•</span>
                                  <span className="truncate">{item.title || "Học viên"}</span>
                                </div>
                              </div>
                            </div>

                            <div className="font-black font-mono text-[#0059bb] dark:text-sky-400 text-xs shrink-0 pl-2">
                              {item.xp?.toLocaleString()} XP
                            </div>
                          </div>
                        );
                      })}

                      {visibleLeaderboardCount < leaderboardData.length - 3 && (
                        <button
                          onClick={() => setVisibleLeaderboardCount((prev) => Math.min(leaderboardData.length, prev + 8))}
                          className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-center text-xs font-bold text-[#0059bb] hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer font-display transition-colors"
                        >
                          Tải thêm thứ hạng tiếp theo...
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
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* SECTION 1: 6-MONTH HEATMAP MATRIX */}
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
                                        onMouseEnter={() => setHoveredHeatmapTile({ dateStr: tile.dateStr, count: tile.count })}
                                        onMouseLeave={() => setHoveredHeatmapTile(null)}
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
              </div>

              {/* SECTION 2: 30-DAY PRACTICE WITH SKILL SWITCHER & LINE CHARTS */}
              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
                
                {/* CARD HEADER & SKILL SWITCHER PILLS (Speed Dock Style matching Dashboard) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40">
                      30 NGÀY
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                      Phân tích thời lượng & XP theo kỹ năng
                    </h3>
                  </div>

                  {/* Mode Switcher Pill Strip matching Dashboard */}
                  <div
                    role="tablist"
                    aria-label="Lựa chọn kỹ năng phân tích biểu đồ"
                    className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1 overflow-x-auto scrollbar-none no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-full shrink-0"
                  >
                    {(
                      [
                        { id: "Dictation" as const, label: "Dictation", Icon: Headphones },
                        { id: "Shadowing" as const, label: "Shadowing", Icon: Mic },
                        { id: "Nói" as const, label: "Nói (AI)", Icon: SpeakingIcon },
                        { id: "Từ vựng" as const, label: "Từ vựng", Icon: BookOpen },
                        { id: "Viết" as const, label: "Viết (AI)", Icon: Wand2 },
                      ] as const
                    ).map((tab) => {
                      const isActive = modeFilter === tab.id;
                      const Icon = tab.Icon;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setModeFilter(tab.id)}
                          className={`relative flex-1 py-1.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 sm:gap-1.5 z-10 select-none ${
                            isActive
                              ? "text-slate-900 dark:text-white shadow-2xs font-extrabold"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeSkillAnalyticsIndicator"
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
                </div>

                {/* DUAL HIGH-DPI DASHBOARD WAVEFORM LINE CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
                  {renderDashboardStyledChart(
                    `Thời lượng luyện tập (${modeFilter})`,
                    activeSkillData.minutes,
                    "MINUTES",
                    currentTheme.color,
                    currentTheme.gradientId,
                    "phút"
                  )}

                  {renderDashboardStyledChart(
                    `Điểm XP tích lũy (${modeFilter})`,
                    activeSkillData.xp,
                    "XP",
                    "#10b981",
                    "xpAnalyticsGradientBig",
                    "XP"
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </PageEntranceWrapper>
  );
}
