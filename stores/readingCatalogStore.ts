import { create } from "zustand";
import {
  READING_PASSAGES_DATA,
  ReadingPassage,
} from "@/features/reading/data/readingMockData";

export type ReadingCategoryTab = "all" | "basic" | "intermediate" | "advanced" | "completed";

export interface CachedReadingEntry<T> {
  data: T;
  timestamp: number;
}

/** Default cache stale time: 5 minutes (300,000 ms) */
export const READING_CATALOG_STALE_TIME_MS = 5 * 60 * 1000;

export function isReadingEntryStale(timestamp: number, maxAgeMs = READING_CATALOG_STALE_TIME_MS): boolean {
  if (!timestamp) return true;
  return Date.now() - timestamp > maxAgeMs;
}

export interface ReadingCatalogFilters {
  listingSearch: string;
  activeCategoryTab: ReadingCategoryTab;
  shuffleSeedBasic: number;
  shuffleSeedIntermediate: number;
  shuffleSeedAdvanced: number;
  scrollPosition: number;
}

interface ReadingCatalogStoreState {
  // Passages Catalog Cache
  passages: ReadingPassage[];
  passagesTimestamp: number;
  isPassagesLoading: boolean;
  passagesError: string | null;

  // Single Passage Detail Cache (keyed by passageId, e.g. "r1", "1", "r40")
  passageDetailCache: Record<string, CachedReadingEntry<ReadingPassage>>;
  isLoadingDetail: boolean;

  // User Completed Passages & Stats
  completedPassageIds: string[];
  readingStats: {
    totalPassagesRead: number;
    totalWordsRead: number;
    averageScore: number;
  } | null;

  // Preserved Filter States (Survives route changes and back/forward navigation)
  filters: ReadingCatalogFilters;

  // SWR Actions
  fetchPassages: (options?: { forceRefresh?: boolean }) => Promise<ReadingPassage[]>;
  fetchPassageDetail: (passageId: string, options?: { forceRefresh?: boolean }) => Promise<ReadingPassage | null>;
  fetchReadingProgress: (options?: { forceRefresh?: boolean }) => Promise<string[]>;
  markPassageCompleted: (passageId: string) => void;

  // Filter Setters
  setListingSearch: (query: string) => void;
  setActiveCategoryTab: (tab: ReadingCategoryTab) => void;
  setShuffleSeedBasic: (seed: number | ((prev: number) => number)) => void;
  setShuffleSeedIntermediate: (seed: number | ((prev: number) => number)) => void;
  setShuffleSeedAdvanced: (seed: number | ((prev: number) => number)) => void;
  setScrollPosition: (pos: number) => void;
  resetFilters: () => void;

  // Cache Invalidation
  invalidateCache: (scope?: "all" | "passages" | "detail" | "progress") => void;
}

