import { describe, it, expect } from "vitest";
import {
  LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN,
  QUIZ_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN,
} from "@/features/listening/data/lessons/movies/romance/lesson_pride_and_prejudice";

describe("Senior Deep Audit: Pride & Prejudice Video 5 - 100% Comprehensive Pure Data & Subtitle Coverage", () => {
  const lesson = LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN;
  const quiz = QUIZ_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN;

  it("1. Metadata & Video Specifications must strictly match requirements", () => {
    expect(lesson.id).toBe("mov_rom_05");
    expect(lesson.externalId).toBe("baGBRtR53TA");
    expect(lesson.durationSeconds).toBe(604);
    expect(lesson.durationFormatted).toBe("10:04");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // >= 5 minutes standard
    expect(lesson.viewCount).toBeGreaterThanOrEqual(100000); // >= 100,000 views
    expect(lesson.accent).toContain("British");
    expect(lesson.cefrLevel).toBe("C1");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("baGBRtR53TA");
  });

  it("2. Timeline Coverage must span comprehensively across all 81 pure master segments (100% of 604s timeline)", () => {
    const segments = lesson.segments;
    expect(segments.length).toBe(81);

    // Starts at beginning of video dialogue (1.7s)
    expect(segments[0].startTime).toBeLessThanOrEqual(2.0);
    // Ends at the final resolution of the scene (604.0s)
    expect(segments[segments.length - 1].endTime).toBe(604.0);

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

  it("4. 100% of all pivotal dialogues, arguments, and dramatic scene beats must be captured verbatim without merged utterances", () => {
    const allText = lesson.segments.map((s) => s.text).join(" ");

    // --- SCENE 1: NETHERFIELD MUD WALK & CAROLINE'S CRITIQUE ---
    expect(allText).toContain("He's about the best butcher in the county");
    expect(allText).toContain("redecorating her boudoir in the French style");
    expect(allText).toContain("Miss Elizabeth Bennet");
    expect(allText).toContain("did you walk here?");
    expect(allText).toContain("How is my sister?");
    expect(allText).toContain("She's upstairs.");
    expect(allText).toContain("Six inches deep in mud! She looked positively medieval.");

    // --- SCENE 2: THE ACCOMPLISHED WOMAN DEBATE ---
    expect(allText).toContain("truly accomplished");
    expect(allText).toContain("comprehend a great deal in the idea");
    expect(allText).toContain("modern languages to deserve the word");
    expect(allText).toContain("something in her air and manner of walking");
    expect(allText).toContain("extensive reading");

    // --- SCENE 3 & 4: NETHERFIELD BALL & ROSINGS PARK ---
    expect(allText).toContain("May I have the next dance, Miss Elizabeth?");
    expect(allText).toContain("play on the pianoforte in the housekeeper's room");
    expect(allText).toContain("nobody's way in that part of the house");

    // --- SCENE 5: PIANOFORTE BANTER & DARCY'S AWKWARDNESS ---
    expect(allText).toContain("You mean to frighten me, Mr. Darcy");
    expect(allText).toContain("cannot alarm you, even should I wish it");
    expect(allText).toContain("What was my friend like in Hertfordshire?");
    expect(allText).toContain("Prepare yourself for something very dreadful");
    expect(allText).toContain("nobody can be introduced in a ballroom!");
    expect(allText).toContain("talent of conversing easily with people I have never met before");
    expect(allText).toContain("Perhaps you should take your aunt's advice and practice.");

    // --- SCENE 6: HUNSFORD PARSONAGE AWKWARD VISIT ---
    expect(allText).toContain("Please, do be seated.");
    expect(allText).toContain("charming house");
    expect(allText).toContain("Shall I call for some tea?");
    expect(allText).toContain("What on earth have you done to poor Mr. Darcy?");
    expect(allText).toContain("I have no idea.");

    // --- SCENE 7: FIRST RAIN PROPOSAL AT APOLLO TEMPLE ---
    expect(allText).toContain("I have struggled in vain, and I can bear it no longer.");
    expect(allText).toContain("These past months have been a torment.");
    expect(allText).toContain("single object of seeing you");
    expect(allText).toContain("inferiority of your birth");
    expect(allText).toContain("I don't understand.");
    expect(allText).toContain("I love you. Most ardently.");

    // --- SCENE 8 & 9: PEMBERLEY REUNION & GEORGIANA ---
    expect(allText).toContain("I thought you were in London!");
    expect(allText).toContain("business with my steward");
    expect(allText).toContain("Tomorrow we go to Matlock");
    expect(allText).toContain("staying at Lambton");
    expect(allText).toContain("Yes, at the Rose and Crown.");
    expect(allText).toContain("I'm very fond of walking.");
    expect(allText).toContain("Yes. Yes, I know. Good day, Miss Elizabeth.");
    expect(allText).toContain("friends already");
    expect(allText).toContain("perjured himself most profoundly");

    // --- SCENE 10 & 11: MISTY DAWN PROPOSAL & MR. BENNET'S STUDY ---
    expect(allText).toContain("I couldn't sleep.");
    expect(allText).toContain("Nor I. My aunt...");
    expect(allText).toContain("it was all for you");
    expect(allText).toContain("too generous to trifle with me");
    expect(allText).toContain("My affections and wishes have not changed.");
    expect(allText).toContain("bewitched me, body and soul, and I love, I love, I love you.");
    expect(allText).toContain("never wish to be parted from you from this day on");
    expect(allText).toContain("Well then... Your hands are cold.");
    expect(allText).toContain("Shut the door, please, Elizabeth.");
    expect(allText).toContain("anyone less worthy");
  });

  it("5. Bilingual Reading Comprehension Quiz must have 8 targeted questions mapped to key segments", () => {
    expect(quiz.lessonId).toBe("mov_rom_05");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.xpReward).toBe(100);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`mov_rom_05_q${idx + 1}`);
      expect(q.questionEn).toBeDefined();
      expect(q.questionEn!.length).toBeGreaterThan(10);
      expect(q.questionVi).toBeDefined();
      expect(q.questionVi!.length).toBeGreaterThan(10);
      expect(q.optionsEn).toBeDefined();
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi).toBeDefined();
      expect(q.optionsVi!.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThanOrEqual(3);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationEn!.length).toBeGreaterThan(15);
      expect(q.explanationVi).toBeDefined();
      expect(q.explanationVi!.length).toBeGreaterThan(15);
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptEn!.length).toBeGreaterThan(5);
      expect(q.targetedConceptVi).toBeDefined();
      expect(q.targetedConceptVi!.length).toBeGreaterThan(5);
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(lesson.segments.length);
    });
  });
});
