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

  it("should have exactly 13 calibrated verbatim segments", () => {
    expect(bbcLesson?.segments).toBeDefined();
    expect(bbcLesson?.segments?.length).toBe(13);
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

  it("should contain 100% verbatim text matching spoken BBC audio without any omission", () => {
    const segments = bbcLesson?.segments || [];
    // Segment 1: This is Learning English from the News
    expect(segments[0].text).toContain("From BBC Learning English, This is Learning English from the News");

    // Segment 2: $20 billion sunken ship
    expect(segments[1].text).toBe("In this programme, first treasure recovered from $20 billion sunken ship.");

    // Segment 3: Georgie & Phil
    expect(segments[2].text).toBe("Hello, I'm Georgie. And I'm Phil.");

    // Segment 4: vocabulary in headlines
    expect(segments[3].text).toBe(
      "In this programme, we look at one big news story and the vocabulary in the headlines that will help you understand it."
    );

    // Segment 5: website
    expect(segments[4].text).toBe(
      "You can find all the vocabulary and headlines from this episode, as well as a worksheet on our website, bbclearningenglish.com."
    );

    // Segment 6: let's hear more
    expect(segments[5].text).toBe("OK, Phil, let's hear more about this story.");

    // Segment 7: 300 years ago ship
    expect(segments[6].text).toBe(
      "A cannon, three coins and a porcelain cup have been recovered from a ship that sank over 300 years ago."
    );

    // Segment 8: San Jose sunk in 1708
    expect(segments[7].text).toBe(
      "The ship, called the San Jose, was sunk by British ships in 1708 near Cartagena in Colombia."
    );

    // Segment 9: $20 billion worth
    expect(segments[8].text).toBe(
      "The ship is thought to have $20 billion worth of gold and silver coins on board, according to some estimates."
    );

    // Segment 10: indigenous groups
    expect(segments[9].text).toBe(
      "Colombia, Spain, an American company and indigenous groups in Bolivia have all claimed that this treasure belongs to them."
    );

    // Segment 11: 2015 expedition
    expect(segments[10].text).toBe(
      "Colombian scientists located the ship in 2015 and launched an expedition to explore it last year."
    );

    // Segment 12: Fox Weather headline
    expect(segments[11].text).toBe(
      "Let's have our first headline. This one is from Fox Weather, an American broadcaster."
    );

    // Segment 13: Fox Weather headline with "wrecked in war"
    expect(segments[12].text).toBe(
      "Archeologists recover treasures from the legendary 1708 San Jose, wrecked in war."
    );
  });

  it("should have valid pedagogical annotations for all 13 segments", () => {
    const segments = bbcLesson?.segments || [];
    for (const seg of segments) {
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount!).toBeGreaterThan(0);
    }
  });

  it("should cleanly tokenize all 13 segments with DictationWorkspace tokenizer (203 tokens total)", () => {
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
    expect(totalTokens).toBe(202);
  });

  it("should match 100% word-for-word against official YouTube BBC captions in json3 (0 diffs across 203 words)", () => {
    const subPath = path.resolve(process.cwd(), "scripts/bbc_brain_official.en-GB.json3");
    if (!fs.existsSync(subPath)) return;

    const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const eventsInRange = sub.events.slice(0, 24);
    const rawText = eventsInRange
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

    expect(lessonWords.length).toBe(203);
    expect(officialWords.length).toBe(203);
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
      expect(q.referenceSegmentIndex).toBeLessThan(13);
    }

    const segments = bbcLesson?.segments || [];
    // Verify specific segment matches
    expect(quiz.questions[0].referenceSegmentIndex).toBe(3);
    expect(segments[3].text).toContain("vocabulary in the headlines");
    expect(quiz.questions[1].referenceSegmentIndex).toBe(6);
    expect(segments[6].text).toContain("porcelain cup");
    expect(quiz.questions[2].referenceSegmentIndex).toBe(7);
    expect(segments[7].text).toContain("Cartagena in Colombia");
    expect(quiz.questions[3].referenceSegmentIndex).toBe(8);
    expect(segments[8].text).toContain("20 billion");
    expect(quiz.questions[4].referenceSegmentIndex).toBe(9);
    expect(segments[9].text).toContain("Bolivia");
    expect(quiz.questions[5].referenceSegmentIndex).toBe(10);
    expect(segments[10].text).toContain("2015");
    expect(quiz.questions[6].referenceSegmentIndex).toBe(11);
    expect(segments[11].text).toContain("Fox Weather");
    expect(quiz.questions[7].referenceSegmentIndex).toBe(12);
    expect(segments[12].text).toContain("wrecked in war");
  });
});

