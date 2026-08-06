import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LEVEL_TITLES } from "@/lib/constants";

// Helper to calculate level and title from XP
function calculateLevelAndTitle(xp: number, currentLevel: number) {
  const LEVEL_XP = [
    0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
    7600, 9200, 11000,
  ];
  let newLevel = currentLevel;
  while (newLevel < LEVEL_XP.length && xp >= LEVEL_XP[newLevel]) {
    newLevel++;
  }
  const newTitle = LEVEL_TITLES[newLevel] || "Grandmaster";
  return { level: newLevel, title: newTitle };
}

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "15", 10), 50);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const skip = (page - 1) * limit;
    const tagFilter = searchParams.get("tag");

    // Build filter condition
    const whereCondition = tagFilter ? { vocabTags: { has: tagFilter } } : {};

    // High-speed SELECT query filtering down columns
    const posts = await prisma.post.findMany({
      where: whereCondition,
      select: {
        id: true,
        content: true,
        vocabTags: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatarEmoji: true,
            title: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                fullName: true,
                username: true,
                avatarEmoji: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    // Batch check likes status for current user if authenticated
    let likedPostIdsSet = new Set<string>();
    if (userId && posts.length > 0) {
      const postIds = posts.map((p) => p.id);
      const userLikes = await prisma.like.findMany({
        where: {
          userId,
          postId: { in: postIds },
        },
        select: { postId: true },
      });
      likedPostIdsSet = new Set(userLikes.map((l) => l.postId));
    }

    // Format output with zero overhead
    const formattedPosts = posts.map((post) => {
      const authorName = post.user.fullName || post.user.username || "Học viên XP";
      const dbAvatar = (post.user as any).avatarUrl || (post.user as any).imageUrl || (post.user as any).avatar;
      const authorAvatar = dbAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0059bb&color=fff`;

      return {
        id: post.id,
        author: authorName,
        avatarEmoji: post.user.avatarEmoji || "🦉",
        avatar: authorAvatar,
        authorAvatar: authorAvatar,
        meta: new Date(post.createdAt).toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }) + " · " + (post.user.title || "Member"),
        content: post.content,
        vocabTags: post.vocabTags,
        likes: post._count.likes,
        commentsCount: post._count.comments,
        liked: likedPostIdsSet.has(post.id),
        comments: post.comments.reverse().map((c) => {
          const commentAuthorName = c.user.fullName || c.user.username || "Học viên XP";
          const commentDbAvatar = (c.user as any).avatarUrl || (c.user as any).imageUrl || (c.user as any).avatar;
          const commentAvatar = commentDbAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(commentAuthorName)}&background=0059bb&color=fff`;

          return {
            id: c.id,
            author: commentAuthorName,
            avatarEmoji: c.user.avatarEmoji || "👤",
            avatar: commentAvatar,
            authorAvatar: commentAvatar,
            content: c.content,
          };
        }),
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedPosts,
      page,
      limit,
      hasMore: posts.length === limit,
    });
  } catch (error: any) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // Auto extract #Hashtags from post text
    const hashtagRegex = /#[\wÀ-ỹ]+/g;
    const extractedTags = content.match(hashtagRegex) || [];
    const uniqueTags: string[] = Array.from(new Set(extractedTags));

    // Create the post & award +20 XP in single transaction
    const post: any = await prisma.post.create({
      data: {
        userId,
        content: content.trim(),
        vocabTags: uniqueTags as any,
      },
      select: {
        id: true,
        content: true,
        vocabTags: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatarEmoji: true,
            title: true,
          },
        },
      },
    });

    // Update profile XP & Title
    const profile = await prisma.profile.findUnique({
      where: { id: userId },
    });

    let updatedProfile = null;
    if (profile) {
      const newXp = profile.totalXp + 20;
      const { level: newLevel, title: newTitle } = calculateLevelAndTitle(
        newXp,
        profile.level
      );

      updatedProfile = await prisma.profile.update({
        where: { id: userId },
        data: {
          totalXp: newXp,
          level: newLevel,
          title: newTitle,
        },
      });
    }

    const authorName = post.user?.fullName || post.user?.username || "Học viên XP";
    const dbAvatar = (post.user as any)?.avatarUrl || (post.user as any)?.imageUrl || (post.user as any)?.avatar;
    const authorAvatar = dbAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0059bb&color=fff`;

    const formattedPost = {
      id: post.id,
      author: authorName,
      avatarEmoji: post.user?.avatarEmoji || "🦉",
      avatar: authorAvatar,
      authorAvatar: authorAvatar,
      meta: "Vừa xong · " + (post.user?.title || "Member"),
      content: post.content,
      vocabTags: post.vocabTags,
      likes: 0,
      commentsCount: 0,
      liked: false,
      comments: [],
      xpAwarded: 20,
      profile: updatedProfile,
    };

    return NextResponse.json({ success: true, data: formattedPost });
  } catch (error: any) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
