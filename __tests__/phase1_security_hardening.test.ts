import crypto from "crypto";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";

const { mockPrisma, mockAuth } = vi.hoisted(() => ({
  mockPrisma: {
    profile: {
      findUnique: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
    },
    purchaseLog: {
      findFirst: vi.fn(),
    },
    subscriptionOrder: {
      findFirst: vi.fn(),
      create: vi.fn(),
      updateMany: vi.fn(),
    },
    userAchievement: {
      upsert: vi.fn(),
    },
    $transaction: vi.fn(),
  },
  mockAuth: {
    userId: null as string | null,
    adminAuthorized: false,
  },
}));

vi.mock("@/infrastructure/database/prisma", () => ({
  prisma: mockPrisma,
  handlePrismaError: (e: unknown) => ({ error: String(e), status: 500 }),
  safeDbExecute: async <T>(fn: () => Promise<T>) => await fn(),
}));

vi.mock("@/infrastructure/auth/auth", async () => {
  const actual = await vi.importActual<typeof import("@/infrastructure/auth/auth")>(
    "@/infrastructure/auth/auth"
  );
  return {
    ...actual,
    getAuthenticatedUserId: async () => mockAuth.userId,
    requireAdminUser: async () =>
      mockAuth.adminAuthorized
        ? { authorized: true, userId: mockAuth.userId || "admin_1" }
        : {
            authorized: false,
            response: new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 }),
          },
  };
});

import { POST as postSubscriptionConfirm } from "@/app/api/subscription/confirm/route";
import { POST as postSubscriptionWebhook } from "@/app/api/subscription/webhook/route";
import { PATCH as patchUserProfile } from "@/app/api/user/profile/route";
import { POST as postExamAttempt } from "@/app/api/exams/attempts/route";
import { POST as postPvpSubmit } from "@/app/api/pvp/match-submit/route";
import { POST as postAiGrammar } from "@/app/api/ai/grammar/route";
import { POST as postSubtitleDownload } from "@/app/api/youtube/subtitles/download/route";
import { GET as getAdminOverview } from "@/app/api/admin/overview/route";
import { hashRoomPasscode, verifyRoomPasscode } from "@/infrastructure/security/roomPasscode";
import { hashPassword, comparePassword, needsPasswordRehash } from "@/infrastructure/auth/password";

