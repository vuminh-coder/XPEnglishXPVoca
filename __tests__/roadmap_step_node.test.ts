import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getStepPracticeUrl } from "@/features/roadmap/components/ziczac/ZiczacStepNode";
import { syncRoadmapSessionProgress, STORAGE_KEY_STEP_SESSIONS, STORAGE_KEY_COMPLETED_STEPS } from "@/features/roadmap/utils/roadmapSessionSync";
import { ZiczacPathStep, ZiczacStepProgress } from "@/features/roadmap/types";

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
});
