import { create } from "zustand";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { resolveCanonicalLessonId, isSameLessonId } from "@/features/listening/utils/lessonIdHelper";

export type AudioCategoryTab = "all" | "basic" | "intermediate" | "advanced" | "completed";

export interface CachedAudioEntry<T> {
  data: T;
  timestamp: number;
}

/** Default cache stale time: 5 minutes (300,000 ms) */
export const AUDIO_CATALOG_STALE_TIME_MS = 5 * 60 * 1000;

export function isAudioEntryStale(timestamp: number, maxAgeMs = AUDIO_CATALOG_STALE_TIME_MS): boolean {
  if (!timestamp) return true;
  return Date.now() - timestamp > maxAgeMs;
}

export interface AudioCatalogFilters {
  listingSearch: string;
  activeCategoryTab: AudioCategoryTab;
  shuffleSeedBasic: number;
  shuffleSeedIntermediate: number;
  shuffleSeedAdvanced: number;
  scrollPosition: number;
}

interface AudioCatalogStoreState {
  // Lessons Catalog Cache
  audioLessons: any[];
  audioLessonsTimestamp: number;
  isAudioLessonsLoading: boolean;
  audioLessonsError: string | null;

  // Lesson Detail Cache (keyed by lessonId, pad3, or canonical ID)
  audioDetailCache: Record<string, CachedAudioEntry<any>>;
  isLoadingDetail: boolean;

  // Preserved Filter States (Survives route changes and back/forward navigation)
  filters: AudioCatalogFilters;

  // SWR Actions
  fetchAudioLessons: (options?: { forceRefresh?: boolean; userId?: string; mode?: string }) => Promise<any[]>;
  fetchAudioLessonDetail: (lessonId: string, options?: { forceRefresh?: boolean; userId?: string }) => Promise<any>;

  // Filter Setters
  setListingSearch: (query: string) => void;
  setActiveCategoryTab: (tab: AudioCategoryTab) => void;
  setShuffleSeedBasic: (seed: number | ((prev: number) => number)) => void;
  setShuffleSeedIntermediate: (seed: number | ((prev: number) => number)) => void;
  setShuffleSeedAdvanced: (seed: number | ((prev: number) => number)) => void;
  setScrollPosition: (pos: number) => void;
  resetFilters: () => void;

  // Cache Invalidation
  invalidateCache: (scope?: "all" | "lessons" | "detail") => void;
}

function getInitialAudioLessons(): any[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("xp_voca_listening_catalog_audio");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
}

const DEFAULT_AUDIO_FILTERS: AudioCatalogFilters = {
  listingSearch: "",
  activeCategoryTab: "all",
  shuffleSeedBasic: 0,
  shuffleSeedIntermediate: 0,
  shuffleSeedAdvanced: 0,
  scrollPosition: 0,
};

