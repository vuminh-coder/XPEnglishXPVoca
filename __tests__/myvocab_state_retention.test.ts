import { describe, it, expect, beforeEach } from "vitest";
import {
  useVocabularyCatalogStore,
  DEFAULT_MYVOCAB_FILTERS,
} from "@/stores/vocabularyCatalogStore";

describe("My Vocabulary Page State Retention (0ms Instant Render)", () => {
  beforeEach(() => {
    useVocabularyCatalogStore.getState().resetMyVocabFilters();
  });

  it("should have correct default state for myVocabFilters", () => {
    const filters = useVocabularyCatalogStore.getState().myVocabFilters;
    expect(filters).toEqual(DEFAULT_MYVOCAB_FILTERS);
    expect(filters.filterTab).toBe("all");
    expect(filters.searchQuery).toBe("");
  });

  it("should update filterTab when tab changes", () => {
    useVocabularyCatalogStore.getState().setMyVocabFilter({ filterTab: "favorite" });
    expect(useVocabularyCatalogStore.getState().myVocabFilters.filterTab).toBe("favorite");

    useVocabularyCatalogStore.getState().setMyVocabFilter({ filterTab: "mastered" });
    expect(useVocabularyCatalogStore.getState().myVocabFilters.filterTab).toBe("mastered");

    useVocabularyCatalogStore.getState().setMyVocabFilter({ filterTab: "learning" });
    expect(useVocabularyCatalogStore.getState().myVocabFilters.filterTab).toBe("learning");
  });

  it("should update and preserve searchQuery", () => {
    useVocabularyCatalogStore.getState().setMyVocabFilter({ searchQuery: "technology" });
    expect(useVocabularyCatalogStore.getState().myVocabFilters.searchQuery).toBe("technology");

    // Partial update should not overwrite existing filterTab
    useVocabularyCatalogStore.getState().setMyVocabFilter({ filterTab: "favorite" });
    expect(useVocabularyCatalogStore.getState().myVocabFilters.searchQuery).toBe("technology");
    expect(useVocabularyCatalogStore.getState().myVocabFilters.filterTab).toBe("favorite");
  });

  it("should reset myVocabFilters to defaults on resetMyVocabFilters call", () => {
    useVocabularyCatalogStore.getState().setMyVocabFilter({
      filterTab: "mastered",
      searchQuery: "environment",
    });

    useVocabularyCatalogStore.getState().resetMyVocabFilters();
    expect(useVocabularyCatalogStore.getState().myVocabFilters).toEqual(DEFAULT_MYVOCAB_FILTERS);
  });
});
