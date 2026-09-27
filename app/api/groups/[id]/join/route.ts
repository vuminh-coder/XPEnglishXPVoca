import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: groupId } = await params;

    // Check if group exists with selective count projection (no member rows in memory)
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      select: {
        id: true,
        maxMembers: true,
        _count: {
          select: { members: true },
        },
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Check if user is already a member with selective projection
    const existingMember = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
      select: { groupId: true },
    });

    let joined = false;
    if (existingMember) {
      await prisma.groupMember.delete({
        where: {
          groupId_userId: {
            groupId,
            userId,
          },
        },
      });
      joined = false;
    } else {
      // Check members count limit from aggregated count
      if (group._count.members >= group.maxMembers) {
        return NextResponse.json(
          { error: "Nhóm đã đạt số lượng thành viên tối đa!" },
          { status: 400 }
        );
      }

      await prisma.groupMember.create({
        data: {
          groupId,
          userId,
          role: "MEMBER",
        },
      });
      joined = true;
    }

    // Get updated members count
    const memberCount = await prisma.groupMember.count({
      where: { groupId },
    });

    return NextResponse.json({
      success: true,
      data: {
        joined,
        memberCount,
      },
    });
  } catch (error: any) {
    console.error("POST /api/groups/[id]/join error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
