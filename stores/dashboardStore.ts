import { create } from "zustand";
import { SkillType } from "./skillChartStore";

export interface DashboardOverviewCache {
  checkin?: {
    isCheckedInToday: boolean;
    activeDaysInWeek: string[];
    currentStreak: number;
    longestStreak: number;
    totalXp: number;
    coins: number;
    wordsLearned: number;
    minutesStudied: number;
  };
  challenges?: any[];
  studyPlan?: {
    todayTask: string | null;
  };
  skillPractice?: any;
  updatedAt?: number;
}

export interface DashboardFiltersState {
  activeSkillTab: SkillType;
  selectedDayIndex: number | null;
  leaderboardTab: "week" | "month";
  leaderboardCriterion: "time" | "xp";
  showAnnouncement: boolean;
}

interface DashboardStoreState {
  overview: DashboardOverviewCache | null;
  leaderboardCache: Record<string, { data: any[]; updatedAt: number }>;
  filters: DashboardFiltersState;
  isFiltersHydrated: boolean;

  // Actions
  setOverview: (overview: DashboardOverviewCache) => void;
  setLeaderboardData: (key: string, data: any[]) => void;
  setFilter: (filterPartial: Partial<DashboardFiltersState>) => void;
  resetDashboardState: () => void;
}

const DEFAULT_DASHBOARD_FILTERS: DashboardFiltersState = {
  activeSkillTab: "dictation",
  selectedDayIndex: 4,
  leaderboardTab: "week",
  leaderboardCriterion: "time",
  showAnnouncement: true,
};

// ─── Frame 0 Fast Probe Helpers ───

export function getInitialDashboardOverviewProbe(userId?: string): {
  overview: DashboardOverviewCache | null;
  hasData: boolean;
} {
  // 1. RAM Store probe
  const ramOverview = useDashboardStore.getState().overview;
  if (ramOverview && (ramOverview.checkin || ramOverview.challenges?.length || ramOverview.studyPlan)) {
    return { overview: ramOverview, hasData: true };
  }

  // 2. Synchronous client localStorage probe (Frame-0 fallback)
  if (typeof window !== "undefined") {
    try {
      const cacheKey = `xp_voca_dashboard_overview_${userId || "guest"}`;
      const localStr = localStorage.getItem(cacheKey);
      if (localStr) {
        const parsed = JSON.parse(localStr);
        if (parsed && (parsed.checkin || parsed.challenges?.length || parsed.studyPlan)) {
          useDashboardStore.getState().setOverview(parsed);
          return { overview: parsed, hasData: true };
        }
      }
    } catch {}
  }

  return { overview: null, hasData: false };
}

export function getInitialDashboardFiltersProbe(): DashboardFiltersState {
  const isHydrated = useDashboardStore.getState().isFiltersHydrated;
  if (isHydrated) {
    return useDashboardStore.getState().filters;
  }

  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("xp_dashboard_filters");
      if (saved) {
        const parsed = JSON.parse(saved);
        const filters = { ...DEFAULT_DASHBOARD_FILTERS, ...parsed };
        useDashboardStore.setState({ filters, isFiltersHydrated: true });
        return filters;
      }
    } catch {}
  }

  useDashboardStore.setState({ isFiltersHydrated: true });
  return useDashboardStore.getState().filters;
}

export function getInitialLeaderboardProbe(
  tab: "week" | "month",
  criterion: "time" | "xp"
): { data: any[]; hasData: boolean } {
  const lbKey = `${tab}_${criterion}`;
  const ramLb = useDashboardStore.getState().leaderboardCache[lbKey];
  if (ramLb && Array.isArray(ramLb.data) && ramLb.data.length > 0) {
    return { data: ramLb.data, hasData: true };
  }

  if (typeof window !== "undefined") {
    try {
      const sessionKey = `xp_voca_lb_${tab}_${criterion}`;
      const raw = sessionStorage.getItem(sessionKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          useDashboardStore.getState().setLeaderboardData(lbKey, parsed);
          return { data: parsed, hasData: true };
        }
      }
    } catch {}
  }

  return { data: [], hasData: false };
}

export const useDashboardStore = create<DashboardStoreState>((set) => ({
  overview: null,
  leaderboardCache: {},
  filters: DEFAULT_DASHBOARD_FILTERS,
  isFiltersHydrated: false,

  setOverview: (overview) =>
    set({
      overview: {
        ...overview,
        updatedAt: Date.now(),
      },
    }),

  setLeaderboardData: (key, data) =>
    set((state) => ({
      leaderboardCache: {
        ...state.leaderboardCache,
        [key]: { data, updatedAt: Date.now() },
      },
    })),

  setFilter: (filterPartial) =>
    set((state) => {
      const updated = { ...state.filters, ...filterPartial };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("xp_dashboard_filters", JSON.stringify(updated));
        } catch {}
      }
      return { filters: updated, isFiltersHydrated: true };
    }),

  resetDashboardState: () =>
    set({
      overview: null,
      leaderboardCache: {},
      filters: DEFAULT_DASHBOARD_FILTERS,
      isFiltersHydrated: false,
    }),
}));
