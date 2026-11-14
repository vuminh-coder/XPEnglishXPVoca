/**
 * Client-Side Intelligent Prefetch Engine
 * Warms up browser HTTP cache and server-side memoryCache on hover/touch
 * Achieving instant page transitions for authenticated user navigation.
 */

import { useUserStore } from "@/stores/userStore";

const prefetchedEndpoints = new Map<string, number>();
const PREFETCH_COOLDOWN_MS = 45_000; // 45s cooldown per endpoint

const PUBLIC_PREFETCH_ROUTES = new Set<string>([
  "/study/dictation",
  "/study/shadowing",
  "/community/leaderboard",
]);

/**
 * Maps frontend application routes to their corresponding critical backend API endpoints
 */
const ROUTE_API_MAP: Record<string, string[]> = {
  "/dashboard": ["/api/dashboard/overview"],
  "/vocabulary": ["/api/user/vocab"],
  "/study/dictation": ["/api/listening/lessons"],
  "/study/shadowing": ["/api/listening/lessons"],
  "/study/reading": ["/api/user/profile"],
  "/analytics": ["/api/user/analytics"],
  "/community/leaderboard": ["/api/leaderboard?period=week"],
  "/profile": ["/api/user/analytics", "/api/user/profile"],
};

/**
 * Prefetches the critical API data for a given destination route.
 * Skips private `/api/user/*` & `/api/dashboard/*` endpoints when no authenticated user session is present.
 */
export function prefetchRouteData(targetHref: string): void {
  if (typeof window === "undefined") return;

  const cleanHref = targetHref.split("?")[0].split("#")[0];
  const hasSession = Boolean(useUserStore.getState().user);

  let endpointsToWarm: string[] = [];

  for (const [routePrefix, apis] of Object.entries(ROUTE_API_MAP)) {
    if (cleanHref === routePrefix || cleanHref.startsWith(`${routePrefix}/`)) {
      if (!hasSession && !PUBLIC_PREFETCH_ROUTES.has(routePrefix)) {
        continue;
      }
      endpointsToWarm = endpointsToWarm.concat(apis);
    }
  }

  if (endpointsToWarm.length === 0) return;

  const now = Date.now();

  endpointsToWarm.forEach((endpoint) => {
    const lastPrefetched = prefetchedEndpoints.get(endpoint) || 0;
    if (now - lastPrefetched < PREFETCH_COOLDOWN_MS) {
      return;
    }

    prefetchedEndpoints.set(endpoint, now);

    try {
      if (typeof window.fetch === "function") {
        fetch(endpoint, {
          method: "GET",
          headers: {
            "X-Purpose": "preview",
            "X-Prefetch": "true",
          },
        }).catch(() => {
          // Prefetching is opportunistic — suppress network errors
        });
      }
    } catch {
      // Ignore prefetch exceptions
    }
  });
}
