import { describe, it, expect } from "vitest";
import {
  LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_the_office_michael_scott";

describe("The Office: Michael Scott's Conference Meetings - Verbatim & Iconic Scene Deep Audit", () => {
  const segments = LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.segments;
  const fullDialogue = segments.map((s) => s.text).join(" ");

  it("Act 1: should faithfully capture the Bouncing DVD Screensaver obsession", () => {
    expect(fullDialogue).toContain("quarterly reports");
    expect(fullDialogue).toContain("storm cloud");
    expect(fullDialogue).toContain("cube on the screen, it bounces around");
    expect(fullDialogue).toContain("heading right into the corner of the screen");
    expect(fullDialogue).toContain("Pam claims that she saw it");
    expect(fullDialogue).toContain("Where's Waldo");
    expect(fullDialogue).toContain("quit while we're ahead");
    expect(fullDialogue).toContain("Some days I am just on fire!");

    const dvdSegs = segments.filter((s) => s.startTime >= 0.0 && s.endTime <= 96.0);
    expect(dvdSegs.length).toBeGreaterThanOrEqual(18);
  });

  it("Act 2: should faithfully capture the PowerPoint presentation & moonlighting telemarketing reveal", () => {
    expect(fullDialogue).toContain("talking about PowerPoint");
    expect(fullDialogue.toLowerCase()).toContain("winning the lottery");
    expect(fullDialogue).toContain("That's what she said!");
    expect(fullDialogue).toContain("twelve minutes");
    expect(fullDialogue).toContain("first time you've opened PowerPoint");
    expect(fullDialogue).toContain("Mr. Figueroa");
    expect(fullDialogue).toContain("nobody's business but mine and my other business");
    expect(fullDialogue).toContain("second job if it affects your work");
    expect(fullDialogue).toContain("Darryl, back downstairs");
  });

  it("Act 3: should faithfully capture the legendary 'Whomever vs Whoever' grammar battle", () => {
    expect(fullDialogue).toContain("to whomever");
    expect(fullDialogue).toContain("It's whoever, not whomever");
    expect(fullDialogue).toContain("Whomever is never actually right");
    expect(fullDialogue).toContain("made-up word used to trick students");
    expect(fullDialogue).toContain("didn't come see my band last night");
    expect(fullDialogue).toContain("object of the sentence and who when it's the subject");
    expect(fullDialogue).toContain("indirect object, which is the correct usage");
    expect(fullDialogue).toContain("whomever's name is Toby, why don't you take a letter opener and stick it into your skull");
  });

  it("Act 4: should faithfully capture the Murder in Savannah financial crisis diversion", () => {
    expect(fullDialogue).toContain("stop all payments to our vendors");
    expect(fullDialogue).toContain("paper seeds");
    expect(fullDialogue).toContain("murder in Savannah, and you are all suspects");
    expect(fullDialogue).toContain("Beatrix Bourbon was poisoned");
  });

  it("Act 5: should faithfully capture Prison Mike's Dementors and gruel speech", () => {
    expect(fullDialogue).toContain("corporate maligning, slurring");
    expect(fullDialogue).toContain("I'm Prison Mike! You know why they call me Prison Mike?");
    expect(fullDialogue).toContain("talk in the clink");
    expect(fullDialogue).toContain("scare you straight");
    expect(fullDialogue).toContain("belle of the ball. Don't drop the soap!");
    expect(fullDialogue).toContain("Internet. And prison. Fifty-fifty");
    expect(fullDialogue).toContain("kidnapped the President's son, and held him for ransom");
    expect(fullDialogue).toContain("never got caught neither");
    expect(fullDialogue).toContain("Gruel sandwiches. Gruel omelets. Nothing but gruel!");
    expect(fullDialogue).toContain("worst thing about prison was the Dementors");
    expect(fullDialogue).toContain("suck the soul out of your body");
    expect(fullDialogue).toContain("no movies in prison");
    expect(fullDialogue).toContain("freakin' awesome! The people are awesome, your boss is nice");
  });

  it("Act 6: should faithfully capture the energizing office brainstorm & Stanley's outburst", () => {
    expect(fullDialogue).toContain("Pamela Morgan Beesly");
    expect(fullDialogue).toContain("proposing that you get me a cup of coffee");
    expect(fullDialogue).toContain("get things percolating");
    expect(fullDialogue).toContain("more zing and a little more pepper, cayenne pepper");
    expect(fullDialogue).toContain("brainstorm session");
    expect(fullDialogue).toContain("DID I STUTTER?!");
    expect(fullDialogue).toContain("grab a glass of water");
  });

  it("Act 7 & 8: should faithfully capture Lazy Scranton rap and the Finger-Gun Mexican Standoff", () => {
    expect(fullDialogue).toContain("poison beef! No touchy, the beef is poison!");
    expect(fullDialogue).toContain("Lazy Scranton");
    expect(fullDialogue).toContain("The Electric City! They call it that 'cause of the elec-tri-city");
    expect(fullDialogue).toContain("poison control if you're bit by a spider");
    expect(fullDialogue).toContain("The Scranton Witch Project");
    expect(fullDialogue).toContain("put down our guns");
    expect(fullDialogue).toContain("I have crossbows");
    expect(fullDialogue).toContain("double agent");
    expect(fullDialogue).toContain("six o'clock");
    expect(fullDialogue).toContain("Get the keys out of my purse, start the car");
  });
});
