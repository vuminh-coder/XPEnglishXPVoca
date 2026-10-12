import { describe, it, expect } from "vitest";
import {
  LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY,
  QUIZ_ONE_DAY_EMMA_DEXTER_LOVE_STORY,
} from "@/features/listening/data/lessons/movies/romance/lesson_one_day";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

describe("Senior Deep Audit: One Day Video 7 - 100% Comprehensive Pure Data & Subtitle Coverage", () => {
  const lesson = LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY;
  const quiz = QUIZ_ONE_DAY_EMMA_DEXTER_LOVE_STORY;

  it("1. Metadata & Video Specifications must strictly match requirements", () => {
    expect(lesson.id).toBe("mov_rom_07");
    expect(lesson.externalId).toBe("ESI7jRy2yAk");
    expect(lesson.durationSeconds).toBe(604);
    expect(lesson.durationFormatted).toBe("10:04");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // >= 5 minutes standard
    expect(lesson.viewCount).toBeGreaterThanOrEqual(100000); // >= 100,000 views
    expect(lesson.accent).toContain("British");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("ESI7jRy2yAk");
  });

  it("2. Timeline Coverage must span comprehensively across all 85 pure master segments (100% of 604s timeline)", () => {
    const segments = lesson.segments;
    expect(segments.length).toBe(85);

    // Starts at beginning of video dialogue (0.0s)
    expect(segments[0].startTime).toBe(0.0);
    // Ends at the final timestamp (604.0s)
    expect(segments[segments.length - 1].endTime).toBe(604.0);

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

    // --- SCENE 1: FRENCH SUMMER HOLIDAY & BEACH BANTER ---
    expect(allText).toContain("So this is me.");
    expect(allText).toContain("'Faffing' is fine, but anyone can talk.");
    expect(allText).toContain("Just... sometimes action is what's needed.");
    expect(allText).toContain("God, you need to change the world.");
    expect(allText).toContain("So what is that, a swimming costume?");
    expect(allText).toContain("It's called Edwardian.");
    expect(allText).toContain("No, the masonry paint. Factor 30, I burn.");
    expect(allText).toContain("Here, let me.");
    expect(allText).toContain("I got that in Thailand. It's a yin-yang.");
    expect(allText).toContain("Looks like a road sign.");
    expect(allText).toContain("it means a perfect union of opposites.");
    expect(allText).toContain("It means wear some socks.");
    expect(allText).toContain("This is scooped a bit low, isn't it?");
    expect(allText).toContain("Good job I didn't put it on backwards.");

    // --- SCENE 2: PARIS CANAL ENCOUNTER & STRICT OATH ---
    expect(allText).toContain("Dexter! I thought I got rid of you.");
    expect(allText).toContain("If you muck me about, Dexter, and I swear...");
    expect(allText).toContain("if you lead me on, or let me down, or go behind my back, I will murder you.");
    expect(allText).toContain("Do you swear?");
    expect(allText).toContain("Yeah, I swear. I swear.");
    expect(allText).toContain("I won't lead you on, or let you down, or go behind your back.");

    // --- SCENE 3: WISH FOR A CHILD & DOMESTIC BLISS ---
    expect(allText).toContain("I want a child with the man I love.");
    expect(allText).toContain("And if he won't do it, then I want one with you.");
    expect(allText).toContain("Well then, we'd better get started.");

    // --- SCENE 4: EDINBURGH MORNING AFTER GRADUATION (15 JULY 1988) ---
    expect(allText).toContain("It's all right, don't panic! It's only me.");
    expect(allText).toContain("Emma. Emma Morley.");
    expect(allText).toContain("So what do you suggest we do?");
    expect(allText).toContain("Today. We're meant to be doing something today, right?");
    expect(allText).toContain("Look, today's a bit tricky for me, really.");
    expect(allText).toContain("So if you wanted to, we could go for a walk or something.");

    // --- SCENE 5: ARTHUR'S SEAT HIKE & CORE PHILOSOPHY ---
    expect(allText).toContain("It's these shoes! I can't go mountain climbing in brogues!");
    expect(allText).toContain("It's not K2, it's just a big hill, all right? A child could do it.");
    expect(allText).toContain("I don't want you thinking I'm bothered or anything about last night.");
    expect(allText).toContain("I don't want your phone number, or letters, or postcards.");
    expect(allText).toContain("I don't want to get married to you, definitely don't want to have your babies.");
    expect(allText).toContain("Whatever happens tomorrow, we had today.");
    expect(allText).toContain("And if we should bump into each other sometime in the future, well that's fine too.");
    expect(allText).toContain("We'll be friends.");
    expect(allText).toContain("So the flat's empty, if you wanted to finish what we started...");
    expect(allText).toContain("Sober and in daylight?");
    expect(allText).toContain("Race you!");

    // --- SCENE 6: PARENTS' SURPRISE ARRIVAL ---
    expect(allText).toContain("Oh, goddamn it, they're early!");
    expect(allText).toContain("We thought we'd surprise you. Clearly we have.");
    expect(allText).toContain("Uh, Mom, Dad, this is Emma Morley.");
    expect(allText).toContain("Pleasure to meet you, Emma. You'll join us for tea, yes?");
    expect(allText).toContain("Oh, no, thanks. I should leave you to it.");
    expect(allText).toContain("Well, right. Have a nice life!");
    expect(allText).toContain("I'm sorry, did we just interrupt something?");
    expect(allText).toContain("Weren't you wearing this yesterday? You're a rascal.");

    // --- SCENE 7: RUNNING AFTER EMMA, EXCHANGE CONTACT & GOODBYE ---
    expect(allText).toContain("Wait! Wait! Look, I need your phone number!");
    expect(allText).toContain("Right, this is me in Edinburgh.");
    expect(allText).toContain("My parents' number, and their address just in case.");
    expect(allText).toContain("Oh, Dad's got a fax machine at work...");
    expect(allText).toContain("Just... just a phone number is fine, thank you.");
    expect(allText).toContain("Look, I've got to go.");
    expect(allText).toContain("I know. But we will see each other again.");
    expect(allText).toContain("I know we will. Goodbye, Dex.");
    expect(allText).toContain("Goodbye, Emma.");
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
    expect(quiz.lessonId).toBe("mov_rom_07");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`mov_rom_07_q${idx + 1}`);
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
