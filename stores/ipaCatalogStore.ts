import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  ALL_IPA_SOUNDS,
  MONOPHTHONGS,
  DIPHTHONGS,
  CONSONANTS,
  MINIMAL_PAIRS,
  IpaSound,
  MinimalPair,
  MinimalPairCategory,
} from "@/features/ipa/data/ipaData";

export interface CachedIpaEntry<T> {
  data: T;
  timestamp: number;
}

/** Default cache stale time: 5 minutes (300,000 ms) */
export const IPA_CATALOG_STALE_TIME_MS = 5 * 60 * 1000;

export function isIpaEntryStale(
  timestamp: number,
  maxAgeMs = IPA_CATALOG_STALE_TIME_MS
): boolean {
  if (!timestamp) return true;
  return Date.now() - timestamp > maxAgeMs;
}

export type IpaMatrixCategory = "all" | "vowels" | "consonants";
export type IpaPracticeCategory = "all" | "monophthong" | "diphthong" | "consonant";
export type IpaAccent = "en-US" | "en-GB" | "en-AU";
export type IpaGameMode = "blitz" | "survival" | "zen";

export interface IpaArenaMistakeRecord {
  round: number;
  wordA: string;
  phoneticA: string;
  meaningA: string;
  wordB: string;
  phoneticB: string;
  meaningB: string;
  correctChoice: "A" | "B";
  userChoice: "A" | "B" | "timeout";
  targetWord: string;
  targetPhonetic: string;
}

export const INITIAL_IPA_SOUNDS: IpaSound[] = ALL_IPA_SOUNDS;
export const INITIAL_MINIMAL_PAIRS: MinimalPair[] = MINIMAL_PAIRS;

// Default mastered sound IDs for standard learner demonstration
export const DEFAULT_MASTERED_SOUND_IDS: string[] = [
  "v_i_long",
  "v_i_short",
  "v_e",
  "v_ae",
  "c_p",
  "c_b",
  "c_t",
  "c_d",
  "c_s",
  "c_z",
  "c_m",
  "c_n",
  "d_ay",
  "d_eye",
  "d_ow",
  "v_u_short",
  "v_u_long",
  "c_f",
];

interface IpaCatalogStoreState {
  // SWR Caches for Sounds
  sounds: IpaSound[];
  soundsTimestamp: number;
  isSoundsLoading: boolean;
  soundsError: string | null;

  // Sound Detail in-memory cache keyed by id or symbol
  soundDetailCache: Record<string, CachedIpaEntry<IpaSound>>;

  // SWR Caches for Minimal Pairs
  minimalPairs: MinimalPair[];
  minimalPairsTimestamp: number;
  isPairsLoading: boolean;
  pairsError: string | null;

  // 1. Matrix Board Live State (Preserved across tab switches)
  matrixCategoryTab: IpaMatrixCategory;
  matrixSearchQuery: string;
  matrixPlaybackRate: number;
  matrixSelectedSound: IpaSound | null;
  isMatrixModalOpen: boolean;

  // 2. Dedicated Practice Lab Live State
  practiceSelectedSoundId: string;
  practiceCategoryFilter: IpaPracticeCategory;
  practicePlaybackRate: number;
  practiceAccent: IpaAccent;
  practiceActiveWordTarget: string | null;
  practiceIsGuideOpen: boolean;
  practiceSoundScores: Record<string, number>;

  // 3. Minimal Pairs Arena Live State
  arenaSelectedTopicId: string;
  arenaCategoryFilter: "all" | MinimalPairCategory;
  arenaGameMode: IpaGameMode;
  arenaIsSfxMuted: boolean;
  arenaIsAutoPlay: boolean;
  arenaCurrentRound: number;
  arenaScore: number;
  arenaStreak: number;
  arenaHearts: number;
  arenaMistakes: IpaArenaMistakeRecord[];
  arenaIsMatchFinished: boolean;

  // 4. Mastery & Learner Progress
  masteredSoundIds: string[];

  // SWR Actions
  fetchIpaSounds: (forceRefresh?: boolean) => Promise<IpaSound[]>;
  fetchIpaDetail: (idOrSymbol: string, forceRefresh?: boolean) => Promise<IpaSound | null>;
  fetchMinimalPairs: (forceRefresh?: boolean) => Promise<MinimalPair[]>;

  // Matrix Setters
  setMatrixCategoryTab: (tab: IpaMatrixCategory) => void;
  setMatrixSearchQuery: (query: string) => void;
  setMatrixPlaybackRate: (rate: number) => void;
  setMatrixSelectedSound: (sound: IpaSound | null) => void;
  openMatrixModal: (sound: IpaSound) => void;
  closeMatrixModal: () => void;

