import { create } from "zustand";
import {
  SkillMode,
  AnalyticsTabType,
  AnalyticsStats,
} from "@/features/analytics/types";

export const ANALYTICS_CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes

export interface AnalyticsCatalogSession {
  activeTab: AnalyticsTabType;
  modeFilter: SkillMode;
  selectedDayIndex: number | null;
  visibleLeaderboardCount: number;
}

export const DEFAULT_ANALYTICS_SESSION: AnalyticsCatalogSession = {
  activeTab: "ACTIVITIES",
  modeFilter: "Dictation",
  selectedDayIndex: 4,
  visibleLeaderboardCount: 8,
};

export interface AnalyticsCacheData {
  stats: AnalyticsStats | null;
  dates: string[];
  minutesValues: number[];
  xpValues: number[];
  perSkill: any;
  heatmap: { weeks: any[][]; totalActivities: number } | null;
  leaderboard: any[];
  timestamp: number;
  leaderboardTimestamp: number;
}

export const INITIAL_ANALYTICS_CACHE: AnalyticsCacheData = {
  stats: null,
  dates: ["26/7", "31/7", "5/8", "10/8", "Hôm nay", "17/8", "20/8", "24/8"],
  minutesValues: [0, 0, 0, 0, 0, 0, 0, 0],
  xpValues: [0, 0, 0, 0, 0, 0, 0, 0],
  perSkill: null,
  heatmap: null,
  leaderboard: [],
  timestamp: 0,
  leaderboardTimestamp: 0,
};

export interface AnalyticsCatalogStoreState {
  session: AnalyticsCatalogSession;
  cache: AnalyticsCacheData;
  isLoadingAnalytics: boolean;
  isLoadingLeaderboard: boolean;

  // Session Actions
  setSession: (session: Partial<AnalyticsCatalogSession>) => void;
  resetSession: () => void;

  // Cache Actions
  setCacheData: (data: Partial<AnalyticsCacheData>) => void;
  fetchAnalyticsData: (options?: { forceRefresh?: boolean }) => Promise<void>;
  fetchLeaderboardData: (options?: { forceRefresh?: boolean }) => Promise<void>;
}

export const useAnalyticsCatalogStore = create<AnalyticsCatalogStoreState>((set, get) => ({
  session: { ...DEFAULT_ANALYTICS_SESSION },
  cache: { ...INITIAL_ANALYTICS_CACHE },
  isLoadingAnalytics: false,
  isLoadingLeaderboard: false,

  setSession: (session) =>
    set((state) => ({
      session: { ...state.session, ...session },
    })),

  resetSession: () =>
    set({
      session: { ...DEFAULT_ANALYTICS_SESSION },
    }),

  setCacheData: (data) =>
    set((state) => ({
      cache: { ...state.cache, ...data },
    })),

  fetchAnalyticsData: async (options = {}) => {
    const { forceRefresh = false } = options;
    const { cache } = get();

    const hasCache = cache.stats !== null;
    const isStale = Date.now() - cache.timestamp > ANALYTICS_CACHE_TTL_MS;

    // Cache hit: 0ms Instant Return
    if (hasCache && !isStale && !forceRefresh) {
      return;
    }

    // Background revalidation
    if (hasCache && isStale && !forceRefresh) {
      if (typeof window !== "undefined") {
        fetch("/api/user/analytics")
          .then((res) => (res.ok ? res.json() : null))
          .then((res) => {
            if (res?.success && res.data) {
              const { stats, series, perSkill, heatmap } = res.data;
              set((state) => ({
                cache: {
                  ...state.cache,
                  stats: stats || state.cache.stats,
                  dates: series?.dates && series.dates.length > 0 ? series.dates : state.cache.dates,
                  minutesValues: series?.minutesSeries || state.cache.minutesValues,
                  xpValues: series?.xpSeries || state.cache.xpValues,
                  perSkill: perSkill || state.cache.perSkill,
                  heatmap: heatmap || state.cache.heatmap,
                  timestamp: Date.now(),
                },
              }));
            }
          })
          .catch((err) => {
            console.warn("[AnalyticsStore] Background revalidation:", err);
          });
      }
      return;
    }

    // Initial fetch / forced refresh
    try {
      if (!hasCache) {
        set({ isLoadingAnalytics: true });
      }
      if (typeof window !== "undefined") {
        const res = await fetch("/api/user/analytics");
        if (res.ok) {
          const json = await res.json();
          if (json?.success && json.data) {
            const { stats, series, perSkill, heatmap } = json.data;
            set((state) => ({
              cache: {
                ...state.cache,
                stats: stats || state.cache.stats,
                dates: series?.dates && series.dates.length > 0 ? series.dates : state.cache.dates,
                minutesValues: series?.minutesSeries || state.cache.minutesValues,
                xpValues: series?.xpSeries || state.cache.xpValues,
                perSkill: perSkill || state.cache.perSkill,
                heatmap: heatmap || state.cache.heatmap,
                timestamp: Date.now(),
              },
            }));
          }
        }
      }
    } catch (err) {
      console.warn("[AnalyticsStore] Initial fetch fallback:", err);
    } finally {
      set({ isLoadingAnalytics: false });
    }
  },

  fetchLeaderboardData: async (options = {}) => {
    const { forceRefresh = false } = options;
    const { cache } = get();

    const hasCache = cache.leaderboard.length > 0;
    const isStale = Date.now() - cache.leaderboardTimestamp > ANALYTICS_CACHE_TTL_MS;

    if (hasCache && !isStale && !forceRefresh) {
      return;
    }

    if (hasCache && isStale && !forceRefresh) {
      if (typeof window !== "undefined") {
        fetch("/api/leaderboard?period=week&limit=50")
          .then((res) => (res.ok ? res.json() : null))
          .then((res) => {
            if (res?.success && Array.isArray(res.data)) {
              set((state) => ({
                cache: {
                  ...state.cache,
                  leaderboard: res.data,
                  leaderboardTimestamp: Date.now(),
                },
              }));
            }
          })
          .catch((err) => {
            console.warn("[AnalyticsStore] Leaderboard revalidate notice:", err);
          });
      }
      return;
    }

    try {
      if (!hasCache) {
        set({ isLoadingLeaderboard: true });
      }
      if (typeof window !== "undefined") {
        const res = await fetch("/api/leaderboard?period=week&limit=50");
        if (res.ok) {
          const json = await res.json();
          if (json?.success && Array.isArray(json.data)) {
            set((state) => ({
              cache: {
                ...state.cache,
                leaderboard: json.data,
                leaderboardTimestamp: Date.now(),
              },
            }));
          }
        }
      }
    } catch (err) {
      console.warn("[AnalyticsStore] Leaderboard fetch fallback:", err);
    } finally {
      set({ isLoadingLeaderboard: false });
    }
  },
}));
