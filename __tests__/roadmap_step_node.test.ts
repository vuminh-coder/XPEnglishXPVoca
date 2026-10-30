import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getStepPracticeUrl } from "@/features/roadmap/components/ziczac/ZiczacStepNode";
import { syncRoadmapSessionProgress, STORAGE_KEY_STEP_SESSIONS, STORAGE_KEY_COMPLETED_STEPS } from "@/features/roadmap/utils/roadmapSessionSync";
import { ZiczacPathStep, ZiczacStepProgress } from "@/features/roadmap/types";
import { CURATED_ROADMAP_STEPS, UNIT_CURRICULUM_CONFIGS } from "@/features/roadmap/data/curatedRoadmapPathway";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";

describe("ZiczacStepNode getStepPracticeUrl utility", () => {
  const baseSentenceStep: ZiczacPathStep = {
    id: "step-3",
    stepNumber: 3,
    unitNumber: 1,
    unitTitle: "Unit 1: Chào hỏi",
    title: "Ghép câu",
    description: "Ghép từ thành câu",
    skillType: "SENTENCE",
    isCheckpoint: false,
    practicePath: "/study/sentence-builder?theme=t_basic_greetings&unit=1&part=1&totalParts=2",
    xpReward: 35,
    coinsReward: 15,
    durationMinutes: 15,
    difficulty: "Trung bình",
    totalSessions: 2,
    tips: ["Xác định chủ ngữ (S) và động từ chính (V)."],
  };

  it("1. Returns initial practicePath with part=1 when no sessions are completed yet", () => {
    const progress: ZiczacStepProgress = {
      stepId: "step-3",
      completedSessions: 0,
      totalSessions: 2,
      progressPercent: 0,
      isCompleted: false,
    };

    const url = getStepPracticeUrl(baseSentenceStep, progress, false);
    expect(url).toBe("/study/sentence-builder?theme=t_basic_greetings&unit=1&part=1&totalParts=2");
  });

  it("2. Automatically advances URL to part=2 when 1 session is completed and step is still active", () => {
    const progress: ZiczacStepProgress = {
      stepId: "step-3",
      completedSessions: 1,
      totalSessions: 2,
      progressPercent: 50,
      isCompleted: false,
    };

    const url = getStepPracticeUrl(baseSentenceStep, progress, false);
    expect(url).toBe("/study/sentence-builder?theme=t_basic_greetings&unit=1&part=2&totalParts=2");
  });

  it("3. Keeps original base URL when step is completed", () => {
    const progress: ZiczacStepProgress = {
      stepId: "step-3",
      completedSessions: 2,
      totalSessions: 2,
      progressPercent: 100,
      isCompleted: true,
    };

    const url = getStepPracticeUrl(baseSentenceStep, progress, true);
    // When completed, returns initial base practicePath
    expect(url).toBe("/study/sentence-builder?theme=t_basic_greetings&unit=1&part=1&totalParts=2");
  });

  it("4. Appends part and totalParts correctly if URL did not previously contain part parameter", () => {
    const unpartitionedStep: ZiczacPathStep = {
      ...baseSentenceStep,
      practicePath: "/study/word-link?theme=t_basic_greetings&unit=1",
    };

    const progress: ZiczacStepProgress = {
      stepId: "step-3",
      completedSessions: 1,
      totalSessions: 2,
      progressPercent: 50,
      isCompleted: false,
    };

    const url = getStepPracticeUrl(unpartitionedStep, progress, false);
    expect(url).toBe("/study/word-link?theme=t_basic_greetings&unit=1&part=2&totalParts=2");
  });

  it("5. Automatically advances /study/practice URL to part=2 when 1 session is completed", () => {
    const practiceVocabStep: ZiczacPathStep = {
      ...baseSentenceStep,
      id: "step-1",
      stepNumber: 1,
      skillType: "VOCAB",
      practicePath: "/study/practice?theme=t_basic_greetings&unit=1&part=1&totalParts=2&subMode=flashcard",
    };

    const progress: ZiczacStepProgress = {
      stepId: "step-1",
      completedSessions: 1,
      totalSessions: 2,
      progressPercent: 50,
      isCompleted: false,
    };

    const url = getStepPracticeUrl(practiceVocabStep, progress, false);
    expect(url).toBe("/study/practice?theme=t_basic_greetings&unit=1&part=2&totalParts=2&subMode=flashcard");
  });
});

