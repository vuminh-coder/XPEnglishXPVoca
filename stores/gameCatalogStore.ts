import { create } from "zustand";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { GameMode, VocabDeckType } from "@/features/games";

export const GAME_VOCAB_STALE_TIME_MS = 5 * 60 * 1000; // 5 minutes

export interface GameCatalogSession {
  activeGame: GameMode | null;
  selectedDeck: VocabDeckType;
  selectedCategory: string;
}

export const DEFAULT_GAME_SESSION: GameCatalogSession = {
  activeGame: null,
  selectedDeck: "all",
  selectedCategory: "all",
};

export interface GameCatalogStoreState {
  // Vocabulary Pool Cache
  basePool: any[];
  poolTimestamp: number;
  isLoadingPool: boolean;

  // Active Session & Filters
  session: GameCatalogSession;

  // Actions
  fetchGameVocabPool: (options?: { forceRefresh?: boolean }) => Promise<any[]>;
  setActiveGame: (game: GameMode | null) => void;
  setSelectedDeck: (deck: VocabDeckType) => void;
  setSelectedCategory: (category: string) => void;
  resetSession: () => void;
}

// Synchronous verified fallback pool for 0ms Frame 0 instant render
function getInitialGameVocabs(): any[] {
  if (Array.isArray(BASIC_VOCABULARIES) && BASIC_VOCABULARIES.length > 0) {
    return BASIC_VOCABULARIES.slice(0, 150);
  }
  return [];
}

export const useGameCatalogStore = create<GameCatalogStoreState>((set, get) => ({
  basePool: getInitialGameVocabs(),
  poolTimestamp: typeof window !== "undefined" ? Date.now() : 0,
  isLoadingPool: false,
  session: { ...DEFAULT_GAME_SESSION },

  setActiveGame: (game) =>
    set((state) => ({
      session: { ...state.session, activeGame: game },
    })),

  setSelectedDeck: (deck) =>
    set((state) => ({
      session: { ...state.session, selectedDeck: deck },
    })),

  setSelectedCategory: (category) =>
    set((state) => ({
      session: { ...state.session, selectedCategory: category },
    })),

  resetSession: () =>
    set({
      session: { ...DEFAULT_GAME_SESSION },
    }),

  fetchGameVocabPool: async (options = {}) => {
    const { forceRefresh = false } = options;
    const { basePool, poolTimestamp } = get();

    const hasCache = basePool.length > 0;
    const isStale = Date.now() - poolTimestamp > GAME_VOCAB_STALE_TIME_MS;

    // Cache hit: 0ms instant return
    if (hasCache && !isStale && !forceRefresh) {
      return basePool;
    }

    // Background revalidation if stale but has cache
    if (hasCache && isStale && !forceRefresh) {
      if (typeof window !== "undefined") {
        fetch("/api/vocabulary?limit=150&random=true")
          .then((res) => (res.ok ? res.json() : null))
          .then((res) => {
            if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
              set({
                basePool: res.data,
                poolTimestamp: Date.now(),
              });
            }
          })
          .catch((err) => {
            console.warn("[GameCatalogStore] Background pool revalidate:", err);
          });
      }
      return basePool;
    }

    // Initial fetch / forced refresh
    try {
      if (typeof window !== "undefined") {
        set({ isLoadingPool: true });
        const res = await fetch("/api/vocabulary?limit=150&random=true");
        if (res.ok) {
          const json = await res.json();
          if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
            set({
              basePool: json.data,
              poolTimestamp: Date.now(),
              isLoadingPool: false,
            });
            return json.data;
          }
        }
      }
    } catch (err) {
      console.warn("[GameCatalogStore] Pool fetch fallback:", err);
    } finally {
      set({ isLoadingPool: false });
    }

    return get().basePool;
  },
}));
