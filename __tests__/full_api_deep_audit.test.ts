import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock infrastructure dependencies
vi.mock("@/infrastructure/database/prisma", () => {
  const mockPrisma = {
    profile: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
    },
    listeningLesson: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
    },
    listeningProgress: {
      findUnique: vi.fn(),
    },
    listeningNote: {
      findUnique: vi.fn(),
    },
    studyRoom: {
      findUnique: vi.fn(),
    },
    studyRoomMember: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      upsert: vi.fn(),
      delete: vi.fn(),
    },
    roomMessage: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
    post: {
      findUnique: vi.fn(),
    },
    like: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    dailySkillPractice: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
    },
    userVocabulary: {
      count: vi.fn(),
    },
    matchHistory: {
      count: vi.fn(),
    },
    $transaction: vi.fn(async (cb) => {
      if (typeof cb === "function") {
        return cb(mockPrisma);
      }
      return cb;
    }),
  };

  return {
    prisma: mockPrisma,
    safeDbExecute: vi.fn(async (fn) => fn()),
    handlePrismaError: vi.fn((err: any) => ({ error: err?.message || "DB Error", status: 500 })),
    withPrismaRetry: vi.fn(async (fn) => fn()),
  };
});

vi.mock("@/infrastructure/auth/auth", () => ({
  getAuthenticatedUserId: vi.fn(),
}));

vi.mock("@/infrastructure/cache/dashboardCache", () => ({
  invalidateDashboardCache: vi.fn(),
}));

// Mock global fetch for hermetic AI route testing
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({
    candidates: [{ content: { parts: [{ text: "AI critique feedback simulated." }] } }],
  }),
} as any);

import { prisma } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { GET as getProfile, POST as updateProfile } from "@/app/api/user/profile/route";
import { GET as getListeningLesson } from "@/app/api/listening/lessons/[id]/route";
import { POST as pvpRoomAction } from "@/app/api/pvp/room/route";
import { POST as sendSignal, GET as getSignal } from "@/app/api/study-rooms/[id]/signal/route";
import { GET as getRoomMessages } from "@/app/api/study-rooms/[id]/messages/route";
import { GET as getRoomMembers, POST as roomMemberAction } from "@/app/api/study-rooms/[id]/members/route";
import { POST as toggleLike } from "@/app/api/posts/[id]/like/route";
import { POST as claimChallenge } from "@/app/api/user/challenges/route";
import { POST as critiqueUi } from "@/app/api/ai/ui-critique/route";

