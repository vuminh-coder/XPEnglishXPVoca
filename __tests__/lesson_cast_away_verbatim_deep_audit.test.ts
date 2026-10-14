import { describe, it, expect } from "vitest";
import {
  LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES,
  QUIZ_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES,
} from "../features/listening/data/lessons/movies/inspirational/lesson_cast_away";

describe("Cast Away: Chuck Noland's Survival Philosophy (mov_insp_10) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Relationship Realization & The Cold Math (Segments 0-4)", () => {
    const segments = LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES.segments;
    expect(segments[0].text).toBe("We both had done the math.");
    expect(segments[0].keywords).toContain("done the math");

    expect(segments[1].text).toBe("Kelly added it all up.");
    expect(segments[1].properNouns).toContain("Kelly");

    expect(segments[2].text).toBe("Knew she had to let me go.");
    expect(segments[2].keywords).toContain("let me go");

    expect(segments[3].text).toBe("I added it up.");
    expect(segments[4].text).toBe("Knew that I had lost her.");
    expect(segments[4].translationVi).toContain("đánh mất cô ấy");
  });

  it("Audit 2: Island Despair & The Illusion of Control (Segments 5-10)", () => {
    const segments = LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES.segments;
    expect(segments[5].text).toBe("Because I was never going to get off that island.");
    expect(segments[6].text).toBe("I was going to die there.");
    expect(segments[7].text).toBe("Totally alone.");
    expect(segments[7].keywords).toContain("totally alone");

    expect(segments[8].text).toBe(
      "I didn't know if I was going to get sick or if I was going to get injured or something."
    );
    expect(segments[8].keywords).toEqual(
      expect.arrayContaining(["get sick", "get injured"])
    );

    expect(segments[9].text).toBe("The only choice I had, the only thing I could control,");
    expect(segments[10].text).toBe("was when and how and where that was going to happen.");
    expect(segments[10].translationVi).toContain("khi nào, ra sao và ở đâu");
  });

  it("Audit 3: The Summit Attempt & Ultimate Powerlessness (Segments 11-17)", () => {
    const segments = LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES.segments;
    expect(segments[11].text).toBe("So I made a rope.");
    expect(segments[12].text).toBe("And I went up to the summit to hang myself.");
    expect(segments[12].keywords).toContain("hang myself");

    expect(segments[13].text).toBe("I had to test it, you know, of course.");
    expect(segments[14].text).toBe("You know me.");

    expect(segments[15].text).toBe("And the weight of the log snapped the limb of the tree.");
    expect(segments[15].keywords).toEqual(
      expect.arrayContaining(["snapped", "limb of the tree"])
    );

    expect(segments[16].text).toBe("So I couldn't even kill myself the way I wanted to.");
    expect(segments[17].text).toBe("I had power over nothing.");
    expect(segments[17].keywords).toContain("power over nothing");
  });

  it("Audit 4: The Warm Blanket & Inexplicable Will to Live (Segments 18-23)", () => {
    const segments = LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES.segments;
    expect(segments[18].text).toBe("And that's when this feeling came over me like a warm blanket.");
    expect(segments[18].keywords).toContain("warm blanket");
    expect(segments[18].translationVi).toContain("tựa chiếc chăn ấm");

    expect(segments[19].text).toBe("I knew somehow that I had to stay alive.");
    expect(segments[20].text).toBe("Somehow.");

    expect(segments[21].text).toBe("I had to keep breathing.");
    expect(segments[22].text).toBe("Even though there was no reason to hope.");
    expect(segments[22].keywords).toContain("no reason to hope");

    expect(segments[23].text).toBe("And all my logic said that I would never see this place again.");
    expect(segments[23].keywords).toContain("all my logic");
  });

  it("Audit 5: Defying Logic & The Miraculous Sail (Segments 24-28)", () => {
    const segments = LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES.segments;
    expect(segments[24].text).toBe("So that's what I did.");
    expect(segments[25].text).toBe("I stayed alive.");
    expect(segments[26].text).toBe("I kept breathing.");

    expect(segments[27].text).toBe("And then one day that logic was proven all wrong...");
    expect(segments[27].keywords).toContain("proven all wrong");

    expect(segments[28].text).toBe("because the tide came in, gave me a sail.");
    expect(segments[28].keywords).toEqual(
      expect.arrayContaining(["tide came in", "gave me a sail"])
    );
    expect(segments[28].translationVi).toContain("cánh buồm");
  });

  it("Audit 6: Memphis Reality, Ice in the Glass & Loving Gratitude (Segments 29-34)", () => {
    const segments = LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES.segments;
    expect(segments[29].text).toBe("And now here I am.");
    expect(segments[30].text).toBe("I'm back in Memphis talking to you.");
    expect(segments[30].properNouns).toContain("Memphis");

    expect(segments[31].text).toBe("I have ice in my glass.");
    expect(segments[31].keywords).toContain("ice in my glass");

    expect(segments[32].text).toBe("And I've lost her all over again.");
    expect(segments[33].text).toBe("I'm so sad that I don't have Kelly.");
    expect(segments[33].properNouns).toContain("Kelly");

    expect(segments[34].text).toBe("But I'm so grateful that she was with me on that island.");
    expect(segments[34].keywords).toContain("grateful");
    expect(segments[34].translationVi).toContain("vô cùng biết ơn");
  });

  it("Audit 7: Immortal Conclusion: Keep Breathing & The Tide (Segments 35-38)", () => {
    const segments = LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES.segments;
    expect(segments[35].text).toBe("And I know what I have to do now.");
    expect(segments[36].text).toBe("I gotta keep breathing.");
    expect(segments[36].keywords).toContain("gotta keep breathing");

    expect(segments[37].text).toBe("Because tomorrow the sun will rise.");
    expect(segments[37].keywords).toContain("tomorrow the sun will rise");

    expect(segments[38].text).toBe("Who knows what the tide could bring.");
    expect(segments[38].keywords).toContain("what the tide could bring");
    expect(segments[38].translationVi).toContain("thủy triều sẽ mang tới điều kỳ diệu gì");
  });
});
