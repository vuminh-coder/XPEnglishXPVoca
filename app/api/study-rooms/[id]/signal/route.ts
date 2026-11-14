import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { sharedStore } from "@/infrastructure/cache/sharedStore";

interface SignalMessage {
  senderId: string;
  payload: unknown;
  timestamp: number;
}

const SIGNAL_TTL_SECONDS = 30;

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

    const queueKey = `signal:${roomId}:${targetId}`;
    const existingQueue = (await sharedStore.get<SignalMessage[]>(queueKey)) || [];
    const now = Date.now();
    const activeSignals = existingQueue.filter((s) => now - s.timestamp < SIGNAL_TTL_SECONDS * 1000);
    activeSignals.push({
      senderId,
      payload,
      timestamp: now,
    });

    await sharedStore.set(queueKey, activeSignals.slice(-30), SIGNAL_TTL_SECONDS);

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
    const queueKey = `signal:${roomId}:${authedUserId}`;
    const rawSignals = (await sharedStore.get<SignalMessage[]>(queueKey)) || [];
    const now = Date.now();
    const signals = rawSignals.filter((s) => now - s.timestamp < SIGNAL_TTL_SECONDS * 1000);

    // Clear retrieved signals
    await sharedStore.del(queueKey);

    return NextResponse.json({ success: true, signals });
  } catch (error) {
    console.error("Error in WebRTC signaling GET:", error);
    return NextResponse.json({ error: "Failed to retrieve signals" }, { status: 500 });
  }
}
