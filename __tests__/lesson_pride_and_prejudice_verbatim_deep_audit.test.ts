import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN,
  QUIZ_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN,
} from "@/features/listening/data/lessons/movies/romance/lesson_pride_and_prejudice";
import { TOPIC_ROMANCE_CINEMA, LESSONS_ROMANCE_CINEMA } from "@/features/listening/data/topics/topic_romance_cinema";

describe("Senior 50-Year QA Deep Audit: Pride & Prejudice - Mr. Darcy's Longing & Devotion (Video #5)", () => {
  it("should have valid lesson metadata and YouTube external ID matching baGBRtR53TA (>= 5 minutes standard)", () => {
    const lesson = LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN;
    expect(lesson.id).toBe("mov_rom_05");
    expect(lesson.slug).toBe("pride-and-prejudice-rain-proposal-dawn");
    expect(lesson.externalId).toBe("baGBRtR53TA");
    expect(lesson.durationSeconds).toBe(604);
    expect(lesson.durationFormatted).toBe("10:04");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // Strict >= 5 minutes condition
    expect(lesson.cefrLevel).toBe("C1");
    expect(lesson.categoryId).toBe("cat_romance_cinema");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("baGBRtR53TA");
  });

  it("should contain exactly 81 chronological pure verbatim segments covering all 11 scenes from Netherfield mud walk to sunrise confession", () => {
    const { segments } = LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN;
    expect(segments.length).toBe(81);

    // Verify key narrative dialogue anchors across scenes
    expect(segments[0].text).toContain("He's about the best butcher in the county");
    expect(segments[1].text).toContain("Lady Bathurst is redecorating her boudoir");
    expect(segments[3].text).toContain("did you walk here?");
    expect(segments[8].text).toContain("Six inches deep in mud! She looked positively medieval.");
    expect(segments[9].text).toContain("truly accomplished");
    expect(segments[14].text).toContain("something in her air and manner of walking");
    expect(segments[16].text).toContain("May I have the next dance, Miss Elizabeth?");
    expect(segments[24].text).toContain("You mean to frighten me, Mr. Darcy");
    expect(segments[32].text).toContain("talent of conversing easily with people I have never met before");
    expect(segments[33].text).toContain("Perhaps you should take your aunt's advice and practice.");
    expect(segments[41].text).toContain("I have struggled in vain");
    expect(segments[43].text).toContain("inferiority of your birth");
    expect(segments[45].text).toContain("I love you. Most ardently.");
    expect(segments[46].text).toContain("I thought you were in London!");
    expect(segments[56].text).toContain("Yes. Yes, I know. Good day, Miss Elizabeth.");
    expect(segments[64].text).toContain("perjured himself most profoundly");
    expect(segments[72].text).toContain("surely you must know, it was all for you");
    expect(segments[75].text).toContain("My affections and wishes have not changed.");
    expect(segments[76].text).toContain("bewitched me, body and soul");
    expect(segments[77].text).toContain("I never wish to be parted from you");
    expect(segments[78].text).toContain("Your hands are cold.");
    expect(segments[79].text).toContain("Shut the door, please, Elizabeth.");
    expect(segments[80].text).toContain("anyone less worthy");

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
    const { segments } = LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN;
    segments.forEach((seg) => {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
      expect(tokens.length).toBeGreaterThan(0);
    });
  });

  it("should provide bilingual comprehension quiz with accurate references", () => {
    const quiz = QUIZ_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN;
    expect(quiz.lessonId).toBe("mov_rom_05");
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN.segments.length);
    });
  });

  it("should be properly registered in TOPIC_ROMANCE_CINEMA and LESSONS_ROMANCE_CINEMA", () => {
    const foundInLessons = LESSONS_ROMANCE_CINEMA.find((l) => l.id === "mov_rom_05");
    expect(foundInLessons).toBeDefined();
    expect(foundInLessons?.title).toBe(LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN.title);
    expect(foundInLessons?.externalId).toBe("baGBRtR53TA");
    expect(foundInLessons?.durationSeconds).toBe(604);
    expect(foundInLessons?.cefrLevel).toBe("C1");
    expect(foundInLessons?.segments.length).toBe(81);
    expect(TOPIC_ROMANCE_CINEMA.lessonsCount).toBe(LESSONS_ROMANCE_CINEMA.length);
  });
});
