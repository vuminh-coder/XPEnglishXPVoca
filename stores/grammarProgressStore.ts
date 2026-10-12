import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  GrammarTopicStatus,
  GrammarExercise,
  GrammarChatMessage,
  GrammarLevel,
} from "@/features/grammar/types/grammarTypes";

export type GrammarFilterLevel = "all" | GrammarLevel | "completed";

export interface GrammarCatalogFilters {
  activeLevel: GrammarFilterLevel;
  searchQuery: string;
}

export interface GrammarExerciseSession {
  exercises: GrammarExercise[];
  currentIndex: number;
  answers: Record<number, string>;
  checkedQuestions: Record<number, boolean>;
  submitted: boolean;
  showResults: boolean;
  lastUpdated?: number;
}

export interface GrammarAiChatSession {
  messages: GrammarChatMessage[];
  draftInput?: string;
  lastUpdated?: number;
}

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

  // Catalog filter state retention (Survives route transitions)
  catalogFilters: GrammarCatalogFilters;
  setActiveLevel: (level: GrammarFilterLevel) => void;
  setSearchQuery: (query: string) => void;
  resetCatalogFilters: () => void;

  // Active topic tab workspace preservation ("lesson" | "practice")
  topicWorkspaceTabs: Record<string, "lesson" | "practice">;
  setTopicTab: (topicId: string, tab: "lesson" | "practice") => void;
  getTopicTab: (topicId: string) => "lesson" | "practice";

  // Topic Exercise State Retention (AI-generated exercises, current index, answers, submission status)
  exerciseSessions: Record<string, GrammarExerciseSession>;
  saveExerciseSession: (topicId: string, session: Partial<GrammarExerciseSession>) => void;
  getExerciseSession: (topicId: string) => GrammarExerciseSession | null;
  clearExerciseSession: (topicId: string) => void;

  // Topic AI Chat State Retention (Chat messages & draft input)
  aiChatSessions: Record<string, GrammarAiChatSession>;
  saveAiChatSession: (topicId: string, session: Partial<GrammarAiChatSession>) => void;
  getAiChatSession: (topicId: string) => GrammarAiChatSession | null;
  clearAiChatSession: (topicId: string) => void;

  // Actions
  markTopicStarted: (topicId: string) => void;
  markTopicCompleted: (topicId: string) => void;
  recordQuizResult: (topicId: string, correct: number, total: number) => void;
  getTopicStatus: (topicId: string) => GrammarTopicStatus;
  getCompletedCount: () => number;
  getAverageAccuracy: () => number;
  resetProgress: () => void;
  hydrateFromServer: (records: Array<{ topicId: string; score: number }>) => void;
  fetchServerProgress: () => Promise<void>;
}

export const useGrammarProgressStore = create<GrammarProgressState>()(
  persist(
    (set, get) => ({
      completedTopicIds: [],
      inProgressTopicIds: [],
      quizScores: {},

      // Catalog Filter State (Instant 0ms retention)
      catalogFilters: {
        activeLevel: "all",
        searchQuery: "",
      },
      setActiveLevel: (level: GrammarFilterLevel) => {
        set((state) => ({
          catalogFilters: { ...state.catalogFilters, activeLevel: level },
        }));
      },
      setSearchQuery: (query: string) => {
        set((state) => ({
          catalogFilters: { ...state.catalogFilters, searchQuery: query },
        }));
      },
      resetCatalogFilters: () => {
        set({
          catalogFilters: { activeLevel: "all", searchQuery: "" },
        });
      },

      // Active topic tab workspace preservation ("lesson" | "practice")
      topicWorkspaceTabs: {},
      setTopicTab: (topicId: string, tab: "lesson" | "practice") => {
        if (!topicId) return;
        set((state) => ({
          topicWorkspaceTabs: {
            ...state.topicWorkspaceTabs,
            [topicId]: tab,
          },
        }));
      },
      getTopicTab: (topicId: string): "lesson" | "practice" => {
        if (!topicId) return "lesson";
        return get().topicWorkspaceTabs[topicId] || "lesson";
      },

      // Topic Exercise State Retention
      exerciseSessions: {},
      saveExerciseSession: (topicId: string, session: Partial<GrammarExerciseSession>) => {
        if (!topicId) return;
        set((state) => {
          const prev = state.exerciseSessions[topicId] || {
            exercises: [],
            currentIndex: 0,
            answers: {},
            checkedQuestions: {},
            submitted: false,
            showResults: false,
          };
          return {
            exerciseSessions: {
              ...state.exerciseSessions,
              [topicId]: {
                ...prev,
                ...session,
                lastUpdated: Date.now(),
              },
            },
          };
        });
      },
      getExerciseSession: (topicId: string): GrammarExerciseSession | null => {
        if (!topicId) return null;
        return get().exerciseSessions[topicId] || null;
      },
      clearExerciseSession: (topicId: string) => {
        if (!topicId) return;
        set((state) => {
          const next = { ...state.exerciseSessions };
          delete next[topicId];
          return { exerciseSessions: next };
        });
      },

      // Topic AI Chat State Retention
      aiChatSessions: {},
      saveAiChatSession: (topicId: string, session: Partial<GrammarAiChatSession>) => {
        if (!topicId) return;
        set((state) => {
          const prev = state.aiChatSessions[topicId] || {
            messages: [],
            draftInput: "",
          };
          return {
            aiChatSessions: {
              ...state.aiChatSessions,
              [topicId]: {
                ...prev,
                ...session,
                lastUpdated: Date.now(),
              },
            },
          };
        });
      },
      getAiChatSession: (topicId: string): GrammarAiChatSession | null => {
        if (!topicId) return null;
        return get().aiChatSessions[topicId] || null;
      },
      clearAiChatSession: (topicId: string) => {
        if (!topicId) return;
        set((state) => {
          const next = { ...state.aiChatSessions };
          delete next[topicId];
          return { aiChatSessions: next };
        });
      },

      hydrateFromServer: (records) => {
        if (!Array.isArray(records)) return;
        const { completedTopicIds, inProgressTopicIds, quizScores } = get();
        const nextCompleted = new Set(completedTopicIds);
        const nextScores = { ...quizScores };

        records.forEach((r) => {
          if (r.score >= 60) {
            nextCompleted.add(r.topicId);
          }
          if (!nextScores[r.topicId] || r.score > nextScores[r.topicId].percent) {
            nextScores[r.topicId] = {
              correct: Math.round((r.score / 100) * 5),
              total: 5,
              percent: r.score,
              completedAt: new Date().toISOString(),
            };
          }
        });

        const completedArr = Array.from(nextCompleted);
        const inProgressArr = inProgressTopicIds.filter((id) => !nextCompleted.has(id));

        set({
          completedTopicIds: completedArr,
          inProgressTopicIds: inProgressArr,
          quizScores: nextScores,
        });
      },

      fetchServerProgress: async () => {
        try {
          const res = await fetch("/api/ai/grammar/progress", { cache: "no-store" });
          const json = await res.json();
          if (json.success && json.data && Array.isArray(json.data.progressList)) {
            get().hydrateFromServer(json.data.progressList);
          }
        } catch (e) {
          console.warn("Failed to fetch server grammar progress:", e);
        }
      },

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
