import { describe, it, expect } from "vitest";
import {
  LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS,
  QUIZ_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_ted_lasso";

describe("Ted Lasso: Iconic Darts Scene & Top Moments (mov_sit_11) - Verbatim Deep Audit Suite", () => {
  const segments = LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS.segments;

  it("Test 1: Verbatim Audit of Opening Song & Rebecca's Confession (Segments 0-12)", () => {
    // Opening lyrics
    expect(segments[0].text).toBe("Looking out for something, it's the right time.");
    expect(segments[0].translationVi).toContain("thời điểm thích hợp");
    expect(segments[1].text).toBe("To be clean again, maybe win again.");

    // Rebecca enters Ted's office
    expect(segments[2].text).toBe("I have something I need to tell you.");
    expect(segments[3].text).toBe("Deja vu? Nope, that's new.");
    expect(segments[4].text).toContain("Ted, I lied to you. I hired you because I wanted this team to lose.");
    expect(segments[5].text).toBe("I wanted you to fail.");
    expect(segments[6].text).toContain("And I sabotaged you every chance I've had.");
    expect(segments[6].properNouns).toContain("Keeley");
    expect(segments[7].text).toContain("Trent Crimm");
    expect(segments[7].properNouns).toContain("Trent Crimm");
    expect(segments[8].text).toContain("Jamie Tartt");
    expect(segments[8].properNouns).toContain("Jamie Tartt");
    expect(segments[9].text).toContain("This club is all that Rupert has ever cared about");
    expect(segments[9].properNouns).toContain("Rupert");
    expect(segments[10].text).toContain("all you good people just trying to make a difference.");
    expect(segments[11].text).toBe("Ted, I'm so sorry.");
    expect(segments[12].text).toBe("If you want to quit or call the press, I'll completely understand.");
  });

  it("Test 2: Verbatim Audit of Ted's Radical Empathy & Forgiveness (Segments 13-22)", () => {
    // Ted's instant forgiveness
    expect(segments[13].text).toBe("I forgive you.");
    expect(segments[13].translationVi).toContain("Tôi tha thứ cho cô.");
    expect(segments[14].text).toBe("You what? Why?");
    expect(segments[15].text).toBe(
      "Divorce is hard. It doesn't matter if you're the one leaving or the one who got left. It makes folks do crazy things."
    );
    expect(segments[16].text).toContain("Hell, I'm coaching soccer for heaven's sake in London! I mean, that's nuts.");
    expect(segments[16].properNouns).toContain("London");
    expect(segments[17].text).toBe("Yeah, this job you gave me has changed my life.");
    expect(segments[18].text).toBe("It gave me the distance I needed to see what was really going on.");
    expect(segments[19].text).toBe("Yeah. But you and me? We're okay.");
    expect(segments[20].text).toBe("Come on, just shake this hand, my arm's starting to hurt.");
    expect(segments[21].text).toContain("if you care about someone and you got a little love in your heart, there ain't nothing you can't get through together.");
    expect(segments[22].text).toBe("You know what I'm saying?");
  });

  it("Test 3: Verbatim Audit of Crown & Anchor Pub Confrontation with Rupert (Segments 23-30)", () => {
    expect(segments[23].text).toBe("You're not just talking about us now, are you?");
    expect(segments[24].text).toBe("Maybe not.");

    // Rupert enters Mae's pub
    expect(segments[25].text).toContain("I hear you made a little change for practice.");
    expect(segments[26].text).toContain("Nice seeing you down here, boss. He livens up the place.");
    expect(segments[27].text).toContain("I should be putting your boy Bumbercatch back on defense where he belongs, that's it.");
    expect(segments[27].properNouns).toContain("Bumbercatch");
    expect(segments[28].text).toContain("My ex-wife's the one who brought the hillbilly to our shores.");
    expect(segments[29].text).toContain("I know she's always been a bit randy");
    expect(segments[30].text).toBe("Hey, better manners when I'm holding darts, please.");
  });

  it("Test 4: Verbatim Audit of The Legendary Darts Scene & Walt Whitman's Philosophy (Segments 31-40)", () => {
    // The rules setup
    expect(segments[31].text).toBe("Mate, what do I need to win?");
    expect(segments[32].text).toBe("Two treble twenties and a bullseye.");
    expect(segments[33].text).toBe("Good luck.");

    // Ted's monologue
    expect(segments[34].text).toBe("You know, Rupert, guys have underestimated me my entire life.");
    expect(segments[34].properNouns).toContain("Rupert");
    expect(segments[35].text).toBe("And for years, I never understood why. It used to really bother me.");
    expect(segments[36].text).toContain("I saw this quote by Walt Whitman.");
    expect(segments[36].properNouns).toContain("Walt Whitman");
    expect(segments[37].text).toBe("It was painted on the wall there. It said: 'Be curious, not judgmental.' I like that.");
    expect(segments[38].text).toContain("So I get back in my car, and I'm driving to work, and all of a sudden it hits me.");
    expect(segments[39].text).toContain("All them fellas that used to belittle me, not a single one of them were curious.");
    expect(segments[40].text).toContain("they judged everything, and they judged everyone.");
    expect(segments[41].text).toContain("And I realized that their underestimating me... who I was had nothing to do with it.");
  });

  it("Test 5: Verbatim Audit of Winning Darts & Jamie's Secret Santa (Segments 41-50)", () => {
    // Finishing the darts monologue
    const textAll = segments.map((s) => s.text).join(" ");
    expect(textAll).toContain("Have you played a lot of darts, Ted?");
    expect(textAll).toContain("Every Sunday afternoon at a sports bar with my father");
    expect(textAll).toContain("Barbecue sauce!");

    // Secret Santa moment
    expect(textAll).toContain("Merry Christmas! Merry Christmas! Merry Christmas!");
    expect(textAll).toContain("Did you buy a Secret Santa gift?");
    expect(textAll).toContain("The email said secret santa. I didn't want to ruin the surprise!");
    expect(textAll).toContain("God bless me, everyone!");
  });

  it("Test 6: Verbatim Audit of Amsterdam Bike Riding Lesson & Nate's Security Footage (Segments 51-73)", () => {
    const textAll = segments.map((s) => s.text).join(" ");

    // Amsterdam Bike scene
    expect(textAll).toContain("I don't know how to ride a bike!");
    expect(textAll).toContain("Voila, sixty euros.");
    expect(textAll).toContain("No refund!");
    expect(textAll).toContain("ride for Granddad");
    expect(textAll).toContain("sit up, look up, pedal!");
    expect(textAll).toContain("It's all about balance, man, just like dribbling. If you can dribble, you can balance.");

    // Roy's football critique & Zava transfer
    expect(textAll).toContain("He was such a coward.");
    expect(textAll).toContain("choose a club like West Ham because it's big and shiny");
    expect(textAll).toContain("You're overrated, not overpaid.");
    expect(textAll).toContain("eat too much damn asparagus!");
    expect(textAll).toContain("will play for Richmond!");

    // Nate's video & Ted's second chance speech
    expect(textAll).toContain("Nate had to hide under my desk here for like three whole hours");
    expect(textAll).toContain("His legs just got to be jelly, barely stand up.");
    expect(textAll).toContain("either all of us or none of us are judged by the actions of our weakest moments");
    expect(textAll).toContain("rather by the strength we show when and if we're ever given a second chance.");
  });

  it("Test 7: Verbatim Audit of Jamie's Emotional Burnout & Coach Beard's Plane Epiphany (Segments 74-87)", () => {
    const textAll = segments.map((s) => s.text).join(" ");

    // Jamie's burnout
    expect(textAll).toContain("prickiest prick you've ever been");
    expect(textAll).toContain("I wash my hair, but I don't use any conditioner anymore because I'm like: What's the point?");
    expect(textAll).toContain("like the guy in the Red Bull commercial who's pushing that big rock up the hill");
    expect(textAll).toContain("I feel like I've lost my wings, Roy.");
    expect(textAll).toContain("Where the hell are my wings, Roy?");

    // Coach Beard's flight epiphany
    expect(textAll).toContain("I don't want to go, Ted. I'm in love with Jane.");
    expect(textAll).toContain("forget my luggage, it's full of rice!");
    expect(textAll).toContain("You ain't abandoning me! Hey, you're just following your heart.");
    expect(textAll).toContain("I love you too, Willis.");
    expect(textAll).toContain("Doors cross-checked, please prepare for departure.");

    // Quiz cross-reference validation
    const quiz = QUIZ_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS;
    for (const q of quiz.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      const targetSeg = segments[q.referenceSegmentIndex!];
      expect(targetSeg).toBeDefined();
      expect(targetSeg.orderIndex).toBe(q.referenceSegmentIndex);
    }
  });
});
