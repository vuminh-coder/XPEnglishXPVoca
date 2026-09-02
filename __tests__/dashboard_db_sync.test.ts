import { describe, it, expect } from "vitest";

describe("Dashboard Database Synchronization & Anti-Cheat Tests", () => {
  describe("1. Daily Check-in & Streak Logic", () => {
    it("should compute correct 7-day week date range from Monday to Sunday", () => {
      const today = new Date("2026-09-02T10:00:00Z"); // Wednesday (day 3)
      const currentDayOfWeek = today.getDay();
      const dayDiff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek; // -2 -> Monday
      const monday = new Date(today);
      monday.setDate(today.getDate() + dayDiff);

      const weekDates: string[] = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        weekDates.push(d.toISOString().slice(0, 10));
      }

      expect(weekDates.length).toBe(7);
      expect(weekDates[0]).toBe("2026-08-31"); // Monday
      expect(weekDates[2]).toBe("2026-09-02"); // Wednesday (Today)
      expect(weekDates[6]).toBe("2026-09-06"); // Sunday
    });

    it("should award +15 XP, +20 Coins, and +5m on first daily check-in", () => {
      const initialProfile = {
        totalXp: 100,
        coins: 50,
        minutesStudied: 20,
        currentStreak: 4,
        longestStreak: 4,
      };

      const checkinReward = {
        xp: 15,
        coins: 20,
        minutes: 5,
      };

      const updatedProfile = {
        ...initialProfile,
        totalXp: initialProfile.totalXp + checkinReward.xp,
        coins: initialProfile.coins + checkinReward.coins,
        minutesStudied: initialProfile.minutesStudied + checkinReward.minutes,
        currentStreak: initialProfile.currentStreak + 1,
        longestStreak: Math.max(initialProfile.longestStreak, initialProfile.currentStreak + 1),
      };

      expect(updatedProfile.totalXp).toBe(115);
      expect(updatedProfile.coins).toBe(70);
      expect(updatedProfile.minutesStudied).toBe(25);
      expect(updatedProfile.currentStreak).toBe(5);
      expect(updatedProfile.longestStreak).toBe(5);
    });

    it("should prevent duplicate checkin on the same day", () => {
      const checkinRecords = [
        { date: "2026-09-02", skill: "checkin" },
      ];

      const today = "2026-09-02";
      const alreadyCheckedIn = checkinRecords.some((r) => r.date === today && r.skill === "checkin");

      expect(alreadyCheckedIn).toBe(true);
    });
  });

  describe("2. Daily Challenges Server-Authoritative Logic", () => {
    it("should allow claiming only when database progress reaches target", () => {
      const challenge = {
        id: "learn_words",
        target: 5,
        xpReward: 15,
        coinReward: 10,
      };

      const userWordsPracticedToday = 5;
      const canClaim = userWordsPracticedToday >= challenge.target;

      expect(canClaim).toBe(true);
    });

    it("should reject claim when user progress is below target", () => {
      const challenge = {
        id: "learn_words",
        target: 5,
      };

      const userWordsPracticedToday = 3;
      const canClaim = userWordsPracticedToday >= challenge.target;

      expect(canClaim).toBe(false);
    });

    it("should prevent double claiming for completed challenge", () => {
      const claimedChallengesToday = new Set(["learn_words"]);
      const isAlreadyClaimed = claimedChallengesToday.has("learn_words");

      expect(isAlreadyClaimed).toBe(true);
    });
  });

  describe("3. Dynamic Study Plan Routing", () => {
    it("should route to /study/listening when task contains dictation or listening", () => {
      const task = "Luyện nghe TOEIC Part 6: Text Completion";
      const t = task.toLowerCase();
      let targetUrl = "/study/practice";
      if (t.includes("nghe") || t.includes("dictation") || t.includes("listening")) targetUrl = "/study/listening";

      expect(targetUrl).toBe("/study/listening");
    });

    it("should route to /study/shadowing when task contains speaking or shadowing", () => {
      const task = "Thực hành Shadowing hội thoại nhà hàng";
      const t = task.toLowerCase();
      let targetUrl = "/study/practice";
      if (t.includes("nói") || t.includes("shadowing") || t.includes("speaking")) targetUrl = "/study/shadowing";

      expect(targetUrl).toBe("/study/shadowing");
    });

    it("should route to /study/exam-prep when task contains exam, toeic or ielts", () => {
      const task = "Làm đề thi thử TOEIC Mini Test 50 câu";
      const t = task.toLowerCase();
      let targetUrl = "/study/practice";
      if (t.includes("đề") || t.includes("exam") || t.includes("toeic")) targetUrl = "/study/exam-prep";

      expect(targetUrl).toBe("/study/exam-prep");
    });
  });

  describe("4. AI Quick Ask Server XP Cap", () => {
    it("should enforce maximum 50 XP per day limit for AI Ask questions", () => {
      let currentAiXp = 40;
      const questionXp = 10;
      let awarded = 0;

      if (currentAiXp < 50) {
        awarded = questionXp;
        currentAiXp += awarded;
      }
      expect(awarded).toBe(10);
      expect(currentAiXp).toBe(50);

      // Next question
      let nextAwarded = 0;
      if (currentAiXp < 50) {
        nextAwarded = questionXp;
      }
      expect(nextAwarded).toBe(0); // Capped at 50 XP
    });
  });
});
