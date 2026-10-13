import { describe, it, expect } from "vitest";
import { LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT } from "../features/listening/data/lessons/movies/sitcoms/lesson_the_big_bang_theory";

describe("The Big Bang Theory: Verbatim Deep Dialogue Audit", () => {
  const segments = LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.segments;

  it("Test 1: Rubik's cube sticker swap and Friend Number Four dialogue must be verbatim present", () => {
    const stickerSeg = segments.find((s) => s.text.includes("switched stickers 2, 9, 32, and 51"));
    expect(stickerSeg).toBeDefined();
    expect(stickerSeg?.text).toContain("Solution: you switched stickers 2, 9, 32, and 51.");

    const friendSeg = segments.find((s) => s.text.includes("Friend Number Four"));
    expect(friendSeg).toBeDefined();
    expect(friendSeg?.text).toBe(
      "Anything has a number if you assign it a number, Friend Number Four."
    );

    const topFiveSeg = segments.find((s) => s.text.includes("Top five, not bad"));
    expect(topFiveSeg).toBeDefined();
  });

  it("Test 2: Penny's suitors extrapolation and bell curve calculations must be verbatim present", () => {
    const extrapolationSeg = segments.find((s) => s.text.includes("Simple extrapolation"));
    expect(extrapolationSeg).toBeDefined();

    const bellCurveSeg = segments.find((s) => s.text.includes("bell curve peaking around the present"));
    expect(bellCurveSeg).toBeDefined();

    const totalSeg = segments.find((s) => s.text.includes("193 men, plus or minus eight men"));
    expect(totalSeg).toBeDefined();

    const partnerSeg = segments.find((s) => s.text.includes("30.96 sexual partners"));
    expect(partnerSeg).toBeDefined();

    const roundSeg = segments.find((s) => s.text.includes("round that up to 31"));
    expect(roundSeg).toBeDefined();
  });

  it("Test 3: Erwin Schrodinger 1935 cat thought experiment and opening the box must be verbatim present", () => {
    const schrodingerSeg = segments.find((s) => s.text.includes("Copenhagen interpretation of quantum physics"));
    expect(schrodingerSeg).toBeDefined();
    expect(schrodingerSeg?.text).toContain("In 1935, Erwin Schrodinger, in an attempt to explain the Copenhagen interpretation of quantum physics");

    const bothAliveDeadSeg = segments.find((s) => s.text.includes("both alive and dead"));
    expect(bothAliveDeadSeg).toBeDefined();

    const openBoxSeg = segments.find((s) => s.text.includes("opening the box"));
    expect(openBoxSeg).toBeDefined();
    expect(openBoxSeg?.text).toContain("It is only by opening the box that you'll find out which it is.");
  });

  it("Test 4: Deviated septum surgery risks, carotid artery Disneyland fountain and T-Rex in gas tank must be verbatim captured", () => {
    const sphincterSeg = segments.find((s) => s.text.includes("sphincter-tightening one in 300"));
    expect(sphincterSeg).toBeDefined();

    const fountainSeg = segments.find((s) => s.text.includes("dancing fountain at Disneyland"));
    expect(fountainSeg).toBeDefined();
    expect(fountainSeg?.text).toContain(
      "your carotid artery is just one shaky scalpel away from becoming the dancing fountain at Disneyland"
    );

    const trexSeg = segments.find((s) => s.text.includes("Every cocky T-Rex"));
    expect(trexSeg).toBeDefined();
    expect(trexSeg?.text).toContain(
      "Every cocky T-Rex currently swimming around in the gas tank of your car!"
    );
  });

  it("Test 5: Ramona Nowitzki's academic credit eviction and fermions/hammer toe must be verbatim present", () => {
    const fermionSeg = segments.find((s) => s.text.includes("masses of all the fermions"));
    expect(fermionSeg).toBeDefined();
    expect(fermionSeg?.text).toContain(
      "You helped me work out the masses of all the fermions, and you pumiced my hammer toe."
    );

    const theoremSeg = segments.find((s) => s.text.includes("Cooper-Nowitzki Theorem"));
    expect(theoremSeg).toBeDefined();

    const shareCreditSeg = segments.find((s) => s.text.includes("share credit? Get out!"));
    expect(shareCreditSeg).toBeDefined();
    expect(shareCreditSeg?.text).toContain("Oh, you want me to share credit? Get out! — Oh, bite me! — Sisters!");
  });

  it("Test 6: The triple knock 'Penny Penny Penny' and Cousin Leopold unravelable web must be verbatim captured", () => {
    const knockSeg = segments.find((s) => s.text === "Penny! Penny! Penny!");
    expect(knockSeg).toBeDefined();

    const atomicSeg = segments.find((s) => s.text.includes("atomic clock in Boulder, Colorado"));
    expect(atomicSeg).toBeDefined();
    expect(atomicSeg?.text).toContain("My watch is linked to the atomic clock in Boulder, Colorado.");

    const webSeg = segments.find((s) => s.text.includes("unravelable web"));
    expect(webSeg).toBeDefined();

    const googleSeg = segments.find((s) => s.text.includes("Leopold Houston"));
    expect(googleSeg).toBeDefined();
    expect(googleSeg?.text).toContain("Facebook page");
    expect(googleSeg?.text).toContain("e-harmony.com");
  });

  it("Test 7: D&D dice decision-making and human-lichen symbiosis concert scenario must be verbatim present", () => {
    const diceSeg = segments.find((s) => s.text.includes("Dungeons and Dragons dice"));
    expect(diceSeg).toBeDefined();

    const higgsSeg = segments.find((s) => s.text.includes("Higgs boson particle"));
    expect(higgsSeg).toBeDefined();
    expect(higgsSeg?.text).toContain("Large Hadron Collider has yet to isolate the Higgs boson particle");

    const tripleThreatSeg = segments.find((s) => s.text.includes("triple threat! Like three-bean salad"));
    expect(tripleThreatSeg).toBeDefined();

    const beethovenSeg = segments.find((s) => s.text.includes("appreciate Beethoven"));
    expect(beethovenSeg).toBeDefined();

    const sunlightSeg = segments.find((s) => s.text.includes("snack on this sunlight"));
    expect(sunlightSeg).toBeDefined();
  });
});
