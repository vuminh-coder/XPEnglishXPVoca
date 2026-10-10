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
import { useAnalyticsCatalogStore } from "@/stores/analyticsCatalogStore";
import { SkillMode, AnalyticsTabType, AnalyticsStats, LeaderboardUser } from "../types";
import { SKILL_THEMES } from "../constants";

export function useAnalyticsManager() {
  const { user } = useUserStore();

  // Frame 0 Session Probes from in-memory catalog store
  const [activeTab, setActiveTabState] = useState<AnalyticsTabType>(() => {
    return useAnalyticsCatalogStore.getState().session.activeTab || "ACTIVITIES";
  });
  const setActiveTab = (tab: AnalyticsTabType) => {
    setActiveTabState(tab);
    useAnalyticsCatalogStore.getState().setSession({ activeTab: tab });
  };

  const [modeFilter, setModeFilterState] = useState<SkillMode>(() => {
    return useAnalyticsCatalogStore.getState().session.modeFilter || "Dictation";
  });
  const setModeFilter = (mode: SkillMode) => {
    setModeFilterState(mode);
    useAnalyticsCatalogStore.getState().setSession({ modeFilter: mode });
  };

  const [apiRank, setApiRank] = useState<string>(() => {
    return useAnalyticsCatalogStore.getState().cache.stats?.weeklyRank || "#1";
  });

  // Active day index for 30-day line charts
  const [selectedDayIndex, setSelectedDayIndexState] = useState<number | null>(() => {
    return useAnalyticsCatalogStore.getState().session.selectedDayIndex ?? 4;
  });
  const setSelectedDayIndex = (idx: number | null) => {
    setSelectedDayIndexState(idx);
    useAnalyticsCatalogStore.getState().setSession({ selectedDayIndex: idx });
  };

  // Visible leaderboard count
  const [visibleLeaderboardCount, setVisibleLeaderboardCountState] = useState<number>(() => {
    return useAnalyticsCatalogStore.getState().session.visibleLeaderboardCount || 8;
  });
  const setVisibleLeaderboardCount = (updater: React.SetStateAction<number>) => {
    setVisibleLeaderboardCountState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      useAnalyticsCatalogStore.getState().setSession({ visibleLeaderboardCount: next });
      return next;
    });
  };

  // Active hover tile for 6-month heatmap
  const [hoveredHeatmapTile, setHoveredHeatmapTile] = useState<{
    dateStr: string;
    count: number;
  } | null>(null);

  const { learned } = useVocabularyStore();

  // Frame 0 Cached Data from RAM Store
  const initialCache = useAnalyticsCatalogStore.getState().cache;
  const [leaderboardData, setLeaderboardData] = useState<any[]>(() => initialCache.leaderboard);
  const [apiStats, setApiStats] = useState<AnalyticsStats | null>(() => initialCache.stats);
  const [dates, setDates] = useState<string[]>(() => initialCache.dates);
  const [minutesValues, setMinutesValues] = useState<number[]>(() => initialCache.minutesValues);
  const [xpValues, setXpValues] = useState<number[]>(() => initialCache.xpValues);
  const [apiPerSkillData, setApiPerSkillData] = useState<any>(() => initialCache.perSkill);
  const [apiHeatmapData, setApiHeatmapData] = useState<{ weeks: any[][]; totalActivities: number } | null>(
    () => initialCache.heatmap
  );

  const storeLoadingAnalytics = useAnalyticsCatalogStore((s) => s.isLoadingAnalytics);
  const storeLoadingLeaderboard = useAnalyticsCatalogStore((s) => s.isLoadingLeaderboard);

  // Sync cache changes to local view
  const storeCache = useAnalyticsCatalogStore((s) => s.cache);
  useEffect(() => {
    if (storeCache.stats) {
      setApiStats(storeCache.stats);
      if (storeCache.stats.weeklyRank) setApiRank(storeCache.stats.weeklyRank);
    }
    if (storeCache.dates && storeCache.dates.length > 0) setDates(storeCache.dates);
    if (storeCache.minutesValues) setMinutesValues(storeCache.minutesValues);
    if (storeCache.xpValues) setXpValues(storeCache.xpValues);
    if (storeCache.perSkill) setApiPerSkillData(storeCache.perSkill);
    if (storeCache.heatmap) setApiHeatmapData(storeCache.heatmap);
    if (storeCache.leaderboard && storeCache.leaderboard.length > 0) setLeaderboardData(storeCache.leaderboard);
  }, [storeCache]);

  // Fetch / SWR revalidate analytics data
  useEffect(() => {
    if (user?.id) {
      hydrateSkillMinutesFromBackend(user.id);
    }
    useAnalyticsCatalogStore.getState().fetchAnalyticsData();
  }, [user?.id]);

  // Fetch / SWR revalidate leaderboard data on demand
  useEffect(() => {
    if (activeTab === "LEADERBOARD") {
      useAnalyticsCatalogStore.getState().fetchLeaderboardData();
    }
  }, [activeTab]);

  // Instant render: Only show loading if cache is completely empty and currently fetching
  const isLoadingAnalytics = storeLoadingAnalytics && apiStats === null;
  const isLoadingLeaderboard = storeLoadingLeaderboard && leaderboardData.length === 0;

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
