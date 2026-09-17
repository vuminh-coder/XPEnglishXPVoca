"use client";
import { useState, useEffect, useMemo } from "react";
import { useUserStore } from "@/stores/userStore";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import {
  get30DaySkillAnalytics,
  get6MonthHeatmapAnalytics,
  modeNameToSkillType,
  hydrateSkillMinutesFromBackend,
} from "@/stores/skillChartStore";
import { SkillMode, AnalyticsTabType, AnalyticsStats, LeaderboardUser } from "../types";
import { SKILL_THEMES } from "../constants";

export function useAnalyticsManager() {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState<AnalyticsTabType>("ACTIVITIES");
  const [modeFilter, setModeFilter] = useState<SkillMode>("Dictation");
  const [apiRank, setApiRank] = useState<string>("#1");

  // Leaderboard state
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState<boolean>(false);
  const [visibleLeaderboardCount, setVisibleLeaderboardCount] = useState<number>(8);

  // Analytics stats state
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState<boolean>(true);
  const [apiStats, setApiStats] = useState<AnalyticsStats | null>(null);

  // Active day index for 30-day line charts (default to index 4 - "Hôm nay")
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(4);

  // Active hover tile for 6-month heatmap
  const [hoveredHeatmapTile, setHoveredHeatmapTile] = useState<{
    dateStr: string;
    count: number;
  } | null>(null);

  const { learned } = useVocabularyStore();

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

    setIsLoadingAnalytics(true);
    fetch("/api/user/analytics")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((res) => {
        if (res.success && res.data) {
          const { stats, series, perSkill, heatmap } = res.data;
          if (stats) {
            setApiStats(stats);
            if (stats.weeklyRank) {
              setApiRank(stats.weeklyRank);
            }
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
      .catch((err) => console.warn("[AnalyticsStore] Error loading analytics API:", err))
      .finally(() => setIsLoadingAnalytics(false));
  }, [user]);

  // Fetch leaderboard data on demand
  useEffect(() => {
    if (activeTab === "LEADERBOARD" && leaderboardData.length === 0) {
      setIsLoadingLeaderboard(true);
      fetch("/api/leaderboard?period=week&limit=50")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((res) => {
          if (res.success && Array.isArray(res.data)) {
            setLeaderboardData(res.data);
          }
        })
        .catch((err) => console.warn("[AnalyticsStore] Error fetching leaderboard:", err))
        .finally(() => setIsLoadingLeaderboard(false));
    }
  }, [activeTab, leaderboardData.length]);

  // Dynamic live savedWords computation
  const savedWords = useMemo(() => {
    const localCount = learned.filter(
      (item) =>
        (item.userId === user?.id || item.userId === "local_user") &&
        (item.isFavorite || (item.proficiency && item.proficiency > 0))
    ).length;
    return Math.max(localCount, user?.wordsLearned || 0, apiStats?.wordsLearned || 0);
  }, [learned, user, apiStats]);

  const longestStreak = useMemo(() => {
    return Math.max(user?.longestStreak || 0, user?.currentStreak || 0, apiStats?.longestStreak || 1);
  }, [user, apiStats]);

  const minutesStudied = useMemo(() => {
    const mins = Math.max(user?.minutesStudied || 0, apiStats?.minutesStudied || 0);
    return `${mins}m`;
  }, [user, apiStats]);

  const totalXp = useMemo(() => {
    const xp = Math.max(user?.totalXp || 0, apiStats?.totalXp || 0);
    return `${xp.toLocaleString()} XP`;
  }, [user, apiStats]);

  const weeklyRank = apiStats?.weeklyRank || apiRank || "#1";

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
  const processedLeaderboard: LeaderboardUser[] = useMemo(() => {
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
      const avatarUrl = isSelf
        ? (userAvatar || item.avatarUrl || item.imageUrl || item.avatar)
        : (item.avatarUrl || item.imageUrl || item.avatar);
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
    const shortMonths = [
      "Th 1", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6",
      "Th 7", "Th 8", "Th 9", "Th 10", "Th 11", "Th 12"
    ];
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

  return {
    user,
    activeTab,
    setActiveTab,
    modeFilter,
    setModeFilter,
    isLoadingAnalytics,
    isLoadingLeaderboard,
    leaderboardData,
    visibleLeaderboardCount,
    setVisibleLeaderboardCount,
    selectedDayIndex,
    setSelectedDayIndex,
    hoveredHeatmapTile,
    setHoveredHeatmapTile,
    dates,
    minutesValues,
    xpValues,
    savedWords,
    longestStreak,
    minutesStudied,
    totalXp,
    weeklyRank,
    activeSkillData,
    heatmapWeeks,
    totalActivities,
    processedLeaderboard,
    monthList,
    currentTheme,
  };
}
