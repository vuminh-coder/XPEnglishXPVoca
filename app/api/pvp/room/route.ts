import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { sharedStore } from "@/infrastructure/cache/sharedStore";

export interface PvpRoomStore {
  code: string;
  hostId: string;
  hostName: string;
  hostAvatar?: string;
  hostLevel: number;
  guestId?: string;
  guestName?: string;
  guestAvatar?: string;
  guestLevel?: number;
  gameMode: "quiz" | "spelling" | "listening";
  difficulty: "easy" | "medium" | "hard";
  status: "WAITING" | "STARTING" | "BATTLE" | "FINISHED";
  startTime?: number;
  questions: any[];
  hostScore: number;
  guestScore: number;
  hostCurrentIndex: number;
  guestCurrentIndex: number;
  hostResults: (boolean | null)[];
  guestResults: (boolean | null)[];
  createdAt: number;
}

// Distributed serverless store for active PvP rooms (1 hour TTL)
const PVP_ROOM_PREFIX = "pvp_room:";
const PVP_ROOM_TTL_SECONDS = 3600;

async function getRoom(code: string): Promise<PvpRoomStore | null> {
  return await sharedStore.get<PvpRoomStore>(`${PVP_ROOM_PREFIX}${code}`);
}

async function saveRoom(code: string, room: PvpRoomStore): Promise<void> {
  await sharedStore.set(`${PVP_ROOM_PREFIX}${code}`, room, PVP_ROOM_TTL_SECONDS);
}

async function deleteRoom(code: string): Promise<void> {
  await sharedStore.del(`${PVP_ROOM_PREFIX}${code}`);
}

