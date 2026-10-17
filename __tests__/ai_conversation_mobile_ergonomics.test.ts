import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("AI Conversation Mobile Ergonomics & Layout Architecture (/ai/conversation)", () => {
  const pagePath = path.resolve(process.cwd(), "app/(dashboard)/ai/conversation/page.tsx");
  const chatStreamPath = path.resolve(
    process.cwd(),
    "features/ai/conversation/components/AiConversationChatStream.tsx"
  );
  const inputDockPath = path.resolve(
    process.cwd(),
    "features/ai/conversation/components/AiConversationInputDock.tsx"
  );

  const pageContent = fs.readFileSync(pagePath, "utf-8");
  const chatStreamContent = fs.readFileSync(chatStreamPath, "utf-8");
  const inputDockContent = fs.readFileSync(inputDockPath, "utf-8");

  describe("1. Mobile Viewport Lock & Docking Architecture", () => {
    it("locks viewport to 100dvh with overflow-hidden and suppressHydrationWarning", () => {
      expect(pageContent).toContain("h-[100dvh]");
      expect(pageContent).toContain("max-h-[100dvh]");
      expect(pageContent).toContain("overflow-hidden");
      expect(pageContent).toContain("suppressHydrationWarning");
    });

    it("docks cleanly right above BottomNav on mobile with pb-[50px] lg:pb-3", () => {
      expect(pageContent).toContain("pb-[50px] lg:pb-3");
    });
  });

  describe("2. Top Header Mobile Ergonomics", () => {
    it("provides customMobileSearchReplacement with History button matching /ai/tutor", () => {
      expect(pageContent).toContain("customMobileSearchReplacement=");
      expect(pageContent).toContain("handleOpenHistoryDrawer");
      expect(pageContent).toContain("History");
    });

    it("hides bulky top bar on mobile and displays on desktop only", () => {
      expect(pageContent).toContain("hidden lg:block");
      expect(pageContent).toContain("<AiConversationTopBar");
    });
  });

  describe("3. Integrated Chat Stream Header & Mobile Bottom Sheets", () => {
    it("integrates mobile topic picker trigger and header controls into AiConversationChatStream", () => {
      expect(pageContent).toContain("headerLeftMobileContent=");
      expect(pageContent).toContain("headerRightMobileContent=");
      expect(pageContent).toContain("setShowTopicModal(true)");
      expect(pageContent).toContain("setShowGoalsModal(true)");
    });

    it("renders Goals & Contextual Vocabulary bottom sheet modal on mobile", () => {
      expect(pageContent).toContain("showGoalsModal");
      expect(pageContent).toContain("<AiConversationInspectorDock");
    });

    it("renders Topic & AI Settings bottom sheet modal on mobile", () => {
      expect(pageContent).toContain("showTopicModal");
      expect(pageContent).toContain("AI_PERSONAS.map");
      expect(pageContent).toContain("aiTopics.map");
    });

    it("does not force full-screen segmented switcher between chat and inspector on mobile", () => {
      expect(pageContent).not.toContain("setMobileActiveTab");
    });
  });

  describe("4. Chat Stream Scroll & Input Dock Mobile Architecture", () => {
    it("uses min-h-0 with overscroll-contain for independent chat message scrolling", () => {
      expect(chatStreamContent).toContain("min-h-0");
      expect(chatStreamContent).toContain("overscroll-contain");
    });

    it("organizes suggestion chips into 2-row smooth horizontal scroll strip on mobile", () => {
      expect(inputDockContent).toContain("overflow-x-auto no-scrollbar whitespace-nowrap");
      expect(inputDockContent).toContain("mob_w_");
      expect(inputDockContent).toContain("mob_p_");
    });
  });
});
