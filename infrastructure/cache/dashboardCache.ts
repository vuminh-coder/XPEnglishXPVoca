import { memoryCache } from "./memoryCache";
import { getLocalDateString } from "@/shared/utils/dateUtils";

/**
 * Proactively purges memory cache for a given user when mutations occur
 * (e.g. checkin, practice, game record, task complete, exam attempt, activity award)
 */
export function invalidateAnalyticsCache(userId: string): void {
  if (!userId || userId === "guest_user" || userId === "local_user") return;
  const todayStr = getLocalDateString(new Date());
  memoryCache.del(`analytics:${userId}:${todayStr}`);
  memoryCache.invalidatePattern(`analytics:${userId}:`);
}

export function invalidateDashboardCache(userId: string): void {
  if (!userId || userId === "guest_user" || userId === "local_user") return;
  const todayStr = getLocalDateString(new Date());
  memoryCache.del(`dashboard_overview:${userId}:${todayStr}`);
  memoryCache.invalidatePattern(`dashboard_overview:${userId}:`);
  invalidateAnalyticsCache(userId);
}

