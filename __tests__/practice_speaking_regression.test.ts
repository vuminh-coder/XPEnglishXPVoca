import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { computeSimilarityScore } from "@/features/practice/utils/similarity";
import { seededShuffle } from "@/features/practice/utils/shuffle";

const read = (rel: string) => readFileSync(resolve(process.cwd(), rel), "utf8");

describe("practice speaking mode regression contract", () => {
  const hook = read("features/practice/hooks/usePracticeSpeech.ts");
  const arena = read("features/practice/components/PracticeSpeakingArena.tsx");
  const session = read("features/practice/hooks/usePracticeSession.ts");

  it("clears the previous attempt when a new recording starts", () => {
    const start = hook.slice(hook.indexOf("const startSpeaking"));
    const beforeRecognizer = start.slice(0, start.indexOf("new SpeechRecognition"));
    expect(beforeRecognizer).toContain("setIsAnswered(false)");
    expect(beforeRecognizer).toContain("setIsCorrect(false)");
    expect(beforeRecognizer).toContain('setTranscript("")');
  });

  it("never fakes a successful pass on unsupported browsers", () => {
    expect(hook).not.toContain("setAccuracy(96)");
    expect(hook).not.toMatch(/onSuccess\?\.\(96\)/);
  });

  it("ignores events from replaced recognizers and exposes stopSpeaking", () => {
    expect(hook).toContain("isStale");
    expect(hook).toContain("stopSpeaking");
  });

  it("shows the countdown and does not use rose for the listening state", () => {
    expect(arena).toContain("questionTimeLeft");
    expect(arena).toContain('role="timer"');
    const listeningClass = arena.slice(arena.indexOf("isListening\n              ? \""), arena.indexOf("isPassed\n              ?"));
    expect(listeningClass).not.toContain("rose");
  });

  it("pauses the countdown while the microphone is listening", () => {
    expect(session).toContain("speech.isAnswered || speech.isListening");
  });

  it("uses Levenshtein edit distance in computeSimilarityScore for shifted prefix/suffix speech", () => {
    expect(computeSimilarityScore("schedule", "schedule")).toBe(100);
    expect(computeSimilarityScore("schedule", "eschedule")).toBeGreaterThanOrEqual(80);
    expect(computeSimilarityScore("morning", "good morning")).toBeGreaterThanOrEqual(85);
    expect(computeSimilarityScore("hello", "completelywrong")).toBeLessThan(40);
  });

  it("shuffles deterministically with Fisher-Yates seededShuffle and deduplicates quiz meanings", () => {
    const a = seededShuffle(["A", "B", "C", "D"], "test_seed_1");
    const b = seededShuffle(["A", "B", "C", "D"], "test_seed_1");
    expect(a).toEqual(b);
    expect(a.sort()).toEqual(["A", "B", "C", "D"]);
    expect(session).toContain("seenMeanings");
    expect(session).toContain("handleCheckQuiz");
    expect(session).toContain("saveStageMatchedVocab");
  });

  it("prevents duplicate keydown listeners in PracticeBottomBar and PracticeFlashcardArena and fixes 0% accuracy bug", () => {
    const bottomBar = read("features/practice/components/PracticeBottomBar.tsx");
    const flashcardArena = read("features/practice/components/PracticeFlashcardArena.tsx");
    const quizArena = read("features/practice/components/PracticeQuizArena.tsx");
    const writingArena = read("features/practice/components/PracticeWritingArena.tsx");
    const scoreCard = read("features/practice/components/PracticeScoreCard.tsx");

    expect(bottomBar).not.toContain('window.addEventListener("keydown"');
    expect(flashcardArena).not.toContain('window.addEventListener("keydown"');
    expect(quizArena).toContain('role="timer"');
    expect(writingArena).toContain('role="timer"');
    expect(scoreCard).not.toContain("correctCount || totalWords");
  });
});
