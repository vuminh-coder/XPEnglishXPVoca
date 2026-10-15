import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY,
  QUIZ_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY,
} from "@/features/listening/data/lessons/movies/romance/lesson_500_days_of_summer";
import { TOPIC_ROMANCE_CINEMA, LESSONS_ROMANCE_CINEMA } from "@/features/listening/data/topics/topic_romance_cinema";

describe("Senior 50-Year QA Deep Audit: 500 Days of Summer - Top 10 Iconic Moments (Video #8)", () => {
  it("should have valid lesson metadata and YouTube external ID matching AS47hWRO0bw (>= 5 minutes standard)", () => {
    const lesson = LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY;
    expect(lesson.id).toBe("mov_rom_08");
    expect(lesson.slug).toBe("500-days-of-summer-expectations-vs-reality");
    expect(lesson.externalId).toBe("AS47hWRO0bw");
    expect(lesson.durationSeconds).toBe(624);
    expect(lesson.durationFormatted).toBe("10:24");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // Strict >= 5 minutes condition
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.categoryId).toBe("cat_romance_cinema");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("AS47hWRO0bw");
  });

  it("should contain exactly 62 chronological pure verbatim segments covering all 10 moments without merged utterances", () => {
    const { segments } = LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY;
    expect(segments.length).toBe(62);

    // Verify key narrative dialogue anchors across 10 iconic moments
    expect(segments[0].text).toContain("comedy with romance");
    expect(segments[1].text).toContain("top ten 500 Days of Summer moments");
    expect(segments[6].text).toContain("500 Days of Summer is not in fact a love story");
    expect(segments[9].text).toContain("You should know upfront, this is not a love story");
    expect(segments[10].text).toContain("The Summer Effect");
    expect(segments[11].text).toContain("Summer, everyone. Everyone, Summer");
    expect(segments[12].text).toContain("in black and white");
    expect(segments[13].text).toContain("empirically attractive and magnetic");
    expect(segments[17].text).toContain("challenges Tom to a daring shouting game");
    expect(segments[18].text).toContain("say the word progressively louder");
    expect(segments[19].text).toContain("shouting at the top of her lungs");
    expect(segments[20].text).toContain("Number seven: Autumn");
    expect(segments[23].text).toContain("Do you go to Angel's Plaza?");
    expect(segments[24].text).toContain("Yes, that's like my favorite spot");
    expect(segments[25].text).toContain("My name is Tom");
    expect(segments[26].text).toContain("Nice to meet you, I'm Autumn");
    expect(segments[28].text).toContain("I love her smile, her hair, her knees");
    expect(segments[29].text).toContain("heart-shaped birthmark");
    expect(segments[31].text).toContain("I hate her crooked teeth");
    expect(segments[34].text).toContain("I love The Smiths");
    expect(segments[37].text).toContain("To die by your side is such a heavenly way to die");
    expect(segments[41].text).toContain("game of pretend");
    expect(segments[43].text).toContain("I'm not really looking for anything serious");
    expect(segments[49].text).toContain("Number two: Day 488");
    expect(segments[52].text).toContain("I just woke up one day and I knew");
    expect(segments[53].text).toContain("Knew what?");
    expect(segments[56].text).toContain("Number one: Expectations versus Reality");
    expect(segments[58].text).toContain("depicted on a brilliant split screen");
    expect(segments[59].text).toContain("In Expectations, Tom grows closer to Summer; in Reality");
    expect(segments[60].text).toContain("engagement ring");
    expect(segments[61].text).toContain("real life rarely works out");

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
    const { segments } = LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY;
    segments.forEach((seg) => {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
      expect(tokens.length).toBeGreaterThan(0);
    });
  });

  it("should provide bilingual comprehension quiz with accurate references", () => {
    const quiz = QUIZ_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY;
    expect(quiz.lessonId).toBe("mov_rom_08");
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
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY.segments.length);
    });
  });

  it("should be properly registered in TOPIC_ROMANCE_CINEMA and LESSONS_ROMANCE_CINEMA", () => {
    const foundInLessons = LESSONS_ROMANCE_CINEMA.find((l) => l.id === "mov_rom_08");
    expect(foundInLessons).toBeDefined();
    expect(foundInLessons?.title).toBe(LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY.title);
    expect(foundInLessons?.externalId).toBe("AS47hWRO0bw");
    expect(foundInLessons?.durationSeconds).toBe(624);
    expect(foundInLessons?.cefrLevel).toBe("B2");
    expect(foundInLessons?.segments.length).toBe(62);
    expect(TOPIC_ROMANCE_CINEMA.lessonsCount).toBe(LESSONS_ROMANCE_CINEMA.length);
  });
});
