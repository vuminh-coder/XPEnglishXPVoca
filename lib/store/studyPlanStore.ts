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
    set({ isLoading: true });
    try {
      const res = await fetch("/api/study-plan/current");
      const json = await res.json();
      if (json.success && json.data) {
        set({ plan: json.data });
      } else {
        set({ plan: null });
      }
    } catch (e) {
      console.error("Error loading study plan:", e);
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
        // Reload plan with tasks list
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
    set({
      plan: {
        ...currentPlan,
        dailyTasks: updatedTasks,
      },
    });

    try {
      const res = await fetch("/api/study-plan/task-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, isCompleted }),
      });
      const json = await res.json();

      if (json.success && json.profile) {
        // Sync new XP & level to auth store
        const syncClerkUser = useAuthStore.getState().syncClerkUser;
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
      // Revert optimistic update on failure
      set({ plan: currentPlan });
    }
  },
}));
