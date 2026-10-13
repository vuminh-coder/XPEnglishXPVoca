import { describe, it, expect } from "vitest";
import { LESSON_BROOKLYN_NINE_NINE_JAKE_I_WANT_IT_THAT_WAY } from "../features/listening/data/lessons/movies/sitcoms/lesson_brooklyn_nine_nine";

describe("Brooklyn Nine-Nine: Verbatim Deep Dialogue Audit", () => {
  const segments = LESSON_BROOKLYN_NINE_NINE_JAKE_I_WANT_IT_THAT_WAY.segments;

  it("Test 1: The worm dance and Terry's 'read the room' reprimand must be verbatim present", () => {
    const wormSeg = segments.find((s) => s.text.includes("do the worm"));
    expect(wormSeg).toBeDefined();
    expect(wormSeg?.text).toContain("you told me I was too old to learn how to do the worm");

    const readRoomSeg = segments.find((s) => s.text.includes("Read the room!"));
    expect(readRoomSeg).toBeDefined();
    expect(readRoomSeg?.text).toBe("Charles, a man has died! Read the room!");
  });

  it("Test 2: Hitchcock warm water prank and biology rationale must be verbatim present", () => {
    const waterSeg = segments.find((s) => s.text.includes("bowl of warm water"));
    expect(waterSeg).toBeDefined();
    expect(waterSeg?.text).toContain("put his hand in a bowl of warm water");

    const biologySeg = segments.find((s) => s.text.includes("involves biology"));
    expect(biologySeg).toBeDefined();
    expect(biologySeg?.text).toContain("it's the smartest because it involves biology!");
  });

  it("Test 3: Hoverboard future of movement catchphrase must be verbatim present", () => {
    const hoverSeg = segments.find((s) => s.text.includes("a hoverboard!"));
    expect(hoverSeg).toBeDefined();
    expect(hoverSeg?.text).toContain("The future of movement: a hoverboard!");

    const futureSeg = segments.find((s) => s.text.includes("The future of movement is now!"));
    expect(futureSeg).toBeDefined();
  });

  it("Test 4: Santa brawl, Canine Diabetes charity and groin kick must be verbatim present", () => {
    const diabetesSeg = segments.find((s) => s.text.includes("Canine Diabetes"));
    expect(diabetesSeg).toBeDefined();
    expect(diabetesSeg?.text).toContain("Canine Diabetes! Who cares about a fat dog?");

    const kickSeg = segments.find((s) => s.text.includes("groin"));
    expect(kickSeg).toBeDefined();
    expect(kickSeg?.text).toContain("Just kicked Santa in the groin!");
  });

  it("Test 5: Zipline fiber trickery must be verbatim captured", () => {
    const fiberSeg = segments.find((s) => s.text.includes("eating his fiber"));
    expect(fiberSeg).toBeDefined();
    expect(fiberSeg?.text).toContain("trick my best friend into eating his fiber!");

    const fudgeSeg = segments.find((s) => s.text.includes("fudge on your cheek"));
    expect(fudgeSeg).toBeDefined();
  });

  it("Test 6: Interrogation room handle break and panic confession must be verbatim captured", () => {
    const handleSeg = segments.find((s) => s.text.includes("handle fell off"));
    expect(handleSeg).toBeDefined();
    expect(handleSeg?.text).toContain("The handle fell off. So looks like we're locked in!");

    const tailpipeSeg = segments.find((s) => s.text.includes("tailpipe"));
    expect(tailpipeSeg).toBeDefined();
    expect(tailpipeSeg?.text).toContain("sucking on a tailpipe in here");

    const confessSeg = segments.find((s) => s.text.includes("I robbed them"));
    expect(confessSeg).toBeDefined();
    expect(confessSeg?.text).toContain("I did it, I robbed them! BOOM! And that's how it's done!");
  });

  it("Test 7: The Full Bullpen legendary stunt must be verbatim present", () => {
    const bullpenAnnouncement = segments.find((s) => s.text.includes("do the Full Bullpen"));
    expect(bullpenAnnouncement).toBeDefined();
    expect(bullpenAnnouncement?.text).toContain("All the way from Holt's office to the elevator... You're going to do the Full Bullpen!");

    const chantSeg = segments.find((s) => s.text.includes("THE FULL BULLPEN! THE FULL BULLPEN!"));
    expect(chantSeg).toBeDefined();

    const finishSeg = segments.find((s) => s.text.includes("WE DID IT!"));
    expect(finishSeg).toBeDefined();
    expect(finishSeg?.text).toContain("YES! THE FULL BULLPEN! WE DID IT!");
  });
});
