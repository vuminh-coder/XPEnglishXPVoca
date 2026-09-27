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
    purchaseLog: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      updateMany: vi.fn(),
    },
  },
}));

vi.mock("@/infrastructure/cache/dashboardCache", () => ({
  invalidateDashboardCache: vi.fn(),
}));

import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { GET as getInventory } from "@/app/api/shop/inventory/route";
import { POST as purchaseItem } from "@/app/api/shop/purchase/route";
import { POST as equipItem } from "@/app/api/shop/equip/route";

describe("XP Shop & Inventory Standards (/api/shop/*)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/shop/inventory", () => {
    it("1. Rejects unauthenticated requests with 401", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue(null);

      const req = new Request("http://localhost:3000/api/shop/inventory");
      const res = await getInventory(req);

      expect(res.status).toBe(401);
    });

    it("2. Returns profile items with bounded and ordered purchase logs", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_shop_1");
      vi.mocked(prisma.profile.findUnique).mockResolvedValue({
        coins: 500,
        streakFreezes: 2,
        activeAvatarFrame: "frame_gold",
        activeChatBubble: null,
      } as any);

      vi.mocked(prisma.purchaseLog.findMany).mockResolvedValue([
        {
          itemId: "frame_gold",
          cost: 150,
          purchasedAt: new Date("2026-09-20"),
          isEquipped: true,
        },
      ] as any);

      const req = new Request("http://localhost:3000/api/shop/inventory");
      const res = await getInventory(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.coins).toBe(500);
      expect(json.streakFreezes).toBe(2);
      expect(json.purchaseLogs).toHaveLength(1);

      expect(prisma.purchaseLog.findMany).toHaveBeenCalledWith({
        where: { userId: "user_shop_1" },
        take: 100,
        orderBy: { purchasedAt: "desc" },
        select: {
          itemId: true,
          cost: true,
          purchasedAt: true,
          isEquipped: true,
        },
      });
    });
  });

  describe("POST /api/shop/purchase", () => {
    it("3. Rejects purchase when user has insufficient coins", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_poor");

      const mockTx = {
        profile: {
          findUnique: vi.fn().mockResolvedValue({ coins: 30, streakFreezes: 0 }),
        },
      };

      vi.mocked(prisma.$transaction).mockImplementation(async (cb: any) => {
        return await cb(mockTx);
      });

      const req = new Request("http://localhost:3000/api/shop/purchase", {
        method: "POST",
        body: JSON.stringify({ itemId: "streak_freeze" }), // costs 50
      });

      const res = await purchaseItem(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Insufficient coins");
      expect(invalidateDashboardCache).not.toHaveBeenCalled();
    });

    it("4. Atomically purchases item, updates streak freeze, logs purchase, and invalidates cache", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_rich");

      const mockTx = {
        profile: {
          findUnique: vi.fn().mockResolvedValue({ coins: 200, streakFreezes: 1 }),
          update: vi.fn().mockResolvedValue({ coins: 150, streakFreezes: 2 }),
        },
        purchaseLog: {
          create: vi.fn().mockResolvedValue({ id: "log_1", itemId: "streak_freeze" }),
        },
      };

      vi.mocked(prisma.$transaction).mockImplementation(async (cb: any) => {
        return await cb(mockTx);
      });

      const req = new Request("http://localhost:3000/api/shop/purchase", {
        method: "POST",
        body: JSON.stringify({ itemId: "streak_freeze" }),
      });

      const res = await purchaseItem(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.coins).toBe(150);
      expect(json.streakFreezes).toBe(2);

      expect(mockTx.profile.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "user_rich" },
          data: expect.objectContaining({
            coins: { decrement: 50 },
            streakFreezes: { increment: 1 },
          }),
          select: { coins: true, streakFreezes: true },
        })
      );
      expect(invalidateDashboardCache).toHaveBeenCalledWith("user_rich");
    });
  });

  describe("POST /api/shop/equip", () => {
    it("5. Rejects equipping an unpurchased item", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_equip");
      vi.mocked(prisma.purchaseLog.findFirst).mockResolvedValue(null);

      const req = new Request("http://localhost:3000/api/shop/equip", {
        method: "POST",
        body: JSON.stringify({ itemId: "frame_emerald", equip: true }),
      });

      const res = await equipItem(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Item not purchased");
    });

    it("6. Equips purchased frame, resets others of same type, and invalidates cache", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_equip");
      vi.mocked(prisma.purchaseLog.findFirst).mockResolvedValue({ id: "log_purchased" } as any);
      vi.mocked(prisma.$transaction).mockResolvedValue([] as any);

      const req = new Request("http://localhost:3000/api/shop/equip", {
        method: "POST",
        body: JSON.stringify({ itemId: "frame_emerald", equip: true }),
      });

      const res = await equipItem(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.equipped).toBe(true);
      expect(prisma.$transaction).toHaveBeenCalled();
      expect(invalidateDashboardCache).toHaveBeenCalledWith("user_equip");
    });
  });
});
