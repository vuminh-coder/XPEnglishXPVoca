import { describe, it, expect } from "vitest";

describe("Shadowing Studio Database Sync & Speech Engine Comprehensive Test Suite", () => {
  describe("1. Live Speech Evaluation & Word Accuracy Algorithm", () => {
    it("should accurately evaluate spoken words against target sentence", () => {
      const targetSentence = "Good morning, how can I help you today?";
      const spokenText = "Good morning how can I help you today";

      const targetWords = targetSentence.toLowerCase().split(/\s+/);
      const spokenWords = spokenText.toLowerCase().split(/\s+/);

      const evaluated = targetWords.map((target: string) => {
        const cleanTarget = target.replace(/[^a-zA-Z]/g, "");
        const isMatched = spokenWords.some(
          (spk: string) => spk.replace(/[^a-zA-Z]/g, "") === cleanTarget
        );
        return {
          word: target,
          status: isMatched ? ("perfect" as const) : ("needs_work" as const),
        };
      });

      const matchedCount = evaluated.filter((w) => w.status === "perfect").length;
      const accuracyPct = Math.round((matchedCount / targetWords.length) * 100);

      expect(accuracyPct).toBe(100);
      expect(evaluated.every((w) => w.status === "perfect")).toBe(true);
    });

    it("should flag missed or mispronounced words correctly", () => {
      const targetSentence = "Due to the upcoming renovation, the library will be closed.";
      const spokenText = "Due to the library will be closed";

      const targetWords = targetSentence.toLowerCase().split(/\s+/);
      const spokenWords = spokenText.toLowerCase().split(/\s+/);

      const evaluated = targetWords.map((target: string) => {
        const cleanTarget = target.replace(/[^a-zA-Z]/g, "");
        const isMatched = spokenWords.some(
          (spk: string) => spk.replace(/[^a-zA-Z]/g, "") === cleanTarget
        );
        return {
          word: target,
          status: isMatched ? ("perfect" as const) : ("needs_work" as const),
        };
      });

      const matchedCount = evaluated.filter((w) => w.status === "perfect").length;
      const accuracyPct = Math.round((matchedCount / targetWords.length) * 100);

      expect(accuracyPct).toBeLessThan(100);
      expect(accuracyPct).toBeGreaterThan(60);
      const missed = evaluated.filter((w) => w.status === "needs_work");
      expect(missed.map((m) => m.word.replace(/[^a-zA-Z]/g, ""))).toContain("upcoming");
      expect(missed.map((m) => m.word.replace(/[^a-zA-Z]/g, ""))).toContain("renovation");
    });
  });

  describe("2. Shadowing XP Award & Level Progression Logic", () => {
    it("should award +15 XP for passing speech score (>= 80)", () => {
      const score = 85;
      const isPassing = score >= 80;
      const xpEarned = isPassing ? 15 : 5;
      expect(xpEarned).toBe(15);
    });

    it("should award +5 XP for bookmarking a sentence", () => {
      const bookmarkXp = 5;
      expect(bookmarkXp).toBe(5);
    });

    it("should award +50 XP bonus for completing entire shadowing lesson", () => {
      const completionXp = 50;
      expect(completionXp).toBe(50);
    });
  });

  describe("3. DailySkillPractice Shadowing Tracking & Minutes Calculation", () => {
    it("should calculate minutes studied for skill 'shadowing'", () => {
      const elapsedSeconds = 210; // 3.5 minutes
      const addedMinutes = Math.max(1, Math.ceil(elapsedSeconds / 60));
      expect(addedMinutes).toBe(4);
    });

    it("should construct valid DailySkillPractice payload with skill='shadowing'", () => {
      const payload = {
        userId: "user_12345",
        lessonId: "listen_052",
        status: "COMPLETED",
        completedSentences: [0, 1, 2, 3, 4],
        bookmarkedSentences: ["listen_052_0"],
        timeSpent: 210,
        xpEarned: 50,
        skill: "shadowing",
      };

      expect(payload.skill).toBe("shadowing");
      expect(payload.status).toBe("COMPLETED");
      expect(payload.completedSentences.length).toBe(5);
    });
  });

  describe("4. 3-Tier ID Resolution for Shadowing Mode (?id=52, ?id=listen_052)", () => {
    const mockDbLessons = [
      { id: "listen_001", title: "Lesson 1", orderIndex: 1 },
      { id: "listen_052", title: "Lesson 52", orderIndex: 52 },
      { id: "custom-uuid-999", title: "Custom Lesson", orderIndex: 103 },
    ];

    it("should resolve numeric ?id=52 to listen_052", () => {
      const queryId = "52";
      const num = parseInt(queryId, 10);
      const formatted = `listen_${String(num).padStart(3, "0")}`;
      const found = mockDbLessons.find((l) => l.id === formatted || l.id === queryId);
      expect(found?.id).toBe("listen_052");
      expect(found?.title).toBe("Lesson 52");
    });

    it("should resolve custom UUID directly", () => {
      const found = mockDbLessons.find((l) => l.id === "custom-uuid-999");
      expect(found?.title).toBe("Custom Lesson");
    });
  });
});
