import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GrammarTopicStatus } from "@/features/grammar/types/grammarTypes";

export interface GrammarQuizResultRecord {
  correct: number;
  total: number;
  percent: number;
  completedAt: string;
}

interface GrammarProgressState {
  completedTopicIds: string[];
  inProgressTopicIds: string[];
  quizScores: Record<string, GrammarQuizResultRecord>;

  // Actions
  markTopicStarted: (topicId: string) => void;
  markTopicCompleted: (topicId: string) => void;
  recordQuizResult: (topicId: string, correct: number, total: number) => void;
  getTopicStatus: (topicId: string) => GrammarTopicStatus;
  getCompletedCount: () => number;
  getAverageAccuracy: () => number;
  resetProgress: () => void;
}

export const useGrammarProgressStore = create<GrammarProgressState>()(
  persist(
    (set, get) => ({
      completedTopicIds: [],
      inProgressTopicIds: [],
      quizScores: {},

      markTopicStarted: (topicId: string) => {
        if (!topicId) return;
        const { completedTopicIds, inProgressTopicIds } = get();
        if (completedTopicIds.includes(topicId) || inProgressTopicIds.includes(topicId)) {
          return;
        }
        set({
          inProgressTopicIds: [...inProgressTopicIds, topicId],
        });
      },

      markTopicCompleted: (topicId: string) => {
        if (!topicId) return;
        const { completedTopicIds, inProgressTopicIds } = get();
        const nextCompleted = completedTopicIds.includes(topicId)
          ? completedTopicIds
          : [...completedTopicIds, topicId];
        const nextInProgress = inProgressTopicIds.filter((id) => id !== topicId);

        set({
          completedTopicIds: nextCompleted,
          inProgressTopicIds: nextInProgress,
        });
      },

      recordQuizResult: (topicId: string, correct: number, total: number) => {
        if (!topicId || total <= 0) return;
        const percent = Math.round((correct / total) * 100);
        const record: GrammarQuizResultRecord = {
          correct,
          total,
          percent,
          completedAt: new Date().toISOString(),
        };

        const currentScores = get().quizScores;
        const prevRecord = currentScores[topicId];
        // Keep best percent or latest record
        const nextScores = {
          ...currentScores,
          [topicId]: {
            ...record,
            percent: prevRecord ? Math.max(prevRecord.percent, percent) : percent,
          },
        };

        const shouldMarkComplete = percent >= 60;
        const { completedTopicIds, inProgressTopicIds } = get();

        let nextCompleted = completedTopicIds;
        let nextInProgress = inProgressTopicIds;

        if (shouldMarkComplete) {
          if (!nextCompleted.includes(topicId)) {
            nextCompleted = [...nextCompleted, topicId];
          }
          nextInProgress = nextInProgress.filter((id) => id !== topicId);
        } else if (!nextCompleted.includes(topicId) && !nextInProgress.includes(topicId)) {
          nextInProgress = [...nextInProgress, topicId];
        }

        set({
          quizScores: nextScores,
          completedTopicIds: nextCompleted,
          inProgressTopicIds: nextInProgress,
        });
      },

      getTopicStatus: (topicId: string): GrammarTopicStatus => {
        const { completedTopicIds, inProgressTopicIds } = get();
        if (completedTopicIds.includes(topicId)) return "completed";
        if (inProgressTopicIds.includes(topicId)) return "in_progress";
        return "unstarted";
      },

      getCompletedCount: () => {
        return get().completedTopicIds.length;
      },

      getAverageAccuracy: () => {
        const scores = Object.values(get().quizScores);
        if (scores.length === 0) return 0;
        const totalPercent = scores.reduce((sum, item) => sum + item.percent, 0);
        return Math.round(totalPercent / scores.length);
      },

      resetProgress: () => {
        set({
          completedTopicIds: [],
          inProgressTopicIds: [],
          quizScores: {},
        });
      },
    }),
    {
      name: "xp_grammar_progress",
    }
  )
);
