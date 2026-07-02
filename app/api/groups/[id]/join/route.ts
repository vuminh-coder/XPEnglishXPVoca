import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: groupId } = await params;

    // Check if group exists
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: true,
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Check if user is already a member
    const existingMember = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });

    let joined = false;
    if (existingMember) {
      // Creator/ADMIN can't leave unless they delete the group? Or they can leave if they are not the only one?
      // For simplicity, let them leave unless they want to
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
      // Check members count limit
      if (group.members.length >= group.maxMembers) {
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
