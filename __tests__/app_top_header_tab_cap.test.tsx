import { describe, it, expect, vi } from "vitest";
import React from "react";
import { StudySuiteNavTabs } from "@/shared/components/layout/nav-tabs/StudySuiteNavTabs";
import { VocabSuiteNavTabs } from "@/shared/components/layout/nav-tabs/VocabSuiteNavTabs";
import { GameSuiteNavTabs } from "@/shared/components/layout/nav-tabs/GameSuiteNavTabs";
import { AiSuiteNavTabs } from "@/shared/components/layout/nav-tabs/AiSuiteNavTabs";
import { IpaSuiteNavTabs } from "@/shared/components/layout/nav-tabs/IpaSuiteNavTabs";
import { ProfileSuiteNavTabs } from "@/shared/components/layout/nav-tabs/ProfileSuiteNavTabs";
import { ShopSuiteNavTabs } from "@/shared/components/layout/nav-tabs/ShopSuiteNavTabs";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/study/dictation",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

describe("AppTopHeader Maximum 4 Tabs Architectural Rule (<= 4 tabs per header)", () => {
  it("verifies StudySuiteNavTabs renders exactly 4 tabs in standard reading/study mode", () => {
    const el = StudySuiteNavTabs({ showPracticeTab: false });
    expect(React.isValidElement(el)).toBe(true);
    const children = el.props.children;
    expect(React.Children.count(children)).toBeLessThanOrEqual(4);
    expect(React.Children.count(children)).toBe(4);
  });

  it("verifies StudySuiteNavTabs renders exactly 4 tabs in vocabulary practice mode", () => {
    const el = StudySuiteNavTabs({ showPracticeTab: true });
    expect(React.isValidElement(el)).toBe(true);
    const children = el.props.children;
    expect(React.Children.count(children)).toBeLessThanOrEqual(4);
    expect(React.Children.count(children)).toBe(4);
  });

  it("verifies VocabSuiteNavTabs renders exactly 4 tabs", () => {
    const el = VocabSuiteNavTabs({});
    expect(React.isValidElement(el)).toBe(true);
    const children = el.props.children;
    expect(React.Children.count(children)).toBeLessThanOrEqual(4);
    expect(React.Children.count(children)).toBe(4);
  });

  it("verifies GameSuiteNavTabs renders exactly 4 tabs", () => {
    const el = GameSuiteNavTabs({});
    expect(React.isValidElement(el)).toBe(true);
    const children = el.props.children;
    expect(React.Children.count(children)).toBeLessThanOrEqual(4);
    expect(React.Children.count(children)).toBe(4);
  });

  it("verifies AiSuiteNavTabs renders exactly 4 tabs", () => {
    const el = AiSuiteNavTabs({});
    expect(React.isValidElement(el)).toBe(true);
    const children = el.props.children;
    expect(React.Children.count(children)).toBeLessThanOrEqual(4);
    expect(React.Children.count(children)).toBe(4);
  });

  it("verifies IpaSuiteNavTabs renders <= 4 tabs (3 tabs)", () => {
    const el = IpaSuiteNavTabs({});
    expect(React.isValidElement(el)).toBe(true);
    const children = el.props.children;
    expect(React.Children.count(children)).toBeLessThanOrEqual(4);
    expect(React.Children.count(children)).toBe(3);
  });

  it("verifies ProfileSuiteNavTabs renders <= 4 tabs (3 tabs)", () => {
    const el = ProfileSuiteNavTabs({});
    expect(React.isValidElement(el)).toBe(true);
    const children = el.props.children;
    expect(React.Children.count(children)).toBeLessThanOrEqual(4);
    expect(React.Children.count(children)).toBe(3);
  });

  it("verifies ShopSuiteNavTabs renders <= 4 tabs (3 tabs)", () => {
    const el = ShopSuiteNavTabs({});
    expect(React.isValidElement(el)).toBe(true);
    const children = el.props.children;
    expect(React.Children.count(children)).toBeLessThanOrEqual(4);
    expect(React.Children.count(children)).toBe(3);
  });
});