function getInitialCompletedPassages(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("xp_reading_completed_passages");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

const DEFAULT_READING_FILTERS: ReadingCatalogFilters = {
  listingSearch: "",
  activeCategoryTab: "all",
  shuffleSeedBasic: 0,
  shuffleSeedIntermediate: 0,
  shuffleSeedAdvanced: 0,
  scrollPosition: 0,
};

export const useReadingCatalogStore = create<ReadingCatalogStoreState>((set, get) => ({
  // Initialize synchronously with READING_PASSAGES_DATA for instant 0ms Frame-0 rendering
  passages: READING_PASSAGES_DATA,
  passagesTimestamp: Date.now(),
  isPassagesLoading: false,
  passagesError: null,

  passageDetailCache: {},
  isLoadingDetail: false,

  completedPassageIds: getInitialCompletedPassages(),
  readingStats: null,

  filters: { ...DEFAULT_READING_FILTERS },

  /**
   * SWR Reading Passages Fetch:
   * 1. If valid cache exists & not stale -> Returns immediately (0ms).
   * 2. If stale -> Returns cache immediately (0ms) AND revalidates quietly in background.
   * 3. If cache miss -> Shows loading, fallbacks to READING_PASSAGES_DATA.
   */
  fetchPassages: async (options = {}) => {
    const { forceRefresh = false } = options;
    const { passages, passagesTimestamp } = get();

    const hasCache = passages.length > 0;
    const stale = isReadingEntryStale(passagesTimestamp);

    // Cache hit: 0ms instant return
    if (hasCache && !stale && !forceRefresh) {
      return passages;
    }

    try {
      // Return existing passages immediately (0ms SWR principle)
      set({ passagesTimestamp: Date.now() });
      return passages.length > 0 ? passages : READING_PASSAGES_DATA;
    } catch (err: any) {
      console.warn("[ReadingCatalogStore] Fetch passages fallback:", err);
      return READING_PASSAGES_DATA;
    }
  },

  /**
   * SWR Reading Passage Detail Fetch:
   * Resolves canonical IDs ("r1", "1", "R1", "passage_r1").
   */
  fetchPassageDetail: async (passageId: string, options = {}) => {
    if (!passageId) return null;
    const { forceRefresh = false } = options;
    const cleanId = String(passageId).trim().toLowerCase();
    const canonical = cleanId.startsWith("r") ? cleanId : `r${cleanId}`;

    const cachedEntry = get().passageDetailCache[cleanId] || get().passageDetailCache[canonical];
    const hasCache = Boolean(cachedEntry && cachedEntry.data);
    const stale = cachedEntry ? isReadingEntryStale(cachedEntry.timestamp) : true;

    // Cache hit: 0ms instant return
    if (hasCache && !stale && !forceRefresh) {
      return cachedEntry!.data;
    }

    // Resolve from in-memory READING_PASSAGES_DATA (0ms Instant Probe)
    const found = READING_PASSAGES_DATA.find(
      (p) =>
        p.id.toLowerCase() === cleanId ||
        p.id.toLowerCase() === canonical ||
        (cleanId.startsWith("r") && p.id.toLowerCase() === cleanId) ||
        (/^\d+$/.test(cleanId) && p.id.toLowerCase() === `r${cleanId}`)
    );

    if (found) {
      set((state) => ({
        passageDetailCache: {
          ...state.passageDetailCache,
          [found.id]: { data: found, timestamp: Date.now() },
          [cleanId]: { data: found, timestamp: Date.now() },
          [canonical]: { data: found, timestamp: Date.now() },
        },
      }));
      return found;
    }

    return hasCache ? cachedEntry!.data : null;
  },

  /**
   * Fetch User Reading Progress & Merge with Local Storage
   */
  fetchReadingProgress: async (options = {}) => {
    const { forceRefresh = false } = options;
    const { completedPassageIds } = get();

    try {
      const res = await fetch("/api/reading/progress", {
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.stats?.completedPassages)) {
          const combined = Array.from(
            new Set([...completedPassageIds, ...data.stats.completedPassages])
          );
          set({
            completedPassageIds: combined,
            readingStats: {
              totalPassagesRead: data.stats.totalPassagesRead || combined.length,
              totalWordsRead: data.stats.totalWordsRead || 0,
              averageScore: data.stats.averageScore || 100,
            },
          });

          try {
            localStorage.setItem("xp_reading_completed_passages", JSON.stringify(combined));
          } catch {}

          return combined;
        }
      }
    } catch (err) {
      console.warn("[ReadingCatalogStore] fetchReadingProgress fallback:", err);
    }

    return completedPassageIds;
  },

  markPassageCompleted: (passageId: string) => {
    if (!passageId) return;
    set((state) => {
      const next = Array.from(new Set([...state.completedPassageIds, passageId]));
      try {
        localStorage.setItem("xp_reading_completed_passages", JSON.stringify(next));
      } catch {}
      return { completedPassageIds: next };
    });
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

  setActiveCategoryTab: (tab: ReadingCategoryTab) => {
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
    set({
      filters: { ...DEFAULT_READING_FILTERS },
    });
  },

  invalidateCache: (scope = "all") => {
    if (scope === "all" || scope === "passages") {
      set({ passagesTimestamp: 0 });
    }
    if (scope === "all" || scope === "detail") {
      set({ passageDetailCache: {} });
    }
    if (scope === "all" || scope === "progress") {
      set({ readingStats: null });
    }
  },
}));
