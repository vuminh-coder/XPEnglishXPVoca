import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  useVideoCatalogStore,
  buildLessonQueryKey,
  isEntryStale,
  VIDEO_CATALOG_STALE_TIME_MS,
  type VideoCatalogFilters,
} from "@/stores/videoCatalogStore";
import { MOCK_VIDEO_LESSONS, MOCK_VIDEO_CATEGORIES } from "@/features/listening/data/videoCatalogMockData";

describe("Video Dictation - SWR & Zustand Store Caching Engine (Idea 1 & Idea 2)", () => {
  beforeEach(() => {
    // Reset store state prior to every test
    useVideoCatalogStore.getState().invalidateCache("all");
    useVideoCatalogStore.getState().resetFilters();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. Query Key Generation & Normalization
  // ==========================================================================
  describe("1. buildLessonQueryKey - Deterministic Key Serialization", () => {
    it("generates correct key with default filter parameters", () => {
      const filters: VideoCatalogFilters = {
        selectedCategory: "all",
        selectedLevel: "Tất cả",
        searchQuery: "",
        sortBy: "popular",
      };
      const key = buildLessonQueryKey(filters);
      expect(key).toBe("all__Tất cả____popular");
    });

    it("normalizes search query by trimming and converting to lowercase", () => {
      const filters: VideoCatalogFilters = {
        selectedCategory: "ted-ed",
        selectedLevel: "B2",
        searchQuery: "  TED TALK SPEECH  ",
        sortBy: "views",
      };
      const key = buildLessonQueryKey(filters);
      expect(key).toBe("ted-ed__B2__ted talk speech__views");
    });

    it("handles missing or undefined values gracefully with safe fallbacks", () => {
      const filters = {
        selectedCategory: "",
        selectedLevel: "",
        searchQuery: "",
        sortBy: "",
      } as unknown as VideoCatalogFilters;
      const key = buildLessonQueryKey(filters);
      expect(key).toBe("all__Tất cả____popular");
    });
  });

  // ==========================================================================
  // 2. Cache Staleness Check
  // ==========================================================================
  describe("2. isEntryStale - Time-To-Live (TTL) Validation", () => {
    it("reports fresh for timestamps generated right now", () => {
      const now = Date.now();
      expect(isEntryStale(now)).toBe(false);
    });

    it("reports stale when timestamp exceeds 5-minute TTL", () => {
      const past = Date.now() - (VIDEO_CATALOG_STALE_TIME_MS + 1000);
      expect(isEntryStale(past)).toBe(true);
    });

    it("reports fresh within 4 minutes window", () => {
      const past = Date.now() - (4 * 60 * 1000);
      expect(isEntryStale(past)).toBe(false);
    });

    it("reports stale for 0 or undefined timestamps", () => {
      expect(isEntryStale(0)).toBe(true);
      expect(isEntryStale(undefined as unknown as number)).toBe(true);
    });
  });

  // ==========================================================================
  // 3. Filter State Preservation (Idea 2: Zustand Global Store)
  // ==========================================================================
  describe("3. Filter State Preservation across user navigations", () => {
    it("updates single filter via setFilter and preserves other filters", () => {
      const store = useVideoCatalogStore.getState();
      store.setFilter("selectedCategory", "ted-ed");
      store.setFilter("selectedLevel", "C1");

      const current = useVideoCatalogStore.getState().filters;
      expect(current.selectedCategory).toBe("ted-ed");
      expect(current.selectedLevel).toBe("C1");
      expect(current.searchQuery).toBe("");
      expect(current.sortBy).toBe("popular");
    });

    it("updates multiple filters in batch via setFilters", () => {
      const store = useVideoCatalogStore.getState();
      store.setFilters({
        selectedCategory: "ielts",
        searchQuery: "cambridge 19",
        sortBy: "newest",
      });

      const current = useVideoCatalogStore.getState().filters;
      expect(current.selectedCategory).toBe("ielts");
      expect(current.searchQuery).toBe("cambridge 19");
      expect(current.sortBy).toBe("newest");
      expect(current.selectedLevel).toBe("Tất cả");
    });

    it("resets all filters back to default values via resetFilters", () => {
      const store = useVideoCatalogStore.getState();
      store.setFilters({
        selectedCategory: "ielts",
        searchQuery: "interview",
        sortBy: "title_asc",
      });
      store.resetFilters();

      const current = useVideoCatalogStore.getState().filters;
      expect(current.selectedCategory).toBe("all");
      expect(current.selectedLevel).toBe("Tất cả");
      expect(current.searchQuery).toBe("");
      expect(current.sortBy).toBe("popular");
    });

    it("tracks and retains scroll position across route transitions", () => {
      const store = useVideoCatalogStore.getState();
      store.setScrollPosition(640);
      expect(useVideoCatalogStore.getState().scrollPosition).toBe(640);

      store.setScrollPosition(0);
      expect(useVideoCatalogStore.getState().scrollPosition).toBe(0);
    });
  });

  // ==========================================================================
  // 4. SWR In-Memory Caching: 0ms Cache Hit & Background Revalidation
  // ==========================================================================
  describe("4. SWR Lessons & Categories Cache Hit (0ms return)", () => {
    it("returns cached categories immediately without network calls on fresh cache hit", async () => {
      const fakeCategories = [
        { id: "cat-1", slug: "ted", name: "TED Talks", description: null, icon: "video", lessonsCount: 5 },
      ];

      // Seed cache directly
      useVideoCatalogStore.setState({
        categories: fakeCategories,
        categoriesTimestamp: Date.now(),
      });

      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const result = await useVideoCatalogStore.getState().fetchCategories();

      expect(result).toEqual(fakeCategories);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("returns cached lessons immediately (0ms) when QueryKey hits fresh cache", async () => {
      const filters = {
        selectedCategory: "ted-ed",
        selectedLevel: "B2",
        searchQuery: "",
        sortBy: "popular",
      };
      const queryKey = buildLessonQueryKey(filters);
      const fakeLessons = [
        {
          id: "lesson-test-1",
          slug: "test-lesson",
          title: "Test Lesson",
          description: "Desc",
          externalId: "dQw4w9WgXcQ",
          thumbnailUrl: "https://example.com/thumb.jpg",
          durationSeconds: 120,
          durationFormatted: "02:00",
          cefrLevel: "B2",
          supportedTypes: "ALL",
          accent: "en-US",
          category: { id: "cat-1", slug: "ted-ed", name: "TED-Ed" },
          totalSentences: 10,
          viewCount: 100,
        },
      ];

      useVideoCatalogStore.setState({
        filters,
        lessonsCache: {
          [queryKey]: {
            data: fakeLessons,
            timestamp: Date.now(),
          },
        },
      });

      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const result = await useVideoCatalogStore.getState().fetchLessons();

      expect(result).toEqual(fakeLessons);
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(useVideoCatalogStore.getState().getCurrentLessons()).toEqual(fakeLessons);
    });

    it("triggers revalidation on forceRefresh even if cache exists", async () => {
      const filters = useVideoCatalogStore.getState().filters;
      const queryKey = buildLessonQueryKey(filters);
      const initialLessons = [
        {
          id: "lesson-initial",
          slug: "initial",
          title: "Initial Title",
          description: null,
          externalId: "ext1",
          thumbnailUrl: "https://example.com/1.jpg",
          durationSeconds: 60,
          durationFormatted: "01:00",
          cefrLevel: "B1",
          supportedTypes: "ALL",
          accent: "en-US",
          category: null,
          totalSentences: 5,
          viewCount: 10,
        },
      ];

      useVideoCatalogStore.setState({
        lessonsCache: {
          [queryKey]: {
            data: initialLessons,
            timestamp: Date.now(),
          },
        },
      });

      const freshLessonsFromApi = [
        {
          ...initialLessons[0],
          title: "Updated Title from API",
        },
      ];

      // Mock fetch return
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          lessons: freshLessonsFromApi,
        }),
      } as Response);

      const result = await useVideoCatalogStore.getState().fetchLessons(undefined, { forceRefresh: true });

      expect(fetchSpy).toHaveBeenCalled();
      expect(result[0].title).toBe("Updated Title from API");
      expect(useVideoCatalogStore.getState().lessonsCache[queryKey].data[0].title).toBe("Updated Title from API");
    });
  });

  // ==========================================================================
  // 5. Lesson Detail & Comprehension Quiz Caching
  // ==========================================================================
  describe("5. Lesson Detail & Comprehension Quiz SWR Caching", () => {
    it("returns cached lesson detail immediately on fresh cache hit", async () => {
      const lessonId = "vid_julian_treasure_speak";
      const cachedDetail = {
        id: lessonId,
        title: "How to speak so that people want to listen",
        cefrLevel: "B2",
      };

      useVideoCatalogStore.setState({
        lessonDetailCache: {
          [lessonId]: {
            data: cachedDetail,
            timestamp: Date.now(),
          },
        },
      });

      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const result = await useVideoCatalogStore.getState().fetchLessonDetail(lessonId);

      expect(result).toEqual(cachedDetail);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("falls back to mock lesson detail and caches when API fetch throws", async () => {
      const lessonId = MOCK_VIDEO_LESSONS[0].id;
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network offline"));

      const result = await useVideoCatalogStore.getState().fetchLessonDetail(lessonId);

      expect(fetchSpy).toHaveBeenCalled();
      expect(result).not.toBeNull();
      expect(result.id).toBe(lessonId);
      expect(result.title).toBe(MOCK_VIDEO_LESSONS[0].title);

      // Verify it was cached in store
      const cached = useVideoCatalogStore.getState().lessonDetailCache[lessonId];
      expect(cached).toBeDefined();
      expect(cached.data.title).toBe(MOCK_VIDEO_LESSONS[0].title);
    });

    it("caches comprehension quiz data and returns 0ms on subsequent requests", async () => {
      const lessonId = "vid_julian_treasure_speak";
      const mockQuiz = {
        lessonId,
        lessonTitle: "Julian Treasure Speech",
        questions: [
          {
            id: 1,
            questionEn: "What is the key takeaway?",
            questionVi: "Ý chính là gì?",
            optionsEn: ["A", "B", "C", "D"],
            optionsVi: ["A", "B", "C", "D"],
            correctAnswer: 0,
            explanationEn: "Reason A",
            explanationVi: "Lý do A",
          },
        ],
      };

      useVideoCatalogStore.setState({
        quizCache: {
          [lessonId]: {
            data: mockQuiz as any,
            timestamp: Date.now(),
          },
        },
      });

      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const result = await useVideoCatalogStore.getState().fetchQuiz(lessonId);

      expect(result).toEqual(mockQuiz);
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // 6. Cache Invalidation Engine
  // ==========================================================================
  describe("6. invalidateCache - Granular & Global Cache Purging", () => {
    beforeEach(() => {
      // Setup state with all caches populated
      useVideoCatalogStore.setState({
        categories: [{ id: "c1", slug: "s1", name: "N1", description: null, icon: null }],
        categoriesTimestamp: Date.now(),
        lessonsCache: {
          key1: { data: [] as any, timestamp: Date.now() },
        },
        lessonDetailCache: {
          l1: { data: {} as any, timestamp: Date.now() },
        },
        quizCache: {
          q1: { data: {} as any, timestamp: Date.now() },
        },
      });
    });

    it("purges categories cache only when scope is categories", () => {
      useVideoCatalogStore.getState().invalidateCache("categories");

      const state = useVideoCatalogStore.getState();
      expect(state.categories.length).toBe(0);
      expect(state.categoriesTimestamp).toBe(0);
      expect(Object.keys(state.lessonsCache).length).toBe(1);
    });

    it("purges lessons query cache only when scope is lessons", () => {
      useVideoCatalogStore.getState().invalidateCache("lessons");

      const state = useVideoCatalogStore.getState();
      expect(Object.keys(state.lessonsCache).length).toBe(0);
      expect(state.categories.length).toBe(1);
    });

    it("purges all caches completely when scope is all", () => {
      useVideoCatalogStore.getState().invalidateCache("all");

      const state = useVideoCatalogStore.getState();
      expect(state.categories.length).toBe(0);
      expect(state.categoriesTimestamp).toBe(0);
      expect(Object.keys(state.lessonsCache).length).toBe(0);
      expect(Object.keys(state.lessonDetailCache).length).toBe(0);
      expect(Object.keys(state.quizCache).length).toBe(0);
    });
  });
});
