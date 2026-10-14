import { describe, it, expect } from "vitest";
import {
  LESSON_TED_BILINGUAL_BRAIN,
  QUIZ_TED_BILINGUAL_BRAIN,
} from "../features/listening/data/lessons/lesson_ted_bilingual_brain";

describe("TED-Ed: The Benefits of a Bilingual Brain (vid_ted_bilingual_brain) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Opening Polyglot Greeting & Global Majority Demographics (Segments 0-4)", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    expect(segments[0].text).toContain("¿Hablas español? Parlez-vous français?");
    expect(segments[0].properNouns).toContain("Hablas");
    expect(segments[0].properNouns).toContain("español");

    expect(segments[1].text).toContain('If you answered, "sí," "oui," or "会" and you\'re watching this in English,');
    expect(segments[1].properNouns).toContain("English");

    expect(segments[2].text).toBe("chances are you belong to the world's bilingual and multilingual majority.");
    expect(segments[2].keywords).toContain("bilingual");
    expect(segments[2].keywords).toContain("majority");

    expect(segments[3].text).toContain("And besides having an easier time traveling or watching movies without subtitles,");
    expect(segments[3].keywords).toContain("subtitles");

    expect(segments[4].text).toContain("knowing two or more languages means that your brain may actually look and work differently than those of your monolingual friends.");
    expect(segments[4].keywords).toContain("monolingual");
  });

  it("Audit 2: Measuring Language Ability: Active vs. Passive & Balanced vs. Varying Proportions (Segments 5-9)", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    expect(segments[5].text).toBe("So what does it really mean to know a language?");

    expect(segments[6].text).toContain("Language ability is typically measured in two active parts, speaking and writing, and two passive parts, listening and reading.");
    expect(segments[6].keywords).toContain("active parts");
    expect(segments[6].keywords).toContain("passive parts");

    expect(segments[7].text).toBe("While a balanced bilingual has near equal abilities across the board in two languages,");
    expect(segments[7].keywords).toContain("balanced bilingual");
    expect(segments[7].keywords).toContain("across the board");

    expect(segments[8].text).toBe("most bilinguals around the world know and use their languages in varying proportions.");
    expect(segments[8].keywords).toContain("varying proportions");

    expect(segments[9].text).toContain("And depending on their situation and how they acquired each language, they can be classified into three general types.");
    expect(segments[9].keywords).toContain("three general types");
  });

  it("Audit 3: The Three Types: Compound, Coordinate, and Subordinate Bilinguals - Gabriella's Family (Segments 10-15)", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    expect(segments[10].text).toContain("For example, let's take Gabriella, whose family immigrates to the US from Peru when she's two-years old.");
    expect(segments[10].properNouns).toContain("Gabriella");
    expect(segments[10].properNouns).toContain("Peru");

    expect(segments[11].text).toContain("As a compound bilingual, Gabriella develops two linguistic codes simultaneously, with a single set of concepts,");
    expect(segments[11].keywords).toContain("compound bilingual");
    expect(segments[11].keywords).toContain("single set of concepts");

    expect(segments[12].text).toContain("learning both English and Spanish as she begins to process the world around her.");
    expect(segments[12].properNouns).toContain("Spanish");

    expect(segments[13].text).toContain("Her teenage brother, on the other hand, might be a coordinate bilingual, working with two sets of concepts,");
    expect(segments[13].keywords).toContain("coordinate bilingual");
    expect(segments[13].keywords).toContain("two sets of concepts");

    expect(segments[14].text).toContain("learning English in school, while continuing to speak Spanish at home and with friends.");

    expect(segments[15].text).toContain("Finally, Gabriella's parents are likely to be subordinate bilinguals who learn a secondary language by filtering it through their primary language.");
    expect(segments[15].keywords).toContain("subordinate bilinguals");
    expect(segments[15].keywords).toContain("filtering");
  });

  it("Audit 4: Surface Proficiency vs. Neuroimaging Advances (Segments 16-17)", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    expect(segments[16].text).toContain("Because all types of bilingual people can become fully proficient in a language regardless of accent or pronunciation, the difference may not be apparent to a casual observer.");
    expect(segments[16].keywords).toContain("proficient");
    expect(segments[16].keywords).toContain("casual observer");

    expect(segments[17].text).toContain("But recent advances in brain imaging technology have given neurolinguists a glimpse into how specific aspects of language learning affect the bilingual brain.");
    expect(segments[17].keywords).toContain("brain imaging technology");
    expect(segments[17].keywords).toContain("neurolinguists");
  });

  it("Audit 5: Hemispheric Specialization & The Critical Period Hypothesis (Segments 18-23)", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    expect(segments[18].text).toContain("It's well known that the brain's left hemisphere is more dominant and analytical in logical processes,");
    expect(segments[18].keywords).toContain("left hemisphere");

    expect(segments[19].text).toContain("while the right hemisphere is more active in emotional and social ones, though this is a matter of degree, not an absolute split.");
    expect(segments[19].keywords).toContain("right hemisphere");
    expect(segments[19].keywords).toContain("matter of degree");

    expect(segments[20].text).toContain("lateralization develops gradually with age, has lead to the critical period hypothesis.");
    expect(segments[20].keywords).toContain("lateralization");
    expect(segments[20].keywords).toContain("critical period hypothesis");

    expect(segments[21].text).toContain("children learn languages more easily because the plasticity of their developing brains lets them use both hemispheres in language acquisition,");
    expect(segments[21].keywords).toContain("plasticity");
    expect(segments[21].keywords).toContain("both hemispheres");

    expect(segments[22].text).toBe("while in most adults, language is lateralized to one hemisphere, usually the left.");
    expect(segments[22].keywords).toContain("lateralized");

    expect(segments[23].text).toContain("learning a language in childhood may give you a more holistic grasp of its social and emotional contexts.");
    expect(segments[23].keywords).toContain("holistic grasp");
  });

  it("Audit 6: The Foreign Language Effect: Adult Acquisition & Rational Decision-Making (Segments 24-26)", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    expect(segments[24].text).toContain("Conversely, recent research showed that people who learned a second language in adulthood exhibit less emotional bias and a more rational approach");
    expect(segments[24].keywords).toContain("less emotional bias");
    expect(segments[24].keywords).toContain("rational approach");

    expect(segments[25].text).toBe("when confronting problems in the second language than in their native one.");
    expect(segments[25].keywords).toContain("confronting problems");

    expect(segments[26].text).toContain("But regardless of when you acquire additional languages, being multilingual gives your brain some remarkable advantages.");
    expect(segments[26].keywords).toContain("remarkable advantages");
  });

  it("Audit 7: Visible Biological Perks & Delaying Alzheimer's and Dementia by 5 Years (Segments 27-30)", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    expect(segments[27].text).toContain("Some of these are even visible, such as higher density of the grey matter that contains most of your brain's neurons and synapses,");
    expect(segments[27].keywords).toContain("higher density");
    expect(segments[27].keywords).toContain("grey matter");
    expect(segments[27].keywords).toContain("synapses");

    expect(segments[28].text).toBe("and more activity in certain regions when engaging a second language.");

    expect(segments[29].text).toContain("The heightened workout a bilingual brain receives throughout its life can also help delay the onset of diseases, like Alzheimer's and dementia by as much as five years.");
    expect(segments[29].keywords).toContain("delay the onset");
    expect(segments[29].keywords).toContain("Alzheimer's");
    expect(segments[29].keywords).toContain("five years");

    expect(segments[30].text).toBe("The idea of major cognitive benefits to bilingualism may seem intuitive now, but it would have surprised earlier experts.");
    expect(segments[30].keywords).toContain("cognitive benefits");
  });

  it("Audit 8: Historical Pre-1960s Handicap Myth vs. Dorsolateral Prefrontal Cortex Strengthening (Segments 31-35)", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    expect(segments[31].text).toBe("Before the 1960s, bilingualism was considered a handicap that slowed a child's development");
    expect(segments[31].keywords).toContain("Before the 1960s");
    expect(segments[31].keywords).toContain("handicap");

    expect(segments[32].text).toContain("by forcing them to spend too much energy distinguishing between languages, a view based largely on flawed studies.");
    expect(segments[32].keywords).toContain("flawed studies");

    expect(segments[33].text).toContain("reaction times and errors increase for some bilingual students in cross-language tests,");
    expect(segments[33].keywords).toContain("cross-language tests");

    expect(segments[34].text).toContain("triggered more activity in, and potentially strengthened, the dorsolateral prefrontal cortex.");
    expect(segments[34].keywords).toContain("switch between languages");
    expect(segments[34].keywords).toContain("dorsolateral prefrontal cortex");

    expect(segments[35].text).toContain("This is the part of the brain that plays a large role in executive function, problem solving, switching between tasks, and focusing while filtering out irrelevant information.");
    expect(segments[35].keywords).toContain("executive function");
    expect(segments[35].keywords).toContain("problem solving");
    expect(segments[35].keywords).toContain("filtering out irrelevant information");
  });

  it("Audit 9: Cognitive Fitness & The Lifelong Linguistic Leap (Segments 36-38)", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    expect(segments[36].text).toBe("So, while bilingualism may not necessarily make you smarter, it does make your brain more healthy, complex and actively engaged,");
    expect(segments[36].keywords).toContain("healthy");
    expect(segments[36].keywords).toContain("complex");
    expect(segments[36].keywords).toContain("actively engaged");

    expect(segments[37].text).toBe("and even if you didn't have the good fortune of learning a second language as a child, it's never too late to do yourself a favor");
    expect(segments[37].keywords).toContain("never too late");
    expect(segments[37].keywords).toContain("do yourself a favor");

    expect(segments[38].text).toContain('and make the linguistic leap from, "Hello," to, "Hola," "Bonjour" or "你好’s" because when it comes to our brains a little exercise can go a long way.');
    expect(segments[38].keywords).toContain("linguistic leap");
    expect(segments[38].keywords).toContain("go a long way");
    expect(segments[38].properNouns).toContain("Hello");
    expect(segments[38].properNouns).toContain("Hola");
    expect(segments[38].properNouns).toContain("Bonjour");
    expect(segments[38].properNouns).toContain("你好");
  });

  it("Audit 10: Pedagogical Quiz Reference Concordance (1-indexed)", () => {
    const quiz = QUIZ_TED_BILINGUAL_BRAIN;
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;

    // Q1 -> ref 3
    expect(quiz.questions[0].referenceSegmentIndex).toBe(3);
    expect(segments[quiz.questions[0].referenceSegmentIndex! - 1].text).toContain("bilingual and multilingual majority");

    // Q2 -> ref 9
    expect(quiz.questions[1].referenceSegmentIndex).toBe(9);
    expect(segments[quiz.questions[1].referenceSegmentIndex! - 1].text).toContain("varying proportions");

    // Q3 -> ref 16
    expect(quiz.questions[2].referenceSegmentIndex).toBe(16);
    expect(segments[quiz.questions[2].referenceSegmentIndex! - 1].text).toContain("subordinate bilinguals");

    // Q4 -> ref 22
    expect(quiz.questions[3].referenceSegmentIndex).toBe(22);
    expect(segments[quiz.questions[3].referenceSegmentIndex! - 1].text).toContain("plasticity of their developing brains");

    // Q5 -> ref 25
    expect(quiz.questions[4].referenceSegmentIndex).toBe(25);
    expect(segments[quiz.questions[4].referenceSegmentIndex! - 1].text).toContain("less emotional bias");

    // Q6 -> ref 30
    expect(quiz.questions[5].referenceSegmentIndex).toBe(30);
    expect(segments[quiz.questions[5].referenceSegmentIndex! - 1].text).toContain("Alzheimer's");

    // Q7 -> ref 32
    expect(quiz.questions[6].referenceSegmentIndex).toBe(32);
    expect(segments[quiz.questions[6].referenceSegmentIndex! - 1].text).toContain("Before the 1960s");

    // Q8 -> ref 36
    expect(quiz.questions[7].referenceSegmentIndex).toBe(36);
    expect(segments[quiz.questions[7].referenceSegmentIndex! - 1].text).toContain("executive function");
  });
});