export const useAudioCatalogStore = create<AudioCatalogStoreState>((set, get) => ({
  audioLessons: getInitialAudioLessons(),
  audioLessonsTimestamp: typeof window !== "undefined" && getInitialAudioLessons().length > 0 ? Date.now() : 0,
  isAudioLessonsLoading: false,
  audioLessonsError: null,

  audioDetailCache: {},
  isLoadingDetail: false,

  filters: { ...DEFAULT_AUDIO_FILTERS },

  /**
   * SWR Audio Lessons Fetch:
   * 1. If valid cache exists & not stale -> Returns immediately (0ms).
   * 2. If stale -> Returns cache immediately (0ms) AND revalidates quietly in background.
   * 3. If cache miss -> Shows loading skeleton, fetches from API, fallbacks to MOCK_LESSONS_DATA.
   */
  fetchAudioLessons: async (options = {}) => {
    const { forceRefresh = false, userId = "", mode = "audio" } = options;
    const { audioLessons, audioLessonsTimestamp } = get();

    const hasCache = audioLessons.length > 0;
    const stale = isAudioEntryStale(audioLessonsTimestamp);

    // Cache hit: 0ms instant return
    if (hasCache && !stale && !forceRefresh) {
      return audioLessons;
    }

    // Only display blocking skeleton when cache is empty (Frame 0 SWR Principle)
    if (!hasCache) {
      set({ isAudioLessonsLoading: true, audioLessonsError: null });
    }

    try {
      const res = await fetch(`/api/listening/lessons?userId=${userId}&mode=${mode}`, {
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const sanitized =
            mode === "audio"
              ? json.data.filter(
                  (l: any) =>
                    !l.isVideo &&
                    !l.id?.startsWith("vid_") &&
                    !l.audioUrl?.includes("youtube") &&
                    !l.audioUrl?.includes("youtu.be")
                )
              : json.data;

          set({
            audioLessons: sanitized,
            audioLessonsTimestamp: Date.now(),
            isAudioLessonsLoading: false,
            audioLessonsError: null,
          });

          // Backup in localStorage for cold reboot
          try {
            localStorage.setItem("xp_voca_listening_catalog_audio", JSON.stringify(sanitized));
          } catch {}

          return sanitized;
        }
      }
      throw new Error(`Listening lessons API returned status ${res.status}`);
    } catch (err: any) {
      console.warn("[AudioCatalogStore] API fetch fallback to mock data:", err?.message);

      if (!hasCache) {
        const fallback =
          mode === "audio"
            ? MOCK_LESSONS_DATA.filter(
                (l: any) =>
                  !l.isVideo &&
                  !l.id?.startsWith("vid_") &&
                  !l.audioUrl?.includes("youtube") &&
                  !l.audioUrl?.includes("youtu.be")
              )
            : MOCK_LESSONS_DATA;

        set({
          audioLessons: fallback,
          audioLessonsTimestamp: Date.now(),
          isAudioLessonsLoading: false,
          audioLessonsError: err?.message || "Failed to load audio lessons",
        });
        return fallback;
      }

      set({ isAudioLessonsLoading: false });
      return audioLessons;
    }
  },

  /**
   * SWR Audio Lesson Detail Fetch:
   * Keyed by lessonId (supports canonical aliases).
   */
  fetchAudioLessonDetail: async (lessonId: string, options = {}) => {
    if (!lessonId) return null;
    const { forceRefresh = false, userId = "" } = options;
    const canonical = resolveCanonicalLessonId(lessonId) || lessonId;

    const cachedEntry = get().audioDetailCache[lessonId] || get().audioDetailCache[canonical];
    const hasCache = Boolean(cachedEntry && cachedEntry.data && Array.isArray(cachedEntry.data.transcript));
    const stale = cachedEntry ? isAudioEntryStale(cachedEntry.timestamp) : true;

    // Cache hit: 0ms instant return
    if (hasCache && !stale && !forceRefresh) {
      return cachedEntry!.data;
    }

    // Check localStorage before network fetch
    if (typeof window !== "undefined") {
      try {
        const raw =
          localStorage.getItem(`xp_voca_audio_detail_${canonical}`) ||
          localStorage.getItem(`xp_voca_audio_detail_${lessonId}`);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.transcript) && parsed.transcript.length > 0) {
            set((state) => ({
              audioDetailCache: {
                ...state.audioDetailCache,
                [parsed.id]: { data: parsed, timestamp: Date.now() },
                [lessonId]: { data: parsed, timestamp: Date.now() },
                [canonical]: { data: parsed, timestamp: Date.now() },
              },
            }));
            if (!forceRefresh) {
              return parsed;
            }
          }
        }
      } catch {}
    }

    try {
      const res = await fetch(`/api/listening/lessons/${canonical}?userId=${userId}`, {
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const detail = json.data;
          set((state) => ({
            audioDetailCache: {
              ...state.audioDetailCache,
              [detail.id]: { data: detail, timestamp: Date.now() },
              [lessonId]: { data: detail, timestamp: Date.now() },
              [canonical]: { data: detail, timestamp: Date.now() },
            },
          }));

          try {
            localStorage.setItem(`xp_voca_audio_detail_${canonical}`, JSON.stringify(detail));
            localStorage.setItem(`xp_voca_audio_detail_${detail.id}`, JSON.stringify(detail));
          } catch {}

          return detail;
        }
      }
    } catch (err) {
      console.warn("[AudioCatalogStore] Failed to fetch lesson detail from API:", err);
    }

    // Fallback to MOCK_LESSONS_DATA
    const mock = MOCK_LESSONS_DATA.find((m) => isSameLessonId(m.id, canonical) || isSameLessonId(m.id, lessonId));
    if (mock) {
      set((state) => ({
        audioDetailCache: {
          ...state.audioDetailCache,
          [mock.id]: { data: mock, timestamp: Date.now() },
          [lessonId]: { data: mock, timestamp: Date.now() },
        },
      }));
      return mock;
    }

    return hasCache ? cachedEntry!.data : null;
  },

  // Filter Setters
  setListingSearch: (query: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        listingSearch: query,
      },
    }));
  },

  setActiveCategoryTab: (tab: AudioCategoryTab) => {
    set((state) => ({
      filters: {
        ...state.filters,
        activeCategoryTab: tab,
      },
    }));
  },

  setShuffleSeedBasic: (seed) => {
    set((state) => ({
      filters: {
        ...state.filters,
        shuffleSeedBasic: typeof seed === "function" ? seed(state.filters.shuffleSeedBasic) : seed,
      },
    }));
  },

  setShuffleSeedIntermediate: (seed) => {
    set((state) => ({
      filters: {
        ...state.filters,
        shuffleSeedIntermediate: typeof seed === "function" ? seed(state.filters.shuffleSeedIntermediate) : seed,
      },
    }));
  },

  setShuffleSeedAdvanced: (seed) => {
    set((state) => ({
      filters: {
        ...state.filters,
        shuffleSeedAdvanced: typeof seed === "function" ? seed(state.filters.shuffleSeedAdvanced) : seed,
      },
    }));
  },

  setScrollPosition: (pos: number) => {
    set((state) => ({
      filters: {
        ...state.filters,
        scrollPosition: pos,
      },
    }));
  },

  resetFilters: () => {
    set({ filters: { ...DEFAULT_AUDIO_FILTERS } });
  },

  // Cache Invalidation
  invalidateCache: (scope = "all") => {
    set((state) => {
      const next = { ...state };
      if (scope === "all" || scope === "lessons") {
        next.audioLessons = [];
        next.audioLessonsTimestamp = 0;
        next.audioLessonsError = null;
      }
      if (scope === "all" || scope === "detail") {
        next.audioDetailCache = {};
      }
      return next;
    });
  },
}));
