import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  useVocabularyCatalogStore,
  isVocabularyEntryStale,
  VOCABULARY_CATALOG_STALE_TIME_MS,
  DEFAULT_VOCABULARY_FILTERS,
} from "@/stores/vocabularyCatalogStore";
import { BASIC_VOCABULARY_THEMES } from "@/features/vocabulary/data/themes";
import { ADVANCED_VOCABULARY_THEMES } from "@/features/vocabulary/data/advancedVocabularies";

describe("Vocabulary & Flashcard 3D - SWR In-Memory Caching & Zustand Store Architecture", () => {
  beforeEach(() => {
    useVocabularyCatalogStore.getState().invalidateCache("all");
    useVocabularyCatalogStore.getState().resetFilters();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration
  // ==========================================================================
  describe("1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration", () => {
    it("synchronously resolves 60 basic themes and 155 advanced themes for Frame 0 instant display (0ms)", () => {
      const basic = useVocabularyCatalogStore.getState().basicThemes;
      const advanced = useVocabularyCatalogStore.getState().advancedThemes;

      expect(basic).toBeDefined();
      expect(Array.isArray(basic)).toBe(true);
      expect(basic.length).toBe(60);

      expect(advanced).toBeDefined();
      expect(Array.isArray(advanced)).toBe(true);
      expect(advanced.length).toBe(155);
    });

    it("resolves theme detail by canonical ID and numeric shorthand ('1') with 0ms lookup", () => {
      const store = useVocabularyCatalogStore.getState();

      // Canonical string ID lookup
      const basicTheme = store.fetchThemeDetail("t_basic_greetings");
      expect(basicTheme).toBeDefined();
      expect(basicTheme?.id).toBe("t_basic_greetings");
      expect(basicTheme?.name).toBeDefined();

      // Numeric alias "1" lookup
      const firstTheme = store.fetchThemeDetail("1");
      expect(firstTheme).toBeDefined();
      expect(firstTheme?.id).toBe(BASIC_VOCABULARY_THEMES[0].id);

      // Advanced theme lookup
      const advTheme = store.fetchThemeDetail(ADVANCED_VOCABULARY_THEMES[0].id);
      expect(advTheme).toBeDefined();
      expect(advTheme?.id).toBe(ADVANCED_VOCABULARY_THEMES[0].id);
    });

    it("immediately hits in-memory pre-populated themeWordsCache for instant vocabulary study (0ms response)", async () => {
      const targetThemeId = BASIC_VOCABULARY_THEMES[0].id;
      const words = await useVocabularyCatalogStore.getState().fetchThemeVocabs(targetThemeId);

      expect(words).toBeDefined();
      expect(Array.isArray(words)).toBe(true);
      expect(words.length).toBeGreaterThan(0);
      expect(words[0].word).toBeDefined();
      expect(words[0].definition).toBeDefined();

      // Check cache existence
      const cache = useVocabularyCatalogStore.getState().themeWordsCache;
      expect(cache[targetThemeId]?.data).toBeDefined();
    });
  });

  // ==========================================================================
  // 2. Vocabulary SWR Caching & Background Revalidation
  // ==========================================================================
  describe("2. Vocabulary SWR Caching & Background Revalidation", () => {
    it("returns in-memory words immediately (0ms) when cache is valid and not stale", async () => {
      const targetThemeId = BASIC_VOCABULARY_THEMES[0].id;

      await useVocabularyCatalogStore.getState().fetchThemeVocabs(targetThemeId);
      const cached = useVocabularyCatalogStore.getState().themeWordsCache[targetThemeId];
      expect(cached).toBeDefined();
      expect(isVocabularyEntryStale(cached.timestamp)).toBe(false);

      const secondResult = await useVocabularyCatalogStore.getState().fetchThemeVocabs(targetThemeId);
      expect(secondResult.length).toBe(cached.data.length);
    });

    it("correctly identifies stale cache entry when timestamp exceeds 5 minutes TTL", () => {
      const now = Date.now();
      const staleTimestamp = now - (VOCABULARY_CATALOG_STALE_TIME_MS + 1000);
      const freshTimestamp = now - 60000;

      expect(isVocabularyEntryStale(staleTimestamp)).toBe(true);
      expect(isVocabularyEntryStale(freshTimestamp)).toBe(false);
      expect(isVocabularyEntryStale(0)).toBe(true);
    });

    it("revalidates timestamp and preserves words on forced refresh", async () => {
      const targetThemeId = BASIC_VOCABULARY_THEMES[0].id;
      const oldTime = Date.now() - 600000;

      useVocabularyCatalogStore.setState({
        themeWordsCache: {
          [targetThemeId]: { data: [{ word: "mock_word" }], timestamp: oldTime },
        },
      });

      const words = await useVocabularyCatalogStore
        .getState()
        .fetchThemeVocabs(targetThemeId, { forceRefresh: true });

      expect(words.length).toBeGreaterThan(0);
      const updatedTimestamp =
        useVocabularyCatalogStore.getState().themeWordsCache[targetThemeId]?.timestamp;
      expect(updatedTimestamp).toBeGreaterThan(oldTime);
    });
  });

  // ==========================================================================
  // 3. Filter & UI State Preservation
  // ==========================================================================
  describe("3. Filter & UI State Preservation", () => {
    it("persists levelMode, searchQuery, displayedCount, and viewMode across updates", () => {
      const store = useVocabularyCatalogStore.getState();

      store.setLevelMode("advanced");
      store.setSearchQuery("Business");
      store.setDisplayedCount(28);
      store.setViewMode("quiz");

      const state = useVocabularyCatalogStore.getState().filters;
      expect(state.levelMode).toBe("advanced");
      expect(state.searchQuery).toBe("Business");
      expect(state.displayedCount).toBe(28);
      expect(state.viewMode).toBe("quiz");
    });

    it("supports updater function for displayedCount pagination", () => {
      const store = useVocabularyCatalogStore.getState();
      expect(useVocabularyCatalogStore.getState().filters.displayedCount).toBe(16);

      store.setDisplayedCount((prev) => prev + 12);
      expect(useVocabularyCatalogStore.getState().filters.displayedCount).toBe(28);

      store.setDisplayedCount((prev) => prev + 12);
      expect(useVocabularyCatalogStore.getState().filters.displayedCount).toBe(40);
    });

    it("resets all filters back to default values", () => {
      const store = useVocabularyCatalogStore.getState();
      store.setLevelMode("advanced");
      store.setSearchQuery("Finance");
      store.setDisplayedCount(52);
      store.setViewMode("ai");

      store.resetFilters();

      const reset = useVocabularyCatalogStore.getState().filters;
      expect(reset).toEqual(DEFAULT_VOCABULARY_FILTERS);
    });
  });

  // ==========================================================================
  // 4. Cache Invalidation & Resilient Fallback Mechanics
  // ==========================================================================
  describe("4. Cache Invalidation & Resilient Fallback Mechanics", () => {
    it("invalidates cache selectively by scope", () => {
      const store = useVocabularyCatalogStore.getState();

      // Invalidate themes only
      store.invalidateCache("themes");
      expect(useVocabularyCatalogStore.getState().themesTimestamp).toBe(0);

      // Invalidate words only
      store.invalidateCache("words");
      expect(Object.keys(useVocabularyCatalogStore.getState().themeWordsCache).length).toBe(0);

      // Invalidate all
      useVocabularyCatalogStore.setState({
        themesTimestamp: 12345,
        themeWordsCache: { test: { data: [], timestamp: 12345 } },
      });
      store.invalidateCache("all");
      expect(useVocabularyCatalogStore.getState().themesTimestamp).toBe(0);
      expect(Object.keys(useVocabularyCatalogStore.getState().themeWordsCache).length).toBe(0);
    });

    it("safely falls back to local verified vocabulary bank when API call fails", async () => {
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockRejectedValue(new Error("Network connection dropped"));

      const targetThemeId = BASIC_VOCABULARY_THEMES[0].id;
      const words = await useVocabularyCatalogStore.getState().fetchThemeVocabs(targetThemeId, {
        forceRefresh: true,
      });

      expect(words).toBeDefined();
      expect(Array.isArray(words)).toBe(true);
      expect(words.length).toBeGreaterThan(0);

      global.fetch = originalFetch;
    });
  });
});