describe("syncRoadmapSessionProgress utility", () => {
  let mockStore: Record<string, string> = {};

  beforeEach(() => {
    mockStore = {};
    const mockStorage = {
      getItem: (key: string) => mockStore[key] || null,
      setItem: (key: string, val: string) => {
        mockStore[key] = String(val);
      },
      removeItem: (key: string) => {
        delete mockStore[key];
      },
      clear: () => {
        mockStore = {};
      },
    };
    vi.stubGlobal("localStorage", mockStorage);
    vi.stubGlobal("window", {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("5. Automatically stores step session progress in localStorage and checks completion", () => {
    // Sync Part 1 completion for Unit 1 SENTENCE step
    const result1 = syncRoadmapSessionProgress({
      themeId: "t_basic_greetings",
      unitNumber: 1,
      skillType: "SENTENCE",
      completedPart: 1,
      totalParts: 2,
    });

    expect(result1.stepId).toBe("step-3");
    expect(result1.completedSessions).toBe(1);
    expect(result1.isCompleted).toBe(false);

    // Verify localStorage has step-3 with 1 session
    const savedSessions1 = JSON.parse(localStorage.getItem(STORAGE_KEY_STEP_SESSIONS) || "{}");
    expect(savedSessions1["step-3"]).toBe(1);

    // Now sync Part 2 completion
    const result2 = syncRoadmapSessionProgress({
      themeId: "t_basic_greetings",
      unitNumber: 1,
      skillType: "SENTENCE",
      completedPart: 2,
      totalParts: 2,
    });

    expect(result2.completedSessions).toBe(2);
    expect(result2.isCompleted).toBe(true);

    // Verify localStorage has completed step-3
    const savedCompleted = JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETED_STEPS) || "[]");
    expect(savedCompleted).toContain("step-3");
  });

  it("6. Automatically synchronizes VOCAB (Stage 1) multi-part session progress", () => {
    // Sync Part 1 of Unit 1 VOCAB
    const res1 = syncRoadmapSessionProgress({
      themeId: "t_basic_greetings",
      unitNumber: 1,
      skillType: "VOCAB",
      completedPart: 1,
      totalParts: 2,
    });

    expect(res1.stepId).toBe("step-1");
    expect(res1.completedSessions).toBe(1);
    expect(res1.isCompleted).toBe(false);

    // Sync Part 2 of Unit 1 VOCAB
    const res2 = syncRoadmapSessionProgress({
      themeId: "t_basic_greetings",
      unitNumber: 1,
      skillType: "VOCAB",
      completedPart: 2,
      totalParts: 2,
    });

    expect(res2.stepId).toBe("step-1");
    expect(res2.completedSessions).toBe(2);
    expect(res2.isCompleted).toBe(true);

    const savedCompleted = JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETED_STEPS) || "[]");
    expect(savedCompleted).toContain("step-1");
  });

  it("7. Automatically synchronizes CHECKPOINT (Stage 6) single-part milestone completion", () => {
    const res = syncRoadmapSessionProgress({
      themeId: "t_basic_greetings",
      unitNumber: 1,
      skillType: "CHECKPOINT",
      completedPart: 1,
      totalParts: 1,
    });

    expect(res.stepId).toBe("step-6");
    expect(res.completedSessions).toBe(1);
    expect(res.isCompleted).toBe(true);

    const savedCompleted = JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETED_STEPS) || "[]");
    expect(savedCompleted).toContain("step-6");
  });

  it("8. Synchronizes LISTENING (Stage 4), STORY (Stage 5 odd unit), and SPEAKING (Stage 5 even unit) by unit or lessonId", () => {
    // Stage 4 LISTENING via lessonId
    const resListening = syncRoadmapSessionProgress({
      lessonId: "listen_a1_001",
      skillType: "LISTENING",
      completedPart: 1,
      totalParts: 1,
    });
    expect(resListening.stepId).toBe("step-4");
    expect(resListening.isCompleted).toBe(true);

    // Stage 5 STORY (Unit 1) via lessonId
    const resStory = syncRoadmapSessionProgress({
      lessonId: "r2",
      skillType: "STORY",
      completedPart: 1,
      totalParts: 1,
    });
    expect(resStory.stepId).toBe("step-5");
    expect(resStory.isCompleted).toBe(true);

    // Stage 5 SPEAKING (Unit 2) via lessonId
    const resSpeaking = syncRoadmapSessionProgress({
      lessonId: "shadow_ext_002",
      skillType: "SPEAKING",
      completedPart: 1,
      totalParts: 1,
    });
    expect(resSpeaking.stepId).toBe("step-11");
    expect(resSpeaking.isCompleted).toBe(true);
  });
});

