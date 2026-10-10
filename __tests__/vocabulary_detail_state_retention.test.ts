import { describe, it, expect, beforeEach } from "vitest";
import { useVocabularyCatalogStore } from "@/stores/vocabularyCatalogStore";

describe("Vocabulary Detail Page State Retention (0ms Instant Render)", () => {
  const THEME_ID = "t_basic_family_relatives";

  beforeEach(() => {
    useVocabularyCatalogStore.setState({
      themeViewModes: {},
      themeFlashcardSessions: {},
      themeQuizSessions: {},
      themeAiCoachSessions: {},
    });
  });

  describe("Theme View Mode Retention", () => {
    it("should retain active view mode per theme", () => {
      useVocabularyCatalogStore.getState().setThemeViewMode(THEME_ID, "quiz");
      expect(useVocabularyCatalogStore.getState().themeViewModes[THEME_ID]).toBe("quiz");

      // Another theme should not overwrite this theme's mode
      useVocabularyCatalogStore.getState().setThemeViewMode("t_basic_food", "flashcard");
      expect(useVocabularyCatalogStore.getState().themeViewModes[THEME_ID]).toBe("quiz");
      expect(useVocabularyCatalogStore.getState().themeViewModes["t_basic_food"]).toBe("flashcard");
    });
  });

  describe("Flashcard Session Retention", () => {
    it("should update and retain flashcard session states", () => {
      useVocabularyCatalogStore.getState().setThemeFlashcardSession(THEME_ID, {
        currentIndex: 5,
        isWordMasked: true,
        autoPlayAudio: true,
        bookmarkedIds: ["vocab_1", "vocab_2"],
      });

      const session = useVocabularyCatalogStore.getState().themeFlashcardSessions[THEME_ID];
      expect(session).toBeDefined();
      expect(session.currentIndex).toBe(5);
      expect(session.isWordMasked).toBe(true);
      expect(session.autoPlayAudio).toBe(true);
      expect(session.bookmarkedIds).toEqual(["vocab_1", "vocab_2"]);
    });

    it("should perform partial updates without wiping other flashcard fields", () => {
      useVocabularyCatalogStore.getState().setThemeFlashcardSession(THEME_ID, {
        currentIndex: 3,
        isWordMasked: false,
      });

      useVocabularyCatalogStore.getState().setThemeFlashcardSession(THEME_ID, {
        currentIndex: 4,
      });

      const session = useVocabularyCatalogStore.getState().themeFlashcardSessions[THEME_ID];
      expect(session.currentIndex).toBe(4);
      expect(session.isWordMasked).toBe(false);
    });
  });

  describe("Quiz Session Retention", () => {
    it("should retain quiz arena progress across tab navigation", () => {
      useVocabularyCatalogStore.getState().setThemeQuizSession(THEME_ID, {
        quizIndex: 2,
        quizScore: 2,
        selectedAnswer: 1,
        isQuizSubmitted: true,
        quizFinished: false,
      });

      const session = useVocabularyCatalogStore.getState().themeQuizSessions[THEME_ID];
      expect(session.quizIndex).toBe(2);
      expect(session.quizScore).toBe(2);
      expect(session.selectedAnswer).toBe(1);
      expect(session.isQuizSubmitted).toBe(true);
      expect(session.quizFinished).toBe(false);
    });

    it("should reset quiz session back to initial values when requested", () => {
      useVocabularyCatalogStore.getState().setThemeQuizSession(THEME_ID, {
        quizIndex: 9,
        quizScore: 8,
        quizFinished: true,
      });

      useVocabularyCatalogStore.getState().resetThemeQuizSession(THEME_ID);

      const session = useVocabularyCatalogStore.getState().themeQuizSessions[THEME_ID];
      expect(session.quizIndex).toBe(0);
      expect(session.quizScore).toBe(0);
      expect(session.selectedAnswer).toBeNull();
      expect(session.isQuizSubmitted).toBe(false);
      expect(session.quizFinished).toBe(false);
    });
  });

  describe("AI Coach Session Retention", () => {
    it("should retain user query and AI response", () => {
      useVocabularyCatalogStore.getState().setThemeAiCoachSession(THEME_ID, {
        aiQuestion: "Làm sao để nhớ từ anh em họ?",
        aiResponse: "Từ 'cousin' dùng chung cho cả anh/chị/em họ...",
      });

      const session = useVocabularyCatalogStore.getState().themeAiCoachSessions[THEME_ID];
      expect(session.aiQuestion).toBe("Làm sao để nhớ từ anh em họ?");
      expect(session.aiResponse).toContain("cousin");
    });
  });
});
