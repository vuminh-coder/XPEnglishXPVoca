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

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    
    // Fetch all posts with user info, comments (and comment author), and likes count
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 15,
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
    });

    // Check which posts the current user liked
    let likedPostIds: string[] = [];
    if (userId) {
      const userLikes = await prisma.like.findMany({
        where: { userId },
        select: { postId: true },
      });
      likedPostIds = userLikes.map((l) => l.postId);
    }

    // Map to frontend expected format
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      author: `${post.user.fullName || "User"} (@${post.user.username || "user"})`,
      avatarEmoji: post.user.avatarEmoji || "🦉",
      meta: new Date(post.createdAt).toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }) + " · " + post.user.title,
      content: post.content,
      vocabTags: post.vocabTags,
      likes: post._count.likes,
      commentsCount: post._count.comments,
      liked: likedPostIds.includes(post.id),
      // Reverse so oldest appears first (we fetched DESC to get latest 15)
      comments: post.comments.reverse().map((c) => ({
        id: c.id,
        author: c.user.username || "user",
        avatarEmoji: c.user.avatarEmoji || "👤",
        content: c.content,
      })),
    }));

    return NextResponse.json({ success: true, data: formattedPosts });
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
    const { content, vocabTags = [] } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        userId,
        content: content.trim(),
        vocabTags,
      },
      include: {
        user: true,
      },
    });

    // Award +20 XP for sharing a post
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

    // Return the new post formatted
    const formattedPost = {
      id: post.id,
      author: `${post.user.fullName || "User"} (@${post.user.username || "user"})`,
      avatarEmoji: post.user.avatarEmoji || "🦉",
      meta: "Vừa xong · " + post.user.title,
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
