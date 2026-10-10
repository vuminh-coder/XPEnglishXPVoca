import { create } from "zustand";
import { PracticeWord, SubMode } from "@/features/practice/types";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";

export interface CachedPracticeEntry<T> {
  data: T;
  timestamp: number;
}

/** Default cache stale time: 5 minutes (300,000 ms) */
export const PRACTICE_CATALOG_STALE_TIME_MS = 5 * 60 * 1000;

export function isPracticeEntryStale(
  timestamp: number,
  maxAgeMs = PRACTICE_CATALOG_STALE_TIME_MS
): boolean {
  if (!timestamp) return true;
  return Date.now() - timestamp > maxAgeMs;
}

export interface PracticeCatalogFilters {
  subMode: SubMode;
  themeId: string | null;
  level: "all" | "basic" | "advanced";
}

export const DEFAULT_PRACTICE_FILTERS: PracticeCatalogFilters = {
  subMode: "quiz",
  themeId: null,
  level: "all",
};

export const INITIAL_PRACTICE_VOCABS: PracticeWord[] = BASIC_VOCABULARIES.slice(0, 25).map(
  (item, idx) => ({
    id: item.id || `practice_vocab_${idx}`,
    word: item.word,
    meaning: item.definitionVn || item.definition,
    ipa: item.phonetic || "/.../",
    type: item.pos === "adj" ? "adjective" : item.pos || "noun",
    level: "A2",
    topic: item.themeNameVn || "Từ vựng thường nhật",
    example: item.examples?.[0] || `She learned how to use the word ${item.word}.`,
    exampleVi:
      item.exampleTranslations?.[0] || `Cô ấy đã học cách sử dụng từ ${item.word}.`,
  })
);

interface PracticeCatalogStoreState {
  // Practice Words Cache
  practiceVocabs: PracticeWord[];
  practiceVocabsTimestamp: number;
  isVocabsLoading: boolean;
  vocabsError: string | null;

  // Custom Pool Cache (keyed by e.g. "theme_t_basic_greetings" or "level_advanced")
  customVocabsCache: Record<string, CachedPracticeEntry<PracticeWord[]>>;

  // Active Live Session State
  subMode: SubMode;
  currentIndex: number;
  elapsedTime: number;
  totalEarnedXp: number;
  isCompleted: boolean;

  // Preserved Filter States
  filters: PracticeCatalogFilters;

  // SWR Actions
  fetchPracticeVocabs: (options?: {
    forceRefresh?: boolean;
    themeId?: string | null;
    level?: string | null;
  }) => Promise<PracticeWord[]>;

  // Session & Filter Setters
  setSubMode: (mode: SubMode) => void;
  setCurrentIndex: (index: number | ((prev: number) => number)) => void;
  setElapsedTime: (time: number | ((prev: number) => number)) => void;
  addEarnedXp: (xp: number) => void;
  setIsCompleted: (completed: boolean) => void;
  setFilters: (filters: Partial<PracticeCatalogFilters>) => void;
  restartSession: () => void;
  resetFilters: () => void;

  // Cache Invalidation
  invalidateCache: (scope?: "all" | "vocabs") => void;
}

