import { describe, it, expect } from "vitest";
import {
  removeVietnameseTones,
  matchVietnameseSearch,
  matchThemeSearch,
} from "@/features/vocabulary/utils/vietnameseSearchUtils";

describe("Vietnamese Accent-Insensitive & Case-Insensitive Search Engine", () => {
  describe("removeVietnameseTones", () => {
    it("should remove all Vietnamese diacritics / accents properly", () => {
      expect(removeVietnameseTones("Ăn uống")).toBe("an uong");
      expect(removeVietnameseTones("Động vật")).toBe("dong vat");
      expect(removeVietnameseTones("Sức khỏe")).toBe("suc khoe");
      expect(removeVietnameseTones("Nghề nghiệp")).toBe("nghe nghiep");
      expect(removeVietnameseTones("Thời tiết")).toBe("thoi tiet");
      expect(removeVietnameseTones("Gia đình")).toBe("gia dinh");
    });

    it("should handle 'đ' and 'Đ' converting to 'd'", () => {
      expect(removeVietnameseTones("đường phố")).toBe("duong pho");
      expect(removeVietnameseTones("Điểm số")).toBe("diem so");
      expect(removeVietnameseTones("ĐẠI HỌC")).toBe("dai hoc");
    });

    it("should return empty string on falsy input", () => {
      expect(removeVietnameseTones("")).toBe("");
      expect(removeVietnameseTones(undefined as unknown as string)).toBe("");
      expect(removeVietnameseTones(null as unknown as string)).toBe("");
    });
  });

  describe("matchVietnameseSearch", () => {
    it("should match unaccented search query against accented target", () => {
      expect(matchVietnameseSearch("Gia đình", "gia dinh")).toBe(true);
      expect(matchVietnameseSearch("Ăn uống", "an uong")).toBe(true);
      expect(matchVietnameseSearch("Động vật", "dong vat")).toBe(true);
      expect(matchVietnameseSearch("Sức khỏe", "suc khoe")).toBe(true);
      expect(matchVietnameseSearch("Nghề nghiệp", "nghe nghiep")).toBe(true);
    });

    it("should match accented search query against accented target", () => {
      expect(matchVietnameseSearch("Gia đình", "Gia đình")).toBe(true);
      expect(matchVietnameseSearch("Ăn uống", "ăn uống")).toBe(true);
      expect(matchVietnameseSearch("Động vật", "động vật")).toBe(true);
    });

    it("should be case-insensitive (hoa / thường)", () => {
      expect(matchVietnameseSearch("Gia đình", "GIA DINH")).toBe(true);
      expect(matchVietnameseSearch("Ăn uống", "AN UONG")).toBe(true);
      expect(matchVietnameseSearch("Food & Drinks", "FOOD")).toBe(true);
      expect(matchVietnameseSearch("Technology", "technology")).toBe(true);
    });

    it("should match substring / partial words", () => {
      expect(matchVietnameseSearch("Gia đình", "dinh")).toBe(true);
      expect(matchVietnameseSearch("Ăn uống", "uong")).toBe(true);
      expect(matchVietnameseSearch("Food & Drinks", "drink")).toBe(true);
    });

    it("should return false when query does not match", () => {
      expect(matchVietnameseSearch("Gia đình", "xe hoi")).toBe(false);
      expect(matchVietnameseSearch("Ăn uống", "may bay")).toBe(false);
      expect(matchVietnameseSearch("Animals", "kitchen")).toBe(false);
    });

    it("should handle edge cases safely", () => {
      expect(matchVietnameseSearch("Gia đình", "")).toBe(true);
      expect(matchVietnameseSearch("Gia đình", "   ")).toBe(true);
      expect(matchVietnameseSearch("", "gia dinh")).toBe(false);
      expect(matchVietnameseSearch(undefined, "gia dinh")).toBe(false);
      expect(matchVietnameseSearch(null, "gia dinh")).toBe(false);
    });
  });

  describe("matchThemeSearch with Semantic Synonyms", () => {
    const themeIt = { id: "tech_ai", name: "Công nghệ thông tin & AI", nameEn: "Information Technology & AI" };
    const themeFinance = { id: "finance_bank", name: "Tài chính & Ngân hàng", nameEn: "Finance & Banking" };
    const themeHealth = { id: "health_care", name: "Y tế & Sức khỏe", nameEn: "Health & Medicine" };
    const themeFood = { id: "food_drink", name: "Ẩm thực & Nhà hàng", nameEn: "Food & Dining" };

    it("should match direct names and English names", () => {
      expect(matchThemeSearch(themeIt, "công nghệ")).toBe(true);
      expect(matchThemeSearch(themeIt, "Information")).toBe(true);
      expect(matchThemeSearch(themeFinance, "Tài chính")).toBe(true);
    });

    it("should match semantic synonyms like 'it', 'code', 'tien', 'doctor', 'food'", () => {
      expect(matchThemeSearch(themeIt, "it")).toBe(true);
      expect(matchThemeSearch(themeIt, "code")).toBe(true);
      expect(matchThemeSearch(themeFinance, "tien")).toBe(true);
      expect(matchThemeSearch(themeFinance, "money")).toBe(true);
      expect(matchThemeSearch(themeHealth, "bac si")).toBe(true);
      expect(matchThemeSearch(themeHealth, "doctor")).toBe(true);
      expect(matchThemeSearch(themeFood, "food")).toBe(true);
      expect(matchThemeSearch(themeFood, "an")).toBe(true);
    });

    it("should return false for unrelated topics", () => {
      expect(matchThemeSearch(themeIt, "nau an")).toBe(false);
      expect(matchThemeSearch(themeFinance, "dong vat")).toBe(false);
    });
  });
});
