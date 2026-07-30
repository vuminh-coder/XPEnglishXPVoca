// lib/store/skillChartStore.ts
export type SkillType = "dictation" | "shadowing" | "speaking" | "vocab" | "writing";

export interface SkillDayData {
  day: string;
  isoDate: string;
  minutes: number;
}

export interface SkillConfig {
  id: SkillType;
  label: string;
  iconName: string;
  color: string;
  gradientId: string;
  stopColor: string;
}

export const SKILL_CONFIGS: Record<SkillType, SkillConfig> = {
  dictation: {
    id: "dictation",
    label: "Dictation",
    iconName: "Headphones",
    color: "#1d6ee6",
    gradientId: "gradientDictation",
    stopColor: "#1d6ee6",
  },
  shadowing: {
    id: "shadowing",
    label: "Shadowing",
    iconName: "Mic",
    color: "#06b6d4",
    gradientId: "gradientShadowing",
    stopColor: "#06b6d4",
  },
  speaking: {
    id: "speaking",
    label: "Luyện nói",
    iconName: "SpeakingIcon",
    color: "#8b5cf6",
    gradientId: "gradientSpeaking",
    stopColor: "#8b5cf6",
  },
  vocab: {
    id: "vocab",
    label: "Từ vựng",
    iconName: "BookOpen",
    color: "#10b981",
    gradientId: "gradientVocab",
    stopColor: "#10b981",
  },
  writing: {
    id: "writing",
    label: "Luyện viết",
    iconName: "Wand2",
    color: "#f59e0b",
    gradientId: "gradientWriting",
    stopColor: "#f59e0b",
  },
};

/**
 * Safely parses and sanitizes a raw JSON map from LocalStorage
 */
function sanitizeMinutesMap(raw: string | null): Record<string, number> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    const cleanMap: Record<string, number> = {};
    for (const key in parsed) {
      if (Object.prototype.hasOwnProperty.call(parsed, key)) {
        // Validate date format YYYY-MM-DD
        if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) continue;

        const val = Number(parsed[key]);
        if (typeof val === "number" && !isNaN(val) && isFinite(val) && val >= 0) {
          cleanMap[key] = Math.min(1440, Math.round(val)); // Cap max at 1440m (24 hours per day)
        }
      }
    }
    return cleanMap;
  } catch (e) {
    console.warn("Recovering corrupted skill chart storage entry:", e);
    return {};
  }
}

/**
 * Gets 7-day practice minutes data for a specific skill and user with intelligent daily fallback sync
 */
export function getWeeklySkillMinutes(
  userId: string | undefined,
  skill: SkillType,
  storageProvider?: Storage
): SkillDayData[] {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const dayDiff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + dayDiff);

  let skillMap: Record<string, number> = {};
  let dailyGeneralMap: Record<string, number> = {};
  let userObject: any = null;

  if (typeof window !== "undefined" || storageProvider) {
    try {
      const store = storageProvider || localStorage;
      const key = `xp_voca_skill_minutes_${userId || "guest"}_${skill}`;
      skillMap = sanitizeMinutesMap(store.getItem(key));

      // Check general daily minutes fallback
      const dailyKey = `xp_voca_daily_minutes_${userId || "guest"}`;
      dailyGeneralMap = sanitizeMinutesMap(store.getItem(dailyKey));

      // Check user object fallback
      const userKey = `xp_voca_user_${userId || "guest"}`;
      const rawUser = store.getItem(userKey);
      if (rawUser) {
        userObject = JSON.parse(rawUser);
      }
    } catch (e) {
      console.error(`Error loading skill chart data for ${skill}:`, e);
    }
  }

  const dayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return dayLabels.map((day, index) => {
    const targetDate = new Date(startOfWeek);
    targetDate.setDate(startOfWeek.getDate() + index);
    const isoDate = targetDate.toISOString().slice(0, 10);
    const todayStr = today.toISOString().slice(0, 10);

    let minutes = skillMap[isoDate] || 0;

    // Fallback sync: if skillMap is empty for this date, fallback to general daily minutes or user total
    if (minutes === 0) {
      if (dailyGeneralMap[isoDate] && dailyGeneralMap[isoDate] > 0) {
        if (skill === "vocab" || skill === "dictation") {
          minutes = Math.round(dailyGeneralMap[isoDate]);
        }
      } else if (isoDate === todayStr && userObject && typeof userObject.minutesStudied === "number" && userObject.minutesStudied > 0) {
        if (skill === "vocab") {
          minutes = Math.max(5, userObject.minutesStudied);
        }
      }
    }

    return {
      day,
      isoDate,
      minutes: Math.max(0, minutes),
    };
  });
}

/**
 * Record practice minutes for a specific skill and user
 */
export function addSkillPracticeMinutes(
  userId: string | undefined,
  skill: SkillType,
  minutes: number,
  storageProvider?: Storage
): void {
  if (typeof minutes !== "number" || isNaN(minutes) || !isFinite(minutes) || minutes <= 0) return;
  const todayStr = new Date().toISOString().slice(0, 10);
  const key = `xp_voca_skill_minutes_${userId || "guest"}_${skill}`;

  try {
    const store = storageProvider || (typeof window !== "undefined" ? localStorage : null);
    if (!store) return;

    const skillMap = sanitizeMinutesMap(store.getItem(key));
    const currentMins = skillMap[todayStr] || 0;
    skillMap[todayStr] = Math.min(1440, currentMins + Math.round(minutes));
    store.setItem(key, JSON.stringify(skillMap));
  } catch (e) {
    console.error(`Error saving skill practice minutes for ${skill}:`, e);
  }
}
