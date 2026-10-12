import { describe, it, expect } from "vitest";
import { LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL } from "../features/listening/data/lessons/movies/romance/lesson_notting_hill";

describe("Video #11 (mov_rom_11): Notting Hill Verbatim & Narrative Climax Audit", () => {
  const segments = LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.segments;

  it("1. Verbatim Opening Press Conference: 'abiding by all her present commitments' & 'round things up'", () => {
    const abidingSeg = segments.find((s) => s.text.includes("abiding by all her present commitments"));
    expect(abidingSeg).toBeDefined();
    expect(abidingSeg?.keywords).toContain("abiding by");

    const roundUpSeg = segments.find((s) => s.text.includes("round things up"));
    expect(roundUpSeg).toBeDefined();
    expect(roundUpSeg?.keywords).toContain("round things up");
  });

  it("2. Verbatim Departure Question: 'how much longer are you staying in the UK then?' -> 'No time at all. I leave tonight.'", () => {
    const howMuchLongerSeg = segments.find((s) => s.text.includes("how much longer are you staying in the UK then?"));
    expect(howMuchLongerSeg).toBeDefined();

    const noTimeSeg = segments.find((s) => s.text === "No time at all. I leave tonight.");
    expect(noTimeSeg).toBeDefined();
  });

  it("3. Verbatim Climax Inquiry: 'more than just good friends?' & 'hoped there would be, but no'", () => {
    const moreThanFriendsSeg = segments.find((s) => s.text.includes("more than just good friends?"));
    expect(moreThanFriendsSeg).toBeDefined();
    expect(moreThanFriendsSeg?.keywords).toContain("more than just good friends");

    const hopedSeg = segments.find((s) => s.text.includes("I hoped there would be, but no, I'm assured there aren't."));
    expect(hopedSeg).toBeDefined();
  });

  it("4. Verbatim Daft Prick Apology & Spike Callback: 'Thacker. His name is Thacker.' & 'realised he'd been a daft prick'", () => {
    const spikeSeg = segments.find((s) => s.text.includes("Thacker. His name is Thacker."));
    expect(spikeSeg).toBeDefined();
    expect(spikeSeg?.properNouns).toContain("Thacker");

    const daftPrickSeg = segments.find((s) => s.text.includes("daft prick"));
    expect(daftPrickSeg).toBeDefined();
    expect(daftPrickSeg?.keywords).toContain("daft prick");
  });

  it("5. Verbatim Immortal Resolution & Song: 'Indefinitely.' & 'The meaning of my life is she.'", () => {
    const indefinitelySeg = segments.find((s) => s.text === "Indefinitely.");
    expect(indefinitelySeg).toBeDefined();
    expect(indefinitelySeg?.translationVi).toContain("Vô thời hạn");

    const horseAndHoundSeg = segments.find((s) => s.text.includes("Horse & Hound will be absolutely delighted"));
    expect(horseAndHoundSeg).toBeDefined();

    const meaningSeg = segments.find((s) => s.text.includes("The meaning of my life is she"));
    expect(meaningSeg).toBeDefined();
  });
});
