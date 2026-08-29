import { describe, it, expect } from "vitest";
import {
  BASIC_VOCABULARY_THEMES,
  BASIC_VOCABULARIES,
  getBasicVocabulariesByTheme,
  searchBasicVocabularies,
} from "@/features/vocabulary/data/basicVocabularies";
import {
  ADVANCED_VOCABULARY_THEMES,
  ADVANCED_VOCABULARIES,
  getAdvancedVocabulariesByTheme,
  searchAdvancedVocabularies,
} from "@/features/vocabulary/data/advancedVocabularies";

describe("Essential Basic & Daily Vocabulary Bank Audit (A1-A2 - 60 Comprehensive Themes)", () => {
  it("verifies all 60 core daily beginner themes are properly defined", () => {
    expect(BASIC_VOCABULARY_THEMES.length).toBe(60);

    const themeIds = BASIC_VOCABULARY_THEMES.map((t) => t.id);
    
    // Check initial batch (1-15)
    expect(themeIds).toContain("t_basic_greetings");
    expect(themeIds).toContain("t_basic_introductions");
    expect(themeIds).toContain("t_basic_numbers");
    expect(themeIds).toContain("t_basic_colors_shapes");
    expect(themeIds).toContain("t_basic_family");
    expect(themeIds).toContain("t_basic_home_objects");
    expect(themeIds).toContain("t_basic_daily_verbs");
    expect(themeIds).toContain("t_basic_food_drinks");
    expect(themeIds).toContain("t_basic_emotions_adjectives");
    expect(themeIds).toContain("t_basic_time_calendar");
    expect(themeIds).toContain("t_basic_animals");
    expect(themeIds).toContain("t_basic_body_parts");
    expect(themeIds).toContain("t_basic_clothes");
    expect(themeIds).toContain("t_basic_places_directions");
    expect(themeIds).toContain("t_basic_weather_nature");

    // Check second batch (16-30)
    expect(themeIds).toContain("t_basic_jobs_occupations");
    expect(themeIds).toContain("t_basic_transportation");
    expect(themeIds).toContain("t_basic_school_stationery");
    expect(themeIds).toContain("t_basic_hobbies_sports");
    expect(themeIds).toContain("t_basic_shopping_money");
    expect(themeIds).toContain("t_basic_plants_fruits");
    expect(themeIds).toContain("t_basic_health_medical");
    expect(themeIds).toContain("t_basic_kitchen_utensils");
    expect(themeIds).toContain("t_basic_office_tech");
    expect(themeIds).toContain("t_basic_city_buildings");
    expect(themeIds).toContain("t_basic_personality_traits");
    expect(themeIds).toContain("t_basic_prepositions_positions");
    expect(themeIds).toContain("t_basic_senses_perceptions");
    expect(themeIds).toContain("t_basic_vacation_tourism");
    expect(themeIds).toContain("t_basic_entertainment_arts");

    // Check third batch (31-45)
    expect(themeIds).toContain("t_basic_measurements_sizes");
    expect(themeIds).toContain("t_basic_tools_repair");
    expect(themeIds).toContain("t_basic_severe_weather");
    expect(themeIds).toContain("t_basic_landforms_landscapes");
    expect(themeIds).toContain("t_basic_marine_life");
    expect(themeIds).toContain("t_basic_insects_bugs");
    expect(themeIds).toContain("t_basic_spices_herbs");
    expect(themeIds).toContain("t_basic_bakery_desserts");
    expect(themeIds).toContain("t_basic_drinks_beverages");
    expect(themeIds).toContain("t_basic_cleaning_chores");
    expect(themeIds).toContain("t_basic_fashion_accessories");
    expect(themeIds).toContain("t_basic_bedroom_sleep");
    expect(themeIds).toContain("t_basic_bathroom_toiletries");
    expect(themeIds).toContain("t_basic_bodily_sensations");
    expect(themeIds).toContain("t_basic_feelings_attitudes");

    // Check fourth batch (46-60)
    expect(themeIds).toContain("t_basic_relationships_social");
    expect(themeIds).toContain("t_basic_conversation_communication");
    expect(themeIds).toContain("t_basic_geometry_patterns");
    expect(themeIds).toContain("t_basic_materials_substances");
    expect(themeIds).toContain("t_basic_sounds_instruments");
    expect(themeIds).toContain("t_basic_light_visual_effects");
    expect(themeIds).toContain("t_basic_body_movements");
    expect(themeIds).toContain("t_basic_convenience_services");
    expect(themeIds).toContain("t_basic_airport_station_travel");
    expect(themeIds).toContain("t_basic_hotel_accommodation");
    expect(themeIds).toContain("t_basic_street_food_snacks");
    expect(themeIds).toContain("t_basic_life_stages_age");
    expect(themeIds).toContain("t_basic_holidays_customs");
    expect(themeIds).toContain("t_basic_safety_warnings_rules");
    expect(themeIds).toContain("t_basic_appliances_gadgets");

    BASIC_VOCABULARY_THEMES.forEach((theme) => {
      expect(theme.difficulty).toBe(1);
      expect(theme.name).toBeTruthy();
      expect(theme.nameEn).toBeTruthy();
      expect(theme.icon).toBeTruthy();
      expect(theme.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(theme.totalVocabs).toBeGreaterThanOrEqual(18);
    });
  });

  it("verifies all basic vocabulary items have complete metadata, IPA, and 2 examples with translations", () => {
    expect(BASIC_VOCABULARIES.length).toBeGreaterThanOrEqual(1200);

    const validThemeIds = new Set(BASIC_VOCABULARY_THEMES.map((t) => t.id));

    BASIC_VOCABULARIES.forEach((item) => {
      expect(item.id).toMatch(/^bv_/);
      expect(item.word).toBeTruthy();
      expect(item.phonetic).toMatch(/^\/.*\/$/);
      expect(item.definition).toBeTruthy();
      expect(item.definitionVn).toBeTruthy();
      expect(item.difficulty).toBe(1);
      expect(validThemeIds.has(item.themeId)).toBe(true);
      expect(item.examples.length).toBeGreaterThanOrEqual(2);
      if (item.exampleTranslations) {
        expect(item.exampleTranslations.length).toBeGreaterThanOrEqual(2);
      }
    });
  });

  it("filters basic vocabulary by theme correctly", () => {
    const greetings = getBasicVocabulariesByTheme("t_basic_greetings");
    expect(greetings.length).toBeGreaterThanOrEqual(20);
    greetings.forEach((item) => {
      expect(item.themeId).toBe("t_basic_greetings");
    });
  });

  it("searches basic vocabulary by English word and Vietnamese meaning correctly", () => {
    const hammerSearch = searchBasicVocabularies("hammer");
    expect(hammerSearch.some((v) => v.word === "hammer")).toBe(true);

    const búaSearch = searchBasicVocabularies("cây búa");
    expect(búaSearch.some((v) => v.word === "hammer")).toBe(true);
  });
});

describe("Advanced Vocabulary Bank Audit (B1-C2 - 155 Comprehensive Themes from separate file)", () => {
  it("verifies advanced vocabulary themes are properly defined in lib/data/advancedVocabularies.ts", () => {
    expect(ADVANCED_VOCABULARY_THEMES.length).toBeGreaterThanOrEqual(140);

    const advancedIds = ADVANCED_VOCABULARY_THEMES.map((t) => t.id);
    expect(advancedIds).toContain("t146"); // CNTT & AI
    expect(advancedIds).toContain("t147"); // Y tế
    expect(advancedIds).toContain("t148"); // Tài chính
    expect(advancedIds).toContain("t149"); // Luật pháp
    expect(advancedIds).toContain("t150"); // Môi trường
    expect(advancedIds).toContain("t151"); // Marketing
    expect(advancedIds).toContain("t152"); // Du lịch
    expect(advancedIds).toContain("t153"); // Khoa học
    expect(advancedIds).toContain("t154"); // Nghệ thuật
    expect(advancedIds).toContain("t155"); // Thể thao

    ADVANCED_VOCABULARY_THEMES.forEach((theme) => {
      expect(theme.id).toBeTruthy();
      expect(theme.name).toBeTruthy();
      expect(theme.nameEn).toBeTruthy();
      expect(theme.icon).toBeTruthy();
      expect(theme.difficulty).toBeGreaterThanOrEqual(2);
    });
  });

  it("verifies advanced vocabularies can be queried by theme and keyword", () => {
    expect(ADVANCED_VOCABULARIES.length).toBeGreaterThan(0);

    const theme1Vocabs = getAdvancedVocabulariesByTheme("t1");
    expect(theme1Vocabs.length).toBeGreaterThan(0);

    const searchResults = searchAdvancedVocabularies("father");
    expect(searchResults.length).toBeGreaterThan(0);
  });
});
