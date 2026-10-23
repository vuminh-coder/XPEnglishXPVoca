export type TaskSkillType =
  | "LISTENING"
  | "READING"
  | "SPEAKING"
  | "WRITING"
  | "GRAMMAR"
  | "VOCAB"
  | "DUMBBELL"
  | "STORY";

export interface RoadmapTask {
  id: string;
  dayNum: number;
  title: string;
  taskType: TaskSkillType;
  description: string;
  xpReward: number;
  durationMinutes: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  practicePath: string;
  isCompleted: boolean;
  tips: string[];
}

export interface TargetRoadmapPhase {
  phaseNum: number;
  title: string;
  subtitle: string;
  chestRewardXp: number;
  chestRewardCoins: number;
  tasks: RoadmapTask[];
}

export type TargetCategory = "EXAM" | "BUSINESS" | "TRAVEL";
export type TargetExam = "TOEIC" | "IELTS";

export type ZiczacStepState = "COMPLETED" | "CURRENT" | "LOCKED";

export interface DailyStudyPhase {
  timeSlot: string;
  activity: string;
  detail: string;
}

export interface ZiczacStepProgress {
  stepId: string;
  completedSessions: number;
  totalSessions: number;
  progressPercent: number;
  isCompleted: boolean;
  wordsLearned?: number;
  totalWords?: number;
}

export interface ZiczacPathStep {
  id: string;
  stepNumber: number; // 1..N
  unitNumber: number; // 1..N
  unitTitle: string;
  title: string;
  description: string;
  skillType: TaskSkillType | "CHECKPOINT";
  isCheckpoint: boolean; // true for milestone checkpoint at the end of a unit
  checkpointReviewScope?: string; // e.g. "Ôn tập & Đánh giá toàn diện Chặng 1 - 4"
  practicePath: string; // Real link to website feature: /vocabulary, /study/dictation, /study/grammar...
  xpReward: number;
  coinsReward: number;
  durationMinutes: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  tips: string[];
  isCompleted?: boolean;
  totalSessions?: number; // Số vòng học (sessions) cần để vượt qua chặng (mặc định 3)
  dailyTargetWords?: number; // Số từ mục tiêu học mỗi ngày (e.g. 20)
  totalTargetWords?: number; // Tổng số từ của chặng (e.g. 300)
  dailyPlanBreakdown?: DailyStudyPhase[]; // Bảng phân bổ 3 bước học trong ngày
}

export interface ZiczacGuidebookPhrase {
  phrase: string;
  translation: string;
}

export interface ZiczacUnitGroup {
  unitNumber: number;
  unitTitle: string;
  unitSubtitle: string;
  steps: ZiczacPathStep[];
  colorTheme?: "blue" | "emerald" | "purple" | "amber" | "rose";
  guidebookObjectives?: string[];
  guidebookGrammarTip?: string;
  guidebookKeyPhrases?: ZiczacGuidebookPhrase[];
}
