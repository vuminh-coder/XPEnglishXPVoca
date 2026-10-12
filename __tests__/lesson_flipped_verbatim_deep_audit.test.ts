import { describe, it, expect } from "vitest";
import { LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS } from "../features/listening/data/lessons/movies/romance/lesson_flipped";

describe("Video #12 (mov_rom_12): Flipped Verbatim & Narrative Climax Audit", () => {
  const segments = LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.segments;

  it("1. Verbatim Childhood Opening: 'leave me alone' & 'could not take a hint'", () => {
    const leaveMeAloneSeg = segments.find((s) => s.text.includes("All I ever wanted was for Juli Baker to leave me alone"));
    expect(leaveMeAloneSeg).toBeDefined();
    expect(leaveMeAloneSeg?.keywords).toContain("leave me alone");

    const takeAHintSeg = segments.find((s) => s.text.includes("This girl could not take a hint"));
    expect(takeAHintSeg).toBeDefined();
    expect(takeAHintSeg?.keywords).toContain("take a hint");
  });

  it("2. Verbatim Shelly Stalls & Watermelon Hair: 'it smelled like watermelon' & 'get my kiss'", () => {
    const watermelonSeg = segments.find((s) => s.text.includes("it smelled like watermelon"));
    expect(watermelonSeg).toBeDefined();
    expect(watermelonSeg?.keywords).toContain("watermelon");

    const getMyKissSeg = segments.find((s) => s.text.includes("wondering if I was ever going to get my kiss"));
    expect(getMyKissSeg).toBeDefined();
  });

  it("3. Verbatim Sycamore Tree & Visual Challenge: 'looks particularly beautiful today' & 'visually challenged'", () => {
    const treeBeautifulSeg = segments.find((s) => s.text.includes("the tree looks particularly beautiful today"));
    expect(treeBeautifulSeg).toBeDefined();

    const visuallyChallengedSeg = segments.find((s) => s.text.includes("You're just visually challenged"));
    expect(visuallyChallengedSeg).toBeDefined();
    expect(visuallyChallengedSeg?.keywords).toContain("visually challenged");
  });

  it("4. Verbatim Library Confession & Garrett's Idioms: 'nip this in the bud' & 'apple doesn't fall far from the tree'", () => {
    const nipBudSeg = segments.find((s) => s.text.includes("nip this in the bud"));
    expect(nipBudSeg).toBeDefined();
    expect(nipBudSeg?.keywords).toContain("nip in the bud");

    const appleSeg = segments.find((s) => s.text.includes("apple doesn't fall far from the tree"));
    expect(appleSeg).toBeDefined();
    expect(appleSeg?.keywords).toContain("apple doesn't fall far from tree");
  });

  it("5. Verbatim Basket Boys Auction: 'bidding on Eddie Trulock' & 'marched straight towards me'", () => {
    const eddieTrulockSeg = segments.find((s) => s.text.includes("bidding on Eddie Trulock"));
    expect(eddieTrulockSeg).toBeDefined();
    expect(eddieTrulockSeg?.properNouns).toContain("Eddie Trulock");

    const marchedSeg = segments.find((s) => s.text.includes("marched straight towards me"));
    expect(marchedSeg).toBeDefined();
  });

  it("6. Verbatim Sapling Planting Climax: 'sycamore tree' & 'hearts finally connect'", () => {
    const sycamoreSeg = segments.find((s) => s.text.includes("It was a sycamore tree"));
    expect(sycamoreSeg).toBeDefined();
    expect(sycamoreSeg?.keywords).toContain("sycamore tree");

    const climaxClosingSeg = segments.find((s) => s.text.includes("hearts finally connect"));
    expect(climaxClosingSeg).toBeDefined();
    expect(climaxClosingSeg?.keywords).toContain("hearts connect");
  });
});
