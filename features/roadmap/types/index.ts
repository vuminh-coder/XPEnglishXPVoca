export type TaskSkillType = "LISTENING" | "READING" | "SPEAKING" | "WRITING" | "GRAMMAR" | "VOCAB";

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

export interface ZiczacPathStep {
  id: string;
  stepNumber: number; // 1..20
  unitNumber: number; // 1..4
  unitTitle: string;
  title: string;
  description: string;
  skillType: TaskSkillType | "CHECKPOINT";
  isCheckpoint: boolean; // true for steps 5, 10, 15, 20...
  checkpointReviewScope?: string; // e.g. "Ôn tập & Đánh giá toàn diện Chặng 1 - 4"
  practicePath: string; // Real link to website feature: /vocabulary, /study/dictation, /study/grammar...
  xpReward: number;
  coinsReward: number;
  durationMinutes: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  tips: string[];
  isCompleted?: boolean;
}

export interface ZiczacUnitGroup {
  unitNumber: number;
  unitTitle: string;
  unitSubtitle: string;
  steps: ZiczacPathStep[];
}
