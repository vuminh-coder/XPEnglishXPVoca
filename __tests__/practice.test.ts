import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock localStorage for test environment
class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

const localStorage = new LocalStorageMock();
global.window = {
  localStorage,
} as any;
global.localStorage = localStorage;

const BOOKMARK_KEY = "xp_bookmarked_words";

function getBookmarkedWords(): string[] {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  } catch {
    return [];
  }
}

function toggleBookmark(wordId: string): boolean {
  const current = getBookmarkedWords();
  const idx = current.indexOf(wordId);
  if (idx >= 0) {
    current.splice(idx, 1);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(current));
    return false; // removed
  } else {
    current.push(wordId);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(current));
    return true; // added
  }
}

describe("Practice Session Quiz Logic", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Bookmark Storage Logic", () => {
    it("should start with empty bookmarked words list", () => {
      expect(getBookmarkedWords()).toEqual([]);
    });

    it("should bookmark a word id and save it to localStorage", () => {
      const added = toggleBookmark("vocab_123");
      expect(added).toBe(true);
      expect(getBookmarkedWords()).toEqual(["vocab_123"]);
    });

    it("should remove bookmark when toggling an already bookmarked word id", () => {
      toggleBookmark("vocab_123");
      const removed = toggleBookmark("vocab_123");
      expect(removed).toBe(false);
      expect(getBookmarkedWords()).toEqual([]);
    });

    it("should manage multiple bookmarked word ids", () => {
      toggleBookmark("vocab_1");
      toggleBookmark("vocab_2");
      expect(getBookmarkedWords()).toEqual(["vocab_1", "vocab_2"]);

      toggleBookmark("vocab_1");
      expect(getBookmarkedWords()).toEqual(["vocab_2"]);
    });
  });

  describe("Answer Evaluation & XP Logic", () => {
    // Simulated state machine corresponding to the page logic
    interface State {
      consecutiveWrong: number;
      qXp: number;
      qScore: number;
      isAnswered: boolean;
      selectedOpt: string | null;
      toasts: Array<{ type: string; title: string }>;
    }

    const initialPageState = (): State => ({
      consecutiveWrong: 0,
      qXp: 0,
      qScore: 0,
      isAnswered: false,
      selectedOpt: null,
      toasts: [],
    });

    const handleQuizAnswer = (
      state: State,
      optId: string,
      correctId: string
    ) => {
      if (state.isAnswered) return state;
      state.selectedOpt = optId;
      state.isAnswered = true;

      const isCorrect = optId === correctId;
      if (isCorrect) {
        state.qXp += 15;
        state.qScore += 1;
        state.consecutiveWrong = 0;
      } else {
        const newStreak = state.consecutiveWrong + 1;
        state.consecutiveWrong = newStreak;

        if (newStreak >= 3) {
          state.qXp -= 10;
          state.consecutiveWrong = 0; // reset streak after penalty
          state.toasts.push({
            type: "warning",
            title: "Mất 10 XP!",
          });
        }
      }

      return state;
    };

    it("should award +15 XP and increment score on correct answer", () => {
      let state = initialPageState();
      state = handleQuizAnswer(state, "option_a", "option_a");

      expect(state.isAnswered).toBe(true);
      expect(state.selectedOpt).toBe("option_a");
      expect(state.qXp).toBe(15);
      expect(state.qScore).toBe(1);
      expect(state.consecutiveWrong).toBe(0);
    });

    it("should award 0 XP and increment consecutive wrong count on wrong answer", () => {
      let state = initialPageState();
      state = handleQuizAnswer(state, "option_b", "option_a");

      expect(state.isAnswered).toBe(true);
      expect(state.selectedOpt).toBe("option_b");
      expect(state.qXp).toBe(0);
      expect(state.qScore).toBe(0);
      expect(state.consecutiveWrong).toBe(1);
    });

    it("should deduct 10 XP and reset consecutive wrong count on 3 consecutive wrong answers", () => {
      let state = initialPageState();

      // Wrong answer 1
      state = handleQuizAnswer(state, "option_b", "option_a");
      expect(state.consecutiveWrong).toBe(1);
      expect(state.qXp).toBe(0);

      // Wrong answer 2
      state.isAnswered = false; // Reset between questions
      state = handleQuizAnswer(state, "option_c", "option_a");
      expect(state.consecutiveWrong).toBe(2);
      expect(state.qXp).toBe(0);

      // Wrong answer 3 (streak limit reached)
      state.isAnswered = false; // Reset between questions
      state = handleQuizAnswer(state, "option_d", "option_a");
      expect(state.consecutiveWrong).toBe(0); // Reset after penalty
      expect(state.qXp).toBe(-10); // Deducted 10 XP
      expect(state.toasts.length).toBe(1);
      expect(state.toasts[0].type).toBe("warning");
    });

    it("should reset consecutive wrong count when a correct answer is given", () => {
      let state = initialPageState();

      // Wrong answer 1
      state = handleQuizAnswer(state, "option_b", "option_a");
      expect(state.consecutiveWrong).toBe(1);

      // Wrong answer 2
      state.isAnswered = false;
      state = handleQuizAnswer(state, "option_c", "option_a");
      expect(state.consecutiveWrong).toBe(2);

      // Correct answer
      state.isAnswered = false;
      state = handleQuizAnswer(state, "option_a", "option_a");
      expect(state.consecutiveWrong).toBe(0); // Reset streak
      expect(state.qXp).toBe(15); // +15 XP
    });
  });
});
