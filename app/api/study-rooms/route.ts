import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const rooms = await prisma.studyRoom.findMany({
      include: {
        creator: {
          select: {
            fullName: true,
            username: true,
            avatarEmoji: true,
          },
        },
        members: {
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
        },
        _count: {
          select: { members: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, rooms });
  } catch (error) {
    console.error("GET /api/study-rooms error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, description, category, accentColor, maxMembers, isPrivate, passcode } = body;

    if (!name || !category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
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

    // Generate concise 6-digit numeric ID (e.g. 849201)
    const roomId6Digits = Math.floor(100000 + Math.random() * 900000).toString();

    const room = await prisma.studyRoom.create({
      data: {
        id: roomId6Digits,
        name,
        description: description || "",
        category,
        accentColor: accentColor || "indigo",
        maxMembers: maxMembers ? parseInt(maxMembers) : 20,
        isPrivate: !!isPrivate,
        passcode: passcode || null,
        createdById: userId,
        members: {
          create: {
            userId,
            status: "FOCUSING",
          },
        },
        messages: {
          create: {
            content: `Chào mừng bạn đến với phòng ${name}! Hãy cùng tập trung học tập nào 🚀`,
            isSystem: true,
          },
        },
      },
      include: {
        creator: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, room });
  } catch (error) {
    console.error("POST /api/study-rooms error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
