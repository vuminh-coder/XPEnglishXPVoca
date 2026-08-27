import { ExamPaper } from "./types";
import { toeicLr202601Paper } from "./toeic_lr_2026_01";
import { toeicSw202601Paper } from "./toeic_sw_2026_01";

export const toeicFull4k01Paper: ExamPaper = {
  id: "toeic_full_4k_01",
  title: "TOEIC Master 4-Skills Full Simulation #01",
  type: "TOEIC_FULL",
  level: "Advanced",
  timeLimitMinutes: 200,
  totalQuestions: 219,
  maxScore: 990,
  description:
    "Bộ đề thi mô phỏng toàn diện 4 Kỹ năng (100 câu Nghe, 100 câu Đọc, 11 câu Nói AI Studio và 8 câu Viết AI Studio) chuẩn ETS quốc tế.",
  categoryBadge: "4-Skills Master",
  tags: ["TOEIC Full 4K", "Listening", "Reading", "Speaking AI", "Writing AI"],
  supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
  questions: [
    ...toeicLr202601Paper.questions.map((q, idx) => ({
      ...q,
      id: `t4k_q${idx + 1}`,
    })),
    ...toeicSw202601Paper.questions.map((q, idx) => ({
      ...q,
      id: `t4k_q${201 + idx}`,
      questionText: q.questionText.startsWith("Question")
        ? `Câu ${201 + idx} (${q.section === "SPEAKING" ? "Nói" : "Viết"}): ${q.questionText.replace(/^Question \d+:\s*/, "")}`
        : `Câu ${201 + idx}: ${q.questionText}`,
    })),
  ],
};
