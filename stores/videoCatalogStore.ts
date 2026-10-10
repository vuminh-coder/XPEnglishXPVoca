import { create } from "zustand";
import { MOCK_VIDEO_LESSONS, MOCK_VIDEO_CATEGORIES } from "@/features/listening/data/videoCatalogMockData";
import type { VideoQuizData } from "@/features/listening/data/types";

export interface VideoCatalogCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  lessonsCount?: number;
}

export interface VideoCatalogLessonItem {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  externalId: string;
  thumbnailUrl: string;
  durationSeconds: number;
  durationFormatted: string;
  cefrLevel: string;
  supportedTypes: string;
  accent: string | null;
  category: {
    id: string;
    slug: string;
    name: string;
  } | null;
  totalSentences: number;
  viewCount: number;
}

export interface VideoCatalogFilters {
  selectedCategory: string;
  selectedLevel: string;
  searchQuery: string;
  sortBy: string;
}

export interface CachedEntry<T> {
  data: T;
  timestamp: number;
}

/** Default cache stale time: 5 minutes */
export const VIDEO_CATALOG_STALE_TIME_MS = 5 * 60 * 1000;

export function buildLessonQueryKey(filters: VideoCatalogFilters): string {
  const cat = filters.selectedCategory || "all";
  const lvl = filters.selectedLevel || "Tất cả";
  const q = (filters.searchQuery || "").trim().toLowerCase();
  const sort = filters.sortBy || "popular";
  return `${cat}__${lvl}__${q}__${sort}`;
}

export function isEntryStale(timestamp: number, maxAgeMs = VIDEO_CATALOG_STALE_TIME_MS): boolean {
  if (!timestamp) return true;
  return Date.now() - timestamp > maxAgeMs;
}

interface VideoCatalogStoreState {
  // Categories
  categories: VideoCatalogCategory[];
  categoriesTimestamp: number;
  isCategoriesLoading: boolean;
  categoriesError: string | null;

  // Lessons Cache by QueryKey
  lessonsCache: Record<string, CachedEntry<VideoCatalogLessonItem[]>>;
  isLessonsLoading: boolean;
  lessonsError: string | null;

  // Lesson Detail & Quiz Cache by LessonId
  lessonDetailCache: Record<string, CachedEntry<any>>;
  quizCache: Record<string, CachedEntry<VideoQuizData>>;

  // Preserved Filter States (Survives page navigation & unmount)
  filters: VideoCatalogFilters;
  scrollPosition: number;

  // SWR Data Fetching Actions
  fetchCategories: (options?: { forceRefresh?: boolean }) => Promise<VideoCatalogCategory[]>;
  fetchLessons: (
    overrideFilters?: Partial<VideoCatalogFilters>,
    options?: { forceRefresh?: boolean }
  ) => Promise<VideoCatalogLessonItem[]>;
  fetchLessonDetail: (lessonId: string, options?: { forceRefresh?: boolean }) => Promise<any>;
  fetchQuiz: (lessonId: string, options?: { forceRefresh?: boolean }) => Promise<VideoQuizData | null>;

  // Filter setters
  setFilter: <K extends keyof VideoCatalogFilters>(key: K, value: VideoCatalogFilters[K]) => void;
  setFilters: (newFilters: Partial<VideoCatalogFilters>) => void;
  resetFilters: () => void;
  setScrollPosition: (pos: number) => void;

  // Cache Management
  getCurrentLessons: () => VideoCatalogLessonItem[];
  invalidateCache: (scope?: "all" | "categories" | "lessons" | "detail" | "quiz") => void;
}

const DEFAULT_FILTERS: VideoCatalogFilters = {
  selectedCategory: "all",
  selectedLevel: "Tất cả",
  searchQuery: "",
  sortBy: "popular",
};

