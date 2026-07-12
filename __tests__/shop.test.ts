import { describe, it, expect, beforeEach } from "vitest";

// Mocking profile and purchaseLog database states for unit testing transaction logic
interface ProfileState {
  id: string;
  coins: number;
  streakFreezes: number;
  activeAvatarFrame: string | null;
  avatarEmoji: string;
}

interface PurchaseLogState {
  id: string;
  userId: string;
  itemId: string;
  cost: number;
  isEquipped: boolean;
}

const ITEM_COSTS: Record<string, number> = {
  streak_freeze: 50,
  double_xp: 100,
  premium_owl: 250,
};

describe("Item Shop Transaction & Equip Logic", () => {
  let profile: ProfileState;
  let purchaseLogs: PurchaseLogState[];

  beforeEach(() => {
    profile = {
      id: "u123",
      coins: 300,
      streakFreezes: 0,
      activeAvatarFrame: null,
      avatarEmoji: "🦉",
    };
    purchaseLogs = [];
  });

  describe("Purchase Logic", () => {
    it("should allow purchasing a streak freeze if user has enough coins", () => {
      const itemId = "streak_freeze";
      const cost = ITEM_COSTS[itemId];

      expect(profile.coins).toBe(300);
      expect(profile.streakFreezes).toBe(0);

      // Perform transaction simulation
      if (profile.coins >= cost) {
        profile.coins -= cost;
        if (itemId === "streak_freeze") {
          profile.streakFreezes += 1;
        }
        purchaseLogs.push({
          id: "log_1",
          userId: profile.id,
          itemId,
          cost,
          isEquipped: false,
        });
      }

      expect(profile.coins).toBe(250);
      expect(profile.streakFreezes).toBe(1);
      expect(purchaseLogs.length).toBe(1);
      expect(purchaseLogs[0].itemId).toBe("streak_freeze");
    });

    it("should block purchase if user does not have enough coins", () => {
      const itemId = "premium_owl";
      const cost = ITEM_COSTS[itemId]; // 250 coins
      profile.coins = 150; // Insufficient

      let errorOccurred = false;
      if (profile.coins < cost) {
        errorOccurred = true;
      } else {
        profile.coins -= cost;
      }

      expect(errorOccurred).toBe(true);
      expect(profile.coins).toBe(150); // Unchanged
      expect(purchaseLogs.length).toBe(0);
    });

    it("should allow purchasing a premium cosmetic owl outfit", () => {
      const itemId = "premium_owl";
      const cost = ITEM_COSTS[itemId];

      if (profile.coins >= cost) {
        profile.coins -= cost;
        purchaseLogs.push({
          id: "log_2",
          userId: profile.id,
          itemId,
          cost,
          isEquipped: false,
        });
      }

      expect(profile.coins).toBe(50);
      expect(purchaseLogs.length).toBe(1);
      expect(purchaseLogs[0].itemId).toBe("premium_owl");
      expect(purchaseLogs[0].isEquipped).toBe(false);
    });
  });

  describe("Equip Logic", () => {
    it("should equip custom avatar emoji if item is purchased", () => {
      const itemId = "premium_owl";
      // Simulate that the user has already purchased the item
      purchaseLogs.push({
        id: "log_2",
        userId: profile.id,
        itemId,
        cost: 250,
        isEquipped: false,
      });

      // Verify ownership first
      const purchase = purchaseLogs.find(
        (log) => log.userId === profile.id && log.itemId === itemId
      );
      expect(purchase).toBeDefined();

      // Equip item
      if (purchase) {
        profile.avatarEmoji = "🎓";
        purchase.isEquipped = true;
      }

      expect(profile.avatarEmoji).toBe("🎓");
      expect(purchaseLogs[0].isEquipped).toBe(true);
    });

    it("should block equipping if item is not purchased", () => {
      const itemId = "premium_owl";

      // Verify ownership
      const purchase = purchaseLogs.find(
        (log) => log.userId === profile.id && log.itemId === itemId
      );
      expect(purchase).toBeUndefined(); // Not purchased

      let errorOccurred = false;
      if (!purchase) {
        errorOccurred = true;
      } else {
        profile.avatarEmoji = "🎓";
      }

      expect(errorOccurred).toBe(true);
      expect(profile.avatarEmoji).toBe("🦉"); // Unchanged
    });
  });
});
