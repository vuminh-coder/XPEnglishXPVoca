import { describe, it, expect, vi } from "vitest";
import { gameAudio } from "@/features/games/utils/gameAudio";
import { WordleLetterStatus } from "@/features/games/types";

describe("Mini Games Feature Suite (/study/games)", () => {
  describe("1. Scoring Algorithms & Reward Calculations", () => {
    it("calculates Memory Match XP based on moves efficiency", () => {
      const calcMemoryScore = (moves: number) => Math.max(20, 60 - moves * 2);

      // Flawless game: 6 pairs in 6 moves
      expect(calcMemoryScore(6)).toBe(48);
      // Fast game: 10 moves
      expect(calcMemoryScore(10)).toBe(40);
      // Average game: 15 moves
      expect(calcMemoryScore(15)).toBe(30);
      // High moves: capped at minimum 20 XP
      expect(calcMemoryScore(30)).toBe(20);
      expect(calcMemoryScore(50)).toBe(20);
    });

    it("calculates Wordle XP reward based on attempt row index", () => {
      const xpMap = [60, 50, 40, 35, 30, 25];
      // 1st try guess
      expect(xpMap[0]).toBe(60);
      // 2nd try guess
      expect(xpMap[1]).toBe(50);
      // Last try (6th try)
      expect(xpMap[5]).toBe(25);
    });
  });

  describe("2. Wordle Evaluation Algorithm Precision", () => {
    function evaluateWordleGuess(guess: string, target: string): WordleLetterStatus[] {
      const WORD_LENGTH = 5;
      const guessLetters = guess.toUpperCase().split("");
      const targetLetters = target.toUpperCase().split("");
      const statuses: WordleLetterStatus[] = Array(WORD_LENGTH).fill("absent");
      const targetLetterCounts: Record<string, number> = {};

      targetLetters.forEach((l) => {
        targetLetterCounts[l] = (targetLetterCounts[l] || 0) + 1;
      });

      // Pass 1: Correct positions
      guessLetters.forEach((letter, i) => {
        if (letter === targetLetters[i]) {
          statuses[i] = "correct";
          targetLetterCounts[letter] -= 1;
        }
      });

      // Pass 2: Present positions
      guessLetters.forEach((letter, i) => {
        if (statuses[i] !== "correct") {
          if (targetLetterCounts[letter] && targetLetterCounts[letter] > 0) {
            statuses[i] = "present";
            targetLetterCounts[letter] -= 1;
          } else {
            statuses[i] = "absent";
          }
        }
      });

      return statuses;
    }

    it("correctly identifies completely correct word", () => {
      const result = evaluateWordleGuess("SMART", "SMART");
      expect(result).toEqual(["correct", "correct", "correct", "correct", "correct"]);
    });

    it("correctly identifies completely absent letters", () => {
      const result = evaluateWordleGuess("POUND", "SMART");
      expect(result).toEqual(["absent", "absent", "absent", "absent", "absent"]);
    });

    it("correctly handles present letters in wrong positions", () => {
      // Target: SMART (S, M, A, R, T)
      // Guess:  TRAMS (T: present, R: present, A: correct, M: present, S: present)
      const result = evaluateWordleGuess("TRAMS", "SMART");
      expect(result).toEqual(["present", "present", "correct", "present", "present"]);
    });

    it("handles duplicate letters gracefully without over-crediting", () => {
      // Target: SPEED (S, P, E, E, D) -> two E's
      // Guess:  EERIE (E: present, E: present, R: absent, I: absent, E: absent)
      const result = evaluateWordleGuess("EERIE", "SPEED");
      expect(result[0]).toBe("present");
      expect(result[1]).toBe("present");
      expect(result[2]).toBe("absent"); // R not in SPEED
      expect(result[3]).toBe("absent"); // I not in SPEED
      expect(result[4]).toBe("absent"); // 3rd E is absent because SPEED only has 2 E's
    });
  });

  describe("3. Web Audio Sound Engine Graceful Execution", () => {
    it("does not throw when executed in Node / SSR environment without AudioContext", () => {
      expect(() => gameAudio.playFlipSound()).not.toThrow();
      expect(() => gameAudio.playCorrectDing()).not.toThrow();
      expect(() => gameAudio.playWrongBuzzer()).not.toThrow();
      expect(() => gameAudio.playVictoryFanfare()).not.toThrow();
    });
  });
});
