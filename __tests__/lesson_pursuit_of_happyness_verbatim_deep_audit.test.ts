import { describe, it, expect } from "vitest";
import {
  LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS,
  QUIZ_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS,
} from "../features/listening/data/lessons/movies/inspirational/lesson_pursuit_of_happyness";

describe("The Pursuit of Happyness: Job Interview & Dream Speech (mov_insp_02) - Verbatim Deep Audit Suite", () => {
  const segments = LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS.segments;

  it("Test 1: Verbatim Audit of Host Intro & Preparation (Segments 0-8)", () => {
    expect(segments[0].text).toBe("Do you want to learn English with an inspiring movie?");
    expect(segments[1].text).toBe("Let's do today with Will Smith in The Pursuit of Happyness.");
    expect(segments[1].properNouns).toContain("Will Smith");
    expect(segments[1].properNouns).toContain("The Pursuit of Happyness");

    expect(segments[2].text).toContain("pay special attention to the formal language");
    expect(segments[3].text).toContain("preparing for a job interview in English");
    expect(segments[4].text).toContain("American pronunciation and connected speech");
    expect(segments[4].properNouns).toContain("American");

    expect(segments[5].text).toBe("By the way, do you want to be able to understand natives at any speed without getting lost?");
    expect(segments[6].text).toBe("Without missing the jokes, and without subtitles?");
    expect(segments[7].text).toBe("Well, then be sure to subscribe so that we can help you do it.");
    expect(segments[8].text).toBe("Now let's learn English with Will Smith!");
  });

  it("Test 2: Verbatim Audit of Office Entry & Radical Honesty (Segments 9-18)", () => {
    expect(segments[9].text).toBe("Mr. Gardner. This way. It'll be right over there.");
    expect(segments[9].properNouns).toContain("Gardner");

    expect(segments[10].text).toBe("Chris Gardner.");
    expect(segments[11].text).toBe("Chris Gardner. How are you? Good morning.");
    expect(segments[12].text).toBe("Chris Gardner. Good to see you again. Chris Gardner, pleasure.");

    expect(segments[13].text).toBe(
      "I've been sitting out there for the last half-hour trying to come up with a story that would explain my being here dressed like this."
    );
    expect(segments[14].text).toBe(
      "And I wanted to come up with a story that would demonstrate qualities that I'm sure you all admire here, like earnestness, or diligence, or team-playing, something."
    );
    expect(segments[15].text).toBe("And I couldn't think of anything.");
    expect(segments[16].text).toBe("So the truth is, I was arrested for failure to pay parking tickets.");
    expect(segments[17].text).toBe("Parking tickets?");
    expect(segments[18].text).toBe("And I ran all the way here from the Polk Station, the police station.");
    expect(segments[18].properNouns).toContain("Polk Station");
  });

  it("Test 3: Verbatim Audit of Apartment Painting & 40-Pound Gizmo (Segments 19-26)", () => {
    expect(segments[19].text).toBe("What were you doing before you were arrested?");
    expect(segments[20].text).toBe("I was painting my apartment.");
    expect(segments[21].text).toBe("Is it dry now?");
    expect(segments[22].text).toBe("I hope so.");

    expect(segments[23].text).toBe("Jay says you're pretty determined.");
    expect(segments[23].properNouns).toContain("Jay");

    expect(segments[24].text).toBe(
      "He's been waiting outside the front of the building with some 40-pound gizmo for over a month."
    );
    expect(segments[25].text).toBe("He says you're smart?");
    expect(segments[26].text).toBe("I'd like to think so.");
  });

  it("Test 4: Verbatim Audit of Navy Radar Class & Integrity Commitment (Segments 27-45)", () => {
    expect(segments[27].text).toBe("And you want to learn this business?");
    expect(segments[28].text).toBe("Yes, sir, I wanna learn this business.");
    expect(segments[29].text).toBe("Have you already started learning on your own?");
    expect(segments[30].text).toBe("Absolutely.");

    expect(segments[31].text).toBe("Jay?");
    expect(segments[32].text).toBe("Yes, sir?");
    expect(segments[33].text).toBe("How many times have you seen Chris?");
    expect(segments[34].text).toBe("I don't know. One too many, apparently.");
    expect(segments[35].text).toBe("Was he dressed like this?");
    expect(segments[36].text).toBe("No. Jacket and tie.");

    expect(segments[37].text).toBe("First in your class in school? High school?");
    expect(segments[38].text).toBe("Yes, sir.");
    expect(segments[39].text).toBe("How many in the class?");
    expect(segments[40].text).toBe("Twelve. It was a small town.");
    expect(segments[41].text).toBe("I'll say.");
    expect(segments[42].text).toBe(
      "But I was also first in my radar class in the Navy, and that was a class of twenty."
    );
    expect(segments[42].properNouns).toContain("Navy");

    expect(segments[43].text).toBe("Can I say something?");
    expect(segments[44].text).toBe(
      "I'm the type of person, if you ask me a question and I don't know the answer, I'm gonna tell you that I don't know."
    );
    expect(segments[45].text).toBe(
      "But I bet you what, I know how to find the answer, and I will find the answer. Is that fair enough?"
    );
  });

  it("Test 5: Verbatim Audit of Punchline & Language Breakdown (Segments 46-63)", () => {
    expect(segments[46].text).toBe(
      "Chris, what would you say if a guy walked in for an interview without a shirt on, and I hired him? What would you say?"
    );
    expect(segments[47].text).toBe("He must've had on some really nice pants.");

    expect(segments[48].text).toContain("break down the most essential vocabulary");
    expect(segments[49].text).toContain("come up with a story");
    expect(segments[50].text).toContain("think of or produce an idea, excuse, or plan");

    expect(segments[51].text).toContain("earnestness");
    expect(segments[51].text).toContain("diligence");
    expect(segments[51].text).toContain("team-playing");

    expect(segments[53].text).toContain("arrested for failure to pay parking tickets");
    expect(segments[54].text).toContain("neglecting or omitting to fulfill an obligation");

    expect(segments[55].text).toContain("40-pound gizmo");
    expect(segments[56].text).toContain("gadget or device whose exact technical name you don't recall");

    expect(segments[57].text).toContain("I'd like to think so");
    expect(segments[58].text).toContain("polite, humble way to express self-confidence");

    expect(segments[59].text).toContain("I bet you what");
    expect(segments[60].text).toContain("blends together into 'betcha'");

    expect(segments[61].text).toContain("He must've had on some really nice pants");
    expect(segments[62].text).toContain("past deduction of high probability");
    expect(segments[63].text).toContain("defuse tension and prove your emotional intelligence");
  });

  it("Test 6: Verbatim Audit of Basketball Speech & Life Wisdom (Segments 64-70)", () => {
    expect(segments[64].text).toBe(
      "Hey. Don't ever let somebody tell you you can't do something. Not even me. All right?"
    );
    expect(segments[65].text).toBe("All right.");
    expect(segments[66].text).toBe("You got a dream... You gotta protect it.");
    expect(segments[67].text).toBe(
      "People can't do something themselves, they wanna tell you you can't do it."
    );
    expect(segments[68].text).toBe("If you want something, go get it. Period.");
    expect(segments[69].text).toBe("This part of my life, this little part, is called happiness.");
    expect(segments[70].text).toBe("It was the moment I realized perseverance truly breaks barriers.");
  });

  it("Test 7: Verbatim Audit of Unsubtitled Review, Closing & Quiz Validation (Segments 71-79)", () => {
    expect(segments[71].text).toContain("watch the full interview scene again without any subtitles");
    expect(segments[72].text).toBe("So the truth is, I was arrested for failure to pay parking tickets.");
    expect(segments[73].text).toBe("I know how to find the answer, and I will find the answer. Is that fair enough?");
    expect(segments[74].text).toBe("He must've had on some really nice pants.");

    expect(segments[75].text).toContain("How much did you understand this time?");
    expect(segments[76].text).toContain("Alright, I hope you had a lot of fun with today's lesson.");
    expect(segments[77].text).toContain("Go check out the movie, it's really inspiring.");
    expect(segments[78].text).toContain("Also, be sure to hit subscribe");
    expect(segments[79].text).toContain("go beyond the classroom and live your English. Aww yeah!");

    // Quiz cross-reference audit
    const quiz = QUIZ_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS;
    for (const q of quiz.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      const targetSeg = segments[q.referenceSegmentIndex!];
      expect(targetSeg).toBeDefined();
      expect(targetSeg.text.length).toBeGreaterThan(0);
    }
  });
});
