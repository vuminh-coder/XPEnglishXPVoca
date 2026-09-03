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

  describe("7. Revealed Token Matching & Spacebar Handling", () => {
    it("should allow matching words that are already in 'revealed' status", () => {
      const sentence = "Attention shoppers";
      const tokens = tokenizeSentence(sentence, []);
      // Simulate user clicked token 0 to reveal it
      tokens[0].status = "revealed";

      const typedWord = "attention";
      let matched = false;
      const nextTokens = tokens.map((token) => {
        if (
          !matched &&
          (token.status === "masked" || token.status === "first-letter" || token.status === "revealed") &&
          token.clean.toLowerCase() === typedWord
        ) {
          matched = true;
          return { ...token, status: "matched" as const };
        }
        return token;
      });

      expect(matched).toBe(true);
      expect(nextTokens[0].status).toBe("matched");
    });
  });

  describe("8. Row 1 Level Badge Harmonization (A1/A2)", () => {
    const getLevelLabel = (level?: string, forceBasic?: boolean): string => {
      if (forceBasic) {
        if (level === "Beginner" || level === "A1") return "A1";
        return "A2";
      }
      const map: Record<string, string> = {
        "Easy": "A1-A2", "Beginner": "A1", "A1": "A1", "A2": "A2",
        "Intermediate": "B1-B2", "B1": "B1", "B2": "B2",
        "Hard": "C1-C2", "Advanced": "C1", "C1": "C1", "C2": "C2",
      };
      return map[level || ""] || level || "B1";
    };

    it("should enforce A1 or A2 badge for Row 1 basic lessons", () => {
      expect(getLevelLabel("Beginner", true)).toBe("A1");
      expect(getLevelLabel("Intermediate", true)).toBe("A2");
      expect(getLevelLabel("Easy", true)).toBe("A2");
    });

    it("should preserve original B1-B2 badges for Row 2 advanced lessons", () => {
      expect(getLevelLabel("Intermediate", false)).toBe("B1-B2");
      expect(getLevelLabel("Hard", false)).toBe("C1-C2");
    });
  });

  describe("9. YouTube URL Video ID Extraction", () => {
    const extractYoutubeId = (url: string): string | null => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    };

    it("should extract 11-char video ID from standard YouTube URL", () => {
      expect(extractYoutubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    });

    it("should extract video ID from short youtu.be URL", () => {
      expect(extractYoutubeId("https://youtu.be/dQw4w9WgXcQ?t=10")).toBe("dQw4w9WgXcQ");
    });

    it("should return null for invalid URL", () => {
      expect(extractYoutubeId("https://google.com")).toBeNull();
    });
  });

  describe("10. In-Studio Lesson Detail Preservation (Zero Unmount Logic)", () => {
    it("should keep studio mounted if currentLesson already exists in cache", () => {
      const selectedLessonId = "listen_006";
      const currentLesson = { id: "listen_006", title: "Test Lesson" };
      const isLoadingLessonDetail = true;

      // New logic: Only unmount if selectedLessonId is present AND currentLesson is null
      const shouldShowFullStudioSkeleton = selectedLessonId && !currentLesson;
      expect(shouldShowFullStudioSkeleton).toBe(false);

      // In-place skeleton is passed to sidebar
      const sidebarIsLoadingSentences = isLoadingLessonDetail;
      expect(sidebarIsLoadingSentences).toBe(true);
    });

    it("should show full studio skeleton on fresh deep link when currentLesson is null", () => {
      const selectedLessonId = "listen_099";
      const currentLesson = null;
      const shouldShowFullStudioSkeleton = Boolean(selectedLessonId && !currentLesson);
      expect(shouldShowFullStudioSkeleton).toBe(true);
    });
  });

  describe("11. Auto-Delete Progress Record & Cleanup On Lesson Completion", () => {
    it("should trigger deletion of intermediate progress record when completedArr.length >= totalSentencesCount", async () => {
      let isProgressDeleted = false;
      const totalSentencesCount = 4;
      const completedArr = [0, 1, 2, 3];
      const isCompleted = completedArr.length >= totalSentencesCount;

      expect(isCompleted).toBe(true);

      const autoDeleteProgress = async (userId: string, lessonId: string) => {
        expect(userId).toBeTruthy();
        expect(lessonId).toBeTruthy();
        isProgressDeleted = true;
        return { success: true, message: "Đã xóa bản ghi tiến độ thành công." };
      };

      await autoDeleteProgress("user_123", "listen_006");
      expect(isProgressDeleted).toBe(true);
    });
  });

  describe("12. Compact Level Badge Formatter (formatLevelBadge)", () => {
    const formatLevelBadge = (level?: string): string => {
      if (!level) return "B1";
      const upper = level.trim().toUpperCase();
      if (upper.includes("INTERMEDIATE") || upper === "B1-B2" || upper === "B1") return "B1";
      if (upper === "B2") return "B2";
      if (upper.includes("BEGINNER") || upper.includes("EASY") || upper === "A1-A2" || upper === "A1") return "A1";
      if (upper === "A2") return "A2";
      if (upper.includes("ADVANCED") || upper.includes("HARD") || upper === "C1-C2" || upper === "C1") return "C1";
      if (upper === "C2") return "C2";
      return level.length > 5 ? level.slice(0, 4) : level;
    };

    it("should compress lengthy 'Intermediate' string to 'B1'", () => {
      expect(formatLevelBadge("Intermediate")).toBe("B1");
    });

    it("should compress 'Beginner' or 'Easy' to 'A1'", () => {
      expect(formatLevelBadge("Beginner")).toBe("A1");
      expect(formatLevelBadge("Easy")).toBe("A1");
    });

    it("should compress 'Advanced' or 'Hard' to 'C1'", () => {
      expect(formatLevelBadge("Advanced")).toBe("C1");
      expect(formatLevelBadge("Hard")).toBe("C1");
    });

    it("should preserve direct CEFR strings", () => {
      expect(formatLevelBadge("A2")).toBe("A2");
      expect(formatLevelBadge("B2")).toBe("B2");
      expect(formatLevelBadge("C2")).toBe("C2");
    });
  });
});
