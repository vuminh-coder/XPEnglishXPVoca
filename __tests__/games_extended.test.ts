import { describe, it, expect } from "vitest";

describe("Extended Mini Games Suite (Word Blitz, Sentence Scramble, Word Chain AI)", () => {
  describe("1. Word Blitz Game Logic", () => {
    it("correctly matches case-insensitive typed input against falling words", () => {
      const falling = [
        { id: "1", word: "CHALLENGE" },
        { id: "2", word: "FOCUS" },
      ];

      const matchWord = (typed: string) =>
        falling.find((w) => w.word === typed.trim().toUpperCase());

      expect(matchWord("focus")).toEqual({ id: "2", word: "FOCUS" });
      expect(matchWord("challenge")).toEqual({ id: "1", word: "CHALLENGE" });
      expect(matchWord("wrong")).toBeUndefined();
    });

    it("calculates combo multiplier points accurately", () => {
      const calcPoints = (combo: number) => {
        const mult = combo >= 5 ? 3 : combo >= 3 ? 2 : 1;
        return 10 * mult;
      };

      expect(calcPoints(1)).toBe(10);
      expect(calcPoints(2)).toBe(10);
      expect(calcPoints(3)).toBe(20);
      expect(calcPoints(4)).toBe(20);
      expect(calcPoints(5)).toBe(30);
      expect(calcPoints(10)).toBe(30);
    });

    it("decrements lives when a falling word crosses the bottom deadline", () => {
      let lives = 3;
      const simulateDeadline = (y: number) => {
        if (y >= 88) {
          lives = Math.max(0, lives - 1);
        }
      };

      simulateDeadline(50);
      expect(lives).toBe(3);

      simulateDeadline(89);
      expect(lives).toBe(2);

      simulateDeadline(95);
      simulateDeadline(99);
      expect(lives).toBe(0);
    });
  });

  describe("2. Sentence Scramble Grammar Builder Logic", () => {
    it("validates reconstructed sentence tokens correctly", () => {
      const target = "She often reads books in the evening.";
      const validTokens = ["She", "often", "reads", "books", "in", "the", "evening."];
      const invalidTokens = ["often", "She", "reads", "books", "in", "the", "evening."];

      const verifyTokens = (tokens: string[]) =>
        tokens.join(" ").trim().toLowerCase() === target.trim().toLowerCase();

      expect(verifyTokens(validTokens)).toBe(true);
      expect(verifyTokens(invalidTokens)).toBe(false);
    });

    it("ensures scrambled tokens set contains the exact same elements as the target sentence", () => {
      const targetTokens = ["She", "decided", "to", "study", "abroad", "in", "Canada."];
      const scrambled = [...targetTokens].sort(() => 0.5 - Math.random());

      expect(scrambled.length).toBe(targetTokens.length);
      targetTokens.forEach((tok) => {
        expect(scrambled).toContain(tok);
      });
    });
  });

  describe("3. Word Chain AI Validation Rules", () => {
    const validateWordChain = (
      word: string,
      previousWord: string,
      usedWords: string[]
    ) => {
      const clean = word.trim().toUpperCase();
      if (clean.length < 3) return { valid: false, reason: "Too short" };
      if (usedWords.includes(clean)) return { valid: false, reason: "Duplicate" };
      const requiredChar = previousWord[previousWord.length - 1].toUpperCase();
      if (clean[0] !== requiredChar) return { valid: false, reason: "Wrong initial letter" };
      return { valid: true };
    };

    it("accepts valid chained word with correct initial letter", () => {
      const res = validateWordChain("NATURE", "LEARN", ["LEARN"]);
      expect(res.valid).toBe(true);
    });

    it("rejects word if initial letter does not match previous last letter", () => {
      const res = validateWordChain("ENERGY", "LEARN", ["LEARN"]);
      expect(res.valid).toBe(false);
      expect(res.reason).toBe("Wrong initial letter");
    });

    it("rejects words that have already been played in the round", () => {
      const res = validateWordChain("NATURE", "LEARN", ["LEARN", "NATURE"]);
      expect(res.valid).toBe(false);
      expect(res.reason).toBe("Duplicate");
    });

    it("rejects words shorter than 3 characters", () => {
      const res = validateWordChain("NO", "LEARN", ["LEARN"]);
      expect(res.valid).toBe(false);
      expect(res.reason).toBe("Too short");
    });
  });
});
