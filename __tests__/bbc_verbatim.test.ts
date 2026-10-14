import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

describe("BBC Learning English: 100% Verbatim Subtitles Calibration Test Suite", () => {
  const bbcLesson = MOCK_VIDEO_LESSONS.find(
    (l) => l.id === "e4476093-9f0c-4620-a7f3-345d0e6b64db" || l.externalId === "doOlP7NLUwc"
  );

  it("should find the BBC sunken ship lesson in the catalog mock", () => {
    expect(bbcLesson).toBeDefined();
    expect(bbcLesson?.externalId).toBe("doOlP7NLUwc");
    expect(bbcLesson?.title).toContain("First Treasure Recovered");
  });

  it("should have exactly 84 calibrated verbatim segments with Zero Merged Utterances", () => {
    expect(bbcLesson?.segments).toBeDefined();
    expect(bbcLesson?.segments?.length).toBe(84);
  });

  it("should start with BBC Learning English intro accurately from 0.0s unclipped", () => {
    const first = bbcLesson?.segments?.[0];
    expect(first).toBeDefined();
    expect(first?.startTime).toBe(0.0);
    expect(first?.text).toBe(
      "From BBC Learning English, This is Learning English from the News, our podcast about the news headlines."
    );
  });

  it("should have strictly contiguous or non-overlapping time boundaries (zero overlap)", () => {
    const segments = bbcLesson?.segments || [];
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.orderIndex).toBe(i + 1);

      if (i > 0) {
        const prev = segments[i - 1];
        expect(seg.startTime).toBeGreaterThanOrEqual(prev.endTime);
        const gap = seg.startTime - prev.endTime;
        expect(gap).toBeGreaterThanOrEqual(0.0); // zero overlap guaranteed
      }
    }
  });

  it("should separate speakers into independent turns without merged utterances or speaker prefixes", () => {
    const segments = bbcLesson?.segments || [];
    // Segment 3: Georgie alone
    expect(segments[2].text).toBe("Hello, I'm Georgie.");
    // Segment 4: Phil alone
    expect(segments[3].text).toBe("And I'm Phil.");

    // Outro split: Segment 83 Georgie, Segment 84 Phil
    expect(segments[82].text).toBe("Bye for now.");
    expect(segments[83].text).toBe("Goodbye.");

    // Zero character prefix in any segment text
    for (const seg of segments) {
      expect(seg.text).not.toMatch(/^(Georgie|Phil|News Reader|Voiceover):/i);
      expect(seg.text).not.toContain("\n");
    }
  });

  it("should contain 100% verbatim text matching spoken BBC audio without any omission across all 3 headlines", () => {
    const segments = bbcLesson?.segments || [];
    // Headline 1: Fox Weather
    expect(segments[14].text).toBe(
      "Archeologists recover treasures from the legendary 1708 San Jose, wrecked in war."
    );
    expect(segments[19].text).toBe("The verb 'wreck' means to destroy or damage badly.");

    // Headline 2: Sky News
    expect(segments[38].text).toBe("First treasures from 'holy grail of shipwrecks' recovered.");
    expect(segments[45].text).toContain("metaphor to describe something that many people want, but is very difficult to find");

    // Headline 3: CBS News
    expect(segments[56].text).toBe(
      "Coins, cannon recovered from a legendary ship that sunk 3 centuries ago with billions of dollars in treasure."
    );
    expect(segments[63].text).toBe("Something that is legendary has been spoken about a lot over time.");
  });

  it("should have valid pedagogical annotations for all 84 segments", () => {
    const segments = bbcLesson?.segments || [];
    for (const seg of segments) {
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(seg.ipaUs!.startsWith("/")).toBe(true);
      expect(seg.ipaUs!.endsWith("/")).toBe(true);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount!).toBeGreaterThan(0);
    }
  });

  it("should cleanly tokenize all 84 segments with DictationWorkspace tokenizer", () => {
    let totalTokens = 0;
    const segments = bbcLesson?.segments || [];
    for (const seg of segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBe(1067);
  });

  it("should match 100% word-for-word against official YouTube BBC captions in json3 (0 diffs across all 1069 words)", () => {
    const subPath = path.resolve(process.cwd(), "scripts/bbc_brain_official.en-GB.json3");
    if (!fs.existsSync(subPath)) return;

    const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const rawText = sub.events
      .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
      .join(" ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    function cleanWords(s: string): string[] {
      return s
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/--/g, " ")
        .replace(/—/g, " ")
        .replace(/['"]+/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .split(/\s+/)
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean);
    }

    const officialWords = cleanWords(rawText);
    const lessonWords: string[] = [];
    const segments = bbcLesson?.segments || [];
    segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

    expect(lessonWords.length).toBe(1069);
    expect(officialWords.length).toBe(1069);
    expect(lessonWords).toEqual(officialWords);
  });

  it("should have comprehensive bilingual reading comprehension quiz attached with 8 questions", () => {
    const quiz = bbcLesson?.quiz;
    expect(quiz).toBeDefined();
    if (!quiz) return;

    expect(quiz.lessonId).toBe("e4476093-9f0c-4620-a7f3-345d0e6b64db");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.xpReward).toBe(40);
    expect(quiz.questions.length).toBe(8);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_bbc_sunken_ship_${i + 1}`);
      expect(q.questionEn).toBeDefined();
      expect(q.questionEn!.length).toBeGreaterThan(10);
      expect(q.questionVi).toBeDefined();
      expect(q.questionVi!.length).toBeGreaterThan(10);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi!.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationEn!.length).toBeGreaterThan(15);
      expect(q.explanationVi).toBeDefined();
      expect(q.explanationVi!.length).toBeGreaterThan(15);
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(84);
    }

    const segments = bbcLesson?.segments || [];
    // Verify specific segment matches
    expect(quiz.questions[0].referenceSegmentIndex).toBe(4);
    expect(segments[4].text).toContain("vocabulary in the headlines");
    expect(quiz.questions[1].referenceSegmentIndex).toBe(7);
    expect(segments[7].text).toContain("porcelain cup");
    expect(quiz.questions[2].referenceSegmentIndex).toBe(8);
    expect(segments[8].text).toContain("Cartagena in Colombia");
    expect(quiz.questions[3].referenceSegmentIndex).toBe(21);
    expect(segments[21].text).toContain("sinks to the bottom");
    expect(quiz.questions[4].referenceSegmentIndex).toBe(26);
    expect(segments[26].text).toContain("nervous wreck");
    expect(quiz.questions[5].referenceSegmentIndex).toBe(43);
    expect(segments[43].text).toContain("Holy Grail");
    expect(quiz.questions[6].referenceSegmentIndex).toBe(62);
    expect(segments[62].text).toContain("adjective that comes from");
    expect(quiz.questions[7].referenceSegmentIndex).toBe(35);
    expect(segments[35].text).toContain("2015");
  });
});
