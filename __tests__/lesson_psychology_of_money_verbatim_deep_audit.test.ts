import { describe, it, expect } from "vitest";
import {
  LESSON_PSYCHOLOGY_OF_MONEY,
  QUIZ_PSYCHOLOGY_OF_MONEY,
} from "../features/listening/data/lessons/lesson_psychology_of_money";

describe("The Psychology of Money: Warren Buffett's Greatest Secret (vid_psychology_of_money) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Book Introduction & Patience Over Stock-Picking (Segments 1-3)", () => {
    const segments = LESSON_PSYCHOLOGY_OF_MONEY.segments;

    expect(segments[0].orderIndex).toBe(1);
    expect(segments[0].text).toBe(
      "In the book, The Psychology of Money, Morgan Housel shares Warren Buffett's real secret."
    );
    expect(segments[0].properNouns).toEqual([
      "The Psychology of Money",
      "Morgan Housel",
      "Warren Buffett's",
    ]);
    expect(segments[0].keywords).toContain("real secret");

    expect(segments[1].orderIndex).toBe(2);
    expect(segments[1].text).toBe("It's not stock-picking, it's patience.");
    expect(segments[1].keywords).toContain("stock-picking");
    expect(segments[1].keywords).toContain("patience");

    expect(segments[2].orderIndex).toBe(3);
    expect(segments[2].text).toBe(
      "Housel explains that compound interest only works if you stay in the game."
    );
    expect(segments[2].properNouns).toContain("Housel");
    expect(segments[2].keywords).toContain("compound interest");
    expect(segments[2].keywords).toContain("stay in the game");
  });

  it("Audit 2: The Fast-Wealth Trap & Constant Market Churning (Segments 4-5)", () => {
    const segments = LESSON_PSYCHOLOGY_OF_MONEY.segments;

    expect(segments[3].orderIndex).toBe(4);
    expect(segments[3].text).toBe("Most people want to get rich fast.");
    expect(segments[3].keywords).toContain("get rich fast");

    expect(segments[4].orderIndex).toBe(5);
    expect(segments[4].text).toBe(
      "They jump in, jump out, chase trends, and end up with nothing."
    );
    expect(segments[4].keywords).toContain("jump in");
    expect(segments[4].keywords).toContain("jump out");
    expect(segments[4].keywords).toContain("chase trends");
    expect(segments[4].keywords).toContain("end up with nothing");
  });

  it("Audit 3: Warren Buffett's 70-Year Horizon & Remaining at the Table (Segments 6-9)", () => {
    const segments = LESSON_PSYCHOLOGY_OF_MONEY.segments;

    expect(segments[5].orderIndex).toBe(6);
    expect(segments[5].text).toBe("But Buffett?");
    expect(segments[5].properNouns).toContain("Buffett");

    expect(segments[6].orderIndex).toBe(7);
    expect(segments[6].text).toBe("He's been investing for more than 70 years.");
    expect(segments[6].keywords).toContain("more than 70 years");

    expect(segments[7].orderIndex).toBe(8);
    expect(segments[7].text).toBe("The magic isn't his IQ.");
    expect(segments[7].properNouns).toContain("IQ");
    expect(segments[7].keywords).toContain("magic");

    expect(segments[8].orderIndex).toBe(9);
    expect(segments[8].text).toBe("It's that he never left the table.");
    expect(segments[8].keywords).toContain("never left the table");
  });

  it("Audit 4: Compounding Needs Time & The Core Book Takeaway (Segments 10-11)", () => {
    const segments = LESSON_PSYCHOLOGY_OF_MONEY.segments;

    expect(segments[9].orderIndex).toBe(10);
    expect(segments[9].text).toBe("Compounding needs time, not genius.");
    expect(segments[9].keywords).toContain("compounding");
    expect(segments[9].keywords).toContain("needs time");

    expect(segments[10].orderIndex).toBe(11);
    expect(segments[10].text).toBe(
      "That's the lesson from The Psychology of Money."
    );
    expect(segments[10].properNouns).toContain("The Psychology of Money");
    expect(segments[10].keywords).toContain("lesson");
  });

  it("Audit 5: Actionable Mantras: Stop Rushing, Mind over Market & Final Debate (Segments 12-16)", () => {
    const segments = LESSON_PSYCHOLOGY_OF_MONEY.segments;

    expect(segments[11].orderIndex).toBe(12);
    expect(segments[11].text).toBe("If you want wealth, stop rushing.");
    expect(segments[11].keywords).toContain("stop rushing");

    expect(segments[12].orderIndex).toBe(13);
    expect(segments[12].text).toBe("Be patient. Stay consistent.");
    expect(segments[12].keywords).toContain("be patient");
    expect(segments[12].keywords).toContain("stay consistent");

    expect(segments[13].orderIndex).toBe(14);
    expect(segments[13].text).toBe("That's the real secret.");
    expect(segments[13].keywords).toContain("real secret");

    expect(segments[14].orderIndex).toBe(15);
    expect(segments[14].text).toBe("So master your mind, not the market.");
    expect(segments[14].keywords).toContain("master your mind");
    expect(segments[14].keywords).toContain("market");

    expect(segments[15].orderIndex).toBe(16);
    expect(segments[15].text).toBe(
      "Comment. Do you think money is more math or behavior?"
    );
    expect(segments[15].keywords).toContain("math");
    expect(segments[15].keywords).toContain("behavior");
  });

  it("Audit 6: Complete IPA Pronunciation Wrap Check", () => {
    for (const seg of LESSON_PSYCHOLOGY_OF_MONEY.segments) {
      expect(seg.ipaUs).toMatch(/^\/.*\/$/);
      expect(seg.ipaUs).not.toContain("//");
    }
  });

  it("Audit 7: Quiz Questions & Answers Pedagogy Consistency Check", () => {
    const quiz = QUIZ_PSYCHOLOGY_OF_MONEY;
    expect(quiz.questions.length).toBe(8);

    expect(quiz.questions[0].referenceSegmentIndex).toBe(2);
    expect(quiz.questions[1].referenceSegmentIndex).toBe(3);
    expect(quiz.questions[2].referenceSegmentIndex).toBe(5);
    expect(quiz.questions[3].referenceSegmentIndex).toBe(7);
    expect(quiz.questions[4].referenceSegmentIndex).toBe(9);
    expect(quiz.questions[5].referenceSegmentIndex).toBe(10);
    expect(quiz.questions[6].referenceSegmentIndex).toBe(13);
    expect(quiz.questions[7].referenceSegmentIndex).toBe(16);

    for (const q of quiz.questions) {
      expect(q.options[q.correctAnswer]).toBe(q.optionsEn![q.correctAnswer]);
      expect(q.optionsVi![q.correctAnswer].length).toBeGreaterThan(5);
      expect(q.targetedConceptEn?.length).toBeGreaterThan(5);
      expect(q.targetedConceptVi?.length).toBeGreaterThan(5);
    }
  });
});
