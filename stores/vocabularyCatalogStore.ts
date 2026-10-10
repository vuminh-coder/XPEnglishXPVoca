import { create } from "zustand";
import { BASIC_VOCABULARY_THEMES } from "@/features/vocabulary/data/themes";
import {
  ADVANCED_VOCABULARY_THEMES,
  ADVANCED_VOCABULARIES,
} from "@/features/vocabulary/data/advancedVocabularies";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";

export interface ClientTheme {
  id: string;
  name: string;
  nameEn: string;
  icon?: string;
  totalVocabs: number;
  difficulty: number;
  color?: string;
  description?: string;
}

export interface CachedVocabularyEntry<T> {
  data: T;
  timestamp: number;
}

/** Default cache stale time: 5 minutes (300,000 ms) */
export const VOCABULARY_CATALOG_STALE_TIME_MS = 5 * 60 * 1000;

export function isVocabularyEntryStale(
  timestamp: number,
  maxAgeMs = VOCABULARY_CATALOG_STALE_TIME_MS
): boolean {
  if (!timestamp) return true;
  return Date.now() - timestamp > maxAgeMs;
}

export interface VocabularyCatalogFilters {
  levelMode: "basic" | "advanced";
  searchQuery: string;
  displayedCount: number;
  viewMode: "flashcard" | "list" | "quiz" | "ai";
}

export const DEFAULT_VOCABULARY_FILTERS: VocabularyCatalogFilters = {
  levelMode: "basic",
  searchQuery: "",
  displayedCount: 16,
  viewMode: "flashcard",
};

interface VocabularyCatalogStoreState {
  // Theme Catalog Cache
  basicThemes: ClientTheme[];
  advancedThemes: ClientTheme[];
  themesTimestamp: number;
  isThemesLoading: boolean;

  // Words Cache per Theme (e.g. themeWordsCache["t_basic_family_relatives"])
  themeWordsCache: Record<string, CachedVocabularyEntry<any[]>>;
  isLoadingWords: boolean;

  // Preserved Filter & UI States
  filters: VocabularyCatalogFilters;

  // SWR Actions
  fetchThemeVocabs: (
    themeId: string,
    options?: { forceRefresh?: boolean }
  ) => Promise<any[]>;
  fetchThemeDetail: (themeId: string) => ClientTheme | null;

  // Filter Setters
  setLevelMode: (mode: "basic" | "advanced") => void;
  setSearchQuery: (query: string) => void;
  setDisplayedCount: (count: number | ((prev: number) => number)) => void;
  setViewMode: (mode: "flashcard" | "list" | "quiz" | "ai") => void;
  resetFilters: () => void;

  // Cache Invalidation
  invalidateCache: (scope?: "all" | "themes" | "words") => void;
}

const INITIAL_BASIC_THEMES: ClientTheme[] = BASIC_VOCABULARY_THEMES.map((t) => ({
  id: t.id,
  name: t.name,
  nameEn: t.nameEn,
  icon: t.icon,
  totalVocabs: t.totalVocabs || 20,
  difficulty: t.difficulty,
  color: (t as any).color || "#0059bb",
  description: (t as any).description,
}));

const INITIAL_ADVANCED_THEMES: ClientTheme[] = ADVANCED_VOCABULARY_THEMES.map((t) => ({
  id: t.id,
  name: t.name,
  nameEn: t.nameEn,
  icon: t.icon,
  totalVocabs: t.totalVocabs || 35,
  difficulty: t.difficulty,
  color: (t as any).color || "#0059bb",
  description: (t as any).description,
}));

/** Pre-populate words cache synchronously from verified mock bank for Frame 0 instant display */
function buildInitialThemeWordsCache(): Record<string, CachedVocabularyEntry<any[]>> {
  const cache: Record<string, CachedVocabularyEntry<any[]>> = {};
  const now = Date.now();

  BASIC_VOCABULARIES.forEach((v) => {
    if (!cache[v.themeId]) {
      cache[v.themeId] = { data: [], timestamp: now };
    }
    cache[v.themeId].data.push(v);
  });

  ADVANCED_VOCABULARIES.forEach((v) => {
    if (!cache[v.themeId]) {
      cache[v.themeId] = { data: [], timestamp: now };
    }
    cache[v.themeId].data.push(v);
  });

  return cache;
}