export const usePracticeCatalogStore = create<PracticeCatalogStoreState>((set, get) => ({
  // Synchronous initialization with verified 25 rich items for 0ms Frame-0 render
  practiceVocabs: INITIAL_PRACTICE_VOCABS,
  practiceVocabsTimestamp: Date.now(),
  isVocabsLoading: false,
  vocabsError: null,

  customVocabsCache: {
    default: { data: INITIAL_PRACTICE_VOCABS, timestamp: Date.now() },
  },

  subMode: "quiz",
  currentIndex: 0,
  elapsedTime: 0,
  totalEarnedXp: 0,
  isCompleted: false,

  filters: { ...DEFAULT_PRACTICE_FILTERS },

  /**
   * SWR Practice Vocabularies Fetch:
   * 1. Returns existing 25 items immediately (0ms)
   * 2. Background revalidation when cache is stale (> 5 min) or forceRefresh
   * 3. Falls back gracefully to local verified vocabulary bank on network error
   */
  fetchPracticeVocabs: async (options = {}) => {
    const { forceRefresh = false, themeId = null, level = null } = options;
    const cacheKey = themeId ? `theme_${themeId}` : level ? `level_${level}` : "default";

    const { customVocabsCache, practiceVocabs, practiceVocabsTimestamp } = get();
    const cachedEntry = customVocabsCache[cacheKey];
    const hasCache = Boolean(cachedEntry && cachedEntry.data && cachedEntry.data.length > 0);
    const stale = cachedEntry ? isPracticeEntryStale(cachedEntry.timestamp) : isPracticeEntryStale(practiceVocabsTimestamp);

    // Cache hit: 0ms instant return
    if (hasCache && !stale && !forceRefresh) {
      set({ practiceVocabs: cachedEntry.data });
      return cachedEntry.data;
    }

    // Local fallback items
    let localFallback: PracticeWord[] = INITIAL_PRACTICE_VOCABS;
    if (themeId) {
      const basicMatches = BASIC_VOCABULARIES.filter((v) => v.themeId === themeId);
      const advMatches = ADVANCED_VOCABULARIES.filter((v) => v.themeId === themeId);
      const combinedMatches = [...basicMatches, ...advMatches];
      if (combinedMatches.length > 0) {
        localFallback = combinedMatches.slice(0, 25).map((item, idx) => ({
          id: item.id || `practice_vocab_${idx}`,
          word: item.word,
          meaning: item.definitionVn || item.definition,
          ipa: item.phonetic || "/.../",
          type: item.pos === "adj" ? "adjective" : item.pos || "noun",
          level: "A2",
          topic: (item as any).themeNameVn || (item as any).themeId || "Từ vựng theo chủ đề",
          example: item.examples?.[0] || `Practice using ${item.word}.`,
          exampleVi: item.exampleTranslations?.[0] || `Luyện tập từ ${item.word}.`,
        }));
      }
    } else if (level === "advanced") {
      localFallback = ADVANCED_VOCABULARIES.slice(0, 25).map((item, idx) => ({
        id: item.id || `practice_vocab_adv_${idx}`,
        word: item.word,
        meaning: item.definitionVn || item.definition,
        ipa: item.phonetic || "/.../",
        type: item.pos === "adj" ? "adjective" : item.pos || "noun",
        level: "B2",
        topic: (item as any).themeNameVn || (item as any).themeId || "Từ vựng nâng cao",
        example: item.examples?.[0] || `Practice using ${item.word}.`,
        exampleVi: item.exampleTranslations?.[0] || `Luyện tập từ ${item.word}.`,
      }));
    }

    // Quiet background revalidation if stale
    if (hasCache && stale && !forceRefresh) {
      if (typeof window !== "undefined") {
        const queryParams = new URLSearchParams();
        queryParams.set("limit", "25");
        queryParams.set("random", "true");
        if (themeId) queryParams.set("themeId", themeId);
        if (level === "basic" || level === "advanced") queryParams.set("level", level);

        fetch(`/api/vocabulary?${queryParams.toString()}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((json) => {
            const list = Array.isArray(json) ? json : json?.data;
            if (Array.isArray(list) && list.length > 0) {
              const mapped: PracticeWord[] = list.map((item: any, idx: number) => ({
                id: item.id || `vocab_${idx}`,
                word: item.word,
                meaning: item.definitionVn || item.definition,
                ipa: item.phonetic || item.ipa || "/.../",
                type: item.pos === "adj" ? "adjective" : item.pos || "noun",
                level: item.difficulty >= 3 ? "B2" : "A2",
                topic: item.themeNameVn || item.themeNameEn || item.topic || "Từ vựng thường nhật",
                example: item.examples?.[0] || item.example || `Practice using ${item.word}.`,
                exampleVi: item.exampleTranslations?.[0] || item.exampleVi || `Luyện tập từ ${item.word}.`,
              }));
              const now = Date.now();
              set((state) => ({
                practiceVocabs: mapped,
                practiceVocabsTimestamp: now,
                customVocabsCache: {
                  ...state.customVocabsCache,
                  [cacheKey]: { data: mapped, timestamp: now },
                },
              }));
            }
          })
          .catch((err) => {
            console.warn("[PracticeCatalogStore] Background revalidate warning:", err);
          });
      }
      return cachedEntry.data;
    }

    // Initial fetch / forced refresh
    try {
      if (typeof window !== "undefined") {
        const queryParams = new URLSearchParams();
        queryParams.set("limit", "25");
        queryParams.set("random", "true");
        if (themeId) queryParams.set("themeId", themeId);
        if (level === "basic" || level === "advanced") queryParams.set("level", level);

        const res = await fetch(`/api/vocabulary?${queryParams.toString()}`);
        if (res.ok) {
          const json = await res.json();
          const list = Array.isArray(json) ? json : json?.data;
          if (Array.isArray(list) && list.length > 0) {
            const mapped: PracticeWord[] = list.map((item: any, idx: number) => ({
              id: item.id || `vocab_${idx}`,
              word: item.word,
              meaning: item.definitionVn || item.definition,
              ipa: item.phonetic || item.ipa || "/.../",
              type: item.pos === "adj" ? "adjective" : item.pos || "noun",
              level: item.difficulty >= 3 ? "B2" : "A2",
              topic: item.themeNameVn || item.themeNameEn || item.topic || "Từ vựng thường nhật",
              example: item.examples?.[0] || item.example || `Practice using ${item.word}.`,
              exampleVi: item.exampleTranslations?.[0] || item.exampleVi || `Luyện tập từ ${item.word}.`,
            }));
            const now = Date.now();
            set((state) => ({
              practiceVocabs: mapped,
              practiceVocabsTimestamp: now,
              isVocabsLoading: false,
              customVocabsCache: {
                ...state.customVocabsCache,
                [cacheKey]: { data: mapped, timestamp: now },
              },
            }));
            return mapped;
          }
        }
      }
    } catch (err) {
      console.warn("[PracticeCatalogStore] Fetch fallback:", err);
    }

    // Graceful fallback to verified local bank
    const now = Date.now();
    set((state) => ({
      practiceVocabs: localFallback,
      practiceVocabsTimestamp: now,
      isVocabsLoading: false,
      customVocabsCache: {
        ...state.customVocabsCache,
        [cacheKey]: { data: localFallback, timestamp: now },
      },
    }));
    return localFallback;
  },

  // Session & Filter Setters
  setSubMode: (mode) =>
    set((state) => ({
      subMode: mode,
      filters: { ...state.filters, subMode: mode },
    })),

  setCurrentIndex: (indexOrUpdater) =>
    set((state) => ({
      currentIndex:
        typeof indexOrUpdater === "function"
          ? indexOrUpdater(state.currentIndex)
          : indexOrUpdater,
    })),

  setElapsedTime: (timeOrUpdater) =>
    set((state) => ({
      elapsedTime:
        typeof timeOrUpdater === "function"
          ? timeOrUpdater(state.elapsedTime)
          : timeOrUpdater,
    })),

  addEarnedXp: (xp) =>
    set((state) => ({ totalEarnedXp: state.totalEarnedXp + xp })),

  setIsCompleted: (completed) => set({ isCompleted: completed }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      subMode: newFilters.subMode || state.subMode,
    })),

  restartSession: () =>
    set({
      currentIndex: 0,
      elapsedTime: 0,
      totalEarnedXp: 0,
      isCompleted: false,
    }),

  resetFilters: () =>
    set({
      filters: { ...DEFAULT_PRACTICE_FILTERS },
      subMode: "quiz",
      currentIndex: 0,
      elapsedTime: 0,
      totalEarnedXp: 0,
      isCompleted: false,
    }),

  // Cache Invalidation
  invalidateCache: (scope = "all") =>
    set({
      practiceVocabsTimestamp: 0,
      customVocabsCache: {},
    }),
}));
