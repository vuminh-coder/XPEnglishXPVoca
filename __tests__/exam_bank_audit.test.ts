import { describe, it, expect } from "vitest";
import { MOCK_EXAM_PAPERS } from "@/features/exam-prep";

describe("Comprehensive 37-Exam Bank Deep Audit", () => {
  it("contains exactly 37 standardized exam papers", () => {
    expect(MOCK_EXAM_PAPERS).toHaveLength(37);
  });

  it("verifies unique paper IDs and titles", () => {
    const ids = new Set<string>();
    const titles = new Set<string>();

    MOCK_EXAM_PAPERS.forEach((paper, idx) => {
      expect(paper.id, `Paper #${idx + 1} has empty id`).toBeTruthy();
      expect(paper.title, `Paper #${idx + 1} has empty title`).toBeTruthy();
      expect(ids.has(paper.id), `Duplicate paper id: ${paper.id}`).toBe(false);
      expect(titles.has(paper.title), `Duplicate paper title: ${paper.title}`).toBe(false);
      ids.add(paper.id);
      titles.add(paper.title);
    });
  });

  it("verifies every paper matches its declared totalQuestions", () => {
    MOCK_EXAM_PAPERS.forEach((paper, idx) => {
      expect(paper, `Paper index #${idx} is undefined`).toBeDefined();
      expect(paper.questions, `Paper index #${idx} (${paper?.id}) questions array is undefined`).toBeDefined();
      const actualCount = paper.questions.length;
      expect(
        actualCount,
        `Paper ${paper.id} declared ${paper.totalQuestions} questions but has ${actualCount}`
      ).toBe(paper.totalQuestions);
    });
  });

  it("verifies all MCQ questions have valid options and correct answers", () => {
    MOCK_EXAM_PAPERS.forEach((paper) => {
      paper.questions.forEach((q) => {
        if (q.section === "LISTENING" || q.section === "READING") {
          expect(q.id, `Empty question id in ${paper.id}`).toBeTruthy();
          expect(q.questionText, `Empty question text in ${paper.id} Q:${q.id}`).toBeTruthy();
          expect(q.options, `Empty options in ${paper.id} Q:${q.id}`).toBeDefined();
          expect(q.options.length, `Options count in ${paper.id} Q:${q.id}`).toBeGreaterThanOrEqual(3);
          expect(
            ["A", "B", "C", "D"],
            `Invalid correctAnswer "${q.correctAnswer}" in ${paper.id} Q:${q.id}`
          ).toContain(q.correctAnswer);
          expect(
            q.explanation,
            `Missing or empty explanation in ${paper.id} Q:${q.id}`
          ).toBeTruthy();
        }
      });
    });
  }, 15000);

  it("verifies all Speaking and Writing questions have prompts and sample answers", () => {
    MOCK_EXAM_PAPERS.forEach((paper) => {
      paper.questions.forEach((q) => {
        if (q.section === "SPEAKING") {
          expect(q.id, `Empty question id in ${paper.id}`).toBeTruthy();
          expect(q.speakingPrompt || q.questionText, `Empty speaking prompt in ${paper.id} Q:${q.id}`).toBeTruthy();
          expect(q.explanation || q.sampleEssay, `Empty explanation or model in ${paper.id} Q:${q.id}`).toBeTruthy();
        }
        if (q.section === "WRITING") {
          expect(q.id, `Empty question id in ${paper.id}`).toBeTruthy();
          expect(q.writingPrompt || q.questionText, `Empty writing prompt in ${paper.id} Q:${q.id}`).toBeTruthy();
          expect(q.explanation || q.sampleEssay, `Empty explanation or model in ${paper.id} Q:${q.id}`).toBeTruthy();
        }
      });
    });
  });

  it("verifies healthy answer key distribution for all full-length papers", () => {
    const tableData: any[] = [];
    MOCK_EXAM_PAPERS.forEach((paper, idx) => {
      const keyCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
      let totalMcq = 0;

      paper.questions.forEach((q) => {
        if (q.section === "LISTENING" || q.section === "READING") {
          if (q.correctAnswer && keyCounts[q.correctAnswer] !== undefined) {
            keyCounts[q.correctAnswer]++;
            totalMcq++;
          }
        }
      });

      const pctA = totalMcq ? Math.round((keyCounts.A / totalMcq) * 100) : 0;
      const pctB = totalMcq ? Math.round((keyCounts.B / totalMcq) * 100) : 0;
      const pctC = totalMcq ? Math.round((keyCounts.C / totalMcq) * 100) : 0;
      const pctD = totalMcq ? Math.round((keyCounts.D / totalMcq) * 100) : 0;

      if (totalMcq >= 40) {
        expect(pctA, `Paper ${paper.id} has skewed 'A' distribution (${pctA}%)`).toBeLessThanOrEqual(38);
        expect(pctB, `Paper ${paper.id} has skewed 'B' distribution (${pctB}%)`).toBeLessThanOrEqual(38);
        expect(pctC, `Paper ${paper.id} has skewed 'C' distribution (${pctC}%)`).toBeLessThanOrEqual(38);
        expect(pctD, `Paper ${paper.id} has skewed 'D' distribution (${pctD}%)`).toBeLessThanOrEqual(38);
      }

      tableData.push({
        "#": idx + 1,
        ID: paper.id,
        MCQ: totalMcq,
        A: `${keyCounts.A} (${pctA}%)`,
        B: `${keyCounts.B} (${pctB}%)`,
        C: `${keyCounts.C} (${pctC}%)`,
        D: `${keyCounts.D} (${pctD}%)`,
      });
    });

    console.table(tableData);
  });

  it("verifies unique question IDs within every individual exam paper", () => {
    MOCK_EXAM_PAPERS.forEach((paper) => {
      const qIds = new Set<string>();
      paper.questions.forEach((q) => {
        expect(qIds.has(q.id), `Duplicate question ID "${q.id}" in paper ${paper.id}`).toBe(false);
        qIds.add(q.id);
      });
    });
  });
});
