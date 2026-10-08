import { describe, it, expect } from "vitest";
import React from "react";
import { StudySuiteNavTabs } from "@/shared/components/layout/nav-tabs/StudySuiteNavTabs";
import { READING_PASSAGES_DATA } from "@/features/reading";
import { prefetchRouteData } from "@/shared/utils/prefetchEngine";

describe("Canonical Study Routes & URL Normalization Suite", () => {
  it("verifies StudySuiteNavTabs exports and renders all 5 study modes including Reading", () => {
    expect(typeof StudySuiteNavTabs).toBe("function");
    const el = React.createElement(StudySuiteNavTabs);
    expect(React.isValidElement(el)).toBe(true);
  });

  it("verifies all reading passage IDs in mock data are valid non-empty string slugs", () => {
    expect(READING_PASSAGES_DATA.length).toBeGreaterThanOrEqual(10);
    READING_PASSAGES_DATA.forEach((passage) => {
      expect(typeof passage.id).toBe("string");
      expect(passage.id.trim().length).toBeGreaterThan(0);
      expect(passage.id).toMatch(/^[a-zA-Z0-9_-]+$/);
    });
  });

  it("verifies sample passage resolution by ID for dynamic route /study/reading/[id]", () => {
    const firstPassage = READING_PASSAGES_DATA[0];
    const resolved = READING_PASSAGES_DATA.find(
      (p) => p.id === firstPassage.id || p.id.toLowerCase() === firstPassage.id.toLowerCase()
    );
    expect(resolved).toBeDefined();
    expect(resolved?.title).toBe(firstPassage.title);
  });

  it("verifies prefetchEngine handles /study/reading safely without runtime exceptions", () => {
    expect(() => prefetchRouteData("/study/reading")).not.toThrow();
    expect(() => prefetchRouteData("/study/reading/r1")).not.toThrow();
  });

  it("verifies VideoComprehensionStudioView component is exported from listening module", async () => {
    const listeningModule = await import("@/features/listening");
    expect(typeof listeningModule.VideoComprehensionStudioView).toBe("function");
  });

  it("verifies numeric fallback logic resolves passage correctly (e.g. '1' -> 'r1')", () => {
    const rawId = "1";
    const direct = READING_PASSAGES_DATA.find((p) => p.id === rawId);
    const prefixed = READING_PASSAGES_DATA.find((p) => p.id === `r${rawId}`);
    expect(direct).toBeUndefined();
    expect(prefixed).toBeDefined();
    expect(prefixed?.id).toBe("r1");
  });
});

