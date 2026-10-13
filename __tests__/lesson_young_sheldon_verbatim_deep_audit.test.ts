import { describe, it, expect } from "vitest";
import { LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES } from "../features/listening/data/lessons/movies/sitcoms/lesson_young_sheldon";

describe("Young Sheldon Outsmarting Everyone (mov_sit_10) - Verbatim Deep Audit Suite", () => {
  const segments = LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES.segments;

  it("Test 1: Act 1 - The College Midterm Curve & Sandwich Crisis Verbatim", () => {
    // Dr. Sturgis curve announcement
    const curveSeg = segments.find((s) => s.text.includes("broke the curve"));
    expect(curveSeg).toBeDefined();
    expect(curveSeg!.text).toContain("turning your As and Bs into Bs and Cs");

    // Phone call to Mary
    const callSeg = segments.find((s) => s.text.includes("fourteen months and eleven days ago"));
    expect(callSeg).toBeDefined();
    expect(callSeg!.text).toContain("when we made the big switch from Wonder Bread");
  });

  it("Test 2: Act 2 - Bread Experimentation & Corporate America Battle Verbatim", () => {
    const scienceSeg = segments.find((s) => s.text.includes("do science on it"));
    expect(scienceSeg).toBeDefined();

    const corporateSeg = segments.find((s) => s.text.includes("doing battle with corporate America"));
    expect(corporateSeg).toBeDefined();

    const cheapSeg = segments.find((s) => s.text.includes("really cheap and fast"));
    expect(cheapSeg).toBeDefined();
  });

  it("Test 3: Act 3 & 4 - Radio Shack Interview & Television Communism Scandal Verbatim", () => {
    const ramSeg = segments.find((s) => s.text.includes("640 kilobytes"));
    expect(ramSeg).toBeDefined();
    expect(ramSeg!.text).toContain("expandable up to 768");

    const intelSeg = segments.find((s) => s.text.includes("Intel 80286"));
    expect(intelSeg).toBeDefined();
    expect(intelSeg!.text).toContain("10 megahertz");

    const commieSeg = segments.find((s) => s.text.includes("communism is what Texas needs"));
    expect(commieSeg).toBeDefined();

    const georgeTvSeg = segments.find((s) => s.text.includes("he is not a communist. He is ten years old"));
    expect(georgeTvSeg).toBeDefined();
  });

  it("Test 4: Act 5 - Unified Field Theory & Pyramid Numerology Verbatim", () => {
    const godelSeg = segments.find((s) => s.text.includes("Kurt Godel"));
    expect(godelSeg).toBeDefined();
    expect(godelSeg!.text).toContain("incompleteness theorems eliminate the possibility of a unified theory");

    const assemblySeg = segments.find((s) => s.text.includes("supercritical assembly"));
    expect(assemblySeg).toBeDefined();
    expect(assemblySeg!.text).toContain("eventually it will explode");

    const honestSeg = segments.find((s) => s.text.includes("You are not a scientist. You are just a rich man"));
    expect(honestSeg).toBeDefined();
  });

  it("Test 5: Act 6 & 7 - NASA Booster Rocket Reusability & PID Landing Verbatim", () => {
    const landRocketSeg = segments.find((s) => s.text.includes("land the booster rockets"));
    expect(landRocketSeg).toBeDefined();

    const patchSeg = segments.find((s) => s.text.includes("NASA patch"));
    expect(patchSeg).toBeDefined();

    const nincompoopSeg = segments.find((s) => s.text.includes("prove this nincompoop wrong"));
    expect(nincompoopSeg).toBeDefined();

    const ulcerSeg = segments.find((s) => s.text.includes("damn ulcer"));
    expect(ulcerSeg).toBeDefined();

    const pidSeg = segments.find((s) => s.text.includes("PID controller"));
    expect(pidSeg).toBeDefined();
    expect(pidSeg!.text).toContain("minimize the dispersions to the landing site");

    const catchUpSeg = segments.find((s) => s.text.includes("Call me when you catch up"));
    expect(catchUpSeg).toBeDefined();
  });

  it("Test 6: Act 8 & 9 - Paige Swanson Rivalry & Classroom Sneeze Phobia Verbatim", () => {
    const quantumSeg = segments.find((s) => s.text.includes("quantum chromodynamics at high temperatures"));
    expect(quantumSeg).toBeDefined();

    const spotSeg = segments.find((s) => s.text.includes("I know you are in my spot"));
    expect(spotSeg).toBeDefined();

    const sneezeSeg = segments.find((s) => s.text.includes("a second sneeze means a plague is upon the land"));
    expect(sneezeSeg).toBeDefined();

    const flightSeg = segments.find((s) => s.text.includes("fight or flight? This is flight"));
    expect(flightSeg).toBeDefined();
  });

  it("Test 7: Act 10 to 14 - Porta-Potty TARDIS, Tutoring Shame & Morse Code Escape Verbatim", () => {
    const tardisSeg = segments.find((s) => s.text.includes("Instead of a porta-potty, it was a TARDIS"));
    expect(tardisSeg).toBeDefined();
    expect(tardisSeg!.text).toContain("Doctor Who");

    const dummkopfSeg = segments.find((s) => s.text.includes("dummkopf"));
    expect(dummkopfSeg).toBeDefined();

    const wilmontSeg = segments.find((s) => s.text.includes("Wilmont Academy for gifted children"));
    expect(wilmontSeg).toBeDefined();

    const loopholeSeg = segments.find((s) => s.text.includes("Ooh, a loophole!"));
    expect(loopholeSeg).toBeDefined();
    expect(loopholeSeg!.text).toContain("etymology of the word loophole");

    const morseSeg = segments.find((s) => s.text.includes("card catalog"));
    expect(morseSeg).toBeDefined();

    const missyEndSeg = segments.find((s) => s.text.includes("Damn it!"));
    expect(missyEndSeg).toBeDefined();
  });
});
