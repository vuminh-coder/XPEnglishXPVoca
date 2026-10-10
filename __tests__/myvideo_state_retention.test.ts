import { describe, it, expect, beforeEach } from "vitest";
import { useVideoStore, DEFAULT_MYVIDEO_SESSION } from "@/stores/videoStore";

describe("MyVideo Page State Retention (0ms Instant Render)", () => {
  beforeEach(() => {
    useVideoStore.getState().resetSession();
  });

  describe("Session Initialization & Defaults", () => {
    it("should initialize with default session values", () => {
      const { session } = useVideoStore.getState();
      expect(session).toEqual(DEFAULT_MYVIDEO_SESSION);
      expect(session.activeVideoId).toBeNull();
      expect(session.rightPanelTab).toBe("subtitles");
      expect(session.subViewMode).toBe("rolling");
      expect(session.searchQuery).toBe("");
      expect(session.selectedCategory).toBe("Tất cả");
      expect(session.selectedFilter).toBe("all");
    });
  });

  describe("Active Video & Tab Retention", () => {
    it("should retain activeVideoId and rightPanelTab across tab navigation", () => {
      useVideoStore.getState().setSession({
        activeVideoId: "UF8uR6Z6KLc",
        rightPanelTab: "dictation",
        subViewMode: "full",
      });

      const { session } = useVideoStore.getState();
      expect(session.activeVideoId).toBe("UF8uR6Z6KLc");
      expect(session.rightPanelTab).toBe("dictation");
      expect(session.subViewMode).toBe("full");
    });
  });

  describe("Search & Category Filter Retention", () => {
    it("should retain search query, category, and status filter", () => {
      useVideoStore.getState().setSession({
        searchQuery: "Steve Jobs",
        selectedCategory: "TED Talks",
        selectedFilter: "favorite",
      });

      const { session } = useVideoStore.getState();
      expect(session.searchQuery).toBe("Steve Jobs");
      expect(session.selectedCategory).toBe("TED Talks");
      expect(session.selectedFilter).toBe("favorite");
    });

    it("should perform partial updates without overwriting existing session keys", () => {
      useVideoStore.getState().setSession({
        searchQuery: "Technology",
      });

      useVideoStore.getState().setSession({
        rightPanelTab: "studyset",
      });

      const { session } = useVideoStore.getState();
      expect(session.searchQuery).toBe("Technology");
      expect(session.rightPanelTab).toBe("studyset");
    });
  });

  describe("Video Exercise Position Retention", () => {
    it("should save and retain dictation/exercise position per video id", () => {
      const videoId = "UF8uR6Z6KLc";
      useVideoStore.getState().setVideoExercisePosition(videoId, 7);

      expect(useVideoStore.getState().session.videoExercisePositions[videoId]).toBe(7);

      // Updating another video should not interfere
      useVideoStore.getState().setVideoExercisePosition("other_vid_123", 3);
      expect(useVideoStore.getState().session.videoExercisePositions[videoId]).toBe(7);
      expect(useVideoStore.getState().session.videoExercisePositions["other_vid_123"]).toBe(3);
    });
  });

  describe("Reset Session", () => {
    it("should reset session back to defaults", () => {
      useVideoStore.getState().setSession({
        activeVideoId: "UF8uR6Z6KLc",
        rightPanelTab: "dictation",
        searchQuery: "test",
      });

      useVideoStore.getState().resetSession();
      expect(useVideoStore.getState().session).toEqual(DEFAULT_MYVIDEO_SESSION);
    });
  });
});
