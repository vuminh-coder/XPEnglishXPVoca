import { describe, it, expect } from "vitest";
import {
  LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS,
  QUIZ_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS,
} from "@/features/listening/data/lessons/movies/romance/lesson_me_before_you";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

describe("Senior Deep Audit: Me Before You Video 6 - 100% Comprehensive Pure Data & Subtitle Coverage", () => {
  const lesson = LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS;
  const quiz = QUIZ_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS;

  it("1. Metadata & Video Specifications must strictly match requirements", () => {
    expect(lesson.id).toBe("mov_rom_06");
    expect(lesson.externalId).toBe("sLHx2vVa1HA");
    expect(lesson.durationSeconds).toBe(541);
    expect(lesson.durationFormatted).toBe("09:01");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // >= 5 minutes standard
    expect(lesson.viewCount).toBeGreaterThanOrEqual(100000); // >= 100,000 views
    expect(lesson.accent).toBe("British");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("sLHx2vVa1HA");
  });

  it("2. Timeline Coverage must span comprehensively across all 128 pure master segments (100% of 541s timeline)", () => {
    const segments = lesson.segments;
    expect(segments.length).toBe(128);

    // Starts at beginning of video dialogue (1.5s)
    expect(segments[0].startTime).toBeLessThanOrEqual(2.0);
    // Ends at the final outro timestamp (541.0s)
    expect(segments[segments.length - 1].endTime).toBe(541.0);

    // Continuous monotonic progression across the entire timeline
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
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

  it("4. 100% of all pivotal scenes and emotional dialogue beats must be captured verbatim without merged utterances", () => {
    const allText = lesson.segments.map((s) => s.text).join(" ");

    // --- SCENE 1: PATRICK JOGGING & BUTTERED BUN CLOSURE ---
    expect(allText).toContain("Come on, only got two miles left!");
    expect(allText).toContain("Estate agent maybe? Shop assistant?");
    expect(allText).toContain("Patrick, do we have to discuss this again?");
    expect(allText).toContain("All the best entrepreneurs, they fight their way back from rock bottom");
    expect(allText).toContain("A toasted teacake flaked on you!");
    expect(allText).toContain("I'm wearing the wrong bra!");
    expect(allText).toContain("head back to the Jobcentre");

    // --- SCENE 2: WILL'S BEDROOM & BROKEN FRAMES ---
    expect(allText).toContain("fix some of these");
    expect(allText).toContain("Me smashing those photographs was not an accident");
    expect(allText).toContain("You thought you knew best");
    expect(allText).toContain("stuck in bed waiting for someone to bloody get me out again");
    expect(allText).toContain("Alicia and Rupert");
    expect(allText).toContain("Spare me the cod psychology");
    expect(allText).toContain("raid your grandma's wardrobe");
    expect(allText).toContain("You don't have to be an ass");
    expect(allText).toContain("make my life as miserable as you apparently make everyone else's");
    expect(allText).toContain("I'm not employed by you, I'm employed by your mother");
    expect(allText).toContain("unless she says she doesn't want me here anymore, I'm staying");
    expect(allText).toContain("because I need the money");
    expect(allText).toContain("Just put them in the drawer");

    // --- SCENE 3: SHAVING, POTENTIAL & LIFE PHILOSOPHY ---
    expect(allText).toContain("Don't smile at me like that");
    expect(allText).toContain("Where did you pick up your exotic tastes?");
    expect(allText).toContain("tired of actually living");
    expect(allText).toContain("please be quiet' sign going up in the library");
    expect(allText).toContain("claiming the world as your own");
    expect(allText).toContain("leprechaun shoes");
    expect(allText).toContain("Strictly speaking, I had a place at Manchester");
    expect(allText).toContain("Fashion");
    expect(allText).toContain("Don't say potential");
    expect(allText).toContain("You need to widen your horizons, Clark");
    expect(allText).toContain("You only get one life. It's actually your duty to live it as fully as possible");

    // --- SCENE 4: CHILDHOOD WELLIES & BUMBLEBEE TIGHTS ---
    expect(allText).toContain("pair of glittery wellies, and I refused to take them off");
    expect(allText).toContain("wore them in bed, in the bath, all summer long");
    expect(allText).toContain("bumblebee tights");
    expect(allText).toContain("Black and yellow stripes. Big horizontal stripes");
    expect(allText).toContain("really, really liked having stripy legs");
    expect(allText).toContain("I outgrew them. It broke my heart");
    expect(allText).toContain("Strange woman");
    expect(allText).toContain("Didn't you ever love anything that much?");
    expect(allText).toContain("Yes. Yes, I did");

    // --- SCENE 5: CASTLE HILLTOP & PARIS MEMORIES ---
    expect(allText).toContain("favorite spot");
    expect(allText).toContain("Paris. Place Dauphine, right on the edge");
    expect(allText).toContain("Eurostar right now");
    expect(allText).toContain("I want to be in Paris as me, the old me, with pretty French girls giving me the eye");
    expect(allText).toContain("If I shut my eyes now, I know exactly how it feels to be in that little square");
    expect(allText).toContain("remember every sensation");
    expect(allText).toContain("struggle to fit behind the table");
    expect(allText).toContain("taxi drivers who refuse to take me");
    expect(allText).toContain("wheelchair power pack that won't charge in a French socket");

    // --- SCENE 6: ALICIA'S WEDDING INVITE & BIRTHDAY DINNER ---
    expect(allText).toContain("Alicia's wedding");
    expect(allText).toContain("sharp as a tack");
    expect(allText).toContain("thought I could crack this and then go back as if nothing had changed");
    expect(allText).toContain("personal trainer");
    expect(allText).toContain("Life coaching, physical training, motivation");
    expect(allText).toContain("Entrepreneur of the Year");
    expect(allText).toContain("Swedish study about how you can train muscles to remember");
    expect(allText).toContain("Yeah, well, don't");

    // --- SCENE 7: ALICIA'S WEDDING RECEPTION & GODMOTHER ---
    expect(allText).toContain("Bride or groom?");
    expect(allText).toContain("godmother to the bride, which makes me morally responsible for her");
    expect(allText).toContain("Not one of my finer acts");
    expect(allText).toContain("one can't do these things sober");
    expect(allText).toContain("firmly encourage you to get as drunk as possible");
    expect(allText).toContain("inflict another speech on us");
    expect(allText).toContain("Young Will. He was her chance, you know");
    expect(allText).toContain("Only one of that lot that was worth a damn");
    expect(allText).toContain("Terrible shame");
    expect(allText).toContain("Rupert's an ass");
    expect(allText).toContain("He's a good one, take it from one who knows. Four marriages and counting");

    // --- SCENE 7B: THE ICONIC WEDDING DANCE FLOOR (WHEELCHAIR DANCE) ---
    expect(allText).toContain("there ought to be a law against Englishmen on dance floors");
    expect(allText).toContain("What do you say, Clark? Dance with me");
    expect(allText).toContain("Sit on my lap");
    expect(allText).toContain("Let them stare. We're doing brilliantly");
    expect(allText).toContain("you are pretty much the only thing that makes me want to get up in the morning");
    expect(allText).toContain("Like going somewhere. Traveling. Just the two of us");

    // --- SCENE 8: POST-CONCERT IN THE CAR & CLIMAX ---
    expect(allText).toContain("classical music person then?");
    expect(allText).toContain("Hated every minute of it, could you tell?");
    expect(allText).toContain("Especially during that oboe sonata");
    expect(allText).toContain("There was something in my eye");
    expect(allText).toContain("I loved it");
    expect(allText).toContain("Clark, you okay?");
    expect(allText).toContain("I don't... I don't want to go in yet");
    expect(allText).toContain("I just want to be a man who's been to a concert with a girl in a red dress");
    expect(allText).toContain("Just a few minutes more");

    // --- OUTRO ---
    expect(allText).toContain("The Hunger Games: Catching Fire left Jennifer Lawrence temporarily deaf in one ear");
    expect(allText).toContain("Click on more videos, but if you want something else, click on the playlist!");
  });

  it("5. Zero Merged Utterances: Every single segment must be an independent turn, strictly avoiding dialogue joiners", () => {
    for (const seg of lesson.segments) {
      // Must not contain em-dash dialogue mergers like "Did you? — Yes"
      expect(seg.text).not.toContain(" — ");
      expect(seg.text).not.toContain(" -- ");
      // Text must not start with dash
      expect(seg.text.trim().startsWith("-")).toBe(false);
      expect(seg.text.trim().startsWith("—")).toBe(false);
    }
  });

  it("6. Quiz must contain exactly 8 comprehensive bilingual questions with precise referenceSegmentIndex", () => {
    expect(quiz.lessonId).toBe("mov_rom_06");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`mov_rom_06_q${idx + 1}`);
      expect(q.question.trim().length).toBeGreaterThan(10);
      expect(q.questionEn!.trim().length).toBeGreaterThan(10);
      expect(q.questionVi!.trim().length).toBeGreaterThan(10);

      // Options
      expect(q.options.length).toBe(4);
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi!.length).toBe(4);

      // Correct answer within valid range [0, 3]
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThanOrEqual(3);

      // Explanations
      expect(q.explanation.trim().length).toBeGreaterThan(20);
      expect(q.explanationEn!.trim().length).toBeGreaterThan(20);
      expect(q.explanationVi!.trim().length).toBeGreaterThan(20);

      // Targeted concept
      expect(q.targetedConcept!.trim().length).toBeGreaterThan(5);
      expect(q.targetedConceptEn!.trim().length).toBeGreaterThan(5);
      expect(q.targetedConceptVi!.trim().length).toBeGreaterThan(5);

      // Reference segment
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(lesson.segments.length);
    });
  });

  it("7. TokenCount of every segment must align 100% with DictationWorkspace.tokenizeSentence", () => {
    lesson.segments.forEach((seg) => {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(
        seg.tokenCount,
        `TokenCount mismatch on segment ${seg.orderIndex}: "${seg.text}"`
      ).toBe(tokens.length);
    });
  });
});
