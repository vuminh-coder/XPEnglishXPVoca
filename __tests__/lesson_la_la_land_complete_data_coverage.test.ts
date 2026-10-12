import { describe, it, expect } from "vitest";
import {
  LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION,
  QUIZ_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION,
} from "@/features/listening/data/lessons/movies/romance/lesson_la_la_land";

describe("Senior Deep Audit: La La Land Video 3 - 100% Comprehensive Data & Subtitle Coverage", () => {
  const lesson = LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION;
  const quiz = QUIZ_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION;

  it("1. Metadata & Video Specifications must strictly match requirements", () => {
    expect(lesson.id).toBe("mov_rom_03");
    expect(lesson.externalId).toBe("gW0xteHHXrY");
    expect(lesson.durationSeconds).toBe(390);
    expect(lesson.durationFormatted).toBe("06:30");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // >= 5 minutes
    expect(lesson.viewCount).toBeGreaterThanOrEqual(100000); // >= 100,000 views
    expect(lesson.accent).toContain("American");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.sourceType).toBe("YOUTUBE");
  });

  it("2. Timeline Coverage must span comprehensively across all 87 pure master segments (100% of 390s timeline with Zero Merged Utterances)", () => {
    const segments = lesson.segments;
    expect(segments.length).toBe(87);

    // Starts at beginning of video (00:00)
    expect(segments[0].startTime).toBe(0.0);
    // Ends at the final resolution of the scene (06:30 - 390.0s)
    expect(segments[segments.length - 1].endTime).toBe(390.0);

    // Continuous monotonic progression & Zero Merged Utterances
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
      // Zero Merged Utterances: no dialogue dashes or multi-speaker merge
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
      expect(seg.keywords!.length, `Segment ${seg.orderIndex} should have keywords`).toBeGreaterThanOrEqual(1);

      // 5. AI Explanation
      expect(seg.explanationAi, `Segment ${seg.orderIndex} missing explanationAi`).toBeDefined();
      expect(seg.explanationAi!.trim().length, `Segment ${seg.orderIndex} explanationAi too short`).toBeGreaterThan(15);

      // 6. Token count
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("4. 100% of all pivotal dialogues, arguments, and dramatic scene beats must be captured verbatim", () => {
    const allText = lesson.segments.map((s) => s.text).join(" ");

    // --- ACT 1: SURPRISE DINNER & PLAY ANXIETY ---
    expect(allText).toContain("So where is the new home?");
    expect(allText).toContain("I'm so glad you're home.");
    expect(allText).toContain("How's the play going?");
    expect(allText).toContain("Because what if people show up?");
    expect(allText).toContain("fuck 'em!");
    expect(allText).toContain("I'm nervous to get up on a stage and perform for people.");
    expect(allText).toContain("I'm terrified.");
    expect(allText).toContain("They should be so lucky to see it!");

    // --- ACT 2: INVITATION TO BOISE & REHEARSAL COMMITMENT ---
    expect(allText).toContain("Boise");
    expect(allText).toContain("knock that off your bucket list.");
    expect(allText).toContain("Because I have to rehearse!");
    expect(allText).toContain("Can't you rehearse anywhere?");
    expect(allText).toContain("all my stuff is here and it's in two weeks");

    // --- ACT 3: THE TOUR REALITY & LONG HAUL DISCOVERY ---
    expect(allText).toContain("When are you finished with the whole tour?");
    expect(allText).toContain("We tour so we can make the records, so we can go back and sell the record.");
    expect(allText).toContain("the long haul");
    expect(allText).toContain("feasibly, I could be on tour with this for a couple of years, at least");
    expect(allText).toContain("Do you like the music you're playing?");
    expect(allText).toContain("if you're gonna give up your dream, I think it matters that you like what you're playing");
    expect(allText).toContain("Keith is the worst");

    // --- ACT 4: THE JAZZ CLUB CONFRONTATION & PASSION PHILOSOPHY ---
    expect(allText).toContain("To be in a band to have a steady job");
    expect(allText).toContain("Why aren't you starting your club?");
    expect(allText).toContain("Chicken on a Stick");
    expect(allText).toContain("no one likes jazz. Not even you!");
    expect(allText).toContain("I do like jazz now, because of you!");
    expect(allText).toContain("playing 'Jingle Bells' and scraping pennies");
    expect(allText).toContain("Shangri-La club");
    expect(allText).toContain("People will want to go to it because you're passionate about it, and people love what other people are passionate about! You remind people of what they forgot!");

    // --- ACT 5: GROW UP VS INTEGRITY ---
    expect(allText).toContain("it's time to grow up");
    expect(allText).toContain("before I signed on the goddamn dotted line!");
    expect(allText).toContain("This is the dream!");
    expect(allText).toContain("This is not your dream!");
    expect(allText).toContain("Guys like me work their whole lives to be in something that's successful");
    expect(allText).toContain("Why do you care so much about being liked?!");
    expect(allText).toContain("You're an actress, who are you to talk?!");

    // --- ACT 6 & 7: THE HURTFUL ACCUSATION & FIRE ALARM CLIMAX ---
    expect(allText).toContain("Maybe you just liked me when I was on my ass, because it made you feel better about yourself.");
    expect(allText).toContain("Are you kidding?");
    expect(allText).toContain("No.");
    expect(allText).toContain("smoke alarm blares deafeningly");
    expect(allText).toContain("thick black smoke pours from the kitchen oven");
    expect(allText).toContain("The romantic surprise dinner is completely ruined.");
    expect(allText).toContain("Mia silently gathers her coat and purse with tears streaming down her face.");
    expect(allText).toContain("Wait!");
    expect(allText).toContain("Mia rushes out into the pouring rain. The front door slams shut.");
    expect(allText).toContain("burnt remnants of their celebration");
  });

  it("5. Bilingual Quiz must comprehensively cover the full confrontation storyline with 8 questions and valid references", () => {
    expect(quiz.lessonId).toBe("mov_rom_03");
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

    // Specific reference index assertions
    expect(quiz.questions[0].referenceSegmentIndex).toBe(10);
    expect(quiz.questions[1].referenceSegmentIndex).toBe(34);
    expect(quiz.questions[2].referenceSegmentIndex).toBe(40);
    expect(quiz.questions[3].referenceSegmentIndex).toBe(52);
    expect(quiz.questions[4].referenceSegmentIndex).toBe(66);
    expect(quiz.questions[5].referenceSegmentIndex).toBe(67);
    expect(quiz.questions[6].referenceSegmentIndex).toBe(78);
    expect(quiz.questions[7].referenceSegmentIndex).toBe(81);
  });
});
