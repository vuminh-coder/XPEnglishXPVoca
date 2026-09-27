import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET as getRooms, POST as createRoom } from "@/app/api/study-rooms/route";
import { POST as manageMember, GET as getMembers } from "@/app/api/study-rooms/[id]/members/route";
import { GET as getMessages, POST as postMessage } from "@/app/api/study-rooms/[id]/messages/route";
import { prisma } from "@/infrastructure/database/prisma";
import * as authModule from "@/infrastructure/auth/auth";

describe("Study Rooms Performance & Query Standards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(null);
  });

  describe("1. GET & POST /api/study-rooms", () => {
    it("GET /api/study-rooms applies bounded pagination and selective projection", async () => {
      let findManyArgs: any = null;
      const mockRooms = [
        {
          id: "123456",
          name: "TOEIC 800+ Cram",
          category: "TOEIC",
          accentColor: "indigo",
          maxMembers: 20,
          isPrivate: false,
          creator: {
            fullName: "Minh Vu",
            username: "minhvu",
            avatarEmoji: "🦉",
          },
          members: [
            {
              status: "FOCUSING",
              user: {
                id: "u1",
                fullName: "Student",
                username: "stu",
                avatarEmoji: "🦉",
                title: "Scholar",
                totalXp: 120,
              },
            },
          ],
          _count: { members: 1 },
        },
      ];

      (vi.spyOn(prisma.studyRoom, "findMany") as any).mockImplementation(async (args: any) => {
        findManyArgs = args;
        return mockRooms;
      });

      const req = new Request("http://localhost/api/study-rooms");
      const res = await getRooms(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.rooms).toHaveLength(1);

      // Verify Rule 3 & Bounded Query Standards
      expect(findManyArgs.take).toBe(20);
      expect(findManyArgs.include.members.take).toBe(25);
      expect(findManyArgs.include.creator.select).toBeDefined();
      expect(findManyArgs.include.creator.select.passwordHash).toBeUndefined();
      expect(findManyArgs.include.members.select.user.select.passwordHash).toBeUndefined();
    });

    it("POST /api/study-rooms validates inputs, uses selective projection, and generates 6-digit ID", async () => {
      const userId = "user_room_creator";
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(userId);

      let profileFindArgs: any = null;
      let roomCreateArgs: any = null;

      (vi.spyOn(prisma.profile, "findUnique") as any).mockImplementation(async (args: any) => {
        profileFindArgs = args;
        return { id: userId };
      });

      (vi.spyOn(prisma.studyRoom, "create") as any).mockImplementation(async (args: any) => {
        roomCreateArgs = args;
        return {
          id: args.data.id,
          name: args.data.name,
          category: args.data.category,
          creator: { id: userId, fullName: "Creator", username: "cr", avatarEmoji: "🦉" },
          members: [{ status: "FOCUSING", user: { id: userId, fullName: "Creator" } }],
        };
      });

      const req = new Request("http://localhost/api/study-rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "IELTS Speaking Sprint",
          category: "SPEAKING",
          accentColor: "indigo",
          maxMembers: 15,
        }),
      });

      const res = await createRoom(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.room.id).toMatch(/^\d{6}$/);

      // Verify selective projection
      expect(profileFindArgs.select).toEqual({ id: true });
      expect(roomCreateArgs.include.creator.select).toBeDefined();
      expect(roomCreateArgs.include.members.select.user.select).toBeDefined();
      expect(roomCreateArgs.include.creator.select.passwordHash).toBeUndefined();
    });
  });

  describe("2. Members Route /api/study-rooms/[id]/members", () => {
    it("POST /api/study-rooms/[id]/members joins room with selective projection", async () => {
      const userId = "user_joiner_1";
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(userId);

      let roomLookupArgs: any = null;
      (vi.spyOn(prisma.studyRoom, "findUnique") as any).mockImplementation(async (args: any) => {
        roomLookupArgs = args;
        return { id: "123456", isPrivate: false, passcode: null };
      });

      (vi.spyOn(prisma.profile, "findUnique") as any).mockResolvedValue({ id: userId });
      (vi.spyOn(prisma.studyRoomMember, "upsert") as any).mockResolvedValue({ roomId: "123456", userId });

      const req = new Request("http://localhost/api/study-rooms/123456/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "join", status: "FOCUSING" }),
      });

      const res = await manageMember(req, { params: Promise.resolve({ id: "123456" }) });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);

      // Verify selective projection on room lookup
      expect(roomLookupArgs.select).toEqual({ id: true, isPrivate: true, passcode: true });
    });

    it("GET /api/study-rooms/[id]/members applies selective projection and bounded take: 50", async () => {
      let membersFindArgs: any = null;
      (vi.spyOn(prisma.studyRoomMember, "findMany") as any).mockImplementation(async (args: any) => {
        membersFindArgs = args;
        return [];
      });

      const req = new Request("http://localhost/api/study-rooms/123456/members");
      const res = await getMembers(req, { params: Promise.resolve({ id: "123456" }) });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(membersFindArgs.take).toBe(50);
      expect(membersFindArgs.select.user.select.passwordHash).toBeUndefined();
    });
  });

  describe("3. Messages Route /api/study-rooms/[id]/messages", () => {
    it("POST /api/study-rooms/[id]/messages passes req to auth and selective projection", async () => {
      const userId = "user_chatter";
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(userId);

      (vi.spyOn(prisma.profile, "findUnique") as any).mockResolvedValue({ id: userId });
      (vi.spyOn(prisma.roomMessage, "create") as any).mockResolvedValue({
        id: "msg_1",
        content: "Let's study hard!",
        roomId: "123456",
        userId,
      });

      const req = new Request("http://localhost/api/study-rooms/123456/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "Let's study hard!" }),
      });

      const res = await postMessage(req, { params: Promise.resolve({ id: "123456" }) });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.message.content).toBe("Let's study hard!");
    });
  });
});
