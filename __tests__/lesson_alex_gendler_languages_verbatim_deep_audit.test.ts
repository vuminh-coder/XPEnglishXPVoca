import { describe, it, expect } from "vitest";
import {
  LESSON_ALEX_GENDLER_LANGUAGES,
  QUIZ_ALEX_GENDLER_LANGUAGES,
} from "../features/listening/data/lessons/lesson_alex_gendler_languages";

describe("TED-Ed: How Languages Evolve - Alex Gendler (vid_alex_gendler_languages) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Biblical Myth & Early Human Migration (Segments 0-7)", () => {
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;
    expect(segments[0].text).toContain("In the biblical story of the Tower of Babel, all of humanity once spoke a single language");
    expect(segments[0].properNouns).toContain("Tower of Babel");
    expect(segments[0].keywords).toContain("biblical story");

    expect(segments[1].text).toContain("We don't really know if such an original language ever existed");
    expect(segments[1].keywords).toContain("original language");

    expect(segments[2].text).toBe("So how did we end up with so many?");
    expect(segments[2].keywords).toContain("end up with");

    expect(segments[3].text).toContain("In the early days of human migration, the world was much less populated.");
    expect(segments[3].keywords).toContain("human migration");

    expect(segments[4].text).toContain("going separate ways in search of fresh game and fertile land.");
    expect(segments[4].keywords).toContain("fresh game");

    expect(segments[5].text).toContain("they became isolated from one another and developed in different ways.");
    expect(segments[5].keywords).toContain("isolated from");

    expect(segments[6].text).toContain("turned similar dialects with varied pronunciation and vocabulary into radically different languages,");
    expect(segments[6].keywords).toContain("radically different");

    expect(segments[7].text).toBe("continuing to divide as populations grew and spread out further.");
    expect(segments[7].keywords).toContain("spread out further");
  });

  it("Audit 2: Genealogists, Language Families & Protolanguages (Segments 8-15)", () => {
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;
    expect(segments[8].text).toContain("Like genealogists, modern linguists try to map this process");
    expect(segments[8].text).toContain("to their common ancestor, or protolanguage.");
    expect(segments[8].keywords).toContain("protolanguage");

    expect(segments[9].text).toContain("A group of all languages related in this way is called a language family,");
    expect(segments[9].keywords).toContain("language family");

    expect(segments[10].text).toBe("So how do we determine whether languages are related in the first place?");
    expect(segments[10].keywords).toContain("in the first place");

    expect(segments[11].text).toBe("Similar sounding words don't tell us much.");
    expect(segments[11].keywords).toContain("similar sounding");

    expect(segments[12].text).toContain("They could be false cognates or just directly borrowed terms");
    expect(segments[12].keywords).toContain("false cognates");

    expect(segments[13].text).toContain("Grammar and syntax are a more reliable guide, as well as basic vocabulary, such as pronouns, numbers or kinship terms,");
    expect(segments[13].keywords).toContain("kinship terms");

    expect(segments[14].text).toContain("By systematically comparing these features and looking for regular patterns of sound changes");
    expect(segments[14].keywords).toContain("sound changes");

    expect(segments[15].text).toContain("linguists can determine relationships, trace specific steps in their evolution and even reconstruct earlier languages with no written records.");
    expect(segments[15].keywords).toContain("reconstruct");
  });

  it("Audit 3: Historical Clues & Linguistic Paleontology (Segments 16-17)", () => {
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;
    expect(segments[16].text).toBe("Linguistics can even reveal other important historical clues,");
    expect(segments[16].keywords).toContain("historical clues");

    expect(segments[17].text).toContain("such as determining the geographic origins and lifestyles of ancient peoples based on which of their words were native, and which were borrowed.");
    expect(segments[17].keywords).toContain("geographic origins");
    expect(segments[17].keywords).toContain("native words");
  });

  it("Audit 4: Language vs Dialect Boundary Problem & Chinese vs Romance Contrast (Segments 18-23)", () => {
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;
    expect(segments[18].text).toBe("There are two main problems linguists face when constructing these language family trees.");
    expect(segments[18].keywords).toContain("two main problems");

    expect(segments[19].text).toContain("which dialects should be considered separate languages or vice versa.");
    expect(segments[19].keywords).toContain("separate languages");

    expect(segments[20].text).toContain("Chinese is classified as a single language, but its dialects vary to the point of being mutually unintelligible,");
    expect(segments[20].text).toContain("while speakers of Spanish and Portuguese can often understand each other.");
    expect(segments[20].properNouns).toContain("Chinese");
    expect(segments[20].properNouns).toContain("Spanish");
    expect(segments[20].properNouns).toContain("Portuguese");
    expect(segments[20].keywords).toContain("mutually unintelligible");

    expect(segments[21].text).toContain("Languages actually spoken by living people do not exist in neatly divided categories, but tend to transition gradually,");
    expect(segments[21].keywords).toContain("transition gradually");

    expect(segments[22].text).toContain("Often the difference between languages and dialects is a matter of changing political and national considerations,");
    expect(segments[22].keywords).toContain("political considerations");

    expect(segments[23].text).toContain("This is why the answer to, \"How many languages are there?\" can be anywhere between 3,000 and 8,000, depending on who's counting.");
    expect(segments[23].keywords).toContain("between 3,000 and 8,000");
  });

  it("Audit 5: Deep Time Evidence & Super Families Hypothesis (Segments 24-29)", () => {
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;
    expect(segments[24].text).toContain("The other problem is that the farther we move back in time towards the top of the tree, the less evidence we have about the languages there.");
    expect(segments[24].keywords).toContain("less evidence");

    expect(segments[25].text).toContain("The current division of major language families represents the limit at which relationships can be established with reasonable certainty,");
    expect(segments[25].keywords).toContain("reasonable certainty");

    expect(segments[26].text).toBe("meaning that languages of different families are presumed not to be related on any level.");
    expect(segments[26].keywords).toContain("presumed");

    expect(segments[27].text).toBe("But this may change.");
    expect(segments[27].keywords).toContain("this may change");

    expect(segments[28].text).toContain("While many proposals for higher level relationships -- or super families -- are speculative,");
    expect(segments[28].keywords).toContain("super families");

    expect(segments[29].text).toContain("some have been widely accepted and others are being considered, especially for native languages with small speaker populations");
    expect(segments[29].keywords).toContain("native languages");
  });

  it("Audit 6: Ultimate Origin, Babel of Migration & Inspiring Finale (Segments 30-32)", () => {
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;
    expect(segments[30].text).toContain("We may never be able to determine how language came about, or whether all human languages did in fact have a common ancestor scattered through the babel of migration.");
    expect(segments[30].keywords).toContain("common ancestor");
    expect(segments[30].keywords).toContain("babel of migration");

    expect(segments[31].text).toBe("But the next time you hear a foreign language, pay attention.");
    expect(segments[31].keywords).toContain("pay attention");

    expect(segments[32].text).toBe("It may not be as foreign as you think.");
    expect(segments[32].keywords).toContain("may not be");
    expect(segments[32].endTime).toBe(226.6);
  });

  it("Audit 7: Quiz Conceptual Synchronization with Lesson Content (1-indexed)", () => {
    const questions = QUIZ_ALEX_GENDLER_LANGUAGES.questions;
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;

    expect(questions[0].targetedConcept).toContain("Tower of Babel");
    expect(questions[0].referenceSegmentIndex).toBe(1);
    expect(segments[questions[0].referenceSegmentIndex! - 1].text).toContain("Tower of Babel");

    expect(questions[1].targetedConcept).toContain("Geographic Isolation");
    expect(questions[1].referenceSegmentIndex).toBe(5);
    expect(segments[questions[1].referenceSegmentIndex! - 1].text).toContain("split into smaller tribes");

    expect(questions[2].targetedConcept).toContain("Protolanguage");
    expect(questions[2].referenceSegmentIndex).toBe(9);
    expect(segments[questions[2].referenceSegmentIndex! - 1].text).toContain("protolanguage");

    expect(questions[3].targetedConcept).toContain("False Cognates");
    expect(questions[3].referenceSegmentIndex).toBe(13);
    expect(segments[questions[3].referenceSegmentIndex! - 1].text).toContain("false cognates");

    expect(questions[4].targetedConcept).toContain("Kinship Terms");
    expect(questions[4].referenceSegmentIndex).toBe(14);
    expect(segments[questions[4].referenceSegmentIndex! - 1].text).toContain("kinship terms");

    expect(questions[5].targetedConcept).toContain("Mutual Intelligibility");
    expect(questions[5].referenceSegmentIndex).toBe(21);
    expect(segments[questions[5].referenceSegmentIndex! - 1].text).toContain("mutually unintelligible");

    expect(questions[6].targetedConcept).toContain("Political Factors");
    expect(questions[6].referenceSegmentIndex).toBe(23);
    expect(segments[questions[6].referenceSegmentIndex! - 1].text).toContain("political and national considerations");

    expect(questions[7].targetedConcept).toContain("Dialect Continuum");
    expect(questions[7].referenceSegmentIndex).toBe(24);
    expect(segments[questions[7].referenceSegmentIndex! - 1].text).toContain("How many languages are there");
  });
});
