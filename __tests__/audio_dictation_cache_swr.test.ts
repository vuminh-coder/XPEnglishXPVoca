import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  useAudioCatalogStore,
  isAudioEntryStale,
  AUDIO_CATALOG_STALE_TIME_MS,
  type AudioCategoryTab,
} from "@/stores/audioCatalogStore";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";

describe("Audio Dictation - SWR & Zustand Store Caching Engine (Idea 1 & Idea 2)", () => {
  beforeEach(() => {
    useAudioCatalogStore.getState().invalidateCache("all");
    useAudioCatalogStore.getState().resetFilters();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. Time-To-Live (TTL) & Staleness Check
  // ==========================================================================
  describe("1. isAudioEntryStale - Cache Expiration & Freshness Validation", () => {
    it("reports fresh for newly created timestamps", () => {
      const now = Date.now();
      expect(isAudioEntryStale(now)).toBe(false);
    });

    it("reports fresh within 4-minute operational window", () => {
      const fourMinutesAgo = Date.now() - 4 * 60 * 1000;
      expect(isAudioEntryStale(fourMinutesAgo)).toBe(false);
    });

    it("reports stale when timestamp exceeds 5-minute TTL", () => {
      const pastTtl = Date.now() - (AUDIO_CATALOG_STALE_TIME_MS + 2000);
      expect(isAudioEntryStale(pastTtl)).toBe(true);
    });

    it("reports stale for 0 or undefined timestamps", () => {
      expect(isAudioEntryStale(0)).toBe(true);
      expect(isAudioEntryStale(undefined as unknown as number)).toBe(true);
    });
  });

  // ==========================================================================
  // 2. Filter State Preservation (Idea 2: Zustand Global Store)
  // ==========================================================================
  describe("2. Audio Filter State Preservation across Page Navigation", () => {
    it("retains search query when navigating away and returning", () => {
      const store = useAudioCatalogStore.getState();
      store.setListingSearch("Office Meeting");

      expect(useAudioCatalogStore.getState().filters.listingSearch).toBe("Office Meeting");
    });

    it("preserves active category tab across navigation", () => {
      const store = useAudioCatalogStore.getState();
      store.setActiveCategoryTab("intermediate");
      expect(useAudioCatalogStore.getState().filters.activeCategoryTab).toBe("intermediate");

      store.setActiveCategoryTab("advanced");
      expect(useAudioCatalogStore.getState().filters.activeCategoryTab).toBe("advanced");

      store.setActiveCategoryTab("completed");
      expect(useAudioCatalogStore.getState().filters.activeCategoryTab).toBe("completed");
    });

    it("manages and retains shuffle seeds for basic, intermediate, and advanced pools", () => {
      const store = useAudioCatalogStore.getState();

      store.setShuffleSeedBasic((prev) => prev + 1);
      store.setShuffleSeedIntermediate((prev) => prev + 2);
      store.setShuffleSeedAdvanced((prev) => prev + 3);

      const filters = useAudioCatalogStore.getState().filters;
      expect(filters.shuffleSeedBasic).toBe(1);
      expect(filters.shuffleSeedIntermediate).toBe(2);
      expect(filters.shuffleSeedAdvanced).toBe(3);
    });

    it("restores all filters back to defaults via resetFilters", () => {
      const store = useAudioCatalogStore.getState();
      store.setListingSearch("test search");
      store.setActiveCategoryTab("advanced");
      store.setShuffleSeedBasic(5);

      store.resetFilters();

      const filters = useAudioCatalogStore.getState().filters;
      expect(filters.listingSearch).toBe("");
      expect(filters.activeCategoryTab).toBe("all");
      expect(filters.shuffleSeedBasic).toBe(0);
      expect(filters.shuffleSeedIntermediate).toBe(0);
      expect(filters.shuffleSeedAdvanced).toBe(0);
    });

    it("tracks and preserves scroll position across route changes", () => {
      const store = useAudioCatalogStore.getState();
      store.setScrollPosition(1024);
      expect(useAudioCatalogStore.getState().filters.scrollPosition).toBe(1024);
    });
  });

  // ==========================================================================
  // 3. SWR In-Memory Caching: 0ms Cache Hit & Background Revalidation
  // ==========================================================================
  describe("3. SWR Audio Lessons Cache: 0ms Frame 0 Return & Background Sync", () => {
    it("returns cached audio lessons immediately (0ms) without network call on fresh hit", async () => {
      const mockLessons = [
        { id: "listen_001", title: "Office Relocation Announcement", level: "Intermediate" },
        { id: "listen_002", title: "Job Interview Practice", level: "Advanced" },
      ];

      useAudioCatalogStore.setState({
        audioLessons: mockLessons,
        audioLessonsTimestamp: Date.now(),
      });

      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const result = await useAudioCatalogStore.getState().fetchAudioLessons({ mode: "audio" });

      expect(result).toEqual(mockLessons);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("filters out video/YouTube lessons when mode is audio", async () => {
      const mixedLessons = [
        { id: "listen_001", title: "Standard Audio", isVideo: false, audioUrl: "https://example.com/audio.mp3" },
        { id: "vid_001", title: "Video Lesson", isVideo: true, audioUrl: "https://youtube.com/watch?v=123" },
        { id: "listen_002", title: "YouTube Audio", isVideo: false, audioUrl: "https://youtu.be/456" },
      ];

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mixedLessons,
        }),
      } as Response);

      const result = await useAudioCatalogStore.getState().fetchAudioLessons({ mode: "audio" });

      expect(result.length).toBe(1);
      expect(result[0].id).toBe("listen_001");
      expect(useAudioCatalogStore.getState().audioLessons.length).toBe(1);
    });

    it("triggers network revalidation on forceRefresh even when fresh cache exists", async () => {
      const initialLessons = [
        { id: "listen_001", title: "Initial Title", level: "Intermediate" },
      ];

      useAudioCatalogStore.setState({
        audioLessons: initialLessons,
        audioLessonsTimestamp: Date.now(),
      });

      const freshLessons = [
        { id: "listen_001", title: "Updated Title From DB", level: "Intermediate" },
      ];

      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: freshLessons,
        }),
      } as Response);

      const result = await useAudioCatalogStore.getState().fetchAudioLessons({ forceRefresh: true });

      expect(fetchSpy).toHaveBeenCalled();
      expect(result[0].title).toBe("Updated Title From DB");
      expect(useAudioCatalogStore.getState().audioLessons[0].title).toBe("Updated Title From DB");
    });

    it("falls back to offline MOCK_LESSONS_DATA when API returns error and cache is empty", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Neon DB connection timeout"));

      const result = await useAudioCatalogStore.getState().fetchAudioLessons({ mode: "audio" });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((l) => !l.id?.startsWith("vid_") && !l.audioUrl?.includes("youtube"))).toBe(true);
    });
  });

  // ==========================================================================
  // 4. Audio Lesson Detail SWR Caching
  // ==========================================================================
  describe("4. Audio Lesson Detail Caching & Multi-Key Resolution", () => {
    it("returns cached lesson detail immediately on fresh cache hit", async () => {
      const lessonId = "listen_001";
      const cachedDetail = {
        id: lessonId,
        title: "Office Relocation Announcement",
        transcript: [{ id: 1, text: "Attention all employees." }],
      };

      useAudioCatalogStore.setState({
        audioDetailCache: {
          [lessonId]: {
            data: cachedDetail,
            timestamp: Date.now(),
          },
        },
      });

      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const result = await useAudioCatalogStore.getState().fetchAudioLessonDetail(lessonId);

      expect(result).toEqual(cachedDetail);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("resolves canonical lesson aliases and caches both keys", async () => {
      const canonicalId = "listen_001";
      const mockDetail = {
        id: canonicalId,
        title: "Office Relocation Announcement",
        transcript: [{ id: 1, text: "Sample" }],
      };

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockDetail,
        }),
      } as Response);

      // Request by numeric alias "1"
      const result = await useAudioCatalogStore.getState().fetchAudioLessonDetail("1");

      expect(result).toEqual(mockDetail);
      const cache = useAudioCatalogStore.getState().audioDetailCache;
      expect(cache[canonicalId]).toBeDefined();
      expect(cache["1"]).toBeDefined();
    });

    it("falls back to mock lesson data when API fails and cache is empty", async () => {
      const lessonId = MOCK_LESSONS_DATA[0].id;
      vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network disconnect"));

      const result = await useAudioCatalogStore.getState().fetchAudioLessonDetail(lessonId);

      expect(result).toBeDefined();
      expect(result.id).toBe(lessonId);
      expect(result.title).toBe(MOCK_LESSONS_DATA[0].title);
    });
  });

  // ==========================================================================
  // 5. Cache Invalidation Engine
  // ==========================================================================
  describe("5. invalidateCache - Granular & Global Cache Purging", () => {
    beforeEach(() => {
      useAudioCatalogStore.setState({
        audioLessons: [{ id: "l1" }],
        audioLessonsTimestamp: Date.now(),
        audioDetailCache: {
          l1: { data: { id: "l1" }, timestamp: Date.now() },
        },
      });
    });

    it("clears audio lessons only when scope is lessons", () => {
      useAudioCatalogStore.getState().invalidateCache("lessons");

      const state = useAudioCatalogStore.getState();
      expect(state.audioLessons.length).toBe(0);
      expect(state.audioLessonsTimestamp).toBe(0);
      expect(Object.keys(state.audioDetailCache).length).toBe(1);
    });

    it("clears audio lesson detail cache only when scope is detail", () => {
      useAudioCatalogStore.getState().invalidateCache("detail");

      const state = useAudioCatalogStore.getState();
      expect(state.audioLessons.length).toBe(1);
      expect(Object.keys(state.audioDetailCache).length).toBe(0);
    });

    it("clears all caches completely when scope is all", () => {
      useAudioCatalogStore.getState().invalidateCache("all");

      const state = useAudioCatalogStore.getState();
      expect(state.audioLessons.length).toBe(0);
      expect(state.audioLessonsTimestamp).toBe(0);
      expect(Object.keys(state.audioDetailCache).length).toBe(0);
    });
  });
});
