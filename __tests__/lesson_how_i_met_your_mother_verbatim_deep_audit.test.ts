import { describe, it, expect } from "vitest";
import { LESSON_HOW_I_MET_YOUR_MOTHER_BARNEY_PLAYBOOK_THEORIES } from "../features/listening/data/lessons/movies/sitcoms/lesson_how_i_met_your_mother";

describe("How I Met Your Mother: Verbatim Deep Dialogue Audit", () => {
  const segments = LESSON_HOW_I_MET_YOUR_MOTHER_BARNEY_PLAYBOOK_THEORIES.segments;

  it("Test 1: Barney's corporate survival philosophy must be verbatim present", () => {
    const essentialSeg = segments.find((s) => s.text.includes("absolutely essential"));
    expect(essentialSeg).toBeDefined();
    expect(essentialSeg?.text).toContain("Look, you just need a way to make yourself absolutely essential.");

    const hardWorkSeg = segments.find((s) => s.text.includes("keeping your job"));
    expect(hardWorkSeg).toBeDefined();
    expect(hardWorkSeg?.text).toContain("keeping your job has nothing to do with hard work");
  });

  it("Test 2: Breakup recovery theories must be accurately captured", () => {
    const drinksSeg = segments.find((s) => s.text.includes("10,000 drinks"));
    expect(drinksSeg).toBeDefined();
    expect(drinksSeg?.text).toContain("Exactly 10,000 drinks, however long that takes.");

    const stepsSeg = segments.find((s) => s.text.includes("series of steps"));
    expect(stepsSeg).toBeDefined();
    expect(stepsSeg?.text).toContain("There's a series of steps: from her bed to the front door");
  });

  it("Test 3: Robin's reggae band punchline must be verbatim captured", () => {
    const reggaePunchline = segments.find((s) => s.text.includes("EVERY REGGAE SONG"));
    expect(reggaePunchline).toBeDefined();
    expect(reggaePunchline?.text).toBe("Oh right, it's called EVERY REGGAE SONG!");
  });

  it("Test 4: The Three Rules of Cheating and Area Codes must be present", () => {
    const rule1 = segments.find((s) => s.text.includes("three rules of cheating"));
    expect(rule1).toBeDefined();
    expect(rule1?.text).toContain("not the one who's married");

    const rule2 = segments.find((s) => s.text.includes("adjacent vowels"));
    expect(rule2).toBeDefined();
    expect(rule2?.text).toContain("two adjacent vowels");

    const rule3 = segments.find((s) => s.text.includes("different area code"));
    expect(rule3).toBeDefined();

    const areaCode516 = segments.find((s) => s.text.includes("516!"));
    expect(areaCode516).toBeDefined();
    expect(areaCode516?.text).toContain("She might dress like she's 718, act like she's 212, but trust me, she's 516!");
  });

  it("Test 5: The spontaneous bar buying chant must be present", () => {
    const barSeg1 = segments.find((s) => s.text.includes("We should buy a bar!"));
    expect(barSeg1).toBeDefined();
    expect(barSeg1?.text).toContain("We should buy a bar! Of course we should buy a bar!");

    const barSeg2 = segments.find((s) => s.text.includes("totally buy a bar!"));
    expect(barSeg2).toBeDefined();
    expect(barSeg2?.text).toContain("Our bar would be awesome!");
  });

  it("Test 6: Barney's hilarious prayer reversal must be verbatim present", () => {
    const vowSeg = segments.find((s) => s.text.includes("help me find the sex tape"));
    expect(vowSeg).toBeDefined();
    expect(vowSeg?.text).toContain("God, if You help me find the sex tape");

    const reversalSeg = segments.find((s) => s.text.includes("Never mind Bro, found it!"));
    expect(reversalSeg).toBeDefined();
    expect(reversalSeg?.text).toBe("Never mind Bro, found it!");
  });

  it("Test 7: Barney's second awesome gland anatomy theory must be verbatim present", () => {
    const glandSeg = segments.find((s) => s.text.includes("shame gland"));
    expect(glandSeg).toBeDefined();
    expect(glandSeg?.text).toContain("where the shame gland should be, there's a second awesome gland.");

    const trueStorySeg = segments.find((s) => s.text.includes("True story!"));
    expect(trueStorySeg).toBeDefined();
  });
});
