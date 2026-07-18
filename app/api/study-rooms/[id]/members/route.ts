import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

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

    const { action, status, passcode } = await req.json();

    const room = await prisma.studyRoom.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json(
        { success: false, error: "Room not found" },
        { status: 404 }
      );
    }

    if (action === "join") {
      if (room.isPrivate && room.passcode && room.passcode !== passcode) {
        return NextResponse.json(
          { success: false, error: "Mật khẩu phòng không đúng!" },
          { status: 403 }
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

      await prisma.studyRoomMember.upsert({
        where: {
          roomId_userId: {
            roomId,
            userId,
          },
        },
        update: {
          status: status || "FOCUSING",
        },
        create: {
          roomId,
          userId,
          status: status || "FOCUSING",
        },
      });

      return NextResponse.json({ success: true, message: "Joined room" });
    }

    if (action === "update_status") {
      await prisma.studyRoomMember.update({
        where: {
          roomId_userId: {
            roomId,
            userId,
          },
        },
        data: {
          status: status || "FOCUSING",
        },
      });

      return NextResponse.json({ success: true, message: "Status updated" });
    }

    if (action === "leave") {
      await prisma.studyRoomMember.delete({
        where: {
          roomId_userId: {
            roomId,
            userId,
          },
        },
      });

      return NextResponse.json({ success: true, message: "Left room" });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("POST /api/study-rooms/[id]/members error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: roomId } = await params;

    const members = await prisma.studyRoomMember.findMany({
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
      orderBy: { joinedAt: "asc" },
    });

    return NextResponse.json({ success: true, members });
  } catch (error) {
    console.error("GET /api/study-rooms/[id]/members error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
