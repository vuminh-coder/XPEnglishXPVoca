import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const body = await request.json();
    const { lessonId, content } = body;

    // Notes are private user data. Never accept an identity supplied in the body.
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (typeof lessonId !== "string" || !lessonId) {
      return NextResponse.json(
        { success: false, error: "Thiếu userId hoặc lessonId" },
        { status: 400 }
      );
    }

    if (typeof content !== "string" || content.length > 10_000) {
      return NextResponse.json({ success: false, error: "Invalid note content" }, { status: 400 });
    }

    const note = await prisma.listeningNote.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      update: {
        content,
        updatedAt: new Date(),
      },
      create: {
        userId,
        lessonId,
        content,
      },
    });

    return NextResponse.json({
      success: true,
      data: note,
      message: "Ghi chú đã được lưu vào CSDL.",
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json(
      { success: false, error: prismaErr.error },
      { status: prismaErr.status }
    );
  }
}
