import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS,
  QUIZ_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS,
} from "@/features/listening/data/lessons/movies/romance/lesson_me_before_you";
import { TOPIC_ROMANCE_CINEMA, LESSONS_ROMANCE_CINEMA } from "@/features/listening/data/topics/topic_romance_cinema";

describe("Senior 50-Year QA Deep Audit: Me Before You - Lou & Will's Journey (Video #6)", () => {
  it("should have valid lesson metadata and YouTube external ID matching sLHx2vVa1HA (>= 5 minutes standard)", () => {
    const lesson = LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS;
    expect(lesson.id).toBe("mov_rom_06");
    expect(lesson.slug).toBe("me-before-you-the-final-letter-in-paris");
    expect(lesson.externalId).toBe("sLHx2vVa1HA");
    expect(lesson.durationSeconds).toBe(541);
    expect(lesson.durationFormatted).toBe("09:01");
    expect(lesson.durationSeconds).toBeGreaterThanOrEqual(300); // Strict >= 5 minutes condition
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.categoryId).toBe("cat_romance_cinema");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("sLHx2vVa1HA");
  });

  it("should contain exactly 128 chronological pure verbatim segments covering all 8 scenes and outro", () => {
    const { segments } = LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS;
    expect(segments.length).toBe(128);

    // Verify key narrative dialogue anchors across scenes
    expect(segments[0].text).toContain("Come on, only got two miles left!");
    expect(segments[1].text).toContain("Estate agent maybe? Shop assistant?");
    expect(segments[2].text).toContain("Patrick, do we have to discuss this again?");
    expect(segments[3].text).toContain("fight their way back from rock bottom");
    expect(segments[4].text).toContain("A toasted teacake flaked on you! Slow down, I'm wearing the wrong bra!");
    expect(segments[5].text).toContain("Pop in, head back to the Jobcentre");
    expect(segments[6].text).toContain("Morning, Will. It's Louisa.");
    expect(segments[8].text).toContain("Me smashing those photographs was not an accident");
    expect(segments[10].text).toContain("You thought you knew best");
    expect(segments[13].text).toContain("Spare me the cod psychology");
    expect(segments[14].text).toContain("You don't have to be an ass");
    expect(segments[18].text).toContain("I'm not employed by you, I'm employed by your mother");
    expect(segments[22].text).toContain("Don't smile at me like that");
    expect(segments[25].text).toContain("Where did you pick up your exotic tastes?");
    expect(segments[30].text).toContain("please be quiet' sign going up in the library");
    expect(segments[31].text).toContain("showing your leprechaun shoes to dodgy men");
    expect(segments[36].text).toContain("Strictly speaking, I had a place at Manchester");
    expect(segments[38].text).toContain("Fashion");
    expect(segments[42].text).toContain("widen your horizons, Clark");
    expect(segments[43].text).toContain("You only get one life. It's actually your duty to live it as fully as possible");
    expect(segments[47].text).toContain("pair of glittery wellies, and I refused to take them off");
    expect(segments[49].text).toContain("favorite outfit was the glittery boots and my bumblebee tights");
    expect(segments[51].text).toContain("Black and yellow stripes. Big horizontal stripes");
    expect(segments[54].text).toContain("I outgrew them");
    expect(segments[55].text).toContain("It broke my heart");
    expect(segments[58].text).toContain("Yes. Yes, I did");
    expect(segments[62].text).toContain("Paris. Place Dauphine, right on the edge");
    expect(segments[65].text).toContain("I want to be in Paris as me, the old me, with pretty French girls giving me the eye");
    expect(segments[68].text).toContain("wheelchair power pack that won't charge in a French socket");
    expect(segments[71].text).toContain("Alicia's wedding");
    expect(segments[74].text).toContain("sharp as a tack");
    expect(segments[76].text).toContain("thought I could crack this and then go back as if nothing had changed");
    expect(segments[78].text).toContain("Entrepreneur of the Year, two years running");
    expect(segments[81].text).toContain("Swedish study about how you can train muscles to remember");
    expect(segments[84].text).toContain("Yeah, well, don't");
    expect(segments[86].text).toContain("Bride or groom?");
    expect(segments[88].text).toContain("Actually, godmother to the bride, which makes me morally responsible for her");
    expect(segments[92].text).toContain("firmly encourage you to get as drunk as possible");
    expect(segments[94].text).toContain("He was her chance, you know. Only one of that lot that was worth a damn");
    expect(segments[96].text).toContain("Rupert's an ass");
    expect(segments[97].text).toContain("Four marriages and counting");

    // The iconic wedding dance floor scene assertions
    expect(segments[99].text).toContain("there ought to be a law against Englishmen on dance floors");
    expect(segments[100].text).toContain("What do you say, Clark? Dance with me");
    expect(segments[102].text).toContain("Sit on my lap");
    expect(segments[104].text).toContain("Get on");
    expect(segments[106].text).toContain("Let them stare. We're doing brilliantly");
    expect(segments[107].text).toContain("you are pretty much the only thing that makes me want to get up in the morning");
    expect(segments[112].text).toContain("Like going somewhere. Traveling. Just the two of us");

    // Post-concert in car & climax assertions
    expect(segments[114].text).toContain("classical music person then?");
    expect(segments[116].text).toContain("Especially during that oboe sonata");
    expect(segments[117].text).toContain("There was something in my eye");
    expect(segments[118].text).toContain("I loved it");
    expect(segments[123].text).toContain("I don't... I don't want to go in yet");
    expect(segments[124].text).toContain("I just want to be a man who's been to a concert with a girl in a red dress");
    expect(segments[125].text).toContain("Just a few minutes more");
    expect(segments[126].text).toContain("The Hunger Games: Catching Fire left Jennifer Lawrence temporarily deaf in one ear");
    expect(segments[127].text).toContain("Click on more videos, but if you want something else, click on the playlist!");

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
    const { segments } = LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS;
    segments.forEach((seg) => {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
      expect(tokens.length).toBeGreaterThan(0);
    });
  });

  it("should provide bilingual comprehension quiz with accurate references", () => {
    const quiz = QUIZ_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS;
    expect(quiz.lessonId).toBe("mov_rom_06");
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
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS.segments.length);
    });
  });

  it("should be properly registered in TOPIC_ROMANCE_CINEMA and LESSONS_ROMANCE_CINEMA", () => {
    const foundInLessons = LESSONS_ROMANCE_CINEMA.find((l) => l.id === "mov_rom_06");
    expect(foundInLessons).toBeDefined();
    expect(foundInLessons?.title).toBe(LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS.title);
    expect(foundInLessons?.externalId).toBe("sLHx2vVa1HA");
    expect(foundInLessons?.durationSeconds).toBe(541);
    expect(foundInLessons?.cefrLevel).toBe("B2");
    expect(foundInLessons?.segments.length).toBe(128);
    expect(TOPIC_ROMANCE_CINEMA.lessonsCount).toBe(LESSONS_ROMANCE_CINEMA.length);
  });
});
