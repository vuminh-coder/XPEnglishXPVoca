import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

// In-memory queue for WebRTC signaling messages
// Key: `${roomId}:${targetId}` -> Array of signals
const signalQueue = new Map<string, Array<{ senderId: string; payload: any; timestamp: number }>>();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authedUserId = await getAuthenticatedUserId(req);
    if (!authedUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: roomId } = await params;
    const body = await req.json();
    const { targetId, payload } = body;

    // SECURITY: Always use authenticated userId as senderId — never trust client input
    const senderId = authedUserId;

    if (!targetId || !payload) {
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authedUserId = await getAuthenticatedUserId(req);
    if (!authedUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: roomId } = await params;

    // SECURITY: Only allow reading signals addressed to the authenticated user
    // Prevents eavesdropping where attackers pass ?userId=<victim_id> to steal WebRTC signals
    const queueKey = `${roomId}:${authedUserId}`;
    const signals = signalQueue.get(queueKey) || [];

    // Clear retrieved signals
    signalQueue.delete(queueKey);

    return NextResponse.json({ success: true, signals });
  } catch (error) {
    console.error("Error in WebRTC signaling GET:", error);
    return NextResponse.json({ error: "Failed to retrieve signals" }, { status: 500 });
  }
}
