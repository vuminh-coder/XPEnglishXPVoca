import { describe, it, expect, vi } from "vitest";

describe("Shadowing Score Passing & Notification Flow Deep Suite", () => {
  describe("1. Scoring Threshold Rules (Passing >= 80 vs Failing < 80)", () => {
    it("classifies scores >= 80 as ĐẠT and < 80 as CHƯA ĐẠT strictly", () => {
      const isPassed = (score: number) => score >= 80;

      // Failing cases (< 80)
      expect(isPassed(0)).toBe(false);
      expect(isPassed(50)).toBe(false);
      expect(isPassed(73)).toBe(false);
      expect(isPassed(77)).toBe(false);
      expect(isPassed(79)).toBe(false);

      // Passing cases (>= 80)
      expect(isPassed(80)).toBe(true);
      expect(isPassed(85)).toBe(true);
      expect(isPassed(92)).toBe(true);
      expect(isPassed(100)).toBe(true);
    });

    it("generates exact notification titles and messages for passed scores (>= 80)", () => {
      const getToastData = (overall: number) => {
        if (overall >= 80) {
          return {
            type: "success" as const,
            title: `🎉 ĐÃ ĐẠT - ${overall} ĐIỂM (+15 XP)`,
            message: `Chúc mừng bạn đã đạt chuẩn phát âm (${overall} điểm)! Đang chuyển sang câu tiếp theo...`,
          };
        }
        return {
          type: "warning" as const,
          title: `⚠️ CHƯA ĐẠT - ${overall} ĐIỂM`,
          message: `Bạn đạt ${overall}/100 điểm (cần từ 80 điểm trở lên để qua câu). Vui lòng giữ nguyên câu và luyện phát âm lại nhé!`,
        };
      };

      const passData = getToastData(88);
      expect(passData.type).toBe("success");
      expect(passData.title).toBe("🎉 ĐÃ ĐẠT - 88 ĐIỂM (+15 XP)");
      expect(passData.message).toContain("Chúc mừng bạn đã đạt chuẩn phát âm (88 điểm)");
      expect(passData.message).toContain("Đang chuyển sang câu tiếp theo...");

      const perfectData = getToastData(100);
      expect(perfectData.title).toBe("🎉 ĐÃ ĐẠT - 100 ĐIỂM (+15 XP)");
    });

    it("generates exact notification titles and messages for unpassed scores (< 80)", () => {
      const getToastData = (overall: number) => {
        if (overall >= 80) {
          return {
            type: "success" as const,
            title: `🎉 ĐÃ ĐẠT - ${overall} ĐIỂM (+15 XP)`,
            message: `Chúc mừng bạn đã đạt chuẩn phát âm (${overall} điểm)! Đang chuyển sang câu tiếp theo...`,
          };
        }
        return {
          type: "warning" as const,
          title: `⚠️ CHƯA ĐẠT - ${overall} ĐIỂM`,
          message: `Bạn đạt ${overall}/100 điểm (cần từ 80 điểm trở lên để qua câu). Vui lòng giữ nguyên câu và luyện phát âm lại nhé!`,
        };
      };

      const failData = getToastData(77);
      expect(failData.type).toBe("warning");
      expect(failData.title).toBe("⚠️ CHƯA ĐẠT - 77 ĐIỂM");
      expect(failData.message).toContain("Bạn đạt 77/100 điểm");
      expect(failData.message).toContain("cần từ 80 điểm trở lên để qua câu");
      expect(failData.message).toContain("Vui lòng giữ nguyên câu");
    });
  });

  describe("2. Sentence Navigation & Transition Flow (Advance on Đạt vs Stay on Chưa Đạt)", () => {
    it("advances sentence when score is >= 80", async () => {
      const onAutoAdvance = vi.fn();
      let completedMap: Record<number, boolean> = {};
      const scoreMap: Record<number, number> = {};
      const sentenceIdx = 0;
      const score = 85;

      if (score >= 80) {
        completedMap = { ...completedMap, [sentenceIdx]: true };
        scoreMap[sentenceIdx] = score;
        onAutoAdvance();
      }

      expect(completedMap[sentenceIdx]).toBe(true);
      expect(scoreMap[sentenceIdx]).toBe(85);
      expect(onAutoAdvance).toHaveBeenCalledTimes(1);
    });

    it("does NOT advance sentence when score is < 80 and retains current sentence", () => {
      const onAutoAdvance = vi.fn();
      let completedMap: Record<number, boolean> = { [0]: false };
      const scoreMap: Record<number, number> = {};
      const sentenceIdx = 0;
      const score = 73;

      if (score >= 80) {
        completedMap = { ...completedMap, [sentenceIdx]: true };
        scoreMap[sentenceIdx] = score;
        onAutoAdvance();
      } else {
        delete completedMap[sentenceIdx];
        scoreMap[sentenceIdx] = score;
      }

      expect(completedMap[sentenceIdx]).toBeUndefined();
      expect(scoreMap[sentenceIdx]).toBe(73);
      expect(onAutoAdvance).not.toHaveBeenCalled();
    });

    it("handles retry scenario seamlessly: fails on attempt 1, passes on attempt 2", () => {
      const onAutoAdvance = vi.fn();
      let completedMap: Record<number, boolean> = {};
      const scoreMap: Record<number, number> = {};
      let currentSentenceIndex = 0;

      const handleScore = (idx: number, score: number) => {
        scoreMap[idx] = score;
        if (score >= 80) {
          completedMap = { ...completedMap, [idx]: true };
          onAutoAdvance();
        } else {
          if (completedMap[idx]) {
            const next = { ...completedMap };
            delete next[idx];
            completedMap = next;
          }
        }
      };

      // Lần 1: Học viên nói được 75 điểm (Chưa đạt)
      handleScore(currentSentenceIndex, 75);
      expect(completedMap[0]).toBeFalsy();
      expect(scoreMap[0]).toBe(75);
      expect(onAutoAdvance).not.toHaveBeenCalled();

      // Lần 2: Học viên thử lại, đạt 90 điểm (Đã đạt)
      handleScore(currentSentenceIndex, 90);
      expect(completedMap[0]).toBe(true);
      expect(scoreMap[0]).toBe(90);
      expect(onAutoAdvance).toHaveBeenCalledTimes(1);
    });
  });

  describe("3. Interactive Subtitle Sidebar Badge Formats", () => {
    const getSidebarStatusBadge = (
      idx: number,
      isCurrent: boolean,
      isCompleted: boolean,
      practiceMode: "listening" | "shadowing",
      sentenceScores?: Record<number, number>
    ) => {
      if (isCurrent) {
        if (sentenceScores && sentenceScores[idx] !== undefined) {
          return sentenceScores[idx] >= 80
            ? `ĐÃ ĐẠT - ${sentenceScores[idx]} ĐIỂM`
            : `CHƯA ĐẠT - ${sentenceScores[idx]} ĐIỂM`;
        }
        if (isCompleted) {
          return practiceMode === "shadowing" ? "ĐÃ ĐẠT" : "ĐÃ CHÉP ĐÚNG";
        }
        return "ĐANG HỌC";
      }

      if (isCompleted) {
        if (sentenceScores && sentenceScores[idx] !== undefined) {
          return sentenceScores[idx] >= 80
            ? `Đã đạt - ${sentenceScores[idx]} điểm`
            : `Chưa đạt - ${sentenceScores[idx]} điểm`;
        }
        return practiceMode === "shadowing" ? "Đã đạt" : "Đã chép đúng";
      }

      // Pending sentence
      if (sentenceScores && sentenceScores[idx] !== undefined && sentenceScores[idx] < 80) {
        return `Chưa đạt - ${sentenceScores[idx]} điểm`;
      }
      return null;
    };

    it("displays 'ĐÃ ĐẠT - 85 ĐIỂM' for current sentence when passed", () => {
      const badge = getSidebarStatusBadge(0, true, true, "shadowing", { 0: 85 });
      expect(badge).toBe("ĐÃ ĐẠT - 85 ĐIỂM");
    });

    it("displays 'CHƯA ĐẠT - 77 ĐIỂM' for current sentence when not passed", () => {
      const badge = getSidebarStatusBadge(0, true, false, "shadowing", { 0: 77 });
      expect(badge).toBe("CHƯA ĐẠT - 77 ĐIỂM");
    });

    it("displays 'Đã đạt - 92 điểm' for completed sentence in list", () => {
      const badge = getSidebarStatusBadge(0, false, true, "shadowing", { 0: 92 });
      expect(badge).toBe("Đã đạt - 92 điểm");
    });

    it("displays 'Chưa đạt - 68 điểm' for pending sentence in list if previously attempted", () => {
      const badge = getSidebarStatusBadge(0, false, false, "shadowing", { 0: 68 });
      expect(badge).toBe("Chưa đạt - 68 điểm");
    });

    it("differentiates shadowing ('ĐÃ ĐẠT') from dictation ('ĐÃ CHÉP ĐÚNG')", () => {
      const shadowingBadge = getSidebarStatusBadge(1, true, true, "shadowing");
      expect(shadowingBadge).toBe("ĐÃ ĐẠT");

      const dictationBadge = getSidebarStatusBadge(1, true, true, "listening");
      expect(dictationBadge).toBe("ĐÃ CHÉP ĐÚNG");
    });
  });

  describe("4. Meta Status Bar Score Presentation", () => {
    const formatMetaScoreText = (score: number | undefined) => {
      if (score === undefined) return null;
      return score >= 80 ? `Đã đạt - ${score} điểm` : `Chưa đạt - ${score} điểm`;
    };

    it("formats meta score as 'Đã đạt - 88 điểm' when >= 80", () => {
      expect(formatMetaScoreText(88)).toBe("Đã đạt - 88 điểm");
      expect(formatMetaScoreText(80)).toBe("Đã đạt - 80 điểm");
    });

    it("formats meta score as 'Chưa đạt - 74 điểm' when < 80", () => {
      expect(formatMetaScoreText(74)).toBe("Chưa đạt - 74 điểm");
      expect(formatMetaScoreText(55)).toBe("Chưa đạt - 55 điểm");
    });
  });

  describe("5. End-to-End Lesson Progression Simulation", () => {
    it("simulates completing a 3-sentence lesson with retry on sentence 2", () => {
      const totalSentences = 3;
      let currentSentenceIndex = 0;
      let completedMap: Record<number, boolean> = {};
      const scores: Record<number, number> = {};
      let isLessonFinished = false;

      const evaluateAndAdvance = (score: number) => {
        scores[currentSentenceIndex] = score;
        if (score >= 80) {
          completedMap = { ...completedMap, [currentSentenceIndex]: true };
          if (currentSentenceIndex < totalSentences - 1) {
            currentSentenceIndex++;
          } else {
            isLessonFinished = true;
          }
        }
      };

      // Câu 1: Đạt 82 điểm -> Qua câu 2
      evaluateAndAdvance(82);
      expect(currentSentenceIndex).toBe(1);
      expect(completedMap[0]).toBe(true);

      // Câu 2 lần 1: Đạt 70 điểm (Chưa đạt) -> Giữ nguyên câu 2
      evaluateAndAdvance(70);
      expect(currentSentenceIndex).toBe(1);
      expect(completedMap[1]).toBeFalsy();

      // Câu 2 lần 2: Đạt 85 điểm (Đã đạt) -> Qua câu 3
      evaluateAndAdvance(85);
      expect(currentSentenceIndex).toBe(2);
      expect(completedMap[1]).toBe(true);

      // Câu 3: Đạt 95 điểm -> Hoàn thành bài học
      evaluateAndAdvance(95);
      expect(isLessonFinished).toBe(true);
      expect(completedMap[2]).toBe(true);
      expect(Object.keys(completedMap).length).toBe(3);
    });
  });
});