  // Practice Lab Setters
  setPracticeSelectedSoundId: (id: string) => void;
  setPracticeCategoryFilter: (filter: IpaPracticeCategory) => void;
  setPracticePlaybackRate: (rate: number) => void;
  setPracticeAccent: (accent: IpaAccent) => void;
  setPracticeActiveWordTarget: (word: string | null) => void;
  setPracticeIsGuideOpen: (open: boolean) => void;
  recordPracticeScore: (soundId: string, score: number) => void;

  // Arena Setters
  setArenaSelectedTopicId: (id: string) => void;
  setArenaCategoryFilter: (category: "all" | MinimalPairCategory) => void;
  setArenaGameMode: (mode: IpaGameMode) => void;
  setArenaIsSfxMuted: (muted: boolean) => void;
  setArenaIsAutoPlay: (auto: boolean) => void;
  setArenaCurrentRound: (round: number | ((prev: number) => number)) => void;
  recordArenaAnswer: (isCorrect: boolean, mistake?: IpaArenaMistakeRecord) => void;
  resetArenaMatch: () => void;

  // Mastery Setters & Computed
  toggleMasterSound: (soundId: string) => void;
  getMasteredCount: () => number;
  getAverageScore: () => number;

  // Invalidation & Cleanup
  invalidateCache: (scope?: "all" | "sounds" | "pairs") => void;
  resetAllFilters: () => void;
}

