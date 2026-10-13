import { describe, it, expect } from "vitest";
import {
  LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM,
  QUIZ_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM,
} from "../features/listening/data/lessons/movies/inspirational/lesson_the_intern";

describe("The Intern: Ben Whittacker Gentleman Wisdom (mov_insp_06) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Cluttered Desk Discovery & 7 AM Initiative (Segments 0-3)", () => {
    const segments = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments;
    const sDesk = segments[0];
    expect(sDesk.text).toContain("cluttered desk is unprecedentedly clean and tidy");
    expect(sDesk.translationVi).toContain("chiếc bàn vốn bừa bộn");
    expect(sDesk.keywords).toContain("cluttered desk");

    const sBecky = segments[1];
    expect(sBecky.text).toBe("I swear I was going to stay late and do this myself.");

    const sBenDidIt = segments[2];
    expect(sBenDidIt.text).toBe("Ben came in at 7:00 this morning and did it.");
    expect(sBenDidIt.properNouns).toContain("Ben");
  });

  it("Audit 2: Musicians Retirement Metaphor & 80 Years Old Witty Response (Segments 4-7)", () => {
    const segments = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments;
    const sMusic = segments[5];
    expect(sMusic.text).toContain("Musicians don't retire; they stop when there's no more music in them.");
    expect(sMusic.translationVi).toContain("không còn âm nhạc bên trong tâm hồn");
    expect(sMusic.keywords).toContain("music in them");

    const sQuestion = segments[6];
    expect(sQuestion.text).toBe("Where do you see yourself in 10 years?");

    const sAnswer = segments[7];
    expect(sAnswer.text).toBe("When I'm 80? I hope I'm still alive!");
    expect(sAnswer.translationVi).toContain("Khi tôi 80 tuổi ấy hả?");
  });

  it("Audit 3: 1973 Samsonite Briefcase & Chivalrous Handkerchief Code (Segments 11-13)", () => {
    const segments = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments;
    const sSuit = segments[11];
    expect(sSuit.text).toContain("Samsonite classic briefcase");
    expect(sSuit.properNouns).toContain("Samsonite");

    const sHandkerchief = segments[13];
    expect(sHandkerchief.text).toContain("One of the last vestiges of the chivalrous gent.");
    expect(sHandkerchief.text).toContain("It's for offering to a woman when she cries, not for yourself.");
    expect(sHandkerchief.keywords).toContain("vestiges");
    expect(sHandkerchief.keywords).toContain("chivalrous gent");
  });

  it("Audit 4: Discreet Chauffeur Protection & Hot Clam Chowder (Segments 18-22)", () => {
    const segments = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments;
    const sDriver = segments[18];
    expect(sDriver.text).toContain("drinking alcohol from a flask");
    expect(sDriver.properNouns).toContain("Mike");

    const sCover = segments[19];
    expect(sCover.text).toContain("I'm happy to cover for Mike today.");

    const sChowder = segments[21];
    expect(sChowder.text).toContain("hot clam chowder");
    expect(sChowder.translationVi).toContain("súp nghêu nóng hổi");
  });

  it("Audit 5: The Great Mother Email Heist & Blaring House Alarm (Segments 25-33)", () => {
    const segments = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments;
    const sRant = segments[25];
    expect(sRant.text).toContain("accidentally sent a terrible ranting email about my mother directly to my mother");
    expect(sRant.translationVi).toContain("gửi một bức email chỉ trích thậm tệ");

    const sRecruits = segments[29];
    expect(sRecruits.text).toContain("Ben recruits the boys: Davis, Lewis, and Jason");
    expect(sRecruits.properNouns).toEqual(expect.arrayContaining(["Ben", "Davis", "Lewis", "Jason"]));

    const sAlarm = segments[31];
    expect(sAlarm.text).toContain("house alarm blares loudly");

    const sDeleted = segments[32];
    expect(sDeleted.text).toBe("I found it! Move to trash, empty trash! We got it, now move, move, move!");
  });

  it("Audit 6: San Francisco Handkerchief, Marriage Insight & Park Tai Chi (Segments 36-50)", () => {
    const segments = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments;
    const sAffair = segments[36];
    expect(sAffair.text).toContain("Matt is having an affair. I know about it.");

    const sTears = segments[37];
    expect(sTears.text).toContain("pulls out his clean white cotton handkerchief, and gently hands it to her");

    const sWisdom = segments[40];
    expect(sWisdom.text).toContain("Experience never gets old.");
    expect(sWisdom.translationVi).toContain("Kinh nghiệm trải đời không bao giờ trở nên cũ kỹ");

    const sTaiChi = segments[48];
    expect(sTaiChi.text).toContain("outdoor Tai Chi class");
    expect(sTaiChi.properNouns).toContain("Tai Chi");

    const sFinal = segments[54];
    expect(sFinal.text).toContain("living people and sincere connections remain the true core of life");
  });

  it("Audit 7: Quiz Reference Indices & Semantic Alignment", () => {
    const quiz = QUIZ_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM;
    const segments = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments;

    quiz.questions.forEach((q) => {
      expect(q.referenceSegmentIndex).toBeDefined();
      const targetSeg = segments[q.referenceSegmentIndex!];
      expect(targetSeg).toBeDefined();
      expect(q.targetedConcept).toBeTruthy();
      expect(q.targetedConceptVi).toBeTruthy();
      expect(q.explanationVi).toBeTruthy();
    });

    // Check specific question anchors
    const q1 = quiz.questions[0]; // Louis Armstrong music
    expect(q1.question).toContain("musicians");
    expect(q1.options[q1.correctAnswer]).toContain("vitality, passion");

    const q2 = quiz.questions[1]; // 80 alive
    expect(q2.question).toContain("10 years");
    expect(q2.options[q2.correctAnswer]).toContain("eighty");

    const q3 = quiz.questions[2]; // Handkerchief
    expect(q3.question).toContain("handkerchief");
    expect(q3.options[q3.correctAnswer]).toContain("woman when she cries");

    const q4 = quiz.questions[3]; // Desk
    expect(q4.question).toContain("standing ovation");
    expect(q4.options[q4.correctAnswer]).toContain("cluttered central office desk");

    const q5 = quiz.questions[4]; // Chauffeur Mike
    expect(q5.question).toContain("chauffeur");
    expect(q5.options[q5.correctAnswer]).toContain("flask");

    const q6 = quiz.questions[5]; // Email heist
    expect(q6.question).toContain("break-in");
    expect(q6.options[q6.correctAnswer]).toContain("mother");

    const q7 = quiz.questions[6]; // Experience never gets old
    expect(q7.question).toContain("counsel does Ben offer");
    expect(q7.options[q7.correctAnswer]).toContain("Experience never gets old");

    const q8 = quiz.questions[7]; // Tai Chi
    expect(q8.question).toContain("Tai Chi");
    expect(q8.options[q8.correctAnswer]).toContain("equilibrium");
  });
});
