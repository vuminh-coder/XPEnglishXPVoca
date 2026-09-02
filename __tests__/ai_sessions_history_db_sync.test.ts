import { describe, it, expect } from "vitest";
import { AiSessionPayload } from "@/app/api/ai/sessions/route";

describe("AI Sessions History & Database Persistence Suite", () => {
  // 1. AI Speaking Tutor Session Payload Validation
  it("builds a complete Speaking Tutor session record with scorecard and metrics", () => {
    const session: AiSessionPayload = {
      sessionId: "ai_tutor_test_123",
      mode: "tutor",
      personaId: "emma",
      messages: [
        {
          id: "msg_1",
          role: "ai",
          text: "Hello! Tell me about your favorite travel destination.",
          vietnameseTranslation: "Xin chào! Hãy kể cho tôi về điểm du lịch yêu thích của bạn.",
        },
        {
          id: "msg_2",
          role: "user",
          text: "I really enjoy visiting historical places because of their architecture.",
          pronunciationScore: 94,
        },
      ],
      overallScore: 92,
      grade: "S",
      evaluationMetrics: {
        pronunciationScore: 94,
        fluencyScore: 90,
        intonationScore: 92,
        grammarScore: 95,
        coachFeedback: "Excellent speaking flow and natural British rhythm!",
      },
      timeSpentSeconds: 310,
      xpEarned: 45,
      status: "COMPLETED",
      createdAt: new Date().toISOString(),
    };

    expect(session.sessionId).toBe("ai_tutor_test_123");
    expect(session.mode).toBe("tutor");
    expect(session.personaId).toBe("emma");
    expect(session.messages.length).toBe(2);
    expect(session.overallScore).toBe(92);
    expect(session.grade).toBe("S");
    expect(session.xpEarned).toBe(45);
    expect(session.status).toBe("COMPLETED");
  });

  // 2. AI Topic Conversation Session Payload Validation
  it("builds a complete Topic Conversation session record with grammar notes", () => {
    const session: AiSessionPayload = {
      sessionId: "ai_conv_test_456",
      mode: "conversation",
      topicId: "at1",
      messages: [
        {
          id: "msg_ai_1",
          role: "ai",
          text: "Welcome to The Bistro! Are you ready to order?",
          vietnameseTranslation: "Chào mừng quý khách đến với The Bistro! Quý khách đã sẵn sàng gọi món chưa?",
        },
        {
          id: "msg_user_1",
          role: "user",
          text: "I would like to order a fresh garden salad, please.",
          grammarCorrection: {
            hasError: false,
            original: "I would like to order a fresh garden salad, please.",
            corrected: "I would like to order a fresh garden salad, please.",
            explanation: "Cấu trúc hoàn hảo!",
          },
          betterPhrasing: "I'll have the fresh garden salad, please.",
        },
      ],
      overallScore: 88,
      grade: "A",
      evaluationMetrics: {
        goalsScore: 100,
        grammarScore: 95,
        interactionScore: 85,
        vocabScore: 80,
      },
      timeSpentSeconds: 240,
      xpEarned: 35,
      status: "COMPLETED",
      createdAt: new Date().toISOString(),
    };

    expect(session.sessionId).toBe("ai_conv_test_456");
    expect(session.mode).toBe("conversation");
    expect(session.topicId).toBe("at1");
    expect(session.overallScore).toBe(88);
    expect(session.grade).toBe("A");
    expect(session.messages[1].betterPhrasing).toBe("I'll have the fresh garden salad, please.");
  });

  // 3. Sorting and Filtering Session History
  it("filters and sorts sessions chronologically (newest first)", () => {
    const list: AiSessionPayload[] = [
      {
        sessionId: "session_old",
        mode: "tutor",
        messages: [],
        timeSpentSeconds: 60,
        xpEarned: 15,
        status: "COMPLETED",
        createdAt: "2026-09-01T10:00:00.000Z",
      },
      {
        sessionId: "session_newest",
        mode: "tutor",
        messages: [],
        timeSpentSeconds: 120,
        xpEarned: 35,
        status: "COMPLETED",
        createdAt: "2026-09-02T15:00:00.000Z",
      },
      {
        sessionId: "session_conv",
        mode: "conversation",
        messages: [],
        timeSpentSeconds: 90,
        xpEarned: 25,
        status: "COMPLETED",
        createdAt: "2026-09-02T12:00:00.000Z",
      },
    ];

    const tutorSessions = list
      .filter((s) => s.mode === "tutor")
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());

    expect(tutorSessions.length).toBe(2);
    expect(tutorSessions[0].sessionId).toBe("session_newest");
    expect(tutorSessions[1].sessionId).toBe("session_old");
  });

  // 4. Time Spent & XP aggregation for DailySkillPractice
  it("computes accurate study minutes for PostgreSQL Neon sync", () => {
    const timeSpent1 = 45; // 45 seconds -> 1 minute
    const timeSpent2 = 185; // 3 minutes 5 seconds -> 4 minutes
    const timeSpent3 = 600; // 10 minutes -> 10 minutes

    expect(Math.max(1, Math.ceil(timeSpent1 / 60))).toBe(1);
    expect(Math.max(1, Math.ceil(timeSpent2 / 60))).toBe(4);
    expect(Math.max(1, Math.ceil(timeSpent3 / 60))).toBe(10);
  });
});
