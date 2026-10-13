import { describe, it, expect } from "vitest";
import {
  LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE,
  QUIZ_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE,
} from "../features/listening/data/lessons/movies/inspirational/lesson_good_will_hunting";

describe("Good Will Hunting: Park Bench Monologue (mov_insp_01) - Verbatim Deep Audit Suite", () => {
  const segments = LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE.segments;

  it("Test 1: Verbatim Audit of Park Bench Setup & Swans Banter (Segments 0-9)", () => {
    expect(segments[0].text).toBe("So what's this? Taste this choice moment between guys?");
    expect(segments[1].text).toBe("This is really nice.");
    expect(segments[2].text).toContain("You got a thing for swans? Cause it's like a fetish");
    expect(segments[3].text).toBe("Thought about what you said to me the other day.");
    expect(segments[4].text).toBe("About my painting.");
    expect(segments[5].text).toBe("Yeah.");
    expect(segments[6].text).toBe("Stayed up half the night thinking about it.");
    expect(segments[7].text).toBe("Something occurred to me, and I fell into a deep, peaceful sleep, and I haven't thought about you since.");
    expect(segments[8].text).toBe("You know what occurred to me?");
    expect(segments[9].text).toBe("No.");
  });

  it("Test 2: Verbatim Audit of Boston Origins & Art vs. Sistine Chapel (Segments 10-20)", () => {
    expect(segments[10].text).toBe("You're just a kid.");
    expect(segments[11].text).toBe("You don't have the faintest idea what you're talking about.");
    expect(segments[12].text).toBe("Why, thank you.");
    expect(segments[13].text).toBe("It's all right. You've never been out of Boston.");
    expect(segments[13].properNouns).toContain("Boston");
    expect(segments[14].text).toBe("Nope.");

    // Art and Michelangelo
    expect(segments[15].text).toBe("So if I asked you about art, you'd probably give me the skinny on every art book ever written.");
    expect(segments[16].text).toBe("Michelangelo, you know a lot about him.");
    expect(segments[16].properNouns).toContain("Michelangelo");
    expect(segments[17].text).toContain("Life's work, political aspirations, him and the Pope, sexual orientation, the whole works, right?");
    expect(segments[17].properNouns).toContain("Pope");
    expect(segments[18].text).toBe("But I'll bet you can't tell me what it smells like in the Sistine Chapel.");
    expect(segments[18].properNouns).toContain("Sistine Chapel");
    expect(segments[19].text).toBe("You've never actually stood there and looked up at that beautiful ceiling.");
    expect(segments[20].text).toBe("Seen that.");
  });

  it("Test 3: Verbatim Audit of Women & Waking Up Truly Happy (Segments 21-24)", () => {
    expect(segments[21].text).toBe("If I ask you about women, you'd probably give me a syllabus on your personal favorites.");
    expect(segments[22].text).toBe("You may have even been laid a few times.");
    expect(segments[23].text).toBe("But you can't tell me what it feels like to wake up next to a woman and feel truly happy.");
    expect(segments[24].text).toBe("You're a tough kid.");
  });

  it("Test 4: Verbatim Audit of War, Shakespeare & Best Friend Dying in Lap (Segments 25-27)", () => {
    expect(segments[25].text).toContain("If I ask you about war, you'd probably throw Shakespeare at me, right?");
    expect(segments[25].text).toContain("'Once more unto the breach, dear friends...'");
    expect(segments[25].properNouns).toContain("Shakespeare");
    expect(segments[26].text).toBe("But you've never been near one.");
    expect(segments[27].text).toBe("You've never held your best friend's head in your lap...");
  });

  it("Test 5: Verbatim Audit of True Love, Vulnerability & Sleeping in Hospital with Cancer (Segments 28-35)", () => {
    const allText = segments.map((s) => s.text).join(" ");

    expect(allText).toContain("watched him gasp his last breath, looking to you for help.");
    expect(allText).toContain("If I ask you about love, you'd probably quote me a sonnet.");
    expect(allText).toContain("never looked at a woman and been totally vulnerable.");
    expect(allText).toContain("Known someone that could level you with her eyes");
    expect(allText).toContain("feeling like God put an angel on Earth just for you");
    expect(allText).toContain("who could rescue you from the depths of hell.");
    expect(allText).toContain("have that love for her be there forever");
    expect(allText).toContain("through anything... through cancer");
    expect(allText).toContain("sleeping sitting up in a hospital room for two months holding her hand");
    expect(allText).toContain("the terms 'visiting hours' don't apply to you.");
  });

  it("Test 6: Verbatim Audit of Real Loss & The Scared-Shitless Genius (Segments 36-41)", () => {
    const allText = segments.map((s) => s.text).join(" ");

    expect(allText).toContain("You don't know about real loss");
    expect(allText).toContain("because that only occurs when you love something more than you love yourself.");
    expect(allText).toContain("I doubt you've ever dared to love anybody that much.");
    expect(allText).toContain("I don't see an intelligent, confident man.");
    expect(allText).toContain("I see a cocky, scared-shitless kid.");
    expect(allText).toContain("you're a genius, Will. No one denies that.");
    expect(allText).toContain("No one could possibly understand the depths of you.");
    expect(allText).toContain("You ripped my life apart.");
  });

  it("Test 7: Verbatim Audit of Oliver Twist, Honest Self-Disclosure & 'Your move, chief' (Segments 42-55)", () => {
    const allText = segments.map((s) => s.text).join(" ");

    expect(allText).toContain("You're an orphan, right?");
    expect(allText).toContain("Do you think I'd know the first thing about how hard your life has been");
    expect(allText).toContain("because I read Oliver Twist? Does that encapsulate you?");
    expect(allText).toContain("I can't learn anything from you I can't read in some book.");
    expect(allText).toContain("Unless you want to talk about you, who you are.");
    expect(allText).toContain("Then I'm fascinated. I'm in.");
    expect(allText).toContain("You're terrified of what you might say.");
    expect(allText).toContain("Your move, chief.");

    // Quiz cross-reference check
    const quiz = QUIZ_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE;
    for (const q of quiz.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      const targetSeg = segments[q.referenceSegmentIndex!];
      expect(targetSeg).toBeDefined();
      expect(targetSeg.orderIndex).toBe(q.referenceSegmentIndex);
    }
  });
});
