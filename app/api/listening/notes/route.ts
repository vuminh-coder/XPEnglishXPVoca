import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, lessonId, content } = body;

    if (!userId || !lessonId) {
      return NextResponse.json(
        { success: false, error: "Thiếu userId hoặc lessonId" },
        { status: 400 }
      );
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
        content: content || "",
      },
    });

    return NextResponse.json({
      success: true,
      data: note,
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json({ success: false, error: prismaErr.error }, { status: prismaErr.status });
  }
}
