import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { LESSON_BBC_SUNKEN_SHIP } from "@/features/listening/data/lessons/lesson_bbc_sunken_ship";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

describe("BBC Learning English: Sunken Ship - Verbatim Deep Audit Suite", () => {
  it("should match 100% word-for-word against official BBC json3 events without omission or hallucination", () => {
    const subPath = path.resolve(process.cwd(), "scripts/bbc_brain_official.en-GB.json3");
    expect(fs.existsSync(subPath)).toBe(true);

    const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const rawOfficialText = sub.events
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

    const officialWords = cleanWords(rawOfficialText);
    const lessonWords: string[] = [];
    LESSON_BBC_SUNKEN_SHIP.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

    expect(lessonWords.length).toBe(1069);
    expect(officialWords.length).toBe(1069);
    expect(lessonWords).toEqual(officialWords);
  });

  it("should successfully tokenize every segment with DictationWorkspace tokenizer (1067 clean tokens total)", () => {
    let totalTokens = 0;
    for (const seg of LESSON_BBC_SUNKEN_SHIP.segments) {
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

  it("should strictly respect Zero Merged Utterances across speaker transitions", () => {
    // Check turn transition 1: Georgie greeting -> Phil greeting
    expect(LESSON_BBC_SUNKEN_SHIP.segments[2].text).toBe("Hello, I'm Georgie.");
    expect(LESSON_BBC_SUNKEN_SHIP.segments[3].text).toBe("And I'm Phil.");

    // Check turn transition 2: Headline 1 intro
    expect(LESSON_BBC_SUNKEN_SHIP.segments[12].text).toBe("Let's have our first headline.");
    expect(LESSON_BBC_SUNKEN_SHIP.segments[13].text).toBe("This one is from Fox Weather, an American broadcaster.");

    // Check turn transition 3: Headline 2 intro
    expect(LESSON_BBC_SUNKEN_SHIP.segments[36].text).toBe("Let's have our next headline.");
    expect(LESSON_BBC_SUNKEN_SHIP.segments[37].text).toBe("This is from Sky News, a British broadcaster.");

    // Check turn transition 4: Headline 3 intro
    expect(LESSON_BBC_SUNKEN_SHIP.segments[54].text).toBe("And here's our next headline.");
    expect(LESSON_BBC_SUNKEN_SHIP.segments[55].text).toBe("And this is from CBS news, which is an American broadcaster.");

    // Check turn transition 5: Outro
    expect(LESSON_BBC_SUNKEN_SHIP.segments[82].text).toBe("Bye for now.");
    expect(LESSON_BBC_SUNKEN_SHIP.segments[83].text).toBe("Goodbye.");
  });

  it("should ensure accurate time boundaries spanning from 0.0s to 430.84s", () => {
    const firstSeg = LESSON_BBC_SUNKEN_SHIP.segments[0];
    const lastSeg = LESSON_BBC_SUNKEN_SHIP.segments[83];

    expect(firstSeg.startTime).toBe(0.0);
    expect(lastSeg.endTime).toBe(430.84);
  });

  it("should verify accurate bilingual quiz answers against corresponding master segments", () => {
    const quiz = LESSON_BBC_SUNKEN_SHIP.quiz!;
    for (const q of quiz.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      const refSeg = LESSON_BBC_SUNKEN_SHIP.segments[q.referenceSegmentIndex!];
      expect(refSeg).toBeDefined();

      if (q.id === "q_bbc_sunken_ship_1") {
        expect(refSeg.text).toContain("vocabulary in the headlines");
      } else if (q.id === "q_bbc_sunken_ship_2") {
        expect(refSeg.text).toContain("porcelain cup");
      } else if (q.id === "q_bbc_sunken_ship_3") {
        expect(refSeg.text).toContain("Cartagena in Colombia");
      } else if (q.id === "q_bbc_sunken_ship_4") {
        expect(refSeg.text).toContain("sinks to the bottom");
      } else if (q.id === "q_bbc_sunken_ship_5") {
        expect(refSeg.text).toContain("nervous wreck");
      } else if (q.id === "q_bbc_sunken_ship_6") {
        expect(refSeg.text).toContain("Jesus Christ");
      } else if (q.id === "q_bbc_sunken_ship_7") {
        expect(refSeg.text).toContain("adjective that comes from");
      } else if (q.id === "q_bbc_sunken_ship_8") {
        expect(refSeg.text).toContain("2015");
      }
    }
  });

  it("should ensure all translationVi and explanationAi are high quality and non-empty", () => {
    for (const seg of LESSON_BBC_SUNKEN_SHIP.segments) {
      expect(seg.translationVi.length).toBeGreaterThan(5);
      expect(seg.explanationAi!.length).toBeGreaterThan(15);
      expect(seg.translationVi).not.toContain("TODO");
      expect(seg.explanationAi).not.toContain("TODO");
    }
  });
});
