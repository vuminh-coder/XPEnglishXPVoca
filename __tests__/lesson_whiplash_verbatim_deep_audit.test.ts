import { describe, it, expect } from "vitest";
import {
  LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL,
  QUIZ_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL,
} from "../features/listening/data/lessons/movies/inspirational/lesson_whiplash";

describe("Whiplash: Not My Tempo Masterclass (mov_insp_07) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Opening Warmup & Deceptive Kindness (Segments 0-4)", () => {
    const segments = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments;
    expect(segments[0].text).toBe("All right man, have fun.");
    expect(segments[2].text).toBe("All right gang, Whiplash.");
    expect(segments[2].properNouns).toContain("Whiplash");

    expect(segments[3].text).toBe("Little under tempo, okay? Neyman, just do your best.");
    expect(segments[3].properNouns).toContain("Neyman");
    expect(segments[3].translationVi).toContain("Neyman, cứ cố gắng hết sức là được");
  });

  it("Audit 2: Incremental Tempo Critique & Escalation (Segments 5-19)", () => {
    const segments = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments;
    expect(segments[5].text).toBe("Feel like Buddy Rich here?");
    expect(segments[5].properNouns).toContain("Buddy Rich");

    expect(segments[8].text).toBe("Not... not quite my tempo.");
    expect(segments[8].translationVi).toContain("Chưa... chưa chuẩn nhịp của tôi");

    expect(segments[12].text).toBe("Bar 17, the end of four. Got it?");
    expect(segments[15].text).toBe("You're rushing. Here we go.");
    expect(segments[17].text).toBe("Dragging just a hair. Wait for my cue.");
    expect(segments[17].keywords).toContain("dragging just a hair");

    expect(segments[19].text).toBe("Rushing!");
  });

  it("Audit 3: Violent Chair Throw & Rushing or Dragging Interrogation (Segments 20-24)", () => {
    const segments = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments;
    expect(segments[20].text).toBe("Why do you suppose I just hurled a chair at your head, Neyman?");
    expect(segments[20].translationVi).toContain("quăng cả cái ghế vào đầu cậu");

    expect(segments[21].text).toBe("I... I don't know.");
    expect(segments[22].text).toBe("Sure you do.");
    expect(segments[23].text).toBe("The tempo. Were you rushing or were you dragging?");
    expect(segments[24].text).toBe("I... I don't know.");
  });

  it("Audit 4: Slap Counts & Gut You Like a Pig Threat (Segments 25-34)", () => {
    const segments = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments;
    expect(segments[25].text).toBe("Start counting! Five, six, seven, four... damn it, look at me!");
    expect(segments[27].text).toBe("Now, was I rushing or was I dragging?");
    expect(segments[30].text).toBe("Rushing.");

    expect(segments[31].text).toBe("So you DO know the difference!");
    expect(segments[32].text).toBe("If you deliberately sabotage my band, I will gut you like a pig.");
    expect(segments[32].translationVi).toContain("mổ bụng cậu như mổ lợn");

    expect(segments[33].text).toBe("Now, are you a rusher or are you a dragger, or are you going to be on my time?");
    expect(segments[34].text).toBe("I'm going to be on your time.");
  });

  it("Audit 5: Music Theory Quiz & Sheet Reading (Segments 35-43)", () => {
    const segments = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments;
    expect(segments[35].text).toBe("What does that say? Quarter note equals 215.");
    expect(segments[36].text).toBe("Count me a 215. A one, two, three, four. One, two, three, four...");
    expect(segments[38].text).toBe("Can you even read music? What is that? Eighth note?");
    expect(segments[39].text).toBe("Yes.");
    expect(segments[40].text).toBe("What is that? Dotted sixteenth note?");
    expect(segments[41].text).toBe("Sight-read measure 101. Play the goddamn kit!");
    expect(segments[42].text).toBe("Now answer my question: were you rushing or were you dragging?");
    expect(segments[43].text).toBe("Rushing.");
  });

  it("Audit 6: Single-Tear Humiliation & Eugene O'Neill Breakdown (Segments 44-58)", () => {
    const segments = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments;
    expect(segments[44].text).toBe("Oh my dear God. Are you one of those single-tear people?");
    expect(segments[45].text).toBe("Do I look like a double rainbow to you?");
    expect(segments[46].text).toBe("You must be upset. Are you upset?");
    expect(segments[47].text).toBe("No.");
    expect(segments[48].text).toBe("No? So you just don't give a damn about any of this? Are you upset, yes or no?");
    expect(segments[49].text).toBe("Yes.");

    expect(segments[50].text).toBe("Say it so the whole band can hear you!");
    expect(segments[51].text).toBe("I'm upset.");
    expect(segments[52].text).toBe("Louder!");
    expect(segments[53].text).toBe("I'm upset!");

    expect(segments[54].text).toContain("Eugene O'Neill");
    expect(segments[54].properNouns).toContain("Eugene O'Neill");
    expect(segments[54].text).toContain("weeping and slobbering all over my drum set like a nine-year-old girl");

    expect(segments[57].text).toBe("Carl, take over. Start practicing harder, Neyman.");
    expect(segments[57].properNouns).toEqual(expect.arrayContaining(["Carl", "Neyman"]));

    expect(segments[58].text).toBe("Whiplash, bar 125, big boy tempo, five, six...");
    expect(segments[58].keywords).toContain("big boy tempo");
  });

  it("Audit 7: Quiz Reference Indices & Semantic Alignment (1-indexed)", () => {
    const quiz = QUIZ_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL;
    const segments = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments;

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
    const q1 = quiz.questions[0]; // False sense of security
    expect(q1.question).toContain("false sense of security");
    expect(q1.options[q1.correctAnswer]).toContain("reduced tempo");

    const q2 = quiz.questions[1]; // Rushing vs dragging
    expect(q2.question).toContain("rushing");
    expect(q2.options[q2.correctAnswer]).toContain("ahead of the designated tempo");

    const q3 = quiz.questions[2]; // Chair
    expect(q3.question).toContain("physical act of aggression");
    expect(q3.options[q3.correctAnswer]).toContain("chair");

    const q4 = quiz.questions[3]; // Slapping
    expect(q4.question).toContain("slapping");
    expect(q4.options[q4.correctAnswer]).toContain("slaps Andrew");

    const q5 = quiz.questions[4]; // Gut like a pig
    expect(q5.question).toContain("sabotaging");
    expect(q5.options[q5.correctAnswer]).toContain("gut you like a pig");

    const q6 = quiz.questions[5]; // Eugene O'Neill
    expect(q6.question).toContain("vulnerability");
    expect(q6.options[q6.correctAnswer]).toContain("Eugene O'Neill");

    const q7 = quiz.questions[6]; // Big boy tempo
    expect(q7.question).toContain("big boy tempo");
    expect(q7.options[q7.correctAnswer]).toContain("blistering professional concert speed");

    const q8 = quiz.questions[7]; // Good job
    expect(q8.question).toContain("philosophy");
    expect(q8.options[q8.correctAnswer]).toContain("good job");
  });
});