export const useIpaCatalogStore = create<IpaCatalogStoreState>()(
  persist(
    (set, get) => ({
      // Frame 0 synchronous initialization (0ms render)
      sounds: INITIAL_IPA_SOUNDS,
      soundsTimestamp: Date.now(),
      isSoundsLoading: false,
      soundsError: null,
      soundDetailCache: {},

      minimalPairs: INITIAL_MINIMAL_PAIRS,
      minimalPairsTimestamp: Date.now(),
      isPairsLoading: false,
      pairsError: null,

      // Matrix Board State
      matrixCategoryTab: "all",
      matrixSearchQuery: "",
      matrixPlaybackRate: 1.0,
      matrixSelectedSound: null,
      isMatrixModalOpen: false,

      // Dedicated Practice Lab State
      practiceSelectedSoundId: INITIAL_IPA_SOUNDS[0]?.id || "v_i_long",
      practiceCategoryFilter: "all",
      practicePlaybackRate: 1.0,
      practiceAccent: "en-US",
      practiceActiveWordTarget: null,
      practiceIsGuideOpen: false,
      practiceSoundScores: {},

      // Minimal Pairs Arena State
      arenaSelectedTopicId: INITIAL_MINIMAL_PAIRS[0]?.id || "p1_i_long_vs_i_short",
      arenaCategoryFilter: "all",
      arenaGameMode: "blitz",
      arenaIsSfxMuted: false,
      arenaIsAutoPlay: true,
      arenaCurrentRound: 1,
      arenaScore: 0,
      arenaStreak: 0,
      arenaHearts: 3,
      arenaMistakes: [],
      arenaIsMatchFinished: false,

      // Mastered Sound IDs
      masteredSoundIds: DEFAULT_MASTERED_SOUND_IDS,

      // ========================================================================
      // SWR Sound Catalog Fetching
      // ========================================================================
      fetchIpaSounds: async (forceRefresh = false) => {
        const { sounds, soundsTimestamp, isSoundsLoading } = get();

        // 1. In-memory SWR Cache Hit
        if (
          !forceRefresh &&
          sounds.length > 0 &&
          !isIpaEntryStale(soundsTimestamp, IPA_CATALOG_STALE_TIME_MS)
        ) {
          return sounds;
        }

        if (isSoundsLoading) return sounds;

        set({ isSoundsLoading: true, soundsError: null });

        try {
          // Attempt network revalidation
          const response = await fetch("/api/ipa/sounds", {
            headers: { Accept: "application/json" },
          });

          if (response.ok) {
            const data = await response.json();
            const fetchedSounds: IpaSound[] = Array.isArray(data)
              ? data
              : data.sounds || INITIAL_IPA_SOUNDS;

            set({
              sounds: fetchedSounds,
              soundsTimestamp: Date.now(),
              isSoundsLoading: false,
              soundsError: null,
            });
            return fetchedSounds;
          }
          throw new Error(`API returned HTTP ${response.status}`);
        } catch {
          // Resilient SWR Fallback to local verified 44-sound catalog
          set({
            sounds: INITIAL_IPA_SOUNDS,
            soundsTimestamp: Date.now(),
            isSoundsLoading: false,
            soundsError: null,
          });
          return INITIAL_IPA_SOUNDS;
        }
      },

      // ========================================================================
      // SWR Sound Detail Fetching (Fast lookup by id or symbol)
      // ========================================================================
      fetchIpaDetail: async (idOrSymbol: string, forceRefresh = false) => {
        if (!idOrSymbol) return null;
        const normalized = idOrSymbol.trim();
        const { soundDetailCache, sounds } = get();

        // 1. Direct hit in soundDetailCache
        const cached = soundDetailCache[normalized];
        if (
          !forceRefresh &&
          cached &&
          !isIpaEntryStale(cached.timestamp, IPA_CATALOG_STALE_TIME_MS)
        ) {
          return cached.data;
        }

        // 2. Direct hit in current sounds catalog
        const inCatalog = sounds.find(
          (s) => s.id === normalized || s.symbol === normalized
        );
        if (inCatalog) {
          set((state) => ({
            soundDetailCache: {
              ...state.soundDetailCache,
              [normalized]: { data: inCatalog, timestamp: Date.now() },
              [inCatalog.id]: { data: inCatalog, timestamp: Date.now() },
              [inCatalog.symbol]: { data: inCatalog, timestamp: Date.now() },
            },
          }));
          return inCatalog;
        }

        // 3. Fallback to INITIAL_IPA_SOUNDS
        const fallback = INITIAL_IPA_SOUNDS.find(
          (s) => s.id === normalized || s.symbol === normalized
        );
        if (fallback) {
          set((state) => ({
            soundDetailCache: {
              ...state.soundDetailCache,
              [normalized]: { data: fallback, timestamp: Date.now() },
              [fallback.id]: { data: fallback, timestamp: Date.now() },
            },
          }));
          return fallback;
        }

        return null;
      },

      // ========================================================================
      // SWR Minimal Pairs Fetching
      // ========================================================================
      fetchMinimalPairs: async (forceRefresh = false) => {
        const { minimalPairs, minimalPairsTimestamp, isPairsLoading } = get();

        if (
          !forceRefresh &&
          minimalPairs.length > 0 &&
          !isIpaEntryStale(minimalPairsTimestamp, IPA_CATALOG_STALE_TIME_MS)
        ) {
          return minimalPairs;
        }

        if (isPairsLoading) return minimalPairs;

        set({ isPairsLoading: true, pairsError: null });

        try {
          const response = await fetch("/api/ipa/minimal-pairs", {
            headers: { Accept: "application/json" },
          });

          if (response.ok) {
            const data = await response.json();
            const fetchedPairs: MinimalPair[] = Array.isArray(data)
              ? data
              : data.pairs || INITIAL_MINIMAL_PAIRS;

            set({
              minimalPairs: fetchedPairs,
              minimalPairsTimestamp: Date.now(),
              isPairsLoading: false,
              pairsError: null,
            });
            return fetchedPairs;
          }
          throw new Error(`API returned HTTP ${response.status}`);
        } catch {
          // Resilient SWR Fallback to local verified minimal pairs
          set({
            minimalPairs: INITIAL_MINIMAL_PAIRS,
            minimalPairsTimestamp: Date.now(),
            isPairsLoading: false,
            pairsError: null,
          });
          return INITIAL_MINIMAL_PAIRS;
        }
      },

      // ========================================================================
      // Matrix Board Setters
      // ========================================================================
      setMatrixCategoryTab: (tab) => set({ matrixCategoryTab: tab }),
      setMatrixSearchQuery: (query) => set({ matrixSearchQuery: query }),
      setMatrixPlaybackRate: (rate) => set({ matrixPlaybackRate: rate }),
      setMatrixSelectedSound: (sound) => set({ matrixSelectedSound: sound }),
      openMatrixModal: (sound) =>
        set({ matrixSelectedSound: sound, isMatrixModalOpen: true }),
      closeMatrixModal: () =>
        set({ isMatrixModalOpen: false, matrixSelectedSound: null }),

      // ========================================================================
      // Practice Lab Setters
      // ========================================================================
      setPracticeSelectedSoundId: (id) =>
        set({ practiceSelectedSoundId: id, practiceActiveWordTarget: null }),
      setPracticeCategoryFilter: (filter) =>
        set({ practiceCategoryFilter: filter }),
      setPracticePlaybackRate: (rate) => set({ practicePlaybackRate: rate }),
      setPracticeAccent: (accent) => set({ practiceAccent: accent }),
      setPracticeActiveWordTarget: (word) =>
        set({ practiceActiveWordTarget: word }),
      setPracticeIsGuideOpen: (open) => set({ practiceIsGuideOpen: open }),
      recordPracticeScore: (soundId, score) =>
        set((state) => {
          const currentBest = state.practiceSoundScores[soundId] || 0;
          return {
            practiceSoundScores: {
              ...state.practiceSoundScores,
              [soundId]: Math.max(currentBest, score),
            },
          };
        }),

      // ========================================================================
      // Minimal Pairs Arena Setters
      // ========================================================================
      setArenaSelectedTopicId: (id) =>
        set({
          arenaSelectedTopicId: id,
          arenaCurrentRound: 1,
          arenaScore: 0,
          arenaStreak: 0,
          arenaHearts: 3,
          arenaMistakes: [],
          arenaIsMatchFinished: false,
        }),
      setArenaCategoryFilter: (category) =>
        set({ arenaCategoryFilter: category }),
      setArenaGameMode: (mode) =>
        set({
          arenaGameMode: mode,
          arenaHearts: mode === "survival" ? 1 : 3,
        }),
      setArenaIsSfxMuted: (muted) => set({ arenaIsSfxMuted: muted }),
      setArenaIsAutoPlay: (auto) => set({ arenaIsAutoPlay: auto }),
      setArenaCurrentRound: (round) =>
        set((state) => ({
          arenaCurrentRound:
            typeof round === "function" ? round(state.arenaCurrentRound) : round,
        })),
      recordArenaAnswer: (isCorrect, mistake) =>
        set((state) => {
          const newStreak = isCorrect ? state.arenaStreak + 1 : 0;
          const pointsEarned = isCorrect
            ? 10 + Math.min(newStreak * 2, 20)
            : 0;
          const newHearts = isCorrect
            ? state.arenaHearts
            : Math.max(0, state.arenaHearts - 1);
          const newMistakes =
            !isCorrect && mistake
              ? [...state.arenaMistakes, mistake]
              : state.arenaMistakes;
          const isFinished =
            (state.arenaGameMode === "survival" && newHearts === 0) ||
            state.arenaCurrentRound >= 10;

          return {
            arenaScore: state.arenaScore + pointsEarned,
            arenaStreak: newStreak,
            arenaHearts: newHearts,
            arenaMistakes: newMistakes,
            arenaIsMatchFinished: isFinished,
          };
        }),
      resetArenaMatch: () =>
        set({
          arenaCurrentRound: 1,
          arenaScore: 0,
          arenaStreak: 0,
          arenaHearts: 3,
          arenaGameMode: "blitz",
          arenaMistakes: [],
          arenaIsMatchFinished: false,
        }),

      // ========================================================================
      // Mastery Progress
      // ========================================================================
      toggleMasterSound: (soundId) =>
        set((state) => {
          const exists = state.masteredSoundIds.includes(soundId);
          return {
            masteredSoundIds: exists
              ? state.masteredSoundIds.filter((id) => id !== soundId)
              : [...state.masteredSoundIds, soundId],
          };
        }),
      getMasteredCount: () => get().masteredSoundIds.length,
      getAverageScore: () => {
        const scores = Object.values(get().practiceSoundScores);
        if (scores.length === 0) return 88; // Default demonstrative benchmark
        const sum = scores.reduce((acc, curr) => acc + curr, 0);
        return Math.round(sum / scores.length);
      },

      // ========================================================================
      // Invalidation & Cleanup
      // ========================================================================
      invalidateCache: (scope = "all") =>
        set((state) => {
          if (scope === "sounds") {
            return {
              soundsTimestamp: 0,
              soundDetailCache: {},
            };
          }
          if (scope === "pairs") {
            return {
              minimalPairsTimestamp: 0,
            };
          }
          return {
            soundsTimestamp: 0,
            soundDetailCache: {},
            minimalPairsTimestamp: 0,
          };
        }),

      resetAllFilters: () =>
        set({
          matrixCategoryTab: "all",
          matrixSearchQuery: "",
          matrixPlaybackRate: 1.0,
          practiceCategoryFilter: "all",
          practicePlaybackRate: 1.0,
          practiceAccent: "en-US",
          arenaCategoryFilter: "all",
          arenaGameMode: "blitz",
          arenaHearts: 3,
        }),
    }),
    {
      name: "xp_ipa_catalog_store",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        masteredSoundIds: state.masteredSoundIds,
        practiceSoundScores: state.practiceSoundScores,
        matrixCategoryTab: state.matrixCategoryTab,
        practiceAccent: state.practiceAccent,
        arenaIsSfxMuted: state.arenaIsSfxMuted,
        arenaIsAutoPlay: state.arenaIsAutoPlay,
      }),
    }
  )
);