export const useVideoCatalogStore = create<VideoCatalogStoreState>((set, get) => ({
  // Categories initial state
  categories: [],
  categoriesTimestamp: 0,
  isCategoriesLoading: false,
  categoriesError: null,

  // Lessons Cache initial state
  lessonsCache: {},
  isLessonsLoading: false,
  lessonsError: null,

  // Detail & Quiz cache
  lessonDetailCache: {},
  quizCache: {},

  // Preserved filters
  filters: { ...DEFAULT_FILTERS },
  scrollPosition: 0,

  /**
   * SWR Categories Fetch:
   * 1. If valid cache exists -> Returns immediately (0ms).
   * 2. If stale -> Returns cache immediately (0ms) AND revalidates quietly in background.
   * 3. If cache miss -> Shows loading state, fetches, and saves to cache.
   */
  fetchCategories: async (options = {}) => {
    const { forceRefresh = false } = options;
    const { categories, categoriesTimestamp, isCategoriesLoading } = get();

    const hasCache = categories.length > 0;
    const stale = isEntryStale(categoriesTimestamp);

    // Cache hit: return immediately
    if (hasCache && !stale && !forceRefresh) {
      return categories;
    }

    // If cache is present but stale, or forceRefresh requested:
    // If we have cache, don't show blocking loading state (Stale-While-Revalidate)
    if (!hasCache) {
      set({ isCategoriesLoading: true, categoriesError: null });
    }

    try {
      const res = await fetch("/api/video-catalog/categories");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          set({
            categories: data.categories,
            categoriesTimestamp: Date.now(),
            isCategoriesLoading: false,
            categoriesError: null,
          });
          return data.categories;
        }
      }
      throw new Error(`Categories API returned status ${res.status}`);
    } catch (err: any) {
      console.warn("[VideoCatalogStore] Failed to load categories from API, falling back to mock:", err?.message);
      // Fallback to MOCK_VIDEO_CATEGORIES if empty
      if (!hasCache) {
        const fallback = MOCK_VIDEO_CATEGORIES.map((c) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          description: c.description || null,
          icon: c.icon || null,
          lessonsCount: c.lessonsCount || 0,
        }));
        set({
          categories: fallback,
          categoriesTimestamp: Date.now(),
          isCategoriesLoading: false,
          categoriesError: err?.message || "Failed to load categories",
        });
        return fallback;
      }
      set({ isCategoriesLoading: false });
      return categories;
    }
  },

  /**
   * SWR Lessons Fetch with QueryKey-based caching:
   * 1. If query cache exists and fresh -> Returns immediately (0ms, no loading skeleton).
   * 2. If query cache exists but stale -> Returns cached data immediately (0ms) and revalidates in background.
   * 3. If cache miss -> Sets isLessonsLoading = true, fetches, and caches result.
   */
  fetchLessons: async (overrideFilters = {}, options = {}) => {
    const { forceRefresh = false } = options;
    const currentFilters = { ...get().filters, ...overrideFilters };
    const queryKey = buildLessonQueryKey(currentFilters);
    const cachedEntry = get().lessonsCache[queryKey];

    const hasCache = Boolean(cachedEntry && Array.isArray(cachedEntry.data) && cachedEntry.data.length > 0);
    const stale = cachedEntry ? isEntryStale(cachedEntry.timestamp) : true;

    // Fast path: Fresh cache hit -> 0ms return
    if (hasCache && !stale && !forceRefresh) {
      return cachedEntry!.data;
    }

    // Only set loading true if we don't have cached data to display right now
    if (!hasCache) {
      set({ isLessonsLoading: true, lessonsError: null });
    }

    try {
      const params = new URLSearchParams();
      if (currentFilters.selectedCategory !== "all") {
        params.append("category", currentFilters.selectedCategory);
      }
      if (currentFilters.selectedLevel !== "Tất cả") {
        params.append("level", currentFilters.selectedLevel);
      }
      if (currentFilters.searchQuery.trim()) {
        params.append("search", currentFilters.searchQuery.trim());
      }
      params.append("sort", currentFilters.sortBy || "popular");
      params.append("limit", "24");

      const res = await fetch(`/api/video-catalog/lessons?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.lessons)) {
          set((state) => ({
            lessonsCache: {
              ...state.lessonsCache,
              [queryKey]: {
                data: data.lessons,
                timestamp: Date.now(),
              },
            },
            isLessonsLoading: false,
            lessonsError: null,
          }));
          return data.lessons;
        }
      }
      throw new Error(`Lessons API returned status ${res.status}`);
    } catch (err: any) {
      console.warn("[VideoCatalogStore] Failed to load lessons from API, falling back to mock:", err?.message);

      // If we don't have cached data, construct filtered mock fallback
      if (!hasCache) {
        let fallback = [...MOCK_VIDEO_LESSONS];
        if (currentFilters.selectedCategory !== "all") {
          fallback = fallback.filter(
            (v) => v.categorySlug === currentFilters.selectedCategory || v.categoryId === currentFilters.selectedCategory
          );
        }
        if (currentFilters.selectedLevel !== "Tất cả") {
          fallback = fallback.filter((v) => v.cefrLevel === currentFilters.selectedLevel);
        }
        if (currentFilters.searchQuery.trim()) {
          const q = currentFilters.searchQuery.trim().toLowerCase();
          fallback = fallback.filter(
            (v) => v.title.toLowerCase().includes(q) || (v.description && v.description.toLowerCase().includes(q))
          );
        }
        const mappedFallback: VideoCatalogLessonItem[] = fallback.map((v) => ({
          id: v.id,
          slug: v.slug,
          title: v.title,
          description: v.description,
          externalId: v.externalId,
          thumbnailUrl: v.thumbnailUrl,
          durationSeconds: v.durationSeconds,
          durationFormatted: v.durationFormatted,
          cefrLevel: v.cefrLevel,
          supportedTypes: v.supportedTypes,
          accent: v.accent || null,
          category: {
            id: v.categoryId,
            slug: v.categorySlug,
            name: v.categoryName,
          },
          totalSentences: v.segments.length,
          viewCount: v.viewCount,
        }));

        set((state) => ({
          lessonsCache: {
            ...state.lessonsCache,
            [queryKey]: {
              data: mappedFallback,
              timestamp: Date.now(),
            },
          },
          isLessonsLoading: false,
          lessonsError: err?.message || "Failed to load lessons",
        }));
        return mappedFallback;
      }

      set({ isLessonsLoading: false });
      return cachedEntry!.data;
    }
  },

  /**
   * SWR Video Detail Fetch by lessonId
   */
  fetchLessonDetail: async (lessonId: string, options = {}) => {
    if (!lessonId) return null;
    const { forceRefresh = false } = options;
    const cachedEntry = get().lessonDetailCache[lessonId];
    const hasCache = Boolean(cachedEntry && cachedEntry.data);
    const stale = cachedEntry ? isEntryStale(cachedEntry.timestamp) : true;

    if (hasCache && !stale && !forceRefresh) {
      return cachedEntry!.data;
    }

    try {
      const res = await fetch(`/api/video-catalog/lessons/${lessonId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.lesson) {
          set((state) => ({
            lessonDetailCache: {
              ...state.lessonDetailCache,
              [lessonId]: {
                data: json.lesson,
                timestamp: Date.now(),
              },
            },
          }));
          return json.lesson;
        }
      }
    } catch (err) {
      console.warn("[VideoCatalogStore] Failed to fetch lesson detail from API:", err);
    }

    // Fallback to MOCK_VIDEO_LESSONS
    const mock = MOCK_VIDEO_LESSONS.find(
      (m) => m.id === lessonId || m.slug === lessonId || m.externalId === lessonId
    );
    if (mock) {
      const fallbackDetail = {
        id: mock.id,
        slug: mock.slug,
        title: mock.title,
        description: mock.description,
        externalId: mock.externalId,
        thumbnailUrl: mock.thumbnailUrl,
        durationSeconds: mock.durationSeconds,
        durationFormatted: mock.durationFormatted,
        cefrLevel: mock.cefrLevel,
        category: { name: mock.categoryName },
        segments: mock.segments,
      };
      set((state) => ({
        lessonDetailCache: {
          ...state.lessonDetailCache,
          [lessonId]: {
            data: fallbackDetail,
            timestamp: Date.now(),
          },
        },
      }));
      return fallbackDetail;
    }

    return hasCache ? cachedEntry!.data : null;
  },

  /**
   * SWR Video Comprehension Quiz Fetch by lessonId
   */
  fetchQuiz: async (lessonId: string, options = {}) => {
    if (!lessonId) return null;
    const { forceRefresh = false } = options;
    const cachedEntry = get().quizCache[lessonId];
    const hasCache = Boolean(cachedEntry && cachedEntry.data);
    const stale = cachedEntry ? isEntryStale(cachedEntry.timestamp) : true;

    if (hasCache && !stale && !forceRefresh) {
      return cachedEntry!.data;
    }

    try {
      const res = await fetch(`/api/video-catalog/lessons/${lessonId}/quiz`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.quiz) {
          set((state) => ({
            quizCache: {
              ...state.quizCache,
              [lessonId]: {
                data: json.quiz,
                timestamp: Date.now(),
              },
            },
          }));
          return json.quiz;
        }
      }
    } catch (err) {
      console.warn("[VideoCatalogStore] Failed to fetch quiz from API:", err);
    }

    // Fallback to mock quiz if available
    const mock = MOCK_VIDEO_LESSONS.find(
      (m) => m.id === lessonId || m.slug === lessonId || m.externalId === lessonId
    );
    if (mock?.quiz) {
      set((state) => ({
        quizCache: {
          ...state.quizCache,
          [lessonId]: {
            data: mock.quiz!,
            timestamp: Date.now(),
          },
        },
      }));
      return mock.quiz;
    }

    return hasCache ? cachedEntry!.data : null;
  },

  /**
   * Helper to retrieve currently filtered lessons from active cache
   */
  getCurrentLessons: () => {
    const key = buildLessonQueryKey(get().filters);
    return get().lessonsCache[key]?.data || [];
  },

  // Filter setters (Preserves user navigation state across back/forward navigation)
  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }));
  },

  resetFilters: () => {
    set({ filters: { ...DEFAULT_FILTERS } });
  },

  setScrollPosition: (pos) => {
    set({ scrollPosition: pos });
  },

  // Manual Invalidation
  invalidateCache: (scope = "all") => {
    if (scope === "all") {
      set({
        categories: [],
        categoriesTimestamp: 0,
        lessonsCache: {},
        lessonDetailCache: {},
        quizCache: {},
      });
    } else if (scope === "categories") {
      set({ categories: [], categoriesTimestamp: 0 });
    } else if (scope === "lessons") {
      set({ lessonsCache: {} });
    } else if (scope === "detail") {
      set({ lessonDetailCache: {} });
    } else if (scope === "quiz") {
      set({ quizCache: {} });
    }
  },
}));