async function generate5DigitCode(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    const existing = await getRoom(code);
    if (!existing) return code;
  }
  return Math.floor(10000 + Math.random() * 90000).toString();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // SECURITY: Only trust authenticated session — never accept client-provided userId
    // Prevents identity spoofing where attackers pass x-user-id or body.userId to impersonate host
    let userId: string = (await getAuthenticatedUserId(request)) || "";
    if (!userId) {
      // Generate unique ephemeral guest ID per session — NOT from client input
      userId = `guest_pvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    }

    // 1. CREATE ROOM
    if (action === "create") {
      const { gameMode = "quiz", difficulty = "medium", questions = [] } = body;

      let profile: { fullName: string | null; avatarEmoji: string | null; level: number } | null = null;
      try {
        profile = await prisma.profile.findUnique({
          where: { id: userId },
          select: { fullName: true, avatarEmoji: true, level: true },
        });
      } catch (e) {
        // DB lookup failure fallback
      }

      const roomCode = await generate5DigitCode();
      const newRoom: PvpRoomStore = {
        code: roomCode,
        hostId: userId,
        hostName: profile?.fullName || body?.userName || "Chủ phòng",
        hostAvatar: profile?.avatarEmoji || body?.userAvatar || "🦊",
        hostLevel: profile?.level || 1,
        gameMode,
        difficulty,
        status: "WAITING",
        questions,
        hostScore: 0,
        guestScore: 0,
        hostCurrentIndex: 0,
        guestCurrentIndex: 0,
        hostResults: Array(questions.length).fill(null),
        guestResults: Array(questions.length).fill(null),
        createdAt: Date.now(),
      };

      await saveRoom(roomCode, newRoom);

      return NextResponse.json({
        success: true,
        room: newRoom,
        role: "host",
      });
    }

    // 2. JOIN ROOM BY 5-DIGIT CODE
    if (action === "join") {
      const { code } = body;
      if (!code || typeof code !== "string") {
        return NextResponse.json({ error: "Vui lòng nhập mã phòng 5 chữ số" }, { status: 400 });
      }

      const formattedCode = code.trim();
      const room = await getRoom(formattedCode);

      if (!room) {
        return NextResponse.json({ error: "Mã phòng không tồn tại hoặc đã hết hạn" }, { status: 404 });
      }

      if (room.hostId === userId) {
        return NextResponse.json({ success: true, room, role: "host" });
      }

      let profile: { fullName: string | null; avatarEmoji: string | null; level: number } | null = null;
      try {
        profile = await prisma.profile.findUnique({
          where: { id: userId },
          select: { fullName: true, avatarEmoji: true, level: true },
        });
      } catch (e) {
        // DB lookup fallback
      }

      room.guestId = userId;
      room.guestName = profile?.fullName || body?.userName || "Khách gia nhập";
      room.guestAvatar = profile?.avatarEmoji || body?.userAvatar || "🦉";
      room.guestLevel = profile?.level || 1;

      await saveRoom(formattedCode, room);

      return NextResponse.json({
        success: true,
        room,
        role: "guest",
      });
    }

    // 3. GET ROOM STATUS (REAL-TIME POLLING)
    if (action === "get") {
      const { code } = body;
      if (!code) {
        return NextResponse.json({ error: "Thiếu mã phòng" }, { status: 400 });
      }

      const room = await getRoom(code);
      if (!room) {
        return NextResponse.json({ error: "Phòng không tồn tại" }, { status: 404 });
      }

      const role = room.hostId === userId ? "host" : room.guestId === userId ? "guest" : "spectator";

      return NextResponse.json({
        success: true,
        room,
        role,
      });
    }

    // 4. START BATTLE (HOST ONLY)
    if (action === "start") {
      const { code } = body;
      const room = await getRoom(code);

      if (!room) {
        return NextResponse.json({ error: "Phòng không tồn tại" }, { status: 404 });
      }

      if (room.hostId !== userId) {
        return NextResponse.json({ error: "Chỉ chủ phòng mới có quyền bắt đầu trận đấu" }, { status: 403 });
      }

      room.status = "STARTING";
      room.startTime = Date.now() + 3000; // 3-second synchronized countdown
      await saveRoom(code, room);

      return NextResponse.json({
        success: true,
        room,
      });
    }

    // 5. SUBMIT SCORE & PER-QUESTION PROGRESS
    if (action === "submit-progress") {
      const { code, score, questionIndex, isCorrect } = body;
      const room = await getRoom(code);

      if (!room) {
        return NextResponse.json({ error: "Phòng không tồn tại" }, { status: 404 });
      }

      if (room.hostId === userId) {
        room.hostScore = score;
        room.hostCurrentIndex = questionIndex;
        if (questionIndex >= 0 && questionIndex < room.hostResults.length) {
          room.hostResults[questionIndex] = isCorrect;
        }
      } else if (room.guestId === userId) {
        room.guestScore = score;
        room.guestCurrentIndex = questionIndex;
        if (questionIndex >= 0 && questionIndex < room.guestResults.length) {
          room.guestResults[questionIndex] = isCorrect;
        }
      }

      const totalQ = room.questions.length;
      const hostFinished = room.hostResults.filter((r) => r !== null).length >= totalQ;
      const guestFinished = room.guestResults.filter((r) => r !== null).length >= totalQ;

      if (hostFinished && guestFinished) {
        room.status = "FINISHED";
      } else if (room.status === "STARTING" || Date.now() >= (room.startTime || 0)) {
        room.status = "BATTLE";
      }

      await saveRoom(code, room);

      return NextResponse.json({
        success: true,
        room,
      });
    }

    // 6. LEAVE ROOM
    if (action === "leave") {
      const { code } = body;
      const room = await getRoom(code);
      if (room) {
        if (room.hostId === userId) {
          await deleteRoom(code);
        } else if (room.guestId === userId) {
          room.guestId = undefined;
          room.guestName = undefined;
          room.guestAvatar = undefined;
          room.status = "WAITING";
          await saveRoom(code, room);
        }
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Hành động không hợp lệ" }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("POST /api/pvp/room error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
