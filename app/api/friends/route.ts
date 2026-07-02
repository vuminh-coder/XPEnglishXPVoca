import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/friends - Get list of accepted friends
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { senderId: userId, status: "ACCEPTED" },
          { receiverId: userId, status: "ACCEPTED" },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    const friendsList = friendships.map((f) => {
      const friend = f.senderId === userId ? f.receiver : f.sender;
      return {
        id: friend.id,
        fullName: friend.fullName || "User",
        username: friend.username || "user",
        level: friend.level,
        xp: friend.totalXp,
        avatarEmoji: friend.avatarEmoji || "🦉",
      };
    });

    return NextResponse.json({ success: true, data: friendsList });
  } catch (error: any) {
    console.error("GET /api/friends error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/friends - Send or accept a friend request
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { receiverId } = body;

    if (!receiverId) {
      return NextResponse.json(
        { error: "Receiver ID is required" },
        { status: 400 }
      );
    }

    if (receiverId === userId) {
      return NextResponse.json(
        { error: "Cannot add yourself as a friend" },
        { status: 400 }
      );
    }

    // Check if the receiver profile exists
    const receiverExists = await prisma.profile.findUnique({
      where: { id: receiverId },
    });

    if (!receiverExists) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Check existing friendships
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      },
    });

    if (existingFriendship) {
      if (existingFriendship.status === "ACCEPTED") {
        return NextResponse.json({
          success: true,
          message: "Already friends",
          data: existingFriendship,
        });
      }

      // If existing is sent by the other user, accept it
      if (existingFriendship.senderId === receiverId && existingFriendship.status === "PENDING") {
        const updated = await prisma.friendship.update({
          where: { id: existingFriendship.id },
          data: { status: "ACCEPTED" },
        });
        return NextResponse.json({ success: true, message: "Request accepted", data: updated });
      }

      return NextResponse.json({
        success: true,
        message: "Friend request already pending",
        data: existingFriendship,
      });
    }

    // Create a new pending friendship
    const newFriendship = await prisma.friendship.create({
      data: {
        senderId: userId,
        receiverId,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Friend request sent",
      data: newFriendship,
    });
  } catch (error: any) {
    console.error("POST /api/friends error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/friends - Remove a friend / reject or cancel request
export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const friendId = searchParams.get("friendId");

    if (!friendId) {
      return NextResponse.json(
        { error: "Friend ID is required" },
        { status: 400 }
      );
    }

    // Find friendship where sender=userId and receiver=friendId, OR sender=friendId and receiver=userId
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId },
        ],
      },
    });

    if (!friendship) {
      return NextResponse.json(
        { error: "Friendship not found" },
        { status: 404 }
      );
    }

    await prisma.friendship.delete({
      where: { id: friendship.id },
    });

    return NextResponse.json({ success: true, message: "Friendship removed" });
  } catch (error: any) {
    console.error("DELETE /api/friends error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}