import { describe, it, expect } from "vitest";
import {
  ALL_BASIC_VOCABULARY_THEMES,
  ALL_BASIC_VOCABULARIES,
  VOCABULARY_TOPICS_MAP,
  getTopicByThemeId,
  getBasicVocabulariesByTheme,
  searchBasicVocabularies,
  getBasicVocabularyById,
} from "@/features/vocabulary/data/topics";
import { CHUDE_CHAO_HOI_GIAO_TIEP } from "@/features/vocabulary/data/topics/ChuDeChaoHoiGiaoTiep";
import { CHUDE_GIA_DINH_NGUOI_THAN } from "@/features/vocabulary/data/topics/ChuDeGiaDinhNguoiThan";
import { CHUDE_THIET_BI_GIA_DUNG } from "@/features/vocabulary/data/topics/ChuDeThietBiGiaDung";

describe("Modular ChuDe Vocabulary Architecture Audit (60 Independent Topic Files)", () => {
  it("verifies all 60 ChuDe modules are aggregated into ALL_BASIC_VOCABULARY_THEMES", () => {
    expect(ALL_BASIC_VOCABULARY_THEMES.length).toBe(60);

    // Verify first, middle, and last themes
    expect(ALL_BASIC_VOCABULARY_THEMES[0].id).toBe("t_basic_greetings");
    expect(ALL_BASIC_VOCABULARY_THEMES[0].name).toBe("Chào hỏi & Giao tiếp");

    expect(ALL_BASIC_VOCABULARY_THEMES[4].id).toBe("t_basic_family");
    expect(ALL_BASIC_VOCABULARY_THEMES[4].name).toBe("Gia đình & Người thân");

    expect(ALL_BASIC_VOCABULARY_THEMES[59].id).toBe("t_basic_appliances_gadgets");
    expect(ALL_BASIC_VOCABULARY_THEMES[59].name).toBe("Thiết bị & Gia dụng");
  });

  it("verifies individual ChuDe modules can be imported directly and independently", () => {
    // Topic 1: Chào hỏi
    expect(CHUDE_CHAO_HOI_GIAO_TIEP).toBeDefined();
    expect(CHUDE_CHAO_HOI_GIAO_TIEP.theme.id).toBe("t_basic_greetings");
    expect(CHUDE_CHAO_HOI_GIAO_TIEP.vocabs.length).toBe(30);
    expect(CHUDE_CHAO_HOI_GIAO_TIEP.vocabs[0].word).toBe("hello");

    // Topic 5: Gia đình
    expect(CHUDE_GIA_DINH_NGUOI_THAN).toBeDefined();
    expect(CHUDE_GIA_DINH_NGUOI_THAN.theme.id).toBe("t_basic_family");
    expect(CHUDE_GIA_DINH_NGUOI_THAN.vocabs.length).toBe(25);

    // Topic 60: Thiết bị gia dụng
    expect(CHUDE_THIET_BI_GIA_DUNG).toBeDefined();
    expect(CHUDE_THIET_BI_GIA_DUNG.theme.id).toBe("t_basic_appliances_gadgets");
    expect(CHUDE_THIET_BI_GIA_DUNG.vocabs.length).toBe(20);
  });

  it("verifies exact parity of total vocabs (1,298 words) with ZERO ID collisions", () => {
    expect(ALL_BASIC_VOCABULARIES.length).toBe(1298);

    const seenIds = new Set<string>();
    const duplicateIds: string[] = [];

    for (const v of ALL_BASIC_VOCABULARIES) {
      if (seenIds.has(v.id)) {
        duplicateIds.push(v.id);
      }
      seenIds.add(v.id);
    }

    expect(duplicateIds).toEqual([]);
    expect(seenIds.size).toBe(1298);
  });

  it("verifies VOCABULARY_TOPICS_MAP provides instant O(1) lookups for all 60 themes", () => {
    expect(Object.keys(VOCABULARY_TOPICS_MAP).length).toBe(60);

    const greetingsPkg = getTopicByThemeId("t_basic_greetings");
    expect(greetingsPkg).toBeDefined();
    expect(greetingsPkg?.theme.name).toBe("Chào hỏi & Giao tiếp");
    expect(greetingsPkg?.vocabs.length).toBe(30);

    const unknownPkg = getTopicByThemeId("non_existent_theme");
    expect(unknownPkg).toBeUndefined();
  });

  it("verifies query helpers (by theme, search query, by ID) work seamlessly with modular data", () => {
    const familyWords = getBasicVocabulariesByTheme("t_basic_family");
    expect(familyWords.length).toBe(25);
    expect(familyWords.every((v) => v.themeId === "t_basic_family")).toBe(true);

    const searchResults = searchBasicVocabularies("hello");
    expect(searchResults.some((v) => v.word === "hello")).toBe(true);

    const wordItem = getBasicVocabularyById("bv_greeti_01");
    expect(wordItem).toBeDefined();
    expect(wordItem?.word).toBe("hello");
  });
});
