import { describe, it, expect } from "vitest";
import { LESSON_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM } from "../features/listening/data/lessons/movies/sitcoms/lesson_friends_chandler_sarcasm";

describe("Video #14 (mov_sit_02): Friends Chandler Sarcasm Verbatim & Narrative Climax Audit", () => {
  const segments = LESSON_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM.segments;

  it("1. Verbatim Sarcastic Advice: 'Can I interest you in a sarcastic comment?' & 'Some cheese?'", () => {
    const sarcasticSeg = segments.find((s) => s.text === "Can I interest you in a sarcastic comment?");
    expect(sarcasticSeg).toBeDefined();
    expect(sarcasticSeg?.keywords).toContain("sarcastic comment");

    const cheeseSeg = segments.find((s) => s.text === "Some cheese?");
    expect(cheeseSeg).toBeDefined();
  });

  it("2. Verbatim CD Chaos & Wedding Flailing: '200 CDs, not one of them in the right case!' & 'when I dance, I look like this!'", () => {
    const cdSeg = segments.find((s) => s.text.includes("200 CDs, not one of them in the right case!"));
    expect(cdSeg).toBeDefined();

    const danceSeg = segments.find((s) => s.text.includes("when I dance, I look like this!"));
    expect(danceSeg).toBeDefined();
    expect(danceSeg?.keywords).toContain("look like this");
  });

  it("3. Verbatim Jack Geller TMI: 'This conversation is how I got the bullet hole in my head.'", () => {
    const bulletHoleSeg = segments.find((s) => s.text.includes("This conversation is how I got the bullet hole in my head."));
    expect(bulletHoleSeg).toBeDefined();
    expect(bulletHoleSeg?.keywords).toContain("bullet hole in my head");
  });

  it("4. Verbatim Joey as Waiter: 'wearing it like a cape' & 'Don't eat yellow snow.'", () => {
    const capeSeg = segments.find((s) => s.text.includes("You're wearing it like a cape."));
    expect(capeSeg).toBeDefined();
    expect(capeSeg?.keywords).toContain("apron like a cape");

    const snowSeg = segments.find((s) => s.text === "Don't eat yellow snow.");
    expect(snowSeg).toBeDefined();
  });

  it("5. Verbatim Poughkeepsie Romance: 'burying this woman' & 'from Poughkeepsie'", () => {
    const burySeg = segments.find((s) => s.text.includes("Were you so late because you were burying this woman?"));
    expect(burySeg).toBeDefined();
    expect(burySeg?.keywords).toContain("burying this woman");

    const poughkeepsieSeg = segments.find((s) => s.text.includes("How can she be great if she's from Poughkeepsie?"));
    expect(poughkeepsieSeg).toBeDefined();
    expect(poughkeepsieSeg?.properNouns).toContain("Poughkeepsie");
  });

  it("6. Verbatim Audition Debt & Thursday Third Day: 'You owe me $3,000!' & 'Thursday: the third day'", () => {
    const debtSeg = segments.find((s) => s.text.includes("You owe me $3,000!"));
    expect(debtSeg).toBeDefined();
    expect(debtSeg?.keywords).toContain("owe me $3,000");

    const thursdaySeg = segments.find((s) => s.text.includes("Thursday: the third day"));
    expect(thursdaySeg).toBeDefined();
    expect(thursdaySeg?.properNouns).toContain("Thursday");
  });

  it("7. Verbatim Immortal Series Finale Closure: 'Where?' in the empty apartment", () => {
    const whereSeg = segments.find((s) => s.text === "Where?");
    expect(whereSeg).toBeDefined();
    expect(whereSeg?.keywords).toContain("Where?");
  });
});
