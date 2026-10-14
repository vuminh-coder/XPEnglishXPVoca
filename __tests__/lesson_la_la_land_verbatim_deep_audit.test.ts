import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION,
  QUIZ_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION,
} from "@/features/listening/data/lessons/movies/romance/lesson_la_la_land";
import { TOPIC_ROMANCE_CINEMA, LESSONS_ROMANCE_CINEMA } from "@/features/listening/data/topics/topic_romance_cinema";

describe("Senior 50-Year QA Deep Audit: La La Land - Sebastian & Mia Confrontation (Video #3)", () => {
  it("should have valid lesson metadata and official YouTube external ID matching gW0xteHHXrY (>= 5 minutes standard)", () => {
    const lesson = LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION;
    expect(lesson.id).toBe("mov_rom_03");
    expect(lesson.slug).toBe("la-la-land-the-fools-who-dream-audition");
    expect(lesson.externalId).toBe("gW0xteHHXrY");
    expect(lesson.durationSeconds).toBe(390);
    expect(lesson.durationFormatted).toBe("06:30");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // Strict >= 5 minutes condition
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.categoryId).toBe("cat_romance_cinema");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("gW0xteHHXrY");
  });

  it("should contain exactly 87 chronological verbatim segments with zero gaps and Zero Merged Utterances covering full dinner confrontation", () => {
    const { segments } = LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION;
    expect(segments.length).toBe(87);

    const allText = segments.map((s) => s.text).join(" ");
    // Verify key narrative anchors across all segments
    expect(allText).toContain("So where is the new home?");
    expect(allText).toContain("I'm nervous to get up on a stage and perform for people.");
    expect(allText).toContain("We tour so we can make the records");
    expect(allText).toContain("Do you like the music you're playing?");
    expect(allText).toContain("Why aren't you starting your club?");
    expect(allText).toContain("people love what other people are passionate about");
    expect(allText).toContain("liked me when I was on my ass");

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
    const { segments } = LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION;
    for (const seg of segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
      expect(tokens.length).toBeGreaterThan(0);
      for (const tok of tokens) {
        expect(tok.clean.length).toBeGreaterThan(0);
        expect(tok.dots.length).toBe(tok.clean.length);
      }
    }
  });

  it("should have comprehensive bilingual quiz matching actual movie dialogue and themes with 8 questions", () => {
    const quiz = QUIZ_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION;
    expect(quiz.lessonId).toBe("mov_rom_03");
    expect(quiz.questions.length).toBe(8);

    for (const q of quiz.questions) {
      expect(q.id.length).toBeGreaterThan(0);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.questionEn!.length).toBeGreaterThan(10);
      expect(q.questionVi!.length).toBeGreaterThan(10);

      // 4 bilingual options
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.options.length).toBe(4);
      expect([0, 1, 2, 3]).toContain(q.correctAnswer);

      // In-depth explanations
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.explanationEn!.length).toBeGreaterThan(20);
      expect(q.explanationVi!.length).toBeGreaterThan(20);

      // Reference segment (1-indexed)
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(87);

      // Targeted concept
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
    }
  });

  it("should verify integration with TOPIC_ROMANCE_CINEMA catalog", () => {
    expect(TOPIC_ROMANCE_CINEMA.id).toBe("cat_romance_cinema");
    const foundInTopic = LESSONS_ROMANCE_CINEMA.find((l) => l.id === "mov_rom_03");
    expect(foundInTopic).toBeDefined();
    expect(foundInTopic?.title).toBe(LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION.title);
    expect(foundInTopic?.segments.length).toBe(87);
    expect(foundInTopic?.quiz?.questions.length).toBe(8);
  });
});
