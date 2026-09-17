export interface SkillMinutes {
  dictation: number;
  shadowing: number;
  speaking: number;
  vocab: number;
  writing: number;
}

export interface AchievementItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpBonus: number;
  unlocked: boolean;
  progress?: string;
  rarity: "Phổ biến" | "Hiếm" | "Huyền thoại";
}

export interface TitleProgressionItem {
  id: string;
  title: string;
  requirement: string;
  icon: string;
  isUnlocked: boolean;
  isCurrent: boolean;
}
