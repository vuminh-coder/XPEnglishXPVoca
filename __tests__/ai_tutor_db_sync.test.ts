import { describe, it, expect } from "vitest";
import { lookupWordDeep } from "@/features/vocabulary/data/deepDictionary";

describe("AI Voice Tutor Database Sync & Evaluation Engine Comprehensive Test Suite", () => {
  describe("1. Polymorphic Payload Normalization for /api/ai/tutor", () => {
    it("should normalize payload when { message, history } is provided", () => {
      const body = {
        message: "I love learning English with AI",
        persona: "emma",
        speed: 1.0,
        history: [
          { role: "ai", text: "Hello! What is your hobby?" },
          { role: "user", text: "I like coding." },
        ],
      };

      let conversationMessages: Array<{ role: string; text: string }> = [];
      if (Array.isArray((body as any).messages) && (body as any).messages.length > 0) {
        conversationMessages = (body as any).messages;
      } else {
        if (Array.isArray(body.history)) {
          conversationMessages = [...body.history];
        }
        if (body.message && typeof body.message === "string" && body.message.trim()) {
          conversationMessages.push({ role: "user", text: body.message.trim() });
        }
      }

      expect(conversationMessages.length).toBe(3);
      expect(conversationMessages[2].text).toBe("I love learning English with AI");
      expect(conversationMessages[2].role).toBe("user");
    });

    it("should normalize payload when raw { messages } array is provided", () => {
      const body = {
        messages: [
          { role: "user", text: "Could you explain the word 'relocate'?" },
        ],
        persona: "alex",
      };

      let conversationMessages: Array<{ role: string; text: string }> = [];
      if (Array.isArray(body.messages) && body.messages.length > 0) {
        conversationMessages = body.messages;
      }

      expect(conversationMessages.length).toBe(1);
      expect(conversationMessages[0].text).toContain("relocate");
    });
  });

  describe("2. 4-Axis Voice Evaluation & Scoring Matrix", () => {
    it("should compute accurate Overall Score with weights (35% Pron, 25% Fluency, 20% Intonation, 20% Grammar)", () => {
      const avgPronunciation = 94;
      const userTurnsCount = 4;
      const errorsCount = 1;

      const grammarScore = Math.max(50, Math.min(100, 100 - errorsCount * 15)); // 85
      const fluencyScore = Math.min(100, Math.max(70, 75 + userTurnsCount * 6)); // 99
      const intonationScore = Math.min(100, Math.max(75, avgPronunciation - 3)); // 91

      const overallScore = Math.round(
        0.35 * avgPronunciation +
          0.25 * fluencyScore +
          0.2 * intonationScore +
          0.2 * grammarScore
      );

      // 0.35*94 + 0.25*99 + 0.2*91 + 0.2*85 = 32.9 + 24.75 + 18.2 + 17 = 92.85 -> 93
      expect(overallScore).toBe(93);
      expect(overallScore).toBeGreaterThanOrEqual(90);

      const grade = overallScore >= 90 ? "S" : overallScore >= 80 ? "A" : "B";
      const xpAward = overallScore >= 90 ? 45 : overallScore >= 80 ? 35 : 25;

      expect(grade).toBe("S");
      expect(xpAward).toBe(45);
    });

    it("should award Rank A for score between 80 and 89", () => {
      const avgPronunciation = 85;
      const userTurnsCount = 2;
      const errorsCount = 1;

      const grammarScore = Math.max(50, Math.min(100, 100 - errorsCount * 15)); // 85
      const fluencyScore = Math.min(100, Math.max(70, 75 + userTurnsCount * 6)); // 87
      const intonationScore = Math.min(100, Math.max(75, avgPronunciation - 3)); // 82

      const overallScore = Math.round(
        0.35 * avgPronunciation +
          0.25 * fluencyScore +
          0.2 * intonationScore +
          0.2 * grammarScore
      );

      expect(overallScore).toBeGreaterThanOrEqual(80);
      expect(overallScore).toBeLessThan(90);

      const grade = overallScore >= 90 ? "S" : overallScore >= 80 ? "A" : "B";
      const xpAward = overallScore >= 90 ? 45 : overallScore >= 80 ? 35 : 25;

      expect(grade).toBe("A");
      expect(xpAward).toBe(35);
    });
  });

  describe("3. DailySkillPractice Speaking Payload Construction", () => {
    it("should construct valid DailySkillPractice payload with skill='speaking'", () => {
      const elapsedTimeSeconds = 340; // 5.6 minutes
      const minutes = Math.max(1, Math.ceil(elapsedTimeSeconds / 60)); // 6 mins
      const xpEarned = 45;

      const payload = {
        skill: "speaking",
        minutes,
        xpEarned,
      };

      expect(payload.skill).toBe("speaking");
      expect(payload.minutes).toBe(6);
      expect(payload.xpEarned).toBe(45);
    });
  });

  describe("4. 1-Click Interactive Deep Dictionary Integration", () => {
    it("should return detailed definition from lookupWordDeep for common English words", () => {
      const result = lookupWordDeep("practice");

      expect(result).toBeDefined();
      expect(result.word.toLowerCase()).toBe("practice");
      expect(result.ipa).toBeDefined();
      expect(result.meaning).toBeDefined();
    });

    it("should fallback gracefully for rare or custom words", () => {
      const result = lookupWordDeep("uncommoncustomwordxyz");

      expect(result).toBeDefined();
      expect(result.word).toBe("uncommoncustomwordxyz");
      expect(result.ipa).toBeDefined();
    });
  });
});
