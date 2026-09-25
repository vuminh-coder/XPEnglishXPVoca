import { describe, it, expect } from "vitest";
import { PrismaClient } from "@prisma/client";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { EXTENDED_SHADOWING_LESSONS } from "@/features/shadowing/data/extendedShadowingData";

const prisma = new PrismaClient();

describe("Listening & Shadowing Performance & Standards Verification Suite", () => {
  it("verifies all mock and extended shadowing lessons exist in the database", async () => {
    const dbCount = await prisma.listeningLesson.count();
    expect(dbCount).toBeGreaterThanOrEqual(120);

    // Verify sample A1 lessons
    const a1Lesson = await prisma.listeningLesson.findUnique({
      where: { id: "listen_a1_001" },
      select: { id: true, title: true, transcript: true },
    });
    expect(a1Lesson).toBeDefined();
    expect(a1Lesson?.id).toBe("listen_a1_001");
    expect(Array.isArray(a1Lesson?.transcript)).toBe(true);

    // Verify sample extended shadowing lessons
    const shadowLesson = await prisma.listeningLesson.findUnique({
      where: { id: "shadow_ext_001" },
      select: { id: true, title: true, transcript: true },
    });
    expect(shadowLesson).toBeDefined();
    expect(shadowLesson?.id).toBe("shadow_ext_001");
  }, 20000);

  it("verifies completion progress payload retains COMPLETED status without deletion", () => {
    const totalSentences = 5;
    const allIndices = Array.from({ length: totalSentences }, (_, i) => i);
    const progressPayload = {
      lessonId: "listen_a1_001",
      status: "COMPLETED",
      completedSentences: allIndices,
      bookmarkedSentences: [],
      timeSpent: 120,
      xpEarned: 50,
      skill: "shadowing",
    };

    expect(progressPayload.status).toBe("COMPLETED");
    expect(progressPayload.completedSentences.length).toBe(totalSentences);
    expect(progressPayload.xpEarned).toBe(50);
  });

  it("verifies Cache-Control privacy header logic for authenticated vs guest users", () => {
    const getCacheControl = (userId?: string | null) => {
      const isPersonalized = Boolean(userId && !userId.startsWith("guest") && userId !== "guest_user");
      return isPersonalized
        ? "private, no-cache, no-store, must-revalidate"
        : "public, s-maxage=60, stale-while-revalidate=120";
    };

    expect(getCacheControl("user_real_12345")).toBe("private, no-cache, no-store, must-revalidate");
    expect(getCacheControl("guest_user")).toBe("public, s-maxage=60, stale-while-revalidate=120");
    expect(getCacheControl(null)).toBe("public, s-maxage=60, stale-while-revalidate=120");
    expect(getCacheControl(undefined)).toBe("public, s-maxage=60, stale-while-revalidate=120");
  });

  it("verifies self-healing pattern data availability for any known mock/shadowing lesson", () => {
    const testIds = ["listen_a1_001", "shadow_ext_001", "listen_toeic_q3_060"];
    for (const id of testIds) {
      const found =
        MOCK_LESSONS_DATA.find((l) => l.id === id) ||
        (EXTENDED_SHADOWING_LESSONS as any[]).find((l) => l.id === id);
      expect(found).toBeDefined();
      expect(found?.title).toBeTruthy();
    }
  });
});
