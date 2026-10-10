import { describe, it, expect, beforeEach } from "vitest";
import { useGrammarProgressStore } from "@/stores/grammarProgressStore";
import { GrammarExercise } from "@/features/grammar/types/grammarTypes";

describe("Grammar State Retention & 0ms Instant Render Architecture", () => {
  beforeEach(() => {
    useGrammarProgressStore.getState().resetProgress();
    useGrammarProgressStore.getState().resetCatalogFilters();
  });

  describe("1. Catalog Filter State Retention (/study/grammar)", () => {
    it("initializes with default filters ('all', '')", () => {
      const { catalogFilters } = useGrammarProgressStore.getState();
      expect(catalogFilters.activeLevel).toBe("all");
      expect(catalogFilters.searchQuery).toBe("");
    });

    it("persists activeLevel and searchQuery across navigation", () => {
      useGrammarProgressStore.getState().setActiveLevel("intermediate");
      useGrammarProgressStore.getState().setSearchQuery("conditionals");

      const store = useGrammarProgressStore.getState();
      expect(store.catalogFilters.activeLevel).toBe("intermediate");
      expect(store.catalogFilters.searchQuery).toBe("conditionals");
    });

    it("resets catalog filters cleanly when resetCatalogFilters is called", () => {
      useGrammarProgressStore.getState().setActiveLevel("advanced");
      useGrammarProgressStore.getState().setSearchQuery("inversion");
      useGrammarProgressStore.getState().resetCatalogFilters();

      const store = useGrammarProgressStore.getState();
      expect(store.catalogFilters.activeLevel).toBe("all");
      expect(store.catalogFilters.searchQuery).toBe("");
    });
  });

  describe("2. Topic Tab Retention (/study/grammar/[id])", () => {
    it("returns 'lesson' by default for unvisited topics", () => {
      const tab = useGrammarProgressStore.getState().getTopicTab("present_simple");
      expect(tab).toBe("lesson");
    });

    it("persists active workspace tab (e.g. 'practice') for a topic", () => {
      useGrammarProgressStore.getState().setTopicTab("present_simple", "practice");
      expect(useGrammarProgressStore.getState().getTopicTab("present_simple")).toBe("practice");

      // Distinct topic remains on default
      expect(useGrammarProgressStore.getState().getTopicTab("past_simple")).toBe("lesson");
    });
  });

  describe("3. Exercise Session Retention (/study/grammar/[id])", () => {
    const mockExercises: GrammarExercise[] = [
      {
        id: 1,
        sentence: "She ___ to school every day.",
        correctAnswer: "goes",
        options: ["go", "goes", "going", "gone"],
        explanation: "Chủ ngữ số ít 'She' chia động từ thêm -es.",
      },
      {
        id: 2,
        sentence: "They ___ not like coffee.",
        correctAnswer: "do",
        options: ["do", "does", "are", "have"],
        explanation: "Chủ ngữ số nhiều 'They' mượn trợ động từ 'do'.",
      },
    ];

    it("saves and retrieves active exercise session with 0ms Frame 0 availability", () => {
      useGrammarProgressStore.getState().saveExerciseSession("present_simple", {
        exercises: mockExercises,
        currentIndex: 1,
        answers: { 1: "goes" },
        checkedQuestions: { 1: true },
        submitted: false,
        showResults: false,
      });

      const session = useGrammarProgressStore.getState().getExerciseSession("present_simple");
      expect(session).not.toBeNull();
      expect(session?.exercises.length).toBe(2);
      expect(session?.currentIndex).toBe(1);
      expect(session?.answers[1]).toBe("goes");
      expect(session?.checkedQuestions[1]).toBe(true);
      expect(session?.submitted).toBe(false);
      expect(session?.lastUpdated).toBeGreaterThan(0);
    });

    it("clears exercise session on reset", () => {
      useGrammarProgressStore.getState().saveExerciseSession("present_simple", {
        exercises: mockExercises,
        currentIndex: 0,
        answers: {},
      });

      useGrammarProgressStore.getState().clearExerciseSession("present_simple");
      expect(useGrammarProgressStore.getState().getExerciseSession("present_simple")).toBeNull();
    });
  });

  describe("4. AI Chat Session Retention (/study/grammar/[id])", () => {
    it("saves and restores AI chat conversation for a topic", () => {
      useGrammarProgressStore.getState().saveAiChatSession("present_simple", {
        messages: [
          { role: "user", text: "Tại sao lại dùng 'goes' thay vì 'go'?" },
          { role: "ai", text: "Vì chủ ngữ là ngôi thứ 3 số ít (He/She/It)." },
        ],
        draftInput: "Còn ví dụ khác không?",
      });

      const chat = useGrammarProgressStore.getState().getAiChatSession("present_simple");
      expect(chat).not.toBeNull();
      expect(chat?.messages.length).toBe(2);
      expect(chat?.messages[0].text).toContain("Tại sao");
      expect(chat?.messages[1].text).toContain("ngôi thứ 3 số ít");
      expect(chat?.draftInput).toBe("Còn ví dụ khác không?");
    });

    it("clears AI chat session cleanly", () => {
      useGrammarProgressStore.getState().saveAiChatSession("present_simple", {
        messages: [{ role: "user", text: "Hello" }],
      });

      useGrammarProgressStore.getState().clearAiChatSession("present_simple");
      expect(useGrammarProgressStore.getState().getAiChatSession("present_simple")).toBeNull();
    });
  });
});
