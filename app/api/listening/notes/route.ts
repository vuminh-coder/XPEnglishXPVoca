import { NextResponse } from "next/server";
import { prisma, safeDbExecute, handlePrismaError } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

export async function POST(request: Request) {
  try {
    let authUserId = await getAuthenticatedUserId(request);
    const body = await request.json();
    const { userId: bodyUserId, lessonId, content } = body;

    const userId = authUserId || bodyUserId;

    if (!userId || !lessonId) {
      return NextResponse.json(
        { success: false, error: "Thiếu userId hoặc lessonId" },
        { status: 400 }
      );
    }

    const note = await safeDbExecute(async () => {
      return await prisma.listeningNote.upsert({
        where: {
          userId_lessonId: { userId, lessonId },
        },
        update: {
          content: content ?? "",
          updatedAt: new Date(),
        },
        create: {
          userId,
          lessonId,
          content: content ?? "",
        },
      });
    }, "Save Listening Note");

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
