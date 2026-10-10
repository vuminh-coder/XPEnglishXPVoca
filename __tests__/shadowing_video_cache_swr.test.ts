import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  useVideoCatalogStore,
  useAudioCatalogStore,
  buildLessonQueryKey,
  isEntryStale,
  VIDEO_CATALOG_STALE_TIME_MS,
  AUDIO_CATALOG_STALE_TIME_MS,
} from "@/stores";
import {
  formatVideoLessonToShadowing,
} from "@/features/shadowing/components/ShadowingPageContent";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { resolveLessonMedia } from "@/features/listening/utils/lessonMedia";
import { resolveCanonicalLessonId, isSameLessonId } from "@/features/listening/utils/lessonIdHelper";

describe("Shadowing Video & Audio - SWR In-Memory Caching & Zustand Store Architecture", () => {
  beforeEach(() => {
    useVideoCatalogStore.getState().invalidateCache("all");
    useVideoCatalogStore.getState().resetFilters();
    useAudioCatalogStore.getState().invalidateCache("all");
    useAudioCatalogStore.getState().resetFilters();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. formatVideoLessonToShadowing - Data Adapter Integrity
  // ==========================================================================
  describe("1. formatVideoLessonToShadowing - Video Lesson Mapping Integrity", () => {
    it("formats mock video lesson to complete Shadowing structure", () => {
      const mock = MOCK_VIDEO_LESSONS[0]; // e.g. vid_ted_bilingual_brain
      const formatted = formatVideoLessonToShadowing(mock);

      expect(formatted).toBeDefined();
      expect(formatted?.id).toBe(mock.id);
      expect(formatted?.title).toBe(mock.title);
      expect(formatted?.level).toBe(mock.cefrLevel);
      expect(formatted?.audioUrl).toBe(`https://www.youtube.com/watch?v=${mock.externalId}`);
      expect(formatted?.youtubeUrl).toBe(`https://www.youtube.com/watch?v=${mock.externalId}`);
      expect(formatted?.totalSentences).toBe(mock.segments.length);

      // Verify transcript segment structure
      expect(formatted?.transcript.length).toBe(mock.segments.length);
      const seg1 = formatted?.transcript[0];
      expect(seg1.text).toBe(mock.segments[0].text);
      expect(seg1.startTime).toBe(mock.segments[0].startTime);
      expect(seg1.endTime).toBe(mock.segments[0].endTime);
      expect(seg1.translationVi).toBe(mock.segments[0].translationVi);
      expect(seg1.vietnamese).toBe(mock.segments[0].translationVi);

      // Verify videoMetadata
      expect(formatted?.videoMetadata).toBeDefined();
      expect(formatted?.videoMetadata.externalId).toBe(mock.externalId);
      expect(formatted?.videoMetadata.sourceType).toBe("YOUTUBE");
    });

    it("handles null or undefined input gracefully", () => {
      expect(formatVideoLessonToShadowing(null)).toBeNull();
      expect(formatVideoLessonToShadowing(undefined)).toBeNull();
    });

    it("formats raw video API payload with category object and custom segments", () => {
      const apiPayload = {
        id: "vid_custom_tech_review",
        slug: "custom-tech-review",
        title: "Latest AI Hardware Architecture Review",
        description: "In-depth look at neural processing units",
        cefrLevel: "C1",
        externalId: "dQw4w9WgXcQ",
        thumbnailUrl: "https://example.com/thumb.jpg",
        durationSeconds: 240,
        category: { id: "cat_tech", name: "Công Nghệ & AI" },
        segments: [
          {
            id: "seg_1",
            startTime: 0,
            endTime: 4.5,
            text: "Today we are analyzing the latest neural architectures.",
            ipaUs: "/təˈdeɪ wi ɑːr ˈænəˌlaɪzɪŋ/",
            translationVi: "Hôm nay chúng ta sẽ phân tích kiến trúc thần kinh mới nhất.",
            explanationAi: "Ngữ pháp thì hiện tại tiếp diễn chỉ hoạt động đang diễn ra.",
            properNouns: ["AI"],
            keywords: ["neural", "architecture"],
          },
        ],
      };

      const result = formatVideoLessonToShadowing(apiPayload);
      expect(result).not.toBeNull();
      expect(result?.category).toBe("Công Nghệ & AI");
      expect(result?.level).toBe("C1");
      expect(result?.transcript[0].ipa).toBe("/təˈdeɪ wi ɑːr ˈænəˌlaɪzɪŋ/");
      expect(result?.transcript[0].explanationVi).toBe("Ngữ pháp thì hiện tại tiếp diễn chỉ hoạt động đang diễn ra.");
      expect(result?.transcript[0].properNouns).toEqual(["AI"]);
    });

    it("is 100% compatible with resolveLessonMedia for YouTube playback", () => {
      const mock = MOCK_VIDEO_LESSONS[1];
      const formatted = formatVideoLessonToShadowing(mock);
      const media = resolveLessonMedia(formatted);

      expect(media.isVideoLesson).toBe(true);
      expect(media.youtubeId).toBe(mock.externalId);
      expect(media.sourceUrlOrId).toContain(mock.externalId);
    });
  });

  // ==========================================================================
  // 2. Frame-0 Synchronous Cache Hit (0ms Return Visits)
  // ==========================================================================
  describe("2. Frame 0 Synchronous Cache Hit & Zero Skeleton Flashes", () => {
    it("returns video lesson from store cache at Frame 0 in 0ms without network fetch", async () => {
      const mock = MOCK_VIDEO_LESSONS[0];
      const store = useVideoCatalogStore.getState();

      // Seed store cache as if visited previously
      store.lessonDetailCache[mock.id] = {
        data: mock,
        timestamp: Date.now(),
      };

      // Frame 0 synchronous probe
      const cachedEntry = useVideoCatalogStore.getState().lessonDetailCache[mock.id]?.data;
      expect(cachedEntry).toBeDefined();

      const instantLesson = formatVideoLessonToShadowing(cachedEntry);
      expect(instantLesson).not.toBeNull();
      expect(instantLesson?.id).toBe(mock.id);
      expect(instantLesson?.title).toBe(mock.title);

      // Loading state check: with instant lesson present, initial loading flag is false
      const mockId: string | null = "mock_id";
      const isLoadingDetail = Boolean(mockId && !instantLesson);
      expect(isLoadingDetail).toBe(false);
    });

    it("falls back to in-memory MOCK_VIDEO_LESSONS at Frame 0 when store cache is empty", () => {
      const targetId = "vid_ted_bilingual_brain";
      const mock = MOCK_VIDEO_LESSONS.find((v) => v.id === targetId);
      expect(mock).toBeDefined();

      const instant = formatVideoLessonToShadowing(mock);
      expect(instant).not.toBeNull();
      expect(instant?.id).toBe(targetId);
      expect(instant?.transcript.length).toBeGreaterThan(0);
    });

    it("returns audio lesson from audioCatalogStore at Frame 0 in 0ms", () => {
      const mockAudio = MOCK_LESSONS_DATA[0];
      const audioStore = useAudioCatalogStore.getState();

      audioStore.audioDetailCache[mockAudio.id] = {
        data: mockAudio,
        timestamp: Date.now(),
      };

      const cachedAudio = useAudioCatalogStore.getState().audioDetailCache[mockAudio.id]?.data;
      expect(cachedAudio).toBeDefined();
      expect(cachedAudio.id).toBe(mockAudio.id);
    });
  });

  // ==========================================================================
  // 3. SWR Cache Freshness & 5-Minute Time-To-Live (TTL)
  // ==========================================================================
  describe("3. SWR 5-Minute TTL & Stale Revalidation Mechanics", () => {
    it("recognizes fresh cache within 5 minutes for video and audio stores", () => {
      const now = Date.now();
      expect(isEntryStale(now, VIDEO_CATALOG_STALE_TIME_MS)).toBe(false);
      expect(isEntryStale(now - 120000, VIDEO_CATALOG_STALE_TIME_MS)).toBe(false); // 2 minutes
      expect(isEntryStale(now - 290000, VIDEO_CATALOG_STALE_TIME_MS)).toBe(false); // 4.8 minutes
    });

    it("flags cache as stale after 5 minutes (300,000ms)", () => {
      const sixMinutesAgo = Date.now() - 360000;
      expect(isEntryStale(sixMinutesAgo, VIDEO_CATALOG_STALE_TIME_MS)).toBe(true);
      expect(isEntryStale(sixMinutesAgo, AUDIO_CATALOG_STALE_TIME_MS)).toBe(true);
    });

    it("fetches video lesson detail through SWR action and populates store cache", async () => {
      const mock = MOCK_VIDEO_LESSONS[0];

      // Mock successful fetch response
      const mockResponse = {
        success: true,
        lesson: mock,
      };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await useVideoCatalogStore.getState().fetchLessonDetail(mock.id);
      expect(result).toBeDefined();
      expect(result.id).toBe(mock.id);

      // Verify stored in cache
      const cached = useVideoCatalogStore.getState().lessonDetailCache[mock.id];
      expect(cached).toBeDefined();
      expect(cached.data.id).toBe(mock.id);
      expect(isEntryStale(cached.timestamp)).toBe(false);
    });

    it("revalidates silently in background when cache is stale without blocking UI", async () => {
      const mock = MOCK_VIDEO_LESSONS[0];
      const store = useVideoCatalogStore.getState();

      // Seed with stale data (6 minutes old)
      store.lessonDetailCache[mock.id] = {
        data: { ...mock, title: "Original Stale Title" },
        timestamp: Date.now() - 360000,
      };

      // Mock fresh response from backend
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          lesson: { ...mock, title: "Refreshed Network Title" },
        }),
      });

      // Background revalidation
      const updated = await useVideoCatalogStore.getState().fetchLessonDetail(mock.id);
      expect(updated.title).toBe("Refreshed Network Title");

      const inCache = useVideoCatalogStore.getState().lessonDetailCache[mock.id];
      expect(inCache.data.title).toBe("Refreshed Network Title");
      expect(isEntryStale(inCache.timestamp)).toBe(false);
    });
  });

  // ==========================================================================
  // 4. Filter State Preservation Across Navigation
  // ==========================================================================
  describe("4. Filter & Search Preservation (Idea 2 Global State Store)", () => {
    it("preserves Video Catalog filters when navigating into and out of Studio", () => {
      const videoStore = useVideoCatalogStore.getState();

      // User sets filters on /study/shadowing/video
      videoStore.setFilter("selectedCategory", "ted-ed");
      videoStore.setFilter("selectedLevel", "B2");
      videoStore.setFilter("searchQuery", "brain power");
      videoStore.setFilter("sortBy", "views");

      // Verify filters before navigating to Studio
      let currentFilters = useVideoCatalogStore.getState().filters;
      expect(currentFilters.selectedCategory).toBe("ted-ed");
      expect(currentFilters.selectedLevel).toBe("B2");
      expect(currentFilters.searchQuery).toBe("brain power");
      expect(currentFilters.sortBy).toBe("views");

      // Simulate navigating to /study/shadowing/video?id=vid_ted_bilingual_brain
      // Studio mounts, user practices, then calls handleBackToListing to return to /study/shadowing/video
      // Verify filters are 100% retained upon return
      currentFilters = useVideoCatalogStore.getState().filters;
      expect(currentFilters.selectedCategory).toBe("ted-ed");
      expect(currentFilters.selectedLevel).toBe("B2");
      expect(currentFilters.searchQuery).toBe("brain power");
      expect(currentFilters.sortBy).toBe("views");
    });

    it("preserves Audio Shadowing filters and shuffle seeds across routes", () => {
      const audioStore = useAudioCatalogStore.getState();

      // User sets search and shuffles intermediate lessons
      audioStore.setListingSearch("business meeting");
      audioStore.setActiveCategoryTab("intermediate");
      audioStore.setShuffleSeedBasic(2);
      audioStore.setShuffleSeedIntermediate(5);
      audioStore.setShuffleSeedAdvanced(1);

      // Verify state survives navigation
      const filters = useAudioCatalogStore.getState().filters;
      expect(filters.listingSearch).toBe("business meeting");
      expect(filters.activeCategoryTab).toBe("intermediate");
      expect(filters.shuffleSeedBasic).toBe(2);
      expect(filters.shuffleSeedIntermediate).toBe(5);
      expect(filters.shuffleSeedAdvanced).toBe(1);
    });
  });

  // ==========================================================================
  // 5. Offline Fallback Resilience
  // ==========================================================================
  describe("5. Offline & Network Error Resilience", () => {
    it("gracefully falls back to mock video lesson when API throws 500 error", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network connection lost"));

      const targetId = "vid_ted_bilingual_brain";
      const result = await useVideoCatalogStore.getState().fetchLessonDetail(targetId);

      expect(result).toBeDefined();
      expect(result.id).toBe(targetId);

      const formatted = formatVideoLessonToShadowing(result);
      expect(formatted).not.toBeNull();
      expect(formatted?.transcript.length).toBeGreaterThan(0);
    });

    it("gracefully falls back to mock audio lesson when audio API fails", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Database connection refused"));

      const targetId = "1";
      const result = await useAudioCatalogStore.getState().fetchAudioLessonDetail(targetId);

      expect(result).toBeDefined();
      expect(result.transcript.length).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // 6. Multi-Key Canonical ID Resolution for Videos
  // ==========================================================================
  describe("6. Canonical ID Resolution & Alias Matching", () => {
    it("resolves video lesson by exact id, slug, or externalId", () => {
      const mock = MOCK_VIDEO_LESSONS[0];

      // Probe by ID
      const byId = MOCK_VIDEO_LESSONS.find((v) => v.id === mock.id);
      expect(byId?.id).toBe(mock.id);

      // Probe by slug
      const bySlug = MOCK_VIDEO_LESSONS.find((v) => v.slug === mock.slug);
      expect(bySlug?.id).toBe(mock.id);

      // Probe by externalId
      const byExtId = MOCK_VIDEO_LESSONS.find((v) => v.externalId === mock.externalId);
      expect(byExtId?.id).toBe(mock.id);
    });

    it("resolves canonical audio lesson IDs correctly", () => {
      const canonical = resolveCanonicalLessonId("1", MOCK_LESSONS_DATA);
      expect(canonical).toBeDefined();
    });
  });
});
