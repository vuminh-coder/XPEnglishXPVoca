import { describe, it, expect, beforeEach } from "vitest";
import {
  GRAMMAR_TOPICS,
  getGrammarTopicById,
  getGrammarTopicsByLevel,
} from "@/features/grammar/data/grammarTopics";
import { getGrammarLesson } from "@/features/grammar/data/grammarContent";
import { useGrammarProgressStore } from "@/stores/grammarProgressStore";

describe("Grammar System & Data Integrity", () => {
  it("should have exactly 60 curated grammar topics", () => {
    expect(GRAMMAR_TOPICS.length).toBe(60);
  });

  it("should have 20 topics each for basic, intermediate, and advanced", () => {
    const basic = getGrammarTopicsByLevel("basic");
    const intermediate = getGrammarTopicsByLevel("intermediate");
    const advanced = getGrammarTopicsByLevel("advanced");

    expect(basic.length).toBe(20);
    expect(intermediate.length).toBe(20);
    expect(advanced.length).toBe(20);
  });

  it("should correctly find topic by id with underscores or hyphens", () => {
    const byUnderscore = getGrammarTopicById("present_simple");
    const byHyphen = getGrammarTopicById("present-simple");

    expect(byUnderscore).toBeDefined();
    expect(byHyphen).toBeDefined();
    expect(byUnderscore?.id).toBe("present_simple");
    expect(byHyphen?.id).toBe("present_simple");
  });

  it("should resolve lessons with rich formulas, memory tips and usages", () => {
    const lesson = getGrammarLesson("present_simple");
    expect(lesson).toBeDefined();
    expect(lesson?.formulas.length).toBeGreaterThan(0);
    expect(lesson?.memoryTip).toBeTruthy();
    expect(lesson?.usages.length).toBeGreaterThan(0);
    expect(lesson?.examples.length).toBeGreaterThan(0);
  });
});

describe("Grammar Progress Store", () => {
  beforeEach(() => {
    useGrammarProgressStore.getState().resetProgress();
  });

  it("initializes with zero completed and unstarted topic status", () => {
    const store = useGrammarProgressStore.getState();
    expect(store.getCompletedCount()).toBe(0);
    expect(store.getAverageAccuracy()).toBe(0);
    expect(store.getTopicStatus("present_simple")).toBe("unstarted");
  });

  it("marks topic started and transitions status to in_progress", () => {
    const store = useGrammarProgressStore.getState();
    store.markTopicStarted("present_simple");

    expect(useGrammarProgressStore.getState().getTopicStatus("present_simple")).toBe(
      "in_progress"
    );
  });

  it("records quiz result and automatically marks topic completed if score >= 60%", () => {
    const store = useGrammarProgressStore.getState();
    store.recordQuizResult("present_simple", 4, 5); // 80%

    const updated = useGrammarProgressStore.getState();
    expect(updated.getCompletedCount()).toBe(1);
    expect(updated.getTopicStatus("present_simple")).toBe("completed");
    expect(updated.quizScores["present_simple"].percent).toBe(80);
    expect(updated.getAverageAccuracy()).toBe(80);
  });

  it("keeps topic in progress if score < 60%", () => {
    const store = useGrammarProgressStore.getState();
    store.recordQuizResult("conditionals_3", 2, 5); // 40%

    const updated = useGrammarProgressStore.getState();
    expect(updated.getCompletedCount()).toBe(0);
    expect(updated.getTopicStatus("conditionals_3")).toBe("in_progress");
  });
});
