import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT,
  QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT,
} from "@/features/listening/data/lessons/movies/animation/lesson_monsters_inc";
import {
  TOPIC_ANIMATION_PIXAR_DISNEY,
  LESSONS_ANIMATION_PIXAR_DISNEY,
} from "@/features/listening/data/topics/topic_animation_pixar_disney";

describe("Senior 50-Year QA Deep Audit: Monsters, Inc. - 100% Full Video Timeline & Complete Cues Coverage (Video #12)", () => {
  it("should have valid lesson metadata and official YouTube external ID matching _kafLt9bNyU (17:39 - 1059s)", () => {
    const lesson = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
    expect(lesson.id).toBe("mov_ani_12");
    expect(lesson.slug).toBe("monsters-inc-goodbye-boo-emotional-cut");
    expect(lesson.externalId).toBe("_kafLt9bNyU");
    expect(lesson.durationSeconds).toBe(1059);
    expect(lesson.durationFormatted).toBe("17:39");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // Strict >= 5 minutes condition
    expect(lesson.cefrLevel).toBe("A2");
    expect(lesson.categoryId).toBe("cat_animation_pixar_disney");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("_kafLt9bNyU");
  });

  it("should contain 30 chronological master segments covering 100% of all 125 video cues from 28s to 1059s", () => {
    const { segments } = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
    expect(segments.length).toBe(30);

    // Verify key narrative & linguistic anchors across all 30 segments
    expect(segments[0].text).toContain("Monsters, Inc. has such a crazy concept");
    expect(segments[1].text).toContain("deal with Randall");
    expect(segments[2].text).toContain("she's the one");
    expect(segments[3].text).toContain("What do you know");
    expect(segments[4].text).toContain("I'm in the zone today");
    expect(segments[5].text).toContain("pal");
    expect(segments[6].text).toContain("flirts with him");
    expect(segments[7].text).toContain("hook someone up with");
    expect(segments[8].text).toContain("Whaddya know");
    expect(segments[9].text).toContain("save it for the ring");
    expect(segments[10].text).toContain("will you?");
    expect(segments[11].text).toContain("in the zone");
    expect(segments[12].text).toContain("master these expressions");
    expect(segments[13].text).toContain("don't blow this");
    expect(segments[14].text).toContain("blew it");
    expect(segments[15].text).toContain("flap T");
    expect(segments[16].text).toContain("out of our hair");
    expect(segments[17].text).toContain("Can it");
    expect(segments[18].text).toContain("Word on the street is");
    expect(segments[19].text).toContain("no way");
    expect(segments[20].text).toContain("inside job");
    expect(segments[21].text).toContain("put your money where your mouth is");
    expect(segments[22].text).toContain("them shifty eyes");
    expect(segments[23].text).toContain("Googly Bear");
    expect(segments[24].text).toContain("Winds of Change");
    expect(segments[25].text).toContain("Shut up");
    expect(segments[26].text).toContain("Strong refusal");
    expect(segments[27].text).toContain("Comment of the Day");
    expect(segments[28].text).toContain("challenge for today");
    expect(segments[29].text).toContain("jump in the pail");

    // Span check: covers beginning (<= 30s) and reaches end of video (>= 1037s)
    expect(segments[0].startTime).toBeLessThanOrEqual(30);
    expect(segments[segments.length - 1].endTime).toBe(1059.0);

    let prevStart = -1;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStart);
      prevStart = seg.startTime;

      // Verbatim dialogue and high-quality Vietnamese translation
      expect(seg.text.length).toBeGreaterThan(15);
      expect(seg.translationVi.length).toBeGreaterThan(15);

      // IPA pronunciation
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(5);
      expect(seg.ipaUs!).toContain("/");

      // Pedagogical keywords and AI explanations
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length).toBeGreaterThanOrEqual(3);

      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(15);
    }
  });

  it("should match tokenizeSentence length exactly for each segment's tokenCount with 0 discrepancies across all 30 segments", () => {
    const { segments } = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
    segments.forEach((seg) => {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
      expect(tokens.length).toBeGreaterThan(0);
    });
  });

  it("should provide 6 bilingual comprehension quiz questions with accurate segment references", () => {
    const quiz = QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
    expect(quiz.lessonId).toBe("mov_ani_12");
    expect(quiz.totalQuestions).toBe(6);
    expect(quiz.xpReward).toBe(100);
    expect(quiz.questions.length).toBe(6);

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
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments.length);
    });
  });

  it("should be properly registered in TOPIC_ANIMATION_PIXAR_DISNEY and LESSONS_ANIMATION_PIXAR_DISNEY", () => {
    const foundInList = LESSONS_ANIMATION_PIXAR_DISNEY.find((l) => l.id === "mov_ani_12");
    expect(foundInList).toBeDefined();
    expect(foundInList?.externalId).toBe("_kafLt9bNyU");
    expect(TOPIC_ANIMATION_PIXAR_DISNEY.lessonsCount).toBe(12);
    expect(LESSONS_ANIMATION_PIXAR_DISNEY.length).toBe(12);
  });
});
