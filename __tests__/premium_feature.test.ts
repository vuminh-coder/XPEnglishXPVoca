import { describe, it, expect } from "vitest";
import { PLANS, SUCCESS_STORIES, FAQS } from "../features/premium/constants";

describe("Premium Feature & Subscription Logic", () => {
  describe("PLANS Data Integrity & Pricing", () => {
    it("should contain all three core subscription plans: yearly, monthly, lifetime", () => {
      expect(PLANS).toHaveProperty("yearly");
      expect(PLANS).toHaveProperty("monthly");
      expect(PLANS).toHaveProperty("lifetime");
    });

    it("should have correct prices and savings for the yearly plan", () => {
      const yearly = PLANS.yearly;
      expect(yearly.totalPriceNum).toBe(828000);
      expect(yearly.pricePerMonthNum).toBe(69000);
      expect(yearly.gifts.length).toBeGreaterThanOrEqual(3);
      expect(yearly.keyHighlights.length).toBeGreaterThanOrEqual(5);
    });

    it("should provide flexible month-to-month access on monthly plan", () => {
      const monthly = PLANS.monthly;
      expect(monthly.totalPriceNum).toBe(99000);
      expect(monthly.pricePerMonthNum).toBe(99000);
      expect(monthly.badgeType).toBe("flex");
    });

    it("should offer lifetime benefits and golden crown gift on lifetime plan", () => {
      const lifetime = PLANS.lifetime;
      expect(lifetime.totalPriceNum).toBe(1490000);
      expect(lifetime.badgeType).toBe("vip");
      expect(lifetime.gifts.some((g) => g.text.includes("Vương Miện Vàng"))).toBe(true);
    });
  });

  describe("Exam Score Simulator Calculations", () => {
    it("should correctly estimate TOEIC score improvement capped at 990", () => {
      const calculateToeic = (score: number) => Math.min(990, score + 260);

      expect(calculateToeic(600)).toBe(860);
      expect(calculateToeic(700)).toBe(960);
      expect(calculateToeic(800)).toBe(990); // Capped at max 990
      expect(calculateToeic(950)).toBe(990);
    });

    it("should correctly estimate IELTS score improvement capped at 9.0", () => {
      const calculateIelts = (score: number) => Math.min(9.0, Number((score + 1.5).toFixed(1)));

      expect(calculateIelts(5.5)).toBe(7.0);
      expect(calculateIelts(6.5)).toBe(8.0);
      expect(calculateIelts(8.0)).toBe(9.0); // Capped at max 9.0
      expect(calculateIelts(8.5)).toBe(9.0);
    });
  });

  describe("Testimonials & FAQs Content", () => {
    it("should have at least 3 success stories with ratings and quotes", () => {
      expect(SUCCESS_STORIES.length).toBeGreaterThanOrEqual(3);
      SUCCESS_STORIES.forEach((story) => {
        expect(story.name).toBeTruthy();
        expect(story.role).toBeTruthy();
        expect(story.badge).toBeTruthy();
        expect(story.initials).toBeTruthy();
        expect(story.quote).toBeTruthy();
      });
    });

    it("should include 100% 7-day refund guarantee policy in FAQs", () => {
      const refundFaq = FAQS.find((f) => f.q.includes("hoàn tiền 100%"));
      expect(refundFaq).toBeDefined();
      expect(refundFaq?.a).toContain("7 ngày đầu tiên");
    });

    it("should include VietQR automatic payment information in FAQs", () => {
      const qrFaq = FAQS.find((f) => f.q.includes("VietQR"));
      expect(qrFaq).toBeDefined();
      expect(qrFaq?.a).toContain("VietQR Napas 24/7");
    });
  });
});
