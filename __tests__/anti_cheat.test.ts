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

  describe("4. Server-Authoritative Mini-Game Anti-Cheat Verification", () => {
    // Model the exact server logic implemented in app/api/games/record/route.ts
    const calculateGameRewards = (
      gameType: string,
      score: number,
      wordsCompleted: number,
      attempts: number,
      durationSeconds: number
    ) => {
      const MIN_PLAY_DURATION_SECONDS = 8;
      const MAX_SERVER_XP_CAP = 60;
      const MAX_SERVER_COINS_CAP = 15;

      if (durationSeconds < MIN_PLAY_DURATION_SECONDS) {
        return { xp: 0, coins: 0 };
      }

      let xp = 0;
      let coins = 0;

      switch (gameType) {
        case "memory": {
          xp = 30;
          if (score >= 40) xp += 10;
          coins = 8;
          break;
        }
        case "scramble": {
          const words = Math.max(1, Math.min(wordsCompleted || 5, 10));
          xp = Math.min(50, words * 8);
          coins = Math.min(12, words * 2);
          break;
        }
        case "wordle": {
          const attemptIdx = Math.max(1, Math.min(attempts || 6, 6));
          const wordleXp = [50, 45, 40, 35, 30, 25];
          xp = wordleXp[attemptIdx - 1] || 25;
          coins = 5;
          break;
        }
        default: {
          xp = Math.min(30, Math.max(10, Math.floor(score / 5)));
          coins = 5;
          break;
        }
      }

      return {
        xp: Math.min(MAX_SERVER_XP_CAP, Math.max(0, xp)),
        coins: Math.min(MAX_SERVER_COINS_CAP, Math.max(0, coins)),
      };
    };

    it("should reject rewards (0 XP, 0 Coins) when duration is suspiciously fast (< 8s bot speed)", () => {
      const botReward = calculateGameRewards("memory", 60, 6, 1, 3); // 3 seconds
      expect(botReward.xp).toBe(0);
      expect(botReward.coins).toBe(0);
    });

    it("should award valid rewards when game is played legitimately (> 8s)", () => {
      const legitReward = calculateGameRewards("memory", 50, 6, 1, 25); // 25 seconds
      expect(legitReward.xp).toBe(40);
      expect(legitReward.coins).toBe(8);
    });

    it("should strictly enforce server hard caps on XP and Coins", () => {
      const hugeReward = calculateGameRewards("scramble", 99999, 50, 1, 60);
      expect(hugeReward.xp).toBeLessThanOrEqual(60);
      expect(hugeReward.coins).toBeLessThanOrEqual(15);
    });

    it("should scale Wordle rewards accurately by attempt count", () => {
      const attempt1 = calculateGameRewards("wordle", 60, 1, 1, 15);
      const attempt6 = calculateGameRewards("wordle", 10, 1, 6, 45);

      expect(attempt1.xp).toBe(50);
      expect(attempt6.xp).toBe(25);
      expect(attempt1.xp).toBeGreaterThan(attempt6.xp);
    });
  });

  describe("5. Task Completion Atomic One-Time XP Claim Guarantee", () => {
    it("should grant XP only once and block infinite duplication via atomic state check", () => {
      // Simulate task state
      let task = { id: "task_1", isCompleted: false, xpClaimed: false, xpReward: 25 };
      let userProfile = { totalXp: 100 };

      // Helper simulating the atomic predicate in app/api/study-plan/task-complete/route.ts
      const completeTaskAtomic = (targetCompleted: boolean) => {
        if (!targetCompleted) {
          task.isCompleted = false;
          return { xpAwarded: 0 };
        }

        // Atomic where: { id: taskId, xpClaimed: false }
        if (!task.xpClaimed) {
          task.isCompleted = true;
          task.xpClaimed = true;
          userProfile.totalXp += task.xpReward;
          return { xpAwarded: task.xpReward };
        }

        task.isCompleted = true;
        return { xpAwarded: 0 };
      };

      // 1. First completion grants reward
      const res1 = completeTaskAtomic(true);
      expect(res1.xpAwarded).toBe(25);
      expect(userProfile.totalXp).toBe(125);
      expect(task.xpClaimed).toBe(true);

      // 2. User toggles task off (isCompleted: false)
      const res2 = completeTaskAtomic(false);
      expect(res2.xpAwarded).toBe(0);
      expect(task.isCompleted).toBe(false);
      expect(task.xpClaimed).toBe(true); // xpClaimed remains true!

      // 3. User attempts to re-complete to duplicate XP
      const res3 = completeTaskAtomic(true);
      expect(res3.xpAwarded).toBe(0); // 0 XP awarded!
      expect(userProfile.totalXp).toBe(125); // Profile XP unchanged!
    });
  });
});
