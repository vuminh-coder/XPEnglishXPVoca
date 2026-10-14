import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION,
  QUIZ_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION,
} from "@/features/listening/data/lessons/movies/romance/lesson_the_notebook";
import { TOPIC_ROMANCE_CINEMA, LESSONS_ROMANCE_CINEMA } from "@/features/listening/data/topics/topic_romance_cinema";

describe("Senior 50-Year QA Deep Audit: The Notebook - Most Passionate Moments (Video #4)", () => {
  it("should have valid lesson metadata and official YouTube external ID matching Y5hVdlRFAUo (>= 5 minutes standard)", () => {
    const lesson = LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION;
    expect(lesson.id).toBe("mov_rom_04");
    expect(lesson.slug).toBe("the-notebook-it-wasnt-over-confrontation");
    expect(lesson.externalId).toBe("Y5hVdlRFAUo");
    expect(lesson.durationSeconds).toBe(804);
    expect(lesson.durationFormatted).toBe("13:24");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // Strict >= 5 minutes condition
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.categoryId).toBe("cat_romance_cinema");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("Y5hVdlRFAUo");
  });

  it("should contain exactly 106 chronological verbatim segments with Zero Merged Utterances covering Ferris wheel to dock confrontation & final letter", () => {
    const { segments } = LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION;
    expect(segments.length).toBe(106);

    // Verify key narrative dialogue anchors
    const allText = segments.map((s) => s.text).join(" ");
    expect(allText).toContain("will you or will you not go out with me?");
    expect(allText).toContain("I could be whatever you want.");
    expect(allText).toContain("Why didn't you write me?");
    expect(allText).toContain("I wrote you 365 letters.");
    expect(allText).toContain("Did you pay attention to anything that's been happening?!");
    expect(allText).toContain("What do you want?! What do you want?!");
    expect(allText).toContain("I'm not bitter anymore");
    expect(allText).toContain("It was us... It was us, darling!");
    expect(allText).toContain("Somebody help me! Who are you?!");

    let prevStart = -1;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStart);
      prevStart = seg.startTime;

      // Verbatim and translation checks
      expect(seg.text.length).toBeGreaterThan(1);
      expect(seg.translationVi.length).toBeGreaterThan(1);

      // Zero Merged Utterances
      expect(seg.text.startsWith("- ")).toBe(false);
      expect(seg.text).not.toContain(" - ");
      expect(seg.text).not.toContain(" — ");

      // IPA and pedagogical checks
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(2);
      expect(seg.ipaUs!).toContain("/");

      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length).toBeGreaterThanOrEqual(1);

      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(10);
    }
  });

  it("should match tokenizeSentence length exactly for each segment's tokenCount", () => {
    const { segments } = LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION;
    segments.forEach((seg) => {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
      expect(tokens.length).toBeGreaterThan(0);
    });
  });

  it("should provide bilingual comprehension quiz with 8 questions and accurate references", () => {
    const quiz = QUIZ_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION;
    expect(quiz.lessonId).toBe("mov_rom_04");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.xpReward).toBe(100);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q) => {
      expect(q.id.length).toBeGreaterThan(0);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.options.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThanOrEqual(3);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      // Reference segment (1-indexed)
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION.segments.length);
    });
  });

  it("should be properly registered in TOPIC_ROMANCE_CINEMA and LESSONS_ROMANCE_CINEMA", () => {
    const foundInList = LESSONS_ROMANCE_CINEMA.find((l) => l.id === "mov_rom_04");
    expect(foundInList).toBeDefined();
    expect(foundInList?.externalId).toBe("Y5hVdlRFAUo");
    expect(foundInList?.segments.length).toBe(106);
    expect(foundInList?.quiz?.questions.length).toBe(8);
    expect(TOPIC_ROMANCE_CINEMA.lessonsCount).toBe(LESSONS_ROMANCE_CINEMA.length);
  });
});
