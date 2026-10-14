import { describe, it, expect } from "vitest";
import {
  LESSON_TED_SCIENCE_HABITS,
  QUIZ_TED_SCIENCE_HABITS,
} from "../features/listening/data/lessons/lesson_ted_science_habits";

describe("TED-Ed: The Science of Habits (vid_ted_science_habits) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Nail-Biting & The Universal Struggle with Habits (Segments 0-2)", () => {
    const segments = LESSON_TED_SCIENCE_HABITS.segments;
    expect(segments[0].text).toBe("Billions of people deal with a nail-biting habit at some point in their lives.");
    expect(segments[0].keywords).toContain("nail-biting");

    expect(segments[1].text).toContain("rubbing chili peppers on their cuticles");
    expect(segments[1].text).toContain("envisioning bacteria crawling on their fingers");
    expect(segments[1].keywords).toContain("go to great lengths");

    expect(segments[2].text).toContain("most of us do have a habit we'd like to kick. So what's the best way to break one?");
    expect(segments[2].keywords).toContain("break a habit");
  });

  it("Audit 2: Scientific Definition of Habits & Daily Routines (Segments 3-6)", () => {
    const segments = LESSON_TED_SCIENCE_HABITS.segments;
    expect(segments[3].text).toContain("Scientists define habits as behaviors that are performed regularly");
    expect(segments[3].text).toContain("cued subconsciously in response to certain environments");
    expect(segments[3].keywords).toContain("define habits");

    expect(segments[4].text).toContain("ingrained in daily routines, like staying up late or brewing your coffee in the morning.");
    expect(segments[4].keywords).toContain("ingrained in daily routines");

    expect(segments[5].text).toBe("If you do something frequently, without much deliberation, then it’s likely a habit.");
    expect(segments[5].keywords).toContain("without much deliberation");

    expect(segments[6].text).toBe("They form because at some point your brain learns that the behavior is beneficial.");
  });

  it("Audit 3: The Neuroscience of Habits: Dopamine, Neuroplasticity & Wire and Fire (Segments 7-12)", () => {
    const segments = LESSON_TED_SCIENCE_HABITS.segments;
    expect(segments[7].text).toContain("after opening a stressful email, you bite your nails.");
    expect(segments[7].text).toContain("curbing your email fueled anxiety.");

    expect(segments[8].text).toContain("trigger the release of dopamine, a neurotransmitter that mediates feelings of pleasure.");
    expect(segments[8].keywords).toContain("dopamine");

    expect(segments[9].text).toBe("Dopamine is also a driver of neuroplasticity, meaning it can change how your neurons wire and fire.");
    expect(segments[9].keywords).toContain("driver of neuroplasticity");
    expect(segments[9].keywords).toContain("wire and fire");

    expect(segments[10].text).toBe("Your brain builds connections that link the reward with the behavior, driving you to repeat it.");

    expect(segments[11].text).toBe("It also starts associating the behavior with other cues, like your environment.");

    expect(segments[12].text).toContain("sitting at your desk to subconsciously trigger a nail-biting habit—no stressful email or sense of relief required.");
  });

  it("Audit 4: The Cue-Behavior-Reward Loop & 40% Daily Automation (Segments 13-17)", () => {
    const segments = LESSON_TED_SCIENCE_HABITS.segments;
    expect(segments[13].text).toBe("Once established, these cue-behavior-reward loops work fast, outpacing the decision-making process.");
    expect(segments[13].keywords).toContain("outpacing decision-making");

    expect(segments[14].text).toBe("You may find yourself engaging in a habit before you have the chance to notice and stop.");

    expect(segments[15].text).toContain("stored memories of what’s worked in the past, which allow you to take swift action in the present.");

    expect(segments[16].text).toContain("One study estimated that on average, people spend more than 40% of their days");
    expect(segments[16].keywords).toContain("more than 40%");

    expect(segments[17].text).toContain("A seemingly automated morning routine, for example, saves you both time and precious mental energy.");
  });

  it("Audit 5: Intentions Failure & Modifying Environmental Cues (Segments 18-23)", () => {
    const segments = LESSON_TED_SCIENCE_HABITS.segments;
    expect(segments[18].text).toContain("intentions alone often fail to lead to long-term behavior change.");
    expect(segments[18].keywords).toContain("intentions alone fail");

    expect(segments[19].text).toContain("understanding the basis of habits, you can create better plans for changing them.");

    expect(segments[20].text).toContain("Lying in bed may cause you to endlessly scroll through your phone");
    expect(segments[20].text).toContain("watching TV on the couch may lead you to grab a sugary snack.");

    expect(segments[21].text).toBe("One of the most effective ways to manage behavior is to identify these locations or times of day.");

    expect(segments[22].text).toContain("creating obstacles that make it more difficult to perform the habit in that space.");
    expect(segments[22].keywords).toContain("creating obstacles");

    expect(segments[23].text).toContain("Moving, switching jobs, or even starting a new schedule, are particularly great times");
  });

  it("Audit 6: The 2005 University Transfer Study (Segments 24-25)", () => {
    const segments = LESSON_TED_SCIENCE_HABITS.segments;
    expect(segments[24].text).toContain("One 2005 study tracked university students’ exercising, reading, and TV watching habits");
    expect(segments[24].keywords).toContain("2005 study");

    expect(segments[25].text).toBe("When students were no longer around old environments and routines, their habits, even the strong ones, significantly changed.");
    expect(segments[25].keywords).toContain("significantly changed");
  });

  it("Audit 7: Habit Reversal Training & Competing Responses (Segments 26-29)", () => {
    const segments = LESSON_TED_SCIENCE_HABITS.segments;
    expect(segments[26].text).toContain("a practice called habit reversal training can be helpful.");
    expect(segments[26].keywords).toContain("habit reversal training");

    expect(segments[27].text).toContain("Developed by psychologists in the 1970s, the aim is to change a habit by replacing it with another one that’s less detrimental.");

    expect(segments[28].text).toBe("The training requires you to analyze and understand your habit cues, so you can effectively intervene at the right times.");

    expect(segments[29].text).toContain("preemptively keep a fidget toy at your desk.");
    expect(segments[29].text).toContain("use the toy when you feel the urge to bite your nails.");
    expect(segments[29].keywords).toContain("fidget toy");
  });

  it("Audit 8: Patience, Grace & Celebrating Good Habits (Segments 30-31)", () => {
    const segments = LESSON_TED_SCIENCE_HABITS.segments;
    expect(segments[30].text).toBe("Breaking a habit takes time, so remember to give yourself grace and have patience through the process.");
    expect(segments[30].keywords).toContain("give yourself grace");

    expect(segments[31].text).toBe("And while many focus on their bad habits, it’s also worth celebrating the good ones that help us move swiftly and successfully through our daily routines.");
    expect(segments[31].keywords).toContain("worth celebrating");
  });

  it("Audit 9: Reading Comprehension Quiz Reference Segment Cross-Validation (1-indexed)", () => {
    const quiz = QUIZ_TED_SCIENCE_HABITS;
    const segments = LESSON_TED_SCIENCE_HABITS.segments;

    // Q1: Extreme strategies -> Segment 2
    expect(quiz.questions[0].referenceSegmentIndex).toBe(2);
    expect(segments[quiz.questions[0].referenceSegmentIndex! - 1].text).toContain("rubbing chili peppers on their cuticles");

    // Q2: Definition of habit -> Segment 4
    expect(quiz.questions[1].referenceSegmentIndex).toBe(4);
    expect(segments[quiz.questions[1].referenceSegmentIndex! - 1].text).toContain("Scientists define habits");

    // Q3: Dopamine & neuroplasticity -> Segment 9
    expect(quiz.questions[2].referenceSegmentIndex).toBe(9);
    expect(segments[quiz.questions[2].referenceSegmentIndex! - 1].text).toContain("dopamine");

    // Q4: Habit loop outpacing decision-making -> Segment 14
    expect(quiz.questions[3].referenceSegmentIndex).toBe(14);
    expect(segments[quiz.questions[3].referenceSegmentIndex! - 1].text).toContain("outpacing the decision-making process");

    // Q5: 40% daily automated routine -> Segment 17
    expect(quiz.questions[4].referenceSegmentIndex).toBe(17);
    expect(segments[quiz.questions[4].referenceSegmentIndex! - 1].text).toContain("more than 40% of their days");

    // Q6: Intentions & environmental friction -> Segment 23
    expect(quiz.questions[5].referenceSegmentIndex).toBe(23);
    expect(segments[quiz.questions[5].referenceSegmentIndex! - 1].text).toContain("creating obstacles");

    // Q7: 2005 transfer study -> Segment 26
    expect(quiz.questions[6].referenceSegmentIndex).toBe(26);
    expect(segments[quiz.questions[6].referenceSegmentIndex! - 1].text).toContain("significantly changed");

    // Q8: Habit Reversal Training & fidget toy -> Segment 28
    expect(quiz.questions[7].referenceSegmentIndex).toBe(28);
    expect(segments[quiz.questions[7].referenceSegmentIndex! - 1].text).toContain("replacing it with another one that’s less detrimental");
  });
});
