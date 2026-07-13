import { create } from "zustand";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  coinReward: number;
  target: number;
  progress: number;
  isCompleted: boolean;
}

interface DailyChallengeState {
  challenges: Challenge[];
  lastResetDate: string;
  initChallenges: () => void;
  incrementProgress: (challengeId: string, amount?: number) => { completed: boolean; xp: number; coins: number };
}

const CHALLENGE_POOL: Omit<Challenge, "progress" | "isCompleted">[] = [
  { id: "learn_words", title: "Học 5 từ mới", description: "Thêm 5 từ vựng mới vào bộ sưu tập", icon: "📚", xpReward: 15, coinReward: 10, target: 5 },
  { id: "review_cards", title: "Ôn tập 10 flashcards", description: "Hoàn thành 10 lượt ôn tập flashcard", icon: "🔄", xpReward: 20, coinReward: 15, target: 10 },
  { id: "win_pvp", title: "Thắng 1 trận PvP", description: "Giành chiến thắng trong Đấu trường từ vựng", icon: "⚔️", xpReward: 25, coinReward: 20, target: 1 },
  { id: "write_essay", title: "Chính tả 5 từ", description: "Luyện viết chính tả đúng 5 từ vựng", icon: "✍️", xpReward: 25, coinReward: 20, target: 5 },
  { id: "speak_practice", title: "Phát âm 5 từ vựng", description: "Luyện nói phát âm chuẩn 5 từ vựng", icon: "🎤", xpReward: 25, coinReward: 20, target: 5 },
];

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const useDailyChallengeStore = create<DailyChallengeState>((set, get) => ({
  challenges: [],
  lastResetDate: "",

  initChallenges: () => {
    const today = getTodayString();
    const stored = typeof window !== "undefined" ? localStorage.getItem("xp_daily_challenges") : null;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.date === today) {
          set({ challenges: parsed.challenges, lastResetDate: today });
          return;
        }
      } catch (e) {
        // Corrupted, regenerate
      }
    }

    // Generate 4 new challenges for today
    const selected = pickRandom(CHALLENGE_POOL, 4).map((c) => ({
      ...c,
      progress: 0,
      isCompleted: false,
    }));

    set({ challenges: selected, lastResetDate: today });

    if (typeof window !== "undefined") {
      localStorage.setItem("xp_daily_challenges", JSON.stringify({ date: today, challenges: selected }));
    }
  },

  incrementProgress: (challengeId, amount = 1) => {
    const state = get();
    const challenge = state.challenges.find((c) => c.id === challengeId);

    if (!challenge || challenge.isCompleted) {
      return { completed: false, xp: 0, coins: 0 };
    }

    const newProgress = Math.min(challenge.target, challenge.progress + amount);
    const justCompleted = newProgress >= challenge.target;

    const updatedChallenges = state.challenges.map((c) =>
      c.id === challengeId
        ? { ...c, progress: newProgress, isCompleted: justCompleted }
        : c
    );

    set({ challenges: updatedChallenges });

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "xp_daily_challenges",
        JSON.stringify({ date: state.lastResetDate, challenges: updatedChallenges })
      );
    }

    return {
      completed: justCompleted,
      xp: justCompleted ? challenge.xpReward : 0,
      coins: justCompleted ? challenge.coinReward : 0,
    };
  },
}));
