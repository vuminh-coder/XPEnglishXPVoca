import { describe, it, expect } from "vitest";
import {
  LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION,
  QUIZ_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION,
} from "@/features/listening/data/lessons/movies/romance/lesson_the_notebook";

describe("Senior Deep Audit: The Notebook Video 4 - 100% Comprehensive Data & Subtitle Coverage", () => {
  const lesson = LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION;
  const quiz = QUIZ_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION;

  it("1. Metadata & Video Specifications must strictly match requirements", () => {
    expect(lesson.id).toBe("mov_rom_04");
    expect(lesson.externalId).toBe("Y5hVdlRFAUo");
    expect(lesson.durationSeconds).toBe(804);
    expect(lesson.durationFormatted).toBe("13:24");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // >= 5 minutes
    expect(lesson.viewCount).toBeGreaterThanOrEqual(100000); // >= 100,000 views
    expect(lesson.accent).toContain("American");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.sourceType).toBe("YOUTUBE");
  });

  it("2. Timeline Coverage must span comprehensively across all 106 pure master segments (100% of 804s timeline with Zero Merged Utterances)", () => {
    const segments = lesson.segments;
    expect(segments.length).toBe(106);

    // Starts at beginning of video (00:00)
    expect(segments[0].startTime).toBe(0.0);
    // Ends at the final resolution of the scene (13:24 - 804.0s)
    expect(segments[segments.length - 1].endTime).toBe(804.0);

    // Continuous monotonic progression across the entire timeline & Zero Merged Utterances
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
      expect(seg.text).not.toContain(" — ");
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

  it("4. 100% of all pivotal dialogues, arguments, and dramatic scene beats must be captured verbatim", () => {
    const allText = lesson.segments.map((s) => s.text).join(" ");

    // --- SCENE 1: THE FERRIS WHEEL PROPOSAL & UNDERWEAR PRANK ---
    expect(allText).toContain("Have you lost your mind?");
    expect(allText).toContain("I'm Noah Calhoun.");
    expect(allText).toContain("will you or will you not go out with me?");
    expect(allText).toContain("Well, don't do me any favors.");
    expect(allText).toContain("I want to go out with you!");
    expect(allText).toContain("You're not so cocky now, are you?");

    // --- SCENE 2: STREET WALK & 'I COULD BE THAT' CONVERSATION ---
    expect(allText).toContain("Mr. Underwear, was it?");
    expect(allText).toContain("I was being drawn to you.");
    expect(allText).toContain("Pensive, superstitious, brave, and I could be light on the feet.");
    expect(allText).toContain("I could be whatever you want.");
    expect(allText).toContain("You're dumb.");
    expect(allText).toContain("I could be that.");

    // --- SCENE 3: WINDSOR HOUSE REUNION ---
    expect(allText).toContain("I saw your picture in the paper");
    expect(allText).toContain("You look different, too. But in a good way.");
    expect(allText).toContain("And you really did it. The house. It's beautiful what you did.");
    expect(allText).toContain("Well, I promised you I would.");

    // --- SCENE 4: SWAN LAKE & 365 LETTERS RAIN KISS ---
    expect(allText).toContain("Why didn't you write me? It wasn't over for me! I waited for you for seven years!");
    expect(allText).toContain("I wrote you 365 letters. I wrote you every day for a year!");
    expect(allText).toContain("You wrote me?!");
    expect(allText).toContain("Yes! It wasn't over! It still isn't over!");

    // --- SCENE 5: MORNING ARGUMENT & BROKEN PROMISES ---
    expect(allText).toContain("I have a fiancé waiting for me at a hotel");
    expect(allText).toContain("So you make love to me and then you go back to your husband?");
    expect(allText).toContain("He gave me a ring and I gave him my word!");
    expect(allText).toContain("And your word is shot to hell now");
    expect(allText).toContain("This is not about keeping your promise. And it's not about following your heart. It's about security!");
    expect(allText).toContain("Did you pay attention to anything that's been happening?!");
    expect(allText).toContain("You're bored! You're bored and you know it!");

    // --- SCENE 6: 'WE FIGHT' & 'WHAT DO YOU WANT?!' CLIMAX ---
    expect(allText).toContain("Would you just stay with me?!");
    expect(allText).toContain("Well, that's what we do! We fight!");
    expect(allText).toContain("You have like a two-second rebound rate");
    expect(allText).toContain("It's gonna be really hard, and we're gonna have to work at this every day. But I want to do that because I want you!");
    expect(allText).toContain("Just picture your life thirty years from now, forty years from now. What's it look like?");
    expect(allText).toContain("Would you stop thinking about what everyone wants?!");
    expect(allText).toContain("What do you want?! What do you want?!");

    // --- SCENE 7: NOAH'S LETTER & ALZHEIMER'S FLEETING MEMORY ---
    expect(allText).toContain("My dearest Allie, I couldn't sleep last night because I know that it's over between us.");
    expect(allText).toContain("I'm not bitter anymore, because I know that what we had was real.");
    expect(allText).toContain("learning from each other and growing in love.");
    expect(allText).toContain("I remember now. It was us... It was us, darling!");
    expect(allText).toContain("Somebody help me! Who are you?!");
  });

  it("5. Bilingual Quiz must comprehensively cover the full storyline with 8 questions and valid references", () => {
    expect(quiz.lessonId).toBe("mov_rom_04");
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

      // Reference segment index should be within valid bounds (1-indexed)
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(lesson.segments.length);
    }

    // Specific reference index assertions (1-indexed)
    expect(quiz.questions[0].referenceSegmentIndex).toBe(16);
    expect(quiz.questions[1].referenceSegmentIndex).toBe(51);
    expect(quiz.questions[2].referenceSegmentIndex).toBe(61);
    expect(quiz.questions[3].referenceSegmentIndex).toBe(64);
    expect(quiz.questions[4].referenceSegmentIndex).toBe(75);
    expect(quiz.questions[5].referenceSegmentIndex).toBe(89);
    expect(quiz.questions[6].referenceSegmentIndex).toBe(96);
    expect(quiz.questions[7].referenceSegmentIndex).toBe(102);
  });
});
