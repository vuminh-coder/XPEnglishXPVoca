import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Prepopulate groups if database is empty (called only when group table is empty)
async function ensureDefaultGroups() {
  const count = await prisma.group.count();
  if (count === 0) {
    const adminProfile = await prisma.profile.findFirst();
    if (adminProfile) {
      const defaultGroups = [
        {
          name: "IELTS Warriors",
          description: "Nhóm luyện từ vựng IELTS band 7.0+",
          themeName: "IELTS / TOEIC Prep",
          accent: "cyan",
          maxMembers: 50,
          createdById: adminProfile.id,
        },
        {
          name: "Tech Vocab Club",
          description: "Học từ vựng công nghệ cho developers",
          themeName: "Technology",
          accent: "blue",
          maxMembers: 30,
          createdById: adminProfile.id,
        },
        {
          name: "Business English Pro",
          description: "Tiếng Anh thương mại cho dân công sở",
          themeName: "Business",
          accent: "amber",
          maxMembers: 50,
          createdById: adminProfile.id,
        },
        {
          name: "Daily English Chat",
          description: "Nói tiếng Anh mỗi ngày, không ngại sai!",
          themeName: "Daily Conversations",
          accent: "purple",
          maxMembers: 100,
          createdById: adminProfile.id,
        },
      ];

      for (const groupData of defaultGroups) {
        await prisma.group.create({
          data: {
            ...groupData,
            members: {
              create: {
                userId: adminProfile.id,
                role: "ADMIN",
              },
            },
          },
        });
      }
    }
  }
}

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();

    let groups = await prisma.group.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        themeName: true,
        accent: true,
        maxMembers: true,
        members: {
          select: {
            userId: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (groups.length === 0) {
      await ensureDefaultGroups();
      groups = await prisma.group.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          themeName: true,
          accent: true,
          maxMembers: true,
          members: {
            select: {
              userId: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    const formattedGroups = groups.map((g) => ({
      id: g.id,
      name: g.name,
      description: g.description,
      themeName: g.themeName,
      accent: g.accent,
      memberCount: g.members.length,
      maxMembers: g.maxMembers,
      joined: userId ? g.members.some((m) => m.userId === userId) : false,
      role: userId ? g.members.find((m) => m.userId === userId)?.role || null : null,
    }));

    return NextResponse.json({ success: true, data: formattedGroups });
  } catch (error: any) {
    console.error("GET /api/groups error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: userId },
      select: { level: true },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    if (profile.level < 15) {
      return NextResponse.json(
        { error: "Khởi tạo nhóm mới yêu cầu cấp độ 15 trở lên!" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, description, themeName, accent = "cyan", maxMembers = 50 } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Group name is required" }, { status: 400 });
    }

    const group = await prisma.group.create({
      data: {
        name: name.trim(),
        description: description || "",
        themeName: themeName || "General",
        accent,
        maxMembers: parseInt(maxMembers) || 50,
        createdById: userId,
        members: {
          create: {
            userId,
            role: "ADMIN",
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        themeName: true,
        accent: true,
        maxMembers: true,
        members: {
          select: {
            userId: true,
          },
        },
      },
    });

    const formattedGroup = {
      id: group.id,
      name: group.name,
      description: group.description,
      themeName: group.themeName,
      accent: group.accent,
      memberCount: group.members.length,
      maxMembers: group.maxMembers,
      joined: true,
      role: "ADMIN",
    };

    return NextResponse.json({ success: true, data: formattedGroup });
  } catch (error: any) {
    console.error("POST /api/groups error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
