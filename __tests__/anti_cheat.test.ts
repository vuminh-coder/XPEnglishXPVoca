import { describe, it, expect } from "vitest";
import { calculateXp, VALID_RESULTS, MatchResult } from "@/shared/utils/xp";
import { calculateExamResult } from "@/features/exam-prep/utils/examScoringEngine";
import { toeicMiniSpeed01Paper } from "@/features/exam-prep/data/exam-papers/toeic_mini_speed_01";
import { toeicLr202601Paper } from "@/features/exam-prep/data/exam-papers/toeic_lr_2026_01";
import { sanitizeInput } from "@/infrastructure/security/validation";

describe("Anti-Cheat & Server-Authoritative Gamification Tests (Task 2)", () => {
  describe("1. Server-Side Exam Grading Verification", () => {
    it("should compute 0% accuracy and lowest score when all user answers are wrong or omitted", () => {
      const wrongAnswers = {};
      const result = calculateExamResult(toeicMiniSpeed01Paper, wrongAnswers, 600);

      expect(result.correctCount).toBe(0);
      expect(result.accuracyPercent).toBe(0);
      expect(result.scaledScore).toBeLessThanOrEqual(50);
      expect(result.xpAwarded).toBe(50); // Base minimum XP
    });

    it("should compute 100% accuracy and maximum score on full 200-question paper", () => {
      const perfectAnswers: Record<string, "A" | "B" | "C" | "D"> = {};
      toeicLr202601Paper.questions.forEach((q) => {
        perfectAnswers[q.id] = q.correctAnswer;
      });

      const result = calculateExamResult(toeicLr202601Paper, perfectAnswers, 7200);

      expect(result.correctCount).toBe(toeicLr202601Paper.questions.length);
      expect(result.accuracyPercent).toBe(100);
      expect(result.scaledScore).toBe(990);
      expect(result.xpAwarded).toBe(100);
    });

    it("should compute 100% accuracy on mini-test with proportional scaled score", () => {
      const perfectAnswers: Record<string, "A" | "B" | "C" | "D"> = {};
      toeicMiniSpeed01Paper.questions.forEach((q) => {
        perfectAnswers[q.id] = q.correctAnswer;
      });

      const result = calculateExamResult(toeicMiniSpeed01Paper, perfectAnswers, 1200);

      expect(result.correctCount).toBe(toeicMiniSpeed01Paper.questions.length);
      expect(result.accuracyPercent).toBe(100);
      expect(result.scaledScore).toBeGreaterThanOrEqual(250);
      expect(result.xpAwarded).toBe(100);
    });

    it("should accurately grade mixed answers regardless of client spoofed scores", () => {
      const halfAnswers: Record<string, "A" | "B" | "C" | "D"> = {};
      const totalQ = toeicMiniSpeed01Paper.questions.length;
      const targetCorrect = Math.floor(totalQ / 2);

      toeicMiniSpeed01Paper.questions.forEach((q, idx) => {
        if (idx < targetCorrect) {
          halfAnswers[q.id] = q.correctAnswer;
        } else {
          // Intentionally wrong choice
          halfAnswers[q.id] = q.correctAnswer === "A" ? "B" : "A";
        }
      });

      const result = calculateExamResult(toeicMiniSpeed01Paper, halfAnswers, 900);

      expect(result.correctCount).toBe(targetCorrect);
      expect(result.accuracyPercent).toBe(Math.round((targetCorrect / totalQ) * 100));
    });
  });

  describe("2. Server-Authoritative PvP Calculations & Cap Enforcement", () => {
    it("should calculate correct XP reward for WIN, DRAW, and LOSE results", () => {
      const winXp = calculateXp("WIN", 100, 50);
      const drawXp = calculateXp("DRAW", 50, 50);
      const loseXp = calculateXp("LOSE", 30, 80);

      expect(winXp).toBeGreaterThan(drawXp);
      expect(drawXp).toBeGreaterThan(loseXp);
      expect(loseXp).toBeGreaterThanOrEqual(0);
    });

    it("should reject invalid match results outside VALID_RESULTS whitelist", () => {
      const invalidResult = "HACKED_WIN";
      expect(VALID_RESULTS.includes(invalidResult as MatchResult)).toBe(false);
    });

    it("should enforce maximum XP cap to prevent glitch flooding", () => {
      const excessiveScoreXp = calculateXp("WIN", 99999, 0);
      const cappedXp = Math.min(50, Math.max(0, excessiveScoreXp));

      expect(cappedXp).toBeLessThanOrEqual(50);
    });
  });

  describe("3. Mass-Assignment & Profile Sanitization Protection", () => {
    it("should sanitize dangerous script payloads in profile fields", () => {
      const maliciousName = '<script>alert("hacked")</script> Nguyễn Văn A';
      const cleanName = sanitizeInput(maliciousName);

      expect(cleanName).not.toContain("<script>");
      expect(cleanName).toContain("&lt;script&gt;");
    });

    it("should trim and format username safely", () => {
      const rawUsername = "  Hacker_Pro!@#$$% 123  ";
      const sanitizedUsername = String(rawUsername)
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9_]/g, "")
        .slice(0, 30);

      expect(sanitizedUsername).toBe("hacker_pro123");
      expect(sanitizedUsername).not.toContain("!");
      expect(sanitizedUsername).not.toContain("@");
    });
  });
});