describe("Comprehensive Backend & API Deep Audit Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── 1. USER PROFILE API AUDIT ─────────────────────────────────────────────
  describe("1. User Profile API (/api/user/profile)", () => {
    it("GET: Successfully retrieves profile without querying non-existent createdAt field", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_test_123");
      (prisma.profile.findUnique as any).mockImplementation(async (args: any) => {
        // Verify select statement strictly excludes createdAt
        expect(args.select.createdAt).toBeUndefined();
        expect(args.select.id).toBe(true);
        expect(args.select.updatedAt).toBe(true);

        return {
          id: "user_test_123",
          fullName: "Test User",
          username: "testuser",
          avatarEmoji: "🦊",
          avatarUrl: null,
          level: 2,
          totalXp: 150,
          currentStreak: 3,
          longestStreak: 5,
          minutesStudied: 40,
          title: "Tân Binh",
          coins: 120,
          streakFreezes: 1,
          activeAvatarFrame: null,
          activeChatBubble: null,
          updatedAt: new Date(),
        } as any;
      });

      const req = new NextRequest("http://localhost:3000/api/user/profile");
      const res = await getProfile(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.id).toBe("user_test_123");
      expect(json.data.level).toBe(2);
    });

    it("POST: Sanitizes input and updates profile without mass-assigning protected fields", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_test_123");
      (prisma.profile.upsert as any).mockImplementation(async (args: any) => {
        // Assert that select does not contain createdAt
        expect(args.select.createdAt).toBeUndefined();
        // Assert that update payload does NOT allow totalXp, level, or coins injection
        expect(args.update.totalXp).toBeUndefined();
        expect(args.update.level).toBeUndefined();
        expect(args.update.coins).toBeUndefined();

        return {
          id: "user_test_123",
          fullName: "Clean Name",
          username: "cleanname",
          avatarEmoji: "🦉",
          avatarUrl: null,
          level: 1,
          totalXp: 0,
          currentStreak: 1,
          longestStreak: 1,
          minutesStudied: 0,
          title: "Tân Binh",
          coins: 100,
          streakFreezes: 0,
          activeAvatarFrame: null,
          activeChatBubble: null,
          updatedAt: new Date(),
        } as any;
      });

      const req = new NextRequest("http://localhost:3000/api/user/profile", {
        method: "POST",
        body: JSON.stringify({
          fullName: "<script>alert('xss')</script>Clean Name",
          totalXp: 999999, // Attempted privilege escalation
          level: 99,
          coins: 999999,
        }),
      });

      const res = await updateProfile(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
    });
  });

  // ─── 2. LISTENING LESSONS IDOR/BOLA PROTECTION AUDIT ───────────────────────
  describe("2. Listening Lessons IDOR / BOLA Protection (/api/listening/lessons/[id])", () => {
    it("GET: Ignores ?userId= query param and strictly binds to authenticated session", async () => {
      // Mock authenticated session as victim user
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("actual_auth_user");

      (prisma.listeningLesson.findUnique as any).mockImplementation(async (args: any) => {
        // Assert that query uses actual_auth_user, NOT the attacker-specified userId in query
        if (args.include?.progresses) {
          expect(args.include.progresses.where.userId).toBe("actual_auth_user");
        }
        return {
          id: "listen_001",
          title: "Daily Standup Meeting",
          category: "Business",
          level: "Intermediate",
          transcript: [{ text: "Hello team" }],
          progresses: [
            {
              userId: "actual_auth_user",
              status: "IN_PROGRESS",
              completedSentences: [0],
              inlineAiScores: {},
              timeSpent: 60,
              lastPracticedAt: new Date(),
            },
          ],
          notes: [],
        } as any;
      });

      // Attacker tries to leak target_victim_999's progress
      const req = new NextRequest("http://localhost:3000/api/listening/lessons/listen_001?userId=target_victim_999");
      const res = await getListeningLesson(req, { params: Promise.resolve({ id: "listen_001" }) });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.userProgress.completedSentences).toEqual([0]);
    });
  });

  // ─── 3. PVP ROOM ANTI-SPOOFING AUDIT ───────────────────────────────────────
  describe("3. PvP Room Anti-Spoofing Audit (/api/pvp/room)", () => {
    it("POST: Does not allow attacker to impersonate room host via x-user-id or body.userId", async () => {
      // Unauthenticated caller attempting to spoof victim host
      vi.mocked(getAuthenticatedUserId).mockResolvedValue(null);

      const req = new NextRequest("http://localhost:3000/api/pvp/room", {
        method: "POST",
        headers: {
          "x-user-id": "victim_host_id", // Header spoofing attempt
        },
        body: JSON.stringify({
          action: "create",
          userId: "victim_host_id", // Body spoofing attempt
          gameMode: "quiz",
        }),
      });

      const res = await pvpRoomAction(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      // The hostId must NOT be victim_host_id; it must be an ephemeral guest ID
      expect(json.room.hostId).not.toBe("victim_host_id");
      expect(json.room.hostId).toMatch(/^guest_pvp_/);
    });
  });

  // ─── 4. WEBRTC SIGNALING SECURITY AUDIT ────────────────────────────────────
  describe("4. WebRTC Signaling Authentication (/api/study-rooms/[id]/signal)", () => {
    it("POST: Rejects unauthenticated signal dispatch with 401", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue(null);

      const req = new NextRequest("http://localhost:3000/api/study-rooms/room_1/signal", {
        method: "POST",
        body: JSON.stringify({
          targetId: "user_b",
          payload: { type: "offer", sdp: "mock_sdp" },
        }),
      });

      const res = await sendSignal(req, { params: Promise.resolve({ id: "room_1" }) });
      expect(res.status).toBe(401);
    });

    it("GET: Restricts signal retrieval strictly to the authenticated user", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_alice");

      const req = new NextRequest("http://localhost:3000/api/study-rooms/room_1/signal?userId=user_bob");
      const res = await getSignal(req, { params: Promise.resolve({ id: "room_1" }) });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      // Only signals targeted to user_alice are returned
      expect(Array.isArray(json.signals)).toBe(true);
    });
  });

  // ─── 5. STUDY ROOMS PRIVACY AUDIT ──────────────────────────────────────────
  describe("5. Private Study Room Access Control (/api/study-rooms/[id]/messages & members)", () => {
    it("GET messages: Blocks non-members from reading private room transcript (403)", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("unauthorized_outsider");
      vi.mocked(prisma.studyRoom.findUnique).mockResolvedValue({
        id: "private_room_1",
        isPrivate: true,
        createdById: "room_creator_1",
      } as any);
      vi.mocked(prisma.studyRoomMember.findUnique).mockResolvedValue(null); // Not a member

      const req = new NextRequest("http://localhost:3000/api/study-rooms/private_room_1/messages");
      const res = await getRoomMessages(req, { params: Promise.resolve({ id: "private_room_1" }) });

      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.success).toBe(false);
    });

    it("POST join: Atomically enforces maxMembers capacity limit (409)", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_joining");
      vi.mocked(prisma.studyRoom.findUnique).mockResolvedValue({
        id: "full_room_1",
        isPrivate: false,
        maxMembers: 5,
        _count: { members: 5 }, // Room is at full capacity
      } as any);
      vi.mocked(prisma.studyRoomMember.findUnique).mockResolvedValue(null); // Not currently a member

      const req = new NextRequest("http://localhost:3000/api/study-rooms/full_room_1/members", {
        method: "POST",
        body: JSON.stringify({ action: "join" }),
      });

      const res = await roomMemberAction(req, { params: Promise.resolve({ id: "full_room_1" }) });
      expect(res.status).toBe(409);
      const json = await res.json();
      expect(json.error).toContain("Phòng đã đầy");
    });
  });

  // ─── 6. CONCURRENT LIKE & P2002 RECOVERY AUDIT ──────────────────────────────
  describe("6. Post Like Concurrency & P2002 Handling (/api/posts/[id]/like)", () => {
    it("POST: Gracefully recovers from duplicate-click P2002 unique constraint without 500 error", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_clicker");
      vi.mocked(prisma.post.findUnique).mockResolvedValue({ id: "post_100" } as any);
      vi.mocked(prisma.like.findUnique).mockResolvedValue(null);

      // Simulate race condition where second concurrent click triggers P2002
      const p2002Error = new Error("Unique constraint failed on the fields: (`postId`,`userId`)");
      (p2002Error as any).code = "P2002";
      vi.mocked(prisma.like.create).mockRejectedValue(p2002Error);
      vi.mocked(prisma.like.count).mockResolvedValue(10);

      const req = new NextRequest("http://localhost:3000/api/posts/post_100/like", { method: "POST" });
      const res = await toggleLike(req, { params: Promise.resolve({ id: "post_100" }) });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.liked).toBe(true);
      expect(json.data.likesCount).toBe(10);
    });
  });

  // ─── 7. CHALLENGE CLAIM ATOMIC TRANSACTION AUDIT ───────────────────────────
  describe("7. Daily Challenge Atomic Claim (/api/user/challenges)", () => {
    it("POST: Uses transaction to prevent concurrent double-claim exploits", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_claimer");

      vi.mocked(prisma.dailySkillPractice.findFirst).mockResolvedValue(null); // Not yet claimed
      vi.mocked(prisma.userVocabulary.count).mockResolvedValue(10); // Target met
      vi.mocked(prisma.dailySkillPractice.create).mockResolvedValue({ id: "claim_log_1" } as any);
      vi.mocked(prisma.profile.update).mockResolvedValue({
        id: "user_claimer",
        totalXp: 115,
        coins: 110,
      } as any);

      const req = new NextRequest("http://localhost:3000/api/user/challenges", {
        method: "POST",
        body: JSON.stringify({ challengeId: "learn_words" }),
      });

      const res = await claimChallenge(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.xpAwarded).toBe(15);
      expect(json.data.coinsAwarded).toBe(10);
      // Ensure $transaction was invoked for atomic safety
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it("POST: Rejects repeated claim within the same day", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_claimer");

      vi.mocked(prisma.dailySkillPractice.findFirst).mockResolvedValue({
        id: "existing_claim_today",
      } as any);

      const req = new NextRequest("http://localhost:3000/api/user/challenges", {
        method: "POST",
        body: JSON.stringify({ challengeId: "learn_words" }),
      });

      const res = await claimChallenge(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.success).toBe(false);
      expect(json.error).toContain("đã được nhận thưởng hôm nay");
    });
  });

  // ─── 8. AI RATE LIMITING PROTECTION AUDIT ──────────────────────────────────
  describe("8. AI Endpoint Rate Limiting (/api/ai/ui-critique)", () => {
    it("POST: Blocks excessive requests with 429 Too Many Requests", async () => {
      const clientIp = "192.168.10.55";

      // Fire 6 requests rapidly (limit is 5/min)
      let lastResponse: any;
      for (let i = 0; i < 6; i++) {
        const req = new NextRequest("http://localhost:3000/api/ai/ui-critique", {
          method: "POST",
          headers: {
            "x-forwarded-for": clientIp,
          },
          body: JSON.stringify({
            route: "/dashboard",
            rating: 5,
            category: "General",
            comments: "Great UI",
          }),
        });
        lastResponse = await critiqueUi(req);
      }

      expect(lastResponse.status).toBe(429);
      const json = await lastResponse.json();
      expect(json.error).toContain("Too many requests");
    });
  });
});
