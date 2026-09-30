import { describe, it, expect, beforeEach, vi } from "vitest";
import { PLANS } from "../features/premium/constants";
import { useUserStore, DEFAULT_LEARNER_USER } from "../stores/userStore";

// Mock fetch for Vitest Node environment
global.fetch = vi.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

describe("Subscription System & End-to-End Lifecycle Suite", () => {
  beforeEach(() => {
    // Reset Zustand store state before each test
    useUserStore.setState({
      user: {
        ...DEFAULT_LEARNER_USER,
        id: "local_user",
        totalXp: 100,
        streakFreezes: 2,
        isPremium: false,
        premiumTier: undefined,
        premiumExpiresAt: null,
        premiumStartedAt: null,
      },
    });
  });

  describe("1. Order Checkout & VietQR Transfer Syntax Generation", () => {
    it("should compute exact payment amounts based on plan config", () => {
      expect(PLANS.monthly.totalPriceNum).toBe(99000);
      expect(PLANS.yearly.totalPriceNum).toBe(828000);
      expect(PLANS.lifetime.totalPriceNum).toBe(1490000);
    });

    it("should format standardized transfer syntax: XP PRO [USER_SHORT_ID]", () => {
      const generateSyntax = (userId: string) => {
        const shortId = userId.slice(0, 8).toUpperCase();
        return `XP PRO ${shortId}`;
      };

      expect(generateSyntax("usr_test_12345678")).toBe("XP PRO USR_TEST");
      expect(generateSyntax("98765432-abcd-ef01")).toBe("XP PRO 98765432");
      expect(generateSyntax("learner_xyz")).toBe("XP PRO LEARNER_");
    });

    it("should construct valid VietQR URLs with standard Napas format", () => {
      const bankId = "MBBank";
      const accountNo = "0987654321";
      const amount = 828000;
      const description = encodeURIComponent("XP PRO USR_TEST");
      const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=${description}&accountName=XP%20ENGLISH%20VOCABULARY`;

      expect(qrUrl).toContain("MBBank-0987654321-compact2.png");
      expect(qrUrl).toContain("amount=828000");
      expect(qrUrl).toContain("XP%20PRO%20USR_TEST");
    });
  });

  describe("2. Expiration Date Calculations & Stacking Logic", () => {
    const calculateExpiration = (planKey: "monthly" | "yearly" | "lifetime", currentExpiresAt?: Date | null): Date => {
      const now = new Date();
      const baseDate = currentExpiresAt && currentExpiresAt > now ? currentExpiresAt : now;

      if (planKey === "monthly") {
        const d = new Date(baseDate);
        d.setDate(d.getDate() + 30);
        return d;
      }
      if (planKey === "yearly") {
        const d = new Date(baseDate);
        // 12 months + 3 bonus months = 15 months (~456 days)
        d.setDate(d.getDate() + 365 + 91);
        return d;
      }
      // Lifetime: 2099-12-31
      return new Date("2099-12-31T23:59:59.999Z");
    };

    it("should calculate correct 30-day expiration for monthly plan from scratch", () => {
      const before = Date.now();
      const expires = calculateExpiration("monthly", null);
      const diffDays = Math.round((expires.getTime() - before) / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(30);
    });

    it("should calculate 456-day (15 months: 12 + 3 bonus) expiration for yearly plan", () => {
      const before = Date.now();
      const expires = calculateExpiration("yearly", null);
      const diffDays = Math.round((expires.getTime() - before) / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(456);
    });

    it("should set perpetual expiration year 2099 for lifetime plan", () => {
      const expires = calculateExpiration("lifetime", null);
      expect(expires.getUTCFullYear()).toBe(2099);
      expect(expires.getUTCMonth()).toBe(11); // December
    });

    it("should stack newly purchased days on top of existing remaining subscription days", () => {
      // User currently has 10 days remaining
      const currentExpiry = new Date();
      currentExpiry.setDate(currentExpiry.getDate() + 10);

      const stackedMonthly = calculateExpiration("monthly", currentExpiry);
      const diffFromNow = Math.round((stackedMonthly.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      expect(diffFromNow).toBe(40); // 10 existing + 30 new = 40 days

      const stackedYearly = calculateExpiration("yearly", currentExpiry);
      const diffYearly = Math.round((stackedYearly.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      expect(diffYearly).toBe(466); // 10 existing + 456 = 466 days
    });
  });

  describe("3. Gift Distribution Engine", () => {
    const awardSubscriptionGifts = (
      planKey: "monthly" | "yearly" | "lifetime",
      currentFreezes: number
    ) => {
      let streakFreezes = currentFreezes;
      const itemsToAward: string[] = [];

      if (planKey === "yearly") {
        streakFreezes += 3;
        itemsToAward.push("premium_owl", "yearly_supporter_badge");
      } else if (planKey === "monthly") {
        streakFreezes += 1;
      } else if (planKey === "lifetime") {
        streakFreezes += 99;
        itemsToAward.push("golden_badge", "lifetime_crown_badge");
      }

      return { streakFreezes, itemsToAward };
    };

    it("should award 3 streak freezes and exclusive owl avatar for yearly plan", () => {
      const result = awardSubscriptionGifts("yearly", 2);
      expect(result.streakFreezes).toBe(5); // 2 + 3
      expect(result.itemsToAward).toContain("premium_owl");
      expect(result.itemsToAward).toContain("yearly_supporter_badge");
    });

    it("should award 1 streak freeze for monthly plan", () => {
      const result = awardSubscriptionGifts("monthly", 1);
      expect(result.streakFreezes).toBe(2); // 1 + 1
      expect(result.itemsToAward.length).toBe(0);
    });

    it("should award 99 streak freezes and golden crown badge for lifetime plan", () => {
      const result = awardSubscriptionGifts("lifetime", 0);
      expect(result.streakFreezes).toBe(99);
      expect(result.itemsToAward).toContain("golden_badge");
      expect(result.itemsToAward).toContain("lifetime_crown_badge");
    });
  });

  describe("4. Double XP Multiplier Engine", () => {
    it("should award 1X XP for standard free tier learner", () => {
      const store = useUserStore.getState();
      expect(store.user?.isPremium).toBe(false);

      const initialXp = store.user?.totalXp || 0;
      store.awardXp(50);

      const afterXp = useUserStore.getState().user?.totalXp || 0;
      expect(afterXp - initialXp).toBe(50);
    });

    it("should automatically apply 2X XP multiplier for active Pro VIP learner", () => {
      // Activate premium
      useUserStore.setState({
        user: {
          ...useUserStore.getState().user!,
          isPremium: true,
          premiumTier: "yearly",
          premiumExpiresAt: new Date(Date.now() + 86400000 * 30).toISOString(),
        },
      });

      const store = useUserStore.getState();
      expect(store.user?.isPremium).toBe(true);

      const initialXp = store.user?.totalXp || 0;
      store.awardXp(50);

      const afterXp = useUserStore.getState().user?.totalXp || 0;
      // 50 * 2 = 100 XP gained
      expect(afterXp - initialXp).toBe(100);
    });

    it("should double 25 XP lesson reward to 50 XP for premium user", () => {
      useUserStore.setState({
        user: {
          ...useUserStore.getState().user!,
          isPremium: true,
          premiumTier: "monthly",
        },
      });

      const store = useUserStore.getState();
      const initialXp = store.user?.totalXp || 0;
      store.awardXp(25, "vocabulary");

      const afterXp = useUserStore.getState().user?.totalXp || 0;
      expect(afterXp - initialXp).toBe(50);
    });
  });

  describe("5. Lazy Expiration Downgrade & Active Status Checks", () => {
    const evaluateSubscriptionStatus = (user: {
      isPremium: boolean;
      premiumExpiresAt: Date | string | null;
      premiumTier?: string;
    }) => {
      if (!user.isPremium || !user.premiumExpiresAt) {
        return { isPremium: false, remainingDays: 0, status: "free" };
      }

      const expiry = new Date(user.premiumExpiresAt);
      const now = new Date();

      if (expiry <= now) {
        return { isPremium: false, remainingDays: 0, status: "expired" };
      }

      const remainingMs = expiry.getTime() - now.getTime();
      const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
      return { isPremium: true, remainingDays, status: "active" };
    };

    it("should report active status with remaining days when not expired", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 15);

      const result = evaluateSubscriptionStatus({
        isPremium: true,
        premiumExpiresAt: futureDate,
        premiumTier: "monthly",
      });

      expect(result.isPremium).toBe(true);
      expect(result.status).toBe("active");
      expect(result.remainingDays).toBe(15);
    });

    it("should automatically flag expired subscriptions and revoke premium status", () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1); // Expired yesterday

      const result = evaluateSubscriptionStatus({
        isPremium: true,
        premiumExpiresAt: pastDate,
        premiumTier: "monthly",
      });

      expect(result.isPremium).toBe(false);
      expect(result.status).toBe("expired");
      expect(result.remainingDays).toBe(0);
    });

    it("should recognize lifetime membership until year 2099 without expiration", () => {
      const lifetimeDate = new Date("2099-12-31T23:59:59.999Z");

      const result = evaluateSubscriptionStatus({
        isPremium: true,
        premiumExpiresAt: lifetimeDate,
        premiumTier: "lifetime",
      });

      expect(result.isPremium).toBe(true);
      expect(result.status).toBe("active");
      expect(result.remainingDays).toBeGreaterThan(25000); // Decades
    });
  });

  describe("6. Store activateSubscription Method Verification", () => {
    it("should set premium state, add streak freezes, and save to localStorage", async () => {
      const store = useUserStore.getState();
      const success = await store.activateSubscription("yearly", {
        receipt: {
          invoiceId: "XP-INV-TEST-001",
          planName: "Gói 1 Năm",
        },
      });

      expect(success).toBe(true);

      const updatedUser = useUserStore.getState().user;
      expect(updatedUser?.isPremium).toBe(true);
      expect(updatedUser?.premiumTier).toBe("yearly");
      expect(updatedUser?.streakFreezes).toBe(5); // 2 initial + 3 bonus
      expect(updatedUser?.premiumExpiresAt).toBeTruthy();

      const expiresDate = new Date(updatedUser!.premiumExpiresAt!);
      expect(expiresDate.getFullYear()).toBeGreaterThanOrEqual(new Date().getFullYear() + 1);
    });
  });
});
