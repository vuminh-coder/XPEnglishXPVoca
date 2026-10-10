import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  useDashboardStore,
  getInitialDashboardOverviewProbe,
  getInitialDashboardFiltersProbe,
  getInitialLeaderboardProbe,
} from "../stores/dashboardStore";

describe("Dashboard State Retention & Frame-0 Probe (Page 10: /dashboard)", () => {
  let localStoreMap: Record<string, string> = {};
  let sessionStoreMap: Record<string, string> = {};

  const localStorageMock = {
    getItem: (key: string) => localStoreMap[key] || null,
    setItem: (key: string, value: string) => {
      localStoreMap[key] = String(value);
    },
    removeItem: (key: string) => {
      delete localStoreMap[key];
    },
    clear: () => {
      localStoreMap = {};
    },
  };

  const sessionStorageMock = {
    getItem: (key: string) => sessionStoreMap[key] || null,
    setItem: (key: string, value: string) => {
      sessionStoreMap[key] = String(value);
    },
    removeItem: (key: string) => {
      delete sessionStoreMap[key];
    },
    clear: () => {
      sessionStoreMap = {};
    },
  };

  beforeEach(() => {
    localStoreMap = {};
    sessionStoreMap = {};
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = localStorageMock;
    (globalThis as any).sessionStorage = sessionStorageMock;

    useDashboardStore.getState().resetDashboardState();
  });

  afterEach(() => {
    localStoreMap = {};
    sessionStoreMap = {};
  });

  describe("1. useDashboardStore Core State Management", () => {
    it("should initialize with default filters and empty cache", () => {
      const state = useDashboardStore.getState();
      expect(state.overview).toBeNull();
      expect(state.leaderboardCache).toEqual({});
      expect(state.filters.activeSkillTab).toBe("dictation");
      expect(state.filters.selectedDayIndex).toBe(4);
      expect(state.filters.leaderboardTab).toBe("week");
      expect(state.filters.leaderboardCriterion).toBe("time");
      expect(state.filters.showAnnouncement).toBe(true);
    });

    it("should store and update overview in RAM store", () => {
      const mockOverview = {
        checkin: {
          isCheckedInToday: true,
          activeDaysInWeek: ["2026-10-10", "2026-10-11"],
          currentStreak: 5,
          longestStreak: 12,
          totalXp: 1540,
          coins: 280,
          wordsLearned: 95,
          minutesStudied: 120,
        },
        challenges: [{ id: "c1", title: "Luyện 10 từ", isClaimed: true }],
        studyPlan: { todayTask: "Chép chính tả bài 3" },
      };

      useDashboardStore.getState().setOverview(mockOverview);
      const state = useDashboardStore.getState();
      expect(state.overview?.checkin?.currentStreak).toBe(5);
      expect(state.overview?.challenges?.length).toBe(1);
      expect(state.overview?.studyPlan?.todayTask).toBe("Chép chính tả bài 3");
      expect(state.overview?.updatedAt).toBeGreaterThan(0);
    });

    it("should persist filter updates to localStorage", () => {
      useDashboardStore.getState().setFilter({
        activeSkillTab: "speaking",
        leaderboardTab: "month",
        leaderboardCriterion: "xp",
        showAnnouncement: false,
      });

      const state = useDashboardStore.getState();
      expect(state.filters.activeSkillTab).toBe("speaking");
      expect(state.filters.leaderboardTab).toBe("month");
      expect(state.filters.leaderboardCriterion).toBe("xp");
      expect(state.filters.showAnnouncement).toBe(false);

      const savedJson = localStorageMock.getItem("xp_dashboard_filters");
      expect(savedJson).toBeTruthy();
      const parsed = JSON.parse(savedJson!);
      expect(parsed.activeSkillTab).toBe("speaking");
      expect(parsed.showAnnouncement).toBe(false);
    });
  });

  describe("2. Frame-0 Instant Overview Probe (0ms Render, Zero Skeleton Flash)", () => {
    it("should return hasData: false when neither RAM nor localStorage has data", () => {
      const probe = getInitialDashboardOverviewProbe("user_123");
      expect(probe.hasData).toBe(false);
      expect(probe.overview).toBeNull();
    });

    it("should probe instantly from RAM store when switching tabs back to Dashboard", () => {
      const mockOverview = {
        checkin: {
          isCheckedInToday: true,
          activeDaysInWeek: ["2026-10-11"],
          currentStreak: 7,
          longestStreak: 10,
          totalXp: 2100,
          coins: 450,
          wordsLearned: 150,
          minutesStudied: 180,
        },
        challenges: [{ id: "c1", isClaimed: false }],
        studyPlan: { todayTask: "Học 5 từ mới" },
      };

      useDashboardStore.getState().setOverview(mockOverview);

      // Probe at Frame-0
      const probe = getInitialDashboardOverviewProbe("user_123");
      expect(probe.hasData).toBe(true);
      expect(probe.overview?.checkin?.currentStreak).toBe(7);
      expect(probe.overview?.studyPlan?.todayTask).toBe("Học 5 từ mới");
    });

    it("should fallback to localStorage probe synchronously at Frame-0 on page reload", () => {
      const mockOverview = {
        checkin: {
          isCheckedInToday: false,
          activeDaysInWeek: ["2026-10-10"],
          currentStreak: 3,
          longestStreak: 5,
          totalXp: 800,
          coins: 100,
          wordsLearned: 50,
          minutesStudied: 45,
        },
        challenges: [{ id: "c1", isClaimed: true }],
      };

      localStorageMock.setItem(
        "xp_voca_dashboard_overview_user_abc",
        JSON.stringify(mockOverview)
      );

      // Verify RAM is empty before probe
      expect(useDashboardStore.getState().overview).toBeNull();

      const probe = getInitialDashboardOverviewProbe("user_abc");
      expect(probe.hasData).toBe(true);
      expect(probe.overview?.checkin?.currentStreak).toBe(3);

      // Also verifies probe auto-hydrated the RAM Zustand store
      expect(useDashboardStore.getState().overview?.checkin?.currentStreak).toBe(3);
    });
  });

  describe("3. Frame-0 Filters & Leaderboard Probe", () => {
    it("should load persisted filters from localStorage at Frame-0", () => {
      localStorageMock.setItem(
        "xp_dashboard_filters",
        JSON.stringify({
          activeSkillTab: "listening",
          selectedDayIndex: 2,
          leaderboardTab: "month",
          leaderboardCriterion: "xp",
          showAnnouncement: false,
        })
      );

      const probe = getInitialDashboardFiltersProbe();
      expect(probe.activeSkillTab).toBe("listening");
      expect(probe.selectedDayIndex).toBe(2);
      expect(probe.leaderboardTab).toBe("month");
      expect(probe.leaderboardCriterion).toBe("xp");
      expect(probe.showAnnouncement).toBe(false);
    });

    it("should probe leaderboard data synchronously from RAM or sessionStorage", () => {
      const mockLeaders = [
        { id: "u1", fullName: "User 1", xp: 1200, computedMinutes: 120 },
        { id: "u2", fullName: "User 2", xp: 950, computedMinutes: 95 },
      ];

      // 1. Session storage test
      sessionStorageMock.setItem(
        "xp_voca_lb_week_time",
        JSON.stringify(mockLeaders)
      );

      const probe = getInitialLeaderboardProbe("week", "time");
      expect(probe.hasData).toBe(true);
      expect(probe.data.length).toBe(2);
      expect(probe.data[0].fullName).toBe("User 1");

      // 2. RAM cache check for month_xp
      useDashboardStore.getState().setLeaderboardData("month_xp", [
        { id: "u3", fullName: "Top Monthly", xp: 5000 },
      ]);

      const ramProbe = getInitialLeaderboardProbe("month", "xp");
      expect(ramProbe.hasData).toBe(true);
      expect(ramProbe.data[0].fullName).toBe("Top Monthly");
    });
  });

  describe("4. Optimistic Updates & Inter-Tab Context Retention", () => {
    it("should retain updated check-in state when user switches tabs and returns", () => {
      // User checks in
      const baseOverview = {
        checkin: {
          isCheckedInToday: false,
          activeDaysInWeek: ["2026-10-10"],
          currentStreak: 4,
          longestStreak: 10,
          totalXp: 1000,
          coins: 100,
          wordsLearned: 50,
          minutesStudied: 60,
        },
        challenges: [],
      };
      useDashboardStore.getState().setOverview(baseOverview);

      // Optimistic Check-in performed
      const current = useDashboardStore.getState().overview!;
      useDashboardStore.getState().setOverview({
        ...current,
        checkin: {
          ...current.checkin!,
          isCheckedInToday: true,
          activeDaysInWeek: [...current.checkin!.activeDaysInWeek, "2026-10-11"],
          currentStreak: current.checkin!.currentStreak + 1,
        },
      });

      // User navigates away to Dictation and returns to Dashboard:
      const frame0Probe = getInitialDashboardOverviewProbe("user_any");
      expect(frame0Probe.hasData).toBe(true);
      expect(frame0Probe.overview?.checkin?.isCheckedInToday).toBe(true);
      expect(frame0Probe.overview?.checkin?.currentStreak).toBe(5);
      expect(frame0Probe.overview?.checkin?.activeDaysInWeek).toContain("2026-10-11");
    });

    it("should retain claimed challenge status seamlessly across tab switches", () => {
      const baseChallenges = [
        { id: "task_1", title: "Học 5 từ", isClaimed: false },
        { id: "task_2", title: "Luyện phát âm", isClaimed: false },
      ];
      useDashboardStore.getState().setOverview({
        challenges: baseChallenges,
      });

      // User claims task_1
      const state = useDashboardStore.getState();
      const updatedChallenges = state.overview!.challenges!.map((c) =>
        c.id === "task_1" ? { ...c, isClaimed: true } : c
      );
      useDashboardStore.getState().setOverview({
        ...state.overview!,
        challenges: updatedChallenges,
      });

      // Tab switch probe test
      const probe = getInitialDashboardOverviewProbe();
      expect(probe.overview?.challenges?.find((c) => c.id === "task_1")?.isClaimed).toBe(true);
      expect(probe.overview?.challenges?.find((c) => c.id === "task_2")?.isClaimed).toBe(false);
    });
  });
});
