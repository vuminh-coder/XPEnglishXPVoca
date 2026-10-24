import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

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
});
