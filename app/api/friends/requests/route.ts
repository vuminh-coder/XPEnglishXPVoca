import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/friends/requests - Get incoming and outgoing pending friend requests
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const incoming = await prisma.friendship.findMany({
      where: {
        receiverId: userId,
        status: "PENDING",
      },
      include: {
        sender: true,
      },
    });

    const outgoing = await prisma.friendship.findMany({
      where: {
        senderId: userId,
        status: "PENDING",
      },
      include: {
        receiver: true,
      },
    });

    const formattedIncoming = incoming.map((req) => ({
      requestId: req.id,
      id: req.sender.id,
      fullName: req.sender.fullName || "User",
      username: req.sender.username || "user",
      level: req.sender.level,
      xp: req.sender.totalXp,
      avatarEmoji: req.sender.avatarEmoji || "🦉",
    }));

    const formattedOutgoing = outgoing.map((req) => ({
      requestId: req.id,
      id: req.receiver.id,
      fullName: req.receiver.fullName || "User",
      username: req.receiver.username || "user",
      level: req.receiver.level,
      xp: req.receiver.totalXp,
      avatarEmoji: req.receiver.avatarEmoji || "🦉",
    }));

    return NextResponse.json({
      success: true,
      data: {
        incoming: formattedIncoming,
        outgoing: formattedOutgoing,
      },
    });
  } catch (error: any) {
    console.error("GET /api/friends/requests error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/friends/requests - Accept or Decline a pending request
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { requestId, action } = body; // action is 'ACCEPT' or 'DECLINE'

    if (!requestId || !action) {
      return NextResponse.json(
        { error: "Request ID and action are required" },
        { status: 400 }
      );
    }

    const friendship = await prisma.friendship.findUnique({
      where: { id: requestId },
    });

    if (!friendship) {
      return NextResponse.json(
        { error: "Friend request not found" },
        { status: 404 }
      );
    }

    // Verify current user is authorized (must be the receiver to accept/decline)
    if (friendship.receiverId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to process this request" },
        { status: 403 }
      );
    }

    if (action === "ACCEPT") {
      const updated = await prisma.friendship.update({
        where: { id: requestId },
        data: { status: "ACCEPTED" },
      });
      return NextResponse.json({ success: true, message: "Request accepted", data: updated });
    } else if (action === "DECLINE") {
      await prisma.friendship.delete({
        where: { id: requestId },
      });
      return NextResponse.json({ success: true, message: "Request declined" });
    } else {
      return NextResponse.json(
        { error: "Invalid action. Must be ACCEPT or DECLINE" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("POST /api/friends/requests error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}