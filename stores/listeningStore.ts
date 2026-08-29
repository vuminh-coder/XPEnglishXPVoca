import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { ListeningLesson } from "@/features/listening/utils/listeningParser";
import { useAuthStore } from "./authStore";
import { recordSkillPractice } from "./userStore";

export interface WordScore {
  word: string;
  expected: string;
  spoken: string;
  score: number;
  status: "perfect" | "good" | "needs_work" | "missing";
}

export interface SpeakingAttempt {
  id: string;
  lessonId: string;
  sentenceId: number;
  recordedAudioUrl?: string;
  overallScore: number;
  fluencyScore: number;
  pronunciationScore: number;
  intonationScore: number;
  completenessScore: number;
  speedWpm: number;
  wordScores: WordScore[];
  feedback: string;
  createdAt: string;
}

interface ListeningStore {
  currentLessonId: string;
  completedLessonIds: string[];
  completedRoleplayGoalIds: string[];
  userAttempts: SpeakingAttempt[];
  activeMode: "dictation" | "sentence" | "paragraph" | "shadow" | "repeat";
  
  setCurrentLessonId: (id: string) => void;
  markLessonCompleted: (id: string) => void;
  markGoalCompleted: (goalId: string) => void;
  setActiveMode: (mode: "dictation" | "sentence" | "paragraph" | "shadow" | "repeat") => void;
  addAttempt: (attempt: SpeakingAttempt) => void;
  getCurrentLesson: () => ListeningLesson;
}

export const useListeningStore = create<ListeningStore>()(
  persist(
    (set, get) => ({
      currentLessonId: (Array.isArray(MOCK_LESSONS_DATA) && MOCK_LESSONS_DATA[0]?.id) || "listen_001",
      completedLessonIds: [],
      completedRoleplayGoalIds: [],
      userAttempts: [],
      activeMode: "dictation",

      setCurrentLessonId: (id) => set({ currentLessonId: id }),

      markLessonCompleted: (id) => {
        const user = useAuthStore.getState().user;
        const mode = get().activeMode;
        const skillName = mode === "shadow" || mode === "repeat" ? "Shadowing" : "Dictation";
        recordSkillPractice(user?.id, skillName, 3, 25);

        set((state) => ({
          completedLessonIds: state.completedLessonIds.includes(id)
            ? state.completedLessonIds
            : [...state.completedLessonIds, id],
        }));
      },

      markGoalCompleted: (goalId) =>
        set((state) => ({
          completedRoleplayGoalIds: state.completedRoleplayGoalIds.includes(goalId)
            ? state.completedRoleplayGoalIds
            : [...state.completedRoleplayGoalIds, goalId],
        })),

      setActiveMode: (mode) => set({ activeMode: mode }),

      addAttempt: (attempt) =>
        set((state) => ({
          userAttempts: [attempt, ...state.userAttempts],
        })),

      getCurrentLesson: () => {
        const { currentLessonId } = get();
        const found = MOCK_LESSONS_DATA.find((l) => l.id === currentLessonId);
        return (found as any) || MOCK_LESSONS_DATA[0];
      },
    }),
    {
      name: "xp_voca_listening_store",
    }
  )
);
