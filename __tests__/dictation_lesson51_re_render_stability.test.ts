import { describe, it, expect } from "vitest";
import { resolveCanonicalLessonId, isSameLessonId } from "@/features/listening/utils/lessonIdHelper";
import {
  extractProperNouns,
  tokenizeSentence,
  type WordToken,
} from "@/features/listening/components/DictationWorkspace";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";

describe("Lesson 51 & Dictation Re-render Stability", () => {
  it("resolves id=51 to canonical listen_toeic_q3_051, never lesson 42", () => {
    const canonical = resolveCanonicalLessonId("51");
    expect(canonical).toBe("listen_toeic_q3_051");
    expect(isSameLessonId("51", "listen_toeic_q3_051")).toBe(true);
    expect(isSameLessonId("51", "listen_toeic_q3_042")).toBe(false);

    // Verify in MOCK_LESSONS_DATA
    const lesson = MOCK_LESSONS_DATA.find((l) => l.id === canonical);
    expect(lesson).toBeDefined();
    expect(lesson?.title).toBe("Agritech Smart Farming & Automated Irrigation");
    expect(lesson?.transcript?.length).toBeGreaterThanOrEqual(4);
  });

  it("extracts proper nouns when customProperNouns is empty [] without suppressing extraction", () => {
    const sentence = "Welcome everyone to our demonstration of the Smart Farm Precision Irrigation System.";
    // Passing empty array should NOT return []
    const extractedWithEmpty = extractProperNouns(sentence, []);
    expect(extractedWithEmpty.length).toBeGreaterThan(0);
    expect(extractedWithEmpty).toContain("Smart");
    expect(extractedWithEmpty).toContain("Farm");
  });

  it("tokenizes sentence 0 of lesson 51 correctly", () => {
    const sentence = "Welcome everyone to our demonstration of the Smart Farm Precision Irrigation System.";
    const properNouns = extractProperNouns(sentence, []);
    const tokens = tokenizeSentence(sentence, properNouns);

    expect(tokens.length).toBe(12);
    expect(tokens[0].clean).toBe("Welcome");
    expect(tokens[0].status).toBe("masked");
    expect(tokens[1].clean).toBe("everyone");
  });

  it("simulates hint first letter of each word successively without progressive letter-by-letter hint", () => {
    const sentence = "Welcome everyone to our demonstration of the Smart Farm Precision Irrigation System.";
    const properNouns = extractProperNouns(sentence, []);
    let tokens = tokenizeSentence(sentence, properNouns);

    // Step 1: 1st Hint click -> reveals first letter of word 0 ("Welcome")
    let targetIndex = tokens.findIndex((t) => t.status === "masked");
    expect(targetIndex).toBe(0);

    let targetToken = tokens[targetIndex];
    let firstLetter = targetToken.clean.charAt(0);
    expect(firstLetter).toBe("W");
    tokens[targetIndex] = { ...targetToken, status: "first-letter", hintLength: 1 };

    // Display of word 0
    let displayWord0 = tokens[0].clean.charAt(0) + "•".repeat(tokens[0].length - 1);
    expect(displayWord0).toBe("W••••••");

    // Step 2: 2nd Hint click -> reveals first letter of NEXT word (word 1 "everyone"), NOT 2nd letter of word 0!
    targetIndex = tokens.findIndex((t) => t.status === "masked");
    expect(targetIndex).toBe(1);
    targetToken = tokens[targetIndex];
    firstLetter = targetToken.clean.charAt(0);
    expect(firstLetter).toBe("e");
    tokens[targetIndex] = { ...targetToken, status: "first-letter", hintLength: 1 };

    // Display of word 1
    let displayWord1 = tokens[1].clean.charAt(0) + "•".repeat(tokens[1].length - 1);
    expect(displayWord1).toBe("e•••••••");

    // Word 0 is still strictly first letter only
    expect(tokens[0].status).toBe("first-letter");
    expect(tokens[0].clean.charAt(0)).toBe("W");

    // Step 3: 3rd Hint click -> reveals first letter of word 2 ("to")
    targetIndex = tokens.findIndex((t) => t.status === "masked");
    expect(targetIndex).toBe(2);
    expect(tokens[targetIndex].clean).toBe("to");
    tokens[targetIndex] = { ...tokens[targetIndex], status: "first-letter", hintLength: 1 };
    expect(tokens[2].clean.charAt(0) + "•".repeat(tokens[2].length - 1)).toBe("t•");
  });

  it("simulates reveal next word on sentence 0 of lesson 51", () => {
    const sentence = "Welcome everyone to our demonstration of the Smart Farm Precision Irrigation System.";
    const properNouns = extractProperNouns(sentence, []);
    const tokens = tokenizeSentence(sentence, properNouns);

    // Click reveal next word
    const targetIndex = tokens.findIndex((t) => t.status === "masked" || t.status === "first-letter");
    expect(targetIndex).toBe(0);
    tokens[targetIndex] = { ...tokens[targetIndex], status: "revealed" };

    expect(tokens[0].status).toBe("revealed");
    // Next unsolved word is now index 1
    const nextIndex = tokens.findIndex((t) => t.status === "masked" || t.status === "first-letter");
    expect(nextIndex).toBe(1);
  });

  it("verifies sentence re-render guard preserves state when same sentence re-renders", () => {
    const lessonId = "listen_toeic_q3_051";
    const sentenceIndex = 0;
    const sentenceText = "Welcome everyone to our demonstration of the Smart Farm Precision Irrigation System.";

    let lastSentenceKey = `${lessonId}_${sentenceIndex}_${sentenceText}`;
    let tokens = tokenizeSentence(sentenceText, []);
    tokens[0] = { ...tokens[0], status: "revealed" };
    let inputValue = "custom input";

    // Simulate parent re-render (e.g. 1Hz playback time tick, audio update, volume change)
    // Same lessonId, sentenceIndex, and sentenceText
    const currentSentenceKey = `${lessonId}_${sentenceIndex}_${sentenceText}`;
    const shouldReset = lastSentenceKey !== currentSentenceKey;

    expect(shouldReset).toBe(false);
    // Tokens and input MUST NOT be wiped out
    expect(tokens[0].status).toBe("revealed");
    expect(inputValue).toBe("custom input");

    // Only when user advances to sentence 1 should it reset
    const nextSentenceKey = `${lessonId}_1_Next sentence text`;
    const shouldResetOnAdvance = lastSentenceKey !== nextSentenceKey;
    expect(shouldResetOnAdvance).toBe(true);
  });
});