describe("Phase 1 Security Hardening Regression Suite (BUG-01..BUG-05)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.userId = null;
    mockAuth.adminAuthorized = false;
  });

  describe("BUG-01: Subscription Confirmation & Server-Authoritative Integrity", () => {
    it("blocks unprivileged learners from self-activating VIP on POST /api/subscription/confirm (403)", async () => {
      mockAuth.userId = "learner_self_vip";
      mockAuth.adminAuthorized = false;
      mockPrisma.subscriptionOrder.findFirst.mockResolvedValueOnce({
        id: "ord_pending_1",
        transferSyntax: "XP PRO LEARNER",
        status: "pending",
        amount: 399000,
      });

      const req = new NextRequest("http://localhost:3000/api/subscription/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey: "yearly" }),
      });

      const res = await postSubscriptionConfirm(req);
      const json = await res.json();

      expect(res.status).toBe(403);
      expect(json.pendingVerification).toBe(true);
      expect(mockPrisma.profile.update).not.toHaveBeenCalled();
    });

    it("rejects invalid webhook signatures with 401 on POST /api/subscription/webhook", async () => {
      process.env.PAYMENT_WEBHOOK_SECRET = "test_webhook_secret_12345";
      const req = new NextRequest("http://localhost:3000/api/subscription/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-webhook-secret": "wrong_secret",
        },
        body: JSON.stringify({ content: "XP PRO ABC123", amount: 399000 }),
      });

      const res = await postSubscriptionWebhook(req);
      expect(res.status).toBe(401);
    });

    it("rejects unowned avatar frame & chat bubble updates on PATCH /api/user/profile with 403", async () => {
      mockAuth.userId = "learner_1";
      mockPrisma.purchaseLog.findFirst.mockResolvedValueOnce(null);

      const req = new Request("http://localhost:3000/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeAvatarFrame: "diamond_vip_frame" }),
      });

      const res = await patchUserProfile(req);
      expect(res.status).toBe(403);
      expect(mockPrisma.profile.upsert).not.toHaveBeenCalled();
    });

    it("rejects unknown unlisted examId instead of trusting client scaledScore (404)", async () => {
      mockAuth.userId = "learner_1";
      const req = new Request("http://localhost:3000/api/exams/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: "non_existent_custom_exam",
          scaledScore: 990,
          accuracyPercent: 100,
        }),
      });

      const res = await postExamAttempt(req);
      expect(res.status).toBe(404);
      expect(mockPrisma.$transaction).not.toHaveBeenCalled();
    });

    it("rejects PvP submission whose result contradicts userScore vs oppScore (400)", async () => {
      mockAuth.userId = "learner_1";
      const req = new Request("http://localhost:3000/api/pvp/match-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opponent: "Bot",
          userScore: 1,
          oppScore: 9,
          result: "WIN",
        }),
      });

      const res = await postPvpSubmit(req);
      expect(res.status).toBe(400);
      expect(mockPrisma.$transaction).not.toHaveBeenCalled();
    });
  });

  describe("BUG-02: AI Endpoints Auth Gate", () => {
    it("requires authentication on POST /api/ai/grammar (401)", async () => {
      mockAuth.userId = null;
      const req = new NextRequest("http://localhost:3000/api/ai/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: "present_simple", mode: "lesson" }),
      });

      const res = await postAiGrammar(req);
      expect(res.status).toBe(401);
    });
  });

  describe("BUG-03: YouTube Subtitle SSRF Allowlist", () => {
    it("blocks internal SSRF URLs and invalid video IDs on POST /api/youtube/subtitles/download", async () => {
      const ssrfReq = new NextRequest("http://localhost:3000/api/youtube/subtitles/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: "dQw4w9WgXcQ",
          trackBaseUrl: "http://169.254.169.254/latest/meta-data/",
        }),
      });

      const ssrfRes = await postSubtitleDownload(ssrfReq);
      expect(ssrfRes.status).toBe(400);

      const badVideoReq = new NextRequest("http://localhost:3000/api/youtube/subtitles/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: "../etc/passwd",
          trackBaseUrl: "https://www.youtube.com/api/timedtext?v=dQw4w9WgXcQ&lang=en",
        }),
      });

      const badVideoRes = await postSubtitleDownload(badVideoReq);
      expect(badVideoRes.status).toBe(400);
    });
  });

  describe("BUG-04 & BUG-05: Study Room Passcode Hashing, Password PBKDF2v2, and Admin RBAC", () => {
    it("hashes study room passcodes <= 50 chars and verifies constant-time", () => {
      const hashed = hashRoomPasscode("secret-room-123");
      expect(hashed.length).toBeLessThanOrEqual(50);
      expect(hashed).toMatch(/^h1:/);
      expect(verifyRoomPasscode("secret-room-123", hashed)).toBe(true);
      expect(verifyRoomPasscode("wrong-pass", hashed)).toBe(false);
    });

    it("flags legacy SHA256 or 10k PBKDF2 hashes for lazy rehash while preserving verification", () => {
      const sha256Legacy = crypto
        .createHash("sha256")
        .update("OldPass123" + (process.env.PASSWORD_SALT_KEY || "xp_voca_salt_2026"))
        .digest("hex");

      expect(comparePassword("OldPass123", sha256Legacy)).toBe(true);
      expect(needsPasswordRehash(sha256Legacy)).toBe(true);

      const v2Hash = hashPassword("NewPass123!");
      expect(needsPasswordRehash(v2Hash)).toBe(false);
    });

    it("denies non-admin callers on GET /api/admin/overview with 403", async () => {
      mockAuth.userId = "normal_user";
      mockAuth.adminAuthorized = false;

      const req = new NextRequest("http://localhost:3000/api/admin/overview");
      const res = await getAdminOverview(req);
      expect(res.status).toBe(403);
    });
  });
});
