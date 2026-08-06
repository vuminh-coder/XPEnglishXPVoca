import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId,
        content: content.trim(),
      },
      include: {
        user: true,
      },
    });

    const commentAuthorName = comment.user.fullName || comment.user.username || "Học viên XP";
    const commentDbAvatar = (comment.user as any).avatarUrl || (comment.user as any).imageUrl || (comment.user as any).avatar;
    const commentAvatar = commentDbAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(commentAuthorName)}&background=0059bb&color=fff`;

    const formattedComment = {
      id: comment.id,
      author: commentAuthorName,
      avatarEmoji: comment.user.avatarEmoji || "👤",
      avatar: commentAvatar,
      authorAvatar: commentAvatar,
      content: comment.content,
    };

    return NextResponse.json({ success: true, data: formattedComment });
  } catch (error: any) {
    console.error("POST /api/posts/[id]/comment error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
