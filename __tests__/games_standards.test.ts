import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies
vi.mock("@/infrastructure/auth/auth", () => ({
  getAuthenticatedUserId: vi.fn(),
}));

vi.mock("@/infrastructure/database/prisma", () => ({
  prisma: {
    $transaction: vi.fn(),
    profile: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    dailySkillPractice: {
      upsert: vi.fn(),
    },
  },
}));

vi.mock("@/infrastructure/cache/dashboardCache", () => ({
  invalidateDashboardCache: vi.fn(),
}));

import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { POST } from "@/app/api/games/record/route";

describe("Mini-Games Standards & Anti-Cheat Validation (/api/games/record)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("1. Rejects fast bot submissions with 0 rewards if duration is under 8 seconds", async () => {
    vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_fast");

    const req = new Request("http://localhost:3000/api/games/record", {
      method: "POST",
      body: JSON.stringify({
        gameType: "scramble",
        score: 100,
        wordsCompleted: 8,
        durationSeconds: 3, // < 8s anti-cheat flag
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.antiCheatFlagged).toBe(true);
    expect(json.data.xpGained).toBe(0);
    expect(json.data.coinsGained).toBe(0);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("2. Handles guest players smoothly without database writes", async () => {
    vi.mocked(getAuthenticatedUserId).mockResolvedValue(null);

    const req = new Request("http://localhost:3000/api/games/record", {
      method: "POST",
      body: JSON.stringify({
        gameType: "memory",
        score: 50,
        durationSeconds: 45,
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.guest).toBe(true);
    expect(json.data.xpGained).toBeGreaterThan(0);
    expect(json.data.coinsGained).toBeGreaterThan(0);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("3. Calculates server-authoritative rewards for wordle guesses", async () => {
    vi.mocked(getAuthenticatedUserId).mockResolvedValue(null);

    const req = new Request("http://localhost:3000/api/games/record", {
      method: "POST",
      body: JSON.stringify({
        gameType: "wordle",
        attempts: 1, // 1st guess should earn max 50 XP
        durationSeconds: 20,
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.data.xpGained).toBe(50);
    expect(json.data.coinsGained).toBe(5);
  });

  it("4. Atomically updates profile and records DailySkillPractice in a single transaction", async () => {
    vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_legit_gamer");

    const mockProfile = {
      id: "user_legit_gamer",
      totalXp: 500,
      level: 5,
      coins: 200,
    };

    const mockUpdatedProfile = {
      id: "user_legit_gamer",
      totalXp: 540,
      level: 5,
      title: "Warrior",
      coins: 208,
    };

    const mockTx = {
      profile: {
        findUnique: vi.fn().mockResolvedValue(mockProfile),
        update: vi.fn().mockResolvedValue(mockUpdatedProfile),
      },
      dailySkillPractice: {
        upsert: vi.fn().mockResolvedValue({ id: "dsp_1" }),
      },
    };

    vi.mocked(prisma.$transaction).mockImplementation(async (callback: any) => {
      return await callback(mockTx);
    });

    const req = new Request("http://localhost:3000/api/games/record", {
      method: "POST",
      body: JSON.stringify({
        gameType: "memory",
        score: 45,
        durationSeconds: 30,
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.xpGained).toBe(40); // 30 + 10 bonus
    expect(json.data.coinsGained).toBe(8);

    // Verify transaction operations
    expect(mockTx.profile.findUnique).toHaveBeenCalledWith({
      where: { id: "user_legit_gamer" },
      select: { id: true, totalXp: true, level: true, coins: true },
    });
    expect(mockTx.dailySkillPractice.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          userId_skill_date: expect.objectContaining({
            userId: "user_legit_gamer",
            skill: "vocab",
          }),
        }),
      })
    );
    expect(invalidateDashboardCache).toHaveBeenCalledWith("user_legit_gamer");
  });
});
