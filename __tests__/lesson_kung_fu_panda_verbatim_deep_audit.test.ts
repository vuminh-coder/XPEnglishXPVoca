import { describe, it, expect } from "vitest";
import {
  LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE,
  QUIZ_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE,
} from "../features/listening/data/lessons/movies/animation/lesson_kung_fu_panda";

describe("Kung Fu Panda: Master Oogway Wisdom & The Peach Tree (mov_ani_01) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: RealLife Fluency Opening & Voice Cast Introduction (Segments 0-3)", () => {
    const segments = LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments;
    expect(segments[0].text).toContain("Today, we're learning English with Kung Fu Panda! Aww Yeah!");
    expect(segments[0].keywords).toEqual(
      expect.arrayContaining(["Kung Fu Panda", "learning English", "fluency coach"])
    );

    expect(segments[1].text).toContain("Angelina Jolie, Dustin Hoffman, Jack Black, Lucy Liu, and Jackie Chan");
    expect(segments[1].properNouns).toEqual(
      expect.arrayContaining(["Angelina Jolie", "Dustin Hoffman", "Jack Black", "Lucy Liu", "Jackie Chan"])
    );

    expect(segments[2].text).toContain("lazy panda and an unlikely hero named Po");
    expect(segments[2].keywords).toEqual(
      expect.arrayContaining(["unlikely hero", "kung fu master"])
    );

    expect(segments[3].text).toContain("learn English without getting lost, without missing the jokes");
  });

  it("Audit 2: The Comedic Acupuncture Sequence with Mantis & Facial Nerve (Segments 4-13)", () => {
    const segments = LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments;
    expect(segments[4].text).toBe("OW! I thought you said acupuncture would make me feel better!");
    expect(segments[4].keywords).toContain("acupuncture");

    expect(segments[5].text).toBe("Trust me, it will. It's just not easy finding the right nerve points under all this...");
    expect(segments[5].keywords).toContain("nerve points");

    expect(segments[6].text).toBe("Fat?");
    expect(segments[7].text).toBe("Fur, I was gonna say fur.");
    expect(segments[8].text).toBe("Sure you were.");

    expect(segments[9].text).toContain("Who am I to judge a warrior based on his size?");
    expect(segments[10].text).toContain("Ow! Maybe you should take a look at this again.");
    expect(segments[11].text).toContain("he's stuck with you... a big, fat panda");

    expect(segments[12].text).toBe("OH, THAT IS IT!");
    expect(segments[13].text).toBe(
      "Wait! My fault! I accidentally tweaked his facial nerve. And may have also stopped his heart."
    );
    expect(segments[13].keywords).toEqual(
      expect.arrayContaining(["facial nerve", "stopped his heart"])
    );
  });

  it("Audit 3: Vocabulary Breakdown: 'make things right', 'tweak', connected speech (Segments 14-16)", () => {
    const segments = LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments;
    expect(segments[14].text).toContain("Notice the expression 'make things right'");
    expect(segments[14].keywords).toContain("make things right");

    expect(segments[15].text).toContain("The word 'tweak' means to pull, twist, or pinch");
    expect(segments[15].keywords).toContain("tweak");

    expect(segments[16].text).toContain("Pay attention to connected speech when Mantis says 'I was gonna say'");
    expect(segments[16].keywords).toContain("connected speech");
  });

  it("Audit 4: Po's Frustration & Oogway's 'Yesterday is history, today is a gift' (Segments 17-19)", () => {
    const segments = LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments;
    expect(segments[17].text).toContain("Sacred Peach Tree of Heavenly Wisdom");
    expect(segments[17].properNouns).toContain("Sacred Peach Tree");

    expect(segments[18].text).toContain("I probably sucked more than anybody in the history of kung fu");
    expect(segments[18].keywords).toContain("history of sucking");

    expect(segments[19].text).toContain(
      "Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present."
    );
    expect(segments[19].keywords).toEqual(
      expect.arrayContaining(["yesterday is history", "tomorrow is a mystery", "today is a gift", "called the present"])
    );
  });

  it("Audit 5: Tai Lung Prison Break & 'Illusion of Control' Metaphor (Segments 20-25)", () => {
    const segments = LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments;
    expect(segments[20].text).toContain("Tai Lung has broken out of prison!");
    expect(segments[20].keywords).toContain("broken out of prison");

    expect(segments[21].text).toContain("Nothing is impossible.");
    expect(segments[21].keywords).toContain("nothing is impossible");

    expect(segments[22].text).toContain("until you let go of the illusion of control.");
    expect(segments[22].keywords).toContain("illusion of control");

    expect(segments[23].text).toBe("Illusion?");
    expect(segments[24].text).toContain("I cannot make it blossom when it suits me, nor make it bear fruit before its time.");
    expect(segments[24].keywords).toEqual(
      expect.arrayContaining(["when it suits me", "bear fruit before its time"])
    );

    expect(segments[25].text).toContain("I can control when the fruit will fall! And I can control where to plant the seed!");
    expect(segments[25].keywords).toContain("plant the seed");
  });

  it("Audit 6: The Peach Seed Metaphor & 'Guide, Nurture, Believe' (Segments 26-32)", () => {
    const segments = LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments;
    expect(segments[26].text).toContain("that seed will grow to be a peach tree. You may wish for an apple or an orange, but you will get a peach.");
    expect(segments[26].keywords).toContain("grow to be a peach tree");

    expect(segments[27].text).toBe("But a peach cannot defeat Tai Lung!");
    expect(segments[28].text).toBe("Maybe it can. If you are willing to guide it, to nurture it, to believe in it.");
    expect(segments[28].keywords).toEqual(
      expect.arrayContaining(["willing to guide", "nurture it", "believe in it"])
    );

    expect(segments[29].text).toBe("But how? How? I need your help, Master.");
    expect(segments[30].text).toBe("No. You just need to believe. Promise me, Shifu. Promise me you will believe.");
    expect(segments[30].keywords).toContain("promise me");

    expect(segments[31].text).toBe("I... I will try.");
    expect(segments[32].text).toBe("Good. My time has come. You must continue your journey without me.");
    expect(segments[32].keywords).toContain("my time has come");
  });

  it("Audit 7: Idiom Deep-Dive, Articulation Contrast & Outro (Segments 33-38)", () => {
    const segments = LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments;
    expect(segments[33].text).toContain("Let's analyze the phrase 'when it suits me'");
    expect(segments[34].text).toContain("Notice the idiom 'bear fruit'");
    expect(segments[35].text).toContain("In the line 'let go of the illusion of control'");

    expect(segments[36].text).toContain("Dustin Hoffman's crisp articulation as Shifu and Randall Duk Kim's serene cadence as Oogway");
    expect(segments[36].properNouns).toEqual(
      expect.arrayContaining(["Dustin Hoffman", "Shifu", "Randall Duk Kim", "Oogway"])
    );

    expect(segments[37].text).toContain("classic animation Shrek");
    expect(segments[38].text).toContain("keep practicing your English every single day!");
  });
});
