import { describe, it, expect } from "vitest";
import { calculateSimilarity } from "@/features/shadowing/hooks/useShadowingAudioRecorder";

describe("Shadowing Real-time Progressive Speech Alignment & Cursor Tracking", () => {
  it("should calculate string similarity correctly across exact, near, and mismatch words", () => {
    // Exact matches
    expect(calculateSimilarity("answer", "answer")).toBe(1.0);
    expect(calculateSimilarity("kurzgesagt", "kurzgesagt")).toBe(1.0);
    expect(calculateSimilarity("Labs,", "labs")).toBe(1.0);

    // Near misses (should be >= 0.55 and < 0.78)
    expect(calculateSimilarity("questions", "question")).toBeGreaterThanOrEqual(0.78);
    expect(calculateSimilarity("important", "importnt")).toBeGreaterThanOrEqual(0.75);
    expect(calculateSimilarity("science", "sciense")).toBeGreaterThanOrEqual(0.70);

    // Complete mismatches (should be < 0.50)
    expect(calculateSimilarity("where", "banana")).toBeLessThan(0.40);
    expect(calculateSimilarity("answer", "tomorrow")).toBeLessThan(0.40);
  });

  // Helper function faithfully replicating evaluateLiveSpeech in useShadowingAudioRecorder.ts
  function simulateLiveSpeechAlignment(targetSentence: string, spokenTranscript: string) {
    const targetTokens = targetSentence.trim().split(/\s+/).filter(Boolean);
    const targetClean = targetTokens.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ""));

    const spokenRaw = spokenTranscript.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const spokenClean = spokenRaw.map((w) => w.replace(/[^a-z0-9]/g, "")).filter(Boolean);

    const FILLER_WORDS = new Set(["um", "uh", "mh", "ah", "er", "oh"]);
    let startSpokenIdx = 0;
    while (
      startSpokenIdx < spokenClean.length &&
      FILLER_WORDS.has(spokenClean[startSpokenIdx]) &&
      !FILLER_WORDS.has(targetClean[0])
    ) {
      startSpokenIdx++;
    }
    const effectiveSpoken = spokenClean.slice(startSpokenIdx);

    const statuses: { [idx: number]: "perfect" | "good" | "needs_work" | "active" } = {};
    let targetIdx = 0;
    let spokenIdx = 0;

    while (targetIdx < targetClean.length && spokenIdx < effectiveSpoken.length) {
      const tWord = targetClean[targetIdx];
      const sWord = effectiveSpoken[spokenIdx];
      const sim = calculateSimilarity(tWord, sWord);

      if (sim >= 0.78) {
        statuses[targetIdx] = "perfect";
        targetIdx++;
        spokenIdx++;
      } else if (sim >= 0.55) {
        statuses[targetIdx] = "good";
        targetIdx++;
        spokenIdx++;
      } else {
        const nextTargetWord = targetClean[targetIdx + 1];
        const nextSpokenWord = effectiveSpoken[spokenIdx + 1];

        const simSkipTarget = nextTargetWord ? calculateSimilarity(nextTargetWord, sWord) : 0;
        const simStutterSpoken = nextSpokenWord ? calculateSimilarity(tWord, nextSpokenWord) : 0;

        if (simStutterSpoken >= 0.55) {
          spokenIdx++;
        } else if (simSkipTarget >= 0.55) {
          statuses[targetIdx] = "needs_work";
          targetIdx++;
        } else {
          // ANCHOR RULE (Fix for Chrome rushing ahead of user):
          // If spokenIdx is the last word in the stream, do NOT advance targetIdx!
          // Anchor the cursor at targetIdx so user has time to finish pronouncing the word.
          if (spokenIdx === effectiveSpoken.length - 1) {
            break;
          } else {
            statuses[targetIdx] = "needs_work";
            targetIdx++;
            spokenIdx++;
          }
        }
      }
    }

    const activeCursorIdx = targetIdx < targetClean.length ? targetIdx : null;
    if (activeCursorIdx !== null) {
      statuses[activeCursorIdx] = "active";
    }

    return { statuses, activeCursorIdx, targetIdx };
  }

  it("should Anchor Cursor on current word when user is still speaking and interim hypothesis is incomplete", () => {
    const target = "Kurzgesagt Labs, where we answer the most important questions with science.";

    // Case A: User has just opened mouth, Chrome interim outputs partial syllable "cur" or filler "and"
    const stepInterim = simulateLiveSpeechAlignment(target, "and");
    // Under the ANCHOR RULE: Cursor MUST NOT rush to word 1 or 2!
    expect(stepInterim.activeCursorIdx).toBe(0); // Anchored at index 0 ("Kurzgesagt")
    expect(stepInterim.statuses[0]).toBe("active"); // Held as active, NOT marked needs_work!
    expect(stepInterim.statuses[1]).toBeUndefined(); // Word 1 has not been touched

    // Case B: In the next 100ms, Chrome finishes recognizing the full word "Kurzgesagt"
    const stepCompleted = simulateLiveSpeechAlignment(target, "Kurzgesagt");
    expect(stepCompleted.statuses[0]).toBe("perfect");
    expect(stepCompleted.activeCursorIdx).toBe(1); // Now smoothly steps to word 1 ("Labs,")
  });

  it("should progressively align words in sequence without leaping to the end of the sentence", () => {
    const target = "Kurzgesagt Labs, where we answer the most important questions with science.";

    // Step 1: User says only "mh, Kurzgesagt" (1 target word spoken + 1 filler)
    const step1 = simulateLiveSpeechAlignment(target, "mh, Kurzgesagt");
    expect(step1.statuses[0]).toBe("perfect"); // "Kurzgesagt" matched
    expect(step1.activeCursorIdx).toBe(1); // Cursor moves strictly to index 1 ("Labs,")
    expect(step1.statuses[2]).toBeUndefined(); // Word 2 is unspoken
    expect(step1.statuses[10]).toBeUndefined(); // Does NOT jump to the end!

    // Step 2: User continues: "mh, Kurzgesagt Labs, where" (3 words)
    const step2 = simulateLiveSpeechAlignment(target, "mh, Kurzgesagt Labs, where");
    expect(step2.statuses[0]).toBe("perfect");
    expect(step2.statuses[1]).toBe("perfect");
    expect(step2.statuses[2]).toBe("perfect");
    expect(step2.activeCursorIdx).toBe(3); // Cursor moves to "we"
    expect(step2.statuses[4]).toBeUndefined(); // "answer" is not yet spoken
  });

  it("should detect skipped word accurately and advance cursor when subsequent word matches", () => {
    const target = "Kurzgesagt Labs, where we answer";
    // User accidentally skips "Labs," and jumps to "where": "Kurzgesagt where"
    const result = simulateLiveSpeechAlignment(target, "Kurzgesagt where");

    expect(result.statuses[0]).toBe("perfect"); // "Kurzgesagt"
    expect(result.statuses[1]).toBe("needs_work"); // "Labs," marked as skipped
    expect(result.statuses[2]).toBe("perfect"); // "where" matched
    expect(result.activeCursorIdx).toBe(3); // Cursor at "we"
  });

  it("should support near-miss pronunciation with 'good' (Amber) status", () => {
    const target = "science questions";
    // "science" vs "siens": similarity ~ 0.71 (in 0.55 - 0.78 range)
    const result = simulateLiveSpeechAlignment(target, "siens questions");

    expect(result.statuses[0]).toBe("good"); // Near-miss
    expect(result.statuses[1]).toBe("perfect"); // Exact match
  });
});
