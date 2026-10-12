import { describe, it, expect } from "vitest";
import { LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK } from "../features/listening/data/lessons/movies/romance/lesson_eternal_sunshine";

describe("Video #10 (mov_rom_10): Eternal Sunshine Verbatim & Narrative Climax Audit", () => {
  const segments = LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.segments;

  it("1. Verbatim Opening & Loop: 'You married?' -> 'No.' -> 'Let's move into this neighborhood.'", () => {
    expect(segments[0].text).toBe("You married?");
    expect(segments[1].text).toBe("No.");
    expect(segments[2].text).toBe("Let's move into this neighborhood.");
    expect(segments[3].text).toBe("I used to live with someone though.");
    expect(segments[4].text).toBe("Male or female?");
  });

  it("2. Verbatim Break-In: 'barking up the wrong tree' & 'breaking and entering!'", () => {
    const barkingSeg = segments.find((s) => s.text.includes("barking up the wrong tree"));
    expect(barkingSeg).toBeDefined();
    expect(barkingSeg?.keywords).toContain("barking up the wrong tree");

    const breakInSeg = segments.find((s) => s.text.includes("breaking and entering"));
    expect(breakInSeg).toBeDefined();
    expect(breakInSeg?.keywords).toContain("breaking and entering");
  });

  it("3. Verbatim Pun & Roleplay: 'David and Ruth Laskin' & 'I'm ruthless at the moment.'", () => {
    const laskinSeg = segments.find((s) => s.text.includes("David and Ruth Laskin"));
    expect(laskinSeg).toBeDefined();

    const ruthlessSeg = segments.find((s) => s.text.includes("ruthless at the moment"));
    expect(ruthlessSeg).toBeDefined();
    expect(ruthlessSeg?.keywords).toContain("ruthless");
  });

  it("4. Verbatim Climax Regret & Revelation: 'I wish I had stayed' & 'I was going to say stay with me'", () => {
    const wishSegs = segments.filter((s) => s.text.includes("I wish I had stayed"));
    expect(wishSegs.length).toBeGreaterThanOrEqual(3);

    const stayWithMeSeg = segments.find((s) => s.text.includes("stay with me"));
    expect(stayWithMeSeg).toBeDefined();
    expect(stayWithMeSeg?.text).toBe("I was going to say 'stay with me.'");
  });

  it("5. Verbatim Immortal Whisper & Epilogue: 'Meet me in Montauk.' & 'She was just a girl.'", () => {
    const montaukSeg = segments.find((s) => s.text === "Meet me in Montauk.");
    expect(montaukSeg).toBeDefined();
    expect(montaukSeg?.properNouns).toContain("Montauk");
    expect(montaukSeg?.translationVi).toContain("Montauk");

    const goodbyeSeg = segments.find((s) => s.text.includes("make up a goodbye at least"));
    expect(goodbyeSeg).toBeDefined();

    const justAGirlSeg = segments.find((s) => s.text === "She was just a girl.");
    expect(justAGirlSeg).toBeDefined();
  });
});
