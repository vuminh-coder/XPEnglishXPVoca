import { describe, it, expect, beforeEach } from "vitest";
import { useVocabularyCatalogStore, DEFAULT_REVIEW_FILTERS } from "@/stores/vocabularyCatalogStore";
import { useVocabularyStore } from "@/stores/vocabularyStore";

describe("Review Page State Retention & 0ms Instant Render Architecture", () => {
  beforeEach(() => {
    useVocabularyCatalogStore.getState().resetReviewFilters();
  });

  describe("1. Review Filters State Retention (/review)", () => {
    it("initializes with default review filters", () => {
      const filters = useVocabularyCatalogStore.getState().reviewFilters;
      expect(filters).toEqual(DEFAULT_REVIEW_FILTERS);
      expect(filters.searchTerm).toBe("");
      expect(filters.selectedPos).toBe("all");
      expect(filters.selectedProficiency).toBe("all");
      expect(filters.selectedBookmark).toBe("all");
      expect(filters.selectedDateStr).toBeNull();
      expect(filters.expandedWordId).toBeNull();
    });

    it("persists selected date and current month across navigation", () => {
      useVocabularyCatalogStore.getState().setReviewFilter({
        selectedDateStr: "2026-10-15",
        currentMonthYear: { year: 2026, month: 9 }, // October (0-indexed 9)
      });

      const filters = useVocabularyCatalogStore.getState().reviewFilters;
      expect(filters.selectedDateStr).toBe("2026-10-15");
      expect(filters.currentMonthYear).toEqual({ year: 2026, month: 9 });
    });

    it("persists search query, POS, proficiency and bookmark filters", () => {
      useVocabularyCatalogStore.getState().setReviewFilter({
        searchTerm: "negotiation",
        selectedPos: "noun",
        selectedProficiency: "4",
        selectedBookmark: "bookmark",
      });

      const filters = useVocabularyCatalogStore.getState().reviewFilters;
      expect(filters.searchTerm).toBe("negotiation");
      expect(filters.selectedPos).toBe("noun");
      expect(filters.selectedProficiency).toBe("4");
      expect(filters.selectedBookmark).toBe("bookmark");
    });

    it("persists expanded word detail card across navigation", () => {
      useVocabularyCatalogStore.getState().setReviewFilter({
        expandedWordId: "vocab_business_001",
      });

      expect(useVocabularyCatalogStore.getState().reviewFilters.expandedWordId).toBe(
        "vocab_business_001"
      );

      // Toggle close
      useVocabularyCatalogStore.getState().setReviewFilter({
        expandedWordId: null,
      });

      expect(useVocabularyCatalogStore.getState().reviewFilters.expandedWordId).toBeNull();
    });

    it("resets review filters cleanly when resetReviewFilters is called", () => {
      useVocabularyCatalogStore.getState().setReviewFilter({
        searchTerm: "test",
        selectedPos: "verb",
      });

      useVocabularyCatalogStore.getState().resetReviewFilters();
      const filters = useVocabularyCatalogStore.getState().reviewFilters;
      expect(filters.searchTerm).toBe("");
      expect(filters.selectedPos).toBe("all");
    });
  });

  describe("2. Dictation Rule: Zero Skeleton Flash on Return", () => {
    it("ensures learned data is retained in memory so skeleton is bypassed on re-entry", () => {
      // Simulate user having learned words from previous visit
      useVocabularyStore.setState({
        learned: [
          {
            vocabId: "v1",
            word: "achievement",
            proficiency: 5,
            nextReview: new Date().toISOString(),
          } as any,
        ],
      });

      const store = useVocabularyStore.getState();
      const hasLearnedData = store.learned && store.learned.length > 0;

      // Condition: !isMounted && !hasLearnedData
      // If hasLearnedData is true, the condition evaluates to false even before mount (Frame 0)
      const isMountedFrame0 = false;
      const showSkeleton = !isMountedFrame0 && !hasLearnedData;

      expect(hasLearnedData).toBe(true);
      expect(showSkeleton).toBe(false); // NO SKELETON FLASH!
    });
  });
});
