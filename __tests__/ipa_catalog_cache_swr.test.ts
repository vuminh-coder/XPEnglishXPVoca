import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  useIpaCatalogStore,
  isIpaEntryStale,
  IPA_CATALOG_STALE_TIME_MS,
  INITIAL_IPA_SOUNDS,
  INITIAL_MINIMAL_PAIRS,
  DEFAULT_MASTERED_SOUND_IDS,
} from "@/stores/ipaCatalogStore";
import { ALL_IPA_SOUNDS, MINIMAL_PAIRS } from "@/features/ipa/data/ipaData";

describe("IPA Studio & 44-Sound Catalog - SWR In-Memory Caching & Zustand Store Architecture", () => {
  beforeEach(() => {
    useIpaCatalogStore.getState().invalidateCache("all");
    useIpaCatalogStore.getState().resetAllFilters();
    useIpaCatalogStore.getState().resetArenaMatch();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration
  // ==========================================================================
  describe("1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration", () => {
    it("synchronously resolves 44 standard IPA sounds on Frame 0 (0ms instant display)", () => {
      const sounds = useIpaCatalogStore.getState().sounds;
      expect(sounds).toBeDefined();
      expect(Array.isArray(sounds)).toBe(true);
      expect(sounds.length).toBe(44);
      expect(sounds.length).toBe(ALL_IPA_SOUNDS.length);
      expect(sounds[0].id).toBe("v_i_long");
      expect(sounds[0].symbol).toBe("iː");
    });

    it("initializes with isSoundsLoading = false for zero-flash visual stability", () => {
      const { isSoundsLoading, isPairsLoading } = useIpaCatalogStore.getState();
      expect(isSoundsLoading).toBe(false);
      expect(isPairsLoading).toBe(false);
    });

    it("synchronously resolves 12 verified minimal pairs on Frame 0", () => {
      const pairs = useIpaCatalogStore.getState().minimalPairs;
      expect(pairs).toBeDefined();
      expect(Array.isArray(pairs)).toBe(true);
      expect(pairs.length).toBe(12);
      expect(pairs.length).toBe(MINIMAL_PAIRS.length);
      expect(pairs[0].id).toBe("pair_i_long_short");
    });

    it("resolves sound detail synchronously by ID ('v_i_long') and by phonetic symbol ('iː')", async () => {
      const soundById = await useIpaCatalogStore.getState().fetchIpaDetail("v_i_long");
      expect(soundById).toBeDefined();
      expect(soundById?.id).toBe("v_i_long");
      expect(soundById?.symbol).toBe("iː");
      expect(soundById?.mouthShape).toBeDefined();

      const soundBySymbol = await useIpaCatalogStore.getState().fetchIpaDetail("iː");
      expect(soundBySymbol).toBeDefined();
      expect(soundBySymbol?.id).toBe("v_i_long");

      // Verify in-memory soundDetailCache is populated for instant subsequent lookup
      const cache = useIpaCatalogStore.getState().soundDetailCache;
      expect(cache["v_i_long"]).toBeDefined();
      expect(cache["iː"]).toBeDefined();
    });
  });

  // ==========================================================================
  // 2. Tab Transition & Live State Preservation
  // ==========================================================================
  describe("2. Tab Transition & Live State Preservation", () => {
    it("preserves Matrix board filters and playback rate across tab navigation", () => {
      const store = useIpaCatalogStore.getState();

      store.setMatrixCategoryTab("vowels");
      store.setMatrixSearchQuery("sheep");
      store.setMatrixPlaybackRate(0.8);

      const updated = useIpaCatalogStore.getState();
      expect(updated.matrixCategoryTab).toBe("vowels");
      expect(updated.matrixSearchQuery).toBe("sheep");
      expect(updated.matrixPlaybackRate).toBe(0.8);
    });

    it("preserves Matrix modal state and selected sound across views", () => {
      const testSound = ALL_IPA_SOUNDS[1]; // /ɪ/
      useIpaCatalogStore.getState().openMatrixModal(testSound);

      let state = useIpaCatalogStore.getState();
      expect(state.isMatrixModalOpen).toBe(true);
      expect(state.matrixSelectedSound?.id).toBe(testSound.id);

      useIpaCatalogStore.getState().closeMatrixModal();
      state = useIpaCatalogStore.getState();
      expect(state.isMatrixModalOpen).toBe(false);
      expect(state.matrixSelectedSound).toBeNull();
    });

    it("preserves Practice Lab active selections, accent, and collapsible guide state", () => {
      const store = useIpaCatalogStore.getState();

      store.setPracticeSelectedSoundId("c_th_unvoiced");
      store.setPracticeCategoryFilter("consonant");
      store.setPracticePlaybackRate(0.7);
      store.setPracticeAccent("en-GB");
      store.setPracticeActiveWordTarget("think");
      store.setPracticeIsGuideOpen(true);

      const state = useIpaCatalogStore.getState();
      expect(state.practiceSelectedSoundId).toBe("c_th_unvoiced");
      expect(state.practiceCategoryFilter).toBe("consonant");
      expect(state.practicePlaybackRate).toBe(0.7);
      expect(state.practiceAccent).toBe("en-GB");
      expect(state.practiceActiveWordTarget).toBe("think");
      expect(state.practiceIsGuideOpen).toBe(true);
    });

    it("preserves Minimal Pairs Arena game settings and match progress", () => {
      const store = useIpaCatalogStore.getState();

      store.setArenaSelectedTopicId("p5_p_vs_b");
      store.setArenaCategoryFilter("voicing");
      store.setArenaGameMode("survival");
      store.setArenaIsSfxMuted(true);
      store.setArenaIsAutoPlay(false);

      const state = useIpaCatalogStore.getState();
      expect(state.arenaSelectedTopicId).toBe("p5_p_vs_b");
      expect(state.arenaCategoryFilter).toBe("voicing");
      expect(state.arenaGameMode).toBe("survival");
      expect(state.arenaHearts).toBe(1); // 1 heart in survival mode
      expect(state.arenaIsSfxMuted).toBe(true);
      expect(state.arenaIsAutoPlay).toBe(false);
    });
  });

  // ==========================================================================
  // 3. SWR Invalidation, Stale TTL & Background Revalidation
  // ==========================================================================
  describe("3. SWR Invalidation, Stale TTL & Background Revalidation", () => {
    it("respects 5-minute cache TTL (300,000 ms) via isIpaEntryStale", () => {
      expect(IPA_CATALOG_STALE_TIME_MS).toBe(300000);

      const now = Date.now();
      expect(isIpaEntryStale(now)).toBe(false);
      expect(isIpaEntryStale(now - 10000)).toBe(false);
      expect(isIpaEntryStale(now - IPA_CATALOG_STALE_TIME_MS - 1000)).toBe(true);
      expect(isIpaEntryStale(0)).toBe(true);
    });

    it("returns in-memory sounds without triggering network request when cache is fresh", async () => {
      const fetchSpy = vi.spyOn(global, "fetch");

      useIpaCatalogStore.setState({
        sounds: INITIAL_IPA_SOUNDS,
        soundsTimestamp: Date.now(),
      });

      const sounds = await useIpaCatalogStore.getState().fetchIpaSounds(false);
      expect(sounds.length).toBe(44);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("invalidates cache selectively by scope ('sounds', 'pairs', 'all')", () => {
      useIpaCatalogStore.setState({
        soundsTimestamp: Date.now(),
        minimalPairsTimestamp: Date.now(),
      });

      // Invalidate sounds only
      useIpaCatalogStore.getState().invalidateCache("sounds");
      expect(useIpaCatalogStore.getState().soundsTimestamp).toBe(0);
      expect(useIpaCatalogStore.getState().minimalPairsTimestamp).toBeGreaterThan(0);

      // Invalidate all
      useIpaCatalogStore.getState().invalidateCache("all");
      expect(useIpaCatalogStore.getState().soundsTimestamp).toBe(0);
      expect(useIpaCatalogStore.getState().minimalPairsTimestamp).toBe(0);
    });
  });

  // ==========================================================================
  // 4. Offline & Network Error Resilience
  // ==========================================================================
  describe("4. Offline & Network Error Resilience", () => {
    it("gracefully falls back to INITIAL_IPA_SOUNDS when API rejects with 500 error", async () => {
      vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Database connection refused"));

      const sounds = await useIpaCatalogStore.getState().fetchIpaSounds(true);
      expect(sounds).toBeDefined();
      expect(sounds.length).toBe(44);
      expect(useIpaCatalogStore.getState().soundsError).toBeNull();
      expect(useIpaCatalogStore.getState().isSoundsLoading).toBe(false);
    });

    it("gracefully falls back to INITIAL_MINIMAL_PAIRS when API fails", async () => {
      vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        status: 502,
      } as Response);

      const pairs = await useIpaCatalogStore.getState().fetchMinimalPairs(true);
      expect(pairs).toBeDefined();
      expect(pairs.length).toBe(12);
      expect(useIpaCatalogStore.getState().isPairsLoading).toBe(false);
    });
  });

  // ==========================================================================
  // 5. Mastery Progress & Practice Evaluation Persistence
  // ==========================================================================
  describe("5. Mastery Progress & Practice Evaluation Persistence", () => {
    it("toggles sound mastery accurately and updates masteredCount", () => {
      const initialCount = useIpaCatalogStore.getState().getMasteredCount();
      const soundId = "c_ch";

      // If not mastered, toggling adds it
      useIpaCatalogStore.getState().toggleMasterSound(soundId);
      expect(useIpaCatalogStore.getState().masteredSoundIds).toContain(soundId);
      expect(useIpaCatalogStore.getState().getMasteredCount()).toBe(initialCount + 1);

      // Toggling again removes it
      useIpaCatalogStore.getState().toggleMasterSound(soundId);
      expect(useIpaCatalogStore.getState().masteredSoundIds).not.toContain(soundId);
      expect(useIpaCatalogStore.getState().getMasteredCount()).toBe(initialCount);
    });

    it("records practice evaluation score and recalculates averageScore", () => {
      useIpaCatalogStore.getState().recordPracticeScore("v_i_long", 95);
      useIpaCatalogStore.getState().recordPracticeScore("v_i_short", 85);

      const scores = useIpaCatalogStore.getState().practiceSoundScores;
      expect(scores["v_i_long"]).toBe(95);
      expect(scores["v_i_short"]).toBe(85);

      const average = useIpaCatalogStore.getState().getAverageScore();
      expect(average).toBe(90); // (95 + 85) / 2
    });

    it("records Arena answers, streak combos, and detects match finish", () => {
      useIpaCatalogStore.getState().resetArenaMatch();

      // Answer 1: Correct
      useIpaCatalogStore.getState().recordArenaAnswer(true);
      let state = useIpaCatalogStore.getState();
      expect(state.arenaScore).toBeGreaterThanOrEqual(10);
      expect(state.arenaStreak).toBe(1);
      expect(state.arenaHearts).toBe(3);

      // Answer 2: Wrong (streak resets to 0, heart lost)
      useIpaCatalogStore.getState().recordArenaAnswer(false, {
        round: 2,
        wordA: "ship",
        phoneticA: "/ʃɪp/",
        meaningA: "con tàu",
        wordB: "sheep",
        phoneticB: "/ʃiːp/",
        meaningB: "con cừu",
        correctChoice: "A",
        userChoice: "B",
        targetWord: "ship",
        targetPhonetic: "/ʃɪp/",
      });
      state = useIpaCatalogStore.getState();
      expect(state.arenaStreak).toBe(0);
      expect(state.arenaHearts).toBe(2);
      expect(state.arenaMistakes.length).toBe(1);
    });
  });

  // ==========================================================================
  // 6. Reset Filters & Replay
  // ==========================================================================
  describe("6. Reset Filters & Replay", () => {
    it("resets all temporary filters while preserving learner progress", () => {
      useIpaCatalogStore.getState().setMatrixCategoryTab("consonants");
      useIpaCatalogStore.getState().setPracticeAccent("en-AU");
      useIpaCatalogStore.getState().recordPracticeScore("v_i_long", 98);

      useIpaCatalogStore.getState().resetAllFilters();
      const state = useIpaCatalogStore.getState();
      expect(state.matrixCategoryTab).toBe("all");
      expect(state.practiceAccent).toBe("en-US");
      // Progress remains intact
      expect(state.practiceSoundScores["v_i_long"]).toBe(98);
    });
  });
});
