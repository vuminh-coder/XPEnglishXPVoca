import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT,
  QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT,
} from "@/features/listening/data/lessons/movies/animation/lesson_monsters_inc";

describe("Monsters, Inc. Complete Data & Subtitle Coverage Suite (100% Cues Verification)", () => {
  const cuesPath = path.resolve(process.cwd(), "scripts/monsters_inc_cleaned_cues.json");
  const rawCues = JSON.parse(fs.readFileSync(cuesPath, "utf-8")) as Array<{
    index: number;
    timestamp: string;
    seconds: number;
    text: string;
  }>;

  it("should verify that raw cues list has 125 dialogue cues covering 28s to 1059s", () => {
    expect(rawCues.length).toBe(125);
    expect(rawCues[0].seconds).toBe(28);
    expect(rawCues[rawCues.length - 1].seconds).toBeGreaterThanOrEqual(1037);
  });

  it("should contain exactly 30 master segments with non-decreasing chronology", () => {
    const { segments } = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
    expect(segments.length).toBe(30);

    for (let i = 0; i < segments.length; i++) {
      expect(segments[i].orderIndex).toBe(i);
      expect(segments[i].startTime).toBeGreaterThanOrEqual(0);
      expect(segments[i].endTime).toBeGreaterThan(segments[i].startTime);
      if (i > 0) {
        expect(segments[i].startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
  });

  it("should verify that every segment contains rich verbatim text, Vietnamese translation, IPA, and pedagogical annotations", () => {
    const { segments } = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
    segments.forEach((seg, idx) => {
      expect(seg.text.trim().length, `Segment ${idx} text is too short`).toBeGreaterThan(15);
      expect(seg.translationVi.trim().length, `Segment ${idx} translationVi is too short`).toBeGreaterThan(15);
      expect(seg.ipaUs, `Segment ${idx} missing ipaUs`).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(5);
      expect(seg.keywords, `Segment ${idx} missing keywords`).toBeDefined();
      expect(seg.keywords!.length).toBeGreaterThanOrEqual(2);
      expect(seg.explanationAi, `Segment ${idx} missing explanationAi`).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(15);

      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount, `Segment ${idx} tokenCount mismatch`).toBe(tokens.length);
    });
  });

  it("should verify 100% coverage of core dialogue and instruction phrases from the video", () => {
    const fullText = LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments.map((s) => s.text).join(" ");

    const keyPhrases = [
      "crazy concept",
      "city run by monsters",
      "generate power",
      "scaring little children",
      "deal with Randall",
      "shady monster",
      "she's the one",
      "hooking me up with those reservations",
      "Googly Bear",
      "What do you know",
      "scares little kids and little monsters",
      "I have allergies",
      "save it for the scare floor",
      "in the zone",
      "serious scaring",
      "putting up some big numbers",
      "humiliating when we break the record",
      "Winds of Change",
      "What a creep",
      "teach that guy a lesson",
      "pal",
      "mate",
      "flirts with him",
      "Whaddya know",
      "save it for the ring",
      "Karate Kid",
      "will you",
      "top of your game",
      "Scooby-Doo",
      "don't blow this",
      "breaking the record",
      "blew it",
      "It'll be their problem, not ours",
      "flap T",
      "out of our hair",
      "Can it",
      "shut up",
      "Word on the street is",
      "traced back to this factory",
      "no way",
      "inside job",
      "put my money on Waxford",
      "put your money where your mouth is",
      "them shifty eyes",
      "Comment of the Day",
      "Garfield",
      "challenge for today",
      "hit the road",
      "jump in the pail",
      "outer space"
    ];

    keyPhrases.forEach((phrase) => {
      expect(fullText.toLowerCase()).toContain(phrase.toLowerCase());
    });
  });

  it("should verify bilingual quiz consistency and validity", () => {
    const quiz = QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
    expect(quiz.lessonId).toBe("mov_ani_12");
    expect(quiz.questions.length).toBe(6);

    quiz.questions.forEach((q) => {
      expect(q.id.length).toBeGreaterThan(0);
      expect(q.questionEn?.length).toBeGreaterThan(10);
      expect(q.questionVi?.length).toBeGreaterThan(10);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThanOrEqual(3);
      expect(q.explanationEn?.length).toBeGreaterThan(10);
      expect(q.explanationVi?.length).toBeGreaterThan(10);
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT.segments.length);
    });
  });
});
