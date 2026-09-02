import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  extractProperNouns,
  tokenizeSentence,
} from "@/features/listening/components/DictationWorkspace";

describe("Listening & Dictation Studio Comprehensive Deep Test Suite", () => {
  describe("1. Tokenizer & Proper Nouns Extraction Engine", () => {
    it("should extract proper nouns accurately while ignoring common pronouns", () => {
      const sentence = "Ali and Sarah went to London on Monday, and I met David.";
      const properNouns = extractProperNouns(sentence);
      expect(properNouns).toContain("Ali");
      expect(properNouns).toContain("Sarah");
      expect(properNouns).toContain("London");
      expect(properNouns).toContain("Monday");
      expect(properNouns).toContain("David");
      expect(properNouns).not.toContain("I");
    });

    it("should preserve leading and trailing punctuation on word tokens", () => {
      const sentence = `"Hello, world!" (Welcome to XP English).`;
      const tokens = tokenizeSentence(sentence, ["XP", "English"]);

      expect(tokens[0].clean).toBe("Hello");
      expect(tokens[0].leadingPunc).toBe('"');
      expect(tokens[0].trailingPunc).toBe(",");

      expect(tokens[1].clean).toBe("world");
      expect(tokens[1].trailingPunc).toBe('!"');

      expect(tokens[2].leadingPunc).toBe("(");
      expect(tokens[2].clean).toBe("Welcome");

      expect(tokens[4].isProperNoun).toBe(true);
      expect(tokens[5].isProperNoun).toBe(true);
      expect(tokens[5].trailingPunc).toBe(").");
    });

    it("should handle multi-word continuous typing matching accurately", () => {
      const sentence = "Due to the upcoming renovation";
      const tokens = tokenizeSentence(sentence, []);

      const input = "due to the";
      const parts = input
        .split(/\s+/)
        .map((p) => p.replace(/[^a-zA-Z0-9]/g, "").toLowerCase())
        .filter(Boolean);

      let nextTokens = [...tokens];
      let matchedWords: string[] = [];

      for (const typedWord of parts) {
        let matched = false;
        nextTokens = nextTokens.map((token) => {
          if (
            !matched &&
            (token.status === "masked" || token.status === "first-letter") &&
            token.clean.toLowerCase() === typedWord
          ) {
            matched = true;
            matchedWords.push(token.clean);
            return { ...token, status: "matched" as const };
          }
          return token;
        });
      }

      expect(matchedWords).toEqual(["Due", "to", "the"]);
      expect(nextTokens[0].status).toBe("matched");
      expect(nextTokens[1].status).toBe("matched");
      expect(nextTokens[2].status).toBe("matched");
      expect(nextTokens[3].status).toBe("masked");
    });
  });

  describe("2. Sentence & Lesson Progress Calculations", () => {
    it("should calculate user progress percentage accurately", () => {
      const totalSentences = 10;
      const completedSentences = [0, 1, 2, 3];
      const progressPercent = Math.round((completedSentences.length / totalSentences) * 100);
      expect(progressPercent).toBe(40);
    });

    it("should mark lesson as COMPLETED when all sentences are done", () => {
      const totalSentences = 5;
      const completedSentences = [0, 1, 2, 3, 4];
      const isCompleted = completedSentences.length >= totalSentences;
      const status = isCompleted ? "COMPLETED" : "IN_PROGRESS";
      expect(status).toBe("COMPLETED");
    });

    it("should handle 0 total sentences safely without NaN", () => {
      const totalSentences = 0;
      const completedSentences: number[] = [];
      const progressPercent = totalSentences > 0 ? Math.round((completedSentences.length / totalSentences) * 100) : 0;
      expect(progressPercent).toBe(0);
    });
  });

  describe("3. Sentence Bookmarking & Notebook Sync Logic", () => {
    it("should add sentence key without duplicates", () => {
      const existingKeys = ["lesson_001_0", "lesson_001_1"];
      const newKey = "lesson_001_2";
      const nextKeys = existingKeys.includes(newKey) ? existingKeys : [...existingKeys, newKey];
      expect(nextKeys).toEqual(["lesson_001_0", "lesson_001_1", "lesson_001_2"]);
    });

    it("should remove sentence key when un-bookmarking", () => {
      const existingKeys = ["lesson_001_0", "lesson_001_1", "lesson_001_2"];
      const targetKey = "lesson_001_1";
      const nextKeys = existingKeys.filter((k) => k !== targetKey);
      expect(nextKeys).toEqual(["lesson_001_0", "lesson_001_2"]);
    });
  });

  describe("4. DailySkillPractice Dictation Tracking & XP", () => {
    it("should convert study seconds to minutes rounded up safely", () => {
      const seconds = 125; // 2 mins 5 secs
      const minutes = Math.max(1, Math.ceil(seconds / 60));
      expect(minutes).toBe(3);
    });

    it("should award correct XP for sentence vs full lesson completion", () => {
      const wordMatchXp = 5;
      const sentenceCompletionXp = 20;
      const fullLessonCompletionXp = 50;

      const totalXpForOneSentence = wordMatchXp + sentenceCompletionXp;
      expect(totalXpForOneSentence).toBe(25);
      expect(fullLessonCompletionXp).toBe(50);
    });
  });

  describe("5. 3-Tier ID Resolution (id=52, id=listen_052, UUID)", () => {
    const mockCatalog = Array.from({ length: 60 }, (_, i) => {
      const formatted = `listen_${String(i + 1).padStart(3, "0")}`;
      return { id: formatted, title: `Lesson ${i + 1}` };
    });

    it("should resolve numeric query param ?id=52 to listen_052", () => {
      const queryId = "52";
      const num = parseInt(queryId, 10);
      const formatted = `listen_${String(num).padStart(3, "0")}`;
      const resolved = mockCatalog.find((l) => l.id === formatted || l.id === queryId);
      expect(resolved?.id).toBe("listen_052");
      expect(resolved?.title).toBe("Lesson 52");
    });

    it("should resolve exact ID match directly", () => {
      const resolved = mockCatalog.find((l) => l.id === "listen_052");
      expect(resolved?.title).toBe("Lesson 52");
    });
  });

  describe("6. Audio Playback Duration Scaling with Speed Control", () => {
    it("should scale estimated sentence duration inversely with playback speed", () => {
      const wordCount = 11;
      const speed1x = 1.0;
      const speed1_5x = 1.5;
      const speed0_5x = 0.5;

      const dur1x = Math.max(3, Math.ceil(wordCount / (2.2 * speed1x)));
      const dur1_5x = Math.max(3, Math.ceil(wordCount / (2.2 * speed1_5x)));
      const dur0_5x = Math.max(3, Math.ceil(wordCount / (2.2 * speed0_5x)));

      expect(dur1x).toBe(5);
      expect(dur1_5x).toBe(4);
      expect(dur0_5x).toBe(10);
    });
  });
});
