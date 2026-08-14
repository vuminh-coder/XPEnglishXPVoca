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
 * Map mode display names to SkillType
 */
export type SkillModeName = "Dictation" | "Shadowing" | "Nói" | "Từ vựng" | "Viết";

export function modeNameToSkillType(mode: string): SkillType {
  const normalized = mode.trim().toLowerCase();
  if (normalized === "dictation") return "dictation";
  if (normalized === "shadowing") return "shadowing";
  if (normalized === "nói" || normalized === "speaking") return "speaking";
  if (normalized === "từ vựng" || normalized === "vocab") return "vocab";
  if (normalized === "viết" || normalized === "writing") return "writing";
  return "dictation";
}

/**
 * Record practice minutes AND XP for a specific skill & general user daily tracker
 */
export function addSkillPracticeSession(
  userId: string | undefined,
  skill: SkillType | SkillModeName,
  minutes: number,
  xp: number,
  storageProvider?: Storage
): void {
  const store = storageProvider || (typeof window !== "undefined" ? localStorage : null);
  if (!store) return;

  const validUserId = userId || "guest";
  const skillType = typeof skill === "string" && (skill as any) in SKILL_CONFIGS ? (skill as SkillType) : modeNameToSkillType(skill);
  const todayStr = getLocalDateString(new Date());

  // Keys for per-skill tracker
  const skillMinKey = `xp_voca_daily_minutes_${validUserId}_${skillType}`;
  const skillXpKey = `xp_voca_daily_xp_${validUserId}_${skillType}`;

  // Keys for display mode names (backwards compatibility)
  const modeLabel = SKILL_CONFIGS[skillType]?.label || skill;
  const modeMinKey = `xp_voca_daily_minutes_${validUserId}_${modeLabel}`;
  const modeXpKey = `xp_voca_daily_xp_${validUserId}_${modeLabel}`;

  // Keys for general daily tracker
  const genMinKey = `xp_voca_daily_minutes_${validUserId}`;
  const genXpKey = `xp_voca_daily_xp_${validUserId}`;

  try {
    // 1. Update skill-specific minutes
    if (typeof minutes === "number" && minutes > 0) {
      const minMap = sanitizeMinutesMap(store.getItem(skillMinKey));
      minMap[todayStr] = Math.min(1440, (minMap[todayStr] || 0) + Math.round(minutes));
      store.setItem(skillMinKey, JSON.stringify(minMap));
      store.setItem(modeMinKey, JSON.stringify(minMap));

      const genMinMap = sanitizeMinutesMap(store.getItem(genMinKey));
      genMinMap[todayStr] = Math.min(1440, (genMinMap[todayStr] || 0) + Math.round(minutes));
      store.setItem(genMinKey, JSON.stringify(genMinMap));

      // Also update Legacy skillChartStore key
      addSkillPracticeMinutes(validUserId, skillType, minutes, store);
    }

    // 2. Update skill-specific XP
    if (typeof xp === "number" && xp > 0) {
      const xpMap = sanitizeMinutesMap(store.getItem(skillXpKey));
      xpMap[todayStr] = Math.min(10000, (xpMap[todayStr] || 0) + Math.round(xp));
      store.setItem(skillXpKey, JSON.stringify(xpMap));
      store.setItem(modeXpKey, JSON.stringify(xpMap));

      const genXpMap = sanitizeMinutesMap(store.getItem(genXpKey));
      genXpMap[todayStr] = Math.min(10000, (genXpMap[todayStr] || 0) + Math.round(xp));
      store.setItem(genXpKey, JSON.stringify(genXpMap));
    }
  } catch (e) {
    console.error(`Error saving skill practice session for ${skillType}:`, e);
  }
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

/**
 * Get 30-day date series, minutes, and XP for line charts
 */
export function get30DaySkillAnalytics(
  userId: string | undefined,
  skillFilter?: SkillType | SkillModeName,
  storageProvider?: Storage
): { dates: string[]; minutes: number[]; xp: number[]; todayIndex: number } {
  const store = storageProvider || (typeof window !== "undefined" ? localStorage : null);
  const validUserId = userId || "guest";
  const today = new Date();

  // 19 days past (-19..-1), TODAY (0), 10 days future (+1..+10) - Exactly 8 time milestones
  const offsets = [-19, -14, -9, -4, 0, 3, 6, 10];
  const todayIndex = offsets.indexOf(0); // Index 4

  const dates: string[] = [];
  const minutes: number[] = [];
  const xp: number[] = [];

  let skillMinMap: Record<string, number> = {};
  let skillXpMap: Record<string, number> = {};

  const genMinMap = store ? sanitizeMinutesMap(store.getItem(`xp_voca_daily_minutes_${validUserId}`)) : {};
  const genXpMap = store ? sanitizeMinutesMap(store.getItem(`xp_voca_daily_xp_${validUserId}`)) : {};

  if (store && skillFilter) {
    const skillType = typeof skillFilter === "string" && (skillFilter as any) in SKILL_CONFIGS ? (skillFilter as SkillType) : modeNameToSkillType(skillFilter);
    const modeLabel = SKILL_CONFIGS[skillType]?.label || skillFilter;

    const minKey = `xp_voca_daily_minutes_${validUserId}_${skillType}`;
    const modeMinKey = `xp_voca_daily_minutes_${validUserId}_${modeLabel}`;
    const xpKey = `xp_voca_daily_xp_${validUserId}_${skillType}`;
    const modeXpKey = `xp_voca_daily_xp_${validUserId}_${modeLabel}`;

    const rawMin = store.getItem(minKey) || store.getItem(modeMinKey);
    const rawXp = store.getItem(xpKey) || store.getItem(modeXpKey);

    skillMinMap = sanitizeMinutesMap(rawMin);
    skillXpMap = sanitizeMinutesMap(rawXp);
  }

  offsets.forEach((offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);

    const isoKey = getLocalDateString(d);
    const dayNum = d.getDate();
    const monthNum = d.getMonth() + 1;

    if (offset === 0) {
      dates.push("Hôm nay");
    } else {
      dates.push(`${dayNum} thg ${monthNum}`);
    }

    if (skillFilter) {
      // Strictly skill-specific minutes & XP (isolated per page/skill)
      minutes.push(skillMinMap[isoKey] || 0);
      xp.push(skillXpMap[isoKey] || 0);
    } else {
      // Combined overall across all pages/skills
      minutes.push(genMinMap[isoKey] || 0);
      xp.push(genXpMap[isoKey] || 0);
    }
  });

  return { dates, minutes, xp, todayIndex };
}

