import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: roomId } = await params;

    const messages = await prisma.roomMessage.findMany({
      where: { roomId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatarEmoji: true,
            title: true,
            totalXp: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
      take: 100,
    });

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("GET /api/study-rooms/[id]/messages error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: roomId } = await params;
    const { userId } = getAuth(req as any);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { content } = await req.json();
    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid content" },
        { status: 400 }
      );
    }

    // Ensure profile exists for clerk user
    let profile = await prisma.profile.findUnique({ where: { id: userId } });
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          id: userId,
          fullName: "Học viên",
          avatarEmoji: "🎓",
        },
      });
    }

    // Save user message
    const userMessage = await prisma.roomMessage.create({
      data: {
        roomId,
        userId,
        content,
        isAi: false,
        isSystem: false,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatarEmoji: true,
            title: true,
            totalXp: true,
          },
        },
      },
    });

    // Check if message summons AI (@AI)
    const isAiTrigger = content.toLowerCase().includes("@ai");
    let aiResponse = null;

    if (isAiTrigger) {
      const query = content.replace(/@ai/gi, "").trim();
      const apiKey = process.env.GEMINI_API_KEY || "";

      if (apiKey) {
        try {
          const prompt = `Bạn là Trợ lý AI Mentor trong Phòng Học Nhóm Tiếng Anh. Hãy trả lời ngắn gọn, truyền cảm hứng và hữu ích cho câu hỏi sau của học viên:\n"${query || "Chào AI, tư vấn mẹo học từ vựng hiệu quả giúp nhóm nhé!"}"`;

          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
              }),
            }
          );
          const data = await res.json();
          const replyText =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Chúc nhóm học tập thật tốt và bứt phá điểm số nhé! 🚀";

          aiResponse = await prisma.roomMessage.create({
            data: {
              roomId,
              userId: null,
              content: replyText,
              isAi: true,
              isSystem: false,
            },
          });
        } catch (err) {
          console.error("AI Room Mentor error:", err);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: userMessage,
      aiMessage: aiResponse,
    });
  } catch (error) {
    console.error("POST /api/study-rooms/[id]/messages error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
