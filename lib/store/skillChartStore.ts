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
 * Safely formats a Date into local YYYY-MM-DD string without UTC timezone shift
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayDiff);

  let skillMap: Record<string, number> = {};

  if (typeof window !== "undefined" || storageProvider) {
    try {
      const store = storageProvider || localStorage;
      const key = `xp_voca_skill_minutes_${userId || "guest"}_${skill}`;
      skillMap = sanitizeMinutesMap(store.getItem(key));
    } catch (e) {
      console.error(`Error loading skill chart data for ${skill}:`, e);
    }
  }

  // Generate 7-day rolling window: 4 days prior (-4, -3, -2, -1), Today (0), 2 days future (+1, +2)
  const result: SkillDayData[] = [];
  for (let offset = -4; offset <= 2; offset++) {
    const targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    const isoDate = getLocalDateString(targetDate);
    const day = `${targetDate.getDate()} Th${targetDate.getMonth() + 1}`;
    const minutes = skillMap[isoDate] || 0;

    result.push({
      day,
      isoDate,
      minutes: Math.max(0, minutes),
    });
  }

  return result;
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
  const todayStr = getLocalDateString(new Date());
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
