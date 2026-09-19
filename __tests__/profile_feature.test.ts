import { describe, it, expect } from "vitest";
import { getXpProgress } from "@/shared/utils/calculateXP";
import { formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { LEVEL_TITLES } from "@/shared/constants";
import { AVAILABLE_EMOJIS } from "@/features/profile";

describe("Profile Feature Suite & /analytics Style Alignment Tests", () => {
  describe("1. Level, XP Progress & Vocab Percentage Calculations", () => {
    it("should compute accurate XP progress for level 1 learner", () => {
      const { current, total, percent } = getXpProgress(1, 50);
      expect(total).toBeGreaterThan(0);
      expect(current).toBeLessThanOrEqual(total);
      expect(percent).toBe(50);
    });

    it("should round fractional XP percentages to at most 2 decimal places", () => {
      // Level 2: prev = 100, next = 250 -> total = 150
      // xp = 120 -> current = 20 -> 20 / 150 * 100 = 13.333333333333334%
      const { current, total, percent } = getXpProgress(2, 120);
      expect(total).toBe(150);
      expect(current).toBe(20);
      expect(percent).toBe(13.33);

      // Level 2: xp = 150 -> current = 50 -> 50 / 150 * 100 = 33.333333333333336%
      const res50 = getXpProgress(2, 150);
      expect(res50.percent).toBe(33.33);
    });

    it("should correctly compute vocabulary mastery percentage", () => {
      const computeVocabPercent = (words: number) =>
        Math.min(100, Math.round((words / 3903) * 100)) || 0;

      expect(computeVocabPercent(0)).toBe(0);
      expect(computeVocabPercent(390)).toBe(10);
      expect(computeVocabPercent(1951)).toBe(50);
      expect(computeVocabPercent(3903)).toBe(100);
      expect(computeVocabPercent(5000)).toBe(100); // capped at 100
    });

    it("should resolve valid level titles from LEVEL_TITLES map", () => {
      expect(LEVEL_TITLES[1]).toBeDefined();
      expect(typeof LEVEL_TITLES[1]).toBe("string");
    });
  });

  describe("2. Clean Name Normalization for Profile Header", () => {
    it("should format email-based usernames cleanly without raw @domain", () => {
      expect(formatCleanName("nguyenvana@gmail.com")).toBe("Nguyenvana");
      expect(formatCleanName("vuminh.coder@yahoo.com")).toBe("Vuminh Coder");
      expect(formatCleanName("Học viên XP")).toBe("Học viên XP");
    });
  });

  describe("3. Achievement Filtering Logic", () => {
    const mockAchievements = [
      { id: "a1", name: "Huy hiệu 1", unlocked: true },
      { id: "a2", name: "Huy hiệu 2", unlocked: false },
      { id: "a3", name: "Huy hiệu 3", unlocked: true },
      { id: "a4", name: "Huy hiệu 4", unlocked: false },
    ];

    it("should return all achievements when filter is 'all'", () => {
      const filtered = mockAchievements.filter(() => true);
      expect(filtered.length).toBe(4);
    });

    it("should return only unlocked achievements when filter is 'unlocked'", () => {
      const filtered = mockAchievements.filter((a) => a.unlocked);
      expect(filtered.length).toBe(2);
      expect(filtered.every((a) => a.unlocked)).toBe(true);
    });

    it("should return only locked achievements when filter is 'locked'", () => {
      const filtered = mockAchievements.filter((a) => !a.unlocked);
      expect(filtered.length).toBe(2);
      expect(filtered.every((a) => !a.unlocked)).toBe(true);
    });
  });

  describe("4. Avatar Emoji Selection & Cosmetic Equipment", () => {
    it("should include 8 diverse, premium emojis", () => {
      expect(AVAILABLE_EMOJIS.length).toBe(8);
      expect(AVAILABLE_EMOJIS).toContain("🦉");
      expect(AVAILABLE_EMOJIS).toContain("👑");
      expect(AVAILABLE_EMOJIS).toContain("⚡");
    });
  });
});
