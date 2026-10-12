import { describe, it, expect } from "vitest";
import {
  LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK,
  QUIZ_BEFORE_SUNRISE_VIENNA_NIGHT_WALK,
} from "@/features/listening/data/lessons/movies/romance/lesson_before_sunrise";

describe("Senior Deep Audit: Before Sunrise Video 2 - 100% Comprehensive Data & Subtitle Coverage", () => {
  const lesson = LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK;
  const quiz = QUIZ_BEFORE_SUNRISE_VIENNA_NIGHT_WALK;

  it("1. Metadata & Video Specifications must strictly match requirements", () => {
    expect(lesson.id).toBe("mov_rom_02");
    expect(lesson.externalId).toBe("QV1tiEDvkkw");
    expect(lesson.durationSeconds).toBe(819);
    expect(lesson.durationFormatted).toBe("13:39");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // >= 5 minutes
    expect(lesson.viewCount).toBeGreaterThanOrEqual(100000); // >= 100,000 views
    expect(lesson.accent).toContain("American");
    expect(lesson.cefrLevel).toBe("C1");
    expect(lesson.sourceType).toBe("YOUTUBE");
  });

  it("2. Timeline Coverage must span comprehensively across all 127 pure master segments", () => {
    const segments = lesson.segments;
    expect(segments.length).toBe(127);

    // Starts near beginning of video dialogues (00:27)
    expect(segments[0].startTime).toBe(27.0);
    // Ends at the final resolution of the video (13:39 - 819.0s)
    expect(segments[segments.length - 1].endTime).toBe(819.0);

    // Continuous monotonic progression & zero merged utterances
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
      // Zero Merged Utterances: no dialogue dashes
      expect(seg.text.startsWith("- ")).toBe(false);
      expect(seg.text).not.toContain(" - ");
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
      expect(seg.keywords!.length, `Segment ${seg.orderIndex} should have keywords`).toBeGreaterThanOrEqual(1);

      // 5. AI Explanation
      expect(seg.explanationAi, `Segment ${seg.orderIndex} missing explanationAi`).toBeDefined();
      expect(seg.explanationAi!.trim().length, `Segment ${seg.orderIndex} explanationAi too short`).toBeGreaterThan(15);

      // 6. Token count
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("4. 100% of all pivotal dialogues, monologues, interviews, and the Danube poem across the trilogy must be captured verbatim", () => {
    const allText = lesson.segments.map((s) => s.text).join(" ");

    // --- PART 1: BEFORE SUNRISE (VIENNA) ---
    expect(allText).toContain("All right, I have an admittedly insane idea");
    expect(allText).toContain("you should get off the train with me here in Vienna, and come check out the town");
    expect(allText).toContain("if there's any kind of God, it wouldn't be in any of us");
    expect(allText).toContain("space in between");
    expect(allText).toContain("attempt of understanding someone, sharing something");
    expect(allText).toContain("The first film was really just about trying to capture two people connecting");
    expect(allText).toContain("intangible thing between these two people");
    expect(allText).toContain("minimalist design");
    expect(allText).toContain("crazy about you");
    expect(allText).toContain("haven't been bored for one second");
    expect(allText).toContain("interesting and whole as you are here in this room");
    expect(allText).toContain("adventurer, a seeker");
    expect(allText).toContain("resign yourself to the awkwardness of life");
    expect(allText).toContain("Only if you find peace within yourself, you'll find true connection with others");
    expect(allText).toContain("tonight's our only night");
    expect(allText).toContain("make tonight great");

    // --- PART 2: BEFORE SUNSET (PARIS) & FILMMAKING PHILOSOPHY ---
    expect(allText).toContain("cup of coffee");
    expect(allText).toContain("nine years ago that we were walking around Vienna");
    expect(allText).toContain("summer '94");
    expect(allText).toContain("see you naked");
    expect(allText).toContain("Cinema's about: Don't talk about it, show it!");
    expect(allText).toContain("people talking was so evocative");
    expect(allText).toContain("essence of them");
    expect(allText).toContain("dissolve into molecules");
    expect(allText).toContain("Reality and love are almost contradictory");
    expect(allText).toContain("every single one of my exes are now married");
    expect(allText).toContain("teaching them what love is");
    expect(allText).toContain("Why didn't they ask me to marry them?!");
    expect(allText).toContain("the right man, the love of your life");
    expect(allText).toContain("see if you stay together or if you dissolve into molecules");
    expect(allText).toContain("emotional arc");
    expect(allText).toContain("change our memory of that December 16th");
    expect(allText).toContain("memory's never finished, as long as you're alive");
    expect(allText).toContain("miss that plane");
    expect(allText).toContain("I know");
    expect(allText).toContain("creating these people who would connect");
    expect(allText).toContain("find the vision with them");
    expect(allText).toContain("checking you out from across the café");
    expect(allText).toContain("I don't talk to strangers");

    // --- PART 3: THE COMPLETE DANUBE RIVER 'MILKSHAKE' POEM ---
    expect(allText).toContain("give me a word");
    expect(allText).toContain("write a poem with the word inside");
    expect(allText).toContain("Milkshake");
    expect(allText).toContain("Daydream delusion, limousine eyelash, oh baby with your pretty face");
    expect(allText).toContain("Drop a tear in my wineglass");
    expect(allText).toContain("sweet cakes and milkshakes");
    expect(allText).toContain("delusion angel");
    expect(allText).toContain("branches in the river flowing downstream caught in the current");
    expect(allText).toContain("I'll carry you, you'll carry me, that's how it could be");
    expect(allText).toContain("Don't you know me? Don't you know me by now?");

    // --- PART 4: BEFORE MIDNIGHT (GREECE) & MARRIAGE REALITY ---
    expect(allText).toContain("mannerisms");
    expect(allText).toContain("pseudo-intellectual story");
    expect(allText).toContain("move to Chicago");
    expect(allText).toContain("sick of myself");
    expect(allText).toContain("jump ahead ten, twenty years");
    expect(allText).toContain("gigantic favor to both you and your future husband");
    expect(allText).toContain("I don't think I love you anymore");
    expect(allText).toContain("traveled back from the future");
    expect(allText).toContain("82-year-old self");
    expect(allText).toContain("Dear Céline, I'm sending you this young man");
    expect(allText).toContain("struggled his whole life connecting and being present");
    expect(allText).toContain("fairy tale");
    expect(allText).toContain("put up with plenty of your shit");
    expect(allText).toContain("if you want true love, then this is it. This is real life");
    expect(allText).toContain("It's not perfect, but it's real!");

    // --- PART 5: THE CONCLUSION & TRILOGY MEANING ---
    expect(allText).toContain("really a mirror, it's where you're at in your own life");
    expect(allText).toContain("dream come true to make something that is intensely personal");
    expect(allText).toContain("most rewarding thing for you to do these films, being with each other");
  });

  it("5. Bilingual Quiz must comprehensively cover the full storyline with 8 questions and valid references", () => {
    expect(quiz.lessonId).toBe("mov_rom_02");
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
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(lesson.segments.length);
    }
  });
});