export const useVocabularyCatalogStore = create<VocabularyCatalogStoreState>((set, get) => ({
  // Synchronous initialization for 0ms Frame-0 rendering
  basicThemes: INITIAL_BASIC_THEMES,
  advancedThemes: INITIAL_ADVANCED_THEMES,
  themesTimestamp: Date.now(),
  isThemesLoading: false,

  themeWordsCache: buildInitialThemeWordsCache(),
  isLoadingWords: false,

  filters: { ...DEFAULT_VOCABULARY_FILTERS },

  /**
   * SWR Theme Vocabulary Words Fetch:
   * 1. Returns cached words instantly (0ms)
   * 2. Background revalidation when cache is stale (> 5 min) or forceRefresh
   * 3. Falls back gracefully to local verified vocabulary bank
   */
  fetchThemeVocabs: async (themeId: string, options = {}) => {
    if (!themeId) return [];
    const { forceRefresh = false } = options;

    const rawId = String(themeId).trim();
    const num = parseInt(rawId, 10);

    // Resolve numeric alias (e.g. "1" -> first basic theme)
    let canonicalId = rawId;
    if (!isNaN(num) && num >= 1 && num <= INITIAL_BASIC_THEMES.length) {
      canonicalId = INITIAL_BASIC_THEMES[num - 1].id;
    }

    const { themeWordsCache } = get();
    const cachedEntry = themeWordsCache[rawId] || themeWordsCache[canonicalId];
    const hasCache = Boolean(cachedEntry && cachedEntry.data && cachedEntry.data.length > 0);
    const stale = cachedEntry ? isVocabularyEntryStale(cachedEntry.timestamp) : true;

    // Cache hit: 0ms instant return
    if (hasCache && !stale && !forceRefresh) {
      return cachedEntry.data;
    }

    // Local fallback list
    const basicList = BASIC_VOCABULARIES.filter((v) => v.themeId === canonicalId);
    const localWords =
      basicList.length > 0
        ? basicList
        : ADVANCED_VOCABULARIES.filter((v) => v.themeId === canonicalId);

    // Background revalidate if stale
    if (hasCache && stale && !forceRefresh) {
      if (typeof window !== "undefined") {
        fetch(`/api/vocabulary?themeId=${encodeURIComponent(canonicalId)}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((res) => {
            if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
              const now = Date.now();
              set((state) => ({
                themeWordsCache: {
                  ...state.themeWordsCache,
                  [canonicalId]: { data: res.data, timestamp: now },
                  [rawId]: { data: res.data, timestamp: now },
                },
              }));
            }
          })
          .catch((err) => {
            console.warn("[VocabularyCatalogStore] Background words revalidate notice:", err);
          });
      }
      return cachedEntry.data;
    }

    // Initial fetch / forced refresh
    try {
      if (typeof window !== "undefined") {
        const res = await fetch(`/api/vocabulary?themeId=${encodeURIComponent(canonicalId)}`);
        if (res.ok) {
          const json = await res.json();
          if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
            const now = Date.now();
            set((state) => ({
              themeWordsCache: {
                ...state.themeWordsCache,
                [canonicalId]: { data: json.data, timestamp: now },
                [rawId]: { data: json.data, timestamp: now },
              },
            }));
            return json.data;
          }
        }
      }
    } catch (err) {
      console.warn("[VocabularyCatalogStore] Words fetch fallback:", err);
    }

    // Fallback to local verified bank
    if (localWords.length > 0) {
      const now = Date.now();
      set((state) => ({
        themeWordsCache: {
          ...state.themeWordsCache,
          [canonicalId]: { data: localWords, timestamp: now },
          [rawId]: { data: localWords, timestamp: now },
        },
      }));
      return localWords;
    }

    return [];
  },

  /**
   * Synchronous Theme Detail Resolution:
   * Resolves canonical ID, numeric index alias, or fallback metadata.
   */
  fetchThemeDetail: (themeId: string) => {
    if (!themeId) return null;
    const rawId = String(themeId).trim();
    const num = parseInt(rawId, 10);

    if (!isNaN(num) && num >= 1 && num <= INITIAL_BASIC_THEMES.length) {
      return INITIAL_BASIC_THEMES[num - 1];
    }

    const { basicThemes, advancedThemes } = get();
    const basicFound = basicThemes.find((t) => t.id === rawId);
    if (basicFound) return basicFound;

    const advFound = advancedThemes.find((t) => t.id === rawId);
    if (advFound) return advFound;

    return null;
  },

  // Filter Setters
  setLevelMode: (mode) =>
    set((state) => ({
      filters: { ...state.filters, levelMode: mode, displayedCount: 16, searchQuery: "" },
    })),

  setSearchQuery: (query) =>
    set((state) => ({ filters: { ...state.filters, searchQuery: query } })),

  setDisplayedCount: (countOrUpdater) =>
    set((state) => ({
      filters: {
        ...state.filters,
        displayedCount:
          typeof countOrUpdater === "function"
            ? countOrUpdater(state.filters.displayedCount)
            : countOrUpdater,
      },
    })),

  setViewMode: (mode) =>
    set((state) => ({ filters: { ...state.filters, viewMode: mode } })),

  resetFilters: () =>
    set({
      filters: { ...DEFAULT_VOCABULARY_FILTERS },
    }),

  // Cache Invalidation
  invalidateCache: (scope = "all") =>
    set((state) => {
      if (scope === "themes") {
        return { themesTimestamp: 0 };
      }
      if (scope === "words") {
        return { themeWordsCache: {} };
      }
      return {
        themesTimestamp: 0,
        themeWordsCache: {},
      };
    }),
}));
