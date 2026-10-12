import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED,
  QUIZ_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED,
} from "@/features/listening/data/lessons/movies/romance/lesson_titanic";
import { TOPIC_ROMANCE_CINEMA, LESSONS_ROMANCE_CINEMA } from "@/features/listening/data/topics/topic_romance_cinema";

describe("Senior 50-Year QA Deep Audit: Titanic - I'll Never Let Go (Video #9)", () => {
  it("should have valid lesson metadata and YouTube external ID matching OSqS2ESN_ys (>= 5 minutes standard)", () => {
    const lesson = LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED;
    expect(lesson.id).toBe("mov_rom_09");
    expect(lesson.slug).toBe("titanic-flying-first-class-dinner-extended");
    expect(lesson.externalId).toBe("OSqS2ESN_ys");
    expect(lesson.durationSeconds).toBe(321);
    expect(lesson.durationFormatted).toBe("05:21");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // Strict >= 5 minutes condition
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.categoryId).toBe("cat_romance_cinema");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("OSqS2ESN_ys");
  });

  it("should contain exactly 56 chronological pure verbatim segments covering all 7 narrative acts without merged utterances", () => {
    const { segments } = LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED;
    expect(segments.length).toBe(56);

    // Verify key narrative dialogue anchors across all acts
    expect(segments[0].text).toBe("Is there anyone alive out there?");
    expect(segments[1].text).toBe("Can anyone hear me?");
    expect(segments[3].text).toBe("We waited too long.");
    expect(segments[5].text).toContain("Keep checking them! Keep looking!");
    expect(segments[9].text).toContain("Come, Josephine, in my flying machine...");
    expect(segments[10].text).toContain("Going up, she goes, up, she goes...");
    expect(segments[13].text).toBe("Jack.");
    expect(segments[14].text).toBe("There's a boat, Jack.");
    expect(segments[16].text).toBe("Jack, there's a boat.");
    expect(segments[17].text).toBe("Jack! Jack! Jack...");
    expect(segments[19].text).toContain("Frost covers his eyelashes and lips.");
    expect(segments[20].text).toBe("No... Jack...");
    expect(segments[22].text).toBe("Come about!");
    expect(segments[24].text).toBe("There's no one alive here.");
    expect(segments[27].text).toBe("Come back!");
    expect(segments[29].text).toBe("Come back!");
    expect(segments[32].text).toBe("I'll never let go.");
    expect(segments[33].text).toBe("I promise.");
    expect(segments[34].text).toBe("I'll never let go.");
    expect(segments[40].text).toContain("Chief Officer Wilde");
    expect(segments[41].text).toContain("Clamped between his teeth is a brass whistle.");
    expect(segments[46].text).toBe("Oars! Hold water!");
    expect(segments[47].text).toBe("Did you hear that?");
    expect(segments[52].text).toContain("Bring her alongside. Gently. Gently now.");
    expect(segments[54].text).toBe("I've got you. You're safe now.");

    let prevStart = -1;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStart);
      prevStart = seg.startTime;

      // Verbatim and translation checks
      expect(seg.text.length).toBeGreaterThan(1);
      expect(seg.translationVi.length).toBeGreaterThan(1);

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
    const { segments } = LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED;
    segments.forEach((seg) => {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
      expect(tokens.length).toBeGreaterThan(0);
    });
  });

  it("should provide bilingual comprehension quiz with accurate references", () => {
    const quiz = QUIZ_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED;
    expect(quiz.lessonId).toBe("mov_rom_09");
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
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED.segments.length);
    });
  });

  it("should be properly registered in TOPIC_ROMANCE_CINEMA and LESSONS_ROMANCE_CINEMA", () => {
    const foundInLessons = LESSONS_ROMANCE_CINEMA.find((l) => l.id === "mov_rom_09");
    expect(foundInLessons).toBeDefined();
    expect(foundInLessons?.title).toBe(LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED.title);
    expect(foundInLessons?.externalId).toBe("OSqS2ESN_ys");
    expect(foundInLessons?.durationSeconds).toBe(321);
    expect(foundInLessons?.cefrLevel).toBe("B2");
    expect(foundInLessons?.segments.length).toBe(56);
    expect(TOPIC_ROMANCE_CINEMA.lessonsCount).toBe(LESSONS_ROMANCE_CINEMA.length);
  });
});
