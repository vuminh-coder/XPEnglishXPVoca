/**
 * Shared Server-Side Date Utilities.
 * Single source of truth for date string formatting across all API routes.
 * Eliminates 6 duplicated copies of getLocalDateString / getWeekDateRange.
 */

/**
 * Returns a YYYY-MM-DD string for a given Date (server-local timezone).
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
