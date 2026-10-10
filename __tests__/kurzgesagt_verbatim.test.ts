import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { MOCK_VIDEO_LESSONS, QUIZ_KURZGESAGT_INTERSTELLAR } from "@/features/listening/data/videoCatalogMockData";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

describe("Kurzgesagt: How to Win an Interstellar War 100% Verbatim Calibration Test Suite", () => {
  const kurzgesagtLesson = MOCK_VIDEO_LESSONS.find(
    (l) => l.id === "88c4fc17-4445-46f4-82d4-c51fbb56e859" || l.externalId === "tybKnGZRwcU"
  );

  it("should find the Kurzgesagt lesson in the catalog mock", () => {
    expect(kurzgesagtLesson).toBeDefined();
    expect(kurzgesagtLesson?.externalId).toBe("tybKnGZRwcU");
    expect(kurzgesagtLesson?.title).toContain("Interstellar War");
  });

  it("should have exactly 21 calibrated verbatim segments", () => {
    expect(kurzgesagtLesson?.segments).toBeDefined();
    expect(kurzgesagtLesson?.segments?.length).toBe(21);
  });

  it("should verify Sentence 1 starts with clean lead-in at 0.00s and correct text", () => {
    const firstSegment = kurzgesagtLesson?.segments?.[0];
    expect(firstSegment).toBeDefined();
    expect(firstSegment?.startTime).toBe(0.00);
    expect(firstSegment?.text).toBe("Could aliens destroy us from light years away?");
    expect(firstSegment?.tokenCount).toBe(8);
  });

  it("should verify scientific proper nouns and astronomical terms across segments", () => {
    const segments = kurzgesagtLesson?.segments || [];
    // Sentence 2: Kurzgesagt Labs
    expect(segments[1].text).toContain("Kurzgesagt Labs");
    expect(segments[1].properNouns).toContain("Kurzgesagt Labs");

    // Sentence 7: Humans
    expect(segments[6].text).toContain("Humans");

    // Sentence 10: Smorpians
    expect(segments[9].text).toContain("Smorpians");

    // Sentence 11: HD 40307
    expect(segments[10].text).toContain("HD 40307");
    expect(segments[10].properNouns).toContain("HD 40307");

    // Sentence 13: Dyson swarm
    expect(segments[12].text).toContain("Dyson swarm");
  });

  it("should verify all 21 segments possess complete pedagogical metadata and IPA", () => {
    const segments = kurzgesagtLesson?.segments || [];
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
    const segments = kurzgesagtLesson?.segments || [];
    for (let i = 0; i < segments.length - 1; i++) {
      const current = segments[i];
      const next = segments[i + 1];
      expect(current.endTime).toBeLessThanOrEqual(next.startTime + 0.05);
    }
  });

  it("should tokenize all 21 segments cleanly with DictationWorkspace tokenizer (227 tokens total)", () => {
    let totalTokens = 0;
    const segments = kurzgesagtLesson?.segments || [];
    for (const seg of segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBe(227);
  });

  it("should match 100% word-for-word against official YouTube subtitles in json3 (0 diffs across 227 words)", () => {
    const subPath = path.resolve(process.cwd(), "scripts/kurzgesagt_raw.en.json3");
    if (!fs.existsSync(subPath)) return;

    const rawSub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const rawLines = rawSub.events
      .filter((e: any) => e.segs)
      .map((e: any) => ({
        text: e.segs.map((s: any) => s.utf8).join("").replace(/\n/g, " ").replace(/\s+/g, " ").trim(),
      }))
      .filter((l: any) => l.text);

    const segMap = [
      [0], [1, 2], [3, 4], [5, 6], [7], [8], [9, 10], [11], [12], [13],
      [14, 15], [16, 17], [18, 19], [20, 21, 22], [23], [24], [25], [26],
      [27, 28], [29], [30, 31, 32]
    ];

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

    const segments = kurzgesagtLesson?.segments || [];
    expect(segments.length).toBe(21);

    for (let i = 0; i < 21; i++) {
      const offText = segMap[i].map((idx) => rawLines[idx].text).join(" ");
      const offWords = cleanWords(offText);
      const segWords = cleanWords(segments[i].text);

      expect(segWords).toEqual(offWords);
    }
  });

  describe("Quiz Calibration: 8 In-Depth Bilingual Questions Verification", () => {
    it("should link QUIZ_KURZGESAGT_INTERSTELLAR directly to the lesson with correct metadata", () => {
      expect(kurzgesagtLesson?.quiz).toBeDefined();
      expect(kurzgesagtLesson?.quiz).toBe(QUIZ_KURZGESAGT_INTERSTELLAR);
      expect(kurzgesagtLesson?.quiz?.lessonId).toBe("88c4fc17-4445-46f4-82d4-c51fbb56e859");
      expect(kurzgesagtLesson?.quiz?.totalQuestions).toBe(8);
      expect(kurzgesagtLesson?.quiz?.xpReward).toBe(40);
      expect(kurzgesagtLesson?.quiz?.questions.length).toBe(8);
    });

    it("should satisfy 100% bilingual parity and 4 distinct options per question", () => {
      const questions = kurzgesagtLesson?.quiz?.questions || [];
      expect(questions.length).toBe(8);

      questions.forEach((q, idx) => {
        expect(q.id).toBe(`q_kurzgesagt_${idx + 1}`);
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
        expect(q.referenceSegmentIndex).toBeLessThan(21);

        // Targeted concept
        expect(q.targetedConcept).toBeDefined();
        expect(q.targetedConceptEn).toBeDefined();
        expect(q.targetedConceptVi).toBeDefined();
      });
    });

    it("should verify specific question references match their scientific transcript segments", () => {
      const questions = kurzgesagtLesson?.quiz?.questions || [];
      const segments = kurzgesagtLesson?.segments || [];

      // Question 1: references segment 6 ("Humans... technological civilization")
      expect(questions[0].referenceSegmentIndex).toBe(6);
      expect(segments[6].text).toContain("Humans");

      // Question 2: references segment 10 ("orange dwarf star HD 40307, 42 light years away")
      expect(questions[1].referenceSegmentIndex).toBe(10);
      expect(segments[10].text).toContain("HD 40307");

      // Question 3: references segment 12 ("Dyson swarm")
      expect(questions[2].referenceSegmentIndex).toBe(12);
      expect(segments[12].text).toContain("Dyson swarm");

      // Question 4: references segment 13 ("hyperspace bypass")
      expect(questions[3].referenceSegmentIndex).toBe(13);
      expect(segments[13].text).toContain("hyperspace bypass");

      // Question 5: references segment 16 ("Front lines, tactics, and logistics are meaningless")
      expect(questions[4].referenceSegmentIndex).toBe(16);
      expect(segments[16].text).toContain("meaningless");

      // Question 6: references segment 17 ("fought across time")
      expect(questions[5].referenceSegmentIndex).toBe(17);
      expect(segments[17].text).toContain("fought across time");

      // Question 7: references segment 19 ("Sending an invasion fleet is futile")
      expect(questions[6].referenceSegmentIndex).toBe(19);
      expect(segments[19].text).toContain("futile");

      // Question 8: references segment 20 ("fraction of the speed of light... plenty of time to prepare")
      expect(questions[7].referenceSegmentIndex).toBe(20);
      expect(segments[20].text).toContain("plenty of time to prepare");
    });
  });
});
