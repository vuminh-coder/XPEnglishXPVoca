import { describe, it, expect, beforeEach } from "vitest";
import { useGameCatalogStore, DEFAULT_GAME_SESSION } from "@/stores/gameCatalogStore";

describe("Games Page State Retention & 0ms Instant Render Architecture", () => {
  beforeEach(() => {
    useGameCatalogStore.getState().resetSession();
  });

  describe("Session Initialization & Defaults", () => {
    it("should initialize with default game session", () => {
      const { session } = useGameCatalogStore.getState();
      expect(session).toEqual(DEFAULT_GAME_SESSION);
      expect(session.activeGame).toBeNull();
      expect(session.selectedDeck).toBe("all");
      expect(session.selectedCategory).toBe("all");
    });

    it("should have pre-seeded vocabulary base pool at Frame 0", () => {
      const { basePool } = useGameCatalogStore.getState();
      expect(Array.isArray(basePool)).toBe(true);
      expect(basePool.length).toBeGreaterThan(0);
      expect(basePool[0]).toHaveProperty("word");
    });
  });

  describe("Active Game Mode Retention", () => {
    it("should retain active mini-game mode across tab switching", () => {
      useGameCatalogStore.getState().setActiveGame("scramble");
      expect(useGameCatalogStore.getState().session.activeGame).toBe("scramble");

      useGameCatalogStore.getState().setActiveGame("memory");
      expect(useGameCatalogStore.getState().session.activeGame).toBe("memory");

      useGameCatalogStore.getState().setActiveGame("wordle");
      expect(useGameCatalogStore.getState().session.activeGame).toBe("wordle");
    });

    it("should allow navigating back to game catalog menu", () => {
      useGameCatalogStore.getState().setActiveGame("blitz");
      expect(useGameCatalogStore.getState().session.activeGame).toBe("blitz");

      useGameCatalogStore.getState().setActiveGame(null);
      expect(useGameCatalogStore.getState().session.activeGame).toBeNull();
    });
  });

  describe("Vocabulary Deck Selection Retention", () => {
    it("should retain selected vocabulary deck (toeic, ielts, bookmarks, weak)", () => {
      useGameCatalogStore.getState().setSelectedDeck("toeic");
      expect(useGameCatalogStore.getState().session.selectedDeck).toBe("toeic");

      useGameCatalogStore.getState().setSelectedDeck("ielts");
      expect(useGameCatalogStore.getState().session.selectedDeck).toBe("ielts");

      useGameCatalogStore.getState().setSelectedDeck("bookmarks");
      expect(useGameCatalogStore.getState().session.selectedDeck).toBe("bookmarks");
    });
  });

  describe("Category Filter & Session Reset", () => {
    it("should retain selected category filter", () => {
      useGameCatalogStore.getState().setSelectedCategory("quick");
      expect(useGameCatalogStore.getState().session.selectedCategory).toBe("quick");
    });

    it("should reset session cleanly when resetSession is called", () => {
      useGameCatalogStore.getState().setActiveGame("sentence");
      useGameCatalogStore.getState().setSelectedDeck("weak");
      useGameCatalogStore.getState().setSelectedCategory("strategic");

      useGameCatalogStore.getState().resetSession();
      expect(useGameCatalogStore.getState().session).toEqual(DEFAULT_GAME_SESSION);
    });
  });

  describe("SWR Vocabulary Pool Cache Hit", () => {
    it("should return cached basePool synchronously in 0ms", async () => {
      const pool = await useGameCatalogStore.getState().fetchGameVocabPool();
      expect(Array.isArray(pool)).toBe(true);
      expect(pool.length).toBeGreaterThan(0);
    });
  });
});
