import { describe, it, expect } from "vitest";
import {
  LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY,
  QUIZ_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY,
} from "@/features/listening/data/lessons/movies/romance/lesson_500_days_of_summer";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

describe("Senior Deep Audit: 500 Days of Summer Video 8 - 100% Comprehensive Pure Data & Subtitle Coverage", () => {
  const lesson = LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY;
  const quiz = QUIZ_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY;

  it("1. Metadata & Video Specifications must strictly match requirements", () => {
    expect(lesson.id).toBe("mov_rom_08");
    expect(lesson.slug).toBe("500-days-of-summer-expectations-vs-reality");
    expect(lesson.externalId).toBe("AS47hWRO0bw");
    expect(lesson.durationSeconds).toBe(624);
    expect(lesson.durationFormatted).toBe("10:24");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // Strict >= 5 minutes condition
    expect(lesson.viewCount).toBeGreaterThanOrEqual(100000); // Popular engagement
    expect(lesson.accent).toContain("American");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("AS47hWRO0bw");
  });

  it("2. Timeline Coverage must span comprehensively across all 62 pure master segments (100% of 624s timeline)", () => {
    const segments = lesson.segments;
    expect(segments.length).toBe(62);

    // Starts at beginning of video dialogue
    expect(segments[0].startTime).toBeLessThanOrEqual(2.0);
    // Ends at the final timestamp (624.0s)
    expect(segments[segments.length - 1].endTime).toBe(624.0);

    // Continuous monotonic progression across the entire timeline
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
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
      // Word count sanity check (pure segment should not be an overwhelming block of text)
      const wordCount = seg.text.split(/\s+/).length;
      expect(wordCount, `Segment ${seg.orderIndex} has too many words for a single clean cue: ${wordCount}`).toBeLessThanOrEqual(30);
    }
  });

  it("5. 100% of all pivotal moments and narrative anchors must be captured verbatim", () => {
    const allText = lesson.segments.map((s) => s.text).join(" ");

    // --- MOMENT 10: NARRATOR INTRO & DISCLAIMER ---
    expect(allText).toContain("500 Days of Summer is not in fact a love story");
    expect(allText).toContain("You should know upfront, this is not a love story");

    // --- MOMENT 9: THE SUMMER EFFECT MONTAGE ---
    expect(allText).toContain("The Summer Effect");
    expect(allText).toContain("empirically attractive and magnetic");
    expect(allText).toContain("causing double takes");

    // --- MOMENT 8: SHOUTING GAME IN THE PARK ---
    expect(allText).toContain("challenges Tom to a daring shouting game");
    expect(allText).toContain("say the word progressively louder");
    expect(allText).toContain("shouting at the top of her lungs");

    // --- MOMENT 7: MEETING AUTUMN AT ANGEL'S POINT ---
    expect(allText).toContain("My name is Tom");
    expect(allText).toContain("Nice to meet you, I'm Autumn");
    expect(allText).toContain("Do you go to Angel's Plaza?");
    expect(allText).toContain("Yes, that's like my favorite spot");

    // --- MOMENT 6: LOVE VS HATE CONTRAST ---
    expect(allText).toContain("I love her smile, her hair, her knees");
    expect(allText).toContain("heart-shaped birthmark");
    expect(allText).toContain("I hate her crooked teeth, her 1960s haircut");

    // --- MOMENT 5: ELEVATOR ENCOUNTER WITH THE SMITHS ---
    expect(allText).toContain("I love The Smiths");
    expect(allText).toContain("To die by your side is such a heavenly way to die");

    // --- MOMENT 4: IKEA DATE & EMOTIONAL WARNING ---
    expect(allText).toContain("exaggerated game of pretend, acting as a stereotypical couple");
    expect(allText).toContain("I'm not really looking for anything serious");

    // --- MOMENT 2: DAY 488 REUNION ---
    expect(allText).toContain("I just woke up one day and I knew");
    expect(allText).toContain("Knew what?");
    expect(allText).toContain("What I was never sure of with you");

    // --- MOMENT 1: EXPECTATIONS VS REALITY ---
    expect(allText).toContain("Expectations");
    expect(allText).toContain("Reality");
    expect(allText).toContain("engagement ring");
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
    expect(quiz.lessonId).toBe("mov_rom_08");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(100);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`mov_rom_08_q${i + 1}`);

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
      expect(q.referenceSegmentIndex!).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex!).toBeLessThanOrEqual(lesson.segments.length);
      const refSeg = lesson.segments.find((s) => s.orderIndex === q.referenceSegmentIndex);
      expect(refSeg).toBeDefined();
    }
  });
});
