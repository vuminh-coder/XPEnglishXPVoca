import { CURATED_ROADMAP_STEPS } from "../data/curatedRoadmapPathway";
import { useAuthStore } from "@/stores/authStore";

export const STORAGE_KEY_COMPLETED_STEPS = "xp_ziczac_completed_steps";
export const STORAGE_KEY_STEP_SESSIONS = "xp_ziczac_step_sessions";

export function getScopedCompletedStepsKey(userId?: string | null): string {
  return userId && userId !== "local_user" && userId !== "guest_user"
    ? `${STORAGE_KEY_COMPLETED_STEPS}_${userId}`
    : STORAGE_KEY_COMPLETED_STEPS;
}

export function getScopedStepSessionsKey(userId?: string | null): string {
  return userId && userId !== "local_user" && userId !== "guest_user"
    ? `${STORAGE_KEY_STEP_SESSIONS}_${userId}`
    : STORAGE_KEY_STEP_SESSIONS;
}

export interface SyncStepSessionParams {
  themeId?: string;
  unitNumber?: number;
  lessonId?: string;
  skillType:
    | "MATCH"
    | "SENTENCE"
    | "VOCAB"
    | "LISTENING"
    | "STORY"
    | "SPEAKING"
    | "CHECKPOINT";
  completedPart: number;
  totalParts?: number;
}

export interface SyncStepSessionResult {
  stepId?: string;
  completedSessions: number;
  totalSessions: number;
  isCompleted: boolean;
}

/**
 * Automatically synchronizes game and lesson completion progress with the Roadmap S-Curve step sessions.
 * Allows Part 1 completion in WordLink, SentenceBuilder, Practice, Dictation, Shadowing, or Reading
 * to advance the step session in localStorage, which dynamically updates getStepPracticeUrl on the roadmap.
 */
export function syncRoadmapSessionProgress({
  themeId,
  unitNumber,
  lessonId,
  skillType,
  completedPart,
  totalParts = 2,
}: SyncStepSessionParams): SyncStepSessionResult {
  if (typeof window === "undefined") {
    return { completedSessions: completedPart, totalSessions: totalParts, isCompleted: false };
  }

  const userId = useAuthStore.getState().user?.id;
  const scopedSessionsKey = getScopedStepSessionsKey(userId);
  const scopedCompletedKey = getScopedCompletedStepsKey(userId);

  // Find step in CURATED_ROADMAP_STEPS matching unit, theme, or lessonId and skillType
  let step = CURATED_ROADMAP_STEPS.find((s) => {
    if (s.skillType !== skillType) return false;
    if (unitNumber && s.unitNumber === unitNumber) {
      return true;
    }
    if (themeId && s.practicePath.includes(`theme=${themeId}`)) {
      return true;
    }
    if (
      lessonId &&
      (s.practicePath.includes(`id=${lessonId}`) ||
        s.practicePath.includes(`/${lessonId}?`) ||
        s.practicePath.endsWith(`/${lessonId}`))
    ) {
      return true;
    }
    return false;
  });

  // Fallback for direct navigation without URL params: find the first incomplete step matching skillType
  if (!step && !unitNumber && !themeId && !lessonId) {
    let completedSet = new Set<string>();
    try {
      const rawCompleted =
        localStorage.getItem(scopedCompletedKey) ||
        localStorage.getItem(STORAGE_KEY_COMPLETED_STEPS);
      if (rawCompleted) {
        const parsed = JSON.parse(rawCompleted);
        if (Array.isArray(parsed)) completedSet = new Set(parsed);
      }
    } catch {}
    step =
      CURATED_ROADMAP_STEPS.find(
        (s) => s.skillType === skillType && !completedSet.has(s.id)
      ) || CURATED_ROADMAP_STEPS.find((s) => s.skillType === skillType);
  }

  if (!step) {
    return { completedSessions: completedPart, totalSessions: totalParts, isCompleted: false };
  }

  const stepId = step.id;
  const targetTotal = step.totalSessions || totalParts || 1;

  try {
    // 1. Update step sessions in localStorage (both scoped and base key for compatibility)
    let sessions: Record<string, number> = {};
    const rawSessions =
      localStorage.getItem(scopedSessionsKey) ||
      localStorage.getItem(STORAGE_KEY_STEP_SESSIONS);
    if (rawSessions) {
      try {
        sessions = JSON.parse(rawSessions) || {};
      } catch {}
    }
    const currentSessions = sessions[stepId] || 0;
    const newSessions = Math.min(targetTotal, Math.max(currentSessions, completedPart));
    sessions[stepId] = newSessions;
    const serializedSessions = JSON.stringify(sessions);
    localStorage.setItem(STORAGE_KEY_STEP_SESSIONS, serializedSessions);
    if (scopedSessionsKey !== STORAGE_KEY_STEP_SESSIONS) {
      localStorage.setItem(scopedSessionsKey, serializedSessions);
    }

    // 2. Check if all sessions are completed
    let isCompleted = false;
    let completedSteps: string[] = [];
    const rawCompleted =
      localStorage.getItem(scopedCompletedKey) ||
      localStorage.getItem(STORAGE_KEY_COMPLETED_STEPS);
    if (rawCompleted) {
      try {
        completedSteps = JSON.parse(rawCompleted) || [];
      } catch {}
    }

    if (newSessions >= targetTotal) {
      isCompleted = true;
      if (!completedSteps.includes(stepId)) {
        completedSteps.push(stepId);
        const serializedCompleted = JSON.stringify(completedSteps);
        localStorage.setItem(STORAGE_KEY_COMPLETED_STEPS, serializedCompleted);
        if (scopedCompletedKey !== STORAGE_KEY_COMPLETED_STEPS) {
          localStorage.setItem(scopedCompletedKey, serializedCompleted);
        }
      }
    }

    // 3. Dispatch storage event so useRoadmapManager reactive listeners update immediately
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(
      new CustomEvent("roadmap_step_advanced", {
        detail: { stepId, completedSessions: newSessions, totalSessions: targetTotal, isCompleted },
      })
    );

    return { stepId, completedSessions: newSessions, totalSessions: targetTotal, isCompleted };
  } catch (err) {
    console.warn("Failed to sync roadmap session progress", err);
    return { stepId, completedSessions: completedPart, totalSessions: targetTotal, isCompleted: false };
  }
}
