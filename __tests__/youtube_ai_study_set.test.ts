import { POST } from "@/app/api/youtube/study-set/route";
import { batchSaveFlashcardsToNotebook } from "@/features/myvideo/services/videoAiStudySetService";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useUserStore } from "@/stores/userStore";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it } from "vitest";

// Mock localStorage for Vitest node environment
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

const mockStorage = new LocalStorageMock();
(global as any).localStorage = mockStorage;
(global as any).window = { localStorage: mockStorage };

describe("YouTube AI Study Set Generator (Flashcards & Quiz Engine)", () => {
  beforeEach(() => {
    // Reset stores and storage
    mockStorage.clear();
    useVocabularyStore.setState({ learned: [] });
    useUserStore.setState({
      user: {
        id: "test_user",
        name: "Test Learner",
        totalXp: 100,
        wordsLearned: 5,
        level: 1,
      } as any,
    });
  });

  describe("API Route: POST /api/youtube/study-set", () => {
    it("should return 400 when videoId or subtitles are missing", async () => {
      const req = new NextRequest("http://localhost:3000/api/youtube/study-set", {
        method: "POST",
        body: JSON.stringify({ videoId: "", subtitles: [] }),
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBeDefined();
    });

    it("should generate a complete study set with flashcards and quizzes from subtitles", async () => {
      const mockSubtitles = [
        {
          textEn: "Hello everyone, today we will practice English pronunciation and vocabulary.",
          textVn: "Xin chào các bạn, hôm nay chúng ta sẽ luyện phát âm và từ vựng tiếng Anh.",
          startTime: 0,
        },
        {
          textEn: "Consistent practice will greatly improve your fluency and confidence.",
          textVn: "Luyện tập đều đặn sẽ giúp cải thiện đáng kể độ trôi chảy và sự tự tin.",
          startTime: 4.5,
        },
        {
          textEn: "It is important to understand the natural rhythm and linking sounds in conversation.",
          textVn: "Điều quan trọng là phải hiểu nhịp điệu tự nhiên và âm nối trong cuộc trò chuyện.",
          startTime: 9.0,
        },
      ];

      const req = new NextRequest("http://localhost:3000/api/youtube/study-set", {
        method: "POST",
        body: JSON.stringify({
          videoId: "test_vid_123",
          videoTitle: "Mastering Spoken English",
          subtitles: mockSubtitles,
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.sourceVideoId).toBe("test_vid_123");
      expect(data.summary).toBeDefined();
      expect(data.summary.en).toBeDefined();
      expect(data.summary.vn).toBeDefined();

      expect(Array.isArray(data.flashcards)).toBe(true);
      expect(data.flashcards.length).toBeGreaterThan(0);

      const firstCard = data.flashcards[0];
      expect(firstCard.id).toBeDefined();
      expect(firstCard.word).toBeDefined();
      expect(firstCard.phonetic).toBeDefined();
      expect(firstCard.pos).toBeDefined();
      expect(firstCard.definitionVn).toBeDefined();
      expect(firstCard.contextSentence).toBeDefined();

      expect(Array.isArray(data.quizzes)).toBe(true);
      if (data.quizzes.length > 0) {
        const firstQuiz = data.quizzes[0];
        expect(firstQuiz.id).toBeDefined();
        expect(firstQuiz.question).toBeDefined();
        expect(Array.isArray(firstQuiz.options)).toBe(true);
        expect(firstQuiz.options.length).toBe(4);
        expect(typeof firstQuiz.correctAnswerIndex).toBe("number");
        expect(firstQuiz.explanation).toBeDefined();
      }
    });
  });

  describe("Client Service: batchSaveFlashcardsToNotebook", () => {
    it("should batch save flashcards into vocabularyStore and award XP", () => {
      const mockCards = [
        {
          id: "fc_1",
          word: "Fluency",
          phonetic: "/ˈfluː.ən.si/",
          pos: "noun",
          definitionVn: "Sự trôi chảy, lưu loát",
          contextSentence: "Consistent practice will improve your fluency.",
          contextTranslation: "Luyện tập đều đặn sẽ cải thiện sự lưu loát.",
        },
        {
          id: "fc_2",
          word: "Pronunciation",
          phonetic: "/prəˌnʌn.siˈeɪ.ʃən/",
          pos: "noun",
          definitionVn: "Cách phát âm chuẩn",
          contextSentence: "Practice English pronunciation.",
          contextTranslation: "Luyện cách phát âm tiếng Anh.",
        },
      ];

      let awardedXpAmount = 0;
      const awardXpMock = (amount: number) => {
        awardedXpAmount += amount;
      };

      const result = batchSaveFlashcardsToNotebook(mockCards, "test_user", awardXpMock);

      expect(result.savedCount).toBe(2);
      expect(result.skippedCount).toBe(0);
      expect(result.totalXpAwarded).toBe(6); // 2 * 3 XP
      expect(awardedXpAmount).toBe(6);

      // Verify store state
      const learned = useVocabularyStore.getState().learned;
      expect(learned.length).toBe(2);
      expect(learned.some((l) => l.word === "fluency")).toBe(true);
      expect(learned.some((l) => l.word === "pronunciation")).toBe(true);

      // Verify user wordsLearned increment
      const user = useUserStore.getState().user;
      expect(user?.wordsLearned).toBe(7); // initial 5 + 2
    });

    it("should handle deduplication and skip already learned words", () => {
      // Prepopulate store with one word
      useVocabularyStore.setState({
        learned: [
          {
            userId: "test_user",
            vocabId: "fluency",
            word: "fluency",
            proficiency: 1,
            isFavorite: true,
          } as any,
        ],
      });

      const mockCards = [
        {
          id: "fc_1",
          word: "Fluency",
          phonetic: "/ˈfluː.ən.si/",
          pos: "noun",
          definitionVn: "Sự trôi chảy, lưu loát",
          contextSentence: "Sentence 1",
          contextTranslation: "Translation 1",
        },
        {
          id: "fc_2",
          word: "Confidence",
          phonetic: "/ˈkɒn.fɪ.dəns/",
          pos: "noun",
          definitionVn: "Sự tự tin",
          contextSentence: "Sentence 2",
          contextTranslation: "Translation 2",
        },
      ];

      let awardedXpAmount = 0;
      const awardXpMock = (amount: number) => {
        awardedXpAmount += amount;
      };

      const result = batchSaveFlashcardsToNotebook(mockCards, "test_user", awardXpMock);

      expect(result.savedCount).toBe(1); // Only "confidence"
      expect(result.skippedCount).toBe(1); // "fluency" was skipped
      expect(result.totalXpAwarded).toBe(3); // 1 * 3 XP
      expect(awardedXpAmount).toBe(3);

      const learned = useVocabularyStore.getState().learned;
      expect(learned.length).toBe(2);
    });
  });
});
