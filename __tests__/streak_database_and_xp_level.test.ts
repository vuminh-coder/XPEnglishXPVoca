import { describe, it, expect, beforeEach } from "vitest";
import {
  getLocalDateString,
  calculateStreakFromActiveDates,
} from "@/shared/utils/dateUtils";
import { LEVEL_XP, LEVEL_TITLES } from "@/shared/constants";

describe("Streak Database Calculation & Multi-Level XP Progression Standards", () => {
  describe("1. calculateStreakFromActiveDates (Server-Authoritative Streak Engine)", () => {
    const baseDate = new Date(2026, 9, 17); // 2026-10-17

    it("should compute consecutive streak when user learned today and previous 3 days", () => {
      const activeDates = new Set([
        "2026-10-17",
        "2026-10-16",
        "2026-10-15",
        "2026-10-14",
      ]);

      const result = calculateStreakFromActiveDates(activeDates, baseDate, 0);

      expect(result.currentStreak).toBe(4);
      expect(result.freezesConsumed).toBe(0);
      expect(result.isLearnedToday).toBe(true);
    });

    it("should keep streak alive from yesterday when user has not learned today yet", () => {
      const activeDates = new Set([
        "2026-10-16",
        "2026-10-15",
        "2026-10-14",
      ]);

      const result = calculateStreakFromActiveDates(activeDates, baseDate, 0);

      expect(result.currentStreak).toBe(3);
      expect(result.freezesConsumed).toBe(0);
      expect(result.isLearnedToday).toBe(false);
    });

    it("should use streak freeze to bridge 1 missed day when user learned today", () => {
      // Missed yesterday 2026-10-16, but has 1 freeze
      const activeDates = new Set([
        "2026-10-17",
        "2026-10-15",
        "2026-10-14",
      ]);

      const result = calculateStreakFromActiveDates(activeDates, baseDate, 1);

      expect(result.currentStreak).toBe(3);
      expect(result.freezesConsumed).toBe(1);
      expect(result.isLearnedToday).toBe(true);
    });

    it("should reset streak to 1 if yesterday was missed and user has 0 streak freezes", () => {
      const activeDates = new Set([
        "2026-10-17",
        "2026-10-15",
        "2026-10-14",
      ]);

      const result = calculateStreakFromActiveDates(activeDates, baseDate, 0);

      expect(result.currentStreak).toBe(1);
      expect(result.freezesConsumed).toBe(0);
      expect(result.isLearnedToday).toBe(true);
    });

    it("should return streak 0 if user did not learn today, did not learn yesterday, and has 0 freezes", () => {
      const activeDates = new Set([
        "2026-10-15",
        "2026-10-14",
      ]);

      const result = calculateStreakFromActiveDates(activeDates, baseDate, 0);

      expect(result.currentStreak).toBe(0);
      expect(result.isLearnedToday).toBe(false);
    });

    it("should protect yesterday with freeze when user has not studied today yet", () => {
      // Missed yesterday (10-16), studied on 10-15, has 1 freeze
      const activeDates = new Set([
        "2026-10-15",
        "2026-10-14",
      ]);

      const result = calculateStreakFromActiveDates(activeDates, baseDate, 1);

      expect(result.currentStreak).toBe(2);
      expect(result.freezesConsumed).toBe(1);
      expect(result.isLearnedToday).toBe(false);
    });
  });

  describe("2. Multi-Level Level-Up Progression Math", () => {
    it("should correctly calculate multi-level jump from Level 1 to Level 4 upon receiving 600 XP", () => {
      // LEVEL_XP = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200, 7600, 9200, 11000]
      // Initial: Level 1, 0 XP
      // Add: 600 XP (exceeds 100 -> Lv2, exceeds 250 -> Lv3, exceeds 450 -> Lv4, below 700)
      const newXp = 600;
      let newLevel = 1;
      let levelUp = false;
      let levelUpCoins = 0;

      while (newLevel < LEVEL_XP.length && newXp >= LEVEL_XP[newLevel]) {
        newLevel++;
        levelUp = true;
        levelUpCoins += 100 * newLevel;
      }

      expect(levelUp).toBe(true);
      expect(newLevel).toBe(4);
      // Coins: Lv2 (+200) + Lv3 (+300) + Lv4 (+400) = 900
      expect(levelUpCoins).toBe(900);
      expect(LEVEL_TITLES[newLevel]).toBe("Student");
    });

    it("should handle single level up correctly", () => {
      // Level 1 (50 XP), receives 80 XP -> total 130 XP
      const newXp = 130;
      let newLevel = 1;
      let levelUp = false;
      let levelUpCoins = 0;

      while (newLevel < LEVEL_XP.length && newXp >= LEVEL_XP[newLevel]) {
        newLevel++;
        levelUp = true;
        levelUpCoins += 100 * newLevel;
      }

      expect(levelUp).toBe(true);
      expect(newLevel).toBe(2);
      expect(levelUpCoins).toBe(200);
      expect(LEVEL_TITLES[newLevel]).toBe("Beginner");
    });

    it("should not level up if threshold is not reached", () => {
      const newXp = 90;
      let newLevel = 1;
      let levelUp = false;
      let levelUpCoins = 0;

      while (newLevel < LEVEL_XP.length && newXp >= LEVEL_XP[newLevel]) {
        newLevel++;
        levelUp = true;
        levelUpCoins += 100 * newLevel;
      }

      expect(levelUp).toBe(false);
      expect(newLevel).toBe(1);
      expect(levelUpCoins).toBe(0);
    });
  });
});
