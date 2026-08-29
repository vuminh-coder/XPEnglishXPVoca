export type SkillType = "LISTENING" | "READING" | "SPEAKING" | "WRITING";

export interface ExamQuestion {
  id: string;
  partNumber: number;
  partTitle: string;
  section: SkillType;
  audioUrl?: string;
  passageText?: string;
  imageUrl?: string;
  questionText: string;
  options: {
    key: "A" | "B" | "C" | "D";
    text: string;
  }[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  // Speaking AI fields
  speakingPrompt?: string;
  preparationTimeSeconds?: number;
  speakingTimeSeconds?: number;
  sampleAudioUrl?: string;
  // Writing AI fields
  writingPrompt?: string;
  minWordCount?: number;
  sampleEssay?: string;
}

export interface ExamPaper {
  id: string;
  title: string;
  type:
    | "TOEIC_FULL"
    | "TOEIC_LR"
    | "TOEIC_MINI"
    | "TOEIC_SPEAKING_WRITING"
    | "IELTS_FULL"
    | "IELTS_LISTENING"
    | "IELTS_READING"
    | "IELTS_SPEAKING"
    | "IELTS_WRITING";
  level: "Beginner" | "Intermediate" | "Advanced";
  timeLimitMinutes: number;
  totalQuestions: number;
  maxScore: number; // 990 for TOEIC, 9.0 for IELTS
  description: string;
  categoryBadge: string;
  tags: string[];
  supportedSkills: SkillType[];
  questions: ExamQuestion[];
}
