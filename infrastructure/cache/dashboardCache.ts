import { memoryCache } from "./memoryCache";

function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Proactively purges memory cache for a given user when mutations occur
 * (e.g. checkin, practice, game record, task complete, exam attempt)
 */
export function invalidateDashboardCache(userId: string): void {
  if (!userId || userId === "guest_user" || userId === "local_user") return;
  const todayStr = getLocalDateString(new Date());
  memoryCache.del(`dashboard_overview:${userId}:${todayStr}`);
  memoryCache.invalidatePattern(`dashboard_overview:${userId}:`);
}
