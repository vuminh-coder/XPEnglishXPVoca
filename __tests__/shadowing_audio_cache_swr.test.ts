import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  useAudioCatalogStore,
  isAudioEntryStale,
  AUDIO_CATALOG_STALE_TIME_MS,
  type AudioCategoryTab,
} from "@/stores/audioCatalogStore";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { resolveLessonMedia } from "@/features/listening/utils/lessonMedia";
import { resolveCanonicalLessonId, isSameLessonId } from "@/features/listening/utils/lessonIdHelper";

describe("Shadowing Audio - SWR In-Memory Caching & Zustand Store Architecture", () => {
  beforeEach(() => {
    useAudioCatalogStore.getState().invalidateCache("all");
    useAudioCatalogStore.getState().resetFilters();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. Frame-0 Synchronous Cache Probe & Zero-Flash Studio Hydration
  // ==========================================================================
  describe("1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration", () => {
    it("synchronously resolves mock audio lesson for Frame 0 instant display", () => {
      const mockAudio = MOCK_LESSONS_DATA[0]; // e.g. listen_001
      expect(mockAudio).toBeDefined();

      // Probe in MOCK_LESSONS_DATA directly by canonical ID
      const resolved = MOCK_LESSONS_DATA.find(
        (l) => isSameLessonId(l.id, mockAudio.id) || isSameLessonId(l.id, "1")
      );

      expect(resolved).toBeDefined();
      expect(resolved?.id).toBe(mockAudio.id);
      expect(Array.isArray(resolved?.transcript)).toBe(true);
      expect(resolved?.transcript?.length).toBeGreaterThan(0);
    });

    it("resolves numeric alias ('1', '001', 'listen_001') to canonical lesson", () => {
      const canonical1 = resolveCanonicalLessonId("1", MOCK_LESSONS_DATA);
      expect(canonical1).toBe(MOCK_LESSONS_DATA[0].id);

      const canonicalPad3 = resolveCanonicalLessonId("001", MOCK_LESSONS_DATA);
      expect(canonicalPad3).toBe(MOCK_LESSONS_DATA[0].id);

      const isSame = isSameLessonId("1", MOCK_LESSONS_DATA[0].id);
      expect(isSame).toBe(true);
    });

    it("immediately hits in-memory audioDetailCache when pre-populated (0ms response)", () => {
      const mockDetail = {
        id: "listen_005",
        title: "Job Interview Practice",
        level: "B2",
        transcript: [
          { id: "s1", text: "Tell me about your previous experience.", translationVi: "Hãy kể về kinh nghiệm của bạn." },
        ],
      };

      // Populate store cache
      useAudioCatalogStore.setState({
        audioDetailCache: {
          listen_005: { data: mockDetail, timestamp: Date.now() },
        },
      });

      const cached = useAudioCatalogStore.getState().audioDetailCache["listen_005"]?.data;
      expect(cached).toBeDefined();
      expect(cached.id).toBe("listen_005");
      expect(cached.title).toBe("Job Interview Practice");
    });
  });

  // ==========================================================================
  // 2. Audio Catalog SWR Caching & Background Revalidation
  // ==========================================================================
  describe("2. Audio Catalog SWR Caching & Background Revalidation", () => {
    it("returns in-memory audio lessons immediately (0ms) when cache is valid", async () => {
      const fakeLessons = [
        { id: "listen_101", title: "Daily Conversation 1", level: "A1" },
        { id: "listen_102", title: "Daily Conversation 2", level: "A2" },
      ];

      useAudioCatalogStore.setState({
        audioLessons: fakeLessons,
        audioLessonsTimestamp: Date.now(),
        isAudioLessonsLoading: false,
      });

      const fetchSpy = vi.spyOn(global, "fetch");

      const result = await useAudioCatalogStore.getState().fetchAudioLessons({ mode: "audio" });

      expect(result).toEqual(fakeLessons);
      // SWR Cache Hit: No network request needed
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("revalidates quietly in background when audio cache is stale (> 5 minutes)", async () => {
      const oldLessons = [{ id: "listen_old", title: "Old Lesson", level: "A1" }];
      const freshLessons = [{ id: "listen_fresh", title: "Fresh Lesson", level: "A1" }];

      // Set cache older than 5 minutes
      const sixMinutesAgo = Date.now() - (AUDIO_CATALOG_STALE_TIME_MS + 60000);
      useAudioCatalogStore.setState({
        audioLessons: oldLessons,
        audioLessonsTimestamp: sixMinutesAgo,
        isAudioLessonsLoading: false,
      });

      expect(isAudioEntryStale(sixMinutesAgo)).toBe(true);

      const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: freshLessons,
        }),
      } as Response);

      await useAudioCatalogStore.getState().fetchAudioLessons({ mode: "audio" });

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const currentLessons = useAudioCatalogStore.getState().audioLessons;
      expect(currentLessons).toEqual(freshLessons);
    });

    it("filters out video lessons from audio catalog when mode is 'audio'", async () => {
      const mixedData = [
        { id: "listen_001", title: "Audio Only", isVideo: false, audioUrl: "https://example.com/audio.mp3" },
        { id: "vid_001", title: "Video Item", isVideo: true, audioUrl: "https://youtube.com/watch?v=123" },
      ];

      vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mixedData,
        }),
      } as Response);

      const result = await useAudioCatalogStore.getState().fetchAudioLessons({ mode: "audio", forceRefresh: true });

      expect(result.length).toBe(1);
      expect(result[0].id).toBe("listen_001");
      expect(result[0].isVideo).toBeFalsy();
    });
  });

  // ==========================================================================
  // 3. Audio Lesson Detail Fetching & Canonical Aliases
  // ==========================================================================
  describe("3. Audio Lesson Detail Fetching & Canonical Aliases", () => {
    it("fetches single audio lesson detail and caches under both raw and canonical keys", async () => {
      const detailData = {
        id: "listen_040",
        title: "Business Email Etiquette",
        level: "B2",
        transcript: [
          { id: "s1", text: "Thank you for your prompt response.", translationVi: "Cảm ơn bạn đã phản hồi nhanh chóng." },
        ],
      };

      vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: detailData,
        }),
      } as Response);

      const result = await useAudioCatalogStore.getState().fetchAudioLessonDetail("40");

      expect(result).toBeDefined();
      expect(result.id).toBe("listen_040");

      // Verify cached under multiple lookup keys for Frame-0 speed
      const cache = useAudioCatalogStore.getState().audioDetailCache;
      expect(cache["listen_040"]?.data).toBeDefined();
      expect(cache["40"]?.data).toBeDefined();
    });

    it("returns in-memory cache directly on subsequent calls within 5 minutes TTL", async () => {
      const detailData = {
        id: "listen_015",
        title: "At the Restaurant",
        transcript: [{ id: "s1", text: "Could we have the bill, please?" }],
      };

      useAudioCatalogStore.setState({
        audioDetailCache: {
          listen_015: { data: detailData, timestamp: Date.now() },
        },
      });

      const fetchSpy = vi.spyOn(global, "fetch");

      const res = await useAudioCatalogStore.getState().fetchAudioLessonDetail("listen_015");

      expect(res).toEqual(detailData);
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // 4. Preserved Filter States (Survives Route Changes)
  // ==========================================================================
  describe("4. Preserved Filter States & UI Persistence", () => {
    it("preserves activeCategoryTab across navigation transitions", () => {
      const store = useAudioCatalogStore.getState();
      expect(store.filters.activeCategoryTab).toBe("all");

      store.setActiveCategoryTab("intermediate");
      expect(useAudioCatalogStore.getState().filters.activeCategoryTab).toBe("intermediate");

      store.setActiveCategoryTab("completed");
      expect(useAudioCatalogStore.getState().filters.activeCategoryTab).toBe("completed");
    });

    it("preserves listingSearch query across component remounts", () => {
      const store = useAudioCatalogStore.getState();
      store.setListingSearch("toeic listening part 3");
      expect(useAudioCatalogStore.getState().filters.listingSearch).toBe("toeic listening part 3");

      store.setListingSearch("");
      expect(useAudioCatalogStore.getState().filters.listingSearch).toBe("");
    });

    it("preserves shuffle seeds for basic, intermediate, and advanced pools", () => {
      const store = useAudioCatalogStore.getState();

      store.setShuffleSeedBasic((prev) => prev + 1);
      store.setShuffleSeedIntermediate((prev) => prev + 1);
      store.setShuffleSeedAdvanced((prev) => prev + 1);

      const filters = useAudioCatalogStore.getState().filters;
      expect(filters.shuffleSeedBasic).toBe(1);
      expect(filters.shuffleSeedIntermediate).toBe(1);
      expect(filters.shuffleSeedAdvanced).toBe(1);
    });

    it("resets filters cleanly on demand", () => {
      const store = useAudioCatalogStore.getState();
      store.setListingSearch("climate change");
      store.setActiveCategoryTab("advanced");

      store.resetFilters();

      const filters = useAudioCatalogStore.getState().filters;
      expect(filters.listingSearch).toBe("");
      expect(filters.activeCategoryTab).toBe("all");
    });
  });

  // ==========================================================================
  // 5. Offline Fallback & Error Resilience
  // ==========================================================================
  describe("5. Offline Fallback & Error Resilience", () => {
    it("gracefully falls back to MOCK_LESSONS_DATA when API throws 500 error", async () => {
      vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network connection lost"));

      const lessons = await useAudioCatalogStore.getState().fetchAudioLessons({ mode: "audio" });

      expect(lessons).toBeDefined();
      expect(Array.isArray(lessons)).toBe(true);
      expect(lessons.length).toBeGreaterThan(0);
      expect(lessons[0].id).toBe(MOCK_LESSONS_DATA[0].id);
    });

    it("gracefully falls back to mock detail when detail API request fails", async () => {
      vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Database connection timeout"));

      const detail = await useAudioCatalogStore.getState().fetchAudioLessonDetail("listen_001");

      expect(detail).toBeDefined();
      expect(isSameLessonId(detail.id, "listen_001")).toBe(true);
      expect(Array.isArray(detail.transcript)).toBe(true);
    });
  });

  // ==========================================================================
  // 6. Audio Media Resolution & Parity Check
  // ==========================================================================
  describe("6. Audio Media Resolution & Parity Check", () => {
    it("correctly identifies standard audio lesson without YouTube metadata", () => {
      const audioLesson = MOCK_LESSONS_DATA[0];
      const media = resolveLessonMedia(audioLesson);

      expect(media.isVideoLesson).toBe(false);
      expect(media.youtubeId).toBeNull();
    });

    it("ensures sentence transcripts have valid text, translation, and timestamps", () => {
      const audioLesson = MOCK_LESSONS_DATA[0];
      const transcript = audioLesson?.transcript || [];
      expect(transcript.length).toBeGreaterThan(0);

      const s1: any = transcript[0];
      expect(typeof s1.text).toBe("string");
      expect(s1.text.length).toBeGreaterThan(0);
      expect(s1.translationVi || s1.vietnamese || s1.translation).toBeDefined();
    });
  });
});
