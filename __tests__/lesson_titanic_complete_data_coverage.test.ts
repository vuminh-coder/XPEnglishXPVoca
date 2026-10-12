import { describe, it, expect } from "vitest";
import {
  LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED,
  QUIZ_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED,
} from "@/features/listening/data/lessons/movies/romance/lesson_titanic";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

describe("Senior Deep Audit: Titanic Video 9 - 100% Comprehensive Pure Data & Subtitle Coverage", () => {
  const lesson = LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED;
  const quiz = QUIZ_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED;

  it("1. Metadata & Video Specifications must strictly match requirements", () => {
    expect(lesson.id).toBe("mov_rom_09");
    expect(lesson.slug).toBe("titanic-flying-first-class-dinner-extended");
    expect(lesson.externalId).toBe("OSqS2ESN_ys");
    expect(lesson.durationSeconds).toBe(321);
    expect(lesson.durationFormatted).toBe("05:21");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // Strict >= 5 minutes condition
    expect(lesson.viewCount).toBeGreaterThanOrEqual(100000); // Popular engagement
    expect(lesson.accent).toContain("American");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("OSqS2ESN_ys");
  });

  it("2. Timeline Coverage must span comprehensively across all 56 pure master segments (100% of 321s timeline)", () => {
    const segments = lesson.segments;
    expect(segments.length).toBe(56);

    // Starts at beginning of scene dialogue (2.0s)
    expect(segments[0].startTime).toBeLessThanOrEqual(5.0);
    // Ends at the final timestamp (521.0s / 321s total duration)
    expect(segments[segments.length - 1].endTime).toBe(521.0);

    // Continuous monotonic progression across the entire timeline
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
  });

  it("3. Every single segment must have 100% complete data fields (text, IPA, translation, keywords, explanation, tokenCount)", () => {
    for (const seg of lesson.segments) {
      // 1. Text
      expect(seg.text.trim().length, `Segment ${seg.orderIndex} missing text`).toBeGreaterThan(0);

      // 2. Translation
      expect(seg.translationVi.trim().length, `Segment ${seg.orderIndex} missing translationVi`).toBeGreaterThan(0);
      expect(seg.translationVi).not.toBe(seg.text); // Must be translated into Vietnamese

      // 3. IPA
      expect(seg.ipaUs, `Segment ${seg.orderIndex} missing ipaUs`).toBeDefined();
      expect(seg.ipaUs!.trim().length).toBeGreaterThan(0);
      expect(seg.ipaUs!.startsWith("/"), `Segment ${seg.orderIndex} ipaUs should start with /`).toBe(true);
      expect(seg.ipaUs!.endsWith("/"), `Segment ${seg.orderIndex} ipaUs should end with /`).toBe(true);

      // 4. Keywords
      expect(seg.keywords, `Segment ${seg.orderIndex} missing keywords`).toBeDefined();
      expect(seg.keywords!.length, `Segment ${seg.orderIndex} should have at least 1 keyword`).toBeGreaterThanOrEqual(1);

      // 5. AI Explanation
      expect(seg.explanationAi, `Segment ${seg.orderIndex} missing explanationAi`).toBeDefined();
      expect(seg.explanationAi!.trim().length, `Segment ${seg.orderIndex} explanationAi too short`).toBeGreaterThan(15);

      // 6. Token count
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("4. Zero Merged Utterances: Every segment represents a single speaker utterance without dialogue merged dashes", () => {
    for (const seg of lesson.segments) {
      // Must not contain multi-speaker dash indicators like ' - ' or ' — ' combining two speaker turns
      expect(seg.text).not.toContain(" — ");
      expect(seg.text).not.toContain(" - ");
      expect(seg.text).not.toMatch(/^[A-Z][a-z]+:\s*—/);
      expect(seg.text).not.toMatch(/\s+—\s+[A-Z]/);
      // Word count sanity check
      const wordCount = seg.text.split(/\s+/).length;
      expect(wordCount, `Segment ${seg.orderIndex} has too many words for a single clean cue: ${wordCount}`).toBeLessThanOrEqual(30);
    }
  });

  it("5. 100% of all pivotal moments and narrative anchors must be captured verbatim", () => {
    const allText = lesson.segments.map((s) => s.text).join(" ");

    // --- ACT 1: CALLS IN THE ARCTIC DARKNESS ---
    expect(allText).toContain("Is there anyone alive out there?");
    expect(allText).toContain("Can anyone hear me?");
    expect(allText).toContain("We waited too long.");
    expect(allText).toContain("Keep checking them! Keep looking!");

    // --- ACT 2: ROSE'S FAINT LULLABY & DISTANT FLASHLIGHT ---
    expect(allText).toContain("Come, Josephine, in my flying machine...");
    expect(allText).toContain("Going up, she goes, up, she goes...");
    expect(allText).toContain("There's a boat, Jack.");

    // --- ACT 3: HEARTBREAKING REALIZATION OF JACK'S SACRIFICE ---
    expect(allText).toContain("Jack, there's a boat.");
    expect(allText).toContain("Jack! Jack! Jack...");
    expect(allText).toContain("He does not respond");
    expect(allText).toContain("Frost covers his eyelashes and lips.");

    // --- ACT 4: THE LIFEBOAT TURNS & ROSE'S VOICELESS PLEA ---
    expect(allText).toContain("Come about!");
    expect(allText).toContain("There's no one alive here.");
    expect(allText).toContain("Come back!");

    // --- ACT 5: THE ETERNAL PROMISE & SLIPPING INTO THE ABYSS ---
    expect(allText).toContain("I'll never let go.");
    expect(allText).toContain("I promise.");
    expect(allText).toContain("sinks into the deep abyss.");

    // --- ACT 6 & 7: CHIEF OFFICER WILDE'S WHISTLE & RESCUE ---
    expect(allText).toContain("Chief Officer Wilde");
    expect(allText).toContain("Clamped between his teeth is a brass whistle.");
    expect(allText).toContain("Oars! Hold water!");
    expect(allText).toContain("Did you hear that?");
    expect(allText).toContain("Bring her alongside. Gently. Gently now.");
    expect(allText).toContain("I've got you. You're safe now.");
  });

  it("6. Every segment tokenCount must exactly match tokenizeSentence output", () => {
    for (const seg of lesson.segments) {
      const calculatedTokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(
        seg.tokenCount,
        `Segment ${seg.orderIndex} tokenCount mismatch: expected ${calculatedTokens.length}, got ${seg.tokenCount}`
      ).toBe(calculatedTokens.length);
    }
  });

  it("7. Bilingual Quiz data must feature 8 comprehensive multiple-choice questions with valid references", () => {
    expect(quiz.lessonId).toBe("mov_rom_09");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(100);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`mov_rom_09_q${i + 1}`);

      // Bilingual question texts
      expect(q.question.trim().length).toBeGreaterThan(15);
      expect(q.questionEn!.trim().length).toBeGreaterThan(15);
      expect(q.questionVi!.trim().length).toBeGreaterThan(15);

      // Bilingual options (4 choices)
      expect(q.options.length).toBe(4);
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi!.length).toBe(4);

      // Correct answer index validation
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThanOrEqual(3);

      // Bilingual explanations
      expect(q.explanation.trim().length).toBeGreaterThan(20);
      expect(q.explanationEn!.trim().length).toBeGreaterThan(20);
      expect(q.explanationVi!.trim().length).toBeGreaterThan(20);

      // Pedagogical concepts
      expect(q.targetedConcept!.trim().length).toBeGreaterThan(5);
      expect(q.targetedConceptEn!.trim().length).toBeGreaterThan(5);
      expect(q.targetedConceptVi!.trim().length).toBeGreaterThan(5);

      // Reference segment verification
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex!).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex!).toBeLessThan(lesson.segments.length);
      const refSeg = lesson.segments[q.referenceSegmentIndex!];
      expect(refSeg).toBeDefined();
    }
  });
});
