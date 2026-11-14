/**
 * Shared Server-Side Date Utilities.
 * Single source of truth for date string formatting across all API routes.
 * Eliminates 6 duplicated copies of getLocalDateString / getWeekDateRange.
 */

/**
 * Returns a YYYY-MM-DD string for a given Date (server-local timezone).
 */
const APP_TIME_ZONE = "Asia/Ho_Chi_Minh";

export function getLocalDateString(d: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: APP_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
  } catch {
    const vnTime = new Date(d.getTime() + 7 * 60 * 60 * 1000);
    const year = vnTime.getUTCFullYear();
    const month = String(vnTime.getUTCMonth() + 1).padStart(2, "0");
    const day = String(vnTime.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}

export function getAppDateString(d: Date = new Date()): string {
  return getLocalDateString(d);
}

/**
 * Returns the UTC Date representing 00:00:00.000 in Asia/Ho_Chi_Minh (+07:00)
 * for the given reference timestamp.
 */
export function getAppStartOfToday(now: Date = new Date()): Date {
  const dateStr = getLocalDateString(now);
  return new Date(`${dateStr}T00:00:00.000+07:00`);
}

export function getShiftedAppDateString(offsetDays: number, now: Date = new Date()): string {
  const shifted = new Date(now.getTime() + offsetDays * 86_400_000);
  return getLocalDateString(shifted);
}

/**
 * Returns the ISO-week (Monday-start) date range for the current week.
 */
export function getWeekDateRange(): {
  startOfWeekStr: string;
  endOfWeekStr: string;
  weekDates: string[];
} {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const dayDiff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek; // Monday start

  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + dayDiff
  );
  const weekDates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate() + i
    );
    weekDates.push(getLocalDateString(d));
  }

  return {
    startOfWeekStr: weekDates[0],
    endOfWeekStr: weekDates[6],
    weekDates,
  };
}

/**
 * Calculates consecutive learning days (streak) from a set of active practice dates (YYYY-MM-DD).
 * Handles streak freezes gracefully to bridge missed days.
 */
export function calculateStreakFromActiveDates(
  activeDates: Iterable<string>,
  today: Date = new Date(),
  streakFreezes = 0
): { currentStreak: number; freezesConsumed: number; isLearnedToday: boolean } {
  const dateSet = activeDates instanceof Set ? activeDates : new Set(activeDates);
  const todayStr = getLocalDateString(today);
  const isLearnedToday = dateSet.has(todayStr);

  let currentStreak = 0;
  let remainingFreezes = Math.max(0, streakFreezes);
  let freezesConsumed = 0;

  // If user learned today, start counting from today. Otherwise, start from yesterday.
  const cursorDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!isLearnedToday) {
    cursorDate.setDate(cursorDate.getDate() - 1);
  }

  // Iterate backwards day by day (up to 365 days max)
  for (let i = 0; i < 365; i++) {
    const checkStr = getLocalDateString(cursorDate);
    if (dateSet.has(checkStr)) {
      currentStreak += 1;
    } else {
      if (remainingFreezes > 0) {
        remainingFreezes -= 1;
        freezesConsumed += 1;
        // Freeze bridges the missed day, continue to previous day
      } else {
        break;
      }
    }
    cursorDate.setDate(cursorDate.getDate() - 1);
  }

  return { currentStreak, freezesConsumed, isLearnedToday };
}

