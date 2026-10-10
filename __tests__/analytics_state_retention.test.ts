import { describe, it, expect, beforeEach } from "vitest";
import {
  useAnalyticsCatalogStore,
  DEFAULT_ANALYTICS_SESSION,
  INITIAL_ANALYTICS_CACHE,
} from "@/stores/analyticsCatalogStore";

describe("Analytics Page State Retention & 0ms Instant Render Architecture", () => {
  beforeEach(() => {
    useAnalyticsCatalogStore.getState().resetSession();
    useAnalyticsCatalogStore.setState({
      cache: { ...INITIAL_ANALYTICS_CACHE },
      isLoadingAnalytics: false,
      isLoadingLeaderboard: false,
    });
  });

  describe("Session Initialization & Defaults", () => {
    it("should initialize with default analytics session", () => {
      const { session } = useAnalyticsCatalogStore.getState();
      expect(session).toEqual(DEFAULT_ANALYTICS_SESSION);
      expect(session.activeTab).toBe("ACTIVITIES");
      expect(session.modeFilter).toBe("Dictation");
      expect(session.selectedDayIndex).toBe(4);
      expect(session.visibleLeaderboardCount).toBe(8);
    });
  });

  describe("Tab & Skill Mode Filter Retention", () => {
    it("should retain activeTab (LEADERBOARD) across tab navigation", () => {
      useAnalyticsCatalogStore.getState().setSession({ activeTab: "LEADERBOARD" });
      expect(useAnalyticsCatalogStore.getState().session.activeTab).toBe("LEADERBOARD");

      useAnalyticsCatalogStore.getState().setSession({ activeTab: "ACTIVITIES" });
      expect(useAnalyticsCatalogStore.getState().session.activeTab).toBe("ACTIVITIES");
    });

    it("should retain modeFilter (Shadowing, Từ vựng, etc.) across route switching", () => {
      useAnalyticsCatalogStore.getState().setSession({ modeFilter: "Shadowing" });
      expect(useAnalyticsCatalogStore.getState().session.modeFilter).toBe("Shadowing");

      useAnalyticsCatalogStore.getState().setSession({ modeFilter: "Từ vựng" });
      expect(useAnalyticsCatalogStore.getState().session.modeFilter).toBe("Từ vựng");

      useAnalyticsCatalogStore.getState().setSession({ modeFilter: "Viết" });
      expect(useAnalyticsCatalogStore.getState().session.modeFilter).toBe("Viết");
    });

    it("should retain selectedDayIndex and visibleLeaderboardCount", () => {
      useAnalyticsCatalogStore.getState().setSession({
        selectedDayIndex: 2,
        visibleLeaderboardCount: 16,
      });

      const { session } = useAnalyticsCatalogStore.getState();
      expect(session.selectedDayIndex).toBe(2);
      expect(session.visibleLeaderboardCount).toBe(16);
    });
  });

  describe("RAM Cache Retention (0ms Instant Display)", () => {
    it("should cache analytics stats and series in memory", () => {
      useAnalyticsCatalogStore.getState().setCacheData({
        stats: {
          currentStreak: 5,
          longestStreak: 12,
          minutesStudied: 120,
          totalXp: 3500,
          weeklyRank: "#3",
        },
        dates: ["1/10", "2/10", "3/10"],
        minutesValues: [25, 40, 55],
        timestamp: Date.now(),
      });

      const { cache } = useAnalyticsCatalogStore.getState();
      expect(cache.stats).toBeDefined();
      expect(cache.stats?.totalXp).toBe(3500);
      expect(cache.stats?.weeklyRank).toBe("#3");
      expect(cache.dates).toEqual(["1/10", "2/10", "3/10"]);
      expect(cache.minutesValues).toEqual([25, 40, 55]);
    });

    it("should cache leaderboard data in memory", () => {
      const mockLeaderboard = [
        { id: "u1", fullName: "Minh Vu", xp: 1200, level: 5 },
        { id: "u2", fullName: "Alice", xp: 950, level: 4 },
      ];

      useAnalyticsCatalogStore.getState().setCacheData({
        leaderboard: mockLeaderboard,
        leaderboardTimestamp: Date.now(),
      });

      const { cache } = useAnalyticsCatalogStore.getState();
      expect(cache.leaderboard).toHaveLength(2);
      expect(cache.leaderboard[0].fullName).toBe("Minh Vu");
    });
  });

  describe("Session Reset", () => {
    it("should reset session back to default state", () => {
      useAnalyticsCatalogStore.getState().setSession({
        activeTab: "LEADERBOARD",
        modeFilter: "Nói",
        selectedDayIndex: 1,
        visibleLeaderboardCount: 24,
      });

      useAnalyticsCatalogStore.getState().resetSession();
      expect(useAnalyticsCatalogStore.getState().session).toEqual(DEFAULT_ANALYTICS_SESSION);
    });
  });
});
