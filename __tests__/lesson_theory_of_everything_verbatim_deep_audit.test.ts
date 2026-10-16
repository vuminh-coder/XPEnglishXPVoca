import { describe, it, expect } from "vitest";
import {
  LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE,
  QUIZ_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE,
} from "../features/listening/data/lessons/movies/inspirational/lesson_theory_of_everything";

describe("The Theory of Everything: Stephen Hawking Ending (mov_insp_08) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Auditorium Introduction & Student Philosophy Inquiry (Segments 0-3)", () => {
    const segments = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments;
    expect(segments[0].text).toContain("Professor Stephen Hawking has graciously agreed to take a few questions");
    expect(segments[0].properNouns).toContain("Stephen Hawking");

    expect(segments[1].text).toBe("Professor Hawking, you have said you do not believe in God.");
    expect(segments[1].properNouns).toEqual(expect.arrayContaining(["Hawking", "God"]));

    expect(segments[2].text).toBe("Do you have a philosophy of life that helps you?");
    expect(segments[2].translationVi).toContain("triết lý sống nào giúp nâng đỡ tinh thần");
  });

  it("Audit 2: Primates Analogy & Cosmic Boundary Conditions (Segments 4-9)", () => {
    const segments = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments;
    expect(segments[4].text).toContain("advanced breed of primates on a minor planet");
    expect(segments[4].keywords).toContain("advanced breed");

    expect(segments[5].text).toContain("outer suburb of one among a hundred billion galaxies");
    expect(segments[6].text).toContain("dawn of civilization, people have craved for an understanding of the underlying order");

    expect(segments[7].text).toBe("There ought to be something very special about the boundary conditions of the universe.");
    expect(segments[8].text).toBe("And what could be more special than that there is no boundary?");
    expect(segments[9].text).toBe("And there should be no boundary to human endeavor.");
    expect(segments[9].translationVi).toContain("không nên có bất kỳ giới hạn nào cho nỗ lực của con người");
  });

  it("Audit 3: The Dropped Fountain Pen & Walking Fantasy (Segments 10-14)", () => {
    const segments = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments;
    expect(segments[10].text).toContain("notices a student accidentally drop her fountain pen");
    expect(segments[11].text).toBe("The metal pen clatters softly onto the carpeted floor below.");

    expect(segments[12].text).toContain("envisions himself rising freely from his motorized wheelchair");
    expect(segments[13].text).toContain("His legs step down the stairs with steady strength");
    expect(segments[14].text).toContain("hands it back to her, experiencing the simple grace of physical movement");
  });

  it("Audit 4: Return to Reality & 'While There's Life, There Is Hope' (Segments 15-19)", () => {
    const segments = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments;
    expect(segments[15].text).toContain("dissolves back into reality: Stephen remains seated in his chair");
    expect(segments[16].text).toBe("We are all different.");

    expect(segments[17].text).toBe("However bad life may seem, there is always something you can do, and succeed at.");
    expect(segments[17].translationVi).toContain("luôn luôn có điều gì đó bạn có thể làm, và thành công");

    expect(segments[18].text).toBe("While there's life, there is hope.");
    expect(segments[18].translationVi).toBe("Chừng nào còn sự sống, chừng đó còn có hy vọng.");

    expect(segments[19].text).toContain("standing ovation to the triumphant physicist");
  });

  it("Audit 5: Buckingham Palace & Iconic 'Look What We Made' (Segments 20-25)", () => {
    const segments = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments;
    expect(segments[21].text).toContain("Buckingham Palace, where Queen Elizabeth II invites the professor");
    expect(segments[21].properNouns).toEqual(expect.arrayContaining(["Buckingham Palace", "Queen Elizabeth II"]));

    expect(segments[22].text).toContain("Robert, Lucy, and Timothy");
    expect(segments[22].properNouns).toEqual(expect.arrayContaining(["Robert", "Lucy", "Timothy"]));

    expect(segments[24].text).toBe("Look what we made.");
    expect(segments[24].translationVi).toBe("Hãy nhìn những gì chúng ta đã tạo nên này anh.");

    expect(segments[25].text).toBe("Stephen smiles warmly, typing back through his screen: 'Look what we made.'");
  });

  it("Audit 6: Rewind Montage to 1963 Cambridge May Ball (Segments 26-33)", () => {
    const segments = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments;
    expect(segments[26].text).toContain("Arrival of the Birds");
    expect(segments[28].text).toContain("Hawking radiation and the physics breakthroughs of black holes");

    expect(segments[29].text).toContain("sentenced young Stephen to only two years of life");
    expect(segments[30].text).toContain("young Stephen cycling through Cambridge");
    expect(segments[30].properNouns).toContain("Cambridge");

    expect(segments[31].text).toContain("May Ball dance party in 1963");
    expect(segments[31].properNouns).toContain("May Ball");

    expect(segments[32].text).toContain("Jane smiles in her shimmering blue dress, spinning beneath the stars");
    expect(segments[33].text).toContain("lived for over fifty years beyond his prognosis");
  });

  it("Audit 7: Quiz Reference Indices & Semantic Alignment (1-indexed)", () => {
    const quiz = QUIZ_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE;
    const segments = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments;

    quiz.questions.forEach((q) => {
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(segments.length);
      const targetSeg = segments[q.referenceSegmentIndex! - 1];
      expect(targetSeg).toBeDefined();
      expect(targetSeg.orderIndex).toBe(q.referenceSegmentIndex);
      expect(q.targetedConcept).toBeTruthy();
      expect(q.targetedConceptVi).toBeTruthy();
      expect(q.explanationVi).toBeTruthy();
    });

    // Check specific question anchors
    const q1 = quiz.questions[0]; // Primates
    expect(q1.question).toContain("cosmic position");
    expect(q1.options[q1.correctAnswer]).toContain("primates on a minor planet");

    const q2 = quiz.questions[1]; // Boundary
    expect(q2.question).toContain("boundary");
    expect(q2.options[q2.correctAnswer]).toContain("no boundary to human endeavor");

    const q3 = quiz.questions[2]; // Fountain pen
    expect(q3.question).toContain("fountain pen");
    expect(q3.options[q3.correctAnswer]).toContain("ordinary physical freedom");

    const q4 = quiz.questions[3]; // While there's life hope
    expect(q4.question).toContain("resilience");
    expect(q4.options[q4.correctAnswer]).toContain("while there's life, there is hope");

    const q5 = quiz.questions[4]; // Look what we made
    expect(q5.question).toContain("Look what we made");
    expect(q5.options[q5.correctAnswer]).toContain("wonderful children");

    const q6 = quiz.questions[5]; // Arrival of the birds
    expect(q6.question).toContain("Arrival of the Birds");
    expect(q6.options[q6.correctAnswer]).toContain("fluidity of time");

    const q7 = quiz.questions[6]; // Hawking radiation
    expect(q7.question).toContain("scientific contribution");
    expect(q7.options[q7.correctAnswer]).toContain("Hawking radiation");

    const q8 = quiz.questions[7]; // Fifty years
    expect(q8.question).toContain("medical miracle");
    expect(q8.options[q8.correctAnswer]).toContain("over fifty years beyond his initial two-year terminal diagnosis");
  });
});
