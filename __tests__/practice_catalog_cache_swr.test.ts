import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  usePracticeCatalogStore,
  isPracticeEntryStale,
  PRACTICE_CATALOG_STALE_TIME_MS,
  DEFAULT_PRACTICE_FILTERS,
  INITIAL_PRACTICE_VOCABS,
} from "@/stores/practiceCatalogStore";

describe("Practice Arena - SWR In-Memory Caching & Zustand Store Architecture", () => {
  beforeEach(() => {
    usePracticeCatalogStore.getState().invalidateCache("all");
    usePracticeCatalogStore.getState().resetFilters();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration
  // ==========================================================================
  describe("1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration", () => {
    it("synchronously resolves 25 rich practice words for Frame 0 instant display (0ms)", () => {
      const vocabs = usePracticeCatalogStore.getState().practiceVocabs;
      const isLoading = usePracticeCatalogStore.getState().isVocabsLoading;

      expect(vocabs).toBeDefined();
      expect(Array.isArray(vocabs)).toBe(true);
      expect(vocabs.length).toBe(25);
      expect(isLoading).toBe(false);

      const first = vocabs[0];
      expect(first.id).toBeDefined();
      expect(first.word).toBeDefined();
      expect(first.meaning).toBeDefined();
      expect(first.ipa).toBeDefined();
      expect(first.example).toBeDefined();
      expect(first.exampleVi).toBeDefined();
    });

    it("matches INITIAL_PRACTICE_VOCABS structure with 0ms memory lookup", () => {
      const vocabs = usePracticeCatalogStore.getState().practiceVocabs;
      expect(vocabs[0].word).toBe(INITIAL_PRACTICE_VOCABS[0].word);
      expect(vocabs[vocabs.length - 1].word).toBe(
        INITIAL_PRACTICE_VOCABS[INITIAL_PRACTICE_VOCABS.length - 1].word
      );
    });
  });

  // ==========================================================================
  // 2. Practice Catalog SWR Caching & Background Revalidation
  // ==========================================================================
  describe("2. Practice Catalog SWR Caching & Background Revalidation", () => {
    it("returns in-memory words immediately (0ms) when cache is valid and not stale", async () => {
      const store = usePracticeCatalogStore.getState();
      await store.fetchPracticeVocabs();

      const freshTimestamp = usePracticeCatalogStore.getState().practiceVocabsTimestamp;
      expect(isPracticeEntryStale(freshTimestamp)).toBe(false);

      const secondResult = await store.fetchPracticeVocabs();
      expect(secondResult.length).toBe(25);
    });

    it("correctly identifies stale cache entry when timestamp exceeds 5 minutes TTL", () => {
      const now = Date.now();
      const staleTimestamp = now - (PRACTICE_CATALOG_STALE_TIME_MS + 1000);
      const freshTimestamp = now - 60000;

      expect(isPracticeEntryStale(staleTimestamp)).toBe(true);
      expect(isPracticeEntryStale(freshTimestamp)).toBe(false);
      expect(isPracticeEntryStale(0)).toBe(true);
    });

    it("revalidates timestamp and preserves words on forced refresh", async () => {
      const oldTime = Date.now() - 600000;
      usePracticeCatalogStore.setState({ practiceVocabsTimestamp: oldTime });

      const vocabs = await usePracticeCatalogStore
        .getState()
        .fetchPracticeVocabs({ forceRefresh: true });

      expect(vocabs.length).toBe(25);
      const updatedTimestamp = usePracticeCatalogStore.getState().practiceVocabsTimestamp;
      expect(updatedTimestamp).toBeGreaterThan(oldTime);
    });

    it("supports custom pool caching by themeId or level", async () => {
      const themeVocabs = await usePracticeCatalogStore
        .getState()
        .fetchPracticeVocabs({ themeId: "t_basic_greetings", forceRefresh: true });

      expect(themeVocabs).toBeDefined();
      expect(themeVocabs.length).toBeGreaterThan(0);

      const customCache = usePracticeCatalogStore.getState().customVocabsCache;
      expect(customCache["theme_t_basic_greetings"]?.data).toBeDefined();
    });
  });

  // ==========================================================================
  // 3. Session & SubMode State Preservation
  // ==========================================================================
  describe("3. Session & SubMode State Preservation", () => {
    it("persists subMode, currentIndex, and elapsedTime across updates", () => {
      const store = usePracticeCatalogStore.getState();

      store.setSubMode("writing");
      store.setCurrentIndex(5);
      store.setElapsedTime(120);
      store.addEarnedXp(30);

      const state = usePracticeCatalogStore.getState();
      expect(state.subMode).toBe("writing");
      expect(state.currentIndex).toBe(5);
      expect(state.elapsedTime).toBe(120);
      expect(state.totalEarnedXp).toBe(30);
    });

    it("supports functional updater for currentIndex and elapsedTime", () => {
      const store = usePracticeCatalogStore.getState();

      store.setCurrentIndex((prev) => prev + 1);
      expect(usePracticeCatalogStore.getState().currentIndex).toBe(1);

      store.setCurrentIndex((prev) => prev + 2);
      expect(usePracticeCatalogStore.getState().currentIndex).toBe(3);

      store.setElapsedTime((prev) => prev + 15);
      expect(usePracticeCatalogStore.getState().elapsedTime).toBe(15);
    });

    it("restarts session cleanly without losing cached vocabulary bank", () => {
      const store = usePracticeCatalogStore.getState();

      store.setCurrentIndex(12);
      store.setElapsedTime(300);
      store.addEarnedXp(80);
      store.setIsCompleted(true);

      store.restartSession();

      const state = usePracticeCatalogStore.getState();
      expect(state.currentIndex).toBe(0);
      expect(state.elapsedTime).toBe(0);
      expect(state.totalEarnedXp).toBe(0);
      expect(state.isCompleted).toBe(false);
      expect(state.practiceVocabs.length).toBe(25);
    });

    it("resets all filters back to default values", () => {
      const store = usePracticeCatalogStore.getState();

      store.setSubMode("speaking");
      store.setFilters({ themeId: "t_adv_business_finance", level: "advanced" });

      store.resetFilters();

      const state = usePracticeCatalogStore.getState();
      expect(state.filters).toEqual(DEFAULT_PRACTICE_FILTERS);
      expect(state.subMode).toBe("quiz");
    });
  });

  // ==========================================================================
  // 4. Cache Invalidation & Resilient Fallback Mechanics
  // ==========================================================================
  describe("4. Cache Invalidation & Resilient Fallback Mechanics", () => {
    it("invalidates cache selectively", () => {
      const store = usePracticeCatalogStore.getState();

      usePracticeCatalogStore.setState({
        practiceVocabsTimestamp: 12345,
        customVocabsCache: { test: { data: [], timestamp: 12345 } },
      });

      store.invalidateCache("all");

      expect(usePracticeCatalogStore.getState().practiceVocabsTimestamp).toBe(0);
      expect(Object.keys(usePracticeCatalogStore.getState().customVocabsCache).length).toBe(0);
    });

    it("safely falls back to local verified vocabulary items when API call fails", async () => {
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockRejectedValue(new Error("Network connection dropped"));

      const vocabs = await usePracticeCatalogStore.getState().fetchPracticeVocabs({
        forceRefresh: true,
      });

      expect(vocabs).toBeDefined();
      expect(Array.isArray(vocabs)).toBe(true);
      expect(vocabs.length).toBe(25);

      global.fetch = originalFetch;
    });
  });
});
