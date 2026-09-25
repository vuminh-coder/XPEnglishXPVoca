import { describe, it, expect, beforeEach, vi } from "vitest";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { NextRequest } from "next/server";

// Hoist mocks
const { mockPrisma } = vi.hoisted(() => ({
  mockPrisma: {
    profile: {
      findMany: vi.fn(),
    },
    group: {
      findUnique: vi.fn(),
    },
    dailySkillPractice: {
      findMany: vi.fn(),
    },
    $queryRaw: vi.fn(),
  },
}));

vi.mock("@/infrastructure/database/prisma", () => ({
  prisma: mockPrisma,
  safeDbExecute: async <T>(fn: () => Promise<T>) => await fn(),
  handlePrismaError: (e: any) => ({ error: e.message, status: 500 }),
}));

// Route Handlers
import { GET as getLeaderboard } from "@/app/api/leaderboard/route";
import { GET as getGroupStats } from "@/app/api/groups/[id]/stats/route";

describe("Leaderboard, Minute Charts & Group Stats Performance Standards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    memoryCache.invalidatePattern("");
  });

  describe("1. Leaderboard API (GET /api/leaderboard)", () => {
    it("should return cached response with X-Cache: HIT and prevent query execution", async () => {
      const cacheKey = "leaderboard:week:xp:1:50";
      memoryCache.set(cacheKey, {
        success: true,
        period: "week",
        criterion: "xp",
        data: [{ id: "u1", fullName: "Top 1 XP", xp: 5000 }],
      }, 60);

      const req = new NextRequest("http://localhost:3000/api/leaderboard?period=week&criterion=xp");
      const res = await getLeaderboard(req);
      const json = await res.json();

      expect(res.headers.get("X-Cache")).toBe("HIT");
      expect(json.data[0].fullName).toBe("Top 1 XP");
      expect(mockPrisma.$queryRaw).not.toHaveBeenCalled();
      expect(mockPrisma.profile.findMany).not.toHaveBeenCalled();
    });

    it("should use distinct cache keys for criterion=time vs criterion=xp avoiding collision", async () => {
      const timeKey = "leaderboard:week:time:1:50";
      const xpKey = "leaderboard:week:xp:1:50";

      memoryCache.set(timeKey, {
        success: true,
        criterion: "time",
        data: [{ id: "u_time", fullName: "Time Leader", minutesStudied: 300, xp: 100 }],
      }, 60);

      memoryCache.set(xpKey, {
        success: true,
        criterion: "xp",
        data: [{ id: "u_xp", fullName: "XP Leader", minutesStudied: 100, xp: 2000 }],
      }, 60);

      const reqTime = new NextRequest("http://localhost:3000/api/leaderboard?period=week&criterion=time");
      const resTime = await getLeaderboard(reqTime);
      const jsonTime = await resTime.json();

      const reqXp = new NextRequest("http://localhost:3000/api/leaderboard?period=week&criterion=xp");
      const resXp = await getLeaderboard(reqXp);
      const jsonXp = await resXp.json();

      expect(jsonTime.criterion).toBe("time");
      expect(jsonTime.data[0].fullName).toBe("Time Leader");

      expect(jsonXp.criterion).toBe("xp");
      expect(jsonXp.data[0].fullName).toBe("XP Leader");
    });

    it("should query with ORDER BY periodic_minutes when criterion=time", async () => {
      mockPrisma.$queryRaw.mockResolvedValueOnce([
        { user_id: "user_a", periodic_xp: 200, periodic_minutes: 180 },
        { user_id: "user_b", periodic_xp: 500, periodic_minutes: 120 },
      ]);

      mockPrisma.profile.findMany.mockResolvedValueOnce([
        { id: "user_a", fullName: "Alice Time", username: "alice", avatarUrl: null, avatarEmoji: "🦊", totalXp: 1200, minutesStudied: 300, currentStreak: 5, level: 3 },
        { id: "user_b", fullName: "Bob XP", username: "bob", avatarUrl: null, avatarEmoji: "🐯", totalXp: 4000, minutesStudied: 200, currentStreak: 12, level: 7 },
      ]);

      const req = new NextRequest("http://localhost:3000/api/leaderboard?period=week&criterion=time");
      const res = await getLeaderboard(req);
      const json = await res.json();

      expect(json.success).toBe(true);
      expect(json.meta.criterion).toBe("time");
      expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(1);

      // Verify rank ordering follows periodic_minutes (Alice #1, Bob #2)
      expect(json.data[0].id).toBe("user_a");
      expect(json.data[0].rank).toBe(1);
      expect(json.data[0].minutesStudied).toBe(180);

      expect(json.data[1].id).toBe("user_b");
      expect(json.data[1].rank).toBe(2);
      expect(json.data[1].minutesStudied).toBe(120);
    });

    it("should fallback to all-time query on Profile with bounded take when period=all", async () => {
      mockPrisma.profile.findMany.mockResolvedValueOnce([
        { id: "user_all_1", fullName: "Grand Master", username: "gm", avatarUrl: null, avatarEmoji: "👑", totalXp: 99999, minutesStudied: 5000, currentStreak: 100, level: 50 },
      ]);

      const req = new NextRequest("http://localhost:3000/api/leaderboard?period=all&criterion=xp&limit=25");
      const res = await getLeaderboard(req);
      const json = await res.json();

      expect(json.success).toBe(true);
      expect(mockPrisma.profile.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 25,
          skip: 0,
          orderBy: [{ totalXp: "desc" }, { minutesStudied: "desc" }, { id: "asc" }],
        })
      );
    });
  });

  describe("2. Group Minute Charts & Internal Leaderboard (GET /api/groups/[id]/stats)", () => {
    it("should return 7-day rolling minute curve and member leaderboard in exactly 2 bounded DB calls", async () => {
      const groupId = "group_ielts_fighters";

      // 1. Group info & members query
      mockPrisma.group.findUnique.mockResolvedValueOnce({
        id: groupId,
        name: "IELTS 7.5 Fighters",
        description: "Chiến binh săn 7.5 IELTS",
        themeName: "IELTS",
        accent: "#0059bb",
        maxMembers: 50,
        createdById: "creator_1",
        createdAt: new Date(),
        members: [
          {
            userId: "mem_1",
            role: "ADMIN",
            joinedAt: new Date(),
            user: {
              id: "mem_1",
              fullName: "Admin Minh",
              username: "minh",
              avatarUrl: null,
              avatarEmoji: "🦁",
              level: 15,
              title: "Học Giả",
              totalXp: 5000,
              minutesStudied: 600,
              currentStreak: 20,
            },
          },
          {
            userId: "mem_2",
            role: "MEMBER",
            joinedAt: new Date(),
            user: {
              id: "mem_2",
              fullName: "Linh Lan",
              username: "linh",
              avatarUrl: null,
              avatarEmoji: "🌸",
              level: 10,
              title: "Tập Sự",
              totalXp: 3000,
              minutesStudied: 450,
              currentStreak: 10,
            },
          },
        ],
      });

      // 2. Daily skill practice records for group members over 7 days
      mockPrisma.dailySkillPractice.findMany.mockResolvedValueOnce([
        { userId: "mem_1", date: "2026-09-22", minutes: 45, xpEarned: 120 },
        { userId: "mem_2", date: "2026-09-22", minutes: 30, xpEarned: 80 },
        { userId: "mem_1", date: "2026-09-24", minutes: 60, xpEarned: 150 },
      ]);

      const req = new NextRequest(`http://localhost:3000/api/groups/${groupId}/stats?criterion=time`);
      const res = await getGroupStats(req, { params: Promise.resolve({ id: groupId }) });
      const json = await res.json();

      expect(json.success).toBe(true);
      expect(mockPrisma.group.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrisma.dailySkillPractice.findMany).toHaveBeenCalledTimes(1);

      // Verify Chart Structure
      expect(json.data.chart).toBeDefined();
      expect(json.data.chart.minutesSeries).toHaveLength(7);
      expect(json.data.chart.totalMinutes).toBe(135); // 45 + 30 + 60 = 135
      expect(json.data.chart.bestDayMinutes).toBe(75); // on 2026-09-22: 45 + 30 = 75

      // Verify Group Member Leaderboard
      expect(json.data.leaderboard).toHaveLength(2);
      expect(json.data.leaderboard[0].id).toBe("mem_1"); // mem_1: 105 mins, mem_2: 30 mins
      expect(json.data.leaderboard[0].rank).toBe(1);
      expect(json.data.leaderboard[0].weeklyMinutes).toBe(105);
      expect(json.data.leaderboard[1].id).toBe("mem_2");
      expect(json.data.leaderboard[1].rank).toBe(2);
      expect(json.data.leaderboard[1].weeklyMinutes).toBe(30);
    });

    it("should serve group stats from memory cache on repeated requests", async () => {
      const groupId = "group_cached_1";
      const cacheKey = `group_stats:${groupId}:week:time`;
      memoryCache.set(cacheKey, {
        success: true,
        data: {
          group: { id: groupId, name: "Cached Group" },
          chart: { minutesSeries: [10, 20, 30, 40, 50, 60, 70], totalMinutes: 280 },
          leaderboard: [],
        },
      }, 30);

      const req = new NextRequest(`http://localhost:3000/api/groups/${groupId}/stats?criterion=time`);
      const res = await getGroupStats(req, { params: Promise.resolve({ id: groupId }) });
      const json = await res.json();

      expect(res.headers.get("X-Cache")).toBe("HIT");
      expect(json.data.group.name).toBe("Cached Group");
      expect(mockPrisma.group.findUnique).not.toHaveBeenCalled();
    });

    it("should sort group members by XP when criterion=xp", async () => {
      const groupId = "group_xp_sort";

      mockPrisma.group.findUnique.mockResolvedValueOnce({
        id: groupId,
        name: "XP Champions",
        description: "XP race",
        themeName: "TOEIC",
        accent: "#0059bb",
        maxMembers: 50,
        createdById: "creator_2",
        createdAt: new Date(),
        members: [
          {
            userId: "user_fast",
            role: "MEMBER",
            joinedAt: new Date(),
            user: {
              id: "user_fast",
              fullName: "Fast Earner",
              username: "fast",
              avatarUrl: null,
              avatarEmoji: "⚡",
              level: 8,
              title: "Tập Sự",
              totalXp: 2000,
              minutesStudied: 50,
              currentStreak: 5,
            },
          },
          {
            userId: "user_slow",
            role: "MEMBER",
            joinedAt: new Date(),
            user: {
              id: "user_slow",
              fullName: "Slow Learner",
              username: "slow",
              avatarUrl: null,
              avatarEmoji: "🐢",
              level: 5,
              title: "Tân Binh",
              totalXp: 500,
              minutesStudied: 200,
              currentStreak: 3,
            },
          },
        ],
      });

      mockPrisma.dailySkillPractice.findMany.mockResolvedValueOnce([
        { userId: "user_fast", date: "2026-09-24", minutes: 20, xpEarned: 350 },
        { userId: "user_slow", date: "2026-09-24", minutes: 100, xpEarned: 100 },
      ]);

      const req = new NextRequest(`http://localhost:3000/api/groups/${groupId}/stats?criterion=xp`);
      const res = await getGroupStats(req, { params: Promise.resolve({ id: groupId }) });
      const json = await res.json();

      expect(json.success).toBe(true);
      // Fast earner has 350 weekly XP, Slow has 100 weekly XP
      expect(json.data.leaderboard[0].id).toBe("user_fast");
      expect(json.data.leaderboard[0].rank).toBe(1);
      expect(json.data.leaderboard[0].weeklyXp).toBe(350);

      expect(json.data.leaderboard[1].id).toBe("user_slow");
      expect(json.data.leaderboard[1].rank).toBe(2);
      expect(json.data.leaderboard[1].weeklyXp).toBe(100);
    });
  });
});
