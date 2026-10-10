import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  useReadingCatalogStore,
  isReadingEntryStale,
  READING_CATALOG_STALE_TIME_MS,
  type ReadingCategoryTab,
} from "@/stores/readingCatalogStore";
import { READING_PASSAGES_DATA } from "@/features/reading/data/readingMockData";

describe("Reading Comprehension - SWR In-Memory Caching & Zustand Store Architecture", () => {
  beforeEach(() => {
    useReadingCatalogStore.getState().invalidateCache("all");
    useReadingCatalogStore.getState().resetFilters();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration
  // ==========================================================================
  describe("1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration", () => {
    it("synchronously resolves reading passages for Frame 0 instant display (0ms)", () => {
      const passages = useReadingCatalogStore.getState().passages;
      expect(passages).toBeDefined();
      expect(Array.isArray(passages)).toBe(true);
      expect(passages.length).toBe(40);
      expect(passages[0].id).toBe("r1");
    });

    it("resolves numeric alias ('1', '01') and casing ('R1', 'r1') to canonical passage", async () => {
      // Fetch by numeric shorthand "1"
      const passageNum = await useReadingCatalogStore.getState().fetchPassageDetail("1");
      expect(passageNum).toBeDefined();
      expect(passageNum?.id).toBe("r1");
      expect(passageNum?.title).toBeDefined();
      expect(Array.isArray(passageNum?.questions)).toBe(true);

      // Fetch by uppercase "R1"
      const passageUpper = await useReadingCatalogStore.getState().fetchPassageDetail("R1");
      expect(passageUpper).toBeDefined();
      expect(passageUpper?.id).toBe("r1");

      // Verify cached under both keys for 0ms lookup
      const cache = useReadingCatalogStore.getState().passageDetailCache;
      expect(cache["r1"]?.data).toBeDefined();
      expect(cache["1"]?.data).toBeDefined();
    });

    it("immediately hits in-memory passageDetailCache when pre-populated (0ms response)", async () => {
      const mockPassage = {
        id: "r99",
        title: "Artificial General Intelligence Architecture",
        category: "Technology",
        level: "C1" as const,
        icon: "🤖",
        wordCount: 350,
        passage: "AGI represents a major leap forward...",
        questions: [
          {
            id: "q1",
            text: "What does AGI represent?",
            options: ["A leap forward", "A step back", "A lateral shift", "Nothing"],
            correct: 0,
            explanation: "As stated in the text.",
          },
        ],
      };

      useReadingCatalogStore.setState({
        passageDetailCache: {
          r99: { data: mockPassage, timestamp: Date.now() },
        },
      });

      const cached = await useReadingCatalogStore.getState().fetchPassageDetail("r99");
      expect(cached).toBeDefined();
      expect(cached?.id).toBe("r99");
      expect(cached?.title).toBe("Artificial General Intelligence Architecture");
    });
  });

  // ==========================================================================
  // 2. Reading Passages SWR Caching & TTL Revalidation
  // ==========================================================================
  describe("2. Reading Passages SWR Caching & Background Revalidation", () => {
    it("returns in-memory passages immediately (0ms) when cache is valid", async () => {
      const store = useReadingCatalogStore.getState();
      await store.fetchPassages();
      const freshTimestamp = useReadingCatalogStore.getState().passagesTimestamp;

      const result = await store.fetchPassages();

      expect(result.length).toBe(40);
      expect(isReadingEntryStale(freshTimestamp)).toBe(false);
    });

    it("correctly identifies stale cache entry when timestamp exceeds 5 minutes TTL", () => {
      const now = Date.now();
      const freshTimestamp = now - 1000; // 1s ago
      const staleTimestamp = now - (READING_CATALOG_STALE_TIME_MS + 5000); // 5m 5s ago

      expect(isReadingEntryStale(freshTimestamp)).toBe(false);
      expect(isReadingEntryStale(staleTimestamp)).toBe(true);
      expect(isReadingEntryStale(0)).toBe(true);
    });

    it("revalidates quietly when passage detail cache is stale", async () => {
      const oldPassage = READING_PASSAGES_DATA[0];
      const staleTime = Date.now() - (READING_CATALOG_STALE_TIME_MS + 10000);

      useReadingCatalogStore.setState({
        passageDetailCache: {
          r1: { data: oldPassage, timestamp: staleTime },
        },
      });

      expect(isReadingEntryStale(staleTime)).toBe(true);

      const refreshed = await useReadingCatalogStore.getState().fetchPassageDetail("r1");
      expect(refreshed).toBeDefined();
      expect(refreshed?.id).toBe("r1");

      const currentTimestamp = useReadingCatalogStore.getState().passageDetailCache["r1"]?.timestamp;
      expect(isReadingEntryStale(currentTimestamp)).toBe(false);
    });
  });

  // ==========================================================================
  // 3. Preserved Filter States & UI Persistence
  // ==========================================================================
  describe("3. Preserved Filter States & UI Persistence", () => {
    it("preserves listingSearch across component remounts", () => {
      const store = useReadingCatalogStore.getState();
      expect(store.filters.listingSearch).toBe("");

      store.setListingSearch("climate change solutions");
      expect(useReadingCatalogStore.getState().filters.listingSearch).toBe("climate change solutions");

      store.setListingSearch("");
      expect(useReadingCatalogStore.getState().filters.listingSearch).toBe("");
    });

    it("preserves activeCategoryTab across route transitions", () => {
      const store = useReadingCatalogStore.getState();
      expect(store.filters.activeCategoryTab).toBe("all");

      store.setActiveCategoryTab("intermediate");
      expect(useReadingCatalogStore.getState().filters.activeCategoryTab).toBe("intermediate");

      store.setActiveCategoryTab("completed");
      expect(useReadingCatalogStore.getState().filters.activeCategoryTab).toBe("completed");
    });

    it("preserves deterministic shuffle seeds for basic and advanced passage pools", () => {
      const store = useReadingCatalogStore.getState();

      store.setShuffleSeedBasic((prev) => prev + 1);
      store.setShuffleSeedAdvanced((prev) => prev + 1);

      const filters = useReadingCatalogStore.getState().filters;
      expect(filters.shuffleSeedBasic).toBe(1);
      expect(filters.shuffleSeedAdvanced).toBe(1);
    });

    it("resets all filters cleanly on demand", () => {
      const store = useReadingCatalogStore.getState();
      store.setListingSearch("artificial intelligence");
      store.setActiveCategoryTab("advanced");
      store.setShuffleSeedBasic(5);

      store.resetFilters();

      const filters = useReadingCatalogStore.getState().filters;
      expect(filters.listingSearch).toBe("");
      expect(filters.activeCategoryTab).toBe("all");
      expect(filters.shuffleSeedBasic).toBe(0);
    });
  });

  // ==========================================================================
  // 4. User Reading Progress & Completed Passages
  // ==========================================================================
  describe("4. User Reading Progress & Completed Passages", () => {
    it("records completed passage and prevents duplicates", () => {
      const store = useReadingCatalogStore.getState();
      expect(store.completedPassageIds).toEqual([]);

      store.markPassageCompleted("r1");
      expect(useReadingCatalogStore.getState().completedPassageIds).toEqual(["r1"]);

      // Re-marking the same passage should deduplicate
      store.markPassageCompleted("r1");
      expect(useReadingCatalogStore.getState().completedPassageIds).toEqual(["r1"]);

      store.markPassageCompleted("r2");
      expect(useReadingCatalogStore.getState().completedPassageIds).toEqual(["r1", "r2"]);
    });

    it("merges server progress stats with local completed passages", async () => {
      useReadingCatalogStore.setState({
        completedPassageIds: ["r1"],
      });

      vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          stats: {
            completedPassages: ["r2", "r3"],
            totalPassagesRead: 3,
            totalWordsRead: 1200,
            averageScore: 95,
          },
        }),
      } as Response);

      const merged = await useReadingCatalogStore.getState().fetchReadingProgress();

      expect(merged).toContain("r1");
      expect(merged).toContain("r2");
      expect(merged).toContain("r3");

      const stats = useReadingCatalogStore.getState().readingStats;
      expect(stats?.totalWordsRead).toBe(1200);
      expect(stats?.averageScore).toBe(95);
    });
  });

  // ==========================================================================
  // 5. Offline Fallback & Error Resilience
  // ==========================================================================
  describe("5. Offline Fallback & Error Resilience", () => {
    it("gracefully falls back to existing completed passages when progress API fails", async () => {
      useReadingCatalogStore.setState({
        completedPassageIds: ["r5"],
      });

      vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network connection dropped"));

      const result = await useReadingCatalogStore.getState().fetchReadingProgress();

      expect(result).toEqual(["r5"]);
    });

    it("gracefully returns null when non-existent passage ID is queried", async () => {
      const nonExistent = await useReadingCatalogStore.getState().fetchPassageDetail("r9999");
      expect(nonExistent).toBeNull();
    });
  });
});
