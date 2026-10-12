import { describe, it, expect } from "vitest";
import { LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA } from "../features/listening/data/lessons/movies/sitcoms/lesson_friends_apartment_bet";

describe("Video #13 (mov_sit_01): Friends Apartment Bet Verbatim & Narrative Climax Audit", () => {
  const segments = LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.segments;

  it("1. Verbatim Grocery Opening & Quirks: 'Tic Tacs in even numbers' & 'half-eaten box of cookies'", () => {
    const ticTacsSeg = segments.find((s) => s.text.includes("Tic Tacs in even numbers"));
    expect(ticTacsSeg).toBeDefined();
    expect(ticTacsSeg?.keywords).toContain("Tic Tacs");

    const cookiesSeg = segments.find((s) => s.text.includes("half-eaten box of cookies"));
    expect(cookiesSeg).toBeDefined();
  });

  it("2. Verbatim Challenge Protocol & Scotch Tape: 'Challenge extended' & 'Scotch tape'", () => {
    const extendedSeg = segments.find((s) => s.text === "Challenge extended.");
    expect(extendedSeg).toBeDefined();

    const acceptedSeg = segments.find((s) => s.text === "Challenge accepted.");
    expect(acceptedSeg).toBeDefined();

    const scotchTapeSeg = segments.find((s) => s.text === "Scotch tape.");
    expect(scotchTapeSeg).toBeDefined();
    expect(scotchTapeSeg?.properNouns).toContain("Scotch");
  });

  it("3. Verbatim Slang Demands: 'Fork it over', 'Cough it up', 'Pay the piper', 'Give me it'", () => {
    const forkSeg = segments.find((s) => s.text === "Fork it over.");
    expect(forkSeg).toBeDefined();
    expect(forkSeg?.keywords).toContain("fork it over");

    const coughSeg = segments.find((s) => s.text === "Cough it up.");
    expect(coughSeg).toBeDefined();
    expect(coughSeg?.keywords).toContain("cough it up");

    const piperSeg = segments.find((s) => s.text === "Pay the piper.");
    expect(piperSeg).toBeDefined();
    expect(piperSeg?.keywords).toContain("pay the piper");

    const giveMeSeg = segments.find((s) => s.text === "Give me it.");
    expect(giveMeSeg).toBeDefined();
  });

  it("4. Verbatim 4 Trivia Categories: Fears and Pet Peeves, Ancient History, Literature, It's All Relative", () => {
    const catSeg1 = segments.find((s) => s.text.includes("Fears and Pet Peeves, Ancient History"));
    expect(catSeg1).toBeDefined();

    const catSeg2 = segments.find((s) => s.text.includes("Literature, and It's All Relative"));
    expect(catSeg2).toBeDefined();
  });

  it("5. Verbatim Lord of the Dance: 'Michael Flatley, Lord of the Dance!' & 'flail about as if independent from his body'", () => {
    const flatleySeg = segments.find((s) => s.text.includes("Michael Flatley, Lord of the Dance!"));
    expect(flatleySeg).toBeDefined();
    expect(flatleySeg?.properNouns).toContain("Michael Flatley");

    const flailSeg = segments.find((s) => s.text.includes("flail about as if independent from his body"));
    expect(flailSeg).toBeDefined();
    expect(flailSeg?.keywords).toContain("flail about");
  });

  it("6. Verbatim Althea Guess: 'Althea' & 'I took a shot' & 'Nice shooting!'", () => {
    const altheaSeg = segments.find((s) => s.text === "Althea.");
    expect(altheaSeg).toBeDefined();

    const tookShotSeg = segments.find((s) => s.text === "I took a shot.");
    expect(tookShotSeg).toBeDefined();
    expect(tookShotSeg?.keywords).toContain("took a shot");

    const niceShotSeg = segments.find((s) => s.text === "Nice shooting!");
    expect(niceShotSeg).toBeDefined();
  });

  it("7. Verbatim Climax Punchline: 'TV Guide' & 'Chanandler Bong' & 'Actually, it's Miss Chanandler Bong.'", () => {
    const tvGuideSeg = segments.find((s) => s.text.includes("TV Guide comes to Chandler and Joey's apartment"));
    expect(tvGuideSeg).toBeDefined();

    const chanandlerSeg = segments.find((s) => s.text === "Chanandler Bong.");
    expect(chanandlerSeg).toBeDefined();

    const missChanandlerSeg = segments.find((s) => s.text === "Actually, it's Miss Chanandler Bong.");
    expect(missChanandlerSeg).toBeDefined();
    expect(missChanandlerSeg?.properNouns).toContain("Miss Chanandler Bong");
  });
});
