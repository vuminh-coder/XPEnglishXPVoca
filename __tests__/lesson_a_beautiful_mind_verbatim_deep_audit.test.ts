import { describe, it, expect } from "vitest";
import {
  LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH,
  QUIZ_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH,
} from "../features/listening/data/lessons/movies/inspirational/lesson_a_beautiful_mind";

describe("A Beautiful Mind: John Nash Nobel Speech (mov_insp_09) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Princeton Campus Approach & Reality Verification (Segments 0-6)", () => {
    const segments = LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH.segments;
    expect(segments[1].text).toBe("Excuse me, Professor Nash?");
    expect(segments[1].properNouns).toContain("Nash");

    expect(segments[2].text).toBe("Can you see him? Forgive me, I'm just always suspicious of new people.");
    expect(segments[2].translationVi).toContain("Cậu có nhìn thấy ông ta không?");

    expect(segments[4].text).toBe("So now that I know that you are real, what can I do for you?");
    expect(segments[5].text).toBe("My name is Thomas King. I'm from the Nobel Committee.");
    expect(segments[5].properNouns).toEqual(expect.arrayContaining(["Thomas King", "Nobel Committee"]));

    expect(segments[6].text).toBe("And I'm here to tell you that you're being considered for the Nobel Prize.");
    expect(segments[6].properNouns).toContain("Nobel Prize");
  });

  it("Audit 2: Equilibrium, Manifold Embedding & Tea Room Conversation (Segments 7-16)", () => {
    const segments = LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH.segments;
    expect(segments[7].text).toContain("equilibrium has become a cornerstone of modern economics");
    expect(segments[7].keywords).toContain("cornerstone of modern economics");

    expect(segments[9].text).toContain("manifold embedding");
    expect(segments[9].text).toContain("bargaining problem to FCC bandwidth auctions");
    expect(segments[9].properNouns).toContain("FCC");

    expect(segments[11].text).toBe("I don't go in there. I usually just eat my sandwich in the library.");
    expect(segments[13].text).toContain("commercially available brands of tea are not suitable to my palate");
    expect(segments[14].text).toContain("northern Indian teas");
  });

  it("Audit 3: Direct Inquiry: Squawk Like a Chicken & Diet of the Mind (Segments 21-26)", () => {
    const segments = LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH.segments;
    expect(segments[21].text).toBe("Ah, I see. So you came here to find out if I was crazy?");
    expect(segments[22].text).toBe("To find out if I'd screw everything up: dance around the podium, strip naked, and squawk like a chicken?");
    expect(segments[22].keywords).toContain("squawk like a chicken");

    expect(segments[24].text).toContain("I take the newer medications");
    expect(segments[25].text).toBe("I still see things that are not here. I just choose not to acknowledge them.");
    expect(segments[25].translationVi).toContain("lựa chọn không thèm đoái hoài thừa nhận chúng");

    expect(segments[26].text).toContain("Like a diet of the mind, I choose not to indulge certain appetites");
    expect(segments[26].keywords).toContain("diet of the mind");
  });

  it("Audit 4: The Sacred Princeton Pen Ceremony (Segments 27-32)", () => {
    const segments = LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH.segments;
    expect(segments[27].text).toContain("senior Princeton professor approaches the table, unclips his fountain pen");
    expect(segments[27].properNouns).toEqual(expect.arrayContaining(["Princeton", "Nash"]));

    expect(segments[28].text).toBe("Professor Nash, it's good to have you here, John.");
    expect(segments[29].text).toBe("It's an honor, sir.");
    expect(segments[30].text).toBe("A privilege, Professor.");

    expect(segments[31].text).toContain("distinguished faculty members line up silently, offering their cherished pens");
    expect(segments[32].text).toBe("Thank you. That was certainly most unexpected.");
  });

  it("Audit 5: Stockholm Nobel Acceptance Speech & Mysterious Equations of Love (Segments 33-43)", () => {
    const segments = LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH.segments;
    expect(segments[33].text).toContain("Nobel Prize in Economics");
    expect(segments[33].properNouns).toEqual(expect.arrayContaining(["Stockholm", "John Nash"]));

    expect(segments[34].text).toBe("I've always believed in numbers, in the equations and logics that lead to reason.");
    expect(segments[35].text).toBe("But after a lifetime of such pursuits, I ask: what truly is logic? Who decides reason?");

    expect(segments[36].text).toBe("My quest has taken me through the physical, the metaphysical, the delusional, and back.");
    expect(segments[36].keywords).toContain("delusional and back");

    expect(segments[37].text).toBe("And I have made the most important discovery of my career, the most important discovery of my life:");
    expect(segments[38].text).toBe("It is only in the mysterious equations of love that any logical reasons can be found.");
    expect(segments[38].translationVi).toContain("phương trình bí ẩn của tình yêu thương");

    expect(segments[40].text).toBe("I am only here tonight because of you.");
    expect(segments[41].text).toBe("You are the reason I am.");
    expect(segments[42].text).toBe("You are all my reasons.");
  });

  it("Audit 6: Post-Gala Marble Lobby & The Harmless Delusions (Segments 46-54)", () => {
    const segments = LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH.segments;
    expect(segments[46].text).toContain("step into the quiet marble lobby");
    expect(segments[47].text).toBe("Shall I call for the car? Are you ready to go now?");
    expect(segments[48].text).toBe("Because I am. Yes indeed, yes. Thank you so much.");

    expect(segments[50].text).toBe("What is it, John? What's wrong?");
    expect(segments[51].text).toBe("Nothing.");

    expect(segments[52].text).toContain("Charles, young Marcee, and Parcher stand quietly watching him—unvanquished, yet completely harmless.");
    expect(segments[52].properNouns).toEqual(expect.arrayContaining(["Charles", "Marcee", "Parcher"]));
    expect(segments[52].keywords).toContain("harmless");

    expect(segments[53].text).toBe("Come with me, young lady.");
    expect(segments[54].text).toContain("walk out into the crisp Swedish night, embracing the triumph of a beautiful mind");
  });

  it("Audit 7: Quiz Reference Indices & Semantic Alignment (1-indexed)", () => {
    const quiz = QUIZ_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH;
    const segments = LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH.segments;

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
    const q1 = quiz.questions[0]; // Reality check
    expect(q1.question).toContain("can see Thomas King");
    expect(q1.options[q1.correctAnswer]).toContain("schizophrenic hallucination");

    const q2 = quiz.questions[1]; // King motive
    expect(q2.question).toContain("Thomas King");
    expect(q2.options[q2.correctAnswer]).toContain("mental stability");

    const q3 = quiz.questions[2]; // Diet of the mind
    expect(q3.question).toContain("manages his unceasing hallucinations");
    expect(q3.options[q3.correctAnswer]).toContain("diet of the mind");

    const q4 = quiz.questions[3]; // Pen ceremony
    expect(q4.question).toContain("Pen Ceremony");
    expect(q4.options[q4.correctAnswer]).toContain("traditional gesture of reverence");

    const q5 = quiz.questions[4]; // Logic question
    expect(q5.question).toContain("human reason");
    expect(q5.options[q5.correctAnswer]).toContain("truly is logic");

    const q6 = quiz.questions[5]; // Discovery
    expect(q6.question).toContain("most important discovery of my life");
    expect(q6.options[q6.correctAnswer]).toContain("mysterious equations of love");

    const q7 = quiz.questions[6]; // Charles Marcee Parcher
    expect(q7.question).toContain("enduring status");
    expect(q7.options[q7.correctAnswer]).toContain("Charles, Marcee, and Parcher");

    const q8 = quiz.questions[7]; // Central thesis
    expect(q8.question).toContain("central emotional thesis");
    expect(q8.options[q8.correctAnswer]).toContain("spousal loyalty");
  });
});
