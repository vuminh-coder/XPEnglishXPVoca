import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  useExamCatalogStore,
  isExamEntryStale,
  EXAM_CATALOG_STALE_TIME_MS,
  DEFAULT_EXAM_FILTERS,
} from "@/stores/examCatalogStore";
import { MOCK_EXAM_PAPERS } from "@/features/exam-prep/data/exam-papers";

describe("Exam Prep - SWR In-Memory Caching & Zustand Store Architecture", () => {
  beforeEach(() => {
    useExamCatalogStore.getState().invalidateCache("all");
    useExamCatalogStore.getState().resetFilters();
    useExamCatalogStore.getState().quitExamToHub();
    useExamCatalogStore.getState().setLastSubmittedResult(null, null);
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration
  // ==========================================================================
  describe("1. Frame-0 Synchronous Cache Probe & Zero-Flash Hydration", () => {
    it("synchronously resolves exam papers for Frame 0 instant display (0ms)", () => {
      const papers = useExamCatalogStore.getState().examPapers;
      expect(papers).toBeDefined();
      expect(Array.isArray(papers)).toBe(true);
      expect(papers.length).toBe(MOCK_EXAM_PAPERS.length);
      expect(papers.length).toBeGreaterThanOrEqual(35);
      expect(papers[0].id).toBe("toeic_lr_2026_01");
    });

    it("resolves numeric alias ('1', '2') and canonical ID ('toeic_lr_2026_01') to standardized exam paper", async () => {
      // Fetch by numeric shorthand "1"
      const paper1 = await useExamCatalogStore.getState().fetchExamDetail("1");
      expect(paper1).toBeDefined();
      expect(paper1?.id).toBe("toeic_lr_2026_01");
      expect(paper1?.title).toBeDefined();
      expect(Array.isArray(paper1?.questions)).toBe(true);

      // Fetch by numeric shorthand "2"
      const paper2 = await useExamCatalogStore.getState().fetchExamDetail("2");
      expect(paper2).toBeDefined();
      expect(paper2?.id).toBe("toeic_lr_2026_02");

      // Fetch by canonical string ID
      const canonicalPaper = await useExamCatalogStore.getState().fetchExamDetail("toeic_lr_2026_01");
      expect(canonicalPaper).toBeDefined();
      expect(canonicalPaper?.id).toBe("toeic_lr_2026_01");

      // Verify cached under both keys for 0ms lookup
      const cache = useExamCatalogStore.getState().examDetailCache;
      expect(cache["toeic_lr_2026_01"]?.data).toBeDefined();
      expect(cache["1"]?.data).toBeDefined();
    });

    it("immediately hits in-memory examDetailCache when pre-populated (0ms response)", async () => {
      const mockCustomPaper = {
        id: "custom_exam_001",
        title: "IELTS Master 9.0 Mock Test",
        type: "IELTS_FULL" as const,
        level: "Advanced" as const,
        timeLimitMinutes: 160,
        totalQuestions: 80,
        maxScore: 9.0,
        description: "Standardized 4-skill testing.",
        categoryBadge: "IELTS Master",
        tags: ["IELTS", "Master", "C1-C2"],
        supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"] as any,
        questions: [],
      };

      useExamCatalogStore.setState({
        examDetailCache: {
          custom_exam_001: { data: mockCustomPaper, timestamp: Date.now() },
        },
      });

      const cached = await useExamCatalogStore.getState().fetchExamDetail("custom_exam_001");
      expect(cached).toBeDefined();
      expect(cached?.id).toBe("custom_exam_001");
      expect(cached?.title).toBe("IELTS Master 9.0 Mock Test");
    });
  });

  // ==========================================================================
  // 2. Exam Catalog SWR Caching & Background Revalidation
  // ==========================================================================
  describe("2. Exam Catalog SWR Caching & Background Revalidation", () => {
    it("returns in-memory exam papers immediately (0ms) when cache is valid", async () => {
      const store = useExamCatalogStore.getState();
      await store.fetchExamPapers();
      const freshTimestamp = useExamCatalogStore.getState().examPapersTimestamp;

      const result = await store.fetchExamPapers();

      expect(result.length).toBe(MOCK_EXAM_PAPERS.length);
      expect(isExamEntryStale(freshTimestamp)).toBe(false);
    });

    it("correctly identifies stale cache entry when timestamp exceeds 5 minutes TTL", () => {
      const now = Date.now();
      const staleTimestamp = now - (EXAM_CATALOG_STALE_TIME_MS + 1000); // 5 min + 1 sec
      const freshTimestamp = now - 60000; // 1 min

      expect(isExamEntryStale(staleTimestamp)).toBe(true);
      expect(isExamEntryStale(freshTimestamp)).toBe(false);
      expect(isExamEntryStale(0)).toBe(true);
    });

    it("revalidates timestamp and preserves papers on forced refresh", async () => {
      const oldTime = Date.now() - 600000;
      useExamCatalogStore.setState({ examPapersTimestamp: oldTime });

      const papers = await useExamCatalogStore.getState().fetchExamPapers({ forceRefresh: true });

      expect(papers.length).toBeGreaterThanOrEqual(35);
      expect(useExamCatalogStore.getState().examPapersTimestamp).toBeGreaterThan(oldTime);
    });
  });

  // ==========================================================================
  // 3. Exam Filter & Search State Preservation
  // ==========================================================================
  describe("3. Exam Filter & Search State Preservation", () => {
    it("persists filterType, searchQuery, and configMode across updates", () => {
      const store = useExamCatalogStore.getState();

      store.setFilterType("TOEIC_LR");
      store.setSearchQuery("2026 Test 01");
      store.setConfigMode("AI_GEN");

      const updated = useExamCatalogStore.getState().filters;
      expect(updated.filterType).toBe("TOEIC_LR");
      expect(updated.searchQuery).toBe("2026 Test 01");
      expect(updated.configMode).toBe("AI_GEN");
    });

    it("handles multi-skill toggle correctly and protects minimum 1 selected skill", () => {
      const store = useExamCatalogStore.getState();

      // Default: ["LISTENING", "READING", "SPEAKING", "WRITING"]
      expect(useExamCatalogStore.getState().filters.activeSkills.length).toBe(4);

      // Toggle LISTENING off -> 3 skills
      store.toggleSkill("LISTENING");
      expect(useExamCatalogStore.getState().filters.activeSkills).not.toContain("LISTENING");
      expect(useExamCatalogStore.getState().filters.activeSkills.length).toBe(3);

      // Toggle READING off -> 2 skills
      store.toggleSkill("READING");
      // Toggle SPEAKING off -> 1 skill (WRITING remaining)
      store.toggleSkill("SPEAKING");
      expect(useExamCatalogStore.getState().filters.activeSkills).toEqual(["WRITING"]);

      // Attempt to toggle the last remaining skill (WRITING) off -> should NOT remove it
      store.toggleSkill("WRITING");
      expect(useExamCatalogStore.getState().filters.activeSkills).toEqual(["WRITING"]);

      // Toggle LISTENING back on -> 2 skills
      store.toggleSkill("LISTENING");
      expect(useExamCatalogStore.getState().filters.activeSkills).toContain("LISTENING");
      expect(useExamCatalogStore.getState().filters.activeSkills).toContain("WRITING");
    });

    it("resets all filters back to default values", () => {
      const store = useExamCatalogStore.getState();
      store.setFilterType("IELTS_FULL");
      store.setSearchQuery("Academic 4K");
      store.setAiTopic("Technology & AI");
      store.setAiTargetScore("800+");
      store.setAiQuestionCount(30);

      store.resetFilters();

      const reset = useExamCatalogStore.getState().filters;
      expect(reset).toEqual(DEFAULT_EXAM_FILTERS);
    });
  });

  // ==========================================================================
  // 4. Exam Lifecycle & Live Workspace Session Management
  // ==========================================================================
  describe("4. Exam Lifecycle & Live Workspace Session Management", () => {
    it("starts an exam and configures the workspace session accurately", () => {
      const targetPaper = MOCK_EXAM_PAPERS[0];
      const store = useExamCatalogStore.getState();

      store.startExam(targetPaper);

      const state = useExamCatalogStore.getState();
      expect(state.selectedExam?.id).toBe(targetPaper.id);
      expect(state.activeMode).toBe("WORKSPACE");
      expect(state.workspaceSession).toBeDefined();
      expect(state.workspaceSession?.examId).toBe(targetPaper.id);
      expect(state.workspaceSession?.secondsRemaining).toBe(targetPaper.timeLimitMinutes * 60);
      expect(state.workspaceSession?.currentQuestionIndex).toBe(0);
      expect(state.lastSubmittedResult).toBeNull();
    });

    it("quits exam back to hub and clears active session", () => {
      const store = useExamCatalogStore.getState();
      store.startExam(MOCK_EXAM_PAPERS[0]);
      expect(useExamCatalogStore.getState().activeMode).toBe("WORKSPACE");

      store.quitExamToHub();

      const state = useExamCatalogStore.getState();
      expect(state.activeMode).toBe("HUB");
      expect(state.workspaceSession).toBeNull();
    });

    it("stores submitted exam result and associated paper for the result page", () => {
      const store = useExamCatalogStore.getState();
      const mockResult: any = {
        examId: "toeic_lr_2026_01",
        examTitle: "TOEIC L&R Test 01",
        scaledScore: 850,
        maxScore: 990,
        accuracyPercent: 86,
        xpAwarded: 250,
        coinsAwarded: 50,
      };

      store.setLastSubmittedResult(mockResult, MOCK_EXAM_PAPERS[0]);

      const state = useExamCatalogStore.getState();
      expect(state.activeMode).toBe("REPORT");
      expect(state.lastSubmittedResult?.scaledScore).toBe(850);
      expect(state.lastSubmittedPaper?.id).toBe("toeic_lr_2026_01");
    });
  });

  // ==========================================================================
  // 5. Invalidation & Resilient Fallback Mechanics
  // ==========================================================================
  describe("5. Invalidation & Resilient Fallback Mechanics", () => {
    it("invalidates cache selectively by scope", () => {
      const store = useExamCatalogStore.getState();

      // Invalidate papers only
      store.invalidateCache("papers");
      expect(useExamCatalogStore.getState().examPapersTimestamp).toBe(0);

      // Invalidate detail cache only
      store.invalidateCache("detail");
      expect(Object.keys(useExamCatalogStore.getState().examDetailCache).length).toBe(0);

      // Invalidate all
      useExamCatalogStore.setState({
        examPapersTimestamp: 12345,
        examDetailCache: { test: { data: {} as any, timestamp: 12345 } },
      });
      store.invalidateCache("all");
      expect(useExamCatalogStore.getState().examPapersTimestamp).toBe(0);
      expect(Object.keys(useExamCatalogStore.getState().examDetailCache).length).toBe(0);
    });

    it("safely falls back to local verified paper when API call fails", async () => {
      // Mock fetch failure
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockRejectedValue(new Error("Network timeout"));

      const paper = await useExamCatalogStore.getState().fetchExamDetail("toeic_lr_2026_01", {
        forceRefresh: true,
      });

      expect(paper).toBeDefined();
      expect(paper?.id).toBe("toeic_lr_2026_01");
      expect(paper?.questions.length).toBeGreaterThan(0);

      global.fetch = originalFetch;
    });
  });
});
