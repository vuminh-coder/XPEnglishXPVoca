import { CURATED_ROADMAP_STEPS } from "../data/curatedRoadmapPathway";

export const STORAGE_KEY_COMPLETED_STEPS = "xp_ziczac_completed_steps";
export const STORAGE_KEY_STEP_SESSIONS = "xp_ziczac_step_sessions";

export interface SyncStepSessionParams {
  themeId?: string;
  unitNumber?: number;
  skillType: "MATCH" | "SENTENCE" | "VOCAB" | "LISTENING" | "STORY" | "CHECKPOINT";
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
 * Automatically synchronizes game completion progress with the Roadmap S-Curve step sessions.
 * Allows Part 1 completion in WordLink or SentenceBuilder to advance the step session in localStorage,
 * which dynamically updates getPracticeUrl to Part 2 on the roadmap.
 */
export function syncRoadmapSessionProgress({
  themeId,
  unitNumber,
  skillType,
  completedPart,
  totalParts = 2,
}: SyncStepSessionParams): SyncStepSessionResult {
  if (typeof window === "undefined") {
    return { completedSessions: completedPart, totalSessions: totalParts, isCompleted: false };
  }

  // Find step in CURATED_ROADMAP_STEPS matching unit or theme and skillType
  const step = CURATED_ROADMAP_STEPS.find((s) => {
    if (unitNumber && s.unitNumber === unitNumber && s.skillType === skillType) {
      return true;
    }
    if (themeId && s.practicePath.includes(themeId) && s.skillType === skillType) {
      return true;
    }
    return false;
  });

  if (!step) {
    return { completedSessions: completedPart, totalSessions: totalParts, isCompleted: false };
  }

  const stepId = step.id;
  const targetTotal = step.totalSessions || totalParts || 2;

  try {
    // 1. Update step sessions in localStorage
    let sessions: Record<string, number> = {};
    const rawSessions = localStorage.getItem(STORAGE_KEY_STEP_SESSIONS);
    if (rawSessions) {
      try {
        sessions = JSON.parse(rawSessions) || {};
      } catch {}
    }
    const currentSessions = sessions[stepId] || 0;
    const newSessions = Math.max(currentSessions, completedPart);
    sessions[stepId] = newSessions;
    localStorage.setItem(STORAGE_KEY_STEP_SESSIONS, JSON.stringify(sessions));

    // 2. Check if all sessions are completed
    let isCompleted = false;
    let completedSteps: string[] = [];
    const rawCompleted = localStorage.getItem(STORAGE_KEY_COMPLETED_STEPS);
    if (rawCompleted) {
      try {
        completedSteps = JSON.parse(rawCompleted) || [];
      } catch {}
    }

    if (newSessions >= targetTotal) {
      isCompleted = true;
      if (!completedSteps.includes(stepId)) {
        completedSteps.push(stepId);
        localStorage.setItem(STORAGE_KEY_COMPLETED_STEPS, JSON.stringify(completedSteps));
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
