import { create } from "zustand";
import { useAuthStore } from "./authStore";

export interface DailyTask {
  id: string;
  planId: string;
  date: string;
  taskType: string;
  description: string;
  isCompleted: boolean;
  xpReward: number;
}

export interface StudyPlan {
  id: string;
  userId: string;
  targetExam: string;
  targetScore: number;
  targetDate: string;
  currentLevel: string;
  weeklyHours: number;
  dailyTasks: DailyTask[];
}

interface StudyPlanState {
  plan: StudyPlan | null;
  isLoading: boolean;
  loadPlan: () => Promise<void>;
  generatePlan: (params: {
    targetExam: string;
    targetScore: number;
    targetDate: string;
    currentLevel?: string;
    weeklyHours?: number;
  }) => Promise<boolean>;
  toggleTask: (taskId: string, isCompleted: boolean) => Promise<void>;
}

export const useStudyPlanStore = create<StudyPlanState>((set, get) => ({
  plan: null,
  isLoading: false,
  loadPlan: async () => {
    // 1. Instantly load from localStorage cache to prevent UI flashing
    const user = useAuthStore.getState().user;
    const userId = user?.id || "local_user";
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(`xp_voca_study_plan_${userId}`);
        if (cached) {
          set({ plan: JSON.parse(cached) });
        }
      } catch (e) {
        console.error("Error reading cached study plan:", e);
      }
    }

    // Only show loading skeletons/spinners if we do not have a cached plan
    set({ isLoading: !get().plan });
    try {
      const res = await fetch("/api/study-plan/current");
      const json = await res.json();
      if (json.success && json.data) {
        set({ plan: json.data });
        if (typeof window !== "undefined") {
          localStorage.setItem(`xp_voca_study_plan_${userId}`, JSON.stringify(json.data));
        }
      } else {
        set({ plan: null });
        if (typeof window !== "undefined") {
          localStorage.removeItem(`xp_voca_study_plan_${userId}`);
        }
      }
    } catch (e) {
      console.error("Error loading study plan from API:", e);
      // Keep cached plan if API fails/offline
    } finally {
      set({ isLoading: false });
    }
  },
  generatePlan: async (params) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/study-plan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      if (json.success) {
        // Reload plan with tasks list which will also update cache
        await get().loadPlan();
        return true;
      }
      return false;
    } catch (e) {
      console.error("Error generating study plan:", e);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  toggleTask: async (taskId, isCompleted) => {
    const currentPlan = get().plan;
    if (!currentPlan) return;

    // Optimistic update in UI
    const updatedTasks = currentPlan.dailyTasks.map((t) =>
      t.id === taskId ? { ...t, isCompleted } : t
    );
    const updatedPlan = {
      ...currentPlan,
      dailyTasks: updatedTasks,
    };
    
    set({ plan: updatedPlan });

    // Save optimistic state to cache immediately to prevent loss on reload
    const user = useAuthStore.getState().user;
    const userId = user?.id || "local_user";
    if (typeof window !== "undefined") {
      localStorage.setItem(`xp_voca_study_plan_${userId}`, JSON.stringify(updatedPlan));
    }

    try {
      const res = await fetch("/api/study-plan/task-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, isCompleted }),
      });
      const json = await res.json();

      if (json.success && json.profile) {
        // Sync new XP & level to auth store
        const currentLocalUser = useAuthStore.getState().user;
        if (currentLocalUser) {
          useAuthStore.setState({
            user: {
              ...currentLocalUser,
              totalXp: json.profile.totalXp,
              level: json.profile.level,
              title: json.profile.title,
            },
          });
          // Update localstorage backup
          localStorage.setItem(
            `xp_voca_user_${currentLocalUser.id}`,
            JSON.stringify({
              ...currentLocalUser,
              totalXp: json.profile.totalXp,
              level: json.profile.level,
              title: json.profile.title,
            })
          );
        }
      }
    } catch (e) {
      console.error("Error updating task completion:", e);
      // Revert optimistic update and cache on failure
      set({ plan: currentPlan });
      if (typeof window !== "undefined") {
        localStorage.setItem(`xp_voca_study_plan_${userId}`, JSON.stringify(currentPlan));
      }
    }
  },
}));
