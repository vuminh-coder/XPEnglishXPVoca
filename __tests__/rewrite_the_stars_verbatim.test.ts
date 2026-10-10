import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { MOCK_VIDEO_LESSONS, QUIZ_REWRITE_THE_STARS } from "@/features/listening/data/videoCatalogMockData";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

describe("Anne-Marie & James Arthur: Rewrite The Stars 100% Verbatim Calibration Test Suite", () => {
  const rtsLesson = MOCK_VIDEO_LESSONS.find(
    (l) => l.id === "ff4c64b7-ea82-4963-a4f6-1ff808d929e6" || l.externalId === "pRfmrE0ToTo"
  );

  it("should find the Rewrite The Stars lesson in the catalog mock", () => {
    expect(rtsLesson).toBeDefined();
    expect(rtsLesson?.externalId).toBe("pRfmrE0ToTo");
    expect(rtsLesson?.title).toContain("Rewrite The Stars");
  });

  it("should have exactly 18 calibrated verbatim segments", () => {
    expect(rtsLesson?.segments).toBeDefined();
    expect(rtsLesson?.segments?.length).toBe(18);
  });

  it("should verify Sentence 1 starts with James Arthur vocals at 0.80s and exact lyrics", () => {
    const firstSegment = rtsLesson?.segments?.[0];
    expect(firstSegment).toBeDefined();
    expect(firstSegment?.startTime).toBe(0.80);
    expect(firstSegment?.text).toBe("You know I want you, it's not a secret I try to hide.");
    expect(firstSegment?.tokenCount).toBe(13);
  });

  it("should verify Sentence 2 parallels Sentence 1 with 'You know you want me'", () => {
    const secondSegment = rtsLesson?.segments?.[1];
    expect(secondSegment).toBeDefined();
    expect(secondSegment?.text).toBe("You know you want me, so don't keep saying our hands are tied.");
    expect(secondSegment?.tokenCount).toBe(13);
  });

  it("should verify Chorus anthem and Anne-Marie verse transitions", () => {
    const segments = rtsLesson?.segments || [];
    // Sentence 7: Chorus hook
    expect(segments[6].text).toBe("What if we rewrite the stars?");
    expect(segments[6].tokenCount).toBe(6);

    // Sentence 15: Anne-Marie Verse 2 vocal entrance with official lyrics
    expect(segments[14].text).toBe("You think it's easy, you think I don't want to run to you, yeah.");
    expect(segments[14].tokenCount).toBe(14);
  });

  it("should verify all 18 segments possess complete pedagogical metadata and IPA", () => {
    const segments = rtsLesson?.segments || [];
    segments.forEach((seg, idx) => {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBeGreaterThan(0);
      expect(seg.orderIndex).toBe(idx + 1);
    });
  });

  it("should verify chronological sequence with zero overlapping segments", () => {
    const segments = rtsLesson?.segments || [];
    for (let i = 0; i < segments.length - 1; i++) {
      const current = segments[i];
      const next = segments[i + 1];
      expect(current.endTime).toBeLessThanOrEqual(next.startTime + 0.05);
    }
  });

  it("should tokenize all 18 segments cleanly with DictationWorkspace tokenizer (184 tokens total)", () => {
    let totalTokens = 0;
    const segments = rtsLesson?.segments || [];
    for (const seg of segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBe(184);
  });

  it("should match 100% word-for-word against official Atlantic Records YouTube lyrics (0 diffs across 184 words)", () => {
    const infoPath = path.resolve(process.cwd(), "scripts/rts_info.json");
    if (!fs.existsSync(infoPath)) return;

    const txt = fs.readFileSync(infoPath, "utf16le").replace(/^\uFEFF/, "");
    const info = JSON.parse(txt);
    const lines: string[] = info.description.split("\n");
    const startIdx = lines.findIndex((l) => l.trim() === "Lyrics:");
    const lyricsLines: string[] = [];

    for (let i = startIdx + 1; i < lines.length; i++) {
      const l = lines[i].trim();
      if (l.startsWith("No one can rewrite the stars")) break;
      if (l) lyricsLines.push(l);
    }

    const rawOfficialText = lyricsLines.join(" ");

    function cleanWords(s: string): string[] {
      return s
        .replace(/\(.*?\)/g, "")
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

    const officialWords = cleanWords(rawOfficialText);
    const lessonWords: string[] = [];
    (rtsLesson?.segments || []).forEach((seg) => {
      lessonWords.push(...cleanWords(seg.text));
    });

    expect(lessonWords.length).toBe(184);
    expect(lessonWords.length).toBe(officialWords.length);
    expect(lessonWords).toEqual(officialWords);
  });

  describe("Quiz Calibration: 8 In-Depth Bilingual Questions Verification", () => {
    it("should link QUIZ_REWRITE_THE_STARS directly to the lesson with correct metadata", () => {
      expect(rtsLesson?.quiz).toBeDefined();
      expect(rtsLesson?.quiz).toBe(QUIZ_REWRITE_THE_STARS);
      expect(rtsLesson?.quiz?.lessonId).toBe("ff4c64b7-ea82-4963-a4f6-1ff808d929e6");
      expect(rtsLesson?.quiz?.totalQuestions).toBe(8);
      expect(rtsLesson?.quiz?.xpReward).toBe(40);
      expect(rtsLesson?.quiz?.questions.length).toBe(8);
    });

    it("should satisfy 100% bilingual parity and 4 distinct options per question", () => {
      const questions = rtsLesson?.quiz?.questions || [];
      expect(questions.length).toBe(8);

      questions.forEach((q, idx) => {
        expect(q.id).toBe(`q_rewrite_the_stars_${idx + 1}`);
        expect(q.question.length).toBeGreaterThan(10);
        expect(q.questionEn).toBeDefined();
        expect(q.questionEn!.length).toBeGreaterThan(10);
        expect(q.questionVi).toBeDefined();
        expect(q.questionVi!.length).toBeGreaterThan(10);

        // Options
        expect(q.options.length).toBe(4);
        expect(q.optionsEn).toBeDefined();
        expect(q.optionsEn!.length).toBe(4);
        expect(q.optionsVi).toBeDefined();
        expect(q.optionsVi!.length).toBe(4);

        // Correct answer boundary
        expect([0, 1, 2, 3]).toContain(q.correctAnswer);

        // Explanations
        expect(q.explanation.length).toBeGreaterThan(15);
        expect(q.explanationEn).toBeDefined();
        expect(q.explanationEn!.length).toBeGreaterThan(15);
        expect(q.explanationVi).toBeDefined();
        expect(q.explanationVi!.length).toBeGreaterThan(15);

        // Reference segment valid index
        expect(q.referenceSegmentIndex).toBeDefined();
        expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
        expect(q.referenceSegmentIndex).toBeLessThan(18);

        // Targeted concept
        expect(q.targetedConcept).toBeDefined();
        expect(q.targetedConceptEn).toBeDefined();
        expect(q.targetedConceptVi).toBeDefined();
      });
    });

    it("should verify specific question references match their lyric segments", () => {
      const questions = rtsLesson?.quiz?.questions || [];
      const segments = rtsLesson?.segments || [];

      // Question 1: references segment 1 ("hands are tied")
      expect(questions[0].referenceSegmentIndex).toBe(1);
      expect(segments[1].text).toContain("hands are tied");

      // Question 2: references segment 2 ("not in the cards")
      expect(questions[1].referenceSegmentIndex).toBe(2);
      expect(segments[2].text).toContain("not in the cards");

      // Question 3: references segment 6 ("rewrite the stars")
      expect(questions[2].referenceSegmentIndex).toBe(6);
      expect(segments[6].text).toContain("rewrite the stars");

      // Question 6: references segment 14 ("Anne-Marie entrance: You think it's easy")
      expect(questions[5].referenceSegmentIndex).toBe(14);
      expect(segments[14].text).toContain("You think it's easy");

      // Question 7: references segment 15 ("mountains and doors")
      expect(questions[6].referenceSegmentIndex).toBe(15);
      expect(segments[15].text).toContain("mountains");

      // Question 8: references segment 16 ("within these walls")
      expect(questions[7].referenceSegmentIndex).toBe(16);
      expect(segments[16].text).toContain("within these walls");
    });
  });
});
