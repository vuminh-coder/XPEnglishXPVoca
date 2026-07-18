import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// In-memory queue for WebRTC signaling messages
// Key: `${roomId}:${targetId}` -> Array of signals
const signalQueue = new Map<string, Array<{ senderId: string; payload: any; timestamp: number }>>();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { userId } = getAuth(req as any);
    const { roomId } = await params;
    const body = await req.json();
    const { senderId, targetId, payload } = body;

    if (!senderId || !targetId || !payload) {
      return NextResponse.json({ error: "Invalid signaling payload" }, { status: 400 });
    }

    const queueKey = `${roomId}:${targetId}`;
    if (!signalQueue.has(queueKey)) {
      signalQueue.set(queueKey, []);
    }

    const queue = signalQueue.get(queueKey)!;
    queue.push({
      senderId,
      payload,
      timestamp: Date.now(),
    });

    // Cleanup signals older than 30 seconds
    const now = Date.now();
    signalQueue.set(
      queueKey,
      queue.filter((s) => now - s.timestamp < 30000)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in WebRTC signaling POST:", error);
    return NextResponse.json({ error: "Failed to send signal" }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { userId: authedUserId } = getAuth(req as any);
    const { roomId } = await params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const queueKey = `${roomId}:${userId}`;
    const signals = signalQueue.get(queueKey) || [];

    // Clear retrieved signals
    signalQueue.delete(queueKey);

    return NextResponse.json({ success: true, signals });
  } catch (error) {
    console.error("Error in WebRTC signaling GET:", error);
    return NextResponse.json({ error: "Failed to retrieve signals" }, { status: 500 });
  }
}
