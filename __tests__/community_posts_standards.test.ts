import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET as getPosts, POST as createPost } from "@/app/api/posts/route";
import { POST as addComment } from "@/app/api/posts/[id]/comment/route";
import { POST as addCommentAlias } from "@/app/api/posts/[id]/comments/route";
import { POST as toggleLike } from "@/app/api/posts/[id]/like/route";
import { GET as getGroups } from "@/app/api/groups/route";
import { POST as joinGroup } from "@/app/api/groups/[id]/join/route";
import { prisma } from "@/infrastructure/database/prisma";
import * as authModule from "@/infrastructure/auth/auth";
import * as cacheModule from "@/infrastructure/cache/dashboardCache";

describe("Community & Social Performance & Query Standards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(null);
  });

  describe("1. GET & POST /api/posts (Selective Projection & Cache Invalidation)", () => {
    it("GET /api/posts returns formatted posts with selective projection", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue("user_feed_test");

      let findManyArgs: any = null;
      const mockPosts = [
        {
          id: "post_1",
          content: "Học từ vựng #IELTS cực hay hôm nay!",
          vocabTags: ["#IELTS"],
          createdAt: new Date(),
          user: {
            id: "author_1",
            fullName: "Minh Vu",
            username: "minhvu",
            avatarEmoji: "🦉",
            title: "Scholar",
          },
          comments: [],
          _count: { likes: 5, comments: 2 },
        },
      ];

      (vi.spyOn(prisma.post, "findMany") as any).mockImplementation(async (args: any) => {
        findManyArgs = args;
        return mockPosts;
      });

      (vi.spyOn(prisma.like, "findMany") as any).mockResolvedValue([{ postId: "post_1" }]);

      const req = new Request("http://localhost/api/posts?limit=10&page=1&tag=%23IELTS");
      const res = await getPosts(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data).toHaveLength(1);
      expect(json.data[0].liked).toBe(true);

      // Verify Rule 3: Selective SELECT projection (No SELECT *)
      expect(findManyArgs.select).toBeDefined();
      expect(findManyArgs.select.user.select).toBeDefined();
      expect(findManyArgs.select.user.select.passwordHash).toBeUndefined();
      expect(findManyArgs.select.comments.take).toBe(10);
      expect(findManyArgs.where).toEqual({ vocabTags: { has: "#IELTS" } });
    });

    it("POST /api/posts executes atomic transaction, updates XP/level, and invalidates cache", async () => {
      const userId = "user_post_creator";
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(userId);
      const invalidateDashboardSpy = vi.spyOn(cacheModule, "invalidateDashboardCache");

      let profileFindArgs: any = null;
      let postCreateArgs: any = null;
      let profileUpdateArgs: any = null;

      const mockTx = {
        profile: {
          findUnique: vi.fn().mockImplementation((args) => {
            profileFindArgs = args;
            return Promise.resolve({ id: userId, totalXp: 180, level: 2 });
          }),
          update: vi.fn().mockImplementation((args) => {
            profileUpdateArgs = args;
            return Promise.resolve({ id: userId, totalXp: 200, level: 2, title: "Explorer" });
          }),
        },
        post: {
          create: vi.fn().mockImplementation((args) => {
            postCreateArgs = args;
            return Promise.resolve({
              id: "post_new_123",
              content: "Chia sẻ bài học #Voca bổ ích",
              vocabTags: ["#Voca"],
              createdAt: new Date(),
              user: {
                id: userId,
                fullName: "Creator",
                username: "creator",
                avatarEmoji: "🦉",
                title: "Explorer",
              },
            });
          }),
        },
      };

      vi.spyOn(prisma, "$transaction").mockImplementation(async (callback: any) => {
        return callback(mockTx);
      });

      const req = new Request("http://localhost/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "Chia sẻ bài học #Voca bổ ích" }),
      });

      const res = await createPost(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.xpAwarded).toBe(20);

      // Verify selective projection on profile lookup
      expect(profileFindArgs.select).toEqual({ id: true, totalXp: true, level: true });

      // Verify single atomic update with incremented XP
      expect(profileUpdateArgs.data.totalXp).toBe(200);

      // Verify selective projection on post creation
      expect(postCreateArgs.select.user.select).toBeDefined();

      // Verify immediate dashboard cache invalidation
      expect(invalidateDashboardSpy).toHaveBeenCalledWith(userId);
    });
  });

  describe("2. POST /api/posts/[id]/comment & comments alias", () => {
    it("creates comment with selective projection and without leaking sensitive user data", async () => {
      const userId = "user_commenter";
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(userId);

      let postFindArgs: any = null;
      let commentCreateArgs: any = null;

      (vi.spyOn(prisma.post, "findUnique") as any).mockImplementation(async (args: any) => {
        postFindArgs = args;
        return { id: "post_abc" };
      });

      (vi.spyOn(prisma.comment, "create") as any).mockImplementation(async (args: any) => {
        commentCreateArgs = args;
        return {
          id: "cmt_123",
          content: "Great post!",
          user: {
            id: userId,
            fullName: "Commenter",
            username: "commenter",
            avatarEmoji: "🦉",
          },
        };
      });

      const req = new Request("http://localhost/api/posts/post_abc/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "Great post!" }),
      });

      const res = await addComment(req, { params: Promise.resolve({ id: "post_abc" }) });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.author).toBe("Commenter");

      // Verify selective projection on post check
      expect(postFindArgs.select).toEqual({ id: true });

      // Verify selective projection on user (no passwordHash or tokens)
      expect(commentCreateArgs.select.user.select).toBeDefined();
      expect(commentCreateArgs.select.user.select.passwordHash).toBeUndefined();
    });

    it("verifies comments alias re-export route operates identically", async () => {
      expect(addCommentAlias).toBe(addComment);
    });
  });

  describe("3. POST /api/posts/[id]/like", () => {
    it("toggles like state with selective projection", async () => {
      const userId = "user_liker";
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(userId);

      (vi.spyOn(prisma.post, "findUnique") as any).mockResolvedValue({ id: "post_xyz" });
      (vi.spyOn(prisma.like, "findUnique") as any).mockResolvedValue(null);
      (vi.spyOn(prisma.like, "create") as any).mockResolvedValue({ id: "like_1" });
      (vi.spyOn(prisma.like, "count") as any).mockResolvedValue(6);

      const req = new Request("http://localhost/api/posts/post_xyz/like", { method: "POST" });
      const res = await toggleLike(req, { params: Promise.resolve({ id: "post_xyz" }) });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.data.liked).toBe(true);
      expect(json.data.likesCount).toBe(6);
    });
  });

  describe("4. Groups & Join Query Standards", () => {
    it("GET /api/groups limits nested members to prevent memory explosion", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue("user_group_viewer");

      let groupFindManyArgs: any = null;
      (vi.spyOn(prisma.group, "findMany") as any).mockImplementation(async (args: any) => {
        groupFindManyArgs = args;
        return [
          {
            id: "grp_1",
            name: "IELTS Warriors",
            description: "Test group",
            themeName: "IELTS",
            accent: "cyan",
            maxMembers: 50,
            members: [
              {
                userId: "user_group_viewer",
                role: "MEMBER",
                user: { id: "user_group_viewer", fullName: "User", username: "u", avatarEmoji: "🦉" },
              },
            ],
          },
        ];
      });

      const req = new Request("http://localhost/api/groups");
      const res = await getGroups(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(groupFindManyArgs.select.members.take).toBe(10);
    });

    it("POST /api/groups/[id]/join leverages _count to verify capacity without loading all member rows", async () => {
      const userId = "user_joiner";
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(userId);

      let groupLookupArgs: any = null;
      (vi.spyOn(prisma.group, "findUnique") as any).mockImplementation(async (args: any) => {
        groupLookupArgs = args;
        return {
          id: "grp_tech",
          maxMembers: 30,
          _count: { members: 10 },
        };
      });

      (vi.spyOn(prisma.groupMember, "findUnique") as any).mockResolvedValue(null);
      (vi.spyOn(prisma.groupMember, "create") as any).mockResolvedValue({ id: "gm_new" });
      (vi.spyOn(prisma.groupMember, "count") as any).mockResolvedValue(11);

      const req = new Request("http://localhost/api/groups/grp_tech/join", { method: "POST" });
      const res = await joinGroup(req, { params: Promise.resolve({ id: "grp_tech" }) });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.data.joined).toBe(true);
      expect(json.data.memberCount).toBe(11);

      // Verify selective count projection (No full member array loaded into memory)
      expect(groupLookupArgs.select._count).toBeDefined();
      expect(groupLookupArgs.select.members).toBeUndefined();
    });
  });
});