/**
 * Get 6-month (24 weeks x 7 days = 168 days) heatmap contribution matrix data
 */
export interface HeatmapTileData {
  intensity: number; // 0, 1, 2, 3
  count: number;     // Number of activities
  dateStr: string;   // E.g. "Ngày 14 Feb 2026"
  isoDate: string;
}

export function get6MonthHeatmapAnalytics(
  userId: string | undefined,
  storageProvider?: Storage
): { weeks: HeatmapTileData[][]; totalActivities: number } {
  const store = storageProvider || (typeof window !== "undefined" ? localStorage : null);
  const validUserId = userId || "guest";
  const genMinMap = store ? sanitizeMinutesMap(store.getItem(`xp_voca_daily_minutes_${validUserId}`)) : {};
  const genXpMap = store ? sanitizeMinutesMap(store.getItem(`xp_voca_daily_xp_${validUserId}`)) : {};

  const today = new Date();
  const monthNames = ["Thg 1", "Thg 2", "Thg 3", "Thg 4", "Thg 5", "Thg 6", "Thg 7", "Thg 8", "Thg 9", "Thg 10", "Thg 11", "Thg 12"];

  let totalActivities = 0;
  const totalDays = 24 * 7; // 168 days
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - totalDays + 1);

  const daysData: HeatmapTileData[] = [];

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);

    const isoDate = getLocalDateString(d);
    const dayNum = d.getDate();
    const monthName = monthNames[d.getMonth()];
    const year = d.getFullYear();
    const dateStr = `Ngày ${dayNum} ${monthName}, ${year}`;

    const dayMin = genMinMap[isoDate] || 0;
    const dayXp = genXpMap[isoDate] || 0;

    let count = 0;
    if (dayMin > 0 || dayXp > 0) {
      count = Math.max(1, Math.floor(dayMin / 3) + Math.floor(dayXp / 15));
    }

    totalActivities += count;

    let intensity = 0;
    if (count >= 5) intensity = 3;
    else if (count >= 3) intensity = 2;
    else if (count >= 1) intensity = 1;

    daysData.push({ intensity, count, dateStr, isoDate });
  }

  // Chunk into 24 weeks (7 days per week)
  const weeks: HeatmapTileData[][] = [];
  for (let w = 0; w < 24; w++) {
    weeks.push(daysData.slice(w * 7, (w + 1) * 7));
  }

  return { weeks, totalActivities };
}