describe("All 24 Units Vocabulary Practice Stages in Roadmap", () => {
  it("9. Verifies that ALL 24 units have Stage 1 (VOCAB), Stage 4 (LISTENING), Stage 5 (STORY/SPEAKING), and Stage 6 (CHECKPOINT) mapped with theme & unit params", () => {
    expect(UNIT_CURRICULUM_CONFIGS.length).toBe(24);
    expect(CURATED_ROADMAP_STEPS.length).toBe(144);

    for (let u = 1; u <= 24; u++) {
      const config = UNIT_CURRICULUM_CONFIGS.find((c) => c.unitNumber === u);
      expect(config).toBeDefined();

      // Check Stage 1 (VOCAB)
      const vocabStep = CURATED_ROADMAP_STEPS.find((s) => s.unitNumber === u && s.skillType === "VOCAB");
      expect(vocabStep).toBeDefined();
      expect(vocabStep?.totalSessions).toBe(2);
      expect(vocabStep?.practicePath).toBe(
        `/study/practice?theme=${config?.themeId}&unit=${u}&part=1&totalParts=2&subMode=flashcard`
      );

      // Check Stage 4 (LISTENING)
      const listeningStep = CURATED_ROADMAP_STEPS.find((s) => s.unitNumber === u && s.skillType === "LISTENING");
      expect(listeningStep).toBeDefined();
      expect(listeningStep?.totalSessions).toBe(1);
      expect(listeningStep?.practicePath).toMatch(/^\/study\/dictation\?id=[a-z0-9_]+&theme=/);

      // Check Stage 5 (STORY or SPEAKING)
      const stage5Step = CURATED_ROADMAP_STEPS.find(
        (s) => s.unitNumber === u && (s.skillType === "STORY" || s.skillType === "SPEAKING")
      );
      expect(stage5Step).toBeDefined();
      expect(stage5Step?.totalSessions).toBe(1);
      if (u % 2 === 0) {
        expect(stage5Step?.skillType).toBe("SPEAKING");
        expect(stage5Step?.practicePath).toMatch(/^\/study\/shadowing\/audio\?id=[a-z0-9_]+&theme=/);
      } else {
        expect(stage5Step?.skillType).toBe("STORY");
        expect(stage5Step?.practicePath).toMatch(/^\/study\/reading\/r[0-9]+\?theme=/);
      }

      // Check Stage 6 (CHECKPOINT)
      const checkpointStep = CURATED_ROADMAP_STEPS.find((s) => s.unitNumber === u && s.skillType === "CHECKPOINT");
      expect(checkpointStep).toBeDefined();
      expect(checkpointStep?.totalSessions).toBe(1);
      expect(checkpointStep?.practicePath).toBe(
        `/study/practice?mode=checkpoint&theme=${config?.themeId}&unit=${u}&part=1&totalParts=1`
      );

      // Verify that each theme has vocabulary in repository
      const hasBasic = BASIC_VOCABULARIES.some((v) => v.themeId === config?.themeId);
      const hasAdv = ADVANCED_VOCABULARIES.some((v) => v.themeId === config?.themeId);
      expect(hasBasic || hasAdv).toBe(true);
    }
  });
});
