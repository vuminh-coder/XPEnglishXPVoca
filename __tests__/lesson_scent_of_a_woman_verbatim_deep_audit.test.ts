import { describe, it, expect } from "vitest";
import {
  LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE,
  QUIZ_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE,
} from "../features/listening/data/lessons/movies/inspirational/lesson_scent_of_a_woman";

describe("Scent of a Woman: Al Pacino Baird Defense (mov_insp_11) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Opening Clashes & Refusal to Be a Snitch (Segments 0-6)", () => {
    const segments = LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE.segments;
    expect(segments[0].text).toContain("recommend to the disciplinary committee that you be expelled");
    expect(segments[0].properNouns).toContain("Mr. Simms");

    expect(segments[1].text).toBe("You are a cover-up artist, and you are a liar.");
    expect(segments[1].keywords).toContain("cover-up artist");

    expect(segments[2].text).toBe("But not a snitch!");
    expect(segments[2].keywords).toContain("not a snitch");

    expect(segments[4].text).toBe("No, I don't think I will, Mr. Trask!");
    expect(segments[5].text).toBe("This is such a crock of shit!");
    expect(segments[5].keywords).toContain("crock of shit");

    expect(segments[6].text).toBe("Please watch your language, Mr. Slade. You are in the Baird School, not a barracks.");
    expect(segments[6].properNouns).toEqual(expect.arrayContaining(["Mr. Slade", "Baird School"]));
  });

  it("Audit 2: The School's Hypocritical Motto & The Two Boys (Segments 7-14)", () => {
    const segments = LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE.segments;
    expect(segments[8].text).toContain("He doesn't need to be labeled 'still worthy of being a Baird man'!");
    expect(segments[8].properNouns).toContain("Baird");

    expect(segments[10].text).toBe("'Boys, inform on your classmates, save your own hide'?");
    expect(segments[10].keywords).toEqual(expect.arrayContaining(["inform on", "save your own hide"]));

    expect(segments[11].text).toBe("Anything short of that, we're gonna burn you at the stake?");
    expect(segments[11].keywords).toContain("burn you at the stake");

    expect(segments[12].text).toContain("when the shit hits the fan, some guys run and some guys stay.");
    expect(segments[13].text).toBe("Here's Charlie facing the fire, and there's George hiding in Big Daddy's pocket!");
    expect(segments[13].properNouns).toEqual(expect.arrayContaining(["Charlie", "George"]));

    expect(segments[14].text).toBe("And what are you doing? You're going to reward George, and destroy Charlie!");
  });

  it("Audit 3: The Rat Ship Metaphor & Non-Negotiable Soul (Segments 15-26)", () => {
    const segments = LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE.segments;
    expect(segments[16].text).toBe("No, I'm just getting warmed up!");
    expect(segments[17].properNouns).toEqual(
      expect.arrayContaining(["William Howard Taft", "William Jennings Bryan", "William Tell"])
    );

    expect(segments[19].text).toBe("You're building a rat ship here. A vessel for seagoing snitches!");
    expect(segments[19].keywords).toEqual(expect.arrayContaining(["rat ship", "seagoing snitches"]));

    expect(segments[21].text).toContain("killing the very spirit this institution proclaims it instills!");
    expect(segments[23].text).toBe("I mean, the only class in this act is sitting next to me!");

    expect(segments[24].text).toBe("And I'm here to tell you, this boy's soul is intact! It's non-negotiable!");
    expect(segments[24].keywords).toContain("non-negotiable");

    expect(segments[25].text).toContain("Someone here—and I'm not gonna say who—offered to buy it.");
    expect(segments[26].text).toBe("Only Charlie here wasn't selling!");
  });

  it("Audit 4: Out of Order, Flamethrower & Amputated Spirit (Segments 27-36)", () => {
    const segments = LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE.segments;
    expect(segments[28].text).toBe("Out of order?! I'll show you out of order! You don't know what 'out of order' is, Mr. Trask!");
    expect(segments[29].text).toBe("I'd show you, but I'm too old, I'm too tired, I'm too fuckin' blind!");
    expect(segments[30].text).toContain("I'd take a flamethrower to this place!");

    expect(segments[33].text).toContain("their arms torn out, their legs ripped off.");
    expect(segments[34].text).toBe("But there is nothing like the sight of an amputated spirit. There is no prosthetic for that!");
    expect(segments[34].keywords).toEqual(expect.arrayContaining(["amputated spirit", "prosthetic"]));

    expect(segments[35].text).toContain("sending this splendid foot soldier back home to Oregon with his tail between his legs?");
    expect(segments[35].properNouns).toContain("Oregon");

    expect(segments[36].text).toBe("But I say you are executing his soul!");
  });

  it("Audit 5: The Bough Breaks & Definition of True Leadership (Segments 37-47)", () => {
    const segments = LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE.segments;
    expect(segments[38].text).toBe("You hurt this boy, you're gonna be Baird bums!");
    expect(segments[39].properNouns).toEqual(expect.arrayContaining(["Harry", "Jimmy", "Trent"]));

    expect(segments[41].text).toContain("'cradle of leadership'");
    expect(segments[42].text).toBe("Well, when the bough breaks, the cradle will fall. And it has fallen here. It has fallen!");
    expect(segments[42].keywords).toContain("cradle will fall");

    expect(segments[43].text).toContain("Makers of men! Creators of leaders!");
    expect(segments[45].text).toBe("But I can tell you this: he won't sell anybody out to buy his future!");

    expect(segments[46].text).toBe("And that, my friends, is called integrity! That's called courage!");
    expect(segments[46].keywords).toEqual(expect.arrayContaining(["integrity", "courage"]));

    expect(segments[47].text).toBe("Now that's the stuff leaders should be made of!");
  });

  it("Audit 6: Personal Crossroads, Principle & Character (Segments 48-53)", () => {
    const segments = LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE.segments;
    expect(segments[48].text).toContain("Now I have come to the crossroads in my life.");
    expect(segments[48].keywords).toContain("crossroads");

    expect(segments[49].text).toBe("But I never took it. You know why? It was too damn hard.");
    expect(segments[50].text).toContain("He has chosen a path. It's the right path.");

    expect(segments[51].text).toBe("It's a path made of principle that leads to character. Let him continue on his journey!");
    expect(segments[51].keywords).toEqual(expect.arrayContaining(["made of principle", "leads to character"]));

    expect(segments[52].text).toContain("You hold this boy's future in your hands, committee.");
    expect(segments[53].text).toBe("Don't destroy it. Protect it. Embrace it. It's gonna make you proud one day, I promise you.");
  });

  it("Audit 7: Whispered Bond & Committee Verdict Announcement (Segments 54-61)", () => {
    const segments = LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE.segments;
    expect(segments[54].text).toBe("How's that for a call, Colonel?");
    expect(segments[54].properNouns).toContain("Colonel");

    expect(segments[55].text).toBe("Nothing like shutting 'em up.");
    expect(segments[56].text).toContain("closed session");

    expect(segments[57].text).toBe("Apparently that meeting will be unnecessary, Mr. Trask.");
    expect(segments[58].text).toContain("The joint student-faculty disciplinary committee needs no further sessions.");

    expect(segments[59].text).toContain("Messrs. Havemeyer, Potter, and Jameson are placed on probation for suspicion of ungentlemanly conduct.");
    expect(segments[59].properNouns).toEqual(expect.arrayContaining(["Havemeyer", "Potter", "Jameson"]));

    expect(segments[60].text).toContain("Mr. George Willis Jr. receive neither recognition nor commendation for his cooperation.");
    expect(segments[60].properNouns).toContain("George Willis Jr.");

    expect(segments[61].text).toBe("Mr. Charles Simms is excused from any further response to this incident.");
    expect(segments[61].properNouns).toContain("Mr. Charles Simms");
  });
});
