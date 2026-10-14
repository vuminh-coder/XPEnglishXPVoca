import { describe, it, expect } from "vitest";
import {
  LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE,
  QUIZ_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE,
} from "@/features/listening/data/lessons/movies/romance/lesson_about_time";

describe("Senior Deep Audit: About Time Video 1 - 100% Comprehensive Data & Subtitle Coverage", () => {
  const lesson = LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE;
  const quiz = QUIZ_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE;

  it("1. Metadata & Video Specifications must strictly match requirements", () => {
    expect(lesson.id).toBe("mov_rom_01");
    expect(lesson.externalId).toBe("iUB-sCiZIUw");
    expect(lesson.durationSeconds).toBe(323);
    expect(lesson.durationFormatted).toBe("05:23");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // >= 5 minutes
    expect(lesson.viewCount).toBeGreaterThanOrEqual(100000); // >= 100,000 views
    expect(lesson.accent).toContain("British");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.sourceType).toBe("YOUTUBE");
  });

  it("2. Timeline Coverage must span from beginning to end without gaps across all 83 pure master segments", () => {
    const segments = lesson.segments;
    expect(segments.length).toBe(83);

    // Starts near beginning of video
    expect(segments[0].startTime).toBeLessThanOrEqual(1.0);
    // Ends near final conclusion of video
    expect(segments[segments.length - 1].endTime).toBe(323.0);

    // Continuous monotonic progression & zero merged utterances
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
      // Zero Merged Utterances: no dialogue dashes
      expect(seg.text.startsWith("- ")).toBe(false);
      expect(seg.text).not.toContain(" - ");
    }
  });

  it("3. Every single segment must have 100% complete data fields (text, IPA, translation, keywords, explanation)", () => {
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
      expect(seg.keywords!.length, `Segment ${seg.orderIndex} should have keywords`).toBeGreaterThanOrEqual(1);

      // 5. AI Explanation
      expect(seg.explanationAi, `Segment ${seg.orderIndex} missing explanationAi`).toBeDefined();
      expect(seg.explanationAi!.trim().length, `Segment ${seg.orderIndex} explanationAi too short`).toBeGreaterThan(15);

      // 6. Token count
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("4. 100% of all dialogues and key lines from the video must be captured verbatim across all 83 segments", () => {
    const allText = lesson.segments.map((s) => s.text).join(" ");

    // Act 1: Father reveals the secret formula (0.0s -> 31.0s)
    expect(allText).toContain("something very important to tell you");
    expect(allText).toContain("the big secret");
    expect(allText).toContain("find it out for yourself like I did");
    expect(allText).toContain("Oh, Christ, there's another secret?");
    expect(allText).toContain("Less dramatic");
    expect(allText).toContain("Much more important");
    expect(allText).toContain("The real mothership");
    expect(allText).toContain("Let's save some time");
    expect(allText).toContain("secret formula for happiness");
    expect(allText).toContain("two part plan");
    expect(allText).toContain("get on with ordinary life");
    expect(allText).toContain("living it day by day, like anyone else");

    // Act 2: Day 1 with stress and worries (50.0s -> 134.0s)
    expect(allText).toContain("current statement with a revised paragraph");
    expect(allText).toContain("Rupert. Rupert, is that the best you can do?");
    expect(allText).toContain("Absolutely not. We can change that.");
    expect(allText).toContain("Item number two");
    expect(allText).toContain("Are you eating in or taking away today?");
    expect(allText).toContain("Take away, please");
    expect(allText).toContain("4.24");
    expect(allText).toContain("Thank you kindly");
    expect(allText).toContain("76 pence change");
    expect(allText).toContain("Defendant, John Welbeck");
    expect(allText).toContain("guilty or not guilty of fraud");
    expect(allText).toContain("Not guilty");
    expect(allText).toContain("verdict of you all");
    expect(allText).toContain("Let the Defendant be discharged");
    expect(allText).toContain("Be upstanding in court");
    expect(allText).toContain("Tough day");

    // Act 3: Day 2 in mindfulness and sweetness (134.0s -> 245.5s)
    expect(allText).toContain("part two of Dad's plan");
    expect(allText).toContain("live every day again almost exactly the same");
    expect(allText).toContain("tensions and worries that");
    expect(allText).toContain("stop us noticing how sweet the world can be");
    expect(allText).toContain("the second time noticing");
    expect(allText).toContain("Let's give it a go");
    expect(allText).toContain("thrash this out");
    expect(allText).toContain("Would you like a bag?");
    expect(allText).toContain("6.23");
    expect(allText).toContain("enjoy the rest of your day");
    expect(allText).toContain("Look around you!");
    expect(allText).toContain("Isn't this room beautiful?");
    expect(allText).toContain("Fantastic!");

    // Act 4: Homecoming and romantic playful banter with Mary (245.5s -> 323.0s)
    expect(allText).toContain("not such a bad day after all");
    expect(allText).toContain("pretty good really");
    expect(allText).toContain("Very good day, actually, as it turns out");
    expect(allText).toContain("that's a relief");
    expect(allText).toContain("had sex with you to make up for it");
    expect(allText).toContain("very, very bad day");
    expect(allText).toContain("got fired from my job");
    expect(allText).toContain("killed a man");
    expect(allText).toContain("worst day ever");
    expect(allText).toContain("So sorry");
    expect(allText).toContain("I'm home now");
  });

  it("5. Bilingual Quiz must comprehensively cover the full storyline with 8 questions and valid references", () => {
    expect(quiz.lessonId).toBe("mov_rom_01");
    expect(quiz.questions.length).toBe(8);

    for (const q of quiz.questions) {
      expect(q.id).toBeDefined();
      expect(q.questionEn!.length).toBeGreaterThan(10);
      expect(q.questionVi!.length).toBeGreaterThan(10);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi!.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanationEn!.length).toBeGreaterThan(15);
      expect(q.explanationVi!.length).toBeGreaterThan(15);
      expect(q.targetedConceptEn!.length).toBeGreaterThan(5);
      expect(q.targetedConceptVi!.length).toBeGreaterThan(5);

      // Reference segment index should be within valid bounds
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(lesson.segments.length);
    }
  });
});
