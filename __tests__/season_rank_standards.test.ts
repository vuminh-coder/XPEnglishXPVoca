import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  RANK_TIERS,
  getPreviousSeason,
  getSeasonForDate,
  getTierForXp,
  getTierProgress,
  formatRankXp,
  isValidSeasonId,
} from "@/features/gamification/utils/seasonRank";

describe("Season engine", () => {
  it("derives a calendar-month season with correct bounds", () => {
    const s = getSeasonForDate(new Date(2026, 1, 10)); // Feb 2026 (28 days)
    expect(s.id).toBe("2026-02");
    expect(s.startDate).toBe("2026-02-01");
    expect(s.endDate).toBe("2026-02-28");
    expect(s.totalDays).toBe(28);
    expect(s.daysLeft).toBe(19);
  });

  it("handles leap-year February and year rollover for previous season", () => {
    expect(getSeasonForDate(new Date(2028, 1, 1)).endDate).toBe("2028-02-29");
    const prev = getPreviousSeason(new Date(2026, 0, 15)); // Jan 2026 -> Dec 2025
    expect(prev.id).toBe("2025-12");
    expect(prev.endDate).toBe("2025-12-31");
    expect(prev.daysLeft).toBe(0);
  });

  it("validates season ids", () => {
    expect(isValidSeasonId("2026-10")).toBe(true);
    expect(isValidSeasonId("2026-13")).toBe(false);
    expect(isValidSeasonId("26-10")).toBe(false);
  });
});

describe("Rank tiers", () => {
  it("maps XP to tiers at exact boundaries", () => {
    expect(getTierForXp(0).id).toBe("bronze");
    expect(getTierForXp(299).id).toBe("bronze");
    expect(getTierForXp(300).id).toBe("silver");
    expect(getTierForXp(1000).id).toBe("gold");
    expect(getTierForXp(2500).id).toBe("platinum");
    expect(getTierForXp(5000).id).toBe("diamond");
    expect(getTierForXp(999999).id).toBe("diamond");
  });

  it("is safe for invalid input", () => {
    expect(getTierForXp(-50).id).toBe("bronze");
    expect(getTierForXp(NaN).id).toBe("bronze");
  });

  it("tiers are strictly increasing in XP and reward", () => {
    for (let i = 1; i < RANK_TIERS.length; i++) {
      expect(RANK_TIERS[i].minXp).toBeGreaterThan(RANK_TIERS[i - 1].minXp);
      expect(RANK_TIERS[i].rewardCoins).toBeGreaterThanOrEqual(RANK_TIERS[i - 1].rewardCoins);
    }
    expect(RANK_TIERS[0].rewardCoins).toBe(0);
  });

  it("computes progress with max 2 decimals and handles max tier", () => {
    const p = getTierProgress(150); // bronze 0..300
    expect(p.tier.id).toBe("bronze");
    expect(p.nextTier?.id).toBe("silver");
    expect(p.xpToNext).toBe(150);
    expect(p.percent).toBe(50);

    const odd = getTierProgress(100); // 100/300 = 33.333…
    expect(odd.percent).toBe(33.33);

    const max = getTierProgress(8000);
    expect(max.nextTier).toBeNull();
    expect(max.percent).toBe(100);
    expect(max.xpToNext).toBe(0);
  });

  it("formats tier threshold XP cleanly for UI roadmap", () => {
    expect(formatRankXp(0)).toBe("0 XP");
    expect(formatRankXp(300)).toBe("300 XP");
    expect(formatRankXp(1000)).toBe("1k XP");
    expect(formatRankXp(2500)).toBe("2.5k XP");
    expect(formatRankXp(5000)).toBe("5k XP");
  });
});


describe("Season API safety (static)", () => {
  const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

  it("claim route is auth-gated and recomputes tier server-side", () => {
    const src = read("app/api/season/claim/route.ts");
    expect(src).toContain("getAuthenticatedUserId");
    expect(src).toContain("status: 401");
    expect(src).toContain("getUserSeasonXp");
    expect(src).not.toMatch(/request\.json\(\)/); // never trusts client-provided tier/coins
  });

  it("store claims atomically with a primary-key guard", () => {
    const src = read("infrastructure/database/seasonStore.ts");
    expect(src).toContain("PRIMARY KEY (user_id, season_id)");
    expect(src).toContain("ON CONFLICT (user_id, season_id) DO NOTHING");
    expect(src).toContain("$transaction");
  });

  it("GET route never caches per-user data publicly", () => {
    expect(read("app/api/season/route.ts")).toContain("private, no-store");
  });
});
