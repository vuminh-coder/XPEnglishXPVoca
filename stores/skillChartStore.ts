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
      const legacyKey = `xp_voca_skill_minutes_${validUserId}_${skillType}`;
      const legacyMap = sanitizeMinutesMap(store.getItem(legacyKey));
      legacyMap[todayStr] = Math.min(1440, (legacyMap[todayStr] || 0) + Math.round(minutes));
      store.setItem(legacyKey, JSON.stringify(legacyMap));
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

    // 3. Sync to PostgreSQL Neon DB in background if user is authenticated
    if (
      typeof window !== "undefined" &&
      validUserId !== "guest" &&
      validUserId !== "local_user" &&
      !validUserId.startsWith("local_user")
    ) {
      const payload: { skill: string; minutes?: number; xp?: number; date: string } = {
        skill: skillType,
        date: todayStr,
      };
      if (typeof minutes === "number" && minutes > 0) payload.minutes = Math.round(minutes);
      if (typeof xp === "number" && xp > 0) payload.xp = Math.round(xp);

      if (payload.minutes || payload.xp) {
        fetch("/api/user/skill-practice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => console.error("Error syncing skill practice to DB:", err));
      }
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
  addSkillPracticeSession(userId, skill, minutes, 0, storageProvider);
}

/**
 * Hydrates skill practice minutes & XP from backend database into LocalStorage
 */
export async function hydrateSkillMinutesFromBackend(userId: string | undefined): Promise<void> {
  if (typeof window === "undefined") return;
  const effectiveUserId = userId || "local_user";

  try {
    const res = await fetch("/api/user/skill-practice", { method: "GET" });
    if (!res.ok) return;
    const json = await res.json();
    if (!json.success || !json.data) return;

    // 1. Hydrate Minutes
    if (json.data.skills) {
      const skillsMap = json.data.skills as Record<SkillType, Record<string, number>>;
      for (const skillKey of Object.keys(skillsMap) as SkillType[]) {
        const dbDateMap = skillsMap[skillKey];
        const localKey = `xp_voca_skill_minutes_${effectiveUserId}_${skillKey}`;
        const dailyMinKey = `xp_voca_daily_minutes_${effectiveUserId}_${skillKey}`;

        const localMap = sanitizeMinutesMap(localStorage.getItem(localKey));
        const dailyMap = sanitizeMinutesMap(localStorage.getItem(dailyMinKey));

        const mergedMap: Record<string, number> = { ...localMap };
        for (const [dt, mins] of Object.entries(dbDateMap)) {
          if (mins > (mergedMap[dt] || 0)) {
            mergedMap[dt] = mins;
          }
        }
        localStorage.setItem(localKey, JSON.stringify(mergedMap));
        localStorage.setItem(dailyMinKey, JSON.stringify(mergedMap));
      }
    }

    // 2. Hydrate XP
    if (json.data.xpSkills) {
      const xpSkillsMap = json.data.xpSkills as Record<SkillType, Record<string, number>>;
      for (const skillKey of Object.keys(xpSkillsMap) as SkillType[]) {
        const dbDateMap = xpSkillsMap[skillKey];
        const dailyXpKey = `xp_voca_daily_xp_${effectiveUserId}_${skillKey}`;
        const localMap = sanitizeMinutesMap(localStorage.getItem(dailyXpKey));

        const mergedMap: Record<string, number> = { ...localMap };
        for (const [dt, xpVal] of Object.entries(dbDateMap)) {
          if (xpVal > (mergedMap[dt] || 0)) {
            mergedMap[dt] = xpVal;
          }
        }
        localStorage.setItem(dailyXpKey, JSON.stringify(mergedMap));
      }
    }
  } catch (e) {
    console.error("Error hydrating skill minutes from backend:", e);
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

  // 19 days past (-19..-1), TODAY (0), 10 days future (+1..+10) - Exactly 8 time milestones with interval bucketing
  const bucketRanges: { startOffset: number; endOffset: number; dateOffset: number }[] = [
    { startOffset: -21, endOffset: -17, dateOffset: -19 },
    { startOffset: -16, endOffset: -12, dateOffset: -14 },
    { startOffset: -11, endOffset: -7,  dateOffset: -9 },
    { startOffset: -6,  endOffset: -2,  dateOffset: -4 },
    { startOffset: -1,  endOffset: 0,   dateOffset: 0 },
    { startOffset: 1,   endOffset: 3,   dateOffset: 3 },
    { startOffset: 4,   endOffset: 6,   dateOffset: 6 },
    { startOffset: 7,   endOffset: 10,  dateOffset: 10 },
  ];
  const todayIndex = 4; // Index 4 is "Hôm nay"

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

  bucketRanges.forEach((range) => {
    const d = new Date(today);
    d.setDate(d.getDate() + range.dateOffset);
    const dayNum = d.getDate();
    const monthNum = d.getMonth() + 1;

    if (range.dateOffset === 0) {
      dates.push("Hôm nay");
    } else {
      dates.push(`${dayNum} thg ${monthNum}`);
    }

    if (range.startOffset > 0) {
      minutes.push(0);
      xp.push(0);
      return;
    }

    let bMin = 0;
    let bXp = 0;
    for (let dayOffset = range.startOffset; dayOffset <= range.endOffset; dayOffset++) {
      const dt = new Date(today);
      dt.setDate(dt.getDate() + dayOffset);
      const isoKey = getLocalDateString(dt);

      if (skillFilter) {
        bMin += skillMinMap[isoKey] || 0;
        bXp += skillXpMap[isoKey] || 0;
      } else {
        bMin += genMinMap[isoKey] || 0;
        bXp += genXpMap[isoKey] || 0;
      }
    }

    minutes.push(bMin);
    xp.push(bXp);
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

