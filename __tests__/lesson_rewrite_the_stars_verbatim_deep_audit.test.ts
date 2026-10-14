import { describe, it, expect } from "vitest";
import {
  LESSON_REWRITE_THE_STARS,
  QUIZ_REWRITE_THE_STARS,
} from "../features/listening/data/lessons/lesson_rewrite_the_stars";

describe("Anne-Marie & James Arthur: Rewrite The Stars (ff4c64b7-ea82-4963-a4f6-1ff808d929e6) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Opening Romantic Dilemma & Idiomatic Resistance (Segments 1-6)", () => {
    const segments = LESSON_REWRITE_THE_STARS.segments;

    // Segment 1 (orderIndex: 1)
    expect(segments[0].orderIndex).toBe(1);
    expect(segments[0].text).toBe(
      "You know I want you, it's not a secret I try to hide."
    );
    expect(segments[0].ipaUs).toBe(
      "/juː noʊ aɪ wɑːnt juː ɪts nɑːt ə ˈsiːkrət aɪ traɪ tuː haɪd/"
    );
    expect(segments[0].keywords).toContain("secret");
    expect(segments[0].keywords).toContain("hide");
    expect(segments[0].keywords).toContain("want");

    // Segment 2 (orderIndex: 2)
    expect(segments[1].orderIndex).toBe(2);
    expect(segments[1].text).toBe(
      "You know you want me, so don't keep saying our hands are tied."
    );
    expect(segments[1].ipaUs).toBe(
      "/juː noʊ juː wɑːnt miː soʊ doʊnt kiːp ˈseɪɪŋ ˈaʊər hændz ɑːr taɪd/"
    );
    expect(segments[1].keywords).toContain("hands are tied");
    expect(segments[1].keywords).toContain("keep saying");

    // Segment 3 (orderIndex: 3)
    expect(segments[2].orderIndex).toBe(3);
    expect(segments[2].text).toBe("You claim it's not in the cards,");
    expect(segments[2].ipaUs).toBe("/juː kleɪm ɪts nɑːt ɪn ðə kɑːrdz/");
    expect(segments[2].keywords).toContain("claim");
    expect(segments[2].keywords).toContain("not in the cards");

    // Segment 4 (orderIndex: 4)
    expect(segments[3].orderIndex).toBe(4);
    expect(segments[3].text).toBe(
      "And fate is pulling you miles away and out of reach from me."
    );
    expect(segments[3].ipaUs).toBe(
      "/ænd feɪt ɪz ˈpʊlɪŋ juː maɪlz əˈweɪ ænd aʊt ʌv riːtʃ frəm miː/"
    );
    expect(segments[3].keywords).toContain("fate");
    expect(segments[3].keywords).toContain("miles away");
    expect(segments[3].keywords).toContain("out of reach");

    // Segment 5 (orderIndex: 5)
    expect(segments[4].orderIndex).toBe(5);
    expect(segments[4].text).toBe("But you're here in my heart,");
    expect(segments[4].ipaUs).toBe("/bʌt jʊr hɪr ɪn maɪ hɑːrt/");
    expect(segments[4].keywords).toContain("here");
    expect(segments[4].keywords).toContain("heart");

    // Segment 6 (orderIndex: 6)
    expect(segments[5].orderIndex).toBe(6);
    expect(segments[5].text).toBe(
      "So who can stop me if I decide that you're my destiny?"
    );
    expect(segments[5].ipaUs).toBe(
      "/soʊ huː kæn stɑːp miː ɪf aɪ dɪˈsaɪd ðæt jʊr maɪ ˈdɛstəni/"
    );
    expect(segments[5].keywords).toContain("stop");
    expect(segments[5].keywords).toContain("decide");
    expect(segments[5].keywords).toContain("destiny");
  });

  it("Audit 2: The Chorus Anthem & Hypothetical Defiance (Segments 7-14)", () => {
    const segments = LESSON_REWRITE_THE_STARS.segments;

    // Segment 7 (orderIndex: 7)
    expect(segments[6].orderIndex).toBe(7);
    expect(segments[6].text).toBe("What if we rewrite the stars?");
    expect(segments[6].ipaUs).toBe("/wʌt ɪf wiː ˌriːˈraɪt ðə stɑːrz/");
    expect(segments[6].keywords).toContain("rewrite");
    expect(segments[6].keywords).toContain("stars");
    expect(segments[6].keywords).toContain("what if");

    // Segment 8 (orderIndex: 8)
    expect(segments[7].orderIndex).toBe(8);
    expect(segments[7].text).toBe("Say you were made to be mine?");
    expect(segments[7].ipaUs).toBe("/seɪ juː wɜːr meɪd tuː biː maɪn/");
    expect(segments[7].keywords).toContain("made to be mine");

    // Segment 9 (orderIndex: 9)
    expect(segments[8].orderIndex).toBe(9);
    expect(segments[8].text).toBe("Nothing could keep us apart,");
    expect(segments[8].ipaUs).toBe("/ˈnʌθɪŋ kʊd kiːp ʌs əˈpɑːrt/");
    expect(segments[8].keywords).toContain("nothing");
    expect(segments[8].keywords).toContain("keep apart");

    // Segment 10 (orderIndex: 10)
    expect(segments[9].orderIndex).toBe(10);
    expect(segments[9].text).toBe("You'd be the one I was meant to find.");
    expect(segments[9].ipaUs).toBe(
      "/juːd biː ðə wʌn aɪ wʌz mɛnt tuː faɪnd/"
    );
    expect(segments[9].keywords).toContain("meant to find");

    // Segment 11 (orderIndex: 11)
    expect(segments[10].orderIndex).toBe(11);
    expect(segments[10].text).toBe("It's up to you, and it's up to me,");
    expect(segments[10].ipaUs).toBe("/ɪts ʌp tuː juː ænd ɪts ʌp tuː miː/");
    expect(segments[10].keywords).toContain("up to you");
    expect(segments[10].keywords).toContain("up to me");

    // Segment 12 (orderIndex: 12)
    expect(segments[11].orderIndex).toBe(12);
    expect(segments[11].text).toBe("No one can say what we get to be.");
    expect(segments[11].ipaUs).toBe("/noʊ wʌn kæn seɪ wʌt wiː ɡɛt tuː biː/");
    expect(segments[11].keywords).toContain("no one");
    expect(segments[11].keywords).toContain("get to be");

    // Segment 13 (orderIndex: 13)
    expect(segments[12].orderIndex).toBe(13);
    expect(segments[12].text).toBe("So why don't we rewrite the stars?");
    expect(segments[12].ipaUs).toBe("/soʊ waɪ doʊnt wiː ˌriːˈraɪt ðə stɑːrz/");
    expect(segments[12].keywords).toContain("why don't we");
    expect(segments[12].keywords).toContain("rewrite the stars");

    // Segment 14 (orderIndex: 14)
    expect(segments[13].orderIndex).toBe(14);
    expect(segments[13].text).toBe("Maybe the world could be ours tonight.");
    expect(segments[13].ipaUs).toBe(
      "/ˈmeɪbi ðə wɜːrld kʊd biː ˈaʊərz təˈnaɪt/"
    );
    expect(segments[13].keywords).toContain("maybe");
    expect(segments[13].keywords).toContain("world");
    expect(segments[13].keywords).toContain("ours");
    expect(segments[13].keywords).toContain("tonight");
  });

  it("Audit 3: Anne-Marie's Verse & The Harsh Societal Divide (Segments 15-18)", () => {
    const segments = LESSON_REWRITE_THE_STARS.segments;

    // Segment 15 (orderIndex: 15)
    expect(segments[14].orderIndex).toBe(15);
    expect(segments[14].text).toBe(
      "You think it's easy, you think I don't want to run to you, yeah."
    );
    expect(segments[14].ipaUs).toBe(
      "/juː θɪŋk ɪts ˈiːzi juː θɪŋk aɪ doʊnt wɑːnt tuː rʌn tuː juː jɛə/"
    );
    expect(segments[14].keywords).toContain("easy");
    expect(segments[14].keywords).toContain("run to you");

    // Segment 16 (orderIndex: 16)
    expect(segments[15].orderIndex).toBe(16);
    expect(segments[15].text).toBe(
      "But there are mountains, and there are doors that we can't walk through."
    );
    expect(segments[15].ipaUs).toBe(
      "/bʌt ðɛr ɑːr ˈmaʊntənz ænd ðɛr ɑːr dɔːrz ðæt wiː kænt wɔːk θruː/"
    );
    expect(segments[15].keywords).toContain("mountains");
    expect(segments[15].keywords).toContain("doors");
    expect(segments[15].keywords).toContain("walk through");

    // Segment 17 (orderIndex: 17)
    expect(segments[16].orderIndex).toBe(17);
    expect(segments[16].text).toBe(
      "I know you're wondering why, because we're able to be just you and me within these walls."
    );
    expect(segments[16].ipaUs).toBe(
      "/aɪ noʊ jʊr ˈwʌndərɪŋ waɪ bɪˈkəz wɪr ˈeɪbl tuː biː dʒʌst juː ænd miː wɪˈðɪn ðiːz wɔːlz/"
    );
    expect(segments[16].keywords).toContain("wondering");
    expect(segments[16].keywords).toContain("within these walls");

    // Segment 18 (orderIndex: 18)
    expect(segments[17].orderIndex).toBe(18);
    expect(segments[17].text).toBe(
      "But when we go outside, you're gonna wake up and see that it was hopeless after all."
    );
    expect(segments[17].ipaUs).toBe(
      "/bʌt wɛn wiː ɡoʊ ˌaʊtˈsaɪd jʊr ˈɡənə weɪk ʌp ænd siː ðæt ɪt wʌz ˈhoʊpləs ˈæftər ɔːl/"
    );
    expect(segments[17].keywords).toContain("outside");
    expect(segments[17].keywords).toContain("wake up");
    expect(segments[17].keywords).toContain("hopeless");
    expect(segments[17].keywords).toContain("after all");
  });

  it("Audit 4: Pedagogical Quiz Reference Concordance", () => {
    const quiz = QUIZ_REWRITE_THE_STARS;
    const segments = LESSON_REWRITE_THE_STARS.segments;

    // Q1 -> referenceSegmentIndex: 2
    expect(quiz.questions[0].referenceSegmentIndex).toBe(2);
    expect(segments[quiz.questions[0].referenceSegmentIndex! - 1].text).toContain("hands are tied");

    // Q2 -> referenceSegmentIndex: 3
    expect(quiz.questions[1].referenceSegmentIndex).toBe(3);
    expect(segments[quiz.questions[1].referenceSegmentIndex! - 1].text).toContain("not in the cards");

    // Q3 -> referenceSegmentIndex: 7
    expect(quiz.questions[2].referenceSegmentIndex).toBe(7);
    expect(segments[quiz.questions[2].referenceSegmentIndex! - 1].text).toContain("rewrite the stars");

    // Q4 -> referenceSegmentIndex: 8
    expect(quiz.questions[3].referenceSegmentIndex).toBe(8);
    expect(segments[quiz.questions[3].referenceSegmentIndex! - 1].text).toContain("Say you were made to be mine");

    // Q5 -> referenceSegmentIndex: 11
    expect(quiz.questions[4].referenceSegmentIndex).toBe(11);
    expect(segments[quiz.questions[4].referenceSegmentIndex! - 1].text).toContain("It's up to you, and it's up to me");

    // Q6 -> referenceSegmentIndex: 15
    expect(quiz.questions[5].referenceSegmentIndex).toBe(15);
    expect(segments[quiz.questions[5].referenceSegmentIndex! - 1].text).toContain("You think it's easy");

    // Q7 -> referenceSegmentIndex: 16
    expect(quiz.questions[6].referenceSegmentIndex).toBe(16);
    expect(segments[quiz.questions[6].referenceSegmentIndex! - 1].text).toContain("mountains");
    expect(segments[quiz.questions[6].referenceSegmentIndex! - 1].text).toContain("doors");

    // Q8 -> referenceSegmentIndex: 17
    expect(quiz.questions[7].referenceSegmentIndex).toBe(17);
    expect(segments[quiz.questions[7].referenceSegmentIndex! - 1].text).toContain("within these walls");
  });
});
