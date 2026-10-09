import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";
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
});
