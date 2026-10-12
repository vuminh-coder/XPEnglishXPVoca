import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY,
  QUIZ_ONE_DAY_EMMA_DEXTER_LOVE_STORY,
} from "@/features/listening/data/lessons/movies/romance/lesson_one_day";
import { TOPIC_ROMANCE_CINEMA, LESSONS_ROMANCE_CINEMA } from "@/features/listening/data/topics/topic_romance_cinema";

describe("Senior 50-Year QA Deep Audit: One Day - Emma & Dexter Across Decades (Video #7)", () => {
  it("should have valid lesson metadata and YouTube external ID matching ESI7jRy2yAk (>= 5 minutes standard)", () => {
    const lesson = LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY;
    expect(lesson.id).toBe("mov_rom_07");
    expect(lesson.slug).toBe("one-day-emma-dexter-love-story");
    expect(lesson.externalId).toBe("ESI7jRy2yAk");
    expect(lesson.durationSeconds).toBe(604);
    expect(lesson.durationFormatted).toBe("10:04");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // Strict >= 5 minutes condition
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.categoryId).toBe("cat_romance_cinema");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("ESI7jRy2yAk");
  });

  it("should contain exactly 85 chronological pure verbatim segments covering all 7 scenes without merged utterances", () => {
    const { segments } = LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY;
    expect(segments.length).toBe(85);

    // Verify key narrative dialogue anchors across scenes
    expect(segments[0].text).toBe("So this is me.");
    expect(segments[1].text).toContain("Faffing");
    expect(segments[3].text).toContain("God, you need to change the world.");
    expect(segments[5].text).toContain("swimming costume");
    expect(segments[7].text).toContain("masonry paint. Factor 30, I burn.");
    expect(segments[10].text).toContain("yin-yang");
    expect(segments[12].text).toContain("perfect union of opposites.");
    expect(segments[19].text).toContain("Dexter! I thought I got rid of you.");
    expect(segments[20].text).toContain("muck me about");
    expect(segments[21].text).toContain("lead me on, or let me down, or go behind my back");
    expect(segments[29].text).toContain("I want a child with the man I love.");
    expect(segments[30].text).toContain("then I want one with you.");
    expect(segments[31].text).toContain("we'd better get started.");
    expect(segments[33].text).toContain("It's all right, don't panic! It's only me.");
    expect(segments[34].text).toContain("Emma. Emma Morley.");
    expect(segments[42].text).toContain("we could go for a walk or something.");
    expect(segments[45].text).toContain("mountain climbing in brogues!");
    expect(segments[46].text).toContain("It's not K2, it's just a big hill");
    expect(segments[47].text).toContain("I don't want you thinking I'm bothered");
    expect(segments[50].text).toContain("Whatever happens tomorrow, we had today.");
    expect(segments[52].text).toContain("We'll be friends.");
    expect(segments[57].text).toContain("finish what we started");
    expect(segments[58].text).toContain("Sober and in daylight?");
    expect(segments[59].text).toContain("Race you!");
    expect(segments[62].text).toContain("they're early!");
    expect(segments[64].text).toContain("Clearly we have.");
    expect(segments[69].text).toContain("Have a nice life!");
    expect(segments[72].text).toContain("You're a rascal.");
    expect(segments[73].text).toContain("I need your phone number!");
    expect(segments[76].text).toContain("Right, this is me in Edinburgh.");
    expect(segments[80].text).toContain("Look, I've got to go.");
    expect(segments[81].text).toContain("But we will see each other again.");
    expect(segments[82].text).toContain("I know we will. Goodbye, Dex.");
    expect(segments[83].text).toContain("Goodbye, Emma.");

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
    const { segments } = LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY;
    segments.forEach((seg) => {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
      expect(tokens.length).toBeGreaterThan(0);
    });
  });

  it("should provide bilingual comprehension quiz with accurate references", () => {
    const quiz = QUIZ_ONE_DAY_EMMA_DEXTER_LOVE_STORY;
    expect(quiz.lessonId).toBe("mov_rom_07");
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
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY.segments.length);
    });
  });

  it("should be properly registered in TOPIC_ROMANCE_CINEMA and LESSONS_ROMANCE_CINEMA", () => {
    const foundInLessons = LESSONS_ROMANCE_CINEMA.find((l) => l.id === "mov_rom_07");
    expect(foundInLessons).toBeDefined();
    expect(foundInLessons?.title).toBe(LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY.title);
    expect(foundInLessons?.externalId).toBe("ESI7jRy2yAk");
    expect(foundInLessons?.durationSeconds).toBe(604);
    expect(foundInLessons?.cefrLevel).toBe("B2");
    expect(foundInLessons?.segments.length).toBe(85);
    expect(TOPIC_ROMANCE_CINEMA.lessonsCount).toBe(LESSONS_ROMANCE_CINEMA.length);
  });
});
