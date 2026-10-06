import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { AI_PERSONAS, DEFAULT_AI_PERSONA } from "@/features/ai/conversation/data/aiPersonas";

describe("AI Roleplay Personas & Adaptive Difficulty Standards", () => {
  it("provides comprehensive and distinct roleplay personas", () => {
    expect(AI_PERSONAS.length).toBeGreaterThanOrEqual(4);
    
    const ids = AI_PERSONAS.map((p) => p.id);
    expect(ids).toContain("native_friend");
    expect(ids).toContain("strict_interviewer");
    expect(ids).toContain("patient_tutor");
    expect(ids).toContain("challenging_debater");

    // All personas must have clear tonePrompt, roleTitle, and emoji
    AI_PERSONAS.forEach((persona) => {
      expect(persona.name).toBeTruthy();
      expect(persona.roleTitle).toBeTruthy();
      expect(persona.avatarEmoji).toBeTruthy();
      expect(persona.description).toBeTruthy();
      expect(persona.tonePrompt.length).toBeGreaterThan(40);
    });

    expect(DEFAULT_AI_PERSONA.id).toBe("native_friend");
  });

  it("chat route accepts persona parameters and injects them into system instruction", () => {
    const src = readFileSync(join(process.cwd(), "app/api/ai/chat/route.ts"), "utf8");
    expect(src).toContain("personaId");
    expect(src).toContain("personaName");
    expect(src).toContain("personaTone");
    expect(src).toContain("ROLEPLAY PERSONA:");
    expect(src).toContain("Tone & Attitude:");
  });

  it("session hook manages and persists persona and difficulty selections", () => {
    const src = readFileSync(
      join(process.cwd(), "features/ai/conversation/hooks/useAiConversationSession.ts"),
      "utf8"
    );
    expect(src).toContain("selectedPersonaId");
    expect(src).toContain("setSelectedPersonaId");
    expect(src).toContain("selectedDifficulty");
    expect(src).toContain("setSelectedDifficulty");
    expect(src).toContain("xp_voca_ai_conversation_persona");
    expect(src).toContain("personaId");
  });

  it("share certified score card modal provides complete score metrics and copy action", () => {
    const src = readFileSync(
      join(process.cwd(), "features/ai/conversation/components/AiConversationShareModal.tsx"),
      "utf8"
    );
    expect(src).toContain("Thẻ Chứng Nhận Thành Tích Hội Thoại");
    expect(src).toContain("AI Certified");
    expect(src).toContain("navigator.clipboard.writeText");
    expect(src).toContain("Sao Chép Bài Đăng Khoe Thành Tích");
    expect(src).toContain("Sao Chép Liên Kết Luyện Tập");
  });

  it("ScoreCard component integrates Share Score Card button and modal", () => {
    const src = readFileSync(
      join(process.cwd(), "features/ai/conversation/components/AiConversationScoreCard.tsx"),
      "utf8"
    );
    expect(src).toContain("isShareModalOpen");
    expect(src).toContain("setIsShareModalOpen");
    expect(src).toContain("Chia Sẻ Thành Tích");
    expect(src).toContain("<AiConversationShareModal");
  });
});
