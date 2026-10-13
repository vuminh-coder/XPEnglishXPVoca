import { describe, it, expect } from "vitest";
import {
  LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE,
  QUIZ_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE,
} from "../features/listening/data/lessons/movies/inspirational/lesson_forrest_gump";

describe("Forrest Gump: Tom Hanks on Becoming Gump (mov_insp_05) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Street Shouts Evolution & Cast Away Wilson Phenomenon", () => {
    const segments = LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE.segments;
    const sApollo = segments.find((s) => s.text.includes("Houston, we have a problem"));
    expect(sApollo).toBeDefined();
    expect(sApollo!.translationVi).toContain("Houston, chúng ta gặp rắc rối rồi");
    expect(sApollo!.properNouns).toContain("Houston");

    const sRun = segments.find((s) => s.text.includes("Run, Forrest, run"));
    expect(sRun).toBeDefined();
    expect(sRun!.properNouns).toContain("Forrest");

    const sWilsonShout = segments.find((s) => s.text === "WILSON!");
    expect(sWilsonShout).toBeDefined();
    expect(sWilsonShout!.translationVi).toBe("WILSON!");
    expect(sWilsonShout!.properNouns).toContain("Wilson");

    const sUniversal = segments.find((s) => s.text.includes("universal language"));
    expect(sUniversal).toBeDefined();
    expect(sUniversal!.text).toContain("words that they don't bother dubbing into any other language");
    expect(sUniversal!.keywords).toContain("universal language");
  });

  it("Audit 2: Mississippi Accent & Michael Conner Humphreys Voice Origin", () => {
    const segments = LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE.segments;
    const sActor = segments.find((s) => s.text.includes("Michael Conner Humphreys"));
    expect(sActor).toBeDefined();
    expect(sActor!.properNouns).toContain("Michael Conner Humphreys");
    expect(sActor!.properNouns).toContain("Bob Zemeckis");

    const sAfghan = segments.find((s) => s.text.includes("Afghanistan"));
    expect(sAfghan).toBeDefined();
    expect(sAfghan!.text).toContain("served in Afghanistan");
    expect(sAfghan!.keywords).toContain("veteran");

    const sHardG = segments.find((s) => s.text.includes("hard G"));
    expect(sHardG).toBeDefined();
    expect(sHardG!.text).toContain("Mississippi");
    expect(sHardG!.text).toContain("think-ing");
  });

  it("Audit 3: Daddy Makes Grease for Lipsticks Dialogue", () => {
    const segments = LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE.segments;
    const sGrease = segments.find((s) => s.text.includes("My daddy makes grease"));
    expect(sGrease).toBeDefined();
    expect(sGrease!.translationVi).toContain("Bố cháu làm mỡ");

    const sLipstick = segments.find((s) => s.text.includes("lipsticks"));
    expect(sLipstick).toBeDefined();
    expect(sLipstick!.text).toContain("grease goes into lipsticks");
    expect(sLipstick!.translationVi).toContain("son môi");
  });

  it("Audit 4: Cassette Recording & Director Bob Zemeckis Decision", () => {
    const segments = LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE.segments;
    const sCassette = segments.find((s) => s.text.includes("cassettes"));
    expect(sCassette).toBeDefined();
    expect(sCassette!.translationVi).toContain("băng cassette");
    expect(sCassette!.keywords).toContain("cassettes");

    const sBobCommit = segments.find((s) => s.text.includes("teach this kid"));
    expect(sBobCommit).toBeDefined();
    expect(sBobCommit!.properNouns).toContain("Bob");
  });

  it("Audit 5: 1995 Academy Awards Milestone & Peter Capaldi Humorous Ordeal", () => {
    const segments = LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE.segments;
    const sNorton1995 = segments.find((s) => s.text.includes("It was 1995"));
    expect(sNorton1995).toBeDefined();
    expect(sNorton1995!.text).toContain("Peter Capaldi");

    const sCapaldiShort = segments.find((s) => s.text.includes("winner of the short film for 1995"));
    expect(sCapaldiShort).toBeDefined();
    expect(sCapaldiShort!.properNouns).toContain("Peter Capaldi");

    const sTumbleweeds = segments.find((s) => s.text.includes("tumbleweeds"));
    expect(sTumbleweeds).toBeDefined();
    expect(sTumbleweeds!.translationVi).toContain("Bụi cỏ lăn");
    expect(sTumbleweeds!.keywords).toContain("tumbleweeds");
  });

  it("Audit 6: David Walliams English Channel Banter & Toy Story 4", () => {
    const segments = LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE.segments;
    const sWalliams = segments.find((s) => s.text.includes("English Channel"));
    expect(sWalliams).toBeDefined();
    expect(sWalliams!.text).toContain("swam the English Channel for charity");
    expect(sWalliams!.translationVi).toContain("eo biển Manche");

    const sForky = segments.find((s) => s.text.includes("Toy Story 4"));
    expect(sForky).toBeDefined();
    expect(sForky!.properNouns).toContain("Toy Story 4");
  });

  it("Audit 7: Quiz Reference Indices & Semantic Alignment", () => {
    const quiz = QUIZ_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE;
    const segments = LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE.segments;

    quiz.questions.forEach((q) => {
      expect(q.referenceSegmentIndex).toBeDefined();
      const targetSeg = segments[q.referenceSegmentIndex!];
      expect(targetSeg).toBeDefined();
      expect(q.targetedConcept).toBeTruthy();
      expect(q.targetedConceptVi).toBeTruthy();
      expect(q.explanationVi).toBeTruthy();
    });

    // Check specific question anchors
    const q1 = quiz.questions[0]; // Wilson
    expect(q1.question).toContain("shout out");
    expect(q1.options[q1.correctAnswer]).toContain("WILSON");

    const q3 = quiz.questions[2]; // Mississippi & hard G
    expect(q3.question).toContain("phonetic");
    expect(q3.options[q3.correctAnswer]).toContain("hard 'G'");

    const q4 = quiz.questions[3]; // Lipsticks
    expect(q4.question).toContain("grease");
    expect(q4.options[q4.correctAnswer]).toContain("Lipstick");

    const q6 = quiz.questions[5]; // Capaldi tumbleweed
    expect(q6.question).toContain("Peter Capaldi");
    expect(q6.options[q6.correctAnswer]).toContain("journalist");
  });
});
