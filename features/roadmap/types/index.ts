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
